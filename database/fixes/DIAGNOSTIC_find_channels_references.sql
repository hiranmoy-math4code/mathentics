-- ============================================================================
-- DIAGNOSTIC: Find ALL database objects referencing 'channels' table
-- ============================================================================

-- 1. Find all functions that reference 'channels'
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    pg_get_functiondef(p.oid) as function_definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE pg_get_functiondef(p.oid) LIKE '%channels%'
AND n.nspname = 'public'
ORDER BY p.proname;

-- 2. Find all triggers
SELECT 
    trigger_name,
    event_object_table,
    action_statement,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY trigger_name;

-- 3. Find all views that might reference 'channels'
SELECT 
    table_name,
    view_definition
FROM information_schema.views
WHERE table_schema = 'public'
AND view_definition LIKE '%channels%';

-- 4. Check if 'channels' table exists (should NOT exist)
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('channels', 'community_channels');

-- 5. List all functions with 'channel' in name
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%channel%';
