-- Quick check: Are your exam settings correct?
-- Run this to see what's actually in the database

SELECT 
    id,
    title,
    prerequisite_exam_id,
    sequential_unlock_enabled,
    start_time,
    end_time
FROM exams
ORDER BY created_at;

-- Expected for sequential access to work:
-- Exam 1: prerequisite_exam_id = NULL,      sequential_unlock_enabled = false
-- Exam 2: prerequisite_exam_id = <Exam 1 ID>, sequential_unlock_enabled = true
-- Exam 3: prerequisite_exam_id = <Exam 2 ID>, sequential_unlock_enabled = true

-- If prerequisite_exam_id is NULL for Exam 2, that's the problem!
