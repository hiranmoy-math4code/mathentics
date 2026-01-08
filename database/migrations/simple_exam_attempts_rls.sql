-- ============================================================================
-- SIMPLIFIED RLS POLICIES FOR exam_attempts (Without Tenant Isolation)
-- ============================================================================
-- Since your code already filters by tenant_id in queries,
-- we can use simpler policies focused on user ownership
-- ============================================================================

-- Enable RLS on exam_attempts table
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- POLICY 1: Students can view their own attempts
-- ============================================================================
DROP POLICY IF EXISTS "Students can view own attempts" ON exam_attempts;

CREATE POLICY "Students can view own attempts" 
ON exam_attempts 
FOR SELECT 
USING (student_id = auth.uid());

-- Explanation:
-- ✅ Students can only see attempts where student_id matches their user ID
-- ✅ Simple and secure
-- ❌ No tenant check (handled in code)

-- ============================================================================
-- POLICY 2: Students can create their own attempts
-- ============================================================================
DROP POLICY IF EXISTS "Students can create attempts" ON exam_attempts;

CREATE POLICY "Students can create attempts" 
ON exam_attempts 
FOR INSERT 
WITH CHECK (student_id = auth.uid());

-- Explanation:
-- ✅ Students can only create attempts for themselves
-- ✅ Prevents impersonation
-- ❌ No tenant check (handled in code)

-- ============================================================================
-- POLICY 3: Students can update their own attempts
-- ============================================================================
DROP POLICY IF EXISTS "Students can update own attempts" ON exam_attempts;

CREATE POLICY "Students can update own attempts" 
ON exam_attempts 
FOR UPDATE 
USING (student_id = auth.uid());

-- Explanation:
-- ✅ Students can only update their own attempts
-- ✅ Prevents cheating (can't update others' attempts)
-- ❌ No tenant check (handled in code)

-- ============================================================================
-- POLICY 4: Admins can view all attempts (optional)
-- ============================================================================
DROP POLICY IF EXISTS "Admins can view all attempts" ON exam_attempts;

CREATE POLICY "Admins can view all attempts" 
ON exam_attempts 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);

-- Explanation:
-- ✅ Admins can see all attempts across all tenants
-- ✅ Useful for super-admin dashboard
-- ⚠️ Remove this if you want strict tenant isolation

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check all policies on exam_attempts
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
WHERE tablename = 'exam_attempts';

-- Test as student (should only see own attempts)
-- SELECT * FROM exam_attempts;  -- Run as student user

-- Test as admin (should see all attempts)
-- SELECT * FROM exam_attempts;  -- Run as admin user

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================
-- DROP POLICY IF EXISTS "Students can view own attempts" ON exam_attempts;
-- DROP POLICY IF EXISTS "Students can create attempts" ON exam_attempts;
-- DROP POLICY IF EXISTS "Students can update own attempts" ON exam_attempts;
-- DROP POLICY IF EXISTS "Admins can view all attempts" ON exam_attempts;
-- ALTER TABLE exam_attempts DISABLE ROW LEVEL SECURITY;
