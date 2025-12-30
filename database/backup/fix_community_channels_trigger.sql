-- ============================================================================
-- FIX: Update create_default_community_channels function to include tenant_id
-- ============================================================================

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
                    NEW.tenant_id,  -- MULTI-TENANT: Include tenant_id from course
                    'General Discussion',
                    'General discussions about the course',
                    'discussion',
                    true
                );

                -- Create Announcements channel
                INSERT INTO public.community_channels (course_id, tenant_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    NEW.tenant_id,  -- MULTI-TENANT: Include tenant_id from course
                    'Announcements',
                    'Course announcements and updates',
                    'announcement',
                    true
                );

                -- Create Q&A channel
                INSERT INTO public.community_channels (course_id, tenant_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    NEW.tenant_id,  -- MULTI-TENANT: Include tenant_id from course
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

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Function updated to include tenant_id!';
    RAISE NOTICE 'Try creating a course now.';
END $$;
