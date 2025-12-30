-- ============================================================================
-- SCALING INDEXES FOR 10M+ USERS
-- ============================================================================
-- Purpose: Ensure every heavy query uses a composite index scan.
-- ============================================================================

-- 1. Enrollments: Fast access checks and student course lists
CREATE INDEX IF NOT EXISTS idx_enrollments_scaling 
  ON enrollments(tenant_id, user_id, status, course_id);

-- 2. Community Messages: Optimized chat loading & pagination
CREATE INDEX IF NOT EXISTS idx_community_messages_scaling 
  ON community_messages(tenant_id, channel_id, created_at DESC);

-- 3. Community Reactions: Fast reaction aggregation
CREATE INDEX IF NOT EXISTS idx_community_reactions_scaling 
  ON community_reactions(tenant_id, message_id, emoji);

-- 4. Exam Attempts: Fast progress tracking and result fetching
CREATE INDEX IF NOT EXISTS idx_exam_attempts_scaling 
  ON exam_attempts(student_id, exam_id, status, created_at DESC);

-- 5. Profiles: Fast lookups by role and tenant
CREATE INDEX IF NOT EXISTS idx_profiles_tenant_role 
  ON profiles(tenant_id, role, full_name);

-- 6. Notifications: optimized for high-volume user updates
CREATE INDEX IF NOT EXISTS idx_notifications_user_status 
  ON notifications(user_id, status, created_at DESC);

-- 7. Community Bookmarks: Tenant-isolated lookups
CREATE INDEX IF NOT EXISTS idx_community_bookmarks_scaling
  ON community_bookmarks(tenant_id, user_id, message_id);

-- 8. User Tenant Memberships: Ensure middleware lookups are instant
CREATE INDEX IF NOT EXISTS idx_user_tenant_memberships_middleware
  ON user_tenant_memberships(user_id, tenant_id, is_active)
  WHERE is_active = true;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$ 
BEGIN 
    RAISE NOTICE '🚀 Scaling indexes generated successfully!';
END $$;
