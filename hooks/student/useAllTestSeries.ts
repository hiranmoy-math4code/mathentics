"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "./useCurrentUser";

interface TestSeries {
    id: string;
    title: string;
    description: string | null;
    thumbnail_url: string | null;
    price: number;
    course_type: string;
    is_published: boolean;
    created_at: string;
    instructor_name: string;
    is_enrolled: boolean;
    total_lessons: number;
}

export function useAllTestSeries() {
    const { data: user } = useCurrentUser();

    return useQuery({
        queryKey: ["all-test-series", user?.id],
        queryFn: async (): Promise<TestSeries[]> => {
            const supabase = createClient();

            // Use RPC function for optimized query
            const { data, error } = await supabase
                .rpc('get_published_courses_with_meta', {
                    target_user_id: user?.id || null,
                    p_limit: 50,
                    p_offset: 0
                });

            if (error) {
                console.error('Error fetching test series:', error);
                throw error;
            }

            // Filter for test series only
            const testSeries = (data || []).filter((item: any) => item.course_type === 'test_series');

            return testSeries as TestSeries[];
        },
        // Remove enabled condition - should work even without user
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
