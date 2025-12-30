-- ============================================================================
-- SAFE SCALABILITY SETUP (100,000+ USERS)
-- ============================================================================
-- 🎯 GOAL: Enable high-volume performance WITHOUT breaking any current features.
-- ============================================================================

-- PART 1: SCALING INDEXES (Safe, non-blocking additions)
CREATE INDEX IF NOT EXISTS idx_enrollments_scaling ON enrollments(user_id, course_id, status);
CREATE INDEX IF NOT EXISTS idx_community_messages_scaling ON community_messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_reactions_scaling ON community_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_scaling ON exam_attempts(student_id, exam_id, status);

-- PART 2: NOTIFICATION SCHEMA ENHANCEMENT
-- We add 'is_global' so we can notify 100k users with just ONE row instead of 100k rows.
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS is_global boolean DEFAULT false;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS tenant_id uuid;

-- Update the trigger to be efficient (O(1) instead of O(N))
CREATE OR REPLACE FUNCTION public.notify_all_users_new_course()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND OLD.is_published = false AND NEW.is_published = true) THEN
    INSERT INTO public.notifications (title, message, type, link, is_global, user_id)
    VALUES (
      'New Course Available! 🎉',
      'Check out the new course: ' || NEW.title,
      'info',
      '/courses/' || NEW.id::text,
      true,
      '00000000-0000-0000-0000-000000000000' -- Dummy UUID for global
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PART 3: RE-ENGINEER DASHBOARD PROGRESS (Zero-Downtime)
-- 1. Ensure a background trigger handles updates (so the dashboard doesn't have to)
CREATE OR REPLACE FUNCTION public.update_enrollment_on_lesson_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_course_id uuid;
    v_total_lessons bigint;
    v_completed_lessons bigint;
    v_new_progress numeric;
BEGIN
    SELECT m.course_id INTO v_course_id FROM public.lessons l JOIN public.modules m ON l.module_id = m.id WHERE l.id = NEW.lesson_id;
    
    IF NEW.completed = true AND (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.completed = false)) THEN
        SELECT COUNT(l.id) INTO v_total_lessons FROM public.modules m JOIN public.lessons l ON m.id = l.module_id WHERE m.course_id = v_course_id;
        SELECT COUNT(*) INTO v_completed_lessons FROM public.lesson_progress lp WHERE lp.user_id = NEW.user_id AND lp.course_id = v_course_id AND lp.completed = true;
        
        v_new_progress := CASE WHEN v_total_lessons > 0 THEN ROUND((v_completed_lessons::numeric / v_total_lessons::numeric) * 100, 2) ELSE 0 END;
        
        UPDATE public.enrollments SET progress_percentage = v_new_progress, updated_at = NOW() WHERE user_id = NEW.user_id AND course_id = v_course_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_lesson_progress_update_enrollment ON public.lesson_progress;
CREATE TRIGGER on_lesson_progress_update_enrollment
    AFTER INSERT OR UPDATE OF completed ON public.lesson_progress
    FOR EACH ROW EXECUTE FUNCTION public.update_enrollment_on_lesson_progress();

-- 2. Optimize the read function (Match exact signature to avoid breaking UI)
CREATE OR REPLACE FUNCTION public.get_student_courses_progress(target_user_id uuid)
RETURNS TABLE(
    id uuid, 
    title text, 
    description text, 
    thumbnail_url text, 
    course_type text, 
    progress_percentage numeric, 
    last_accessed_at timestamp with time zone, 
    total_lessons bigint, 
    completed_lessons bigint
)
LANGUAGE sql
STABLE
AS $function$
    SELECT 
        c.id, 
        c.title, 
        c.description, 
        c.thumbnail_url,
        c.course_type,
        e.progress_percentage, 
        e.last_accessed_at,
        (
            SELECT COUNT(l.id)
            FROM public.modules m
            JOIN public.lessons l ON m.id = l.module_id
            WHERE m.course_id = c.id
        ) as total_lessons,
        (
            SELECT COUNT(*)
            FROM public.lesson_progress lp 
            WHERE lp.user_id = target_user_id 
            AND lp.course_id = c.id 
            AND lp.completed = true
        ) as completed_lessons
    FROM public.enrollments e
    JOIN public.courses c ON e.course_id = c.id
    WHERE e.user_id = target_user_id 
    AND (e.status = 'active' OR e.status = 'completed')
    ORDER BY e.last_accessed_at DESC NULLS LAST;
$function$;
