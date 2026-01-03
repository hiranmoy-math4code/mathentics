
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

// Standalone fetcher for use in prefetching
export const fetchLessonData = async (lessonId: string, courseId: string) => {
    const supabase = createClient();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // ⚡ OPTIMIZED STRATEGY: Parallel fetching instead of joins (safest for Supabase RLS/Relations)

    // 1. Define promises for independent data chunks
    const lessonPromise = supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

    // Fetch course & author details using the courseId prop (known upfront)
    const coursePromise = supabase
        .from("courses")
        .select(`
            creator_id,
            profiles:creator_id (*)
        `)
        .eq("id", courseId)
        .single();

    // 2. Execute primary fetches in parallel
    const [lessonResponse, courseResponse] = await Promise.all([
        lessonPromise,
        coursePromise
    ]);

    // Check critical lesson data
    if (lessonResponse.error || !lessonResponse.data) {
        throw new Error("Lesson not found");
    }

    const lesson = lessonResponse.data;
    const result: any = { lesson };

    // Attach Author data if found
    if (courseResponse.data?.profiles) {
        // Supabase join returns an array or object depending on relation type, usually object for 1:1 if singular
        // but 'profiles:creator_id' might return an array if not explicit. 
        // Safer to cast or check. However, assuming standard setup:
        const authorData = courseResponse.data.profiles;
        // If it's an array (unlikely for creator_id but possible in TS inference), handle it.
        result.author = Array.isArray(authorData) ? authorData[0] : authorData;
    }

    // 3. Fetch specific content data (Quiz) if needed
    // This depends on the lesson type, so it must happen after lesson load
    // BUT we can fire it immediately since we have the lesson now.

    if (lesson.content_type === 'quiz' && lesson.exam_id) {
        try {
            const [examResult, sectionsResult, attemptsResult] = await Promise.all([
                supabase.from("exams").select("*").eq("id", lesson.exam_id).single(),
                supabase.from("sections").select("id, questions:questions(id)").eq("exam_id", lesson.exam_id),
                supabase.from("exam_attempts").select("*").eq("exam_id", lesson.exam_id).eq("student_id", user.id)
            ]);

            result.exam = examResult.data;
            const sections = sectionsResult.data || [];
            result.questionsCount = sections.reduce(
                (acc: number, section: any) => acc + (section.questions?.length || 0),
                0
            );
            result.attempts = attemptsResult.data || [];
        } catch (error) {
            console.error("Error fetching quiz details", error);
        }
    }

    return result;
}

export function useLessonData(lessonId: string, courseId: string) {
    return useQuery({
        queryKey: ['lesson', lessonId, courseId],
        queryFn: () => fetchLessonData(lessonId, courseId),
        staleTime: 1000 * 60 * 10, // 10 minutes - Data remains "fresh" and won't re-fetch on revisit
        gcTime: 1000 * 60 * 30,    // 30 minutes - Keep data in memory for 30 mins even if unused
        refetchOnWindowFocus: false, // Don't re-fetch when switching tabs
        placeholderData: keepPreviousData, // ⚡ INSTANT RECALL: Show previous lesson while fetching new one
        enabled: !!lessonId,
        retry: 1,
    });
}
