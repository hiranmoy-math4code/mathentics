-- Function: add_question_with_options
-- Description: Copies a question and its options from the question bank to an exam section
-- Parameters: 
--   p_section_id: UUID of the target section
--   p_question_bank_id: UUID of the source question in the question bank
--   p_tenant_id: UUID of the tenant context

CREATE OR REPLACE FUNCTION public.add_question_with_options(
    p_section_id UUID,
    p_question_bank_id UUID,
    p_tenant_id UUID 
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_new_question_id UUID;
BEGIN
    -- 1. Insert the Question
    INSERT INTO public.questions (
        section_id,
        question_text,
        question_type,
        marks,
        negative_marks,
        correct_answer,
        explanation,
        tenant_id -- Make sure to include tenant_id
    )
    SELECT
        p_section_id,
        qb.question_text,
        qb.question_type,
        qb.marks,
        qb.negative_marks,
        qb.correct_answer,
        qb.explanation,
        p_tenant_id
    FROM public.question_bank qb
    WHERE qb.id = p_question_bank_id
    RETURNING id INTO v_new_question_id;

    -- 2. Insert the Options (if any)
    INSERT INTO public.options (
        question_id,
        option_text,
        option_order,
        is_correct,
        tenant_id -- Include tenant_id for options too if required
    )
    SELECT
        v_new_question_id,
        qbo.option_text,
        qbo.option_order,
        qbo.is_correct,
        p_tenant_id
    FROM public.question_bank_options qbo
    WHERE qbo.question_id = p_question_bank_id;

END;
$$;
