-- ============================================================================
-- COMPREHENSIVE DEBUG: Find Why Names Are Anonymous
-- ============================================================================

-- Step 1: Check YOUR profile data
SELECT 
    id,
    full_name,
    email,
    avatar_url,
    created_at
FROM profiles
WHERE id = (SELECT auth.uid())
LIMIT 1;

-- Step 2: Check YOUR user_rewards
SELECT 
    user_id,
    tenant_id,
    total_coins,
    xp,
    current_streak
FROM user_rewards
WHERE user_id = (SELECT auth.uid());

-- Step 3: Check YOUR tenant membership
SELECT 
    user_id,
    tenant_id,
    is_active
FROM user_tenant_memberships
WHERE user_id = (SELECT auth.uid());

-- Step 4: Test leaderboard function directly
SELECT 
    total_coins,
    xp,
    level,
    current_streak,
    user_id,
    full_name,  -- ⚠️ Check if this is NULL
    avatar_url
FROM get_tenant_leaderboard(
    (SELECT tenant_id FROM user_tenant_memberships WHERE user_id = auth.uid() AND is_active = true LIMIT 1),
    'total_coins',
    10
);

-- Step 5: Manual JOIN test (what the function SHOULD do)
SELECT 
    ur.total_coins,
    ur.xp,
    ur.level,
    ur.current_streak,
    ur.user_id,
    p.full_name,  -- ⚠️ Check if this is NULL
    p.avatar_url,
    utm.tenant_id
FROM user_rewards ur
INNER JOIN user_tenant_memberships utm 
    ON ur.user_id = utm.user_id
    AND ur.tenant_id = utm.tenant_id
LEFT JOIN profiles p 
    ON ur.user_id = p.id
WHERE utm.tenant_id = (SELECT tenant_id FROM user_tenant_memberships WHERE user_id = auth.uid() AND is_active = true LIMIT 1)
    AND utm.is_active = true
ORDER BY ur.total_coins DESC
LIMIT 10;

-- Step 6: Check if profiles table has ANY data
SELECT COUNT(*) as total_profiles FROM profiles;
SELECT COUNT(*) as profiles_with_names FROM profiles WHERE full_name IS NOT NULL AND full_name != '';

-- Step 7: Check specific user from leaderboard
-- Replace USER_ID with actual UUID from leaderboard
-- SELECT id, full_name, email FROM profiles WHERE id = 'USER_ID'::uuid;
