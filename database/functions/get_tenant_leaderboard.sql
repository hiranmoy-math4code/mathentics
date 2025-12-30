-- ============================================================================
-- OPTIMIZED LEADERBOARD FUNCTION FOR 10M+ STUDENTS
-- ============================================================================
-- This RPC function performs database-level JOIN for better performance
-- Avoids loading all user IDs into memory

CREATE OR REPLACE FUNCTION get_tenant_leaderboard(
    p_tenant_id UUID,
    p_sort_column TEXT DEFAULT 'total_coins',
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    total_coins INTEGER,
    xp INTEGER,
    weekly_xp INTEGER,
    level INTEGER,
    current_streak INTEGER,
    user_id UUID,
    full_name TEXT,
    avatar_url TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ur.total_coins,
        ur.xp,
        ur.weekly_xp,
        ur.level,
        ur.current_streak,
        ur.user_id,
        p.full_name,
        p.avatar_url
    FROM user_rewards ur
    INNER JOIN user_tenant_memberships utm 
        ON ur.user_id = utm.user_id
    LEFT JOIN profiles p 
        ON ur.user_id = p.id
    WHERE utm.tenant_id = p_tenant_id
        AND utm.is_active = true
    ORDER BY 
        CASE 
            WHEN p_sort_column = 'weekly_xp' THEN ur.weekly_xp
            ELSE ur.total_coins
        END DESC
    LIMIT p_limit;
END;
$$;

-- ============================================================================
-- CREATE INDEX FOR PERFORMANCE
-- ============================================================================
-- Index on user_tenant_memberships for faster filtering
CREATE INDEX IF NOT EXISTS idx_user_tenant_memberships_tenant_active 
ON user_tenant_memberships(tenant_id, is_active) 
WHERE is_active = true;

-- Index on user_rewards for faster sorting
CREATE INDEX IF NOT EXISTS idx_user_rewards_total_coins 
ON user_rewards(total_coins DESC);

CREATE INDEX IF NOT EXISTS idx_user_rewards_weekly_xp 
ON user_rewards(weekly_xp DESC);

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
GRANT EXECUTE ON FUNCTION get_tenant_leaderboard TO authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Test the function
-- SELECT * FROM get_tenant_leaderboard(
--     'f9c03969-da89-4d2e-92eb-029490268453'::uuid,
--     'total_coins',
--     10
-- );
