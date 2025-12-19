-- ============================================================================
-- STEP 1: VERIFY IF CONSTRAINT EXISTS
-- ============================================================================
-- Run this first to check if the constraint exists
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'public.responses'::regclass 
  AND conname = 'responses_attempt_question_unique';

-- If the above returns NO ROWS, the constraint doesn't exist
-- If it returns a row, the constraint exists

-- ============================================================================
-- STEP 2: CHECK FOR DUPLICATE DATA
-- ============================================================================
-- Run this to see if you have duplicate responses
SELECT attempt_id, question_id, COUNT(*) as duplicate_count
FROM public.responses
GROUP BY attempt_id, question_id
HAVING COUNT(*) > 1;

-- If this returns rows, you have duplicates that must be cleaned first

-- ============================================================================
-- STEP 3: ADD THE CONSTRAINT (Run only if Step 1 shows NO constraint)
-- ============================================================================
-- First, remove duplicates (keeps the most recent one)
DELETE FROM public.responses a
USING public.responses b
WHERE a.id < b.id 
  AND a.attempt_id = b.attempt_id 
  AND a.question_id = b.question_id;

-- Then add the constraint
ALTER TABLE public.responses 
ADD CONSTRAINT responses_attempt_question_unique 
UNIQUE (attempt_id, question_id);

-- ============================================================================
-- STEP 4: FINAL VERIFICATION
-- ============================================================================
-- Run this to confirm the constraint was added
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'public.responses'::regclass;

-- You should see 'responses_attempt_question_unique' with contype = 'u'
