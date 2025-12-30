-- ============================================================================
-- DEBUG: Check Enrollment and Tenant Detection
-- ============================================================================
-- Replace 'YOUR_USER_ID' with actual user ID

-- 1. Check user's enrollments (all tenants)
SELECT 
    e.id,
    e.user_id,
    e.course_id,
    c.title as course_title,
    e.tenant_id,
    t.name as tenant_name,
    t.custom_domain,
    e.status,
    e.created_at
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN tenants t ON e.tenant_id = t.id
WHERE e.user_id = 'YOUR_USER_ID'
ORDER BY e.created_at DESC;

-- 2. Check which tenant the user should see based on domain
-- For tenant-b.local:3000
SELECT 
    id as tenant_id,
    name,
    slug,
    custom_domain
FROM tenants
WHERE custom_domain = 'tenant-b.local:3000'
AND is_active = true;

-- 3. Check if enrollment exists for Tenant B
SELECT 
    e.id,
    e.user_id,
    e.course_id,
    c.title,
    e.tenant_id,
    t.name as tenant_name
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN tenants t ON e.tenant_id = t.id
WHERE e.user_id = 'YOUR_USER_ID'
AND e.tenant_id = (
    SELECT id FROM tenants 
    WHERE custom_domain = 'tenant-b.local:3000' 
    AND is_active = true
);

-- 4. Check user's tenant memberships
SELECT 
    user_id,
    tenant_id,
    t.name as tenant_name,
    is_active,
    role
FROM user_tenant_memberships utm
JOIN tenants t ON utm.tenant_id = t.id
WHERE user_id = 'YOUR_USER_ID'
ORDER BY is_active DESC;
