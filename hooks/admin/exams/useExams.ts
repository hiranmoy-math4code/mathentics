// hooks/admin/exams/useExams.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";

export const useExams = () => {
  const supabase = createClient();
  const tenantId = getTenantId(); // ✅ Get tenant ID

  return useQuery({
    queryKey: ["exams", tenantId], // ✅ Include tenant
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .eq("tenant_id", tenantId) // ✅ SECURITY FIX
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []) as any[];
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}
