-- ============================================================
-- AUTO-SUBMIT CRON JOB (v2 - With Grading)
-- ============================================================
-- 1. Creates a function to checking for expired exams.
-- 2. Iterates through them and calls submit_exam_attempt() to GRADE them.
-- 3. Schedules it to run every minute via pg_cron.
--
-- PREREQUISITE: Enable 'pg_cron' extension in Supabase Dashboard!
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- ============================================================
-- 1. Create the Worker Function
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_auto_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with admin privileges to update any user's exam
AS $$
DECLARE
  r RECORD;
BEGIN
  -- A. Handle Strict Mode Exams (Pause OFF) - BATCHED
  -- Process only 50 at a time to prevent database lockup during mass expiry
  FOR r IN
      SELECT id, exam_id 
      FROM public.exam_attempts
      WHERE status = 'in_progress'
        AND exam_deadline IS NOT NULL
        AND exam_deadline < NOW()
      LIMIT 50
  LOOP
      -- Call the submission RPC to grade and finalize
      PERFORM public.submit_exam_attempt(r.id, r.exam_id);
      
      -- Update additional metadata
      UPDATE public.exam_attempts
      SET total_time_spent = EXTRACT(EPOCH FROM (exam_deadline - started_at))::INTEGER
      WHERE id = r.id;
      
      RAISE NOTICE 'Auto-submitted strict exam attempt: %', r.id;
  END LOOP;

  -- B. Handle Flexible Mode Exams (Pause ON) - BATCHED
  FOR r IN
      SELECT ea.id, ea.exam_id, e.end_time, ea.last_activity_at, ea.is_paused, ea.elapsed_time_seconds
      FROM public.exam_attempts ea
      JOIN public.exams e ON ea.exam_id = e.id
      WHERE ea.status = 'in_progress'
        AND e.allow_pause = true
        AND e.end_time IS NOT NULL
        AND e.end_time < NOW()
      LIMIT 50
  LOOP
      -- Finalize time spent calculation before submitting
      UPDATE public.exam_attempts
      SET 
        elapsed_time_seconds = CASE 
            WHEN is_paused = false THEN 
                elapsed_time_seconds + EXTRACT(EPOCH FROM (end_time - last_activity_at))::INTEGER
            ELSE 
                elapsed_time_seconds 
        END,
        total_time_spent = CASE 
            WHEN is_paused = false THEN 
                elapsed_time_seconds + EXTRACT(EPOCH FROM (end_time - last_activity_at))::INTEGER
            ELSE 
                elapsed_time_seconds 
        END
      WHERE id = r.id;

      -- Call the submission RPC to grade and finalize
      PERFORM public.submit_exam_attempt(r.id, r.exam_id);

      RAISE NOTICE 'Auto-submitted flexible exam attempt: %', r.id;
  END LOOP;
    
END;
$$;

-- ============================================================
-- 2. Schedule the Job (Runs every minute)
-- ============================================================
-- Safe unschedule: only call unschedule if the job exists
DO $$
BEGIN
    PERFORM cron.unschedule(jobid)
    FROM cron.job
    WHERE jobname = 'auto-submit-exams-job';
    
    IF NOT FOUND THEN
        RAISE NOTICE 'Job auto-submit-exams-job not found, skipping unschedule.';
    END IF;
END $$;

SELECT cron.schedule(
  'auto-submit-exams-job',  -- Job Name
  '* * * * *',              -- Schedule (Every Minute)
  $$SELECT public.handle_auto_submissions()$$
);
