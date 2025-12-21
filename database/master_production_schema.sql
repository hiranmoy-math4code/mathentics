-- ============================================================================
-- MASTER PRODUCTION DATABASE SCHEMA
-- CONSOLIDATED VERSION: 2025-12-21
-- ============================================================================
-- This file contains the complete database structure, including tables, 
-- functions, triggers, indexes, and RLS policies.
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS & TYPES
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

DO $$ BEGIN
    CREATE TYPE result_visibility_type AS ENUM ('immediate', 'scheduled', 'manual');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    role text NOT NULL CHECK (role = ANY (ARRAY['admin'::text, 'student'::text, 'creator'::text])),
    full_name text,
    avatar_url text,
    referral_code text UNIQUE,
    referred_by uuid REFERENCES public.profiles(id),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
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
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Modules Table
CREATE TABLE IF NOT EXISTS public.modules (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    module_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Exams Table
CREATE TABLE IF NOT EXISTS public.exams (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    duration_minutes integer NOT NULL,
    total_marks integer NOT NULL,
    negative_marking numeric DEFAULT 0,
    status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
    start_time timestamp with time zone,
    end_time timestamp with time zone,
    created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    creator_role text DEFAULT 'student'::text CHECK (creator_role = ANY (ARRAY['student'::text, 'admin'::text])),
    is_practice boolean DEFAULT false,
    show_results_immediately boolean DEFAULT true,
    result_visibility result_visibility_type DEFAULT 'immediate'::result_visibility_type,
    result_release_time timestamp with time zone,
    show_answers boolean DEFAULT true,
    max_attempts integer,
    prerequisite_exam_id uuid REFERENCES public.exams(id) ON DELETE SET NULL,
    sequential_unlock_enabled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Lessons Table
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
    exam_id uuid REFERENCES public.exams(id) ON DELETE SET NULL,
    video_provider text DEFAULT 'youtube'::text,
    video_type text DEFAULT 'vod'::text CHECK (video_type = ANY (ARRAY['vod'::text, 'live'::text])),
    bunny_video_id text,
    bunny_guid text,
    bunny_library_id text,
    video_status text DEFAULT 'ready'::text CHECK (video_status = ANY (ARRAY['processing'::text, 'ready'::text, 'live'::text, 'ended'::text, 'error'::text])),
    is_live boolean DEFAULT false,
    meeting_url text,
    meeting_date timestamp with time zone,
    meeting_platform text DEFAULT 'google_meet'::text CHECK (meeting_platform IS NULL OR (meeting_platform = ANY (ARRAY['google_meet'::text, 'zoom'::text, 'teams'::text, 'other'::text]))),
    prerequisite_lesson_id uuid REFERENCES public.lessons(id) ON DELETE SET NULL,
    sequential_unlock_enabled boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status text NOT NULL DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active', 'completed', 'refunded', 'pending', 'expired'])),
    progress integer DEFAULT 0,
    progress_percentage numeric DEFAULT 0.00,
    last_accessed_lesson_id uuid REFERENCES public.lessons(id) ON DELETE SET NULL,
    last_accessed_at timestamp with time zone,
    payment_id uuid, -- Defined later due to dependency
    expires_at timestamp with time zone,
    granted_by uuid REFERENCES public.profiles(id),
    granted_at timestamp with time zone DEFAULT now(),
    grant_type text DEFAULT 'free' CHECK (grant_type IN ('manual', 'payment', 'free')),
    updated_at timestamp with time zone DEFAULT now()
);

-- Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    completed boolean DEFAULT false,
    completed_at timestamp with time zone,
    time_spent integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Sections Table
CREATE TABLE IF NOT EXISTS public.sections (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    title text NOT NULL,
    duration_minutes integer NOT NULL,
    total_marks integer NOT NULL,
    section_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    section_id uuid NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    question_text text NOT NULL,
    question_type text NOT NULL CHECK (question_type = ANY (ARRAY['MCQ'::text, 'MSQ'::text, 'NAT'::text])),
    marks integer NOT NULL,
    negative_marks numeric DEFAULT 0,
    correct_answer text,
    explanation text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Options Table
CREATE TABLE IF NOT EXISTS public.options (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    option_text text NOT NULL,
    option_order integer NOT NULL,
    is_correct boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Exam Attempts Table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    started_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    submitted_at timestamp with time zone,
    status text NOT NULL DEFAULT 'in_progress'::text CHECK (status = ANY (ARRAY['in_progress'::text, 'submitted'::text, 'graded'::text])),
    total_time_spent integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Responses Table
CREATE TABLE IF NOT EXISTS public.responses (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    attempt_id uuid NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    question_id uuid NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    student_answer text,
    is_marked_for_review boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT responses_attempt_question_unique UNIQUE (attempt_id, question_id)
);

-- Results Table
CREATE TABLE IF NOT EXISTS public.results (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    attempt_id uuid NOT NULL REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    total_marks integer NOT NULL,
    obtained_marks numeric NOT NULL,
    percentage numeric NOT NULL,
    rank integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Section Results Table
CREATE TABLE IF NOT EXISTS public.section_results (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    result_id uuid NOT NULL REFERENCES public.results(id) ON DELETE CASCADE,
    section_id uuid NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    total_marks integer NOT NULL,
    obtained_marks numeric NOT NULL,
    correct_answers integer NOT NULL,
    wrong_answers integer NOT NULL,
    unanswered integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Question Bank Table
CREATE TABLE IF NOT EXISTS public.question_bank (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    question_text text NOT NULL,
    question_type text NOT NULL CHECK (question_type = ANY (ARRAY['MCQ'::text, 'MSQ'::text, 'NAT'::text])),
    marks integer NOT NULL,
    negative_marks numeric DEFAULT 0,
    correct_answer text,
    explanation text,
    subject text,
    topic text,
    difficulty text CHECK (difficulty = ANY (ARRAY['easy'::text, 'medium'::text, 'hard'::text])),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Question Bank Options Table
CREATE TABLE IF NOT EXISTS public.question_bank_options (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id uuid NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
    option_text text NOT NULL,
    option_order integer NOT NULL,
    is_correct boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Student Uploaded PDFs Table
CREATE TABLE IF NOT EXISTS public.student_uploaded_pdfs (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    uploader_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    file_path text NOT NULL,
    file_url text,
    status text DEFAULT 'processing'::text,
    exam_id uuid REFERENCES public.exams(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Test Series Table
CREATE TABLE IF NOT EXISTS public.test_series (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    price numeric NOT NULL DEFAULT 0,
    is_free boolean DEFAULT false,
    total_exams integer DEFAULT 0,
    status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Test Series Exams Table
CREATE TABLE IF NOT EXISTS public.test_series_exams (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    test_series_id uuid NOT NULL REFERENCES public.test_series(id) ON DELETE CASCADE,
    exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
    exam_order integer NOT NULL,
    max_attempts integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Test Series Enrollments Table
CREATE TABLE IF NOT EXISTS public.test_series_enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    test_series_id uuid NOT NULL REFERENCES public.test_series(id) ON DELETE CASCADE,
    student_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    enrolled_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress real DEFAULT '0'::real,
    completed_exams integer NOT NULL DEFAULT 0,
    total_exams integer NOT NULL DEFAULT 0,
    next_exam_date date,
    expires_at timestamp with time zone,
    granted_by uuid REFERENCES public.profiles(id),
    granted_at timestamp with time zone DEFAULT now(),
    grant_type text DEFAULT 'free' CHECK (grant_type IN ('manual', 'payment', 'free'))
);

-- Enrollment Logs Table
CREATE TABLE IF NOT EXISTS public.enrollment_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE CASCADE,
    test_series_enrollment_id uuid REFERENCES public.test_series_enrollments(id) ON DELETE CASCADE,
    action text NOT NULL CHECK (action IN ('granted', 'revoked', 'expired', 'extended', 'modified')),
    performed_by uuid NOT NULL REFERENCES public.profiles(id),
    previous_expiry timestamp with time zone,
    new_expiry timestamp with time zone,
    notes text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CHECK ((enrollment_id IS NOT NULL) OR (test_series_enrollment_id IS NOT NULL))
);

-- Course Payments Table
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
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- Add payment_id foreign key to enrollments
ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.course_payments(id) ON DELETE SET NULL;

-- Test Series Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    series_id uuid NOT NULL REFERENCES public.test_series(id) ON DELETE CASCADE,
    amount numeric NOT NULL,
    status text NOT NULL DEFAULT 'pending'::text,
    phonepe_transaction_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- User Rewards Table
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
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Reward Transactions Table
CREATE TABLE IF NOT EXISTS public.reward_transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount integer NOT NULL,
    action_type text NOT NULL,
    entity_id text,
    description text,
    created_at timestamp with time zone DEFAULT now()
);

-- User Badges Table
CREATE TABLE IF NOT EXISTS public.user_badges (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id text NOT NULL,
    earned_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_badges_user_badge_unique UNIQUE (user_id, badge_id)
);

-- Daily Missions Table
CREATE TABLE IF NOT EXISTS public.daily_missions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    mission_type text NOT NULL,
    target integer NOT NULL,
    progress integer DEFAULT 0,
    completed boolean DEFAULT false,
    date date DEFAULT CURRENT_DATE,
    created_at timestamp with time zone DEFAULT now()
);

-- Community Channels Table
CREATE TABLE IF NOT EXISTS public.community_channels (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('announcement', 'discussion', 'qa')),
    description text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Community Messages Table
CREATE TABLE IF NOT EXISTS public.community_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    channel_id uuid NOT NULL REFERENCES public.community_channels(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    attachments jsonb DEFAULT '[]'::jsonb,
    is_pinned boolean DEFAULT false,
    is_announcement boolean DEFAULT false,
    parent_message_id uuid REFERENCES public.community_messages(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Community Reactions Table
CREATE TABLE IF NOT EXISTS public.community_reactions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    message_id uuid NOT NULL REFERENCES public.community_messages(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    emoji text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT community_reactions_unique UNIQUE (message_id, user_id, emoji)
);

-- Community Bookmarks Table
CREATE TABLE IF NOT EXISTS public.community_bookmarks (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    message_id uuid NOT NULL REFERENCES public.community_messages(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT community_bookmarks_unique UNIQUE (message_id, user_id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read boolean DEFAULT false,
    link text,
    created_at timestamp with time zone DEFAULT now()
);

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    title text NOT NULL,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    session_id uuid NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'ai'::text])),
    content text NOT NULL
);

-- Bunny Settings Table
CREATE TABLE IF NOT EXISTS public.bunny_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    bunny_api_key text NOT NULL,
    bunny_library_id text NOT NULL,
    bunny_stream_library_id text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Live Stream Sessions Table
CREATE TABLE IF NOT EXISTS public.live_stream_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    bunny_stream_id text NOT NULL,
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    status text DEFAULT 'scheduled'::text CHECK (status = ANY (ARRAY['scheduled'::text, 'live'::text, 'ended'::text, 'cancelled'::text])),
    viewer_count integer DEFAULT 0,
    duration_seconds integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON public.profiles(referred_by);
CREATE INDEX IF NOT EXISTS idx_courses_creator_id ON public.courses(creator_id);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_exam_id ON public.lessons(exam_id);
CREATE INDEX IF NOT EXISTS idx_lessons_prerequisite_lesson_id ON public.lessons(prerequisite_lesson_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_expires_at ON public.enrollments(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_test_series_enrollments_expires_at ON public.test_series_enrollments(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_exams_prerequisite_exam_id ON public.exams(prerequisite_exam_id);
CREATE INDEX IF NOT EXISTS idx_exams_start_time ON public.exams(start_time) WHERE start_time IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_exams_end_time ON public.exams(end_time) WHERE end_time IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_enrollment ON public.enrollment_logs(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_test_series ON public.enrollment_logs(test_series_enrollment_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_created_at ON public.enrollment_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_messages_channel_created ON public.community_messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_courses_title_trgm ON public.courses USING gin (title gin_trgm_ops);

-- ============================================================================
-- 4. FUNCTIONS & RPCs
-- ============================================================================

-- Auth: Handle New User Registration
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

-- Notifications: Create Notification
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

-- Exams: Submit Exam Attempt
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

-- Enrollment: Auto-expire logic
CREATE OR REPLACE FUNCTION public.mark_expired_enrollments()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.enrollments SET status = 'expired' WHERE expires_at IS NOT NULL AND expires_at < now() AND status = 'active';
  
  INSERT INTO public.enrollment_logs (enrollment_id, action, performed_by, notes)
  SELECT id, 'expired', COALESCE(granted_by, user_id), 'Automatically marked as expired'
  FROM public.enrollments WHERE status = 'expired' AND updated_at >= now() - interval '1 minute';
END;
$$;

CREATE OR REPLACE FUNCTION public.get_course_learners(p_course_id uuid)
RETURNS TABLE (
  student_id uuid, email text, full_name text, avatar_url text, enrolled_at timestamp with time zone,
  status text, progress integer, progress_percentage numeric, last_accessed_at timestamp with time zone,
  expires_at timestamp with time zone, grant_type text, granted_by uuid, granted_by_name text
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

-- Course: Get Course Structure
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

-- ============================================================================
-- 5. TRIGGERS
-- ============================================================================

-- Auth Profile Creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-expire Check
CREATE OR REPLACE FUNCTION public.check_enrollment_expiry() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at < NOW() THEN NEW.status := 'expired'; END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_enrollment_expiry ON public.enrollments;
CREATE TRIGGER trigger_check_enrollment_expiry BEFORE INSERT OR UPDATE ON public.enrollments FOR EACH ROW EXECUTE FUNCTION public.check_enrollment_expiry();

-- ============================================================================
-- 6. RLS POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published courses." ON public.courses FOR SELECT USING (is_published = true OR creator_id = auth.uid());
CREATE POLICY "Creators can manage their courses." ON public.courses FOR ALL USING (creator_id = auth.uid());

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments." ON public.enrollments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all enrollments." ON public.enrollments FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- [Additional policies for other tables would follow the same pattern...]
