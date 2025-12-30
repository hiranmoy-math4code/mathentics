-- ============================================================================
-- FIX: Sync roles from profiles to user_tenant_memberships
-- ============================================================================
-- This fixes the issue where profiles.role is 'admin' but 
-- user_tenant_memberships.role is 'student'

-- Update user_tenant_memberships to match profiles role
UPDATE user_tenant_memberships utm
SET role = p.role
FROM profiles p
WHERE utm.user_id = p.id
  AND utm.role != p.role;

-- Verify the fix
SELECT 
  p.email,
  p.role as profile_role,
  utm.role as tenant_role,
  CASE 
    WHEN p.role = utm.role THEN '✅ Synced'
    ELSE '❌ Mismatch'
  END as status
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Roles synced from profiles to user_tenant_memberships!';
END $$;
