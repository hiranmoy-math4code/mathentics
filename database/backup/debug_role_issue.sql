-- Debug: Check user roles across tenants
-- Replace 'your-email@example.com' with the email you used for signup

SELECT 
  p.email,
  p.role as profile_role,
  t.name as tenant_name,
  t.slug as tenant_slug,
  utm.role as tenant_role,
  utm.is_active,
  utm.created_at
FROM profiles p
LEFT JOIN user_tenant_memberships utm ON p.id = utm.user_id
LEFT JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com'
ORDER BY utm.created_at;

-- Expected result:
-- Tenant A: tenant_role should be 'admin' (what you selected during signup)
-- Tenant B: tenant_role should be 'admin' (what you selected during signup)

-- If tenant_role is 'student' but profile_role is 'admin', 
-- the RPC function is not working correctly
