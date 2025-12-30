    -- ============================================================================
    -- AUTO-CREATE CHANNEL WHEN COURSE IS CREATED
    -- ============================================================================

    -- Function to create channel for new course
    CREATE OR REPLACE FUNCTION create_channel_for_course()
    RETURNS TRIGGER AS $$
    BEGIN
        -- Insert a new channel for the course
        INSERT INTO community_channels (
            tenant_id,
            course_id,
            name,
            description,
            created_at,
            updated_at
        ) VALUES (
            NEW.tenant_id,
            NEW.id,
            NEW.title || ' Discussion',  -- Channel name = Course title + " Discussion"
            'Discussion channel for ' || NEW.title,
            NOW(),
            NOW()
        );
        
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Create trigger
    DROP TRIGGER IF EXISTS trigger_create_course_channel ON courses;

    CREATE TRIGGER trigger_create_course_channel
        AFTER INSERT ON courses
        FOR EACH ROW
        EXECUTE FUNCTION create_channel_for_course();

    -- Verify trigger exists
    SELECT 
        trigger_name,
        event_manipulation,
        event_object_table,
        action_statement
    FROM information_schema.triggers
    WHERE trigger_name = 'trigger_create_course_channel';

    COMMENT ON FUNCTION create_channel_for_course() IS 'Automatically creates a discussion channel when a new course is created';
    COMMENT ON TRIGGER trigger_create_course_channel ON courses IS 'Auto-creates channel for new courses';
