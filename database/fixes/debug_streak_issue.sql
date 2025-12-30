-- ============================================================================
-- DEBUG: Check Streak Update Issue
-- ============================================================================

-- 1. Check if triggers exist
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'reward_transactions'
ORDER BY trigger_name;

-- 2. Check your current streak data
SELECT 
    user_id,
    tenant_id,
    current_streak,
    longest_streak,
    last_activity_date,
    total_coins
FROM user_rewards
WHERE user_id = (SELECT auth.uid())
LIMIT 5;

-- 3. Check recent reward transactions
SELECT 
    id,
    user_id,
    tenant_id,
    action_type,
    amount,
    created_at
FROM reward_transactions
WHERE user_id = (SELECT auth.uid())
ORDER BY created_at DESC
LIMIT 10;

-- 4. Check if login transaction exists today
SELECT 
    COUNT(*) as login_count_today,
    SUM(amount) as total_coins_today
FROM reward_transactions
WHERE user_id = (SELECT auth.uid())
    AND action_type = 'login'
    AND created_at >= CURRENT_DATE;

-- 5. Manually test streak update trigger
-- (This will show if trigger function has errors)
SELECT update_streak_on_login() FROM reward_transactions 
WHERE action_type = 'login' 
AND user_id = (SELECT auth.uid())
ORDER BY created_at DESC 
LIMIT 1;
