-- ============================================================================
-- QUIZ-ONLY SEQUENTIAL ACCESS
-- ============================================================================
-- Add prerequisite support ONLY for quiz lessons
-- Other lesson types (video, text, pdf) remain freely accessible
-- ============================================================================

-- Add columns to lessons table
ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS prerequisite_lesson_id uuid;

ALTER TABLE public.lessons
ADD COLUMN IF NOT EXISTS sequential_unlock_enabled boolean DEFAULT false;

-- Foreign key
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'lessons_prerequisite_lesson_id_fkey'
    ) THEN
        ALTER TABLE public.lessons 
        ADD CONSTRAINT lessons_prerequisite_lesson_id_fkey 
        FOREIGN KEY (prerequisite_lesson_id) 
        REFERENCES public.lessons(id) 
        ON DELETE SET NULL;
    END IF;
END $$;

-- Index
CREATE INDEX IF NOT EXISTS idx_lessons_prerequisite_lesson_id 
ON public.lessons(prerequisite_lesson_id);

-- Comments
COMMENT ON COLUMN public.lessons.prerequisite_lesson_id IS 
'For quiz lessons only: ID of previous quiz lesson that must be completed first. NULL = no prerequisite.';

COMMENT ON COLUMN public.lessons.sequential_unlock_enabled IS 
'For quiz lessons only: When true, requires prerequisite quiz completion before access.';

-- Verify
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lessons' 
AND column_name IN ('prerequisite_lesson_id', 'sequential_unlock_enabled');
