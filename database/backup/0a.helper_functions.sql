-- ============================================================================
-- QUICK FIX: Create helper functions in public schema
-- Run this FIRST before the main migration
-- ============================================================================

-- Create tenant_id helper function
CREATE OR REPLACE FUNCTION public.get_current_tenant_id()
RETURNS UUID AS $$
DECLARE
  tenant_uuid UUID;
BEGIN
  tenant_uuid := current_setting('request.headers.x-tenant-id', true)::uuid;
  RETURN tenant_uuid;
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Create user access check function  
CREATE OR REPLACE FUNCTION public.user_has_tenant_access()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_tenant_memberships
    WHERE user_id = auth.uid()
    AND tenant_id = public.get_current_tenant_id()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ✅ Helper functions created successfully!
-- Note: All RLS policies will use public.get_current_tenant_id() and public.user_has_tenant_access()
