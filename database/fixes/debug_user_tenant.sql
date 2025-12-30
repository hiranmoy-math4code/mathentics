-- ============================================================================
-- DEBUG: Check User's Tenant Memberships
-- ============================================================================
-- Replace 'YOUR_USER_ID' with actual user ID

-- 1. Check all memberships for user
SELECT 
    utm.user_id,
    utm.tenant_id,
    t.name as tenant_name,
    t.slug as tenant_slug,
    t.custom_domain,
    utm.is_active,
    utm.role,
    utm.created_at
FROM user_tenant_memberships utm
JOIN tenants t ON utm.tenant_id = t.id
WHERE utm.user_id = 'YOUR_USER_ID'
ORDER BY utm.is_active DESC, utm.created_at DESC;

-- 2. Check which tenant should be active based on domain
-- This shows what SHOULD be active for tenant-b.local:3000
SELECT 
    id as tenant_id,
    name,
    slug,
    custom_domain,
    is_active
FROM tenants
WHERE custom_domain = 'tenant-b.local:3000';

-- 3. Verify the issue: Check if user has enrollment in Tenant A
SELECT 
    e.id,
    e.user_id,
    e.course_id,
    c.title as course_title,
    e.tenant_id,
    t.name as enrollment_tenant_name,
    e.status
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN tenants t ON e.tenant_id = t.id
WHERE e.user_id = 'YOUR_USER_ID'
ORDER BY e.created_at DESC;
