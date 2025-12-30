-- ============================================================================
-- FIX: Add user to localhost:3000 tenant
-- ============================================================================

-- Step 1: Check which tenants exist
SELECT id, name, slug, custom_domain FROM tenants;

-- Step 2: Check your current memberships
-- Replace 'your-email@example.com' with your actual email
SELECT 
  p.email,
  utm.tenant_id,
  t.name as tenant_name,
  t.slug,
  utm.role
FROM profiles p
LEFT JOIN user_tenant_memberships utm ON p.id = utm.user_id
LEFT JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';

-- Step 3: Add yourself to localhost tenant as admin
-- Replace 'your-email@example.com' with your actual email
INSERT INTO user_tenant_memberships (user_id, tenant_id, role, is_active)
SELECT 
  p.id,
  t.id,
  'admin',
  true
FROM profiles p
CROSS JOIN tenants t
WHERE p.email = 'your-email@example.com'
  AND t.slug = 'localhost' -- or whatever slug you used for localhost:3000
ON CONFLICT (user_id, tenant_id) 
DO UPDATE SET role = 'admin', is_active = true;

-- Verify
SELECT 
  p.email,
  t.name as tenant_name,
  t.slug,
  utm.role,
  utm.is_active
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ User added to localhost tenant as admin!';
END $$;
