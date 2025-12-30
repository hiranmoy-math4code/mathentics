-- Check the exact policy definition
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'courses'
  AND policyname = 'Users can insert courses in their tenant'
ORDER BY policyname;

-- This will show the exact SQL of the policy
-- If with_check is NULL or wrong, that's the problem
