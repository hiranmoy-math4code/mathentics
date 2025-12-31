'use server'

import { createTenantClient } from "@/lib/supabase/server";

export async function getLessonData(lessonId: string, courseId: string) {
    const supabase = await createTenantClient(); // Multi-tenant aware

    // 1. Get Core Lesson Details to determine type
    const { data: lesson, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();

    if (error || !lesson) return { error: "Lesson not found" };

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

            // Fetch User Attempts (if context allows - usually better in separate user-specific query but can bundle here for simplicity)
            // Note: In strict React Query patterns, user-specific data might be a separate key like ['attempts', lessonId]
            // For now, we bundle it to speed up the "Lesson View" in one go.
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: attempts } = await supabase
                    .from("exam_attempts")
                    .select("*, result:results(*)")
                    .eq("exam_id", lesson.exam_id)
                    .eq("user_id", user.id);
                result.attempts = attempts || [];
            }
        }

        // 3. Fetch Course/Author Context (often needed for UI header)
        if (courseId) {
            const { data: course } = await supabase.from("courses").select("creator_id").eq("id", courseId).single();
            if (course?.creator_id) {
                const { data: author } = await supabase.from("profiles").select("*").eq("id", course.creator_id).single();
                result.author = author;
            }
        }

        return result;

    } catch (e) {
        console.error("Error fetching lesson data:", e);
        return { error: "Failed to load lesson data" };
    }
}
