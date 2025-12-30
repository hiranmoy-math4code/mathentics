-- ============================================================================
-- ADD TENANT-AWARE INDEXES FOR SCALABILITY
-- ============================================================================
-- Purpose: Optimize multi-tenant queries for 100,000+ concurrent users
-- Note: CONCURRENTLY removed for Supabase SQL Editor compatibility
-- ============================================================================

-- ============================================================================
-- REWARD TABLES OPTIMIZATION
-- ============================================================================

-- 1. Optimize user_rewards lookups by tenant
CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant_user 
  ON user_rewards(tenant_id, user_id);

-- 2. Optimize reward transactions by tenant
CREATE INDEX IF NOT EXISTS idx_reward_transactions_tenant_user 
  ON reward_transactions(tenant_id, user_id);

-- 3. Optimize reward transactions by action type (for duplicate checking)
CREATE INDEX IF NOT EXISTS idx_reward_transactions_tenant_action 
  ON reward_transactions(tenant_id, action_type, entity_id, created_at);

-- 4. Optimize daily missions by tenant
CREATE INDEX IF NOT EXISTS idx_daily_missions_tenant_user 
  ON daily_missions(tenant_id, user_id, date);

-- 5. Optimize streak lookups (for login rewards)
CREATE INDEX IF NOT EXISTS idx_user_rewards_streak_lookup 
  ON user_rewards(user_id, tenant_id, last_activity_date);

-- ============================================================================
-- LEADERBOARD OPTIMIZATION
-- ============================================================================

-- 6. Optimize leaderboard queries by total coins
CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant_coins 
  ON user_rewards(tenant_id, total_coins DESC);

-- 7. Optimize leaderboard queries by XP
CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant_xp 
  ON user_rewards(tenant_id, xp DESC);

-- 8. Optimize weekly leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_rewards_tenant_weekly_xp 
  ON user_rewards(tenant_id, weekly_xp DESC);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Tenant indexes created successfully!';
    RAISE NOTICE 'Total new indexes: 8';
    RAISE NOTICE 'Run verification query to confirm.';
END $$;

-- Verification Query
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%tenant%'
ORDER BY tablename, indexname;
