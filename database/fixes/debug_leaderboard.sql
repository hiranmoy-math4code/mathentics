-- ============================================================================
-- DEBUG: Leaderboard Issues
-- ============================================================================

-- 1. Check profiles table - why Anonymous?
SELECT 
    id,
    full_name,
    email,
    avatar_url
FROM profiles
WHERE id = (SELECT auth.uid())
LIMIT 5;

-- 2. Check user_rewards - verify coin amounts
SELECT 
    user_id,
    tenant_id,
    total_coins,
    xp,
    level,
    current_streak,
    daily_coins_earned,
    last_coin_date
FROM user_rewards
WHERE user_id = (SELECT auth.uid());

-- 3. Check reward_transactions - see all transactions
SELECT 
    action_type,
    amount,
    description,
    created_at
FROM reward_transactions
WHERE user_id = (SELECT auth.uid())
ORDER BY created_at DESC
LIMIT 20;

-- 4. Test leaderboard function
SELECT 
    total_coins,
    xp,
    level,
    current_streak,
    user_id,
    full_name,
    avatar_url
FROM get_tenant_leaderboard(
    (SELECT tenant_id FROM user_tenant_memberships WHERE user_id = auth.uid() LIMIT 1),
    'total_coins',
    10
);

-- 5. Check if full_name is NULL
SELECT 
    COUNT(*) as users_with_null_name
FROM profiles
WHERE full_name IS NULL OR full_name = '';

-- 6. Fix NULL full_name (if needed)
-- UPDATE profiles
-- SET full_name = COALESCE(email, 'User ' || SUBSTRING(id::text, 1, 8))
-- WHERE full_name IS NULL OR full_name = '';
