-- FIX: Add tenant_id to notification triggers
-- Problem: Triggers creating notifications without tenant_id causing NOT NULL constraint violation

-- Function 1: Notify all users about new course (with tenant_id)
CREATE OR REPLACE FUNCTION public.notify_all_users_new_course()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify when a course is published for the first time
  IF (TG_OP = 'UPDATE' AND OLD.is_published = false AND NEW.is_published = true) THEN
    INSERT INTO public.notifications (user_id, tenant_id, title, message, type, link)
    SELECT 
      p.id,
      NEW.tenant_id,  -- ✅ Add tenant_id from course
      'New Course Available! 🎉',
      'Check out the new course: ' || NEW.title,
      'info',
      '/courses/' || NEW.id::text
    FROM public.profiles p
    WHERE p.role = 'student';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 2: Notify enrolled users about new lesson (with tenant_id)
CREATE OR REPLACE FUNCTION public.notify_enrolled_users_new_lesson()
RETURNS TRIGGER AS $$
DECLARE
  v_course_id uuid;
  v_course_title text;
  v_tenant_id uuid;
BEGIN
  -- Get course info from module
  SELECT m.course_id, c.title, c.tenant_id
  INTO v_course_id, v_course_title, v_tenant_id
  FROM public.modules m
  JOIN public.courses c ON c.id = m.course_id
  WHERE m.id = NEW.module_id;
  
  -- Notify all enrolled users
  INSERT INTO public.notifications (user_id, tenant_id, title, message, type, link)
  SELECT 
    e.user_id,
    v_tenant_id,  -- ✅ Add tenant_id from course
    'New Lesson Added! 📚',
    'A new lesson "' || NEW.title || '" has been added to ' || v_course_title,
    'info',
    '/learn/' || v_course_id::text
  FROM public.enrollments e
  WHERE e.course_id = v_course_id 
    AND e.status = 'active';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify functions updated
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname IN ('notify_all_users_new_course', 'notify_enrolled_users_new_lesson');
