-- ============================================================================
-- DEBUG: Check why login is failing
-- ============================================================================
-- Replace 'your-email@example.com' with the email you're trying to login with

-- Step 1: Check if user exists in profiles
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM profiles
WHERE email = 'your-email@example.com';

-- Step 2: Check if user has tenant memberships
SELECT 
  p.email,
  t.name as tenant_name,
  t.slug as tenant_slug,
  t.custom_domain,
  utm.role as tenant_role,
  utm.is_active
FROM profiles p
LEFT JOIN user_tenant_memberships utm ON p.id = utm.user_id
LEFT JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';

-- Step 3: Check which tenant you're trying to access
-- If you're visiting tenant-a.local:3000, you need membership in 'tenant-a'
-- If you're visiting tenant-b.local:3000, you need membership in 'tenant-b'

-- Step 4: If user has NO tenant memberships, add them manually:
-- (Replace with your actual user email and desired tenant)

/*
INSERT INTO user_tenant_memberships (user_id, tenant_id, role, is_active)
SELECT 
  (SELECT id FROM profiles WHERE email = 'your-email@example.com'),
  (SELECT id FROM tenants WHERE slug = 'tenant-a'), -- or 'tenant-b'
  'admin', -- or 'student'
  true
ON CONFLICT (user_id, tenant_id) DO NOTHING;
*/

-- Step 5: Verify the fix
SELECT 
  p.email,
  t.slug as tenant,
  utm.role,
  utm.is_active
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';
