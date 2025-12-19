-- ============================================================================
-- FIX: ADD UNIQUE CONSTRAINT TO LESSON_PROGRESS TABLE
-- ============================================================================
-- This fixes the "no unique or exclusion constraint matching the ON CONFLICT" error
-- for lesson progress tracking (mark as complete functionality)
-- ============================================================================

-- STEP 1: Check if constraint already exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'lesson_progress_user_lesson_unique'
    ) THEN
        RAISE NOTICE 'Constraint already exists, dropping it first...';
        ALTER TABLE public.lesson_progress DROP CONSTRAINT lesson_progress_user_lesson_unique;
    END IF;
END $$;

-- STEP 2: Remove any duplicate lesson progress (keep the most recent one)
DELETE FROM public.lesson_progress a
USING public.lesson_progress b
WHERE a.id < b.id 
  AND a.user_id = b.user_id 
  AND a.lesson_id = b.lesson_id;

-- STEP 3: Add the unique constraint
ALTER TABLE public.lesson_progress 
ADD CONSTRAINT lesson_progress_user_lesson_unique 
UNIQUE (user_id, lesson_id);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Run this to verify the constraint was created:
SELECT conname, contype, pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.lesson_progress'::regclass;
-- 
-- You should see 'lesson_progress_user_lesson_unique' with contype = 'u'
-- ============================================================================
