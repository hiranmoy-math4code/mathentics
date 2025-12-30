-- ============================================================================
-- FIX: Tenant ID Mismatch Issue
-- ============================================================================

-- Step 1: Check what tenant IDs exist
SELECT 
  id,
  name,
  slug,
  custom_domain
FROM tenants
WHERE slug IN ('tenant-a', 'tenant-b')
ORDER BY slug;

-- Step 2: Check user's memberships
SELECT 
  utm.tenant_id,
  t.slug,
  t.custom_domain,
  utm.role
FROM user_tenant_memberships utm
JOIN tenants t ON utm.tenant_id = t.id
WHERE utm.user_id = (SELECT id FROM profiles WHERE email = 'mathematicsstudent12345@gmail.com');

-- Step 3: If tenant IDs don't match, update user_tenant_memberships
-- Replace 'OLD_TENANT_ID' with the ID from Step 2
-- Replace 'NEW_TENANT_ID' with the ID from Step 1 for tenant-a

/*
UPDATE user_tenant_memberships
SET tenant_id = 'de4cea86-71bb-4091-b336-91ee530f7d16'  -- NEW tenant-a ID from tenants table
WHERE user_id = (SELECT id FROM profiles WHERE email = 'mathematicsstudent12345@gmail.com')
  AND tenant_id = 'f9c03969-da89-4d2e-92eb-029490268453';  -- OLD tenant_id
*/

-- Step 4: Verify the fix
SELECT 
  p.email,
  t.slug,
  t.id as tenant_id,
  utm.role
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'mathematicsstudent12345@gmail.com';
