-- OPTIMIZED INDEXES FOR HIGH SCALE LEARNING FLOW
-- ============================================================================
-- These indexes are specifically designed to support the 1M+ user scale
-- for the learn page access and enrollment checks.
-- ============================================================================

-- 1. Optimize Enrollment Check
-- Used in: app/learn/[courseId]/page.tsx
-- Query: .eq("user_id", user.id).eq("course_id", courseId).eq("status", "active")
CREATE INDEX IF NOT EXISTS idx_enrollments_access_check 
ON enrollments(user_id, course_id, status, expires_at);

-- 2. Optimize Tenant Membership Check
-- Used in: app/learn/[courseId]/page.tsx
-- Query: .eq('user_id', user.id).eq('is_active', true)
CREATE INDEX IF NOT EXISTS idx_memberships_active_check 
ON user_tenant_memberships(user_id, is_active);

-- Comments
COMMENT ON INDEX idx_enrollments_access_check IS 'Optimizes learn page access check for high concurrency';
COMMENT ON INDEX idx_memberships_active_check IS 'Optimizes login/access active membership checks';
