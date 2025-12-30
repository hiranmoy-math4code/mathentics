-- ============================================================================
-- FIX STREAK DATA - Manual Update
-- ============================================================================
-- This will fix your current streak based on login history
-- ============================================================================

-- Step 1: Update last_activity_date based on most recent login
UPDATE user_rewards ur
SET last_activity_date = (
    SELECT MAX(DATE(created_at))
    FROM reward_transactions rt
    WHERE rt.user_id = ur.user_id
        AND rt.tenant_id = ur.tenant_id
        AND rt.action_type = 'login'
)
WHERE last_activity_date IS NULL;

-- Step 2: Calculate and update current streak
WITH streak_calc AS (
    SELECT 
        user_id,
        tenant_id,
        COUNT(DISTINCT DATE(created_at)) as consecutive_days
    FROM reward_transactions
    WHERE action_type = 'login'
        AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY user_id, tenant_id
)
UPDATE user_rewards ur
SET 
    current_streak = COALESCE(sc.consecutive_days, 1),
    longest_streak = GREATEST(longest_streak, COALESCE(sc.consecutive_days, 1))
FROM streak_calc sc
WHERE ur.user_id = sc.user_id
    AND ur.tenant_id = sc.tenant_id;

-- Step 3: For users who logged in today, ensure streak is at least 1
UPDATE user_rewards ur
SET current_streak = GREATEST(current_streak, 1)
WHERE EXISTS (
    SELECT 1 FROM reward_transactions rt
    WHERE rt.user_id = ur.user_id
        AND rt.tenant_id = ur.tenant_id
        AND rt.action_type = 'login'
        AND DATE(rt.created_at) = CURRENT_DATE
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 
    user_id,
    tenant_id,
    current_streak,
    longest_streak,
    last_activity_date,
    total_coins
FROM user_rewards
ORDER BY updated_at DESC
LIMIT 10;
