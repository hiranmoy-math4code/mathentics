-- FIX: Tenant Detection for Unauthenticated Users
-- Problem: Logged-out users can't see courses because auth.uid() is NULL
-- Solution: Add domain-based tenant detection as fallback

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
    request_domain text;
BEGIN
    -- STEP 1: Try to get tenant from user's membership (for logged-in users)
    IF target_user_id IS NOT NULL OR auth.uid() IS NOT NULL THEN
        SELECT tenant_id INTO current_tenant_id
        FROM public.user_tenant_memberships
        WHERE user_id = COALESCE(target_user_id, auth.uid())
        AND is_active = true
        LIMIT 1;
    END IF;

    -- STEP 2: If no tenant found, try to get from request domain (for logged-out users)
    IF current_tenant_id IS NULL THEN
        -- Get domain from request headers
        BEGIN
            request_domain := current_setting('request.headers', true)::json->>'host';
        EXCEPTION WHEN OTHERS THEN
            request_domain := NULL;
        END;
        
        -- Lookup tenant by custom_domain
        IF request_domain IS NOT NULL THEN
            SELECT id INTO current_tenant_id
            FROM public.tenants
            WHERE custom_domain = request_domain
            AND is_active = true
            LIMIT 1;
        END IF;
    END IF;

    -- STEP 3: If still no tenant, use default tenant (fallback)
    IF current_tenant_id IS NULL THEN
        SELECT id INTO current_tenant_id
        FROM public.tenants
        WHERE slug = 'math4code'  -- Default tenant
        AND is_active = true
        LIMIT 1;
    END IF;

    -- If no tenant found at all, return empty
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
    AND c.tenant_id = current_tenant_id  -- ✅ TENANT FILTERING!
    ORDER BY c.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$function$;
