import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/lib/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchLessonDetailedData } from "@/lib/data/lesson";
import { LessonAppContainer } from "@/components/LessonAppContainer";

/**
 * ⚡ HYBRID SPA PATTERN - Thin Server Wrapper
 * 
 * This page runs ONCE on initial load, then ALL navigation is client-side.
 * 
 * Server responsibilities (one-time):
 * 1. Auth check
 * 2. Enrollment check
 * 3. Optional first lesson prefetch
 * 
 * Client responsibilities (instant):
 * - All lesson-to-lesson navigation
 * - URL updates via window.history.pushState
 * - React Query cache lookups
 */
export default async function CourseLessonPage({
    params,
    searchParams,
}: {
    params: Promise<{ courseId: string }>;
    searchParams: Promise<{ lessonId?: string }>;
}) {
    const { courseId } = await params;
    const { lessonId } = await searchParams;
    const supabase = await createClient();

    // Fast Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        const nextPath = lessonId
            ? `/learn/${courseId}?lessonId=${lessonId}`
            : `/learn/${courseId}`;
        redirect(`/auth/login?next=${encodeURIComponent(nextPath)}`);
    }

    // Fast Enrollment Check (indexed query)
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("status")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();
    const isEnrolled = !!enrollment;

    // Optional: Prefetch first lesson for instant first load
    const queryClient = getQueryClient();
    if (lessonId) {
        try {
            const lessonData = await fetchLessonDetailedData(supabase, lessonId, courseId, user.id);
            queryClient.setQueryData(['lesson', lessonId, courseId], lessonData);
        } catch (error) {
            // Ignore - client will fetch if needed
        }
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* ⚡ HYBRID SPA: All subsequent navigation is client-side (0ms)! */}
            <LessonAppContainer
                courseId={courseId}
                user={user}
                isEnrolled={isEnrolled}
                initialLessonId={lessonId}
            />
        </HydrationBoundary>
    );
}

