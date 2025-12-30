-- DEBUG: Check tenant configuration
-- Run this to verify tenant setup

-- 1. Check all tenants and their domains
SELECT id, name, slug, custom_domain, is_active
FROM public.tenants
ORDER BY created_at;

-- 2. Check which tenant should match tenant-b.local:3000
SELECT id, name, slug, custom_domain
FROM public.tenants
WHERE custom_domain LIKE '%tenant-b%'
   OR slug = 'tenant-b';

-- 3. Verify RPC function is updated
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'get_published_courses_with_meta';

-- 4. Test RPC function manually (as unauthenticated user)
SELECT * FROM get_published_courses_with_meta(NULL, 10, 0);

-- 5. Check courses by tenant
SELECT 
    c.id,
    c.title,
    c.tenant_id,
    t.name as tenant_name,
    t.slug as tenant_slug
FROM courses c
LEFT JOIN tenants t ON c.tenant_id = t.id
WHERE c.is_published = true
ORDER BY t.slug, c.title;
