-- Check if responses table has tenant_id column
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'responses'
ORDER BY ordinal_position;

-- Check if tenant_id exists
SELECT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'responses' 
    AND column_name = 'tenant_id'
) as has_tenant_id;
