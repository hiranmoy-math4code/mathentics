-- ============================================================================
-- COMPLETE FIX: Replace ALL courses policies
-- ============================================================================

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "tenant_isolation_courses_select" ON courses;
DROP POLICY IF EXISTS "tenant_isolation_courses_insert" ON courses;
DROP POLICY IF EXISTS "tenant_isolation_courses_update" ON courses;
DROP POLICY IF EXISTS "tenant_isolation_courses_delete" ON courses;
DROP POLICY IF EXISTS "Users can insert courses in their tenant" ON courses;

-- Step 2: Create new working policies

-- SELECT: Users can view courses in their tenant
CREATE POLICY "tenant_isolation_courses_select"
ON courses FOR SELECT
TO public
USING (
  tenant_id IN (
    SELECT tenant_id 
    FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND is_active = true
  )
);

-- INSERT: Admins/creators can create courses
CREATE POLICY "tenant_isolation_courses_insert"
ON courses FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id 
    FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator')
    AND is_active = true
  )
);

-- UPDATE: Admins/creators can update courses in their tenant
CREATE POLICY "tenant_isolation_courses_update"
ON courses FOR UPDATE
TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id 
    FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator')
    AND is_active = true
  )
)
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id 
    FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator')
    AND is_active = true
  )
);

-- DELETE: Admins can delete courses in their tenant
CREATE POLICY "tenant_isolation_courses_delete"
ON courses FOR DELETE
TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id 
    FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
    AND is_active = true
  )
);

-- Step 3: Verify policies
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'courses';

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ All courses policies updated!';
    RAISE NOTICE 'Try creating a course now.';
END $$;
