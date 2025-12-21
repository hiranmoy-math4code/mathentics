/**
 * HYBRID SPA PATTERN - Lesson App Container
 * 
 * This component handles ALL lesson navigation purely on the client.
 * - Uses React state for instant transitions (0ms)
 * - Updates URL with window.history.pushState (no server round-trip)
 * - Maintains browser history and shareable URLs
 * - Keeps sidebar and player mounted (no re-mounting)
 */

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useLessons } from '@/hooks/useLessons';
import LessonContentClient from '@/components/lesson/LessonContentClient';
import { LessonTracker } from '@/components/LessonTracker';
import { QuizSkeleton, VideoSkeleton, TextSkeleton } from '@/components/skeletons/LessonSkeletons';
import { createClient } from '@/lib/supabase/client';
import { fetchLessonDetailedData } from '@/lib/data/lesson';

interface LessonAppContainerProps {
    courseId: string;
    user: any;
    isEnrolled: boolean;
    initialLessonId?: string;
}

export function LessonAppContainer({
    courseId,
    user,
    isEnrolled,
    initialLessonId
}: LessonAppContainerProps) {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    // ⚡ CLIENT-SIDE STATE: The source of truth for current lesson
    const [currentLessonId, setCurrentLessonId] = useState<string | null>(
        searchParams.get('lessonId') || initialLessonId || null
    );

    // Get modules/lessons from cache (loaded by layout)
    const { data: modules, isPending: isLoadingModules } = useLessons(courseId);

    // Flatten lessons
    const allLessons = useMemo(() => {
        if (!modules) return [];
        return modules.flatMap((m: any) => m.lessons);
    }, [modules]);

    // Get current lesson object
    const currentLesson = useMemo(() => {
        if (!currentLessonId || !allLessons.length) return allLessons[0] || null;
        return allLessons.find((l: any) => l.id === currentLessonId) || allLessons[0];
    }, [currentLessonId, allLessons]);

    // ⚡ SHALLOW ROUTING: Update URL without server round-trip
    const navigateToLesson = useCallback((lessonId: string) => {
        // Update state (instant)
        setCurrentLessonId(lessonId);

        // Update URL (no server request)
        const url = new URL(window.location.href);
        url.searchParams.set('lessonId', lessonId);
        window.history.pushState({}, '', url.toString());
    }, []);

    // Listen to browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            const lessonId = params.get('lessonId');
            if (lessonId) {
                setCurrentLessonId(lessonId);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Sync with URL changes (from external navigation)
    useEffect(() => {
        const urlLessonId = searchParams.get('lessonId');
        if (urlLessonId && urlLessonId !== currentLessonId) {
            setCurrentLessonId(urlLessonId);
        }
    }, [searchParams, currentLessonId]);

    // Expose navigation function globally for sidebar to use
    useEffect(() => {
        (window as any).__navigateToLesson = navigateToLesson;
        return () => {
            delete (window as any).__navigateToLesson;
        };
    }, [navigateToLesson]);

    // ⚡ PREDICTIVE PREFETCHING: Prefetch next lesson for instant forward navigation
    useEffect(() => {
        if (!currentLesson || !allLessons.length) return;

        // Find next lesson
        const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
        const nextLesson = allLessons[currentIndex + 1];

        if (nextLesson) {
            // Check if already cached
            const cached = queryClient.getQueryData(['lesson', nextLesson.id, courseId]);
            if (cached) return; // Already prefetched

            // Prefetch next lesson in background
            const supabase = createClient();
            supabase.auth.getUser().then(({ data: { user } }) => {
                if (user) {
                    queryClient.prefetchQuery({
                        queryKey: ['lesson', nextLesson.id, courseId],
                        queryFn: () => fetchLessonDetailedData(supabase, nextLesson.id, courseId, user.id),
                        staleTime: 1000 * 60 * 10, // 10 minutes
                    });
                }
            });
        }
    }, [currentLesson, allLessons, courseId, queryClient]);

    // ⚡ LOADING STATE: Show skeleton while course structure loads
    // This prevents "Failed to Load Content" error when navigating without lessonId
    // Once loaded, navigation between lessons is instant (0ms) via keepPreviousData
    if (isLoadingModules && !currentLesson) {
        // Determine skeleton type - default to text if unknown
        return <TextSkeleton />;
    }

    if (!currentLesson) {
        return (
            <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">No Lessons Available</h3>
                    <p className="text-muted-foreground">This course has no lessons yet.</p>
                </div>
            </div>
        );
    }

    // Access control
    if (!isEnrolled && !currentLesson.is_free_preview) {
        return (
            <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Content Locked</h3>
                    <p className="text-muted-foreground">Enroll in this course to access this lesson.</p>
                </div>
            </div>
        );
    }

    // Determine skeleton type
    let SkeletonComponent = TextSkeleton;
    if (currentLesson.content_type === 'video') SkeletonComponent = VideoSkeleton;
    if (currentLesson.content_type === 'quiz') SkeletonComponent = QuizSkeleton;

    return (
        <>
            {/* ⚡ NO KEY PROP: Keeps LessonTracker mounted for stability */}
            <LessonTracker
                lessonId={currentLesson.id}
                courseId={courseId}
                moduleId={currentLesson.module_id}
                contentType={currentLesson.content_type as any}
            >
                {/* ⚡ NO KEY: Component stays mounted, uses keepPreviousData for instant transitions */}
                <LessonContentClient
                    lessonId={currentLesson.id}
                    courseId={courseId}
                    user={user}
                    contentType={currentLesson.content_type as any}
                />
            </LessonTracker>
        </>
    );
}
