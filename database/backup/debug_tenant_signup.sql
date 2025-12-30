-- ============================================================================
-- DEBUG: Check if tenant_slug is being passed correctly
-- ============================================================================

-- Check the last created user's metadata
SELECT 
  id,
  email,
  raw_user_meta_data->>'tenant_slug' as tenant_slug_from_signup,
  raw_user_meta_data->>'full_name' as full_name,
  raw_user_meta_data->>'role' as role_from_metadata,
  created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- Check their tenant memberships
SELECT 
  u.email,
  u.raw_user_meta_data->>'tenant_slug' as intended_tenant,
  t.slug as actual_tenant,
  utm.role,
  utm.created_at
FROM auth.users u
LEFT JOIN user_tenant_memberships utm ON u.id = utm.user_id
LEFT JOIN tenants t ON utm.tenant_id = t.id
ORDER BY u.created_at DESC
LIMIT 5;

-- If tenant_slug is NULL in metadata, the signup page isn't passing it correctly
-- If tenant_slug exists but user is in wrong tenant, the trigger isn't working
