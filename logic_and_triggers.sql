-- ============================================================================
-- SUPABASE DATABASE SCHEMA RECONSTRUCTION
-- FILE 2: LOGIC AND TRIGGERS (Functions, Triggers, RPCs)
-- ============================================================================
-- This file contains all PostgreSQL functions, triggers, and stored procedures
-- needed for application logic and automation.
-- Execute this file AFTER running full_schema.sql
-- ============================================================================

-- ============================================================================
-- AUTH TRIGGER: HANDLE NEW USER REGISTRATION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  v_role text;
BEGIN
  -- Determine role, default to 'student'
  v_role := COALESCE(new.raw_user_meta_data->>'role', 'student');
  
  -- Ensure role is valid based on check constraint
  IF v_role NOT IN ('admin', 'student', 'creator') THEN
    v_role := 'student';
  END IF;
  
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url',
    v_role
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url;
  
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Profile creation failed: %', SQLERRM;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- NOTIFICATION FUNCTIONS
-- ============================================================================

-- Function to create notifications
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid,
  p_title text,
  p_message text,
  p_type text DEFAULT 'info',
  p_link text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- NOTIFICATION TRIGGERS
-- ============================================================================

-- Function to notify ALL users when a new course is launched (published)
CREATE OR REPLACE FUNCTION notify_all_users_new_course()
RETURNS TRIGGER AS $$
BEGIN
  -- Only trigger if the course is being published
  IF (TG_OP = 'INSERT' AND NEW.is_published = true) OR
     (TG_OP = 'UPDATE' AND NEW.is_published = true AND OLD.is_published = false) THEN
     
    INSERT INTO public.notifications (user_id, title, message, type, link)
    SELECT 
      id, 
      'New Course Launched! 🚀', 
      'Check out our new course: ' || NEW.title, 
      'info', 
      '/courses/' || NEW.id
    FROM public.profiles;
    
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for courses table
DROP TRIGGER IF EXISTS on_course_published ON public.courses;
CREATE TRIGGER on_course_published
AFTER INSERT OR UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION notify_all_users_new_course();

-- Function to notify enrolled users when a new lesson is added
CREATE OR REPLACE FUNCTION notify_enrolled_users_new_lesson()
RETURNS TRIGGER AS $$
DECLARE
  v_course_id uuid;
  v_course_title text;
BEGIN
  -- Get course details via module
  SELECT c.id, c.title
  INTO v_course_id, v_course_title
  FROM public.modules m
  JOIN public.courses c ON m.course_id = c.id
  WHERE m.id = NEW.module_id;

  -- Notify ALL enrolled users (active status)
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT 
    e.user_id, 
    'New Lesson Added 📚', 
    'A new lesson "' || NEW.title || '" has been added to ' || v_course_title, 
    'info', 
    '/learn/' || v_course_id || '?lessonId=' || NEW.id
  FROM public.enrollments e
  WHERE e.course_id = v_course_id AND e.status = 'active';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for lessons table
DROP TRIGGER IF EXISTS on_lesson_added ON public.lessons;
CREATE TRIGGER on_lesson_added
AFTER INSERT ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION notify_enrolled_users_new_lesson();

-- ============================================================================
-- EXAM SUBMISSION RPC
-- ============================================================================

CREATE OR REPLACE FUNCTION public.submit_exam_attempt(p_attempt_id uuid, p_exam_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_marks numeric := 0;
    v_obtained_marks numeric := 0;
    v_percentage numeric := 0;
    v_result_id uuid;
    v_return_data jsonb;
BEGIN
    -- Check if already submitted to prevent double submission
    IF EXISTS (SELECT 1 FROM public.results WHERE attempt_id = p_attempt_id) THEN
        RETURN jsonb_build_object('error', 'Exam already submitted');
    END IF;

    -- Update status to submitted immediately to prevent race conditions
    UPDATE public.exam_attempts 
    SET status = 'submitted', submitted_at = now() 
    WHERE id = p_attempt_id;

    -- Calculate Total Marks for Exam
    SELECT COALESCE(total_marks, 0) INTO v_total_marks 
    FROM public.exams WHERE id = p_exam_id;

    -- Calculate results using CTE approach
    WITH ranked_answers AS (
        SELECT 
            q.section_id,
            q.id as q_id,
            q.marks,
            q.negative_marks,
            q.question_type,
            q.correct_answer as nat_correct,
            r.student_answer,
            -- For MCQ/MSQ correctness
            (
                CASE 
                    WHEN q.question_type = 'MCQ' THEN 
                        EXISTS (SELECT 1 FROM public.options o WHERE o.id::text = r.student_answer AND o.question_id = q.id AND o.is_correct = true)
                    WHEN q.question_type = 'NAT' THEN 
                        (r.student_answer::numeric - q.correct_answer::numeric) BETWEEN -0.01 AND 0.01
                    WHEN q.question_type = 'MSQ' THEN
                        (
                            SELECT array_agg(id::text ORDER BY id) FROM public.options WHERE question_id = q.id AND is_correct = true
                        ) = (
                            SELECT ARRAY(SELECT jsonb_array_elements_text(r.student_answer::jsonb) ORDER BY 1)
                        )
                    ELSE false
                END
            ) as is_correct,
            (r.student_answer IS NOT NULL AND r.student_answer != '' AND r.student_answer != '[]') as is_attempted
        FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        LEFT JOIN public.responses r ON q.id = r.question_id AND r.attempt_id = p_attempt_id
        WHERE s.exam_id = p_exam_id
    ),
    section_stats AS (
        SELECT 
            section_id,
            SUM(marks) as sec_total_marks,
            SUM(CASE 
                WHEN is_correct THEN marks 
                WHEN is_attempted AND NOT is_correct THEN -ABS(negative_marks)
                ELSE 0 
            END) as sec_obtained_marks,
            COUNT(*) FILTER (WHERE is_correct) as sec_correct,
            COUNT(*) FILTER (WHERE is_attempted AND NOT is_correct) as sec_wrong,
            COUNT(*) FILTER (WHERE NOT is_attempted) as sec_unanswered
        FROM ranked_answers
        GROUP BY section_id
    )
    -- Insert Main Result
    , main_insert AS (
        INSERT INTO public.results (attempt_id, total_marks, obtained_marks, percentage)
        SELECT 
            p_attempt_id,
            v_total_marks,
            SUM(sec_obtained_marks),
            CASE WHEN v_total_marks > 0 THEN ROUND((SUM(sec_obtained_marks) / v_total_marks) * 100, 2) ELSE 0 END
        FROM section_stats
        RETURNING id, obtained_marks, percentage
    )
    -- Insert Section Results
    INSERT INTO public.section_results (result_id, section_id, total_marks, obtained_marks, correct_answers, wrong_answers, unanswered)
    SELECT 
        (SELECT id FROM main_insert),
        section_id,
        sec_total_marks,
        sec_obtained_marks,
        sec_correct,
        sec_wrong,
        sec_unanswered
    FROM section_stats;

    -- Update Exam Attempt Status
    UPDATE public.exam_attempts SET status = 'graded' WHERE id = p_attempt_id;

    -- Get Final Result Data to Return
    SELECT jsonb_build_object(
        'id', r.id,
        'obtained_marks', r.obtained_marks,
        'percentage', r.percentage
    ) INTO v_return_data
    FROM public.results r WHERE r.attempt_id = p_attempt_id;

    RETURN v_return_data;
END;
$$;

-- ============================================================================
-- STUDENT DASHBOARD RPC
-- ============================================================================

-- Function for Student Stats & Rank
CREATE OR REPLACE FUNCTION public.get_student_stats(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_total_exams INT;
    v_average_score NUMERIC;
    v_total_seconds NUMERIC;
    v_user_rank INT;
    v_result_json jsonb;
BEGIN
    SELECT
        COUNT(ea.id),
        COALESCE(AVG(r.percentage), 0),
        COALESCE(SUM(EXTRACT(EPOCH FROM (ea.submitted_at - ea.started_at))), 0)
    INTO
        v_total_exams,
        v_average_score,
        v_total_seconds
    FROM public.exam_attempts ea
    LEFT JOIN public.results r ON ea.id = r.attempt_id
    WHERE ea.student_id = target_user_id 
    AND ea.status IN ('submitted', 'graded');

    WITH student_scores AS (
        SELECT 
            ea.student_id, 
            AVG(r.percentage) as avg_pct
        FROM public.exam_attempts ea
        JOIN public.results r ON ea.id = r.attempt_id
        WHERE ea.status IN ('submitted', 'graded')
        GROUP BY ea.student_id
    )
    SELECT COUNT(*) + 1 INTO v_user_rank
    FROM student_scores
    WHERE avg_pct > v_average_score;

    v_result_json := json_build_object(
        'totalExams', v_total_exams,
        'averageScore', ROUND(v_average_score, 2),
        'totalTimeSpent', ROUND(v_total_seconds / 3600, 2),
        'rank', COALESCE(v_user_rank, 1)
    );

    RETURN v_result_json;
END;
$$;

-- Function for Student Enrolled Courses with Progress
CREATE OR REPLACE FUNCTION public.get_student_courses_progress(target_user_id uuid)
RETURNS TABLE (
    id uuid,
    title text,
    description text,
    thumbnail_url text,
    progress_percentage numeric,
    last_accessed_at timestamp with time zone,
    total_lessons bigint,
    completed_lessons bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    course_record RECORD;
    new_progress NUMERIC;
    t_lessons BIGINT;
    c_lessons BIGINT;
BEGIN
    CREATE TEMP TABLE IF NOT EXISTS temp_course_progress (
        tmp_id uuid,
        tmp_title text,
        tmp_desc text,
        tmp_thumb text,
        tmp_prog numeric,
        tmp_last timestamp with time zone,
        tmp_total bigint,
        tmp_comp bigint
    ) ON COMMIT DROP;

    FOR course_record IN 
        SELECT 
            c.id as c_id, 
            c.title as c_title, 
            c.description as c_desc, 
            c.thumbnail_url as c_thumb, 
            e.last_accessed_at as e_last, 
            e.progress_percentage as old_progress, 
            e.id as enrollment_id, 
            e.status as e_status
        FROM public.enrollments e
        JOIN public.courses c ON e.course_id = c.id
        WHERE e.user_id = target_user_id 
        AND (e.status = 'active' OR e.status = 'completed')
    LOOP
        SELECT COUNT(*) INTO t_lessons
        FROM public.modules m
        JOIN public.lessons l ON m.id = l.module_id
        WHERE m.course_id = course_record.c_id;

        SELECT COUNT(*) INTO c_lessons
        FROM public.lesson_progress lp 
        WHERE lp.user_id = target_user_id 
        AND lp.course_id = course_record.c_id 
        AND lp.completed = true;

        IF t_lessons = 0 THEN
            new_progress := 0;
        ELSE
            new_progress := ROUND((c_lessons::numeric / t_lessons::numeric) * 100, 2);
        END IF;

        UPDATE public.enrollments 
        SET 
            progress_percentage = new_progress, 
            status = CASE WHEN new_progress < 100 AND status = 'completed' THEN 'active' ELSE status END,
            updated_at = now()
        WHERE public.enrollments.id = course_record.enrollment_id; 

        INSERT INTO temp_course_progress VALUES (
            course_record.c_id,
            course_record.c_title,
            course_record.c_desc,
            course_record.c_thumb,
            new_progress,
            course_record.e_last,
            t_lessons,
            c_lessons
        );
    END LOOP;

    RETURN QUERY 
    SELECT 
        tmp_id,
        tmp_title,
        tmp_desc,
        tmp_thumb,
        tmp_prog,
        tmp_last,
        tmp_total,
        tmp_comp
    FROM temp_course_progress;
END;
$$;

-- ============================================================================
-- ADMIN DASHBOARD RPC
-- ============================================================================

-- Function for Admin Dashboard Stats
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats(admin_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_exams_count INT;
    v_questions_count INT;
    v_attempts_count INT;
    v_unique_students INT;
    v_result jsonb;
BEGIN
    SELECT COUNT(*) INTO v_exams_count
    FROM public.exams 
    WHERE admin_id = admin_uuid;

    SELECT COUNT(q.id) INTO v_questions_count
    FROM public.questions q
    JOIN public.sections s ON q.section_id = s.id
    JOIN public.exams e ON s.exam_id = e.id
    WHERE e.admin_id = admin_uuid;

    SELECT COUNT(ea.id) INTO v_attempts_count
    FROM public.exam_attempts ea
    JOIN public.exams e ON ea.exam_id = e.id
    WHERE e.admin_id = admin_uuid;

    SELECT COUNT(DISTINCT ea.student_id) INTO v_unique_students
    FROM public.exam_attempts ea
    JOIN public.exams e ON ea.exam_id = e.id
    WHERE e.admin_id = admin_uuid;

    v_result := json_build_object(
        'examsCount', COALESCE(v_exams_count, 0),
        'questionsCount', COALESCE(v_questions_count, 0),
        'attemptsCount', COALESCE(v_attempts_count, 0),
        'uniqueStudents', COALESCE(v_unique_students, 0)
    );

    RETURN v_result;
END;
$$;

-- Function for Admin Chart Data (Last 7 Days)
CREATE OR REPLACE FUNCTION public.get_admin_chart_data(admin_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_chart_data jsonb;
BEGIN
    WITH last_7_days AS (
        SELECT generate_series(
            date_trunc('day', now()) - interval '6 days',
            date_trunc('day', now()),
            interval '1 day'
        ) as day_date
    ),
    daily_stats AS (
        SELECT 
            date_trunc('day', COALESCE(ea.submitted_at, ea.started_at, ea.created_at)) as stat_date,
            COUNT(ea.id) as attempts,
            AVG(COALESCE(r.percentage, 0)) as avg_score
        FROM public.exam_attempts ea
        JOIN public.exams e ON ea.exam_id = e.id
        LEFT JOIN public.results r ON ea.id = r.attempt_id
        WHERE e.admin_id = admin_uuid
        AND (ea.submitted_at >= (now() - interval '7 days') OR ea.started_at >= (now() - interval '7 days'))
        GROUP BY 1
    )
    SELECT json_agg(json_build_object(
        'name', to_char(d.day_date, 'Dy'),
        'attempts', COALESCE(s.attempts, 0),
        'avgScore', COALESCE(ROUND(s.avg_score, 0), 0)
    ) ORDER BY d.day_date) INTO v_chart_data
    FROM last_7_days d
    LEFT JOIN daily_stats s ON d.day_date = s.stat_date;

    RETURN v_chart_data;
END;
$$;

-- ============================================================================
-- COURSE STRUCTURE RPC
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_course_structure(target_course_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result jsonb;
BEGIN
    SELECT json_agg(
        json_build_object(
            'id', m.id,
            'title', m.title,
            'module_order', m.module_order,
            'lessons', (
                SELECT COALESCE(json_agg(
                    json_build_object(
                        'id', l.id,
                        'title', l.title,
                        'content_type', l.content_type,
                        'content_url', l.content_url,
                        'content_text', l.content_text,
                        'is_free_preview', COALESCE(l.is_free_preview, false),
                        'lesson_order', l.lesson_order,
                        'duration', l.video_duration,
                        'video_provider', l.video_provider,
                        'bunny_video_id', l.bunny_video_id,
                        'bunny_library_id', l.bunny_library_id,
                        'is_live', l.is_live,
                        'meeting_date', l.meeting_date,
                        'meeting_url', l.meeting_url,
                        'meeting_platform', l.meeting_platform,
                        'exam_id', l.exam_id,
                        'is_downloadable', l.is_downloadable,
                        'created_at', l.created_at,
                        'updated_at', l.updated_at
                    ) ORDER BY l.lesson_order ASC
                ), '[]'::json)
                FROM public.lessons l
                WHERE l.module_id = m.id
            )
        ) ORDER BY m.module_order ASC
    ) INTO v_result
    FROM public.modules m
    WHERE m.course_id = target_course_id;

    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- ============================================================================
-- MARKETPLACE RPC
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_published_courses_with_meta(
    target_user_id uuid, 
    p_limit int DEFAULT 20, 
    p_offset int DEFAULT 0
)
RETURNS TABLE (
    id uuid,
    title text,
    description text,
    thumbnail_url text,
    price numeric,
    is_published boolean,
    created_at timestamp with time zone,
    instructor_name text,
    total_lessons bigint,
    is_enrolled boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.title,
        c.description,
        c.thumbnail_url,
        c.price,
        c.is_published,
        c.created_at,
        COALESCE(p.full_name, 'Admin')::text as instructor_name,
        (
            SELECT COUNT(l.id)
            FROM public.modules m
            JOIN public.lessons l ON m.id = l.module_id
            WHERE m.course_id = c.id
        ) as total_lessons,
        CASE 
            WHEN target_user_id IS NULL THEN false
            ELSE EXISTS (
                SELECT 1 FROM public.enrollments e 
                WHERE e.course_id = c.id 
                AND e.user_id = target_user_id 
                AND e.status = 'active'
            )
        END as is_enrolled
    FROM public.courses c
    LEFT JOIN public.profiles p ON c.creator_id = p.id
    WHERE c.is_published = true
    ORDER BY c.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$;

-- ============================================================================
-- TEST SERIES RPC
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_student_test_series_progress(target_user_id uuid)
RETURNS TABLE (
    id uuid,
    title text,
    description text,
    progress numeric,
    completed_exams bigint,
    total_exams bigint,
    next_exam_date timestamp with time zone,
    next_exam_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH series_stats AS (
        SELECT 
            tse.test_series_id,
            COUNT(DISTINCT tse.exam_id) as total_exams
        FROM public.test_series_exams tse
        GROUP BY tse.test_series_id
    ),
    completed_stats AS (
        SELECT 
            tse.test_series_id,
            COUNT(DISTINCT ea.exam_id) as completed_exams
        FROM public.test_series_exams tse
        JOIN public.exam_attempts ea ON tse.exam_id = ea.exam_id
        WHERE ea.student_id = target_user_id
        AND ea.status IN ('submitted', 'graded')
        GROUP BY tse.test_series_id
    ),
    next_exams AS (
        SELECT DISTINCT ON (tse.test_series_id)
            tse.test_series_id,
            e.start_time,
            e.title
        FROM public.test_series_exams tse
        JOIN public.exams e ON tse.exam_id = e.id
        WHERE e.start_time > now()
        ORDER BY tse.test_series_id, e.start_time ASC
    )
    SELECT 
        ts.id,
        ts.title,
        ts.description,
        CASE 
            WHEN COALESCE(ss.total_exams, 0) = 0 THEN 0
            ELSE ROUND((COALESCE(cs.completed_exams, 0)::numeric / ss.total_exams::numeric) * 100, 0)
        END as progress,
        COALESCE(cs.completed_exams, 0) as completed_exams,
        COALESCE(ss.total_exams, 0) as total_exams,
        ne.start_time as next_exam_date,
        ne.title as next_exam_name
    FROM public.test_series_enrollments e
    JOIN public.test_series ts ON e.test_series_id = ts.id
    LEFT JOIN series_stats ss ON ts.id = ss.test_series_id
    LEFT JOIN completed_stats cs ON ts.id = cs.test_series_id
    LEFT JOIN next_exams ne ON ts.id = ne.test_series_id
    WHERE e.student_id = target_user_id;
END;
$$;

-- ============================================================================
-- COMMUNITY RPC
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_channels_with_meta(target_course_id uuid)
RETURNS TABLE (
    id uuid,
    name text,
    description text,
    type text,
    course_id uuid,
    created_at timestamp with time zone,
    last_message_content text,
    last_message_time timestamp with time zone,
    last_message_user text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.name,
        c.description,
        c.type,
        c.course_id,
        c.created_at,
        (
            SELECT content 
            FROM public.community_messages m 
            WHERE m.channel_id = c.id 
            ORDER BY m.created_at DESC 
            LIMIT 1
        ) as last_message_content,
        (
            SELECT created_at 
            FROM public.community_messages m 
            WHERE m.channel_id = c.id 
            ORDER BY m.created_at DESC 
            LIMIT 1
        ) as last_message_time,
        (
            SELECT p.full_name 
            FROM public.community_messages m 
            JOIN public.profiles p ON m.user_id = p.id
            WHERE m.channel_id = c.id 
            ORDER BY m.created_at DESC 
            LIMIT 1
        ) as last_message_user
    FROM public.community_channels c
    WHERE c.course_id = target_course_id
    AND c.is_active = true
    ORDER BY c.created_at ASC;
END;
$$;

-- ============================================================================
-- END OF LOGIC AND TRIGGERS FILE
-- ============================================================================
