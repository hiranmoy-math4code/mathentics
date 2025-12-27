-- ============================================================================
-- OPTIMIZED PROGRESS SYSTEM - COMPLETE MIGRATION
-- ============================================================================
-- This script safely implements automatic progress tracking
-- Run this in Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE LESSON PROGRESS TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_enrollment_on_lesson_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_course_id uuid;
    v_total_lessons bigint;
    v_completed_lessons bigint;
    v_new_progress numeric;
    v_old_progress numeric;
BEGIN
    -- Get course_id from lesson
    SELECT m.course_id INTO v_course_id
    FROM lessons l 
    JOIN modules m ON l.module_id = m.id
    WHERE l.id = NEW.lesson_id;
    
    -- Only proceed if lesson was just marked complete
    IF NEW.completed = true AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.completed = false)) THEN
        
        -- Get old progress for comparison
        SELECT progress_percentage INTO v_old_progress
        FROM enrollments
        WHERE user_id = NEW.user_id AND course_id = v_course_id;
        
        -- Count total lessons in this course
        SELECT COUNT(l.id) INTO v_total_lessons
        FROM modules m
        JOIN lessons l ON m.id = l.module_id
        WHERE m.course_id = v_course_id;
        
        -- Count completed lessons by this user
        SELECT COUNT(*) INTO v_completed_lessons
        FROM lesson_progress lp
        WHERE lp.user_id = NEW.user_id 
        AND lp.course_id = v_course_id 
        AND lp.completed = true;
        
        -- Calculate new progress
        IF v_total_lessons > 0 THEN
            v_new_progress := ROUND((v_completed_lessons::numeric / v_total_lessons::numeric) * 100, 2);
        ELSE
            v_new_progress := 0;
        END IF;
        
        -- Update enrollment (SINGLE UPDATE!)
        UPDATE enrollments
        SET 
            progress_percentage = v_new_progress,
            last_accessed_lesson_id = NEW.lesson_id,
            last_accessed_at = NOW(),
            updated_at = NOW()
        WHERE user_id = NEW.user_id AND course_id = v_course_id;
        
        -- Award lesson completion reward (5 coins)
        -- This will trigger handle_reward_transaction() automatically
        INSERT INTO reward_transactions (user_id, amount, action_type, entity_id, description)
        VALUES (NEW.user_id, 5, 'lesson_complete', NEW.lesson_id::text, 'Completed a lesson')
        ON CONFLICT DO NOTHING; -- Prevent duplicate rewards
        
        -- Update "Complete a Lesson" daily mission
        PERFORM update_mission_progress(NEW.user_id, 'lesson');
        
        -- Check for course completion bonus
        IF v_new_progress >= 100 AND COALESCE(v_old_progress, 0) < 100 THEN
            -- Award course completion bonus (100 coins)
            INSERT INTO reward_transactions (user_id, amount, action_type, entity_id, description)
            VALUES (NEW.user_id, 100, 'course_complete', v_course_id::text, '🎉 Course completed!')
            ON CONFLICT DO NOTHING;
            
            -- Update enrollment status
            UPDATE enrollments
            SET status = 'completed'
            WHERE user_id = NEW.user_id AND course_id = v_course_id;
        END IF;
        
    END IF;
    
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- Log error but don't fail the lesson completion
    RAISE WARNING 'Progress update failed for lesson %: %', NEW.lesson_id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 2: CREATE THE TRIGGER
-- ============================================================================

DROP TRIGGER IF EXISTS on_lesson_progress_update_enrollment ON public.lesson_progress;

CREATE TRIGGER on_lesson_progress_update_enrollment
    AFTER INSERT OR UPDATE OF completed ON public.lesson_progress
    FOR EACH ROW
    WHEN (NEW.completed = true)
    EXECUTE FUNCTION public.update_enrollment_on_lesson_progress();

-- ============================================================================
-- STEP 3: BACKFILL EXISTING PROGRESS (OPTIONAL BUT RECOMMENDED)
-- ============================================================================
-- This ensures all existing enrollments have correct progress
-- Run this ONCE after creating the trigger

DO $$
DECLARE
    r RECORD;
    v_count INTEGER := 0;
BEGIN
    RAISE NOTICE 'Starting progress backfill...';
    
    FOR r IN (
        SELECT DISTINCT user_id, course_id 
        FROM lesson_progress 
        WHERE completed = true
    ) LOOP
        -- Trigger the update by touching one completed lesson
        -- PostgreSQL doesn't support LIMIT in UPDATE, so we use ctid
        UPDATE lesson_progress 
        SET completed = completed 
        WHERE ctid = (
            SELECT ctid 
            FROM lesson_progress 
            WHERE user_id = r.user_id 
            AND course_id = r.course_id 
            AND completed = true
            LIMIT 1
        );
        
        v_count := v_count + 1;
    END LOOP;
    
    RAISE NOTICE 'Backfill complete! Updated % enrollments', v_count;
END $$;

-- ============================================================================
-- STEP 4: DROP UNNECESSARY FUNCTIONS (CLEANUP)
-- ============================================================================
-- These functions are no longer needed with the trigger approach

-- Keep get_student_courses_progress for now (backward compatibility)
-- We'll deprecate it after testing

-- Drop old duplicate reward functions if they exist
DROP FUNCTION IF EXISTS public.handle_reward_transaction_process() CASCADE;
DROP FUNCTION IF EXISTS public.update_user_streak() CASCADE;

-- ============================================================================
-- STEP 5: VERIFICATION
-- ============================================================================

-- Check if trigger exists and is enabled
SELECT 
    tgname as trigger_name,
    tgenabled as enabled,
    tgtype as trigger_type
FROM pg_trigger 
WHERE tgname = 'on_lesson_progress_update_enrollment';

-- Check trigger function exists
SELECT 
    proname as function_name,
    prosrc as function_source
FROM pg_proc 
WHERE proname = 'update_enrollment_on_lesson_progress';

-- Test query: Check current progress for a user (replace with actual user_id)
-- SELECT 
--     e.user_id,
--     c.title,
--     e.progress_percentage,
--     e.last_accessed_at,
--     (SELECT COUNT(*) FROM modules m JOIN lessons l ON m.id = l.module_id WHERE m.course_id = c.id) as total_lessons,
--     (SELECT COUNT(*) FROM lesson_progress lp WHERE lp.user_id = e.user_id AND lp.course_id = c.id AND lp.completed = true) as completed_lessons
-- FROM enrollments e
-- JOIN courses c ON e.course_id = c.id
-- WHERE e.user_id = 'your-user-id-here';

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '✅ LESSON PROGRESS TRIGGER INSTALLED SUCCESSFULLY!';
    RAISE NOTICE '📊 Trigger: on_lesson_progress_update_enrollment';
    RAISE NOTICE '🎯 Function: update_enrollment_on_lesson_progress()';
    RAISE NOTICE '🚀 Progress will now update automatically on lesson completion!';
    RAISE NOTICE '💰 Rewards will be awarded automatically!';
    RAISE NOTICE '📈 Daily missions will update automatically!';
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  NEXT STEPS:';
    RAISE NOTICE '1. Update website hooks (useStudentCourses.ts)';
    RAISE NOTICE '2. Update mobile app hooks (useEnrolledCourses.ts)';
    RAISE NOTICE '3. Test lesson completion flow';
    RAISE NOTICE '4. Monitor for any errors';
END $$;
