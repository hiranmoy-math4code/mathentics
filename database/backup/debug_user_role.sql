-- Check user's role in both tables
-- Replace 'your-email@example.com' with your actual email

SELECT 
  p.id,
  p.email,
  p.full_name,
  p.role as profile_role,
  utm.role as tenant_role,
  utm.tenant_id,
  utm.is_active,
  t.name as tenant_name,
  t.slug as tenant_slug
FROM profiles p
LEFT JOIN user_tenant_memberships utm ON p.id = utm.user_id
LEFT JOIN tenants t ON utm.tenant_id = t.id
WHERE p.email = 'your-email@example.com';

-- If you see the user but tenant_role is NULL or 'student', run this to fix:
-- UPDATE user_tenant_memberships 
-- SET role = 'admin' 
-- WHERE user_id = (SELECT id FROM profiles WHERE email = 'your-email@example.com');
