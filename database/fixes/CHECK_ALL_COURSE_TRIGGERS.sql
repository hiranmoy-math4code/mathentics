-- ============================================================================
-- CHECK: All triggers and their functions
-- ============================================================================

-- 1. Show ALL triggers on courses table
SELECT 
    t.trigger_name,
    t.event_manipulation,
    t.action_timing,
    p.proname as function_name
FROM information_schema.triggers t
LEFT JOIN pg_trigger pg_t ON pg_t.tgname = t.trigger_name
LEFT JOIN pg_proc p ON p.oid = pg_t.tgfoid
WHERE t.event_object_table = 'courses'
AND t.trigger_schema = 'public'
ORDER BY t.trigger_name;

-- 2. Get definition of ALL functions called by triggers
SELECT 
    p.proname as function_name,
    pg_get_functiondef(p.oid) as definition
FROM pg_proc p
WHERE p.proname IN (
    SELECT DISTINCT p2.proname
    FROM information_schema.triggers t
    LEFT JOIN pg_trigger pg_t ON pg_t.tgname = t.trigger_name
    LEFT JOIN pg_proc p2 ON p2.oid = pg_t.tgfoid
    WHERE t.event_object_table = 'courses'
    AND t.trigger_schema = 'public'
)
ORDER BY p.proname;
