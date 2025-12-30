-- ============================================================================
-- FIX: Complete RLS Policies for Exam Import Tables
-- ============================================================================
-- Fixes RLS errors for: exams, sections, questions, question_bank, options
-- ============================================================================

-- ============================================================================
-- 1. EXAMS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "exams_select_policy" ON exams;
DROP POLICY IF EXISTS "exams_insert_policy" ON exams;
DROP POLICY IF EXISTS "exams_update_policy" ON exams;
DROP POLICY IF EXISTS "exams_delete_policy" ON exams;

CREATE POLICY "exams_select_policy" ON exams
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

CREATE POLICY "exams_insert_policy" ON exams
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

CREATE POLICY "exams_update_policy" ON exams
    FOR UPDATE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

CREATE POLICY "exams_delete_policy" ON exams
    FOR DELETE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- ============================================================================
-- 2. SECTIONS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "sections_select_policy" ON sections;
DROP POLICY IF EXISTS "sections_insert_policy" ON sections;
DROP POLICY IF EXISTS "sections_update_policy" ON sections;
DROP POLICY IF EXISTS "sections_delete_policy" ON sections;

CREATE POLICY "sections_select_policy" ON sections
    FOR SELECT
    USING (
        exam_id IN (
            SELECT id FROM exams 
            WHERE tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "sections_insert_policy" ON sections
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND exam_id IN (
            SELECT id FROM exams 
            WHERE tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "sections_update_policy" ON sections
    FOR UPDATE
    USING (
        exam_id IN (
            SELECT id FROM exams 
            WHERE tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "sections_delete_policy" ON sections
    FOR DELETE
    USING (
        exam_id IN (
            SELECT id FROM exams 
            WHERE tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

-- ============================================================================
-- 3. QUESTIONS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "questions_select_policy" ON questions;
DROP POLICY IF EXISTS "questions_insert_policy" ON questions;
DROP POLICY IF EXISTS "questions_update_policy" ON questions;
DROP POLICY IF EXISTS "questions_delete_policy" ON questions;

CREATE POLICY "questions_select_policy" ON questions
    FOR SELECT
    USING (
        section_id IN (
            SELECT s.id FROM sections s
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "questions_insert_policy" ON questions
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND section_id IN (
            SELECT s.id FROM sections s
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "questions_update_policy" ON questions
    FOR UPDATE
    USING (
        section_id IN (
            SELECT s.id FROM sections s
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "questions_delete_policy" ON questions
    FOR DELETE
    USING (
        section_id IN (
            SELECT s.id FROM sections s
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

-- ============================================================================
-- 4. OPTIONS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "options_select_policy" ON options;
DROP POLICY IF EXISTS "options_insert_policy" ON options;
DROP POLICY IF EXISTS "options_update_policy" ON options;
DROP POLICY IF EXISTS "options_delete_policy" ON options;

CREATE POLICY "options_select_policy" ON options
    FOR SELECT
    USING (
        question_id IN (
            SELECT q.id FROM questions q
            INNER JOIN sections s ON q.section_id = s.id
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "options_insert_policy" ON options
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND question_id IN (
            SELECT q.id FROM questions q
            INNER JOIN sections s ON q.section_id = s.id
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "options_update_policy" ON options
    FOR UPDATE
    USING (
        question_id IN (
            SELECT q.id FROM questions q
            INNER JOIN sections s ON q.section_id = s.id
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

CREATE POLICY "options_delete_policy" ON options
    FOR DELETE
    USING (
        question_id IN (
            SELECT q.id FROM questions q
            INNER JOIN sections s ON q.section_id = s.id
            INNER JOIN exams e ON s.exam_id = e.id
            WHERE e.tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

-- ============================================================================
-- 5. QUESTION_BANK TABLE (if has tenant_id column)
-- ============================================================================
DROP POLICY IF EXISTS "question_bank_select_policy" ON question_bank;
DROP POLICY IF EXISTS "question_bank_insert_policy" ON question_bank;
DROP POLICY IF EXISTS "question_bank_update_policy" ON question_bank;
DROP POLICY IF EXISTS "question_bank_delete_policy" ON question_bank;

-- Check if question_bank has tenant_id column
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'question_bank' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Has tenant_id - use direct tenant check
        EXECUTE 'CREATE POLICY "question_bank_select_policy" ON question_bank
            FOR SELECT
            USING (
                tenant_id IN (
                    SELECT tenant_id 
                    FROM user_tenant_memberships 
                    WHERE user_id = auth.uid() 
                    AND is_active = true
                )
            )';
        
        EXECUTE 'CREATE POLICY "question_bank_insert_policy" ON question_bank
            FOR INSERT
            WITH CHECK (
                auth.uid() IS NOT NULL
                AND tenant_id IN (
                    SELECT tenant_id 
                    FROM user_tenant_memberships 
                    WHERE user_id = auth.uid() 
                    AND is_active = true
                )
            )';
    ELSE
        -- No tenant_id - allow authenticated users
        EXECUTE 'CREATE POLICY "question_bank_select_policy" ON question_bank
            FOR SELECT
            USING (auth.uid() IS NOT NULL)';
        
        EXECUTE 'CREATE POLICY "question_bank_insert_policy" ON question_bank
            FOR INSERT
            WITH CHECK (auth.uid() IS NOT NULL)';
    END IF;
END $$;

-- ============================================================================
-- 6. QUESTION_BANK_OPTIONS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "question_bank_options_select_policy" ON question_bank_options;
DROP POLICY IF EXISTS "question_bank_options_insert_policy" ON question_bank_options;

CREATE POLICY "question_bank_options_select_policy" ON question_bank_options
    FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "question_bank_options_insert_policy" ON question_bank_options
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('exams', 'sections', 'questions', 'options', 'question_bank', 'question_bank_options')
ORDER BY tablename, cmd, policyname;
