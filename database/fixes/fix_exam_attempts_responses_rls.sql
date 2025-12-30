-- ============================================================================
-- FIX: Complete RLS Policies for Exam Attempts and Responses
-- ============================================================================

-- ============================================================================
-- 1. EXAM_ATTEMPTS TABLE
-- ============================================================================
DROP POLICY IF EXISTS "exam_attempts_select_policy" ON exam_attempts;
DROP POLICY IF EXISTS "exam_attempts_insert_policy" ON exam_attempts;
DROP POLICY IF EXISTS "exam_attempts_update_policy" ON exam_attempts;
DROP POLICY IF EXISTS "exam_attempts_delete_policy" ON exam_attempts;

-- SELECT: Users can view their own attempts in their tenant
CREATE POLICY "exam_attempts_select_policy" ON exam_attempts
    FOR SELECT
    USING (
        (
            -- Own attempts
            student_id = auth.uid()
            OR
            -- Admin can view all in their tenant
            EXISTS (
                SELECT 1 FROM profiles
                WHERE id = auth.uid()
                AND role IN ('admin', 'super_admin')
            )
        )
        AND tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- INSERT: Students can create attempts for exams in their tenant
CREATE POLICY "exam_attempts_insert_policy" ON exam_attempts
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND student_id = auth.uid()
        AND tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
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

-- UPDATE: Users can update their own attempts
CREATE POLICY "exam_attempts_update_policy" ON exam_attempts
    FOR UPDATE
    USING (
        student_id = auth.uid()
        AND tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- DELETE: Only admins can delete attempts
CREATE POLICY "exam_attempts_delete_policy" ON exam_attempts
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('admin', 'super_admin')
        )
        AND tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- ============================================================================
-- 2. RESPONSES TABLE
-- ============================================================================
DROP POLICY IF EXISTS "responses_select_policy" ON responses;
DROP POLICY IF EXISTS "responses_insert_policy" ON responses;
DROP POLICY IF EXISTS "responses_update_policy" ON responses;
DROP POLICY IF EXISTS "responses_delete_policy" ON responses;

-- SELECT: Users can view their own responses
CREATE POLICY "responses_select_policy" ON responses
    FOR SELECT
    USING (
        attempt_id IN (
            SELECT id FROM exam_attempts
            WHERE student_id = auth.uid()
            AND tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
        OR
        -- Admins can view all responses in their tenant
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('admin', 'super_admin')
        )
    );

-- INSERT: Students can create responses for their attempts
CREATE POLICY "responses_insert_policy" ON responses
    FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND attempt_id IN (
            SELECT id FROM exam_attempts
            WHERE student_id = auth.uid()
            AND tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

-- UPDATE: Students can update their own responses (before submission)
CREATE POLICY "responses_update_policy" ON responses
    FOR UPDATE
    USING (
        attempt_id IN (
            SELECT id FROM exam_attempts
            WHERE student_id = auth.uid()
            AND tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

-- DELETE: Students can delete their own responses (before submission)
CREATE POLICY "responses_delete_policy" ON responses
    FOR DELETE
    USING (
        attempt_id IN (
            SELECT id FROM exam_attempts
            WHERE student_id = auth.uid()
            AND tenant_id IN (
                SELECT tenant_id 
                FROM user_tenant_memberships 
                WHERE user_id = auth.uid() 
                AND is_active = true
            )
        )
    );

-- ============================================================================
-- 3. ADD tenant_id to exam_attempts if not exists
-- ============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'exam_attempts' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Add tenant_id column
        ALTER TABLE exam_attempts 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Update existing rows with tenant_id from parent exam
        UPDATE exam_attempts ea
        SET tenant_id = e.tenant_id
        FROM exams e
        WHERE ea.exam_id = e.id;
        
        -- Make it NOT NULL after populating
        ALTER TABLE exam_attempts 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        -- Add index
        CREATE INDEX IF NOT EXISTS idx_exam_attempts_tenant_id ON exam_attempts(tenant_id);
        
        RAISE NOTICE 'Added tenant_id column to exam_attempts table';
    ELSE
        RAISE NOTICE 'tenant_id column already exists in exam_attempts table';
    END IF;
END $$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('exam_attempts', 'responses')
ORDER BY tablename, cmd, policyname;

-- Check tenant_id column
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'exam_attempts'
AND column_name = 'tenant_id';
