-- ============================================================================
-- ALTERNATIVE APPROACH: Use Supabase Edge Function or RPC
-- ============================================================================
-- Since trigger might not have access to user metadata immediately,
-- we'll create an RPC function that can be called after signup

-- Drop old versions of the function
DROP FUNCTION IF EXISTS public.assign_user_to_tenant(UUID, TEXT);
DROP FUNCTION IF EXISTS public.assign_user_to_tenant(UUID, TEXT, TEXT);

CREATE OR REPLACE FUNCTION public.assign_user_to_tenant(
  p_user_id UUID,
  p_tenant_slug TEXT,
  p_role TEXT DEFAULT 'student'
)
RETURNS JSONB AS $$
DECLARE
  v_tenant_id UUID;
  v_result JSONB;
BEGIN
  -- Find tenant by slug
  SELECT id INTO v_tenant_id
  FROM public.tenants
  WHERE slug = p_tenant_slug
  LIMIT 1;

  -- If tenant not found, use default
  IF v_tenant_id IS NULL THEN
    SELECT id INTO v_tenant_id
    FROM public.tenants
    WHERE slug = 'math4code'
    LIMIT 1;
  END IF;

  -- Add user to tenant with specified role
  IF v_tenant_id IS NOT NULL THEN
    INSERT INTO public.user_tenant_memberships (user_id, tenant_id, role, is_active)
    VALUES (
      p_user_id,
      v_tenant_id,
      p_role, -- Use role passed as parameter
      true
    )
    ON CONFLICT (user_id, tenant_id) 
    DO UPDATE SET 
      role = EXCLUDED.role,
      is_active = true,
      updated_at = now();

    v_result := jsonb_build_object(
      'success', true,
      'tenant_id', v_tenant_id,
      'tenant_slug', p_tenant_slug,
      'user_id', p_user_id,
      'role', p_role
    );
  ELSE
    v_result := jsonb_build_object(
      'success', false,
      'error', 'No tenant found'
    );
  END IF;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.assign_user_to_tenant(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.assign_user_to_tenant(UUID, TEXT, TEXT) TO anon;

-- Function created successfully!
-- Usage: SELECT public.assign_user_to_tenant(user_id, 'tenant-slug', 'admin');
