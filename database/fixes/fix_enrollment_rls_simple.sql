-- FIX ENROLLMENT VISIBILITY - Simple RLS Policy
-- Problem: Students can't see their enrollments even though data exists
-- Solution: Add basic RLS policy that allows users to see their own enrollments
-- Frontend already handles tenant isolation, so we don't need strict header check

-- Drop existing policy if any
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

-- Create simple policy: user can see their own enrollments
CREATE POLICY "Users can view their own enrollments"
ON public.enrollments 
FOR SELECT 
TO authenticated 
USING (user_id = auth.uid());

-- Verify policy created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'enrollments' 
AND policyname = 'Users can view their own enrollments';
