import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { fetchLessonDetailedData } from "@/lib/data/lesson";

/**
 * Hook to prefetch course data on hover for instant navigation
 * 
 * Prefetches:
 * 1. Course structure (modules + lessons)
 * 2. First lesson data
 * 
 * Result: Dashboard → Learn navigation feels instant (0ms perceived delay)
 */
export function usePrefetchCourse() {
    const queryClient = useQueryClient();

    const prefetchCourse = async (courseId: string) => {
        try {
            const supabase = createClient();

            // 1. Prefetch course structure (modules + lessons)
            await queryClient.prefetchQuery({
                queryKey: ['course-structure', courseId],
                queryFn: async () => {
                    const { data, error } = await supabase.rpc(
                        'get_course_structure',
                        { target_course_id: courseId }
                    );

                    if (error) {
                        // Fallback to standard query
                        const { data: fallbackData } = await supabase
                            .from('modules')
                            .select(`
                                id, 
                                title, 
                                module_order,
                                lessons (
                                    id, 
                                    title, 
                                    module_id, 
                                    content_type, 
                                    video_duration, 
                                    is_free_preview, 
                                    lesson_order, 
                                    is_live,
                                    created_at, 
                                    updated_at
                                )
                            `)
                            .eq('course_id', courseId)
                            .order('module_order', { ascending: true });

                        return fallbackData?.map((module: any) => ({
                            ...module,
                            lessons: (module.lessons || []).sort((a: any, b: any) => a.lesson_order - b.lesson_order)
                        }));
                    }

                    return data;
                },
                staleTime: 1000 * 60 * 5, // 5 minutes
            });

            // 2. Get first lesson and prefetch its data
            const structure = queryClient.getQueryData(['course-structure', courseId]) as any[];
            if (structure?.[0]?.lessons?.[0]) {
                const firstLesson = structure[0].lessons[0];
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    // Prefetch first lesson detailed data
                    await queryClient.prefetchQuery({
                        queryKey: ['lesson', firstLesson.id, courseId],
                        queryFn: () => fetchLessonDetailedData(
                            supabase,
                            firstLesson.id,
                            courseId,
                            user.id
                        ),
                        staleTime: 1000 * 60 * 10, // 10 minutes
                    });
                }
            }
        } catch (error) {
            // Silent fail - prefetching is optional enhancement
            // Navigation will still work, just not instant
            console.debug('Prefetch failed:', error);
        }
    };

    return { prefetchCourse };
}
