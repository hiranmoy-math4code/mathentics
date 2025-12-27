-- ============================================================================
-- CLEANUP SCRIPT - DROP UNNECESSARY FUNCTIONS
-- ============================================================================
-- This script drops functions that are no longer needed after trigger optimization
-- Run this AFTER verifying the new trigger system works correctly
-- ============================================================================

-- ============================================================================
-- STEP 1: IDENTIFY FUNCTIONS TO DROP
-- ============================================================================

-- List all functions to review
SELECT 
    proname as function_name,
    pg_get_functiondef(oid) as definition
FROM pg_proc 
WHERE pronamespace = 'public'::regnamespace
AND proname IN (
    'get_student_courses_progress',  -- Can be dropped after migration
    'handle_reward_transaction_process',  -- Duplicate, already dropped
    'update_user_streak'  -- Duplicate, already dropped
);

-- ============================================================================
-- STEP 2: DROP DUPLICATE/UNNECESSARY FUNCTIONS
-- ============================================================================

-- Drop duplicate reward functions (if they still exist)
DROP FUNCTION IF EXISTS public.handle_reward_transaction_process() CASCADE;
DROP FUNCTION IF EXISTS public.update_user_streak() CASCADE;

-- ============================================================================
-- STEP 3: DEPRECATE get_student_courses_progress (OPTIONAL)
-- ============================================================================
-- We keep this function for backward compatibility initially
-- After confirming everything works, you can drop it

-- Option A: Keep for backward compatibility (RECOMMENDED for now)
-- DO NOTHING - keep the function

-- Option B: Drop it completely (only after thorough testing!)
-- Uncomment the following line ONLY after verifying new system works:
-- DROP FUNCTION IF EXISTS public.get_student_courses_progress(uuid) CASCADE;

-- Option C: Replace with a lightweight version that just reads from enrollments
CREATE OR REPLACE FUNCTION public.get_student_courses_progress(target_user_id uuid)
RETURNS TABLE(
    id uuid, 
    title text, 
    description text, 
    thumbnail_url text, 
    course_type text, 
    progress_percentage numeric, 
    last_accessed_at timestamp with time zone, 
    total_lessons bigint, 
    completed_lessons bigint
) 
LANGUAGE plpgsql
AS $function$
BEGIN
    -- ✅ NEW LIGHTWEIGHT VERSION: Just read from enrollments
    -- Progress is already calculated by trigger!
    RETURN QUERY
    SELECT 
        c.id,
        c.title,
        c.description,
        c.thumbnail_url,
        c.course_type,
        e.progress_percentage,  -- ✅ Already updated by trigger!
        e.last_accessed_at,
        (
            SELECT COUNT(l.id)
            FROM modules m
            JOIN lessons l ON m.id = l.module_id
            WHERE m.course_id = c.id
        ) as total_lessons,
        (
            SELECT COUNT(*)
            FROM lesson_progress lp
            WHERE lp.user_id = target_user_id 
            AND lp.course_id = c.id 
            AND lp.completed = true
        ) as completed_lessons
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = target_user_id
    AND e.status IN ('active', 'completed')
    ORDER BY e.last_accessed_at DESC NULLS LAST;
END;
$function$;

-- ============================================================================
-- STEP 4: VERIFY CLEANUP
-- ============================================================================

-- Check remaining functions
SELECT 
    proname as function_name,
    pronargs as num_args,
    pg_get_function_identity_arguments(oid) as arguments
FROM pg_proc 
WHERE pronamespace = 'public'::regnamespace
AND proname LIKE '%progress%'
OR proname LIKE '%reward%'
ORDER BY proname;

-- ============================================================================
-- STEP 5: CHECK TRIGGER DEPENDENCIES
-- ============================================================================

-- Verify all triggers are working
SELECT 
    t.tgname as trigger_name,
    c.relname as table_name,
    p.proname as function_name,
    t.tgenabled as enabled
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE t.tgname NOT LIKE 'pg_%'
AND t.tgname NOT LIKE 'RI_%'
ORDER BY c.relname, t.tgname;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '✅ CLEANUP COMPLETE!';
    RAISE NOTICE '';
    RAISE NOTICE '📋 Summary:';
    RAISE NOTICE '  - Dropped duplicate reward functions';
    RAISE NOTICE '  - Kept get_student_courses_progress() for compatibility';
    RAISE NOTICE '  - Replaced with lightweight version (no manual updates)';
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  NEXT STEPS:';
    RAISE NOTICE '1. Test the new system thoroughly';
    RAISE NOTICE '2. Monitor for any errors';
    RAISE NOTICE '3. After 1-2 weeks, consider dropping get_student_courses_progress()';
    RAISE NOTICE '4. Update any remaining code that uses the old RPC function';
END $$;
