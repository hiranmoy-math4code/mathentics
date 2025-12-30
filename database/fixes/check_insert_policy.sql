-- Check current RLS policies for user_rewards
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'user_rewards'
ORDER BY policyname;

-- Check if the INSERT policy exists
SELECT COUNT(*) as insert_policy_count
FROM pg_policies
WHERE tablename = 'user_rewards'
AND cmd = 'INSERT';
