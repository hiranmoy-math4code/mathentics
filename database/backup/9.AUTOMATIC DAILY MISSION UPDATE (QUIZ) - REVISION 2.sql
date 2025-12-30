-- ============================================================================
-- FIX: AUTOMATIC DAILY MISSION UPDATE (QUIZ) - REVISION 2
-- ============================================================================
-- Problem: "Complete a Quiz" daily mission was not updating because no trigger 
-- was listening for exam completion.
-- Solution: Add a trigger on `exam_attempts` to update mission progress.
-- Update: Fixed backfill logic to use `submitted_at` only (avoiding missing column error).
-- 1. Create Trigger Function
CREATE OR REPLACE FUNCTION public.handle_quiz_completion_mission()
RETURNS TRIGGER AS $$
BEGIN
    -- Only proceed if status changed to 'submitted' or 'graded'
    IF (NEW.status IN ('submitted', 'graded')) AND 
       (OLD.status NOT IN ('submitted', 'graded')) THEN
        
        -- Call the existing mission update function
        -- Mission ID is 'quiz' as defined in get_or_create_daily_missions
        PERFORM public.update_mission_progress(NEW.student_id, 'quiz');
        
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 2. Create Trigger on exam_attempts
DROP TRIGGER IF EXISTS on_exam_completed_update_mission ON public.exam_attempts;
CREATE TRIGGER on_exam_completed_update_mission
    AFTER UPDATE OF status ON public.exam_attempts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_quiz_completion_mission();
-- 3. (Optional) Backfill for today's completed quizzes
-- This ensures users who already took a quiz today get credit immediately.
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Fix: Use submitted_at only, as updated_at might not exist or be reliable
    FOR r IN (
        SELECT student_id 
        FROM public.exam_attempts 
        WHERE status IN ('submitted', 'graded') 
        AND submitted_at >= CURRENT_DATE
    ) LOOP
        PERFORM public.update_mission_progress(r.student_id, 'quiz');
    END LOOP;
END $$;