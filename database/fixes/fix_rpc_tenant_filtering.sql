-- FIX: Add Tenant Filtering to get_published_courses_with_meta RPC
-- CRITICAL: This function is used by public /courses and /test-series pages
-- Problem: Currently shows ALL tenants' courses to everyone
-- Solution: Filter by user's active tenant membership

CREATE OR REPLACE FUNCTION public.get_published_courses_with_meta(
    target_user_id uuid, 
    p_limit integer DEFAULT 50, 
    p_offset integer DEFAULT 0
)
RETURNS TABLE(
    id uuid, 
    title text, 
    description text, 
    thumbnail_url text, 
    price numeric, 
    course_type text, 
    is_published boolean, 
    created_at timestamp with time zone, 
    instructor_name text, 
    total_lessons bigint, 
    is_enrolled boolean
)
LANGUAGE plpgsql
STABLE
AS $function$
DECLARE
    current_tenant_id uuid;
BEGIN
    -- Get current user's active tenant
    -- If target_user_id is NULL (unauthenticated), use auth.uid()
    -- If both are NULL, get tenant from domain (future enhancement)
    SELECT tenant_id INTO current_tenant_id
    FROM public.user_tenant_memberships
    WHERE user_id = COALESCE(target_user_id, auth.uid())
    AND is_active = true
    LIMIT 1;

    -- If no tenant found, return empty (security: don't show any courses)
    IF current_tenant_id IS NULL THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT 
        c.id,
        c.title,
        c.description,
        c.thumbnail_url,
        c.price,
        c.course_type,
        c.is_published,
        c.created_at,
        COALESCE(p.full_name, 'Admin')::text as instructor_name,
        (
            SELECT COUNT(l.id)
            FROM public.modules m
            JOIN public.lessons l ON m.id = l.module_id
            WHERE m.course_id = c.id
        ) as total_lessons,
        CASE 
            WHEN target_user_id IS NULL THEN false
            ELSE EXISTS (
                SELECT 1 FROM public.enrollments e 
                WHERE e.course_id = c.id 
                AND e.user_id = target_user_id 
                AND e.status = 'active'
            )
        END as is_enrolled
    FROM public.courses c
    LEFT JOIN public.profiles p ON c.creator_id = p.id
    WHERE c.is_published = true
    AND c.tenant_id = current_tenant_id  -- ✅ TENANT FILTERING ADDED!
    ORDER BY c.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$function$;

-- Verify function updated
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'get_published_courses_with_meta';
