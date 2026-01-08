"use client";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface DashboardStats {
  examsCount: number;
  questionsCount: number;
  attemptsCount: number;
  uniqueStudents: number;
}

export const useDashboardStats = (userId: string) => {
  const supabase = createClient();

  return useQuery<DashboardStats>({
    queryKey: ["admin-dashboard-stats", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No userId provided");

      // Get tenant_id from environment
      const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

      // Call the optimized RPC function with tenant_id
      const { data, error } = await supabase
        .rpc('get_admin_dashboard_stats', {
          admin_uuid: userId,
          p_tenant_id: tenantId  // ✅ Pass tenant_id from env
        });

      if (error) {
        console.error("Dashboard fetch error:", error);
        // Fallback to zeros on error
        return {
          examsCount: 0,
          questionsCount: 0,
          attemptsCount: 0,
          uniqueStudents: 0,
        };
      }

      return data as DashboardStats;
    },
    enabled: !!userId,
  });
};
