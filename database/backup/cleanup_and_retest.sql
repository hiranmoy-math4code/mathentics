-- ============================================================================
-- COMPLETE FIX: Clean up and re-test signup
-- ============================================================================

-- Step 1: Check current state
SELECT 
  p.email,
  t.slug as tenant,
  utm.role,
  utm.created_at
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-test-email@example.com'
ORDER BY utm.created_at;

-- Step 2: Clean up test user (if needed)
/*
DELETE FROM user_tenant_memberships 
WHERE user_id = (SELECT id FROM profiles WHERE email = 'your-test-email@example.com');

DELETE FROM profiles 
WHERE email = 'your-test-email@example.com';
*/

-- Step 3: After cleanup, signup again with these steps:
-- 1. Clear browser cache (Ctrl+Shift+Delete)
-- 2. Visit tenant-a.local:3000/auth/sign-up
-- 3. Select "Educator" (admin) role
-- 4. Signup
-- 5. Check console for: "✅ User assigned to tenant: tenant-a with role: admin"

-- Step 4: Verify correct assignment
SELECT 
  p.email,
  t.slug as tenant,
  utm.role,
  utm.created_at
FROM profiles p
JOIN user_tenant_memberships utm ON p.id = utm.user_id
JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-test-email@example.com';

-- Expected result:
-- email | tenant | role | created_at
-- test@example.com | tenant-a | admin | 2025-12-28...
-- (ONLY ONE ROW - only in tenant-a with admin role)
