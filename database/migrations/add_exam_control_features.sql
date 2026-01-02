-- ============================================================
-- EXAM CONTROL FEATURES - Database Migration (Updated)
-- ============================================================
-- Two separate concepts:
-- 1. Exam Availability Window (start_time to end_time) - Already exists
-- 2. Exam Duration Timer (from user's start time) - Uses duration_minutes
-- 3. Admin controls for pause/exit
-- ============================================================

-- Add new columns to exams table
ALTER TABLE public.exams 
ADD COLUMN IF NOT EXISTS allow_pause BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS auto_submit_on_duration BOOLEAN DEFAULT true;

-- Rename for clarity (optional - only if you want to be explicit)
-- The existing start_time and end_time are for AVAILABILITY WINDOW
-- The duration_minutes is for EXAM DURATION from user's start

-- Add comments for documentation
COMMENT ON COLUMN public.exams.allow_pause IS 'Admin controls if students can pause and exit the exam';
COMMENT ON COLUMN public.exams.auto_submit_on_duration IS 'Automatically submit exam when duration_minutes expires from user start time';
COMMENT ON COLUMN public.exams.start_time IS 'Exam availability window START (e.g., 2 Jan 2026). NULL means available immediately.';
COMMENT ON COLUMN public.exams.end_time IS 'Exam availability window END (e.g., 5 Jan 2026). NULL means no deadline.';
COMMENT ON COLUMN public.exams.duration_minutes IS 'Exam duration from user start time (e.g., 180 minutes = 3 hours)';

-- ============================================================
-- HELPER FUNCTION: Check if exam is within availability window
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_exam_available(exam_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  exam_record RECORD;
  current_time TIMESTAMPTZ := NOW();
BEGIN
  SELECT start_time, end_time
  INTO exam_record
  FROM public.exams
  WHERE id = exam_id;

  -- No window means always available
  IF exam_record.start_time IS NULL AND exam_record.end_time IS NULL THEN
    RETURN TRUE;
  END IF;

  -- Check if within availability window
  IF exam_record.start_time IS NOT NULL AND current_time < exam_record.start_time THEN
    RETURN FALSE; -- Too early
  END IF;

  IF exam_record.end_time IS NOT NULL AND current_time > exam_record.end_time THEN
    RETURN FALSE; -- Too late
  END IF;

  RETURN TRUE;
END;
$$;

-- ============================================================
-- HELPER FUNCTION: Calculate exam deadline for a session
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_exam_deadline(session_id UUID)
RETURNS TIMESTAMPTZ
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  session_start TIMESTAMPTZ;
  exam_duration INTEGER;
  exam_end_time TIMESTAMPTZ;
  calculated_deadline TIMESTAMPTZ;
BEGIN
  SELECT 
    es.started_at,
    e.duration_minutes,
    e.end_time
  INTO session_start, exam_duration, exam_end_time
  FROM exam_sessions es
  JOIN exams e ON es.exam_id = e.id
  WHERE es.id = session_id;

  -- Calculate deadline from start time + duration
  calculated_deadline := session_start + (exam_duration || ' minutes')::INTERVAL;

  -- If exam has availability end_time, use the earlier of the two
  IF exam_end_time IS NOT NULL THEN
    calculated_deadline := LEAST(calculated_deadline, exam_end_time);
  END IF;

  RETURN calculated_deadline;
END;
$$;

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Check if columns were added successfully
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'exams' 
  AND column_name IN ('allow_pause', 'auto_submit_on_duration', 'start_time', 'end_time', 'duration_minutes')
ORDER BY column_name;

-- ============================================================
-- EXAMPLE SCENARIOS
-- ============================================================

-- Scenario 1: Exam available 2 Jan - 5 Jan, 3 hour duration, no pause
/*
INSERT INTO exams (
  admin_id, 
  title, 
  duration_minutes, 
  total_marks,
  tenant_id,
  start_time,
  end_time,
  allow_pause,
  auto_submit_on_duration
) VALUES (
  'admin-uuid',
  'JEE Main Mock Test',
  180, -- 3 hours from user start
  300,
  'tenant-uuid',
  '2026-01-02 00:00:00+05:30', -- Available from 2 Jan
  '2026-01-05 23:59:59+05:30', -- Until 5 Jan
  false, -- No pause
  true -- Auto-submit after 3 hours
);

User starts on 3 Jan at 10:00 AM
→ Auto-submit at 3 Jan 1:00 PM (10:00 + 3 hours)
*/

-- Scenario 2: Live exam 9 AM - 12 PM (same day), no pause
/*
INSERT INTO exams (
  admin_id, 
  title, 
  duration_minutes, 
  total_marks,
  tenant_id,
  start_time,
  end_time,
  allow_pause,
  auto_submit_on_duration
) VALUES (
  'admin-uuid',
  'GATE Live Exam',
  180, -- 3 hours
  100,
  'tenant-uuid',
  '2026-01-05 09:00:00+05:30', -- 9 AM
  '2026-01-05 12:00:00+05:30', -- 12 PM
  false,
  true
);

User starts at 9:00 AM
→ Should auto-submit at 12:00 PM (earlier of: 9:00+3hrs=12:00 or window end 12:00)

User starts at 10:00 AM
→ Should auto-submit at 12:00 PM (earlier of: 10:00+3hrs=1:00PM or window end 12:00)
*/

-- Scenario 3: Practice exam (no window, pause allowed)
/*
INSERT INTO exams (
  admin_id, 
  title, 
  duration_minutes, 
  total_marks,
  tenant_id,
  start_time,
  end_time,
  allow_pause,
  auto_submit_on_duration
) VALUES (
  'admin-uuid',
  'Practice Test',
  60,
  100,
  'tenant-uuid',
  NULL, -- No start restriction
  NULL, -- No end restriction
  true, -- Pause allowed
  true
);

User can start anytime, pause anytime
→ Auto-submit after 60 minutes of active time
*/
