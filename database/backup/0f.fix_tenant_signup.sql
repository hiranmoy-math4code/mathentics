-- ============================================================================
-- COMPLETE FIX: Domain-based tenant signup
-- ============================================================================
-- Run this script to fix the tenant signup issue

-- Step 1: Drop old trigger and function
DROP TRIGGER IF EXISTS trigger_auto_add_user_to_tenant ON public.profiles;
DROP FUNCTION IF EXISTS public.auto_add_user_to_default_tenant();
DROP FUNCTION IF EXISTS public.auto_add_user_to_current_tenant();

-- Step 2: Create new function that reads from user metadata
CREATE OR REPLACE FUNCTION public.auto_add_user_to_signup_tenant()
RETURNS TRIGGER AS $$
DECLARE
  signup_tenant_id UUID;
  tenant_slug_value TEXT;
BEGIN
  -- Get tenant_slug from user metadata
  SELECT raw_user_meta_data->>'tenant_slug' INTO tenant_slug_value
  FROM auth.users
  WHERE id = NEW.id;

  -- Find tenant by slug
  IF tenant_slug_value IS NOT NULL AND tenant_slug_value != '' THEN
    SELECT id INTO signup_tenant_id
    FROM public.tenants
    WHERE slug = tenant_slug_value
    LIMIT 1;
  END IF;

  -- Fallback to math4code if no tenant found
  IF signup_tenant_id IS NULL THEN
    SELECT id INTO signup_tenant_id
    FROM public.tenants
    WHERE slug = 'math4code'
    LIMIT 1;
  END IF;

  -- Add user to tenant
  IF signup_tenant_id IS NOT NULL THEN
    INSERT INTO public.user_tenant_memberships (user_id, tenant_id, role, is_active)
    VALUES (NEW.id, signup_tenant_id, NEW.role, true)
    ON CONFLICT (user_id, tenant_id) 
    DO UPDATE SET role = EXCLUDED.role, is_active = true;
    
    RAISE NOTICE 'User % added to tenant % (slug: %)', NEW.id, signup_tenant_id, tenant_slug_value;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create trigger
CREATE TRIGGER trigger_auto_add_user_to_tenant
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.auto_add_user_to_signup_tenant();

-- Step 4: Test the function manually
DO $$
DECLARE
  test_result TEXT;
BEGIN
  RAISE NOTICE '✅ Trigger created successfully!';
  RAISE NOTICE 'Testing: Check if tenants exist...';
  
  SELECT string_agg(slug, ', ') INTO test_result FROM tenants;
  RAISE NOTICE 'Available tenants: %', test_result;
END $$;
