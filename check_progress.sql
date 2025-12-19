-- ============================================================================
-- CHECK COURSE PROGRESS CALCULATION
-- ============================================================================

-- STEP 1: Check if lesson_progress data is being saved
SELECT 
    lp.user_id,
    lp.lesson_id,
    lp.course_id,
    lp.completed,
    lp.completed_at,
    c.title as course_title,
    l.title as lesson_title
FROM public.lesson_progress lp
JOIN public.courses c ON lp.course_id = c.id
JOIN public.lessons l ON lp.lesson_id = l.id
ORDER BY lp.created_at DESC
LIMIT 10;

-- STEP 2: Check total lessons vs completed lessons for a course
-- Replace 'YOUR_USER_ID' and 'YOUR_COURSE_ID' with actual values
SELECT 
    c.id as course_id,
    c.title as course_name,
    COUNT(DISTINCT l.id) as total_lessons,
    COUNT(DISTINCT lp.lesson_id) FILTER (WHERE lp.completed = true) as completed_lessons,
    ROUND(
        (COUNT(DISTINCT lp.lesson_id) FILTER (WHERE lp.completed = true)::numeric / 
         NULLIF(COUNT(DISTINCT l.id), 0)) * 100, 
        2
    ) as progress_percentage
FROM public.courses c
LEFT JOIN public.modules m ON c.id = m.course_id
LEFT JOIN public.lessons l ON m.id = l.module_id
LEFT JOIN public.lesson_progress lp ON l.id = lp.lesson_id 
    -- AND lp.user_id = 'YOUR_USER_ID'::uuid  -- Uncomment and add your user_id
WHERE c.id = 'YOUR_COURSE_ID'::uuid  -- Replace with actual course_id
GROUP BY c.id, c.title;

-- STEP 3: Check enrollments table for progress field
SELECT 
    e.id,
    e.user_id,
    e.course_id,
    e.progress,
    c.title as course_title
FROM public.enrollments e
JOIN public.courses c ON e.course_id = c.id
ORDER BY e.enrolled_at DESC
LIMIT 10;
