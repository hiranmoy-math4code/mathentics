-- Check what ID tenant-a actually has in tenants table
SELECT 
  id,
  name,
  slug,
  custom_domain
FROM tenants
WHERE slug = 'tenant-a';

-- This should show:
-- id: de4cea86-71bb-4091-b336-91ee530f7d16 (what middleware is using)
-- OR
-- id: f9c03969-da89-4d2e-92eb-029490268453 (what user_tenant_memberships has)
