-- ============================================================================
-- CREATE DEFAULT COMMUNITY CHANNELS FOR COURSES
-- ============================================================================
-- This function creates default community channels when a course is created
-- or when community is enabled for an existing course
-- ============================================================================

-- Function to create default channels for a course
CREATE OR REPLACE FUNCTION public.create_default_community_channels()
RETURNS TRIGGER AS $$
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
                INSERT INTO public.community_channels (course_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    'General Discussion',
                    'General discussions about the course',
                    'discussion',
                    true
                );

                -- Create Announcements channel
                INSERT INTO public.community_channels (course_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    'Announcements',
                    'Course announcements and updates',
                    'announcement',
                    true
                );

                -- Create Q&A channel
                INSERT INTO public.community_channels (course_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    'Q&A',
                    'Ask questions and get help',
                    'discussion',
                    true
                );
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS create_community_channels_on_course ON public.courses;

-- Create trigger for courses table
CREATE TRIGGER create_community_channels_on_course
    AFTER INSERT OR UPDATE OF community_enabled ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.create_default_community_channels();

-- ============================================================================
-- BACKFILL: Create channels for existing courses with community enabled
-- ============================================================================
-- Run this to create channels for courses that already have community enabled
-- but don't have any channels yet

DO $$
DECLARE
    course_record RECORD;
BEGIN
    FOR course_record IN 
        SELECT id FROM public.courses 
        WHERE community_enabled = true
        AND NOT EXISTS (
            SELECT 1 FROM public.community_channels 
            WHERE course_id = courses.id
        )
    LOOP
        -- Create General Discussion channel
        INSERT INTO public.community_channels (course_id, name, description, type, is_active)
        VALUES (
            course_record.id,
            'General Discussion',
            'General discussions about the course',
            'discussion',
            true
        );

        -- Create Announcements channel
        INSERT INTO public.community_channels (course_id, name, description, type, is_active)
        VALUES (
            course_record.id,
            'Announcements',
            'Course announcements and updates',
            'announcement',
            true
        );

        -- Create Q&A channel
        INSERT INTO public.community_channels (course_id, name, description, type, is_active)
        VALUES (
            course_record.id,
            'Q&A',
            'Ask questions and get help',
            'discussion',
            true
        );

        RAISE NOTICE 'Created channels for course: %', course_record.id;
    END LOOP;
END $$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Run this to verify channels were created:
-- SELECT c.id, c.title, c.community_enabled, COUNT(cc.id) as channel_count
-- FROM public.courses c
-- LEFT JOIN public.community_channels cc ON c.course_id = cc.course_id
-- WHERE c.community_enabled = true
-- GROUP BY c.id, c.title, c.community_enabled;
