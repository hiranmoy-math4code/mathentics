-- ============================================================================
-- SETUP: Create Test Tenants for Local Testing
-- ============================================================================
-- This creates two tenants for testing multi-tenant isolation on localhost

-- Create Tenant A (localhost:3000)
INSERT INTO tenants (id, name, slug, custom_domain, is_active) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tenant A (Port 3000)', 'tenant-a', 'localhost:3000', true)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  custom_domain = EXCLUDED.custom_domain,
  is_active = EXCLUDED.is_active;

-- Create Tenant B (localhost:3001)
INSERT INTO tenants (id, name, slug, custom_domain, is_active) VALUES
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Tenant B (Port 3001)', 'tenant-b', 'localhost:3001', true)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  custom_domain = EXCLUDED.custom_domain,
  is_active = EXCLUDED.is_active;

-- Verify tenants created
SELECT 
  id, 
  name, 
  slug, 
  custom_domain,
  is_active,
  created_at
FROM tenants 
WHERE slug IN ('tenant-a', 'tenant-b', 'mathentics', 'localhost')
ORDER BY created_at;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Test tenants created!';
    RAISE NOTICE '   - Tenant A: localhost:3000 (slug: tenant-a)';
    RAISE NOTICE '   - Tenant B: localhost:3001 (slug: tenant-b)';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Next steps:';
    RAISE NOTICE '   1. Run: npm run dev (port 3000)';
    RAISE NOTICE '   2. Run: PORT=3001 npm run dev (port 3001)';
    RAISE NOTICE '   3. Test signup on both ports';
END $$;
