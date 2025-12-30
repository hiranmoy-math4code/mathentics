-- FIX: Lesson Progress RLS Policy
-- Problem: Mark as complete failing - likely RLS blocking insert/update
-- Solution: Add permissive RLS policy for lesson_progress table

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can manage their own lesson progress" ON public.lesson_progress;

-- Create policy: users can insert/update/select their own progress
CREATE POLICY "Users can manage their own lesson progress"
ON public.lesson_progress
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Verify policy created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'lesson_progress';
