import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LessonTracker } from "@/components/LessonTracker";
import { getQueryClient } from "@/lib/react-query";
import LessonContentClient from "@/components/lesson/LessonContentClient";
import { QuizSkeleton, VideoSkeleton, TextSkeleton } from "@/components/skeletons/LessonSkeletons";
import { Target } from "lucide-react";


import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchLessonDetailedData } from "@/lib/data/lesson";

export const runtime = 'edge';

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
    if (!user) redirect(`/auth/login?next=/learn/${courseId}`);

    // Check enrollment status
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("status")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();
    const isEnrolled = !!enrollment;

    // --- RE-FETCH STRUCTURE FOR RESOLUTION ---
    let { data: modulesData } = await supabase.rpc('get_course_structure', { target_course_id: courseId });
    if (!modulesData) {
        const { data: fallbackData } = await supabase.from("modules").select("*, lessons (*)").eq("course_id", courseId).order("module_order");
        modulesData = fallbackData?.map((m: any) => ({ ...m, lessons: (m.lessons || []).sort((a: any, b: any) => a.lesson_order - b.lesson_order) }));
    }

    const allLessons = modulesData?.flatMap((m: any) => m.lessons) || [];

    // --- LESSON RESOLUTION LOGIC ---
    let currentLesson = null;
    if (lessonId) {
        currentLesson = allLessons.find((l: any) => l.id === lessonId);
    } else if (allLessons.length > 0) {
        const { data: progressData } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("course_id", courseId).eq("completed", true);
        const completedIds = new Set(progressData?.map((p: any) => p.lesson_id));

        if (!isEnrolled) {
            currentLesson = allLessons.find((l: any) => l.is_free_preview) || null;
        } else {
            currentLesson = allLessons.find((l: any) => !completedIds.has(l.id)) || allLessons[0];
        }

        if (currentLesson) {
            redirect(`/learn/${courseId}?lessonId=${currentLesson.id}`);
        }
    }

    if (!currentLesson) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in-95">
                <div className="bg-card border border-border p-8 rounded-2xl shadow-sm max-w-md">
                    <h3 className="text-xl font-bold mb-2">No Content Available</h3>
                    <p className="text-muted-foreground mb-6">There are no lessons available for this course.</p>
                </div>
            </div>
        );
    }

    // Access Control Guard
    if (!isEnrolled && !currentLesson.is_free_preview) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in-95">
                <div className="bg-card border border-border p-8 rounded-2xl shadow-sm max-w-md">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Content Locked</h3>
                    <p className="text-muted-foreground mb-6">You need to enroll in this course to access this lesson.</p>
                </div>
            </div>
        );
    }

    // Determine Skeleton
    let SkeletonComponent = TextSkeleton;
    if (currentLesson.content_type === 'video') SkeletonComponent = VideoSkeleton;
    if (currentLesson.content_type === 'quiz') SkeletonComponent = QuizSkeleton;

    const queryClient = getQueryClient();

    // --- DIRECT FETCH FOR FIRST LOAD (Edge Compatible) ---
    // Instead of calling a Server Action (which might be flaky on Edge SSR), 
    // we use the existing authenticated Supabase client to fetch data directly.
    const lessonData = await fetchLessonDetailedData(supabase, currentLesson.id, courseId, user.id);

    // Seed the cache with the fetched data
    queryClient.setQueryData(['lesson', currentLesson.id, courseId], lessonData);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LessonTracker
                key={currentLesson.id}
                lessonId={currentLesson.id}
                courseId={courseId}
                moduleId={currentLesson.module_id}
                contentType={currentLesson.content_type as any}
            >
                {/* SUSPENSE BOUNDARY: Allows Header/Sidebar to update while Content Hydrates/Fetches */}
                <Suspense fallback={<SkeletonComponent />}>
                    <LessonContentClient
                        lessonId={currentLesson.id}
                        courseId={courseId}
                        user={user}
                        contentType={currentLesson.content_type as any}
                    />
                </Suspense>
            </LessonTracker>
        </HydrationBoundary>
    );
}

