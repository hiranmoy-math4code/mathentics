import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchLessonDetailedData(
    supabase: SupabaseClient,
    lessonId: string,
    courseId: string,
    userId?: string
) {
    // 1. Get Core Lesson Details
    const { data: lesson, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

    if (error || !lesson) {
        console.error("Lesson fetch error:", error);
        return { error: "Lesson not found" };
    }

    const result: any = { lesson };

    // 2. Fetch Additional Type-Specific Data
    try {
        if (lesson.content_type === 'quiz' && lesson.exam_id) {
            // Fetch Exam Data
            const [examResult, sectionsResult] = await Promise.all([
                supabase.from("exams").select("*").eq("id", lesson.exam_id).single(),
                supabase.from("sections").select("id, questions:questions(id)").eq("exam_id", lesson.exam_id)
            ]);

            result.exam = examResult.data;

            // Calculate Question Count
            const sections = sectionsResult.data || [];
            result.questionsCount = sections.reduce((acc: number, section: any) => acc + (section.questions?.length || 0), 0);

            // Fetch User Attempts
            if (userId) {
                const { data: attempts } = await supabase
                    .from("exam_attempts")
                    .select("*, result:results(*)")
                    .eq("exam_id", lesson.exam_id)
                    .eq("user_id", userId);
                result.attempts = attempts || [];
            }
        }

        // 3. Fetch Course/Author Context
        if (courseId) {
            const { data: course } = await supabase.from("courses").select("user_id").eq("id", courseId).single();
            if (course?.user_id) {
                const { data: author } = await supabase.from("profiles").select("*").eq("id", course.user_id).single();
                result.author = author;
            }
        }

        return result;

    } catch (e) {
        console.error("Error fetching detailed lesson data:", e);
        return { error: "Failed to load lesson details" };
    }
}
