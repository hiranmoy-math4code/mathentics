-- ============================================================================
-- FIX: Enrollment RLS Policy for Multi-Tenant Purchase
-- ============================================================================
-- Problem: Users can't enroll in courses from other tenants
-- Solution: Allow users to enroll in ANY tenant's courses

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Users can view their own enrollments in active tenant" ON public.enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments in active tenant" ON public.enrollments;

-- ============================================================================
-- NEW POLICY: Users can view ALL their enrollments (any tenant)
-- ============================================================================
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments
FOR SELECT
USING (user_id = auth.uid());

-- ============================================================================
-- NEW POLICY: Users can enroll in ANY tenant's courses
-- ============================================================================
CREATE POLICY "Users can insert enrollments"
ON public.enrollments
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- UPDATE POLICY: Users can update their own enrollments
-- ============================================================================
DROP POLICY IF EXISTS "Users can update their own enrollments" ON public.enrollments;

CREATE POLICY "Users can update their own enrollments"
ON public.enrollments
FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Check all enrollment policies
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
WHERE tablename = 'enrollments'
ORDER BY policyname;
