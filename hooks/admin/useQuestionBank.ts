import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useTenantId } from "@/hooks/useTenantId";
import { getTenantId } from "@/lib/tenant"; // For mutation if needed, or pass from hook

/**
 * Hook to fetch questions from the question bank with pagination
 * @param page - Current page number (0-indexed)
 * @param pageSize - Number of questions per page (default: 20)
 */
export function useQuestionBank(page: number = 0, pageSize: number = 20) {
    const tenantId = useTenantId();
    return useQuery({
        queryKey: ['question-bank', page, pageSize, tenantId],
        queryFn: async () => {
            if (!tenantId) return { questions: [], totalCount: 0 };
            const supabase = createClient();

            const from = page * pageSize;
            const to = from + pageSize - 1;

            const { data, error, count } = await supabase
                .from('question_bank')
                .select('*', { count: 'exact' })
                .eq('tenant_id', tenantId) // ✅ Tenant Filter
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;
            return { questions: data || [], totalCount: count || 0 };
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        placeholderData: (previousData) => previousData, // Keep previous data while loading
    });
}

/**
 * Hook to fetch question IDs already added to an exam
 * Takes a sectionId and returns all question IDs from all sections in that exam
 */
export function useExamQuestions(sectionId: string | null) {
    return useQuery({
        queryKey: ['exam-questions', sectionId],
        queryFn: async () => {
            if (!sectionId) return [];

            const supabase = createClient();

            // Get exam_id from section
            const { data: sectionData, error: sectionError } = await supabase
                .from('sections')
                .select('exam_id')
                .eq('id', sectionId)
                .single();

            if (sectionError || !sectionData) return [];

            // Get all sections in exam
            const { data: examSections, error: sectionsError } = await supabase
                .from('sections')
                .select('id')
                .eq('exam_id', sectionData.exam_id);

            if (sectionsError || !examSections) return [];

            const sectionIds = examSections.map(s => s.id);

            // Get only question IDs from all sections (much faster than fetching full text)
            const { data: questions, error: questionsError } = await supabase
                .from('questions')
                .select('id')
                .in('section_id', sectionIds);

            if (questionsError) return [];

            // Return question IDs
            return questions?.map(q => q.id) || [];
        },
        enabled: !!sectionId,
        staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    });
}

/**
 * Hook to add a question from the bank to a section
 * Prevents duplicates by checking question_text similarity
 */
export function useAddQuestionFromBank() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ sectionId, questionBankId, tenantId }: { sectionId: string; questionBankId: string; tenantId?: string }) => {
            const supabase = createClient();
            // Use passed tenantId or try to get it (mutations logic)
            const resolvedTenantId = tenantId || getTenantId();

            // Get the question from question_bank
            const { data: bankQuestion, error: bankError } = await supabase
                .from('question_bank')
                .select('question_text')
                .eq('id', questionBankId)
                .eq('tenant_id', resolvedTenantId) // ✅ Security Check
                .single();

            if (bankError || !bankQuestion) {
                throw new Error('Question not found in bank');
            }

            // Check if a question with the same text already exists in this section
            const { data: existing } = await supabase
                .from('questions')
                .select('id')
                .eq('section_id', sectionId)
                .eq('question_text', bankQuestion.question_text)
                .maybeSingle();

            if (existing) {
                throw new Error('This question is already added to this section');
            }

            const { error } = await supabase.rpc('add_question_with_options', {
                p_section_id: sectionId,
                p_question_bank_id: questionBankId,
                p_tenant_id: resolvedTenantId,
            });

            if (error) throw error;
            return { sectionId, questionBankId };
        },
        onSuccess: (data) => {
            // Invalidate exam questions to refetch
            queryClient.invalidateQueries({ queryKey: ['exam-questions', data.sectionId] });
            queryClient.invalidateQueries({ queryKey: ['section-questions', data.sectionId] });
        },
    });
}
