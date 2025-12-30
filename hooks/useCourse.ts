import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";

export const useCourse = (courseId: string) => {
    const supabase = createClient();
    const tenantId = getTenantId(); // ✅ Get tenant ID from environment

    return useQuery({
        queryKey: ['course', courseId, tenantId], // ✅ Include tenant in cache key
        queryFn: async ({ signal }) => {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .eq('tenant_id', tenantId) // ✅ SECURITY FIX: Filter by tenant
                .abortSignal(signal)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!courseId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30,   // 30 minutes
        retry: 1,
    });
};
