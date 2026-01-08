-- ============================================================================
-- FIX: Admin Dashboard Tenant Isolation (SIMPLIFIED)
-- ============================================================================
-- Since you use NEXT_PUBLIC_TENANT_ID from .env, we can pass it directly
-- No need to query user_tenant_memberships table
-- ============================================================================

-- Drop old function
DROP FUNCTION IF EXISTS public.get_admin_dashboard_stats(uuid);

-- Create new function with tenant_id as parameter
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats(
    admin_uuid uuid,
    p_tenant_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_exams_count INT;
    v_questions_count INT;
    v_attempts_count INT;
    v_unique_students INT;
    v_tenant_id UUID;
    v_result jsonb;
BEGIN
    -- Use provided tenant_id or fallback to lookup
    IF p_tenant_id IS NOT NULL THEN
        v_tenant_id := p_tenant_id;
    ELSE
        -- Fallback: Get from user_tenant_memberships
        SELECT tenant_id INTO v_tenant_id
        FROM public.user_tenant_memberships
        WHERE user_id = admin_uuid
        LIMIT 1;
    END IF;
    
    -- If no tenant found, return zeros
    IF v_tenant_id IS NULL THEN
        RETURN json_build_object(
            'examsCount', 0,
            'questionsCount', 0,
            'attemptsCount', 0,
            'uniqueStudents', 0
        );
    END IF;
    
    -- Count exams (filtered by tenant_id)
    SELECT COUNT(*) INTO v_exams_count
    FROM public.exams 
    WHERE tenant_id = v_tenant_id;
    
    -- Count questions (filtered by tenant_id)
    SELECT COUNT(q.id) INTO v_questions_count
    FROM public.questions q
    JOIN public.sections s ON q.section_id = s.id
    JOIN public.exams e ON s.exam_id = e.id
    WHERE e.tenant_id = v_tenant_id;
    
    -- Count attempts (filtered by tenant_id)
    SELECT COUNT(ea.id) INTO v_attempts_count
    FROM public.exam_attempts ea
    JOIN public.exams e ON ea.exam_id = e.id
    WHERE e.tenant_id = v_tenant_id;
    
    -- Count unique students (filtered by tenant_id)
    SELECT COUNT(DISTINCT ea.student_id) INTO v_unique_students
    FROM public.exam_attempts ea
    JOIN public.exams e ON ea.exam_id = e.id
    WHERE e.tenant_id = v_tenant_id;
    
    -- Build result
    v_result := json_build_object(
        'examsCount', COALESCE(v_exams_count, 0),
        'questionsCount', COALESCE(v_questions_count, 0),
        'attemptsCount', COALESCE(v_attempts_count, 0),
        'uniqueStudents', COALESCE(v_unique_students, 0)
    );
    
    RETURN v_result;
END;
$$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Test as admin from Tenant A
-- SELECT * FROM get_admin_dashboard_stats('admin-uuid');
-- Should only return Tenant A's data

-- ============================================================================
-- ROLLBACK (if needed)
-- ============================================================================
-- DROP FUNCTION IF EXISTS public.get_admin_dashboard_stats(uuid);
-- Then restore old function from backup
