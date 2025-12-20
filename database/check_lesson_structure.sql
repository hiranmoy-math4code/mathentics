-- Check if your exams are linked to lessons properly
SELECT 
    l.id as lesson_id,
    l.title as lesson_title,
    l.exam_id,
    l.order_index as lesson_order,
    l.module_id,
    m.title as module_title,
    m.order_index as module_order,
    m.course_id,
    e.title as exam_title
FROM lessons l
LEFT JOIN modules m ON l.module_id = m.id
LEFT JOIN exams e ON l.exam_id = e.id
WHERE l.exam_id IN (
    'bfe55642-684f-439c-b9ae-0fabf76c4492',  -- CSIR NET
    '2b7fcb61-6dec-4c95-a096-1b1a11479cb9',  -- IIT JAM
    '14e110c6-eb69-48d7-820c-064827eb3e0f'   -- New Exam
)
ORDER BY m.order_index, l.order_index;

-- This will show if:
-- 1. Exams are linked to lessons
-- 2. Lessons are in modules
-- 3. The order is correct
