-- ==========================================
-- SAFELY DROP LEGACY TEST_SERIES TABLES
-- ==========================================
-- This script removes the old test_series tables that are no longer used
-- since everything is now unified under the courses table with course_type

-- IMPORTANT: This will delete all data in these tables!
-- Make sure you have backed up any important data before running this.

-- Step 1: Check what tables exist
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%test_series%'
ORDER BY tablename;

-- Step 2: Check for any foreign key dependencies
SELECT
    tc.table_name as referencing_table,
    kcu.column_name as referencing_column,
    ccu.table_name AS referenced_table,
    ccu.column_name AS referenced_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
AND (ccu.table_name LIKE '%test_series%' OR tc.table_name LIKE '%test_series%')
ORDER BY tc.table_name;

-- Step 3: Drop dependent tables first (in correct order to avoid FK errors)

-- Drop test_series_exams (references test_series)
DROP TABLE IF EXISTS public.test_series_exams CASCADE;

-- Drop test_series_enrollments (references test_series)
DROP TABLE IF EXISTS public.test_series_enrollments CASCADE;

-- Drop the main test_series table
DROP TABLE IF EXISTS public.test_series CASCADE;

-- Step 4: Drop any related functions/RPC that use these tables
DROP FUNCTION IF EXISTS public.get_student_test_series_progress(uuid) CASCADE;

-- Step 5: Verify deletion
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%test_series%'
ORDER BY tablename;

-- Should return no rows if successful

-- Step 6: Clean up any orphaned foreign key references in other tables
-- Check if payments table has a series_id column referencing test_series
DO $$
BEGIN
    -- Drop the foreign key constraint if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'payments_series_id_fkey'
    ) THEN
        ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_series_id_fkey;
        RAISE NOTICE 'Dropped payments_series_id_fkey constraint';
    END IF;
    
    -- Optionally drop the series_id column from payments if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' 
        AND column_name = 'series_id'
    ) THEN
        ALTER TABLE public.payments DROP COLUMN IF EXISTS series_id;
        RAISE NOTICE 'Dropped series_id column from payments table';
    END IF;
END $$;

-- Step 7: Final verification
SELECT 
    'Tables dropped successfully' as status,
    COUNT(*) as remaining_test_series_tables
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%test_series%';
