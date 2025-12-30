-- ============================================================================
-- TENANT-SPECIFIC REWARD SYSTEM - DATABASE MIGRATION
-- ============================================================================
-- This migration adds tenant_id to all reward-related tables
-- WARNING: This is a BREAKING CHANGE - backup your database first!
-- ============================================================================

-- ============================================================================
-- STEP 1: Add tenant_id columns (nullable first for backfill)
-- ============================================================================

-- Add to user_rewards
ALTER TABLE user_rewards 
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);

-- Add to reward_transactions
ALTER TABLE reward_transactions 
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);

-- Add to user_badges
ALTER TABLE user_badges 
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id);

-- ============================================================================
-- STEP 2: Backfill existing data with tenant_id
-- ============================================================================

-- Backfill user_rewards with user's primary tenant
UPDATE user_rewards ur
SET tenant_id = (
    SELECT tenant_id 
    FROM user_tenant_memberships utm
    WHERE utm.user_id = ur.user_id
    AND utm.is_active = true
    ORDER BY utm.created_at ASC
    LIMIT 1
)
WHERE tenant_id IS NULL;

-- Backfill reward_transactions with user's primary tenant
UPDATE reward_transactions rt
SET tenant_id = (
    SELECT tenant_id 
    FROM user_tenant_memberships utm
    WHERE utm.user_id = rt.user_id
    AND utm.is_active = true
    ORDER BY utm.created_at ASC
    LIMIT 1
)
WHERE tenant_id IS NULL;

-- Backfill user_badges with user's primary tenant
UPDATE user_badges ub
SET tenant_id = (
    SELECT tenant_id 
    FROM user_tenant_memberships utm
    WHERE utm.user_id = ub.user_id
    AND utm.is_active = true
    ORDER BY utm.created_at ASC
    LIMIT 1
)
WHERE tenant_id IS NULL;

-- ============================================================================
-- STEP 3: Create duplicate records for multi-tenant users
-- ============================================================================

-- Duplicate user_rewards for users in multiple tenants
INSERT INTO user_rewards (
    user_id, tenant_id, total_coins, xp, level, 
    current_streak, longest_streak, last_activity_date,
    daily_coins_earned, last_coin_date, weekly_xp
)
SELECT DISTINCT
    ur.user_id,
    utm.tenant_id,
    0 as total_coins,  -- Start fresh in new tenant
    0 as xp,
    1 as level,
    0 as current_streak,
    0 as longest_streak,
    NULL::DATE as last_activity_date,  -- ✅ Cast to DATE
    0 as daily_coins_earned,
    NULL::DATE as last_coin_date,  -- ✅ Cast to DATE
    0 as weekly_xp
FROM user_rewards ur
CROSS JOIN user_tenant_memberships utm
WHERE utm.user_id = ur.user_id
    AND utm.is_active = true
    AND utm.tenant_id != ur.tenant_id  -- Only for different tenants
    AND NOT EXISTS (
        SELECT 1 FROM user_rewards ur2
        WHERE ur2.user_id = ur.user_id
        AND ur2.tenant_id = utm.tenant_id
    );

-- ============================================================================
-- STEP 4: Make tenant_id NOT NULL
-- ============================================================================

ALTER TABLE user_rewards 
ALTER COLUMN tenant_id SET NOT NULL;

ALTER TABLE reward_transactions 
ALTER COLUMN tenant_id SET NOT NULL;

ALTER TABLE user_badges 
ALTER COLUMN tenant_id SET NOT NULL;

-- ============================================================================
-- STEP 5: Update primary keys and constraints
-- ============================================================================

-- user_rewards: Change PK to (user_id, tenant_id)
ALTER TABLE user_rewards 
DROP CONSTRAINT IF EXISTS user_rewards_pkey;

ALTER TABLE user_rewards 
ADD PRIMARY KEY (user_id, tenant_id);

-- user_badges: Update unique constraint
ALTER TABLE user_badges 
DROP CONSTRAINT IF EXISTS user_badges_user_badge_unique;

ALTER TABLE user_badges 
ADD CONSTRAINT user_badges_user_badge_tenant_unique 
UNIQUE (user_id, badge_id, tenant_id);

-- ============================================================================
-- STEP 6: Create performance indexes
-- ============================================================================

-- Index for tenant-based queries on user_rewards
CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant 
ON user_rewards(tenant_id);

CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant_coins 
ON user_rewards(tenant_id, total_coins DESC);

CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant_xp 
ON user_rewards(tenant_id, weekly_xp DESC);

-- Index for tenant-based queries on reward_transactions
CREATE INDEX IF NOT EXISTS idx_reward_transactions_tenant_user 
ON reward_transactions(tenant_id, user_id);

CREATE INDEX IF NOT EXISTS idx_reward_transactions_tenant_date 
ON reward_transactions(tenant_id, created_at DESC);

-- Index for tenant-based queries on user_badges
CREATE INDEX IF NOT EXISTS idx_user_badges_tenant 
ON user_badges(tenant_id, user_id);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if all records have tenant_id
SELECT 
    'user_rewards' as table_name,
    COUNT(*) as total_records,
    COUNT(tenant_id) as records_with_tenant,
    COUNT(*) - COUNT(tenant_id) as records_without_tenant
FROM user_rewards
UNION ALL
SELECT 
    'reward_transactions',
    COUNT(*),
    COUNT(tenant_id),
    COUNT(*) - COUNT(tenant_id)
FROM reward_transactions
UNION ALL
SELECT 
    'user_badges',
    COUNT(*),
    COUNT(tenant_id),
    COUNT(*) - COUNT(tenant_id)
FROM user_badges;

-- Check multi-tenant users
SELECT 
    user_id,
    COUNT(DISTINCT tenant_id) as tenant_count,
    array_agg(DISTINCT tenant_id) as tenants
FROM user_rewards
GROUP BY user_id
HAVING COUNT(DISTINCT tenant_id) > 1;

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================
-- UNCOMMENT ONLY IF YOU NEED TO ROLLBACK!

-- ALTER TABLE user_rewards DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE reward_transactions DROP COLUMN IF EXISTS tenant_id;
-- ALTER TABLE user_badges DROP COLUMN IF EXISTS tenant_id;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
