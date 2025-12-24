
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function useLessonData(lessonId: string, courseId: string) {
    return useQuery({
        queryKey: ['lesson', lessonId, courseId],
        queryFn: async () => {
            const supabase = createClient();

            // Get authenticated user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Fetch lesson data
            const { data: lesson, error: lessonError } = await supabase
                .from("lessons")
                .select("*")
                .eq("id", lessonId)
                .single();

            if (lessonError || !lesson) {
                throw new Error("Lesson not found");
            }

            const result: any = { lesson };

            // Fetch quiz/exam data if lesson is a quiz
            if (lesson.content_type === 'quiz' && lesson.exam_id) {
                const [examResult, sectionsResult, attemptsResult] = await Promise.all([
                    supabase
                        .from("exams")
                        .select("*")
                        .eq("id", lesson.exam_id)
                        .single(),
                    supabase
                        .from("sections")
                        .select("id, questions:questions(id)")
                        .eq("exam_id", lesson.exam_id),
                    supabase
                        .from("exam_attempts")
                        .select("*")
                        .eq("exam_id", lesson.exam_id)
                        .eq("student_id", user.id)
                ]);

                result.exam = examResult.data;

                // Calculate question count
                const sections = sectionsResult.data || [];
                result.questionsCount = sections.reduce(
                    (acc: number, section: any) => acc + (section.questions?.length || 0),
                    0
                );

                result.attempts = attemptsResult.data || [];
            }

            // Fetch course/author context (optional)
            try {
                const { data: course } = await supabase
                    .from("courses")
                    .select("creator_id")
                    .eq("id", courseId)
                    .single();

                if (course?.creator_id) {
                    const { data: author } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", course.creator_id)
                        .single();
                    result.author = author;
                }
            } catch (authorError) {
                // Ignore author fetch errors - not critical
                console.warn("Could not fetch author:", authorError);
            }

            return result;
        },
        staleTime: 1000 * 60 * 10, // 10 minutes - Data remains "fresh" and won't re-fetch on revisit
        gcTime: 1000 * 60 * 30,    // 30 minutes - Keep data in memory for 30 mins even if unused
        refetchOnWindowFocus: false, // Don't re-fetch when switching tabs
        placeholderData: keepPreviousData, // ⚡ INSTANT RECALL: Show previous lesson while fetching new one
        enabled: !!lessonId,
        retry: 1,
    });
}
