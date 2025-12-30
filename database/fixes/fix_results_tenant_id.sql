-- ============================================================================
-- FIX: Add tenant_id to results and section_results tables
-- ============================================================================

-- 1. Add tenant_id to results table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'results' 
        AND column_name = 'tenant_id'
    ) THEN
        ALTER TABLE results 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Populate from parent exam_attempts
        UPDATE results r
        SET tenant_id = ea.tenant_id
        FROM exam_attempts ea
        WHERE r.attempt_id = ea.id;
        
        ALTER TABLE results 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_results_tenant_id ON results(tenant_id);
        
        RAISE NOTICE 'Added tenant_id to results table';
    END IF;
END $$;

-- 2. Add tenant_id to section_results table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'section_results' 
        AND column_name = 'tenant_id'
    ) THEN
        ALTER TABLE section_results 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Populate from parent results
        UPDATE section_results sr
        SET tenant_id = r.tenant_id
        FROM results r
        WHERE sr.result_id = r.id;
        
        ALTER TABLE section_results 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_section_results_tenant_id ON section_results(tenant_id);
        
        RAISE NOTICE 'Added tenant_id to section_results table';
    END IF;
END $$;

-- 3. Update submit_exam_attempt RPC to include tenant_id
CREATE OR REPLACE FUNCTION public.submit_exam_attempt(p_attempt_id uuid, p_exam_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_total_marks numeric := 0;
    v_obtained_marks numeric := 0;
    v_percentage numeric := 0;
    v_result_id uuid;
    v_tenant_id uuid;
    v_return_data jsonb;
BEGIN
    -- Get tenant_id from exam_attempts
    SELECT tenant_id INTO v_tenant_id
    FROM public.exam_attempts
    WHERE id = p_attempt_id;

    -- Check if already submitted to prevent double submission
    IF EXISTS (SELECT 1 FROM public.results WHERE attempt_id = p_attempt_id) THEN
        RETURN jsonb_build_object('error', 'Exam already submitted');
    END IF;

    -- Update status to submitted immediately to prevent race conditions
    UPDATE public.exam_attempts 
    SET status = 'submitted', submitted_at = now() 
    WHERE id = p_attempt_id;

    -- Calculate Total Marks for Exam
    SELECT COALESCE(total_marks, 0) INTO v_total_marks 
    FROM public.exams WHERE id = p_exam_id;

    -- Calculate results using CTE approach
    WITH ranked_answers AS (
        SELECT 
            q.section_id,
            q.id as q_id,
            q.marks,
            q.negative_marks,
            q.question_type,
            q.correct_answer as nat_correct,
            r.student_answer,
            -- For MCQ/MSQ correctness
            (
                CASE 
                    WHEN q.question_type = 'MCQ' THEN 
                        EXISTS (SELECT 1 FROM public.options o WHERE o.id::text = r.student_answer AND o.question_id = q.id AND o.is_correct = true)
                    WHEN q.question_type = 'NAT' THEN 
                        (r.student_answer::numeric - q.correct_answer::numeric) BETWEEN -0.01 AND 0.01
                    WHEN q.question_type = 'MSQ' THEN
                        (
                            SELECT array_agg(id::text ORDER BY id) FROM public.options WHERE question_id = q.id AND is_correct = true
                        ) = (
                            SELECT ARRAY(SELECT jsonb_array_elements_text(r.student_answer::jsonb) ORDER BY 1)
                        )
                    ELSE false
                END
            ) as is_correct,
            (r.student_answer IS NOT NULL AND r.student_answer != '' AND r.student_answer != '[]') as is_attempted
        FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        LEFT JOIN public.responses r ON q.id = r.question_id AND r.attempt_id = p_attempt_id
        WHERE s.exam_id = p_exam_id
    ),
    section_stats AS (
        SELECT 
            section_id,
            SUM(marks) as sec_total_marks,
            SUM(CASE 
                WHEN is_correct THEN marks 
                WHEN is_attempted AND NOT is_correct THEN -ABS(negative_marks)
                ELSE 0 
            END) as sec_obtained_marks,
            COUNT(*) FILTER (WHERE is_correct) as sec_correct,
            COUNT(*) FILTER (WHERE is_attempted AND NOT is_correct) as sec_wrong,
            COUNT(*) FILTER (WHERE NOT is_attempted) as sec_unanswered
        FROM ranked_answers
        GROUP BY section_id
    )
    -- Insert Main Result with tenant_id
    , main_insert AS (
        INSERT INTO public.results (tenant_id, attempt_id, total_marks, obtained_marks, percentage)
        SELECT 
            v_tenant_id,  -- ✅ Added tenant_id
            p_attempt_id,
            v_total_marks,
            SUM(sec_obtained_marks),
            CASE WHEN v_total_marks > 0 THEN ROUND((SUM(sec_obtained_marks) / v_total_marks) * 100, 2) ELSE 0 END
        FROM section_stats
        RETURNING id, obtained_marks, percentage
    )
    -- Insert Section Results with tenant_id
    INSERT INTO public.section_results (tenant_id, result_id, section_id, total_marks, obtained_marks, correct_answers, wrong_answers, unanswered)
    SELECT 
        v_tenant_id,  -- ✅ Added tenant_id
        (SELECT id FROM main_insert),
        section_id,
        sec_total_marks,
        sec_obtained_marks,
        sec_correct,
        sec_wrong,
        sec_unanswered
    FROM section_stats;

    -- Get Final Result Data to Return
    SELECT jsonb_build_object(
        'id', r.id,
        'attempt_id', r.attempt_id,
        'total_marks', r.total_marks,
        'obtained_marks', r.obtained_marks,
        'percentage', r.percentage,
        'created_at', r.created_at
    ) INTO v_return_data
    FROM public.results r
    WHERE r.attempt_id = p_attempt_id;

    RETURN v_return_data;
END;
$function$;

-- 4. Create RLS policies for results and section_results
DROP POLICY IF EXISTS "results_select_policy" ON results;
DROP POLICY IF EXISTS "results_insert_policy" ON results;

CREATE POLICY "results_select_policy" ON results
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

CREATE POLICY "results_insert_policy" ON results
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

DROP POLICY IF EXISTS "section_results_select_policy" ON section_results;
DROP POLICY IF EXISTS "section_results_insert_policy" ON section_results;

CREATE POLICY "section_results_select_policy" ON section_results
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

CREATE POLICY "section_results_insert_policy" ON section_results
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- Verify
SELECT 'results' as table_name, COUNT(*) as null_count 
FROM results WHERE tenant_id IS NULL
UNION ALL
SELECT 'section_results', COUNT(*) 
FROM section_results WHERE tenant_id IS NULL;
