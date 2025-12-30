-- Quick check: What domains are configured in tenants table?
SELECT id, name, slug, custom_domain 
FROM public.tenants 
WHERE is_active = true;

-- Expected output should show:
-- tenant-a.local:3000 for Tenant A
-- tenant-b.local:3000 for Tenant B
