-- ============================================================================
-- 🛠️ REPAIR SCRIPT: RECALCULATE STREAKS FROM HISTORY
-- ============================================================================
-- This script rebuilds the 'current_streak' for all users by analyzing their
-- 'login' transactions in the 'reward_transactions' table.
-- Use this if users' streaks were accidentally reset to 1.
-- ============================================================================

WITH user_logins AS (
    -- 1. Get unique login dates per user per tenant
    SELECT DISTINCT
        user_id,
        tenant_id,
        DATE(created_at) as login_date
    FROM reward_transactions
    WHERE action_type = 'login'
),
login_groups AS (
    -- 2. Group consecutive dates (Gaps-and-Islands problem)
    SELECT
        user_id,
        tenant_id,
        login_date,
        -- If dates are consecutive, 'login_date - row_number' will remain constant
        login_date - (ROW_NUMBER() OVER (PARTITION BY user_id, tenant_id ORDER BY login_date)::INTEGER) as grp
    FROM user_logins
),
streak_calc AS (
    -- 3. Calculate length of each consecutive group
    SELECT
        user_id,
        tenant_id,
        COUNT(*) as streak_length,
        MAX(login_date) as last_login_date
    FROM login_groups
    GROUP BY user_id, tenant_id, grp
),
latest_streaks AS (
    -- 4. Get the active streak (must stick to Today or Yesterday)
    SELECT
        user_id,
        tenant_id,
        streak_length
    FROM streak_calc
    WHERE last_login_date >= CURRENT_DATE - 1
)
-- 5. Update user_rewards with the calculated streak
UPDATE user_rewards ur
SET 
    current_streak = ls.streak_length,
    longest_streak = GREATEST(ur.longest_streak, ls.streak_length),
    updated_at = NOW()
FROM latest_streaks ls
WHERE ur.user_id = ls.user_id
    AND ur.tenant_id = ls.tenant_id;

-- Output result
SELECT 'Streaks repaired successfully!' as result;
