// hooks/admin/exams/useExams.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";

export const useExams = () => {
  const supabase = createClient();
  const tenantId = getTenantId();

  return useQuery({
    queryKey: ["exams", tenantId],
    queryFn: async () => {
      // Get current user for ownership filter
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .eq("tenant_id", tenantId) // ✅ Tenant filter
        .eq("admin_id", user.id) // ✅ Owner filter (admin_id is the creator)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as any[];
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}
