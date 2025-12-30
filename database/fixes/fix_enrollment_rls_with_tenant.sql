-- FIX ENROLLMENT VISIBILITY WITH TENANT ISOLATION
-- Problem: Students can't see their enrollments (RLS blocking)
-- Requirement: User should ONLY see enrollments from their CURRENT tenant
-- 
-- Example:
-- User enrolled in Tenant A course → Should NOT see it when browsing Tenant B
-- User enrolled in Tenant B course → Should see it when browsing Tenant B

-- Drop existing policy
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

-- Create policy with tenant isolation
-- This checks:
-- 1. User owns the enrollment (user_id = auth.uid())
-- 2. Enrollment belongs to user's ACTIVE tenant membership
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments 
FOR SELECT 
TO authenticated 
USING (
  user_id = auth.uid()
  AND
  tenant_id IN (
    SELECT tenant_id 
    FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND is_active = true
  )
);

-- Verify policy created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'enrollments' 
AND policyname = 'Users can view their own enrollments';
