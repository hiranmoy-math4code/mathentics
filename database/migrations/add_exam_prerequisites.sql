-- ============================================================================
-- MIGRATION: Add Exam Prerequisites and Sequential Unlock
-- ============================================================================
-- This migration adds support for:
-- 1. Prerequisite exams (must complete Exam A before starting Exam B)
-- 2. Sequential unlock toggle (enable/disable prerequisite enforcement)
-- 3. Exam scheduling (using existing start_time and end_time columns)
-- ============================================================================

-- Add prerequisite_exam_id column
ALTER TABLE public.exams 
ADD COLUMN IF NOT EXISTS prerequisite_exam_id uuid;

-- Add sequential_unlock_enabled column
ALTER TABLE public.exams 
ADD COLUMN IF NOT EXISTS sequential_unlock_enabled boolean DEFAULT false;

-- Add foreign key constraint for prerequisite_exam_id
-- This ensures the prerequisite exam exists and prevents circular dependencies
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'exams_prerequisite_exam_id_fkey'
        AND table_name = 'exams'
    ) THEN
        ALTER TABLE public.exams 
        ADD CONSTRAINT exams_prerequisite_exam_id_fkey 
        FOREIGN KEY (prerequisite_exam_id) 
        REFERENCES public.exams(id) 
        ON DELETE SET NULL;
    END IF;
END $$;

-- Add index for performance when checking prerequisites
CREATE INDEX IF NOT EXISTS idx_exams_prerequisite_exam_id 
ON public.exams(prerequisite_exam_id);

-- Add index for scheduled exams queries
CREATE INDEX IF NOT EXISTS idx_exams_start_time 
ON public.exams(start_time) 
WHERE start_time IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_exams_end_time 
ON public.exams(end_time) 
WHERE end_time IS NOT NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.exams.prerequisite_exam_id IS 
'ID of the exam that must be completed before this exam can be started. NULL means no prerequisite.';

COMMENT ON COLUMN public.exams.sequential_unlock_enabled IS 
'When true, enforces that prerequisite_exam_id must be completed before this exam can be started.';

COMMENT ON COLUMN public.exams.start_time IS 
'Exam becomes accessible at this time. NULL means accessible immediately.';

COMMENT ON COLUMN public.exams.end_time IS 
'Exam becomes inaccessible after this time. NULL means no end time.';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries after migration to verify success:
--
-- 1. Check columns were added:
-- SELECT column_name, data_type, is_nullable, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'exams' 
-- AND column_name IN ('prerequisite_exam_id', 'sequential_unlock_enabled');
--
-- 2. Check indexes were created:
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename = 'exams' 
-- AND indexname LIKE '%prerequisite%' OR indexname LIKE '%start_time%' OR indexname LIKE '%end_time%';
--
-- 3. Check foreign key constraint:
-- SELECT constraint_name, constraint_type 
-- FROM information_schema.table_constraints 
-- WHERE table_name = 'exams' 
-- AND constraint_name = 'exams_prerequisite_exam_id_fkey';
-- ============================================================================
