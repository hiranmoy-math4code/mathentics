-- ============================================================================
-- FIX: Update user role from student to admin
-- ============================================================================
-- Use this to fix users who were added as 'student' but should be 'admin'

-- Replace 'your-email@example.com' with your actual email

UPDATE user_tenant_memberships
SET role = 'admin', updated_at = now()
WHERE user_id = (SELECT id FROM profiles WHERE email = 'your-email@example.com')
  AND role = 'student';

-- Verify the update
SELECT 
  p.email,
  t.slug as tenant,
  utm.role,
  utm.updated_at
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Role updated to admin! Logout and login again.';
END $$;
