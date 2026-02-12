-- ============================================================================
-- ⚡ UNIFIED REWARD LOGIC: FIX RACE CONDITION
-- ============================================================================
-- PROBLEM: The separate triggers caused a race condition.
-- 1. 'update_rewards' ran first -> set last_activity_date to TODAY.
-- 2. 'update_streak' ran second -> saw TODAY -> thought "Already logged in" -> didn't increment.
--
-- SOLUTION: Combine both into ONE function that reads state ONCE and updates ONCE.
-- ============================================================================

BEGIN;

-- 1. Drop the separate triggers/functions from the previous attempted fix
DROP TRIGGER IF EXISTS update_rewards_on_transaction ON public.reward_transactions;
DROP TRIGGER IF EXISTS update_streak_on_transaction ON public.reward_transactions;
DROP FUNCTION IF EXISTS public.update_user_rewards_on_transaction() CASCADE;
DROP FUNCTION IF EXISTS public.update_streak_on_login() CASCADE;

-- 2. Create the UNIFIED function
CREATE OR REPLACE FUNCTION public.handle_new_transaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    -- Current State
    v_total_coins INTEGER;
    v_xp INTEGER;
    v_daily_coins INTEGER;
    v_last_coin_date DATE;
    v_last_activity_date DATE;
    v_current_streak INTEGER;
    v_longest_streak INTEGER;
    v_weekly_xp INTEGER;
    
    -- Calculated State
    v_coins_to_add INTEGER;
    v_new_streak INTEGER;
    v_new_longest_streak INTEGER;
    v_new_weekly_xp INTEGER;
BEGIN
    -- A. CREATE/GET USER RECORD
    -- -------------------------
    INSERT INTO public.user_rewards (
        user_id, tenant_id, total_coins, xp, level, 
        current_streak, longest_streak, daily_coins_earned, 
        last_coin_date, last_activity_date, weekly_xp
    )
    VALUES (
        NEW.user_id, NEW.tenant_id, 0, 0, 1, 
        0, 0, 0, 
        NULL, NULL, 0
    )
    ON CONFLICT (user_id, tenant_id) DO NOTHING;

    -- Lock the row and read current state
    SELECT 
        total_coins, xp, daily_coins_earned, last_coin_date, 
        last_activity_date, current_streak, longest_streak, weekly_xp
    INTO 
        v_total_coins, v_xp, v_daily_coins, v_last_coin_date,
        v_last_activity_date, v_current_streak, v_longest_streak, v_weekly_xp
    FROM public.user_rewards
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id
    FOR UPDATE; -- Lock to prevent partial updates

    -- B. CALCULATE REWARDS (Coins/XP/Daily Cap)
    -- -----------------------------------------
    -- Reset daily counter if new day
    IF v_last_coin_date IS NULL OR v_last_coin_date < CURRENT_DATE THEN
        v_daily_coins := 0;
    END IF;

    -- Check daily cap (100 coins)
    v_coins_to_add := NEW.amount;
    IF v_daily_coins + v_coins_to_add > 100 THEN
        v_coins_to_add := GREATEST(0, 100 - v_daily_coins);
        NEW.amount := v_coins_to_add; -- Adjust transaction amount to reflect what was actually given? 
                                      -- Optional: keep transaction as is, but only award capped amount.
                                      -- For now, we'll actually limit the ADDITION, but transaction log says original.
    END IF;

    -- Calculate Weekly XP (Reset if new week)
    IF v_last_activity_date IS NULL OR EXTRACT(WEEK FROM v_last_activity_date) != EXTRACT(WEEK FROM CURRENT_DATE) THEN
        v_new_weekly_xp := v_coins_to_add;
    ELSE
        v_new_weekly_xp := v_weekly_xp + v_coins_to_add;
    END IF;

    -- C. CALCULATE STREAK (Only for 'login')
    -- --------------------------------------
    v_new_streak := v_current_streak;
    v_new_longest_streak := v_longest_streak;

    IF NEW.action_type = 'login' THEN
        -- Mark Daily Mission
        PERFORM public.update_mission_progress(NEW.user_id, 'login');

        IF v_last_activity_date IS NULL THEN
            -- First ever login
            v_new_streak := 1;
        ELSIF v_last_activity_date = CURRENT_DATE THEN
            -- Already logged in today: No change
            v_new_streak := GREATEST(v_current_streak, 1);
        ELSIF v_last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
            -- Consecutive day: Increment
            v_new_streak := v_current_streak + 1;
        ELSE
            -- Missed a day: Reset
            v_new_streak := 1;
        END IF;

        v_new_longest_streak := GREATEST(v_longest_streak, v_new_streak);
        
        -- Award Bonuses (If streak increased)
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
    END IF;

    -- D. UPDATE USER RECORD (Single Update)
    -- ------------------------------------
    UPDATE public.user_rewards
    SET 
        total_coins = total_coins + v_coins_to_add,
        xp = xp + v_coins_to_add,
        level = FLOOR((xp + v_coins_to_add) / 100.0) + 1,
        daily_coins_earned = v_daily_coins + v_coins_to_add,
        last_coin_date = CURRENT_DATE,
        weekly_xp = v_new_weekly_xp,
        current_streak = v_new_streak,
        longest_streak = v_new_longest_streak,
        last_activity_date = CURRENT_DATE,
        updated_at = NOW()
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    RETURN NEW;
END;
$$;

-- 3. Create the ONE trigger
CREATE TRIGGER on_transaction_update_rewards
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_transaction();

COMMIT;
