-- Check if RLS policies are applied
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename IN ('user_rewards', 'reward_transactions', 'user_badges')
ORDER BY tablename, policyname;

-- Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename IN ('user_rewards', 'reward_transactions', 'user_badges');
