"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { getTenantId } from "@/lib/tenant";

export const useSectionMutations = (examId: string) => {
    const queryClient = useQueryClient();
    const supabase = createClient();
    const tenantId = getTenantId();

    // Toggle shuffle questions
    const updateSection = useMutation({
        mutationFn: async ({ sectionId, updates }: { sectionId: string; updates: any }) => {
            const { data, error } = await supabase
                .from("sections")
                .update(updates)
                .eq("id", sectionId)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onMutate: async ({ sectionId, updates }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["exam-sections", examId] });
            await queryClient.cancelQueries({ queryKey: ["section", sectionId] });

            // Snapshot previous values
            const previousSections = queryClient.getQueryData(["exam-sections", examId]);
            const previousSectionInfo = queryClient.getQueryData(["section", sectionId]);

            // Optimistically update exam sections list
            queryClient.setQueryData(["exam-sections", examId], (old: any[]) => {
                return old?.map((section) =>
                    section.id === sectionId ? { ...section, ...updates } : section
                );
            });

            // Optimistically update section info (for section detail page)
            queryClient.setQueryData(["section", sectionId], (old: any) => {
                return old ? { ...old, ...updates } : old;
            });

            return { previousSections, previousSectionInfo };
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousSections) {
                queryClient.setQueryData(["exam-sections", examId], context.previousSections);
            }
            if (context?.previousSectionInfo) {
                queryClient.setQueryData(["section", variables.sectionId], context.previousSectionInfo);
            }
            toast.error("Failed to update section");
        },
        onSettled: () => {
            // Optional: Refetch to ensure sync, or rely on optimistic if confident
            // queryClient.invalidateQueries({ queryKey: ["exam-sections", examId] });
        },
    });

    return { updateSection };
};
