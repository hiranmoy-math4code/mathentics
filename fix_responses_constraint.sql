    -- ============================================================================
    -- FIX: ADD UNIQUE CONSTRAINT TO RESPONSES TABLE (WITH DUPLICATE CLEANUP)
    -- ============================================================================
    -- This fixes the "no unique or exclusion constraint matching the ON CONFLICT" error
    -- Execute this in Supabase SQL Editor to fix exam autosave functionality
    -- ============================================================================

    -- STEP 1: Check if constraint already exists
    DO $$ 
    BEGIN
        IF EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'responses_attempt_question_unique'
        ) THEN
            RAISE NOTICE 'Constraint already exists, dropping it first...';
            ALTER TABLE public.responses DROP CONSTRAINT responses_attempt_question_unique;
        END IF;
    END $$;

    -- STEP 2: Remove any duplicate responses (keep the most recent one)
    DELETE FROM public.responses a
    USING public.responses b
    WHERE a.id < b.id 
    AND a.attempt_id = b.attempt_id 
    AND a.question_id = b.question_id;

    -- STEP 3: Add the unique constraint
    ALTER TABLE public.responses 
    ADD CONSTRAINT responses_attempt_question_unique 
    UNIQUE (attempt_id, question_id);

    -- ============================================================================
    -- VERIFICATION QUERY
    -- ============================================================================
    -- Run this to verify the constraint was created:
    -- SELECT conname, contype 
    -- FROM pg_constraint 
    -- WHERE conrelid = 'public.responses'::regclass;
    -- 
    -- You should see 'responses_attempt_question_unique' with contype = 'u' (unique)
    -- ============================================================================
