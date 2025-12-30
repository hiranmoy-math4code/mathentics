"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";
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
            const tenantId = getTenantId(); // ✅ Get from environment (no DB query!)

            if (!tenantId) {
                return [];
            }

            // Fetch test series with tenant filtering
            const { data, error } = await supabase
                .from('courses')
                .select(`
                    id,
                    title,
                    description,
                    thumbnail_url,
                    price,
                    course_type,
                    is_published,
                    created_at,
                    creator_id,
                    profiles:creator_id (full_name)
                `)
                .eq('tenant_id', tenantId)
                .eq('is_published', true)
                .eq('course_type', 'test_series')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                console.error('Error fetching test series:', error);
                throw error;
            }

            // Check enrollment status if user is logged in
            let enrolledSeriesIds = new Set<string>();
            if (user?.id) {
                const { data: enrollments } = await supabase
                    .from('enrollments')
                    .select('course_id')
                    .eq('user_id', user.id)
                    .eq('tenant_id', tenantId)
                    .eq('status', 'active');

                enrolledSeriesIds = new Set(enrollments?.map(e => e.course_id) || []);
            }

            // Format response
            const testSeries = (data || []).map((series: any) => ({
                id: series.id,
                title: series.title,
                description: series.description,
                thumbnail_url: series.thumbnail_url,
                price: series.price,
                course_type: series.course_type,
                is_published: series.is_published,
                created_at: series.created_at,
                instructor_name: series.profiles?.full_name || 'Admin',
                is_enrolled: enrolledSeriesIds.has(series.id),
                total_lessons: 0
            }));

            return testSeries as TestSeries[];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
