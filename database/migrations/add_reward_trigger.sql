-- ==========================================
-- FIXED REWARD TRIGGER - Corrects Streak Bug
-- ==========================================

-- 1. Helper Function: Calculate Level from XP
CREATE OR REPLACE FUNCTION public.calculate_level(p_xp integer)
RETURNS integer AS $$
BEGIN
    RETURN GREATEST(1, floor(sqrt(p_xp::numeric / 100.0))::integer);
END;
$$ LANGUAGE plpgsql IMMUTABLE;


-- 2. Main Trigger Function (FIXED)
CREATE OR REPLACE FUNCTION public.handle_reward_transaction()
RETURNS TRIGGER AS $$
DECLARE
    -- Current State Variables
    v_user_record public.user_rewards%ROWTYPE;
    v_today date := CURRENT_DATE;
    v_yesterday date := CURRENT_DATE - 1;
    
    -- Calculated Values
    v_new_streak integer;
    v_new_longest_streak integer;
    v_xp_gain integer;
    v_coins_gain integer;
    
    -- Constants
    c_xp_multiplier constant integer := 10; -- 1 Coin = 10 XP
    c_daily_cap constant integer := 100;    -- Max coins per day
BEGIN
    -- A. FETCH USER STATE (Locking the row for consistency)
    SELECT * INTO v_user_record 
    FROM public.user_rewards 
    WHERE user_id = NEW.user_id 
    FOR UPDATE;

    -- If user doesn't exist in user_rewards, create them first (Safety Net)
    IF NOT FOUND THEN
        INSERT INTO public.user_rewards (user_id) VALUES (NEW.user_id)
        RETURNING * INTO v_user_record;
    END IF;

    -- B. INITIALIZE VARIABLES
    v_new_streak := COALESCE(v_user_record.current_streak, 0);
    v_new_longest_streak := COALESCE(v_user_record.longest_streak, 0);
    v_coins_gain := NEW.amount;
    v_xp_gain := NEW.amount * c_xp_multiplier;

    -- C. HANDLE DAILY RESET
    -- If the last coin earned date is NOT today, reset the daily counter
    IF v_user_record.last_coin_date IS NULL OR v_user_record.last_coin_date <> v_today THEN
        v_user_record.daily_coins_earned := 0;
    END IF;

    -- D. CHECK DAILY CAP
    -- If (daily_earned + gain) > cap, gain = cap - daily_earned
    IF (COALESCE(v_user_record.daily_coins_earned, 0) + v_coins_gain) > c_daily_cap THEN
       v_coins_gain := GREATEST(0, c_daily_cap - COALESCE(v_user_record.daily_coins_earned, 0));
       -- Adjust XP to match the actual coin gain
       v_xp_gain := v_coins_gain * c_xp_multiplier;
    END IF;

    -- E. UPDATE STREAK (Only for 'login' actions)
    IF NEW.action_type = 'login' THEN
        -- FIX: Handle NULL last_activity_date (first login)
        IF v_user_record.last_activity_date IS NULL THEN
            -- First time login
            v_new_streak := 1;
        ELSIF v_user_record.last_activity_date = v_today THEN
            -- Already logged in today, no streak change
            NULL;
        ELSIF v_user_record.last_activity_date = v_yesterday THEN
            -- Consecutive day
            v_new_streak := v_new_streak + 1;
        ELSE
            -- Missed a day (Streak Broken!)
            v_new_streak := 1;
            
            -- STREAK BREAK PENALTY: Reset Coins
            v_user_record.total_coins := 0; 
        END IF;

        -- Update Longest Streak
        IF v_new_streak > v_new_longest_streak THEN
            v_new_longest_streak := v_new_streak;
        END IF;
        
        -- Update activity date
        v_user_record.last_activity_date := v_today;
    END IF;

    -- F. PERFORM UPDATE
    UPDATE public.user_rewards
    SET 
        -- Economy
        total_coins = COALESCE(total_coins, 0) + v_coins_gain,
        daily_coins_earned = COALESCE(v_user_record.daily_coins_earned, 0) + v_coins_gain,
        last_coin_date = v_today,
        
        -- XP & Level
        xp = COALESCE(xp, 0) + v_xp_gain,
        level = public.calculate_level(COALESCE(xp, 0) + v_xp_gain),
        
        -- Streak (Updated only if changed above)
        current_streak = v_new_streak,
        longest_streak = v_new_longest_streak,
        last_activity_date = COALESCE(v_user_record.last_activity_date, v_today),
        
        updated_at = now()
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create Trigger
DROP TRIGGER IF EXISTS on_reward_transaction_process ON public.reward_transactions;
CREATE TRIGGER on_reward_transaction_process
AFTER INSERT ON public.reward_transactions
FOR EACH ROW
EXECUTE FUNCTION public.handle_reward_transaction();
