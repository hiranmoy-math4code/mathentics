"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function useCourseAnalytics(courseId: string) {
    return useQuery({
        queryKey: ["course-analytics", courseId],
        queryFn: async () => {
            const supabase = createClient();

            // 1. Get Course Info
            const { data: course, error: courseError } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single();

            if (courseError) throw courseError;

            // 2. Get Enrollment Stats
            const { count: totalLearners } = await supabase
                .from('enrollments')
                .select('*', { count: 'exact', head: true })
                .eq('course_id', courseId);

            // 3. Get Revenue Stats
            const { data: payments } = await supabase
                .from('course_payments')
                .select('amount, created_at')
                .eq('course_id', courseId)
                .eq('status', 'success');

            const totalRevenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;

            // 4. Enrollment Trend (last 30 days)
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: recentEnrollments } = await supabase
                .from('enrollments')
                .select('created_at')
                .eq('course_id', courseId)
                .gte('created_at', thirtyDaysAgo.toISOString());

            // 5. Lesson Progress Stats
            const { data: modules } = await supabase
                .from('modules')
                .select('id, title, lessons(id, title)')
                .eq('course_id', courseId);

            const lessonIds = modules?.flatMap(m => m.lessons.map((l: any) => l.id)) || [];

            let avgProgress = 0;
            if (lessonIds.length > 0 && totalLearners && totalLearners > 0) {
                const { count: completedLessons } = await supabase
                    .from('lesson_progress')
                    .select('*', { count: 'exact', head: true })
                    .in('lesson_id', lessonIds)
                    .eq('completed', true);

                avgProgress = (completedLessons || 0) / (totalLearners * lessonIds.length) * 100;
            }

            return {
                course,
                stats: {
                    totalLearners: totalLearners || 0,
                    totalRevenue,
                    avgProgress: Math.round(avgProgress),
                    totalLessons: lessonIds.length
                },
                recentEnrollments: recentEnrollments || [],
                payments: payments || []
            };
        },
        enabled: !!courseId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
