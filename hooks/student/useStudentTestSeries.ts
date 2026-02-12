import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { getTenantId } from "@/lib/tenant"

interface EnrolledTestSeries {
    id: string
    title: string
    description: string
    thumbnail_url: string | null
    course_type: string
    progress: number
    last_accessed_at: string | null
    total_tests: number
    completed_tests: number
    totalExams: number
    completedExams: number
}

export function useStudentTestSeries(userId: string | undefined) {
    return useQuery({
        queryKey: ["student-test-series", userId],
        queryFn: async ({ signal }) => {
            if (!userId) {
                return []
            }

            const supabase = createClient()

            // ✅ OPTIMIZED: Direct query instead of RPC function
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
                .eq('tenant_id', getTenantId()) // ✅ Strict Tenant Isolation
                .in('status', ['active', 'completed', 'expired'])
                .order('last_accessed_at', { ascending: false, nullsFirst: false })
                .abortSignal(signal);

            if (error) {
                if (error.code === '20' || error.message.includes('AbortError') || error.message.includes('aborted')) {
                    return [];
                }
                console.error('Error fetching student test series:', error);
                throw error
            }

            if (!enrollments || enrollments.length === 0) {
                return [];
            }

            // Get course IDs for test series only
            const testSeriesIds = enrollments
                .filter((e: any) => e.courses?.course_type === 'test_series')
                .map(e => e.course_id);

            if (testSeriesIds.length === 0) {
                return [];
            }

            // ✅ OPTIMIZED: Parallel query for lesson counts and completed tests
            const [lessonsResult, completedResult] = await Promise.all([
                supabase
                    .from('modules')
                    .select(`
                        course_id,
                        lessons!inner(id)
                    `)
                    .in('course_id', testSeriesIds)
                    .abortSignal(signal),

                supabase
                    .from('lesson_progress')
                    .select('course_id, lesson_id')
                    .eq('user_id', userId)
                    .eq('completed', true)
                    .in('course_id', testSeriesIds)
                    .abortSignal(signal)
            ]);

            const lessonsData = lessonsResult.data;
            const completedData = completedResult.data;

            // Calculate counts per test series
            const testCounts: Record<string, number> = {};
            const completedCounts: Record<string, number> = {};

            lessonsData?.forEach((module: any) => {
                const courseId = module.course_id;
                testCounts[courseId] = (testCounts[courseId] || 0) + (module.lessons?.length || 0);
            });

            completedData?.forEach((progress: any) => {
                const courseId = progress.course_id;
                completedCounts[courseId] = (completedCounts[courseId] || 0) + 1;
            });

            // Map enrollments to test series with progress data
            const testSeries = enrollments
                .filter((e: any) => e.courses?.course_type === 'test_series') // Only test series
                .map((enrollment: any) => ({
                    id: enrollment.courses.id,
                    title: enrollment.courses.title,
                    description: enrollment.courses.description,
                    thumbnail_url: enrollment.courses.thumbnail_url,
                    course_type: enrollment.courses.course_type,
                    progress: enrollment.progress_percentage || 0, // ✅ Already updated by trigger!
                    last_accessed_at: enrollment.last_accessed_at,
                    total_tests: testCounts[enrollment.course_id] || 0,
                    completed_tests: completedCounts[enrollment.course_id] || 0,
                    totalExams: testCounts[enrollment.course_id] || 0,
                    completedExams: completedCounts[enrollment.course_id] || 0,
                })) as EnrolledTestSeries[];

            return testSeries;
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    })
}
