-- ============================================================================
-- PERMANENT FIX: Streak Calculation for All Users (New & Existing)
-- ============================================================================
-- This ensures streak ALWAYS updates correctly
-- ============================================================================

-- ============================================================================
-- UPDATED TRIGGER: Ensure last_activity_date is ALWAYS set
-- ============================================================================
CREATE OR REPLACE FUNCTION update_user_rewards_on_transaction()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_coins_to_add INTEGER;
    v_last_coin_date DATE;
BEGIN
    -- Ensure user_rewards record exists for this tenant
    INSERT INTO user_rewards (
        user_id, 
        tenant_id,
        total_coins, 
        xp, 
        level,
        current_streak,
        longest_streak,
        daily_coins_earned,
        last_coin_date,
        last_activity_date  -- ✅ Initialize with current date
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
        CURRENT_DATE  -- ✅ Set initial activity date
    )
    ON CONFLICT (user_id, tenant_id) DO NOTHING;

    -- Get current daily coins for this tenant
    SELECT daily_coins_earned, last_coin_date
    INTO v_coins_to_add, v_last_coin_date
    FROM user_rewards
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
    UPDATE user_rewards
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
        last_activity_date = CURRENT_DATE,  -- ✅ ALWAYS update activity date
        updated_at = NOW()
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    RETURN NEW;
END;
$$;

-- ============================================================================
-- UPDATED STREAK TRIGGER: Better NULL handling
-- ============================================================================
CREATE OR REPLACE FUNCTION update_streak_on_login()
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

    -- Get current streak data for this tenant
    SELECT 
        last_activity_date,
        COALESCE(current_streak, 0),  -- ✅ Handle NULL
        COALESCE(longest_streak, 0)   -- ✅ Handle NULL
    INTO 
        v_last_date,
        v_current_streak,
        v_longest_streak
    FROM user_rewards
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    -- Calculate new streak
    IF v_last_date IS NULL THEN
        -- First login in this tenant
        v_new_streak := 1;
    ELSIF v_last_date = CURRENT_DATE THEN
        -- Already logged in today in this tenant
        v_new_streak := GREATEST(v_current_streak, 1);  -- ✅ At least 1
    ELSIF v_last_date = CURRENT_DATE - INTERVAL '1 day' THEN
        -- Consecutive day in this tenant
        v_new_streak := v_current_streak + 1;
    ELSE
        -- Streak broken in this tenant
        v_new_streak := 1;
    END IF;

    -- Update streak for this tenant
    UPDATE user_rewards
    SET 
        current_streak = v_new_streak,
        longest_streak = GREATEST(COALESCE(longest_streak, 0), v_new_streak),
        last_activity_date = CURRENT_DATE,
        updated_at = NOW()
    WHERE user_id = NEW.user_id 
        AND tenant_id = NEW.tenant_id;

    -- Award streak bonuses (tenant-specific)
    IF v_new_streak = 3 THEN
        INSERT INTO reward_transactions (user_id, tenant_id, amount, action_type, description)
        VALUES (NEW.user_id, NEW.tenant_id, 10, 'streak_3', '3-day streak bonus!');
    ELSIF v_new_streak = 7 THEN
        INSERT INTO reward_transactions (user_id, tenant_id, amount, action_type, description)
        VALUES (NEW.user_id, NEW.tenant_id, 30, 'streak_7', '7-day streak bonus!');
    ELSIF v_new_streak = 30 THEN
        INSERT INTO reward_transactions (user_id, tenant_id, amount, action_type, description)
        VALUES (NEW.user_id, NEW.tenant_id, 100, 'streak_30', '30-day streak bonus!');
    END IF;

    RETURN NEW;
END;
$$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Test with a new login transaction
-- INSERT INTO reward_transactions (user_id, tenant_id, amount, action_type, description)
-- VALUES (
--     auth.uid(),
--     'YOUR_TENANT_ID'::uuid,
--     5,
--     'login',
--     'Test login'
-- );

-- Check streak updated
-- SELECT current_streak, longest_streak, last_activity_date 
-- FROM user_rewards 
-- WHERE user_id = auth.uid();
