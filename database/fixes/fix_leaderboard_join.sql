-- ============================================================================
-- FIXED: Leaderboard Function with Proper Tenant JOIN
-- ============================================================================
-- This fixes the Anonymous name issue by properly joining tenant data
-- ============================================================================

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
        AND ur.tenant_id = utm.tenant_id  -- ✅ FIX: Match both user_id AND tenant_id
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
-- GRANT PERMISSIONS
-- ============================================================================
GRANT EXECUTE ON FUNCTION get_tenant_leaderboard TO authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Test the function
-- SELECT * FROM get_tenant_leaderboard(
--     'YOUR_TENANT_ID'::uuid,
--     'total_coins',
--     10
-- );
