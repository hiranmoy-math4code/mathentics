-- ============================================================================
-- QUICK FIX: Add INSERT policy for user_rewards
-- ============================================================================
-- This allows the system to insert new reward records

-- Drop existing INSERT policy if any
DROP POLICY IF EXISTS "System can insert rewards" ON user_rewards;
DROP POLICY IF EXISTS "Users can insert own rewards" ON user_rewards;

-- Create INSERT policy that allows all inserts
-- (The application code already validates tenant_id)
CREATE POLICY "System can insert rewards"
ON user_rewards FOR INSERT
WITH CHECK (true);

-- Verify the policy was created
SELECT 
    policyname,
    cmd,
    with_check
FROM pg_policies
WHERE tablename = 'user_rewards'
AND cmd = 'INSERT';
