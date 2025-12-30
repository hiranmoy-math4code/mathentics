-- Check sections table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'sections'
ORDER BY ordinal_position;

-- Check if tenant_id column exists in sections
SELECT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'sections' 
    AND column_name = 'tenant_id'
) as has_tenant_id;
