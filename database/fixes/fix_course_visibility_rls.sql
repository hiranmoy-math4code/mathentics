-- FIX: Allow Enrolled Students to View Private/Draft Courses
-- Reason: The dashboard queries 'courses' table. Current RLS only allows 'is_published = true'.
-- If a student enrolls in a private/draft course (e.g. for testing), they cannot see it in the dashboard.

DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;

CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (
  (is_published = true) 
  OR (creator_id = auth.uid()) 
  OR EXISTS (
    SELECT 1 FROM enrollments e 
    WHERE e.course_id = courses.id 
    AND e.user_id = auth.uid() 
    AND e.status = 'active'
  )
);
