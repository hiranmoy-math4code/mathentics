-- STEP 1: Check if migration was applied
-- Run this first to see if columns exist

SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'exams' 
AND column_name IN ('prerequisite_exam_id', 'sequential_unlock_enabled')
ORDER BY column_name;

-- Expected: 2 rows
-- If 0 rows: Migration NOT applied - you need to run add_exam_prerequisites.sql first!


-- STEP 2: Check if exam settings were saved
-- Replace 'YOUR_EXAM_2_TITLE' with actual exam name

SELECT 
    id,
    title,
    prerequisite_exam_id,
    sequential_unlock_enabled,
    start_time,
    end_time,
    updated_at
FROM exams
WHERE title ILIKE '%YOUR_EXAM_2_TITLE%'  -- Replace with your exam name
ORDER BY created_at DESC;

-- What to check:
-- - sequential_unlock_enabled should be TRUE
-- - prerequisite_exam_id should have a UUID (not NULL)
-- - updated_at should be recent


-- STEP 3: Check lesson order in course
-- Replace 'YOUR_COURSE_ID' with actual course ID

SELECT 
    m.order_index as module_order,
    m.title as module_title,
    l.order_index as lesson_order,
    l.title as lesson_title,
    l.content_type,
    l.exam_id,
    e.title as exam_title,
    e.sequential_unlock_enabled,
    e.prerequisite_exam_id
FROM lessons l
JOIN modules m ON l.module_id = m.id
LEFT JOIN exams e ON l.exam_id = e.id
WHERE m.course_id = 'YOUR_COURSE_ID'  -- Replace with your course ID
AND l.content_type = 'quiz'
ORDER BY m.order_index, l.order_index;

-- Expected result for sequential access:
-- Exam 1: sequential_unlock_enabled = false, prerequisite_exam_id = NULL
-- Exam 2: sequential_unlock_enabled = true,  prerequisite_exam_id = <Exam 1 ID>
-- Exam 3: sequential_unlock_enabled = true,  prerequisite_exam_id = <Exam 2 ID>


-- STEP 4: Check if student has completed prerequisite
-- Replace with actual student_id and exam_id

SELECT 
    ea.id,
    ea.exam_id,
    ea.student_id,
    ea.status,
    ea.submitted_at,
    e.title as exam_title
FROM exam_attempts ea
JOIN exams e ON ea.exam_id = e.id
WHERE ea.student_id = 'YOUR_STUDENT_ID'  -- Replace with student user ID
AND ea.exam_id = 'PREREQUISITE_EXAM_ID'  -- Replace with Exam 1 ID
ORDER BY ea.created_at DESC;

-- Expected: If student completed Exam 1, you should see status = 'submitted'
-- If 0 rows: Student hasn't attempted the prerequisite yet


-- STEP 5: Full access check simulation
-- This simulates what the backend checks

SELECT 
    e2.id as current_exam_id,
    e2.title as current_exam_title,
    e2.prerequisite_exam_id,
    e2.sequential_unlock_enabled,
    e1.title as prerequisite_title,
    COUNT(ea.id) FILTER (WHERE ea.status = 'submitted') as completed_attempts,
    CASE 
        WHEN e2.sequential_unlock_enabled = false THEN 'ACCESSIBLE - No sequential lock'
        WHEN e2.prerequisite_exam_id IS NULL THEN 'ACCESSIBLE - No prerequisite'
        WHEN COUNT(ea.id) FILTER (WHERE ea.status = 'submitted') > 0 THEN 'ACCESSIBLE - Prerequisite completed'
        ELSE 'LOCKED - Prerequisite not completed'
    END as access_status
FROM exams e2
LEFT JOIN exams e1 ON e2.prerequisite_exam_id = e1.id
LEFT JOIN exam_attempts ea ON ea.exam_id = e1.id 
    AND ea.student_id = 'YOUR_STUDENT_ID'  -- Replace with student user ID
WHERE e2.id = 'YOUR_EXAM_2_ID'  -- Replace with Exam 2 ID
GROUP BY e2.id, e2.title, e2.prerequisite_exam_id, e2.sequential_unlock_enabled, e1.title;

-- This will tell you exactly why the exam is or isn't locked
