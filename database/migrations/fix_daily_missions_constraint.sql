-- ==========================================
-- FIX DAILY MISSIONS UNIQUE CONSTRAINT
-- ==========================================
-- This migration adds the missing UNIQUE constraint on (user_id, date)
-- which is required for the ON CONFLICT clause in the RPC function

-- Step 1: Add the UNIQUE constraint if it doesn't exist
DO $$ 
BEGIN
    -- Check if constraint already exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'daily_missions_user_id_date_key'
    ) THEN
        -- Add the unique constraint
        ALTER TABLE public.daily_missions 
        ADD CONSTRAINT daily_missions_user_id_date_key 
        UNIQUE (user_id, date);
        
        RAISE NOTICE 'Added UNIQUE constraint on (user_id, date)';
    ELSE
        RAISE NOTICE 'UNIQUE constraint already exists';
    END IF;
END $$;

-- Step 2: Verify the constraint was added
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'public.daily_missions'::regclass
AND contype = 'u';
