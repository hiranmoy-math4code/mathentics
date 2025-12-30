-- ============================================================================
-- SIMPLE DIAGNOSTIC: Find what's causing 'channels' error
-- ============================================================================

-- 1. Check which tables exist
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE '%channel%'
ORDER BY table_name;

-- 2. List all triggers on courses table
SELECT 
    trigger_name,
    event_object_table,
    action_timing,
    event_manipulation
FROM information_schema.triggers
WHERE event_object_table = 'courses'
AND trigger_schema = 'public'
ORDER BY trigger_name;

-- 3. List all functions with 'channel' in name
SELECT 
    routine_name,
    routine_type,
    routine_schema
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name LIKE '%channel%'
ORDER BY routine_name;

-- 4. Show the actual function definition for create_default_community_channels
SELECT pg_get_functiondef(oid) as function_code
FROM pg_proc
WHERE proname = 'create_default_community_channels';
