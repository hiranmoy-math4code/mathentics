-- ============================================================================
-- TENANT-AWARE REWARD FUNCTIONS FOR APPLICATION
-- ============================================================================
-- These functions handle all reward logic at database level
-- Application just needs to call these functions
-- ============================================================================

-- ============================================================================
-- FUNCTION 1: Get or Create User Rewards (Tenant-Specific)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_user_rewards(
    p_user_id UUID,
    p_tenant_id UUID
)
RETURNS TABLE (
    user_id UUID,
    tenant_id UUID,
    total_coins INTEGER,
    xp INTEGER,
    level INTEGER,
    weekly_xp INTEGER,
    current_streak INTEGER,
    longest_streak INTEGER,
    last_activity_date DATE,
    daily_coins_earned INTEGER,
    last_coin_date DATE,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Try to get existing record
    RETURN QUERY
    SELECT 
        ur.user_id,
        ur.tenant_id,
        ur.total_coins,
        ur.xp,
        ur.level,
        ur.weekly_xp,
        ur.current_streak,
        ur.longest_streak,
        ur.last_activity_date,
        ur.daily_coins_earned,
        ur.last_coin_date,
        ur.created_at,
        ur.updated_at
    FROM user_rewards ur
    WHERE ur.user_id = p_user_id
        AND ur.tenant_id = p_tenant_id;
    
    -- If no record found, create one
    IF NOT FOUND THEN
        INSERT INTO user_rewards (user_id, tenant_id)
        VALUES (p_user_id, p_tenant_id)
        ON CONFLICT (user_id, tenant_id) DO NOTHING;
        
        -- Return the newly created record
        RETURN QUERY
        SELECT 
            ur.user_id,
            ur.tenant_id,
            ur.total_coins,
            ur.xp,
            ur.level,
            ur.weekly_xp,
            ur.current_streak,
            ur.longest_streak,
            ur.last_activity_date,
            ur.daily_coins_earned,
            ur.last_coin_date,
            ur.created_at,
            ur.updated_at
        FROM user_rewards ur
        WHERE ur.user_id = p_user_id
            AND ur.tenant_id = p_tenant_id;
    END IF;
END;
$$;

-- ============================================================================
-- FUNCTION 2: Award Coins (Tenant-Specific)
-- ============================================================================
CREATE OR REPLACE FUNCTION award_coins(
    p_user_id UUID,
    p_tenant_id UUID,
    p_action_type TEXT,
    p_entity_id TEXT DEFAULT NULL,
    p_description TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_coins INTEGER;
    v_today DATE := CURRENT_DATE;
    v_existing_id UUID;
BEGIN
    -- Check for duplicates (for login, use date as entity_id)
    IF p_action_type = 'login' THEN
        p_entity_id := v_today::TEXT;
    END IF;
    
    IF p_entity_id IS NOT NULL THEN
        SELECT id INTO v_existing_id
        FROM reward_transactions
        WHERE user_id = p_user_id
            AND tenant_id = p_tenant_id
            AND action_type = p_action_type
            AND entity_id = p_entity_id
            AND created_at >= v_today::TIMESTAMP;
        
        IF FOUND THEN
            RETURN json_build_object(
                'success', false,
                'message', 'Already rewarded for this today!'
            );
        END IF;
    END IF;
    
    -- Determine coin amount
    v_coins := CASE p_action_type
        WHEN 'login' THEN 5
        WHEN 'video_watch' THEN 10
        WHEN 'lesson_completion' THEN 10
        WHEN 'quiz_completion' THEN 15
        WHEN 'module_completion' THEN 50
        WHEN 'referral' THEN 100
        WHEN 'mission_complete' THEN 20
        WHEN 'bonus' THEN 10
        ELSE 0
    END;
    
    -- Insert transaction (triggers will update user_rewards)
    INSERT INTO reward_transactions (
        user_id,
        tenant_id,
        amount,
        action_type,
        entity_id,
        description
    ) VALUES (
        p_user_id,
        p_tenant_id,
        v_coins,
        p_action_type,
        p_entity_id,
        COALESCE(p_description, 'Reward for ' || p_action_type)
    );
    
    RETURN json_build_object(
        'success', true,
        'coins', v_coins,
        'message', '⭐ +' || v_coins || ' coins!'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Failed to process reward: ' || SQLERRM
        );
END;
$$;

-- ============================================================================
-- FUNCTION 3: Get User Streak (Tenant-Specific)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_user_streak(
    p_user_id UUID,
    p_tenant_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_current_streak INTEGER;
    v_longest_streak INTEGER;
    v_last_activity DATE;
BEGIN
    SELECT 
        current_streak,
        longest_streak,
        last_activity_date
    INTO 
        v_current_streak,
        v_longest_streak,
        v_last_activity
    FROM user_rewards
    WHERE user_id = p_user_id
        AND tenant_id = p_tenant_id;
    
    IF NOT FOUND THEN
        RETURN json_build_object(
            'streak', 0,
            'longest_streak', 0,
            'message', null
        );
    END IF;
    
    RETURN json_build_object(
        'streak', COALESCE(v_current_streak, 0),
        'longest_streak', COALESCE(v_longest_streak, 0),
        'last_activity', v_last_activity,
        'message', null
    );
END;
$$;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
GRANT EXECUTE ON FUNCTION get_user_rewards TO authenticated;
GRANT EXECUTE ON FUNCTION award_coins TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_streak TO authenticated;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Test get_user_rewards
-- SELECT * FROM get_user_rewards(
--     'YOUR_USER_ID'::uuid,
--     'YOUR_TENANT_ID'::uuid
-- );

-- Test award_coins
-- SELECT award_coins(
--     'YOUR_USER_ID'::uuid,
--     'YOUR_TENANT_ID'::uuid,
--     'login',
--     NULL,
--     'Daily login reward'
-- );

-- Test get_user_streak
-- SELECT get_user_streak(
--     'YOUR_USER_ID'::uuid,
--     'YOUR_TENANT_ID'::uuid
-- );
