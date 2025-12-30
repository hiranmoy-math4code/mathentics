-- ============================================================================
-- HELPER: Switch User's Active Tenant
-- ============================================================================
-- Use this function to switch a user's active tenant
-- This ensures only ONE tenant is active at a time

CREATE OR REPLACE FUNCTION public.switch_user_tenant(
    p_user_id uuid,
    p_new_tenant_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Deactivate all current tenants for this user
    UPDATE public.user_tenant_memberships
    SET is_active = false
    WHERE user_id = p_user_id;
    
    -- Activate the new tenant
    UPDATE public.user_tenant_memberships
    SET is_active = true
    WHERE user_id = p_user_id
    AND tenant_id = p_new_tenant_id;
    
    -- If no membership exists, create it
    IF NOT FOUND THEN
        INSERT INTO public.user_tenant_memberships (user_id, tenant_id, is_active, role)
        VALUES (p_user_id, p_new_tenant_id, true, 'student');
    END IF;
END;
$$;

-- Usage example:
-- SELECT switch_user_tenant('user-id-here', 'tenant-id-here');
