-- ============================================================================
-- CHECK: Payment Gateway Settings for Tenants
-- ============================================================================

-- 1. Check all tenant payment gateway settings
SELECT 
    t.id as tenant_id,
    t.name as tenant_name,
    t.slug,
    pgs.gateway_type,
    pgs.is_active,
    pgs.created_at
FROM tenants t
LEFT JOIN payment_gateway_settings pgs ON t.id = pgs.tenant_id
ORDER BY t.name;

-- 2. Check specifically for Tenant B
SELECT 
    t.id as tenant_id,
    t.name,
    t.custom_domain,
    pgs.gateway_type,
    pgs.is_active,
    pgs.app_id,
    pgs.created_at
FROM tenants t
LEFT JOIN payment_gateway_settings pgs ON t.id = pgs.tenant_id
WHERE t.custom_domain = 'tenant-b.local:3000';

-- 3. Check if Tenant A has gateway settings (for comparison)
SELECT 
    t.id as tenant_id,
    t.name,
    t.custom_domain,
    pgs.gateway_type,
    pgs.is_active
FROM tenants t
LEFT JOIN payment_gateway_settings pgs ON t.id = pgs.tenant_id
WHERE t.custom_domain = 'tenant-a.local:3000';
