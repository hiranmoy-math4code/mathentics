"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

interface TestSeriesProgress {
    id: string;
    title: string;
    description: string | null;
    thumbnail_url: string | null;
    progress: number;
    completedExams: number;
    totalExams: number;
    nextExamDate: string | null;
    nextExamName: string | null;
}

export function useStudentTestSeries(userId: string | undefined) {
    return useQuery({
        queryKey: ["student-test-series", userId],
        queryFn: async (): Promise<TestSeriesProgress[]> => {
            if (!userId) return [];

            const supabase = createClient();

            // Use same RPC as courses - it returns ALL enrolled courses
            const { data, error } = await supabase
                .rpc('get_student_courses_progress', { target_user_id: userId });

            if (error) {
                console.error('Error fetching student test series:', error);
                throw error;
            }

            // Filter to show only test series
            const testSeries = (data || []).filter((item: any) => item.course_type === 'test_series');

            // Map to expected format
            return testSeries.map((item: any) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                thumbnail_url: item.thumbnail_url,
                progress: item.progress_percentage || 0,
                completedExams: item.completed_lessons || 0,
                totalExams: item.total_lessons || 0,
                nextExamDate: null,
                nextExamName: null
            }));
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        retry: 1,
    });
}
