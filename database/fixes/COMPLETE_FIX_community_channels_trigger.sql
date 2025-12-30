-- ============================================================================
-- COMPLETE FIX: Drop old trigger and recreate with correct table name
-- ============================================================================

-- Step 1: Drop old trigger if exists
DROP TRIGGER IF EXISTS create_community_channels_on_course ON public.courses;

-- Step 2: Drop old function (this is the one using wrong table name)
DROP FUNCTION IF EXISTS public.create_default_community_channels();

-- Step 3: Create NEW function with correct table name
CREATE OR REPLACE FUNCTION public.create_default_community_channels()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    -- Only create channels if community is enabled
    IF NEW.community_enabled = true THEN
        -- Check if this is a new course or community was just enabled
        IF (TG_OP = 'INSERT') OR 
           (TG_OP = 'UPDATE' AND OLD.community_enabled = false AND NEW.community_enabled = true) THEN
            
            -- Check if channels already exist for this course
            IF NOT EXISTS (
                SELECT 1 FROM public.community_channels 
                WHERE course_id = NEW.id
            ) THEN
                -- Create General Discussion channel
                INSERT INTO public.community_channels (course_id, tenant_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    NEW.tenant_id,  -- ✅ MULTI-TENANT: Include tenant_id from course
                    'General Discussion',
                    'General discussions about the course',
                    'discussion',
                    true
                );

                -- Create Announcements channel
                INSERT INTO public.community_channels (course_id, tenant_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    NEW.tenant_id,  -- ✅ MULTI-TENANT: Include tenant_id from course
                    'Announcements',
                    'Course announcements and updates',
                    'announcement',
                    true
                );

                -- Create Q&A channel
                INSERT INTO public.community_channels (course_id, tenant_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    NEW.tenant_id,  -- ✅ MULTI-TENANT: Include tenant_id from course
                    'Q&A',
                    'Ask questions and get help',
                    'qa',
                    true
                );
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$function$;

-- Step 4: Create NEW trigger
CREATE TRIGGER create_community_channels_on_course
    AFTER INSERT OR UPDATE OF community_enabled ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.create_default_community_channels();

-- Step 5: Verify
SELECT 
    trigger_name,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'create_community_channels_on_course';

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Trigger completely recreated with correct table name!';
    RAISE NOTICE '✅ Now uses: community_channels (not channels)';
    RAISE NOTICE '✅ Try creating a course now.';
END $$;
