-- ============================================================================
-- REWARD SYSTEM: STREAK TRACKING TRIGGER
-- ============================================================================
-- This trigger updates user streaks when login rewards are recorded
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
    v_last_activity_date DATE;
    v_current_streak INT;
    v_longest_streak INT;
    v_new_streak INT;
BEGIN
    -- Only process login actions
    IF NEW.action_type = 'login' THEN
        -- Get current streak data
        SELECT last_activity_date, current_streak, longest_streak
        INTO v_last_activity_date, v_current_streak, v_longest_streak
        FROM public.user_rewards
        WHERE user_id = NEW.user_id;

        -- If no record exists, initialize
        IF NOT FOUND THEN
            INSERT INTO public.user_rewards (user_id, current_streak, longest_streak, last_activity_date)
            VALUES (NEW.user_id, 1, 1, CURRENT_DATE);
            RETURN NEW;
        END IF;

        -- Calculate new streak
        IF v_last_activity_date IS NULL THEN
            -- First login ever
            v_new_streak := 1;
        ELSIF v_last_activity_date = CURRENT_DATE THEN
            -- Already logged in today, no change
            v_new_streak := v_current_streak;
        ELSIF v_last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
            -- Consecutive day login
            v_new_streak := v_current_streak + 1;
        ELSE
            -- Streak broken, start over
            v_new_streak := 1;
        END IF;

        -- Update longest streak if needed
        IF v_new_streak > v_longest_streak THEN
            v_longest_streak := v_new_streak;
        END IF;

        -- Update user_rewards
        UPDATE public.user_rewards
        SET 
            current_streak = v_new_streak,
            longest_streak = v_longest_streak,
            last_activity_date = CURRENT_DATE,
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;

        -- Award streak milestone bonuses
        IF v_new_streak = 3 AND NOT EXISTS (
            SELECT 1 FROM public.reward_transactions 
            WHERE user_id = NEW.user_id 
            AND action_type = 'bonus' 
            AND description LIKE '%3-day streak%'
            AND created_at >= CURRENT_DATE - INTERVAL '3 days'
        ) THEN
            INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
            VALUES (NEW.user_id, 10, 'bonus', '🔥 3-day streak bonus!');
        END IF;

        IF v_new_streak = 7 AND NOT EXISTS (
            SELECT 1 FROM public.reward_transactions 
            WHERE user_id = NEW.user_id 
            AND action_type = 'bonus' 
            AND description LIKE '%7-day streak%'
            AND created_at >= CURRENT_DATE - INTERVAL '7 days'
        ) THEN
            INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
            VALUES (NEW.user_id, 30, 'bonus', '🔥 7-day streak bonus!');
        END IF;

        IF v_new_streak = 30 AND NOT EXISTS (
            SELECT 1 FROM public.reward_transactions 
            WHERE user_id = NEW.user_id 
            AND action_type = 'bonus' 
            AND description LIKE '%30-day streak%'
            AND created_at >= CURRENT_DATE - INTERVAL '30 days'
        ) THEN
            INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
            VALUES (NEW.user_id, 100, 'bonus', '🔥 30-day streak bonus!');
        END IF;

    ELSE
        -- For non-login actions, just update coins and XP
        UPDATE public.user_rewards
        SET 
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_streak_on_transaction ON public.reward_transactions;

-- Create trigger
CREATE TRIGGER update_streak_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_streak();

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Test the streak by inserting a login transaction:
-- INSERT INTO public.reward_transactions (user_id, amount, action_type, entity_id, description)
-- VALUES ('YOUR_USER_ID', 5, 'login', CURRENT_DATE::text, 'Daily login');
--
-- Then check:
-- SELECT current_streak, longest_streak, last_activity_date 
-- FROM public.user_rewards 
-- WHERE user_id = 'YOUR_USER_ID';
