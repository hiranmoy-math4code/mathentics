-- ==========================================
-- DEBUG: Why is streak still 0?
-- ==========================================

-- 1. Check if trigger is installed
SELECT 
    tgname as trigger_name,
    tgrelid::regclass as table_name,
    proname as function_name,
    tgenabled as enabled
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_reward_transaction_process';
-- Expected: Should show trigger is enabled
-- If empty: Trigger not installed


-- 2. Check recent login transactions
SELECT 
    id,
    user_id,
    action_type,
    amount,
    entity_id,
    description,
    created_at
FROM reward_transactions 
WHERE action_type = 'login' 
ORDER BY created_at DESC 
LIMIT 5;


-- 3. Check user_rewards for the same user
SELECT 
    ur.user_id,
    ur.total_coins,
    ur.daily_coins_earned,
    ur.current_streak,
    ur.longest_streak,
    ur.last_activity_date,
    ur.last_coin_date,
    ur.xp,
    ur.level,
    ur.updated_at
FROM user_rewards ur
WHERE ur.user_id IN (
    SELECT DISTINCT user_id 
    FROM reward_transactions 
    WHERE action_type = 'login' 
    ORDER BY created_at DESC 
    LIMIT 1
);


-- 4. Test the trigger manually
-- Insert a test transaction for your user
DO $$
DECLARE
    test_user_id uuid;
BEGIN
    -- Get the most recent login user
    SELECT user_id INTO test_user_id
    FROM reward_transactions 
    WHERE action_type = 'login' 
    ORDER BY created_at DESC 
    LIMIT 1;
    
    -- Insert a test bonus transaction
    INSERT INTO reward_transactions (user_id, action_type, amount, entity_id, description)
    VALUES (test_user_id, 'bonus', 10, 'manual-test-' || NOW()::text, 'Manual trigger test');
    
    RAISE NOTICE 'Test transaction inserted for user: %', test_user_id;
END $$;

-- Now check if user_rewards was updated
SELECT 
    user_id,
    total_coins,
    daily_coins_earned,
    current_streak,
    updated_at
FROM user_rewards
WHERE user_id IN (
    SELECT user_id 
    FROM reward_transactions 
    WHERE description LIKE 'Manual trigger test%'
    LIMIT 1
)
ORDER BY updated_at DESC;


-- 5. Check for trigger errors in logs
-- (This might not work depending on your Supabase plan)
SELECT * FROM pg_stat_user_functions 
WHERE funcname = 'handle_reward_transaction';
