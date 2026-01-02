-- ============================================================
-- PAUSE/RESUME FEATURE - Database Migration
-- ============================================================
-- Adds elapsed time tracking for pause/resume functionality
-- ============================================================

-- Add columns to exam_sessions table for pause tracking
ALTER TABLE exam_sessions 
ADD COLUMN IF NOT EXISTS elapsed_time_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS is_paused BOOLEAN DEFAULT false;

-- Add comments
COMMENT ON COLUMN exam_sessions.elapsed_time_seconds IS 'Total active time spent in exam (excludes paused time)';
COMMENT ON COLUMN exam_sessions.last_activity_at IS 'Last time user was active in exam (for calculating current session time)';
COMMENT ON COLUMN exam_sessions.is_paused IS 'Whether exam is currently paused';

-- Create index for finding paused sessions
CREATE INDEX IF NOT EXISTS idx_exam_sessions_paused 
ON exam_sessions (is_paused, status) 
WHERE is_paused = true AND status = 'in_progress';

-- ============================================================
-- TRIGGER: Auto-update elapsed time when pausing
-- ============================================================
CREATE OR REPLACE FUNCTION update_elapsed_time_on_pause()
RETURNS TRIGGER AS $$
BEGIN
  -- When user pauses, calculate and save elapsed time
  IF NEW.is_paused = true AND (OLD.is_paused = false OR OLD.is_paused IS NULL) THEN
    NEW.elapsed_time_seconds := COALESCE(OLD.elapsed_time_seconds, 0) + 
      EXTRACT(EPOCH FROM (NOW() - COALESCE(OLD.last_activity_at, OLD.started_at)))::INTEGER;
    NEW.last_activity_at := NOW();
  END IF;
  
  -- When user resumes, reset last_activity_at
  IF NEW.is_paused = false AND OLD.is_paused = true THEN
    NEW.last_activity_at := NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_elapsed_time
BEFORE UPDATE ON exam_sessions
FOR EACH ROW
EXECUTE FUNCTION update_elapsed_time_on_pause();

-- ============================================================
-- FUNCTION: Get remaining time for a session
-- ============================================================
CREATE OR REPLACE FUNCTION get_remaining_time_seconds(session_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  session_record RECORD;
  exam_duration_seconds INTEGER;
  current_elapsed INTEGER;
BEGIN
  SELECT 
    es.elapsed_time_seconds,
    es.last_activity_at,
    es.is_paused,
    e.duration_minutes
  INTO session_record
  FROM exam_sessions es
  JOIN exams e ON es.exam_id = e.id
  WHERE es.id = session_id;

  exam_duration_seconds := session_record.duration_minutes * 60;
  
  -- If paused, use saved elapsed time
  IF session_record.is_paused THEN
    current_elapsed := session_record.elapsed_time_seconds;
  ELSE
    -- If active, add current session time
    current_elapsed := session_record.elapsed_time_seconds + 
      EXTRACT(EPOCH FROM (NOW() - session_record.last_activity_at))::INTEGER;
  END IF;
  
  RETURN GREATEST(0, exam_duration_seconds - current_elapsed);
END;
$$;

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'exam_sessions' 
  AND column_name IN ('elapsed_time_seconds', 'last_activity_at', 'is_paused')
ORDER BY column_name;
