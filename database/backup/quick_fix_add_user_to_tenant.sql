
-- ============================================================================
-- QUICK FIX: Add existing user to tenant
-- ============================================================================
-- Use this if you have an existing user who can't login

-- Replace these values:
-- 1. 'your-email@example.com' with your actual email
-- 2. 'tenant-a' with the tenant slug you're trying to access
-- 3. 'admin' with your desired role

INSERT INTO user_tenant_memberships (user_id, tenant_id, role, is_active)
SELECT 
  (SELECT id FROM profiles WHERE email = 'your-email@example.com'),
  (SELECT id FROM tenants WHERE slug = 'tenant-a'),
  'admin',
  true
ON CONFLICT (user_id, tenant_id) 
DO UPDATE SET 
  role = EXCLUDED.role,
  is_active = true;

-- Verify
SELECT 
  p.email,
  t.slug as tenant,
  utm.role,
  utm.is_active
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ User added to tenant! Try logging in again.';
END $$;
