-- Quick check to verify if migration has been applied
-- Run this in Supabase SQL Editor to check if columns exist

SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'exams' 
AND column_name IN ('prerequisite_exam_id', 'sequential_unlock_enabled')
ORDER BY column_name;

-- If you see 0 rows, the migration hasn't been run yet
-- If you see 2 rows, the migration is applied

-- Also check if any exams have sequential unlock enabled:
SELECT 
    id,
    title,
    prerequisite_exam_id,
    sequential_unlock_enabled
FROM exams
WHERE sequential_unlock_enabled = true;
