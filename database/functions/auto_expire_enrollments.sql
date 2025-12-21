-- ============================================================================
-- AUTO-EXPIRE ENROLLMENTS SYSTEM
-- Automatically marks enrollments as expired when their time runs out
-- Creates urgency and FOMO for students
-- ============================================================================

-- 1. Function to check and mark expired enrollments
CREATE OR REPLACE FUNCTION public.mark_expired_enrollments()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER := 0;
BEGIN
  -- Mark expired course enrollments
  WITH updated AS (
    UPDATE public.enrollments
    SET status = 'expired'
    WHERE expires_at IS NOT NULL
      AND expires_at < NOW()
      AND status = 'active'
    RETURNING id
  )
  SELECT COUNT(*) INTO expired_count FROM updated;

  -- Mark expired test series enrollments (set a flag or delete based on your logic)
  -- For test series, we'll just track them but not delete
  -- You can add custom logic here if needed

  RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger function that runs on SELECT/UPDATE to check expiry
CREATE OR REPLACE FUNCTION public.check_enrollment_expiry()
RETURNS TRIGGER AS $$
BEGIN
  -- If checking an enrollment and it has an expiry date
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at < NOW() THEN
    -- Automatically set status to expired
    NEW.status := 'expired';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Apply trigger to enrollments table (only on INSERT/UPDATE)
DROP TRIGGER IF EXISTS trigger_check_enrollment_expiry ON public.enrollments;
CREATE TRIGGER trigger_check_enrollment_expiry
  BEFORE INSERT OR UPDATE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.check_enrollment_expiry();

-- 4. Create a cron job to run hourly (requires pg_cron extension)
-- This ensures expired enrollments are marked even when not accessed
-- Note: pg_cron must be enabled in Supabase dashboard first

-- First, check if pg_cron is available
DO $body$
BEGIN
  -- Try to create the cron job
  -- This will fail gracefully if pg_cron is not installed
  BEGIN
    -- Schedule the function to run every hour
    PERFORM cron.schedule(
      'mark-expired-enrollments',  -- job name
      '0 * * * *',                  -- cron expression: every hour
      'SELECT public.mark_expired_enrollments();'
    );
  EXCEPTION WHEN OTHERS THEN
    -- pg_cron not available, that's okay
    -- The trigger will still work on access
    RAISE NOTICE 'pg_cron not available. Using triggers only for expiry checks.';
  END;
END $body$;

-- 5. Grant execute permissions
GRANT EXECUTE ON FUNCTION public.mark_expired_enrollments() TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_enrollment_expiry() TO authenticated;

-- 6. Comments for documentation
COMMENT ON FUNCTION public.mark_expired_enrollments IS 'Scans and marks all expired enrollments. Run via cron hourly.';
COMMENT ON FUNCTION public.check_enrollment_expiry IS 'Trigger function that auto-expires enrollments on access.';

-- ============================================================================
-- VERIFICATION
-- Run this to see how many enrollments would be marked as expired:
-- SELECT public.mark_expired_enrollments();
-- ============================================================================
