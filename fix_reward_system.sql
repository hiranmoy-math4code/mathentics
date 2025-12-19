-- ============================================================================
-- COMPLETE REWARD SYSTEM FIX
-- ============================================================================
-- This script fixes coins and streaks not updating
-- Run this entire script in Supabase SQL Editor
-- ============================================================================

-- STEP 1: Ensure user_rewards table exists and has correct structure
-- (This should already exist from full_schema.sql, but let's verify)

-- STEP 2: Initialize user_rewards for existing users who don't have a record
INSERT INTO public.user_rewards (user_id, total_coins, xp, level, current_streak, longest_streak)
SELECT 
    p.id,
    0,  -- total_coins
    0,  -- xp
    1,  -- level
    0,  -- current_streak
    0   -- longest_streak
FROM public.profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_rewards ur WHERE ur.user_id = p.id
)
ON CONFLICT (user_id) DO NOTHING;

-- STEP 3: Create the streak and coin update trigger function
CREATE OR REPLACE FUNCTION public.update_user_rewards_on_transaction()
RETURNS TRIGGER AS $$
DECLARE
    v_last_activity_date DATE;
    v_current_streak INT;
    v_longest_streak INT;
    v_new_streak INT;
    v_level INT;
    v_xp INT;
BEGIN
    -- Ensure user_rewards record exists
    INSERT INTO public.user_rewards (user_id, total_coins, xp, level, current_streak, longest_streak)
    VALUES (NEW.user_id, 0, 0, 1, 0, 0)
    ON CONFLICT (user_id) DO NOTHING;

    -- Get current data
    SELECT last_activity_date, current_streak, longest_streak, xp, level
    INTO v_last_activity_date, v_current_streak, v_longest_streak, v_xp, v_level
    FROM public.user_rewards
    WHERE user_id = NEW.user_id;

    -- Process login actions for streak
    IF NEW.action_type = 'login' THEN
        -- Calculate new streak
        IF v_last_activity_date IS NULL THEN
            v_new_streak := 1;
        ELSIF v_last_activity_date = CURRENT_DATE THEN
            v_new_streak := v_current_streak;
        ELSIF v_last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
            v_new_streak := v_current_streak + 1;
        ELSE
            v_new_streak := 1;
        END IF;

        -- Update longest streak
        IF v_new_streak > v_longest_streak THEN
            v_longest_streak := v_new_streak;
        END IF;

        -- Update with streak
        UPDATE public.user_rewards
        SET 
            current_streak = v_new_streak,
            longest_streak = v_longest_streak,
            last_activity_date = CURRENT_DATE,
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
            level = FLOOR((xp + NEW.amount) / 100.0) + 1,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;

    ELSE
        -- For non-login actions, just update coins and XP
        UPDATE public.user_rewards
        SET 
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
            level = FLOOR((xp + NEW.amount) / 100.0) + 1,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 4: Drop and recreate trigger
DROP TRIGGER IF EXISTS update_rewards_on_transaction ON public.reward_transactions;

CREATE TRIGGER update_rewards_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_rewards_on_transaction();

-- STEP 5: Backfill coins from existing transactions
UPDATE public.user_rewards ur
SET 
    total_coins = COALESCE((
        SELECT SUM(amount) 
        FROM public.reward_transactions rt 
        WHERE rt.user_id = ur.user_id
    ), 0),
    xp = COALESCE((
        SELECT SUM(amount) 
        FROM public.reward_transactions rt 
        WHERE rt.user_id = ur.user_id
    ), 0),
    level = FLOOR(COALESCE((
        SELECT SUM(amount) 
        FROM public.reward_transactions rt 
        WHERE rt.user_id = ur.user_id
    ), 0) / 100.0) + 1;

-- STEP 6: Recalculate streaks from login transactions
WITH login_dates AS (
    SELECT 
        user_id,
        DATE(created_at) as login_date,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY DATE(created_at) DESC) as rn
    FROM public.reward_transactions
    WHERE action_type = 'login'
),
streak_calc AS (
    SELECT 
        user_id,
        MAX(login_date) as last_login,
        CASE 
            WHEN MAX(login_date) = CURRENT_DATE OR MAX(login_date) = CURRENT_DATE - INTERVAL '1 day' THEN
                COUNT(DISTINCT login_date) FILTER (
                    WHERE login_date >= CURRENT_DATE - INTERVAL '30 days'
                    AND login_date <= CURRENT_DATE
                )
            ELSE 0
        END as current_streak
    FROM login_dates
    GROUP BY user_id
)
UPDATE public.user_rewards ur
SET 
    current_streak = COALESCE(sc.current_streak, 0),
    longest_streak = GREATEST(ur.longest_streak, COALESCE(sc.current_streak, 0)),
    last_activity_date = sc.last_login
FROM streak_calc sc
WHERE ur.user_id = sc.user_id;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify the fix worked:

-- 1. Check user_rewards table
-- SELECT * FROM public.user_rewards LIMIT 10;

-- 2. Check reward transactions
-- SELECT * FROM public.reward_transactions ORDER BY created_at DESC LIMIT 10;

-- 3. Check specific user
-- SELECT ur.*, 
--        (SELECT COUNT(*) FROM public.reward_transactions WHERE user_id = ur.user_id) as transaction_count
-- FROM public.user_rewards ur
-- WHERE user_id = 'YOUR_USER_ID';

-- ============================================================================
-- TEST: Award yourself some coins
-- ============================================================================
-- Replace 'YOUR_USER_ID' with your actual user ID:
-- INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
-- VALUES ('YOUR_USER_ID', 10, 'bonus', 'Test reward');
--
-- Then check:
-- SELECT total_coins, xp, level FROM public.user_rewards WHERE user_id = 'YOUR_USER_ID';
