import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface PublicCourse {
    id: string;
    title: string;
    description: string | null;
    category: string | null;
    price: number;
    thumbnail_url: string | null;
    is_published: boolean;
    created_at: string;
    creator_id: string;
    profiles?: {
        full_name: string;
    };
}

export const usePublicCourses = () => {
    const supabase = createClient();

    return useQuery({
        queryKey: ["public-courses"],
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
                .select("*, profiles:creator_id(full_name)")
                .eq("is_published", true)
                .eq("course_type", "course")
                .eq("tenant_id", tenantId || '')
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as PublicCourse[];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const usePublicCoursesByCategory = (category?: string) => {
    const supabase = createClient();

    return useQuery({
        queryKey: ["public-courses", category],
        queryFn: async () => {
            let query = supabase
                .from("courses")
                .select("*, profiles:creator_id(full_name)")
                .eq("is_published", true);

            if (category) {
                query = query.eq("category", category);
            }

            const { data, error } = await query.order("created_at", { ascending: false });

            if (error) throw error;
            return data as PublicCourse[];
        },
        staleTime: 1000 * 60 * 5,
    });
};
