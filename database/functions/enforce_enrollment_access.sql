-- ============================================================================
-- ENROLLMENT ACCESS ENFORCEMENT
-- Helper functions to check if a student has valid (non-expired) access
-- Use these in your application logic to enforce the "Lock and Key" mechanism
-- ============================================================================

-- 1. Check if user has active course access
CREATE OR REPLACE FUNCTION public.has_active_course_access(
  p_user_id uuid,
  p_course_id uuid
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_access BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM public.enrollments
    WHERE user_id = p_user_id
      AND course_id = p_course_id
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > NOW())
  ) INTO v_has_access;
  
  RETURN v_has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Check if user has active test series access
CREATE OR REPLACE FUNCTION public.has_active_test_series_access(
  p_user_id uuid,
  p_test_series_id uuid
)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_access BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM public.test_series_enrollments
    WHERE student_id = p_user_id
      AND test_series_id = p_test_series_id
      AND (expires_at IS NULL OR expires_at > NOW())
  ) INTO v_has_access;
  
  RETURN v_has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Get enrollment status with expiry info (for UI display)
CREATE OR REPLACE FUNCTION public.get_enrollment_status(
  p_user_id uuid,
  p_course_id uuid
)
RETURNS TABLE (
  has_access BOOLEAN,
  status TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  days_remaining INTEGER,
  is_expiring_soon BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (e.status = 'active' AND (e.expires_at IS NULL OR e.expires_at > NOW())) as has_access,
    e.status,
    e.expires_at,
    CASE 
      WHEN e.expires_at IS NULL THEN NULL
      ELSE EXTRACT(DAY FROM (e.expires_at - NOW()))::INTEGER
    END as days_remaining,
    CASE
      WHEN e.expires_at IS NULL THEN FALSE
      WHEN e.expires_at <= NOW() THEN FALSE
      ELSE EXTRACT(DAY FROM (e.expires_at - NOW())) <= 7
    END as is_expiring_soon
  FROM public.enrollments e
  WHERE e.user_id = p_user_id
    AND e.course_id = p_course_id
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Enhanced view for expiring enrollments (includes urgency levels)
DROP VIEW IF EXISTS public.expiring_enrollments_with_urgency;
CREATE VIEW public.expiring_enrollments_with_urgency AS
SELECT 
  e.id,
  e.user_id,
  e.course_id,
  e.status,
  e.expires_at,
  c.title as course_title,
  p.full_name,
  p.email,
  EXTRACT(DAY FROM (e.expires_at - NOW()))::INTEGER as days_remaining,
  CASE
    WHEN EXTRACT(DAY FROM (e.expires_at - NOW())) <= 1 THEN 'CRITICAL'
    WHEN EXTRACT(DAY FROM (e.expires_at - NOW())) <= 3 THEN 'HIGH'
    WHEN EXTRACT(DAY FROM (e.expires_at - NOW())) <= 7 THEN 'MEDIUM'
    ELSE 'LOW'
  END as urgency_level
FROM public.enrollments e
JOIN public.courses c ON e.course_id = c.id
JOIN public.profiles p ON e.user_id = p.id
WHERE e.expires_at IS NOT NULL
  AND e.expires_at > NOW()
  AND e.status = 'active'
ORDER BY e.expires_at ASC;

-- 5. Grant permissions
GRANT EXECUTE ON FUNCTION public.has_active_course_access(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_active_test_series_access(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_enrollment_status(uuid, uuid) TO authenticated;
GRANT SELECT ON public.expiring_enrollments_with_urgency TO authenticated;

-- 6. Comments
COMMENT ON FUNCTION public.has_active_course_access IS 'Check if user has valid, non-expired course access';
COMMENT ON FUNCTION public.has_active_test_series_access IS 'Check if user has valid, non-expired test series access';
COMMENT ON FUNCTION public.get_enrollment_status IS 'Get detailed enrollment status with expiry information';
COMMENT ON VIEW public.expiring_enrollments_with_urgency IS 'Shows enrollments with urgency levels for FOMO notifications';
