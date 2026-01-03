"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { getTenantId } from "@/lib/tenant";

export const useQuestionMutations = (sectionId: string) => {
    const queryClient = useQueryClient();
    const supabase = createClient();
    const tenantId = getTenantId();

    // Optimistic Question Reordering
    const reorderQuestions = useMutation({
        mutationFn: async (questions: any[]) => {
            // 1. Prepare updates for all affected questions
            const updates = questions.map((q, index) => {
                // Destructure to remove nested objects or non-db fields that might cause errors
                const { options, ...cleanQ } = q;
                return {
                    ...cleanQ,
                    question_order: index,
                    section_id: q.section_id || sectionId,
                    tenant_id: q.tenant_id || tenantId
                };
            });

            // 2. Perform batched upsert (more efficient than individual updates)
            const { error } = await supabase
                .from("questions")
                .upsert(updates, { onConflict: "id" }); // Assuming 'id' is the primary key

            if (error) throw error;
            return updates;
        },
        onMutate: async (newOrder) => {
            await queryClient.cancelQueries({ queryKey: ["section-questions", sectionId] });
            const previousQuestions = queryClient.getQueryData(["section-questions", sectionId]);

            // Optimistically update
            queryClient.setQueryData(["section-questions", sectionId], newOrder);

            return { previousQuestions };
        },
        onError: (err: any, variables, context) => {
            queryClient.setQueryData(["section-questions", sectionId], context?.previousQuestions);
            const errorMessage = err.message || (typeof err === 'string' ? err : 'Unknown error');
            toast.error(`Failed to reorder questions: ${errorMessage}`);
            console.error("Reorder error:", err);
        },
        // No onSettled/invalidate needed if we trust the optimistic state to be correct
    });

    // Edit Question (Content, Marks, etc.)
    const updateQuestion = useMutation({
        mutationFn: async ({ questionId, updates }: { questionId: string; updates: any }) => {
            const { options, ...questionUpdates } = updates;

            // 1. Update question fields
            const { error: qError } = await supabase
                .from("questions")
                .update(questionUpdates)
                .eq("id", questionId);

            if (qError) throw qError;

            // 2. Update options if provided
            if (options && Array.isArray(options)) {
                // For simplicity and to handle additions/deletions, 
                // we'll delete existing options and insert new ones
                // This is a common pattern for small collections like question options

                // First, delete
                const { error: dError } = await supabase
                    .from("options")
                    .delete()
                    .eq("question_id", questionId);

                if (dError) throw dError;

                // Then, insert
                if (options.length > 0) {
                    const optionsToInsert = options.map((opt, index) => ({
                        question_id: questionId,
                        option_text: opt.text || opt.option_text, // Handle both mapping formats
                        is_correct: opt.is_correct,
                        option_order: index,
                        tenant_id: tenantId
                    }));

                    const { error: iError } = await supabase
                        .from("options")
                        .insert(optionsToInsert);

                    if (iError) throw iError;
                }
            }

            return { id: questionId, ...updates };
        },
        onMutate: async ({ questionId, updates }) => {
            await queryClient.cancelQueries({ queryKey: ["section-questions", sectionId] });
            const previousQuestions = queryClient.getQueryData<any[]>(["section-questions", sectionId]);

            // Optimistically update
            if (previousQuestions) {
                queryClient.setQueryData(["section-questions", sectionId], previousQuestions.map(q =>
                    q.id === questionId ? { ...q, ...updates } : q
                ));
            }

            return { previousQuestions };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["section-questions", sectionId], context?.previousQuestions);
            toast.error("Failed to update question");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["section-questions", sectionId] });
        }
    });

    // Delete Question
    const deleteQuestion = useMutation({
        mutationFn: async (questionId: string) => {
            const { error } = await supabase
                .from("questions")
                .delete()
                .eq("id", questionId);

            if (error) throw error;
            return questionId;
        },
        onMutate: async (questionId) => {
            await queryClient.cancelQueries({ queryKey: ["section-questions", sectionId] });
            const previousQuestions = queryClient.getQueryData<any[]>(["section-questions", sectionId]);

            if (previousQuestions) {
                queryClient.setQueryData(["section-questions", sectionId], previousQuestions.filter(q => q.id !== questionId));
            }

            return { previousQuestions };
        },
        onError: (err, varialbes, context) => {
            queryClient.setQueryData(["section-questions", sectionId], context?.previousQuestions);
            toast.error("Failed to delete question");
        }
    });

    // Add Question from Bank (Single or Bulk) - Handled by existing hook, but can add here if unified

    return {
        reorderQuestions,
        updateQuestion,
        deleteQuestion
    };
};
