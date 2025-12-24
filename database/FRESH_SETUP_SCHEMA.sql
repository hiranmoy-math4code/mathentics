-- ============================================================================
-- COMPLETE PRODUCTION DATABASE SCHEMA (EXACT MATCH)
-- Version: 2025-12-24 (Updated)
-- ============================================================================
-- This file contains the COMPLETE database structure matching your current setup
-- Total: 34 Tables, 10 Functions
-- Run this entire file in Supabase SQL Editor to recreate the database
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. CUSTOM TYPES
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE result_visibility_type AS ENUM ('immediate', 'scheduled', 'manual');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 3. CORE TABLES (34 TABLES TOTAL)
-- ============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    role text NOT NULL CHECK (role = ANY (ARRAY['admin'::text, 'student'::text, 'creator'::text])),
    full_name text,
    avatar_url text,
    referral_code text UNIQUE,
    referred_by uuid REFERENCES public.profiles(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    price numeric DEFAULT 0,
    thumbnail_url text,
    category text,
    level text CHECK (level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text, 'all'::text])),
    is_published boolean DEFAULT false,
    community_enabled boolean DEFAULT true,
    bunny_collection_id text,
    course_type text DEFAULT 'course'::text CHECK (course_type = ANY (ARRAY['course'::text, 'test_series'::text])),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Modules Table
CREATE TABLE IF NOT EXISTS public.modules (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    module_order integer NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id uuid NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title text NOT NULL,
    content_type text NOT NULL CHECK (content_type = ANY (ARRAY['video'::text, 'text'::text, 'pdf'::text, 'quiz'::text])),
    content_url text,
    content_text text,
    video_duration integer,
    is_free_preview boolean DEFAULT false,
    is_downloadable boolean DEFAULT true,
    lesson_order integer NOT NULL,
    exam_id uuid, -- References exams table (added later)
    video_provider text DEFAULT 'youtube'::text,
    video_type text DEFAULT 'vod'::text CHECK (video_type = ANY (ARRAY['vod'::text, 'live'::text])),
    bunny_video_id text,
    bunny_guid text,
    bunny_library_id text,
    video_status text DEFAULT 'ready'::text CHECK (video_status = ANY (ARRAY['processing'::text, 'ready'::text, 'live'::text, 'ended'::text, 'error'::text])),
    is_live boolean DEFAULT false,
    meeting_url text,
    meeting_date timestamptz,
    meeting_platform text DEFAULT 'google_meet'::text CHECK (meeting_platform IS NULL OR (meeting_platform = ANY (ARRAY['google_meet'::text, 'zoom'::text, 'teams'::text, 'other'::text]))),
    prerequisite_lesson_id uuid REFERENCES public.lessons(id) ON DELETE SET NULL,
    sequential_unlock_enabled boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at timestamptz DEFAULT now(),
    status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'completed'::text, 'refunded'::text, 'pending'::text, 'expired'::text])),
    progress integer DEFAULT 0,
    progress_percentage numeric DEFAULT 0.00,
    last_accessed_lesson_id uuid REFERENCES public.lessons(id) ON DELETE SET NULL,
    last_accessed_at timestamptz,
    payment_id uuid, -- Added later
    expires_at timestamptz,
    granted_by uuid REFERENCES public.profiles(id),
    granted_at timestamptz DEFAULT now(),
    grant_type text DEFAULT 'free'::text CHECK (grant_type = ANY (ARRAY['manual'::text, 'payment'::text, 'free'::text])),
    updated_at timestamptz DEFAULT now()
);

-- 6. Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    completed boolean DEFAULT false,
    completed_at timestamptz,
    time_spent integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 7. Exams Table
CREATE TABLE IF NOT EXISTS public.exams (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    duration_minutes integer NOT NULL,
    total_marks numeric NOT NULL,
    negative_marking numeric DEFAULT 0,
    status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
    start_time timestamptz,
    end_time timestamptz,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    creator_role text DEFAULT 'student'::text CHECK (creator_role = ANY (ARRAY['student'::text, 'admin'::text])),
    is_practice boolean DEFAULT false,
    show_results_immediately boolean DEFAULT true,
    result_visibility result_visibility_type DEFAULT 'immediate'::result_visibility_type,
    result_release_time timestamptz,
    show_answers boolean DEFAULT true,
    max_attempts integer,
    prerequisite_exam_id uuid REFERENCES public.exams(id) ON DELETE SET NULL,
    sequential_unlock_enabled boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Add exam_id foreign key to lessons
ALTER TABLE public.lessons 
ADD CONSTRAINT lessons_exam_id_fkey 
FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE SET NULL;

-- 8. Sections Table
CREATE TABLE IF NOT EXISTS public.sections (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    title text NOT NULL,
    duration_minutes integer NOT NULL,
    total_marks numeric NOT NULL,
    section_order integer NOT NULL,
    max_questions_to_attempt integer,
    required_attempts integer,
    created_at timestamptz DEFAULT now()
);

-- 9. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    section_id uuid NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    question_text text NOT NULL,
    question_type text NOT NULL CHECK (question_type = ANY (ARRAY['MCQ'::text, 'MSQ'::text, 'NAT'::text])),
    marks numeric NOT NULL,
    negative_marks numeric DEFAULT 0,
    correct_answer text,
    explanation text,
    created_at timestamptz DEFAULT now()
);

-- 10. Options Table
CREATE TABLE IF NOT EXISTS public.options (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    option_text text NOT NULL,
    option_order integer NOT NULL,
    is_correct boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- 11. Exam Attempts Table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    started_at timestamptz DEFAULT now(),
    submitted_at timestamptz,
    status text NOT NULL DEFAULT 'in_progress'::text CHECK (status = ANY (ARRAY['in_progress'::text, 'submitted'::text, 'graded'::text])),
    total_time_spent integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- 12. Responses Table
CREATE TABLE IF NOT EXISTS public.responses (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    attempt_id uuid NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    student_answer text,
    is_marked_for_review boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(attempt_id, question_id)
);

-- 13. Results Table
CREATE TABLE IF NOT EXISTS public.results (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    attempt_id uuid NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    total_marks numeric NOT NULL,
    obtained_marks numeric NOT NULL,
    percentage numeric NOT NULL,
    rank integer,
    created_at timestamptz DEFAULT now()
);

-- 14. Section Results Table
CREATE TABLE IF NOT EXISTS public.section_results (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    result_id uuid NOT NULL REFERENCES public.results(id) ON DELETE CASCADE,
    section_id uuid NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    total_marks integer NOT NULL,
    obtained_marks numeric NOT NULL,
    correct_answers integer NOT NULL,
    wrong_answers integer NOT NULL,
    unanswered integer NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 15. Question Bank Table
CREATE TABLE IF NOT EXISTS public.question_bank (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    question_text text NOT NULL,
    question_type text NOT NULL CHECK (question_type = ANY (ARRAY['MCQ'::text, 'MSQ'::text, 'NAT'::text])),
    marks numeric NOT NULL,
    negative_marks numeric DEFAULT 0,
    correct_answer text,
    explanation text,
    subject text,
    topic text,
    difficulty text CHECK (difficulty = ANY (ARRAY['easy'::text, 'medium'::text, 'hard'::text])),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 16. Question Bank Options Table
CREATE TABLE IF NOT EXISTS public.question_bank_options (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id uuid NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
    option_text text NOT NULL,
    option_order integer NOT NULL,
    is_correct boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- 17. Course Payments Table
CREATE TABLE IF NOT EXISTS public.course_payments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
    amount numeric NOT NULL,
    transaction_id text NOT NULL UNIQUE,
    provider_transaction_id text,
    status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'success'::text, 'failed'::text, 'refunded'::text])),
    payment_method text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Add payment_id foreign key to enrollments
ALTER TABLE public.enrollments 
ADD CONSTRAINT enrollments_payment_id_fkey 
FOREIGN KEY (payment_id) REFERENCES public.course_payments(id) ON DELETE SET NULL;

-- 18. Payments Table (Legacy - for old payment records)
CREATE TABLE IF NOT EXISTS public.payments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount numeric NOT NULL,
    status text NOT NULL DEFAULT 'pending'::text,
    phonepe_transaction_id text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 19. User Rewards Table
CREATE TABLE IF NOT EXISTS public.user_rewards (
    user_id uuid NOT NULL PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_coins integer DEFAULT 0,
    current_streak integer DEFAULT 0,
    longest_streak integer DEFAULT 0,
    last_activity_date date,
    daily_coins_earned integer DEFAULT 0,
    last_coin_date date,
    xp integer DEFAULT 0,
    level integer DEFAULT 1,
    weekly_xp integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 20. Reward Transactions Table
CREATE TABLE IF NOT EXISTS public.reward_transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount integer NOT NULL,
    action_type text NOT NULL,
    entity_id text,
    description text,
    created_at timestamptz DEFAULT now()
);

-- 21. User Badges Table
CREATE TABLE IF NOT EXISTS public.user_badges (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id text NOT NULL,
    earned_at timestamptz DEFAULT now(),
    UNIQUE(user_id, badge_id)
);

-- 22. Daily Missions Table
CREATE TABLE IF NOT EXISTS public.daily_missions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date date NOT NULL,
    missions jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, date)
);

-- 23. Community Channels Table
CREATE TABLE IF NOT EXISTS public.community_channels (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL CHECK (type = ANY (ARRAY['announcement'::text, 'discussion'::text, 'qa'::text])),
    description text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 24. Community Messages Table
CREATE TABLE IF NOT EXISTS public.community_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id uuid NOT NULL REFERENCES public.community_channels(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    attachments jsonb DEFAULT '[]'::jsonb,
    is_pinned boolean DEFAULT false,
    is_announcement boolean DEFAULT false,
    parent_message_id uuid REFERENCES public.community_messages(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 25. Community Reactions Table
CREATE TABLE IF NOT EXISTS public.community_reactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    message_id uuid NOT NULL REFERENCES public.community_messages(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    emoji text NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(message_id, user_id, emoji)
);

-- 26. Community Bookmarks Table
CREATE TABLE IF NOT EXISTS public.community_bookmarks (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    message_id uuid NOT NULL REFERENCES public.community_messages(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(message_id, user_id)
);

-- 27. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamptz DEFAULT now()
);

-- 28. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL DEFAULT 'info'::text CHECK (type = ANY (ARRAY['info'::text, 'success'::text, 'warning'::text, 'error'::text])),
    is_read boolean DEFAULT false,
    link text,
    created_at timestamptz DEFAULT now()
);

-- 29. Enrollment Logs Table
CREATE TABLE IF NOT EXISTS public.enrollment_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE CASCADE,
    test_series_enrollment_id uuid, -- Legacy field
    action text NOT NULL CHECK (action = ANY (ARRAY['granted'::text, 'revoked'::text, 'expired'::text, 'extended'::text, 'modified'::text])),
    performed_by uuid NOT NULL REFERENCES public.profiles(id),
    previous_expiry timestamptz,
    new_expiry timestamptz,
    notes text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- 30. Student Uploaded PDFs Table
CREATE TABLE IF NOT EXISTS public.student_uploaded_pdfs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    uploader_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_path text NOT NULL,
    file_url text,
    status text DEFAULT 'processing'::text,
    exam_id uuid REFERENCES public.exams(id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- 31. Bunny Settings Table
CREATE TABLE IF NOT EXISTS public.bunny_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    bunny_api_key text NOT NULL,
    bunny_library_id text NOT NULL,
    bunny_stream_library_id text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 32. Live Stream Sessions Table
CREATE TABLE IF NOT EXISTS public.live_stream_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    bunny_stream_id text NOT NULL,
    started_at timestamptz,
    ended_at timestamptz,
    status text DEFAULT 'scheduled'::text CHECK (status = ANY (ARRAY['scheduled'::text, 'live'::text, 'ended'::text, 'cancelled'::text])),
    viewer_count integer DEFAULT 0,
    duration_seconds integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 33. Chat Sessions Table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    title text NOT NULL,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- 34. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz NOT NULL DEFAULT now(),
    session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'ai'::text])),
    content text NOT NULL
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON public.profiles(referred_by);
CREATE INDEX IF NOT EXISTS idx_courses_creator_id ON public.courses(creator_id);
CREATE INDEX IF NOT EXISTS idx_courses_course_type ON public.courses(course_type);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_exam_id ON public.lessons(exam_id);
CREATE INDEX IF NOT EXISTS idx_lessons_prerequisite_lesson_id ON public.lessons(prerequisite_lesson_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_expires_at ON public.enrollments(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_exams_prerequisite_exam_id ON public.exams(prerequisite_exam_id);
CREATE INDEX IF NOT EXISTS idx_exams_start_time ON public.exams(start_time) WHERE start_time IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_exams_end_time ON public.exams(end_time) WHERE end_time IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_enrollment ON public.enrollment_logs(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_created_at ON public.enrollment_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_messages_channel_created ON public.community_messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_courses_title_trgm ON public.courses USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_user_id ON public.reward_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_created_at ON public.reward_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_daily_missions_user_date ON public.daily_missions(user_id, date);

-- ============================================================================
-- 5. FUNCTIONS & RPC (10 FUNCTIONS)
-- ============================================================================

-- 1. Handle New User Registration
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  v_role text;
BEGIN
  v_role := COALESCE(new.raw_user_meta_data->>'role', 'student');
  IF v_role NOT IN ('admin', 'student', 'creator') THEN v_role := 'student'; END IF;
  
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create Notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id uuid, p_title text, p_message text, p_type text DEFAULT 'info', p_link text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE v_id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Submit Exam Attempt
CREATE OR REPLACE FUNCTION public.submit_exam_attempt(p_attempt_id uuid, p_exam_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
    v_total_marks numeric := 0;
    v_obtained_marks numeric := 0;
    v_percentage numeric := 0;
    v_return_data jsonb;
BEGIN
    IF EXISTS (SELECT 1 FROM public.results WHERE attempt_id = p_attempt_id) THEN
        RETURN jsonb_build_object('error', 'Exam already submitted');
    END IF;

    UPDATE public.exam_attempts SET status = 'submitted', submitted_at = now() WHERE id = p_attempt_id;
    SELECT COALESCE(total_marks, 0) INTO v_total_marks FROM public.exams WHERE id = p_exam_id;

    WITH ranked_answers AS (
        SELECT q.section_id, q.marks, q.negative_marks, q.question_type,
            (CASE 
                WHEN q.question_type = 'MCQ' THEN EXISTS (SELECT 1 FROM public.options o WHERE o.id::text = r.student_answer AND o.question_id = q.id AND o.is_correct = true)
                WHEN q.question_type = 'NAT' THEN (r.student_answer::numeric - q.correct_answer::numeric) BETWEEN -0.01 AND 0.01
                WHEN q.question_type = 'MSQ' THEN (SELECT array_agg(id::text ORDER BY id) FROM public.options WHERE question_id = q.id AND is_correct = true) = (SELECT ARRAY(SELECT jsonb_array_elements_text(r.student_answer::jsonb) ORDER BY 1))
                ELSE false
            END) as is_correct,
            (r.student_answer IS NOT NULL AND r.student_answer != '' AND r.student_answer != '[]') as is_attempted
        FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        LEFT JOIN public.responses r ON q.id = r.question_id AND r.attempt_id = p_attempt_id
        WHERE s.exam_id = p_exam_id
    ),
    section_stats AS (
        SELECT section_id, SUM(marks) as sec_total_marks,
            SUM(CASE WHEN is_correct THEN marks WHEN is_attempted AND NOT is_correct THEN -ABS(negative_marks) ELSE 0 END) as sec_obtained_marks,
            COUNT(*) FILTER (WHERE is_correct) as sec_correct,
            COUNT(*) FILTER (WHERE is_attempted AND NOT is_correct) as sec_wrong,
            COUNT(*) FILTER (WHERE NOT is_attempted) as sec_unanswered
        FROM ranked_answers GROUP BY section_id
    ),
    main_insert AS (
        INSERT INTO public.results (attempt_id, total_marks, obtained_marks, percentage)
        SELECT p_attempt_id, v_total_marks, SUM(sec_obtained_marks),
            CASE WHEN v_total_marks > 0 THEN ROUND((SUM(sec_obtained_marks) / v_total_marks) * 100, 2) ELSE 0 END
        FROM section_stats RETURNING id
    )
    INSERT INTO public.section_results (result_id, section_id, total_marks, obtained_marks, correct_answers, wrong_answers, unanswered)
    SELECT (SELECT id FROM main_insert), section_id, sec_total_marks, sec_obtained_marks, sec_correct, sec_wrong, sec_unanswered FROM section_stats;

    UPDATE public.exam_attempts SET status = 'graded' WHERE id = p_attempt_id;
    SELECT jsonb_build_object('id', r.id, 'obtained_marks', r.obtained_marks, 'percentage', r.percentage) INTO v_return_data
    FROM public.results r WHERE r.attempt_id = p_attempt_id;
    RETURN v_return_data;
END;
$$;

-- 4. Mark Expired Enrollments
CREATE OR REPLACE FUNCTION public.mark_expired_enrollments()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.enrollments SET status = 'expired' WHERE expires_at IS NOT NULL AND expires_at < now() AND status = 'active';
  
  INSERT INTO public.enrollment_logs (enrollment_id, action, performed_by, notes)
  SELECT id, 'expired', COALESCE(granted_by, user_id), 'Automatically marked as expired'
  FROM public.enrollments WHERE status = 'expired' AND updated_at >= now() - interval '1 minute';
END;
$$;

-- 5. Check Enrollment Expiry (Trigger Function)
CREATE OR REPLACE FUNCTION public.check_enrollment_expiry() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at < NOW() THEN NEW.status := 'expired'; END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Get Course Learners
CREATE OR REPLACE FUNCTION public.get_course_learners(p_course_id uuid)
RETURNS TABLE (
  student_id uuid, email text, full_name text, avatar_url text, enrolled_at timestamptz,
  status text, progress integer, progress_percentage numeric, last_accessed_at timestamptz,
  expires_at timestamptz, grant_type text, granted_by uuid, granted_by_name text
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email, p.full_name, p.avatar_url, e.enrolled_at, e.status, e.progress, e.progress_percentage,
    e.last_accessed_at, e.expires_at, e.grant_type, e.granted_by, admin.full_name
  FROM public.enrollments e
  JOIN public.profiles p ON e.user_id = p.id
  LEFT JOIN public.profiles admin ON e.granted_by = admin.id
  WHERE e.course_id = p_course_id ORDER BY e.enrolled_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Get Course Structure
CREATE OR REPLACE FUNCTION public.get_course_structure(target_course_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_result jsonb;
BEGIN
    SELECT json_agg(json_build_object(
        'id', m.id, 'title', m.title, 'module_order', m.module_order,
        'lessons', (SELECT COALESCE(json_agg(json_build_object(
            'id', l.id, 'title', l.title, 'content_type', l.content_type, 'content_url', l.content_url,
            'is_free_preview', l.is_free_preview, 'lesson_order', l.lesson_order, 'exam_id', l.exam_id
        ) ORDER BY l.lesson_order), '[]'::json) FROM public.lessons l WHERE l.module_id = m.id)
    ) ORDER BY m.module_order) INTO v_result FROM public.modules m WHERE m.course_id = target_course_id;
    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$$;

-- 8. Get or Create Daily Missions (RPC)
CREATE OR REPLACE FUNCTION public.get_or_create_daily_missions(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_today date := CURRENT_DATE;
    v_missions jsonb;
BEGIN
    SELECT missions INTO v_missions
    FROM daily_missions
    WHERE user_id = p_user_id AND date = v_today;

    IF v_missions IS NULL THEN
        v_missions := '[
            {
                "id": "login",
                "title": "Daily Login",
                "reward": 5,
                "progress": 0,
                "goal": 1,
                "completed": false,
                "icon": "Zap"
            },
            {
                "id": "quiz",
                "title": "Complete a Quiz",
                "reward": 20,
                "progress": 0,
                "goal": 1,
                "completed": false,
                "icon": "Brain"
            },
            {
                "id": "video",
                "title": "Watch a Video",
                "reward": 10,
                "progress": 0,
                "goal": 1,
                "completed": false,
                "icon": "Play"
            }
        ]'::jsonb;

        INSERT INTO daily_missions (user_id, date, missions)
        VALUES (p_user_id, v_today, v_missions)
        ON CONFLICT (user_id, date) DO UPDATE
        SET missions = EXCLUDED.missions;
    END IF;

    RETURN v_missions;
END;
$$;

-- 9. Update Mission Progress (RPC)
CREATE OR REPLACE FUNCTION public.update_mission_progress(
    p_user_id uuid,
    p_mission_type text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_today date := CURRENT_DATE;
    v_missions jsonb;
    v_mission jsonb;
    v_updated_missions jsonb := '[]'::jsonb;
    v_mission_found boolean := false;
BEGIN
    SELECT missions INTO v_missions
    FROM daily_missions
    WHERE user_id = p_user_id AND date = v_today;

    IF v_missions IS NULL THEN
        v_missions := public.get_or_create_daily_missions(p_user_id);
    END IF;

    FOR v_mission IN SELECT * FROM jsonb_array_elements(v_missions)
    LOOP
        IF v_mission->>'id' = p_mission_type THEN
            v_mission_found := true;
            
            IF (v_mission->>'completed')::boolean = false THEN
                v_mission := jsonb_set(
                    v_mission,
                    '{progress}',
                    to_jsonb(LEAST((v_mission->>'progress')::int + 1, (v_mission->>'goal')::int))
                );
                
                IF (v_mission->>'progress')::int >= (v_mission->>'goal')::int THEN
                    v_mission := jsonb_set(v_mission, '{completed}', 'true'::jsonb);
                END IF;
            END IF;
        END IF;
        
        v_updated_missions := v_updated_missions || v_mission;
    END LOOP;

    IF v_mission_found THEN
        UPDATE daily_missions
        SET missions = v_updated_missions, updated_at = now()
        WHERE user_id = p_user_id AND date = v_today;
    END IF;

    RETURN v_updated_missions;
END;
$$;

-- 10. Handle Reward Transaction (Trigger Function)
CREATE OR REPLACE FUNCTION public.handle_reward_transaction()
RETURNS TRIGGER AS $$
DECLARE
    v_user_record RECORD;
    v_new_streak INTEGER;
    v_new_longest_streak INTEGER;
    v_yesterday DATE;
    v_today DATE;
BEGIN
    v_today := CURRENT_DATE;
    v_yesterday := v_today - INTERVAL '1 day';

    SELECT * INTO v_user_record FROM public.user_rewards WHERE user_id = NEW.user_id;

    IF v_user_record IS NULL THEN
        INSERT INTO public.user_rewards (user_id, total_coins, current_streak, longest_streak, last_activity_date, daily_coins_earned, last_coin_date, xp, level)
        VALUES (NEW.user_id, 0, 0, 0, NULL, 0, NULL, 0, 1);
        SELECT * INTO v_user_record FROM public.user_rewards WHERE user_id = NEW.user_id;
    END IF;

    IF v_user_record.last_activity_date IS NULL THEN
        v_new_streak := 1;
    ELSIF v_user_record.last_activity_date = v_yesterday THEN
        v_new_streak := COALESCE(v_user_record.current_streak, 0) + 1;
    ELSIF v_user_record.last_activity_date = v_today THEN
        v_new_streak := COALESCE(v_user_record.current_streak, 0);
    ELSE
        v_new_streak := 1;
    END IF;

    v_new_longest_streak := GREATEST(COALESCE(v_user_record.longest_streak, 0), v_new_streak);

    IF v_user_record.last_coin_date IS NULL OR v_user_record.last_coin_date < v_today THEN
        UPDATE public.user_rewards
        SET 
            total_coins = COALESCE(total_coins, 0) + NEW.amount,
            daily_coins_earned = NEW.amount,
            last_coin_date = v_today,
            current_streak = v_new_streak,
            longest_streak = v_new_longest_streak,
            last_activity_date = v_today,
            xp = COALESCE(xp, 0) + NEW.amount,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
    ELSE
        IF COALESCE(v_user_record.daily_coins_earned, 0) + NEW.amount <= 100 THEN
            UPDATE public.user_rewards
            SET 
                total_coins = COALESCE(total_coins, 0) + NEW.amount,
                daily_coins_earned = COALESCE(daily_coins_earned, 0) + NEW.amount,
                current_streak = v_new_streak,
                longest_streak = v_new_longest_streak,
                last_activity_date = v_today,
                xp = COALESCE(xp, 0) + NEW.amount,
                updated_at = NOW()
            WHERE user_id = NEW.user_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 6. TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created 
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS reward_transaction_trigger ON public.reward_transactions;
CREATE TRIGGER reward_transaction_trigger
AFTER INSERT ON public.reward_transactions
FOR EACH ROW EXECUTE FUNCTION public.handle_reward_transaction();

DROP TRIGGER IF EXISTS trigger_check_enrollment_expiry ON public.enrollments;
CREATE TRIGGER trigger_check_enrollment_expiry 
BEFORE INSERT OR UPDATE ON public.enrollments 
FOR EACH ROW EXECUTE FUNCTION public.check_enrollment_expiry();

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (is_published = true OR creator_id = auth.uid());
CREATE POLICY "Creators can manage their courses" ON public.courses FOR ALL USING (creator_id = auth.uid());

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all enrollments" ON public.enrollments FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view modules of published courses" ON public.modules FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND (is_published = true OR creator_id = auth.uid()))
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view lessons of published courses" ON public.lessons FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.modules m
        JOIN public.courses c ON m.course_id = c.id
        WHERE m.id = module_id AND (c.is_published = true OR c.creator_id = auth.uid())
    )
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published exams" ON public.exams FOR SELECT USING (status = 'published' OR admin_id = auth.uid());
CREATE POLICY "Admins can manage their exams" ON public.exams FOR ALL USING (admin_id = auth.uid());

ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own attempts" ON public.exam_attempts FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Users can create own attempts" ON public.exam_attempts FOR INSERT WITH CHECK (student_id = auth.uid());

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own responses" ON public.responses FOR ALL USING (
    EXISTS (SELECT 1 FROM public.exam_attempts WHERE id = attempt_id AND student_id = auth.uid())
);

ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own results" ON public.results FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.exam_attempts WHERE id = attempt_id AND student_id = auth.uid())
);

ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own rewards" ON public.user_rewards FOR SELECT USING (user_id = auth.uid());

ALTER TABLE public.reward_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON public.reward_transactions FOR SELECT USING (user_id = auth.uid());

ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own missions" ON public.daily_missions FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

ALTER TABLE public.community_channels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active channels" ON public.community_channels FOR SELECT USING (is_active = true);

ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view messages" ON public.community_messages FOR SELECT USING (true);
CREATE POLICY "Users can create messages" ON public.community_messages FOR INSERT WITH CHECK (user_id = auth.uid());

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create own reviews" ON public.reviews FOR INSERT WITH CHECK (user_id = auth.uid());

-- Grant Execute Permissions for RPC Functions
GRANT EXECUTE ON FUNCTION public.get_or_create_daily_missions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_mission_progress(uuid, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_exam_attempt(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_course_learners(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_course_structure(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_notification(uuid, text, text, text, text) TO authenticated;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
-- Total: 34 Tables, 10 Functions, 3 Triggers
-- This schema matches your exact current database structure
-- ============================================================================
