-- ============================================================================
-- FIX: Exams Table RLS Policy for INSERT
-- ============================================================================
-- Error: new row violates row-level security policy for table "exams"
-- ============================================================================

-- Check current policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'exams'
ORDER BY policyname;

-- ============================================================================
-- DROP OLD POLICIES (if needed)
-- ============================================================================
DROP POLICY IF EXISTS "exams_select_policy" ON exams;
DROP POLICY IF EXISTS "exams_insert_policy" ON exams;
DROP POLICY IF EXISTS "exams_update_policy" ON exams;
DROP POLICY IF EXISTS "exams_delete_policy" ON exams;

-- ============================================================================
-- CREATE NEW RLS POLICIES FOR EXAMS
-- ============================================================================

-- SELECT: Users can view exams from their tenant
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

-- INSERT: Authenticated users can create exams for their tenant
CREATE POLICY "exams_insert_policy" ON exams
    FOR INSERT
    WITH CHECK (
        -- Must be authenticated
        auth.uid() IS NOT NULL
        AND
        -- Tenant must be one of user's active tenants
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- UPDATE: Users can update exams from their tenant
CREATE POLICY "exams_update_policy" ON exams
    FOR UPDATE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    )
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- DELETE: Users can delete exams from their tenant
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
-- VERIFICATION
-- ============================================================================
-- Check policies are created
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'exams';

-- Test INSERT (replace with actual values)
-- INSERT INTO exams (tenant_id, title, duration_minutes, total_marks)
-- VALUES (
--     (SELECT tenant_id FROM user_tenant_memberships WHERE user_id = auth.uid() AND is_active = true LIMIT 1),
--     'Test Exam',
--     60,
--     100
-- );
