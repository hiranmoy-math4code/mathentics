-- Check what constraints actually exist on the responses table
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.responses'::regclass
ORDER BY conname;

-- This will show you ALL constraints including:
-- - Primary keys (p)
-- - Foreign keys (f)  
-- - Unique constraints (u)
-- - Check constraints (c)
