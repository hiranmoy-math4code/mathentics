-- ============================================================================
-- 🧪 SIMULATION TEST: VERIFY STREAK INCREMENT
-- ============================================================================
-- This script manually sets up a "Yesterday" state and triggers a login.
-- Use this to prove the logic works without waiting for tomorrow!
-- ============================================================================

DO $$
DECLARE
    v_user_id UUID := 'YOUR_USER_ID'; -- 👈 PASTE YOUR USER ID HERE
    v_tenant_id UUID;
    v_new_streak INTEGER;
BEGIN
    -- 1. Get Tenant ID for this user
    SELECT tenant_id INTO v_tenant_id FROM user_rewards WHERE user_id = v_user_id LIMIT 1;
    
    IF v_tenant_id IS NULL THEN
        RAISE EXCEPTION 'User has no rewards record yet. Log in once first!';
    END IF;

    RAISE NOTICE '--- 🧪 STARTING SIMULATION FOR USER % ---', v_user_id;

    -- 2. SETUP: Force state to "Logged in Yesterday" (Streak = 1)
    UPDATE user_rewards
    SET 
        last_activity_date = CURRENT_DATE - INTERVAL '1 day',
        last_coin_date = CURRENT_DATE - INTERVAL '1 day',
        current_streak = 1,
        longest_streak = 1
    WHERE user_id = v_user_id AND tenant_id = v_tenant_id;
    
    RAISE NOTICE '✅ SETUP COMPLETE: Stick User in "Yesterday" state (Streak 1).';

    -- 3. ACTION: Simulate a Login NOW (Today)
    INSERT INTO reward_transactions (user_id, tenant_id, amount, action_type, description)
    VALUES (v_user_id, v_tenant_id, 5, 'login', 'Simulated Login Test');

    -- 4. VERIFY: Check the result
    SELECT current_streak INTO v_new_streak 
    FROM user_rewards 
    WHERE user_id = v_user_id AND tenant_id = v_tenant_id;

    RAISE NOTICE '--- 🏁 RESULT ---';
    IF v_new_streak = 2 THEN
        RAISE NOTICE '✅ SUCCESS! Streak increased from 1 to 2.';
    ELSE
        RAISE NOTICE '❌ FAILURE! Streak is % (Expected 2).', v_new_streak;
    END IF;
END;
$$;
