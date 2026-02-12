-- ============================================================================
-- 🐞 DEBUG: CHECK REWARD & STREAK STATUS
-- ============================================================================
-- Run this to see what's happening with your streak
-- Replace 'YOUR_USER_ID' with the actual UUID
-- ============================================================================

-- 1. Check User Rewards (Streak & Dates)
SELECT 
    user_id,
    current_streak,
    longest_streak,
    last_activity_date, -- Should be TODAY (YYYY-MM-DD)
    last_coin_date,
    total_coins
FROM public.user_rewards
WHERE user_id = 'YOUR_USER_ID';

-- 2. Check Recent Login Transactions (Are there duplicates?)
SELECT 
    created_at,
    action_type,
    amount,
    entity_id, -- Should be today's date for 'login'
    description
FROM public.reward_transactions
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at DESC
LIMIT 10;

-- 3. Check Daily Missions (Is 'login' completed?)
SELECT 
    date, 
    missions->0 as login_mission -- Assuming login is first, or check full json
FROM public.daily_missions
WHERE user_id = 'YOUR_USER_ID'
ORDER BY date DESC
LIMIT 1;

-- 4. Check Active Triggers (Did the fix work?)
SELECT 
    event_object_table as table,
    trigger_name,
    action_timing
FROM information_schema.triggers
WHERE event_object_table = 'reward_transactions';
-- You should ONLY see:
-- 1. update_rewards_on_transaction
-- 2. update_streak_on_transaction
-- (If you see 'handle_reward_transaction', the fix didn't run!)
