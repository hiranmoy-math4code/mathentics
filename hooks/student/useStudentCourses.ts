import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

interface EnrolledCourse {
    id: string
    title: string
    description: string
    thumbnail_url: string | null
    course_type: string
    progress_percentage: number
    last_accessed_at: string | null
    total_lessons: number
    completed_lessons: number
}

export function useStudentCourses(userId: string | undefined) {
    return useQuery({
        queryKey: ["student-courses", userId],
        queryFn: async ({ signal }) => {
            if (!userId) {
                return []
            }

            const supabase = createClient()

            // ✅ OPTIMIZED: Direct query instead of RPC function
            // Progress is already calculated by trigger!
            const { data: enrollments, error } = await supabase
                .from('enrollments')
                .select(`
                    id,
                    course_id,
                    progress_percentage,
                    last_accessed_at,
                    status,
                    courses (
                        id,
                        title,
                        description,
                        thumbnail_url,
                        course_type
                    )
                `)
                .eq('user_id', userId)
                .in('status', ['active', 'completed'])
                .order('last_accessed_at', { ascending: false, nullsFirst: false })
                .abortSignal(signal);

            if (error) {
                // Ignore AbortError caused by navigation
                if (error.code === '20' || error.message.includes('AbortError') || error.message.includes('aborted')) {
                    return [];
                }
                console.error('Error fetching student courses:', error);
                throw error
            }

            if (!enrollments || enrollments.length === 0) {
                return [];
            }

            // Get course IDs for batch queries
            const courseIds = enrollments.map(e => e.course_id);

            // ✅ OPTIMIZED: Batch query for lesson counts (cached)
            const { data: lessonsData } = await supabase
                .from('modules')
                .select(`
                    course_id,
                    lessons!inner(id)
                `)
                .in('course_id', courseIds)
                .abortSignal(signal);

            // ✅ OPTIMIZED: Batch query for completed lessons (cached)
            const { data: completedData } = await supabase
                .from('lesson_progress')
                .select('course_id, lesson_id')
                .eq('user_id', userId)
                .eq('completed', true)
                .in('course_id', courseIds)
                .abortSignal(signal);

            // Calculate lesson counts per course
            const lessonCounts: Record<string, number> = {};
            const completedCounts: Record<string, number> = {};

            lessonsData?.forEach((module: any) => {
                const courseId = module.course_id;
                lessonCounts[courseId] = (lessonCounts[courseId] || 0) + (module.lessons?.length || 0);
            });

            completedData?.forEach((progress: any) => {
                const courseId = progress.course_id;
                completedCounts[courseId] = (completedCounts[courseId] || 0) + 1;
            });

            // Map enrollments to courses with progress data
            const courses = enrollments
                .filter((e: any) => e.courses?.course_type === 'course') // Only courses, not test series
                .map((enrollment: any) => ({
                    id: enrollment.courses.id,
                    title: enrollment.courses.title,
                    description: enrollment.courses.description,
                    thumbnail_url: enrollment.courses.thumbnail_url,
                    course_type: enrollment.courses.course_type,
                    progress_percentage: enrollment.progress_percentage || 0, // ✅ Already updated by trigger!
                    last_accessed_at: enrollment.last_accessed_at,
                    total_lessons: lessonCounts[enrollment.course_id] || 0,
                    completed_lessons: completedCounts[enrollment.course_id] || 0,
                })) as EnrolledCourse[];

            return courses;
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes cache (progress updates via trigger)
    })
}
