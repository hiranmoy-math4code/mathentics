"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";
import { toast } from "sonner";

export function useBulkDeleteQuestions() {
    const queryClient = useQueryClient();
    const supabase = createClient();

    return useMutation({
        mutationFn: async (questionIds: string[]) => {
            if (!questionIds || questionIds.length === 0) {
                throw new Error("No questions selected");
            }

            // ✅ Get tenant_id using helper (works on client-side)
            const tenantId = getTenantId();

            if (!tenantId) {
                throw new Error("Tenant ID not configured");
            }

            const { data: questions, error: verifyError } = await supabase
                .from("question_bank")
                .select("id, tenant_id")
                .in("id", questionIds);

            if (verifyError) throw verifyError;

            const invalidQuestions = questions?.filter(q => q.tenant_id !== tenantId);
            if (invalidQuestions && invalidQuestions.length > 0) {
                console.error("❌ Invalid questions found:", invalidQuestions);
                throw new Error("Cannot delete questions from other tenants");
            }

            const { error: optionsError } = await supabase
                .from("question_bank_options")
                .delete()
                .in("question_id", questionIds);

            if (optionsError) throw optionsError;

            const { error: questionsError } = await supabase
                .from("question_bank")
                .delete()
                .in("id", questionIds)
                .eq("tenant_id", tenantId);

            if (questionsError) throw questionsError;

            return questionIds.length;
        },
        onSuccess: (count) => {
            toast.success(`Successfully deleted ${count} question${count > 1 ? 's' : ''}`);
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete questions");
        },
    });
}
