"use client";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";

/**
 * Fetches an exam and its related sections.
 */
export const useExamQuery = (examId: string) => {
  const supabase = createClient();
  const tenantId = getTenantId(); // ✅ Get tenant ID

  return useQuery({
    queryKey: ["exam", examId, tenantId], // ✅ Include tenant
    queryFn: async () => {
      if (!examId) throw new Error("Missing exam ID");

      // Fetch exam details (tenant-filtered)
      const { data: exam, error: examError } = await supabase
        .from("exams")
        .select("*")
        .eq("id", examId)
        .eq("tenant_id", tenantId) // ✅ SECURITY FIX
        .single();

      if (examError) throw examError;
      if (!exam) throw new Error("Exam not found");

      // Fetch sections with questions (tenant-filtered)
      const { data: sections, error: sectionsError } = await supabase
        .from("sections")
        .select("*, questions(*)")
        .eq("exam_id", examId)
        .eq("tenant_id", tenantId) // ✅ SECURITY FIX
        .order("section_order", { ascending: true });

      if (sectionsError) {
        console.error("Section fetch error:", sectionsError);
        throw sectionsError;
      }

      return { ...exam, sections: sections ?? [] };
    },
    enabled: !!examId,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
