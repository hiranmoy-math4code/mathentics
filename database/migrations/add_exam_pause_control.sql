-- ============================================================
-- EXAM PAUSE CONTROL - Migration for Existing Schema
-- ============================================================
-- Uses exam_attempts table (not exam_sessions)
-- ============================================================

-- ============================================================
-- STEP 1: Add pause control to exams table
-- ============================================================
ALTER TABLE public.exams 
ADD COLUMN IF NOT EXISTS allow_pause BOOLEAN DEFAULT true;

COMMENT ON COLUMN public.exams.allow_pause IS 'Admin controls if students can pause/exit. FALSE = continuous timer (deadline-based), TRUE = pausable timer (elapsed-based)';

-- ============================================================
-- STEP 2: Add timer columns to exam_attempts table
-- ============================================================
ALTER TABLE public.exam_attempts 
ADD COLUMN IF NOT EXISTS exam_deadline TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS elapsed_time_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS is_paused BOOLEAN DEFAULT false;

COMMENT ON COLUMN public.exam_attempts.exam_deadline IS 'Absolute deadline for pause=OFF exams (calculated from started_at + duration)';
COMMENT ON COLUMN public.exam_attempts.elapsed_time_seconds IS 'Total active time for pause=ON exams (excludes paused time)';
COMMENT ON COLUMN public.exam_attempts.last_activity_at IS 'Last activity timestamp for calculating current session time';
COMMENT ON COLUMN public.exam_attempts.is_paused IS 'Whether exam is currently paused (pause=ON only)';

-- ============================================================
-- STEP 3: Create trigger to set timer mode on attempt start
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_exam_timer()
RETURNS TRIGGER AS $$
DECLARE
  exam_record RECORD;
  calculated_deadline TIMESTAMPTZ;
BEGIN
  -- Fetch exam settings
  SELECT allow_pause, duration_minutes, end_time
  INTO exam_record
  FROM public.exams
  WHERE id = NEW.exam_id;
  
  IF exam_record.allow_pause = false THEN
    -- PAUSE OFF: Set absolute deadline (timer runs continuously)
    calculated_deadline := NEW.started_at + 
      (exam_record.duration_minutes || ' minutes')::INTERVAL;
    
    -- If exam has window end time, use earlier of the two
    IF exam_record.end_time IS NOT NULL THEN
      calculated_deadline := LEAST(calculated_deadline, exam_record.end_time);
    END IF;
    
    NEW.exam_deadline := calculated_deadline;
    NEW.elapsed_time_seconds := NULL;
    NEW.last_activity_at := NULL;
    NEW.is_paused := NULL;
    
  ELSE
    -- PAUSE ON: Initialize elapsed time tracking
    NEW.exam_deadline := NULL;
    NEW.elapsed_time_seconds := 0;
    NEW.last_activity_at := NEW.started_at;
    NEW.is_paused := false;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS trigger_set_exam_timer ON public.exam_attempts;

-- Create trigger
CREATE TRIGGER trigger_set_exam_timer
BEFORE INSERT ON public.exam_attempts
FOR EACH ROW
EXECUTE FUNCTION public.set_exam_timer();

-- ============================================================
-- STEP 4: Create helper function to get remaining time
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_remaining_time_seconds(p_attempt_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  attempt_record RECORD;
  exam_duration_seconds INTEGER;
  current_elapsed INTEGER;
  remaining_seconds INTEGER;
BEGIN
  SELECT 
    ea.exam_deadline,
    ea.elapsed_time_seconds,
    ea.last_activity_at,
    ea.is_paused,
    e.duration_minutes
  INTO attempt_record
  FROM public.exam_attempts ea
  JOIN public.exams e ON ea.exam_id = e.id
  WHERE ea.id = p_attempt_id;

  -- Pause OFF: Calculate from deadline
  IF attempt_record.exam_deadline IS NOT NULL THEN
    remaining_seconds := EXTRACT(EPOCH FROM (attempt_record.exam_deadline - NOW()))::INTEGER;
    RETURN GREATEST(0, remaining_seconds);
  END IF;
  
  -- Pause ON: Calculate from elapsed time
  exam_duration_seconds := attempt_record.duration_minutes * 60;
  
  IF attempt_record.is_paused THEN
    -- Paused: Use saved elapsed time
    current_elapsed := attempt_record.elapsed_time_seconds;
  ELSE
    -- Active: Add current session time
    current_elapsed := attempt_record.elapsed_time_seconds + 
      EXTRACT(EPOCH FROM (NOW() - attempt_record.last_activity_at))::INTEGER;
  END IF;
  
  RETURN GREATEST(0, exam_duration_seconds - current_elapsed);
END;
$$;

-- ============================================================
-- STEP 5: Create indexes for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_exam_attempts_deadline 
ON public.exam_attempts (exam_deadline) 
WHERE exam_deadline IS NOT NULL AND status = 'in_progress';

CREATE INDEX IF NOT EXISTS idx_exam_attempts_paused 
ON public.exam_attempts (is_paused, status) 
WHERE is_paused = true AND status = 'in_progress';

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================

-- Check exams table
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'exams' 
  AND column_name = 'allow_pause';

-- Check exam_attempts table
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'exam_attempts' 
  AND column_name IN ('exam_deadline', 'elapsed_time_seconds', 'last_activity_at', 'is_paused')
ORDER BY column_name;

-- Check trigger exists
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'trigger_set_exam_timer';

-- Check function exists
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_name IN ('set_exam_timer', 'get_remaining_time_seconds')
  AND routine_schema = 'public';

-- ============================================================
-- EXAMPLE USAGE
-- ============================================================

-- Example 1: Create exam with pause OFF (Live Exam)
/*
INSERT INTO exams (
  admin_id, title, duration_minutes, total_marks, tenant_id, allow_pause
) VALUES (
  'admin-uuid', 'JEE Main Live Test', 180, 300, 'tenant-uuid', false
);

-- When student starts, exam_deadline will be set automatically
-- Timer runs continuously, even if tab closed
*/

-- Example 2: Create exam with pause ON (Practice)
/*
INSERT INTO exams (
  admin_id, title, duration_minutes, total_marks, tenant_id, allow_pause
) VALUES (
  'admin-uuid', 'Practice Test', 60, 100, 'tenant-uuid', true
);

-- When student starts, elapsed_time_seconds will be initialized
-- Timer only runs when user is active
*/

-- ============================================================
-- ROLLBACK (if needed)
-- ============================================================
/*
DROP TRIGGER IF EXISTS trigger_set_exam_timer ON public.exam_attempts;
DROP FUNCTION IF EXISTS public.set_exam_timer();
DROP FUNCTION IF EXISTS public.get_remaining_time_seconds(UUID);

ALTER TABLE public.exam_attempts 
DROP COLUMN IF EXISTS exam_deadline,
DROP COLUMN IF EXISTS elapsed_time_seconds,
DROP COLUMN IF EXISTS last_activity_at,
DROP COLUMN IF EXISTS is_paused;

ALTER TABLE public.exams 
DROP COLUMN IF EXISTS allow_pause;
*/
