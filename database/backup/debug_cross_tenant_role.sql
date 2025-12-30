-- ============================================================================
-- DEBUG: Check cross-tenant role issue
-- ============================================================================
-- Replace 'your-email@example.com' with the email you used for signup

SELECT 
  p.email,
  p.role as profile_role,
  t.name as tenant_name,
  t.slug as tenant_slug,
  utm.role as tenant_role,
  utm.created_at,
  utm.updated_at
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com'
ORDER BY utm.created_at;

-- Expected:
-- Tenant A: tenant_role = 'admin' (what you selected during signup)
-- Tenant B: Should NOT exist (unless you signed up there too)

-- If you see:
-- Tenant A: tenant_role = 'student' ❌
-- Tenant B: tenant_role = 'admin' ❌
-- This means the RPC function is assigning to wrong tenant or wrong role

-- Quick fix: Delete wrong entries and re-signup
/*
DELETE FROM user_tenant_memberships 
WHERE user_id = (SELECT id FROM profiles WHERE email = 'your-email@example.com');

-- Then signup again
*/
