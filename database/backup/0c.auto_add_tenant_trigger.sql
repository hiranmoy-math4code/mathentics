-- ============================================================================
-- AUTO-ADD USER TO TENANT ON SIGNUP
-- ============================================================================
-- This trigger automatically adds new users to the CURRENT tenant
-- based on the domain they signed up from

CREATE OR REPLACE FUNCTION public.auto_add_user_to_current_tenant()
RETURNS TRIGGER AS $$
DECLARE
  current_tenant_id UUID;
  tenant_slug_from_metadata TEXT;
BEGIN
  -- Try to get tenant slug from user metadata (passed during signup)
  BEGIN
    SELECT raw_user_meta_data->>'tenant_slug' INTO tenant_slug_from_metadata
    FROM auth.users
    WHERE id = NEW.id;
  EXCEPTION
    WHEN OTHERS THEN
      tenant_slug_from_metadata := NULL;
  END;

  -- Get tenant ID from slug
  IF tenant_slug_from_metadata IS NOT NULL THEN
    SELECT id INTO current_tenant_id
    FROM public.tenants
    WHERE slug = tenant_slug_from_metadata
    LIMIT 1;
  END IF;

  -- If no tenant found, use default tenant (Math4Code)
  IF current_tenant_id IS NULL THEN
    SELECT id INTO current_tenant_id
    FROM public.tenants
    WHERE slug = 'math4code'
    LIMIT 1;
  END IF;

  -- Add user to the tenant
  IF current_tenant_id IS NOT NULL THEN
    INSERT INTO public.user_tenant_memberships (user_id, tenant_id, role, is_active)
    VALUES (
      NEW.id,
      current_tenant_id,
      NEW.role, -- Use role from profiles table
      true
    )
    ON CONFLICT (user_id, tenant_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on profiles table
DROP TRIGGER IF EXISTS trigger_auto_add_user_to_tenant ON public.profiles;

CREATE TRIGGER trigger_auto_add_user_to_tenant
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_add_user_to_current_tenant();

-- ============================================================================
-- BACKFILL: Add existing users who are missing from user_tenant_memberships
-- ============================================================================

INSERT INTO public.user_tenant_memberships (user_id, tenant_id, role, is_active)
SELECT 
  p.id,
  (SELECT id FROM public.tenants WHERE slug = 'math4code' LIMIT 1),
  p.role,
  true
FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_tenant_memberships utm
  WHERE utm.user_id = p.id
)
ON CONFLICT (user_id, tenant_id) DO NOTHING;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Auto-add trigger created successfully!';
    RAISE NOTICE '✅ Existing users backfilled to default tenant!';
END $$;
