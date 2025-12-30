-- ============================================
-- Auto-Delete Expired Responses (30+ days old)
-- ============================================
-- 1. Function to check if responses are expired for an attempt
CREATE OR REPLACE FUNCTION is_response_expired(attempt_submitted_at TIMESTAMPTZ)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN attempt_submitted_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql IMMUTABLE;
-- 2. Function to get days until expiry
CREATE OR REPLACE FUNCTION days_until_expiry(attempt_submitted_at TIMESTAMPTZ)
RETURNS INTEGER AS $$
DECLARE
  days_diff INTEGER;
BEGIN
  days_diff := EXTRACT(DAY FROM (NOW() - attempt_submitted_at));
  RETURN GREATEST(0, 30 - days_diff);
END;
$$ LANGUAGE plpgsql IMMUTABLE;
-- 3. Main cleanup function - deletes expired responses
CREATE OR REPLACE FUNCTION cleanup_expired_responses()
RETURNS TABLE(deleted_count INTEGER) AS $$
DECLARE
  count INTEGER;
BEGIN
  -- Delete responses for attempts older than 30 days
  WITH deleted AS (
    DELETE FROM responses
    WHERE attempt_id IN (
      SELECT id FROM exam_attempts
      WHERE submitted_at < NOW() - INTERVAL '30 days'
    )
    RETURNING *
  )
  SELECT COUNT(*)::INTEGER INTO count FROM deleted;
  
  RETURN QUERY SELECT count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 4. Function to cleanup responses for a specific attempt (called from client)
CREATE OR REPLACE FUNCTION cleanup_attempt_responses(p_attempt_id UUID)
RETURNS TABLE(deleted BOOLEAN, days_old INTEGER) AS $$
DECLARE
  attempt_date TIMESTAMPTZ;
  days_diff INTEGER;
  del_count INTEGER;
BEGIN
  -- Get attempt submission date
  SELECT submitted_at INTO attempt_date
  FROM exam_attempts
  WHERE id = p_attempt_id;
  
  IF attempt_date IS NULL THEN
    RETURN QUERY SELECT FALSE, 0;
    RETURN;
  END IF;
  
  -- Calculate days since submission
  days_diff := EXTRACT(DAY FROM (NOW() - attempt_date))::INTEGER;
  
  -- If older than 30 days, delete responses
  IF days_diff >= 30 THEN
    DELETE FROM responses WHERE attempt_id = p_attempt_id;
    GET DIAGNOSTICS del_count = ROW_COUNT;
    RETURN QUERY SELECT TRUE, days_diff;
  ELSE
    RETURN QUERY SELECT FALSE, days_diff;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 5. Grant execute permissions
GRANT EXECUTE ON FUNCTION is_response_expired(TIMESTAMPTZ) TO authenticated;
GRANT EXECUTE ON FUNCTION days_until_expiry(TIMESTAMPTZ) TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_expired_responses() TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_attempt_responses(UUID) TO authenticated;
-- ============================================
-- USAGE EXAMPLES
-- ============================================
-- Check if an attempt's responses are expired:
-- SELECT is_response_expired(submitted_at) FROM exam_attempts WHERE id = 'attempt-id';
-- Get days until expiry:
-- SELECT days_until_expiry(submitted_at) FROM exam_attempts WHERE id = 'attempt-id';
-- Cleanup all expired responses (run periodically or on-demand):
-- SELECT * FROM cleanup_expired_responses();
-- Cleanup specific attempt (called from client when viewing results):
-- SELECT * FROM cleanup_attempt_responses('attempt-id');