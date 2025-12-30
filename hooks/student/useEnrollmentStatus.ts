"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";

export function useEnrollmentStatus(userId: string | undefined) {
    const tenantId = getTenantId(); // ✅ Get from environment (no DB query!)

    return useQuery({
        queryKey: ["enrollment-status", userId, tenantId],
        queryFn: async (): Promise<Set<string>> => {
            if (!userId) return new Set();

            const supabase = createClient();

            const { data, error } = await supabase
                .from("enrollments")
                .select("course_id, courses!inner(course_type)")
                .eq("user_id", userId)
                .eq("tenant_id", tenantId)  // ✅ Tenant filter
                .eq("courses.course_type", "test_series");

            if (error) {
                console.error('Error fetching enrollment status:', error);
                throw error;
            }

            // Filter client-side as backup
            const filtered = (data || []).filter((item: any) => item.courses?.course_type === 'test_series');

            // Return a Set of enrolled series IDs for quick lookup
            return new Set(filtered.map((e: any) => e.course_id) || []);
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
}
