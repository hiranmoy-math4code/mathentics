-- SIMPLE MANUAL FIX
-- Just run these 2 UPDATE statements to set prerequisites manually

-- Set IIT JAM to require CSIR NET
UPDATE exams
SET prerequisite_exam_id = 'bfe55642-684f-439c-b9ae-0fabf76c4492'
WHERE id = '2b7fcb61-6dec-4c95-a096-1b1a11479cb9';

-- Set New Exam to require IIT JAM  
UPDATE exams
SET prerequisite_exam_id = '2b7fcb61-6dec-4c95-a096-1b1a11479cb9'
WHERE id = '14e110c6-eb69-48d7-820c-064827eb3e0f';

-- Verify
SELECT 
    title,
    prerequisite_exam_id,
    sequential_unlock_enabled,
    (SELECT title FROM exams e2 WHERE e2.id = exams.prerequisite_exam_id) as prerequisite_title
FROM exams
ORDER BY created_at;
