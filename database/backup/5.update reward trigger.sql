-- Drop old triggers
DROP TRIGGER IF EXISTS update_rewards_on_transaction ON public.reward_transactions;

-- Create correct trigger
CREATE TRIGGER update_rewards_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_reward_transaction();

-- Fix for extendAccess Error: Add Admin UPDATE Policy for Enrollments
-- 
-- Problem: Admins can SELECT enrollments but cannot UPDATE them
-- Solution: Add RLS policy to allow admins to UPDATE all enrollments
-- Add admin UPDATE policy for enrollments
CREATE POLICY "Admins can update all enrollments" 
ON public.enrollments 
FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);
-- Also add admin SELECT policy if not exists (for consistency)
CREATE POLICY "Admins can view all enrollments" 
ON public.enrollments 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);
-- Verify the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'enrollments'
ORDER BY policyname;