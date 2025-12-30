-- ============================================================================
-- COMPLETE RLS FIX: Temporarily disable RLS for testing
-- ============================================================================
-- This will allow you to create courses while we debug the issue

-- Step 1: Check current policies
SELECT schemaname, tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'courses'
ORDER BY policyname;

-- Step 2: Temporarily disable RLS (for testing only!)
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;

-- Step 3: After testing, re-enable with proper policy
/*
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert courses in their tenant" ON courses;

CREATE POLICY "Users can insert courses in their tenant"
ON courses FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_tenant_memberships
    WHERE user_id = auth.uid()
      AND tenant_id = courses.tenant_id
      AND role IN ('admin', 'creator')
      AND is_active = true
  )
);
*/

-- Verify RLS is disabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'courses';
