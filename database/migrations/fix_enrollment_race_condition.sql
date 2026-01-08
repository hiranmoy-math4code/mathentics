-- ============================================================================
-- SAFE PRODUCTION FIX #1: Payment Enrollment Race Condition
-- ============================================================================
-- This migration is SAFE to run on live database
-- It only adds a UNIQUE constraint to prevent duplicate enrollments
-- Existing data will NOT be affected
-- ============================================================================

-- Step 1: Check for existing duplicates (informational only)
DO $$
DECLARE
    duplicate_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO duplicate_count
    FROM (
        SELECT user_id, course_id, COUNT(*) as cnt
        FROM enrollments
        WHERE status = 'active'
        GROUP BY user_id, course_id
        HAVING COUNT(*) > 1
    ) duplicates;
    
    IF duplicate_count > 0 THEN
        RAISE NOTICE 'Found % duplicate enrollments. These will be handled before adding constraint.', duplicate_count;
    ELSE
        RAISE NOTICE 'No duplicate enrollments found. Safe to add constraint.';
    END IF;
END $$;

-- Step 2: Fix existing duplicates (keep oldest, deactivate newer ones)
UPDATE enrollments e1
SET status = 'completed',
    updated_at = NOW()
WHERE status = 'active'
  AND EXISTS (
      SELECT 1 
      FROM enrollments e2 
      WHERE e2.user_id = e1.user_id 
        AND e2.course_id = e1.course_id
        AND e2.status = 'active'
        AND e2.enrolled_at < e1.enrolled_at  -- Keep the older one
  );

-- Step 3: Add UNIQUE constraint (safe - will prevent future duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_unique_active 
  ON enrollments(user_id, course_id) 
  WHERE status = 'active';

-- Step 4: Verify constraint was added
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM pg_indexes 
        WHERE indexname = 'idx_enrollments_unique_active'
    ) THEN
        RAISE NOTICE '✅ UNIQUE constraint added successfully!';
    ELSE
        RAISE WARNING '❌ Failed to add UNIQUE constraint!';
    END IF;
END $$;

-- ============================================================================
-- ROLLBACK (if needed - run this to undo)
-- ============================================================================
-- DROP INDEX IF EXISTS idx_enrollments_unique_active;
