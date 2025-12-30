-- ============================================================================
-- TENANT-AWARE RLS POLICIES FOR REWARD SYSTEM
-- ============================================================================
-- Updated RLS policies to enforce tenant isolation
-- ============================================================================

-- ============================================================================
-- user_rewards POLICIES
-- ============================================================================

-- Drop old policies
DROP POLICY IF EXISTS "Public can view all rewards" ON user_rewards;
DROP POLICY IF EXISTS "Users can update own rewards" ON user_rewards;
DROP POLICY IF EXISTS "Users can delete own rewards" ON user_rewards;

-- Enable RLS
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view rewards in their active tenants
CREATE POLICY "Users can view rewards in their tenants"
ON user_rewards FOR SELECT
USING (
    tenant_id IN (
        SELECT tenant_id 
        FROM user_tenant_memberships 
        WHERE user_id = auth.uid() 
        AND is_active = true
    )
);

-- Policy: Users can update own rewards in their tenants
CREATE POLICY "Users can update own rewards in their tenants"
ON user_rewards FOR UPDATE
USING (
    user_id = auth.uid() 
    AND tenant_id IN (
        SELECT tenant_id 
        FROM user_tenant_memberships 
        WHERE user_id = auth.uid() 
        AND is_active = true
    )
);

-- Policy: System can insert rewards (for triggers)
CREATE POLICY "System can insert rewards"
ON user_rewards FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- reward_transactions POLICIES
-- ============================================================================

-- Drop old policies
DROP POLICY IF EXISTS "Users can view own transactions" ON reward_transactions;

-- Enable RLS
ALTER TABLE reward_transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view transactions in their tenants
CREATE POLICY "Users can view transactions in their tenants"
ON reward_transactions FOR SELECT
USING (
    user_id = auth.uid()
    AND tenant_id IN (
        SELECT tenant_id 
        FROM user_tenant_memberships 
        WHERE user_id = auth.uid() 
        AND is_active = true
    )
);

-- Policy: System can insert transactions
CREATE POLICY "System can insert transactions"
ON reward_transactions FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- user_badges POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view badges in their tenants
CREATE POLICY "Users can view badges in their tenants"
ON user_badges FOR SELECT
USING (
    user_id = auth.uid()
    AND tenant_id IN (
        SELECT tenant_id 
        FROM user_tenant_memberships 
        WHERE user_id = auth.uid() 
        AND is_active = true
    )
);

-- Policy: System can insert badges
CREATE POLICY "System can insert badges"
ON user_badges FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- ADMIN POLICIES (for all reward tables)
-- ============================================================================

-- Admins can view all rewards
CREATE POLICY "Admins can view all rewards"
ON user_rewards FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);

-- Admins can view all transactions
CREATE POLICY "Admins can view all transactions"
ON reward_transactions FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);

-- Admins can view all badges
CREATE POLICY "Admins can view all badges"
ON user_badges FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    )
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- View all policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename IN ('user_rewards', 'reward_transactions', 'user_badges')
ORDER BY tablename, policyname;
