-- ============================================================================
-- 🚀 CONSOLIDATED REWARD SYSTEM FIX (FINAL)
-- ============================================================================
-- 1. Removes ALL legacy/conflicting triggers and functions
-- 2. Re-establishes the CORRECT tenant-aware logic
-- 3. Fixes the "Daily Login" mission not updating
-- 4. Ensures streaks calculate correctly
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: DROP CONFLICTING/LEGACY TRIGGERS & FUNCTIONS
-- ============================================================================

-- Drop triggers on reward_transactions (clean slate)
DROP TRIGGER IF EXISTS update_rewards_on_transaction ON public.reward_transactions;
DROP TRIGGER IF EXISTS update_streak_on_transaction ON public.reward_transactions;
DROP TRIGGER IF EXISTS handle_reward_transaction_trigger ON public.reward_transactions;
DROP TRIGGER IF EXISTS trg_handle_reward_transaction ON public.reward_transactions;
DROP TRIGGER IF EXISTS trg_update_streak ON public.reward_transactions;

-- Drop legacy functions
DROP FUNCTION IF EXISTS public.handle_reward_transaction() CASCADE;
DROP FUNCTION IF EXISTS public.calculate_level(integer) CASCADE;

-- Drop existing correct functions (to recreate them with latest logic)
DROP FUNCTION IF EXISTS public.update_user_rewards_on_transaction() CASCADE;
DROP FUNCTION IF EXISTS public.update_streak_on_login() CASCADE;

-- ============================================================================
-- STEP 2: RE-CREATE 'UPDATE REWARDS' FUNCTION (The Logic)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_user_rewards_on_transaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_coins_to_add INTEGER;
    v_last_coin_date DATE;
BEGIN
    -- Ensure user_rewards record exists for this tenant
    INSERT INTO public.user_rewards (
        user_id, 
        tenant_id,
        total_coins, 
        xp, 
        level,
        current_streak,
        longest_streak,
        daily_coins_earned,
        last_coin_date,
        last_activity_date
    )
    VALUES (
        NEW.user_id,
        NEW.tenant_id,
        0,
        0,
        1,
        0,
        0,
        0,
        NULL,
        CURRENT_DATE
    )
    ON CONFLICT (user_id, tenant_id) DO NOTHING;

    -- Get current daily coins for this tenant
    SELECT daily_coins_earned, last_coin_date
    INTO v_coins_to_add, v_last_coin_date
    FROM public.user_rewards
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    -- Reset daily counter if new day
    IF v_last_coin_date IS NULL OR v_last_coin_date < CURRENT_DATE THEN
        v_coins_to_add := 0;
    END IF;

    -- Check daily cap (100 coins per day per tenant)
    IF v_coins_to_add + NEW.amount > 100 THEN
        NEW.amount := GREATEST(0, 100 - v_coins_to_add);
    END IF;

    -- Update user_rewards for this tenant only
    -- Logic: XP = Coins (1:1), Level = XP / 100 + 1
    UPDATE public.user_rewards
    SET 
        total_coins = total_coins + NEW.amount,
        xp = xp + NEW.amount,
        level = FLOOR((xp + NEW.amount) / 100.0) + 1,
        daily_coins_earned = CASE 
            WHEN last_coin_date < CURRENT_DATE THEN NEW.amount
            ELSE daily_coins_earned + NEW.amount
        END,
        last_coin_date = CURRENT_DATE,
        weekly_xp = CASE
            WHEN EXTRACT(WEEK FROM last_activity_date) = EXTRACT(WEEK FROM CURRENT_DATE)
            THEN weekly_xp + NEW.amount
            ELSE NEW.amount
        END,
        last_activity_date = CURRENT_DATE,
        updated_at = NOW()
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    RETURN NEW;
END;
$$;

-- ============================================================================
-- STEP 3: RE-CREATE 'UPDATE STREAK' FUNCTION (The Streak Logic)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_streak_on_login()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_last_date DATE;
    v_current_streak INTEGER;
    v_longest_streak INTEGER;
    v_new_streak INTEGER;
BEGIN
    -- Only process 'login' action
    IF NEW.action_type != 'login' THEN
        RETURN NEW;
    END IF;

    -- 1. UPDATE DAILY MISSION (Fix for "Login" mission not checking off)
    PERFORM public.update_mission_progress(NEW.user_id, 'login');

    -- 2. CALCULATE STREAK
    SELECT 
        last_activity_date,
        COALESCE(current_streak, 0),
        COALESCE(longest_streak, 0)
    INTO 
        v_last_date,
        v_current_streak,
        v_longest_streak
    FROM public.user_rewards
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    -- Calculate new streak
    IF v_last_date IS NULL THEN
        -- First login in this tenant
        v_new_streak := 1;
    ELSIF v_last_date = CURRENT_DATE THEN
        -- Already logged in today: KEEP SAME STREAK (don't reset!)
        v_new_streak := GREATEST(v_current_streak, 1);
    ELSIF v_last_date = CURRENT_DATE - INTERVAL '1 day' THEN
        -- Consecutive day
        v_new_streak := v_current_streak + 1;
    ELSE
        -- Streak broken (missed more than 1 day)
        v_new_streak := 1;
    END IF;

    -- Update streak for this tenant
    UPDATE public.user_rewards
    SET 
        current_streak = v_new_streak,
        longest_streak = GREATEST(COALESCE(longest_streak, 0), v_new_streak),
        last_activity_date = CURRENT_DATE,
        updated_at = NOW()
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    -- 3. AWARD STREAK BONUSES (Only if streak INCREASED today)
    IF v_new_streak > v_current_streak THEN
        IF v_new_streak = 3 THEN
            INSERT INTO public.reward_transactions (user_id, tenant_id, amount, action_type, description)
            VALUES (NEW.user_id, NEW.tenant_id, 10, 'streak_3', '3-day streak bonus!');
        ELSIF v_new_streak = 7 THEN
            INSERT INTO public.reward_transactions (user_id, tenant_id, amount, action_type, description)
            VALUES (NEW.user_id, NEW.tenant_id, 30, 'streak_7', '7-day streak bonus!');
        ELSIF v_new_streak = 30 THEN
            INSERT INTO public.reward_transactions (user_id, tenant_id, amount, action_type, description)
            VALUES (NEW.user_id, NEW.tenant_id, 100, 'streak_30', '30-day streak bonus!');
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- ============================================================================
-- STEP 4: RE-CREATE TRIGGERS (The Glue)
-- ============================================================================

CREATE TRIGGER update_rewards_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_rewards_on_transaction();

CREATE TRIGGER update_streak_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_streak_on_login();

COMMIT;
