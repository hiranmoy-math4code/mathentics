-- ==========================================
-- CHECK DAILY MISSIONS TABLE STRUCTURE
-- ==========================================

-- Get complete table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'daily_missions'
ORDER BY ordinal_position;

-- Get all constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'public.daily_missions'::regclass;

-- Show the CREATE TABLE statement
SELECT 
    'CREATE TABLE ' || schemaname || '.' || tablename || ' (' ||
    string_agg(column_name || ' ' || data_type, ', ') || ');' as create_statement
FROM (
    SELECT 
        schemaname,
        tablename,
        column_name,
        data_type
    FROM pg_catalog.pg_tables t
    JOIN information_schema.columns c 
        ON t.tablename = c.table_name 
        AND t.schemaname = c.table_schema
    WHERE schemaname = 'public' 
    AND tablename = 'daily_missions'
) sub
GROUP BY schemaname, tablename;
