-- ==========================================
-- REWARD SYSTEM DIAGNOSTIC QUERIES
-- ==========================================
-- Run these queries in Supabase SQL Editor to diagnose the issue

-- 1. CHECK IF TRIGGER EXISTS
SELECT 
    trigger_name, 
    event_manipulation, 
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_reward_transaction_process';
-- Expected: Should return 1 row if trigger exists
-- If empty: Trigger is NOT installed


-- 2. CHECK IF FUNCTION EXISTS
SELECT 
    routine_name, 
    routine_type,
    routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name = 'handle_reward_transaction';
-- Expected: Should return 1 row if function exists
-- If empty: Function is NOT installed


-- 3. CHECK RECENT LOGIN TRANSACTIONS
SELECT 
    id,
    user_id,
    action_type,
    amount,
    entity_id,
    created_at
FROM reward_transactions 
WHERE action_type = 'login' 
ORDER BY created_at DESC 
LIMIT 10;
-- This shows login rewards ARE being created


-- 4. CHECK USER_REWARDS TABLE
SELECT 
    user_id,
    total_coins,
    daily_coins_earned,
    current_streak,
    longest_streak,
    last_activity_date,
    last_coin_date,
    xp,
    level
FROM user_rewards
ORDER BY updated_at DESC
LIMIT 5;
-- If streak = 0 and daily_coins_earned = 0, trigger is NOT working


-- 5. MANUAL TEST - Insert a test transaction and see if it updates
-- (Uncomment to test)
/*
INSERT INTO reward_transactions (user_id, action_type, amount, entity_id, description)
VALUES (
    (SELECT user_id FROM user_rewards LIMIT 1),
    'bonus',
    10,
    'test-' || NOW()::text,
    'Manual test transaction'
);

-- Then check if user_rewards was updated:
SELECT total_coins, daily_coins_earned FROM user_rewards 
WHERE user_id = (SELECT user_id FROM user_rewards LIMIT 1);
*/


-- ==========================================
-- DIAGNOSIS RESULTS:
-- ==========================================
-- If Query 1 & 2 return EMPTY: You need to run the migration
-- If Query 3 shows transactions but Query 4 shows streak=0: Trigger not working
-- If Query 5 test doesn't update user_rewards: Trigger is missing
