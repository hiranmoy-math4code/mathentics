-- ============================================================================
-- CREATE get_course_learners FUNCTION
-- Returns all students enrolled in a specific course with their details
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_course_learners(p_course_id uuid)
RETURNS TABLE (
  student_id uuid,
  email text,
  full_name text,
  avatar_url text,
  enrolled_at timestamp with time zone,
  status text,
  progress integer,
  progress_percentage numeric,
  last_accessed_at timestamp with time zone,
  expires_at timestamp with time zone,
  grant_type text,
  granted_by uuid,
  granted_by_name text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as student_id,
    p.email,
    p.full_name,
    p.avatar_url,
    e.enrolled_at,
    e.status,
    e.progress,
    e.progress_percentage,
    e.last_accessed_at,
    e.expires_at,
    e.grant_type,
    e.granted_by,
    admin.full_name as granted_by_name
  FROM public.enrollments e
  JOIN public.profiles p ON e.user_id = p.id
  LEFT JOIN public.profiles admin ON e.granted_by = admin.id
  WHERE e.course_id = p_course_id
  ORDER BY e.enrolled_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_course_learners(uuid) TO authenticated;

COMMENT ON FUNCTION public.get_course_learners IS 'Returns all students enrolled in a specific course with enrollment details and expiry information';
