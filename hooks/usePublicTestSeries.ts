import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface PublicTestSeries {
    id: string;
    title: string;
    description: string | null;
    price: number;
    thumbnail_url: string | null;
    created_at: string;
    creator_id: string;
}

export const usePublicTestSeries = () => {
    const supabase = createClient();

    return useQuery({
        queryKey: ["public-test-series"],
        queryFn: async () => {
            // Get tenant from domain (3-tier detection)
            let tenantId: string | null = null;

            // Try to get from domain
            const domain = window.location.host;
            const { data: tenant } = await supabase
                .from('tenants')
                .select('id')
                .eq('custom_domain', domain)
                .eq('is_active', true)
                .maybeSingle();

            tenantId = tenant?.id || null;

            // If no tenant, use default
            if (!tenantId) {
                const { data: defaultTenant } = await supabase
                    .from('tenants')
                    .select('id')
                    .eq('slug', 'math4code')
                    .eq('is_active', true)
                    .maybeSingle();
                tenantId = defaultTenant?.id;
            }

            // Query with tenant filter
            const { data, error } = await supabase
                .from("courses")
                .select("*")
                .eq("is_published", true)
                .eq("course_type", "test_series")
                .eq("tenant_id", tenantId || '')
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as PublicTestSeries[];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
