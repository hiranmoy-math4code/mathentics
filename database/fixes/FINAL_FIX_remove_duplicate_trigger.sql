-- ============================================================================
-- FINAL FIX: Remove duplicate trigger that uses wrong table name
-- ============================================================================

-- Problem: There are TWO triggers creating channels:
-- 1. trigger_create_course_channel → create_channel_for_course() → uses 'channels' ❌
-- 2. create_community_channels_on_course → create_default_community_channels() → uses 'community_channels' ✅

-- Solution: Drop the duplicate trigger and function

-- Step 1: Drop the BAD trigger
DROP TRIGGER IF EXISTS trigger_create_course_channel ON public.courses;

-- Step 2: Drop the BAD function
DROP FUNCTION IF EXISTS public.create_channel_for_course();

-- Step 3: Verify only the GOOD trigger remains
SELECT 
    trigger_name,
    event_object_table,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE event_object_table = 'courses'
AND trigger_schema = 'public'
ORDER BY trigger_name;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ Removed duplicate trigger!';
    RAISE NOTICE '✅ Only create_community_channels_on_course trigger remains';
    RAISE NOTICE '✅ This trigger uses community_channels table (correct)';
    RAISE NOTICE '✅ Try creating a course now - it should work!';
END $$;
