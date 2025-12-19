-- Test if the upsert works directly in SQL
-- This will help us understand if it's a Supabase JS client issue

INSERT INTO public.responses (attempt_id, question_id, student_answer, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,  -- dummy attempt_id
    '00000000-0000-0000-0000-000000000002'::uuid,  -- dummy question_id
    'test answer',
    NOW()
)
ON CONFLICT (attempt_id, question_id) 
DO UPDATE SET 
    student_answer = EXCLUDED.student_answer,
    updated_at = EXCLUDED.updated_at;

-- If this works, the constraint is fine and it's a Supabase JS client issue
-- If this fails, there's a problem with the constraint itself
