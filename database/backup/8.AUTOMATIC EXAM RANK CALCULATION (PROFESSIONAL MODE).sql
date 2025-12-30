-- ============================================================================
-- AUTOMATIC EXAM RANK CALCULATION (PROFESSIONAL MODE)
-- ============================================================================
-- Logic: A student holds only ONE Rank per Exam, based on their BEST score.
-- Even if they attempt 5 times, all their result cards will show their current Best Rank.
-- 1. Create the Function to Calculate Ranks
CREATE OR REPLACE FUNCTION public.update_exam_ranks()
RETURNS TRIGGER AS $$
DECLARE
    v_exam_id uuid;
BEGIN
    -- Get the exam_id from the related attempt
    SELECT exam_id INTO v_exam_id
    FROM public.exam_attempts
    WHERE id = NEW.attempt_id;
    -- Update Ranks based on BEST SCORE per Student
    WITH student_best_scores AS (
        -- Step 1: Find the best score for each student in this exam
        SELECT 
            ea.student_id,
            MAX(r.obtained_marks) as best_marks
        FROM public.results r
        JOIN public.exam_attempts ea ON r.attempt_id = ea.id
        WHERE ea.exam_id = v_exam_id
        GROUP BY ea.student_id
    ),
    ranked_students AS (
        -- Step 2: Rank the students based on their best marks
        SELECT
            student_id,
            DENSE_RANK() OVER (ORDER BY best_marks DESC) as rank
        FROM student_best_scores
    )
    -- Step 3: Apply this rank to ALL attempts by that student for this exam
    UPDATE public.results
    SET rank = rs.rank
    FROM public.exam_attempts ea
    JOIN ranked_students rs ON ea.student_id = rs.student_id
    WHERE public.results.attempt_id = ea.id
    AND ea.exam_id = v_exam_id
    AND public.results.rank IS DISTINCT FROM rs.rank; -- Optimization: Only update if changed
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'Rank calculation failed for attempt %: %', NEW.attempt_id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 2. Create the Trigger on the Results Table
DROP TRIGGER IF EXISTS on_result_change_update_ranks ON public.results;
CREATE TRIGGER on_result_change_update_ranks
    AFTER INSERT OR UPDATE OF obtained_marks ON public.results
    FOR EACH ROW
    EXECUTE FUNCTION public.update_exam_ranks();
-- 3. (Optional) Manual Backfill Function
-- Run this once if you want to fix all existing ranks immediately
-- DO $$
-- DECLARE
--     r RECORD;
-- BEGIN
--     -- Fake an update on one result per exam to trigger the recalc
--     FOR r IN (SELECT DISTINCT exam_id FROM public.exam_attempts) LOOP
--         UPDATE public.results 
--         SET obtained_marks = obtained_marks 
--         WHERE attempt_id IN (SELECT id FROM public.exam_attempts WHERE exam_id = r.exam_id)
--         LIMIT 1;
--     END LOOP;
-- END $$;