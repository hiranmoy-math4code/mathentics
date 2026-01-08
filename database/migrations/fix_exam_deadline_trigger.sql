-- ============================================================================
-- SAFE PRODUCTION FIX #2: Set exam_deadline for Strict Mode Exams
-- ============================================================================
-- This migration adds a database trigger to automatically set exam_deadline
-- when a new exam attempt is created for strict mode exams (allow_pause = false)
-- 
-- SAFE because:
-- - Only affects NEW attempts (existing attempts unchanged)
-- - Uses trigger (automatic, no code changes needed)
-- - Backward compatible
-- ============================================================================

-- Create trigger function
CREATE OR REPLACE FUNCTION set_exam_deadline_on_attempt_creation()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    exam_duration INTEGER;
    exam_allow_pause BOOLEAN;
    exam_end_time TIMESTAMPTZ;
    calculated_deadline TIMESTAMPTZ;
BEGIN
    -- Get exam settings
    SELECT duration_minutes, allow_pause, end_time
    INTO exam_duration, exam_allow_pause, exam_end_time
    FROM exams
    WHERE id = NEW.exam_id;
    
    -- Only set deadline for strict mode (pause OFF)
    IF exam_allow_pause = false THEN
        -- Calculate deadline from start time + duration
        calculated_deadline := NEW.started_at + (exam_duration || ' minutes')::INTERVAL;
        
        -- If exam has end_time, use the earlier of the two
        IF exam_end_time IS NOT NULL THEN
            calculated_deadline := LEAST(calculated_deadline, exam_end_time);
        END IF;
        
        -- Set the deadline
        NEW.exam_deadline := calculated_deadline;
        
        RAISE NOTICE 'Set exam_deadline for attempt % to %', NEW.id, calculated_deadline;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create trigger (runs BEFORE INSERT)
DROP TRIGGER IF EXISTS trigger_set_exam_deadline ON exam_attempts;

CREATE TRIGGER trigger_set_exam_deadline
    BEFORE INSERT ON exam_attempts
    FOR EACH ROW
    EXECUTE FUNCTION set_exam_deadline_on_attempt_creation();

-- Verify trigger was created
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM pg_trigger 
        WHERE tgname = 'trigger_set_exam_deadline'
    ) THEN
        RAISE NOTICE '✅ Trigger created successfully!';
    ELSE
        RAISE WARNING '❌ Failed to create trigger!';
    END IF;
END $$;

-- ============================================================================
-- TEST (optional - run this to test the trigger)
-- ============================================================================
-- SELECT set_exam_deadline_on_attempt_creation();

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================
-- DROP TRIGGER IF EXISTS trigger_set_exam_deadline ON exam_attempts;
-- DROP FUNCTION IF EXISTS set_exam_deadline_on_attempt_creation();
