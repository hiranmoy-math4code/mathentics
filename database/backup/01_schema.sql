-- ============================================================================
-- MATH4CODE DATABASE SCHEMA
-- File: 01_schema.sql (Structure & Security)
-- ============================================================================
-- This file contains all table definitions, constraints, indexes, and RLS policies
-- Execute this file FIRST in Supabase SQL Editor
-- All statements are idempotent (safe to run multiple times)
-- ============================================================================

-- ============================================================================
-- ENABLE REQUIRED EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search optimization

-- ============================================================================
-- CREATE CUSTOM TYPES
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE result_visibility_type AS ENUM ('immediate', 'scheduled', 'manual');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    role text NOT NULL CHECK (role = ANY (ARRAY['admin'::text, 'student'::text, 'creator'::text])),
    full_name text,
    avatar_url text,
    referral_code text UNIQUE,
    referred_by uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT profiles_referred_by_fkey FOREIGN KEY (referred_by) REFERENCES public.profiles(id)
);

-- ============================================================================
-- COURSE MANAGEMENT SYSTEM
-- ============================================================================

-- Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    creator_id uuid NOT NULL,
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
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT courses_pkey PRIMARY KEY (id),
    CONSTRAINT courses_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Modules Table
CREATE TABLE IF NOT EXISTS public.modules (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    course_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    module_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT modules_pkey PRIMARY KEY (id),
    CONSTRAINT modules_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
);

-- Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    module_id uuid NOT NULL,
    title text NOT NULL,
    content_type text NOT NULL CHECK (content_type = ANY (ARRAY['video'::text, 'text'::text, 'pdf'::text, 'quiz'::text])),
    content_url text,
    content_text text,
    video_duration integer,
    is_free_preview boolean DEFAULT false,
    is_downloadable boolean DEFAULT true,
    lesson_order integer NOT NULL,
    exam_id uuid,
    video_provider text DEFAULT 'youtube'::text,
    video_type text DEFAULT 'vod'::text CHECK (video_type = ANY (ARRAY['vod'::text, 'live'::text])),
    bunny_video_id text,
    bunny_guid text,
    bunny_library_id text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT lessons_pkey PRIMARY KEY (id),
    CONSTRAINT lessons_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON DELETE CASCADE
);

-- Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    course_id uuid NOT NULL,
    enrolled_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress_percentage numeric DEFAULT 0,
    last_accessed_at timestamp with time zone,
    last_accessed_lesson_id uuid,
    status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'completed'::text, 'expired'::text])),
    payment_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT enrollments_pkey PRIMARY KEY (id),
    CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
    CONSTRAINT enrollments_last_accessed_lesson_id_fkey FOREIGN KEY (last_accessed_lesson_id) REFERENCES public.lessons(id) ON DELETE SET NULL,
    CONSTRAINT enrollments_user_course_unique UNIQUE (user_id, course_id)
);

-- Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    lesson_id uuid NOT NULL,
    course_id uuid NOT NULL,
    completed boolean DEFAULT false,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT lesson_progress_pkey PRIMARY KEY (id),
    CONSTRAINT lesson_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT lesson_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE,
    CONSTRAINT lesson_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
    CONSTRAINT lesson_progress_user_lesson_unique UNIQUE (user_id, lesson_id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    course_id uuid NOT NULL,
    user_id uuid NOT NULL,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_pkey PRIMARY KEY (id),
    CONSTRAINT reviews_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
    CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT reviews_user_course_unique UNIQUE (user_id, course_id)
);

-- ============================================================================
-- EXAM SYSTEM
-- ============================================================================

-- Exams Table
CREATE TABLE IF NOT EXISTS public.exams (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    duration_minutes integer NOT NULL,
    total_marks integer NOT NULL,
    passing_marks integer,
    instructions text,
    is_published boolean DEFAULT false,
    admin_id uuid,
    created_by uuid,
    result_visibility result_visibility_type DEFAULT 'immediate',
    scheduled_result_time timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT exams_pkey PRIMARY KEY (id),
    CONSTRAINT exams_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.profiles(id) ON DELETE SET NULL,
    CONSTRAINT exams_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- Sections Table
CREATE TABLE IF NOT EXISTS public.sections (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    exam_id uuid NOT NULL,
    title text NOT NULL,
    section_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT sections_pkey PRIMARY KEY (id),
    CONSTRAINT sections_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE
);

-- Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    section_id uuid NOT NULL,
    question_text text NOT NULL,
    question_type text NOT NULL CHECK (question_type = ANY (ARRAY['MCQ'::text, 'MSQ'::text, 'NAT'::text])),
    marks integer NOT NULL,
    negative_marks numeric DEFAULT 0,
    correct_answer text,
    explanation text,
    question_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT questions_pkey PRIMARY KEY (id),
    CONSTRAINT questions_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON DELETE CASCADE
);

-- Options Table
CREATE TABLE IF NOT EXISTS public.options (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    question_id uuid NOT NULL,
    option_text text NOT NULL,
    is_correct boolean DEFAULT false,
    option_order integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT options_pkey PRIMARY KEY (id),
    CONSTRAINT options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE
);

-- Exam Attempts Table
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    exam_id uuid NOT NULL,
    student_id uuid NOT NULL,
    started_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    submitted_at timestamp with time zone,
    total_time_spent integer DEFAULT 0,
    status text DEFAULT 'in_progress'::text CHECK (status = ANY (ARRAY['in_progress'::text, 'submitted'::text, 'graded'::text, 'paused'::text])),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT exam_attempts_pkey PRIMARY KEY (id),
    CONSTRAINT exam_attempts_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE,
    CONSTRAINT exam_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Responses Table (CRITICAL FIX: Added unique constraint)
CREATE TABLE IF NOT EXISTS public.responses (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    attempt_id uuid NOT NULL,
    question_id uuid NOT NULL,
    student_answer text,
    is_marked_for_review boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT responses_pkey PRIMARY KEY (id),
    CONSTRAINT responses_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.exam_attempts(id) ON DELETE CASCADE,
    CONSTRAINT responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE,
    CONSTRAINT responses_attempt_question_unique UNIQUE (attempt_id, question_id)
);

-- Results Table
CREATE TABLE IF NOT EXISTS public.results (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    attempt_id uuid NOT NULL,
    total_marks integer NOT NULL,
    obtained_marks numeric NOT NULL,
    percentage numeric NOT NULL,
    rank integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT results_pkey PRIMARY KEY (id),
    CONSTRAINT results_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.exam_attempts(id) ON DELETE CASCADE
);

-- Section Results Table
CREATE TABLE IF NOT EXISTS public.section_results (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    result_id uuid NOT NULL,
    section_id uuid NOT NULL,
    total_marks integer NOT NULL,
    obtained_marks numeric NOT NULL,
    correct_answers integer NOT NULL,
    wrong_answers integer NOT NULL,
    unanswered integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT section_results_pkey PRIMARY KEY (id),
    CONSTRAINT section_results_result_id_fkey FOREIGN KEY (result_id) REFERENCES public.results(id) ON DELETE CASCADE,
    CONSTRAINT section_results_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id) ON DELETE CASCADE
);

-- Question Bank Table
CREATE TABLE IF NOT EXISTS public.question_bank (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    admin_id uuid NOT NULL,
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
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT question_bank_pkey PRIMARY KEY (id),
    CONSTRAINT question_bank_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Question Bank Options Table
CREATE TABLE IF NOT EXISTS public.question_bank_options (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    question_id uuid NOT NULL,
    option_text text NOT NULL,
    option_order integer NOT NULL,
    is_correct boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT question_bank_options_pkey PRIMARY KEY (id),
    CONSTRAINT question_bank_options_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question_bank(id) ON DELETE CASCADE
);

-- Student Uploaded PDFs Table
CREATE TABLE IF NOT EXISTS public.student_uploaded_pdfs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    uploader_id uuid,
    file_path text NOT NULL,
    file_url text,
    status text DEFAULT 'processing'::text,
    exam_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT student_uploaded_pdfs_pkey PRIMARY KEY (id),
    CONSTRAINT student_uploaded_pdfs_uploader_id_fkey FOREIGN KEY (uploader_id) REFERENCES public.profiles(id) ON DELETE SET NULL,
    CONSTRAINT student_uploaded_pdfs_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE SET NULL
);

-- ============================================================================
-- TEST SERIES SYSTEM
-- ============================================================================

-- Test Series Table
CREATE TABLE IF NOT EXISTS public.test_series (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    admin_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    price numeric NOT NULL DEFAULT 0,
    is_free boolean DEFAULT false,
    total_exams integer DEFAULT 0,
    status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT test_series_pkey PRIMARY KEY (id),
    CONSTRAINT test_series_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Test Series Exams Table
CREATE TABLE IF NOT EXISTS public.test_series_exams (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    test_series_id uuid NOT NULL,
    exam_id uuid NOT NULL,
    exam_order integer NOT NULL,
    max_attempts integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT test_series_exams_pkey PRIMARY KEY (id),
    CONSTRAINT test_series_exams_test_series_id_fkey FOREIGN KEY (test_series_id) REFERENCES public.test_series(id) ON DELETE CASCADE,
    CONSTRAINT test_series_exams_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE
);

-- Test Series Enrollments Table
CREATE TABLE IF NOT EXISTS public.test_series_enrollments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    test_series_id uuid NOT NULL,
    student_id uuid NOT NULL,
    enrolled_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    progress real DEFAULT '0'::real,
    completed_exams integer NOT NULL DEFAULT 0,
    total_exams integer NOT NULL DEFAULT 0,
    next_exam_date date,
    CONSTRAINT test_series_enrollments_pkey PRIMARY KEY (id),
    CONSTRAINT test_series_enrollments_test_series_id_fkey FOREIGN KEY (test_series_id) REFERENCES public.test_series(id) ON DELETE CASCADE,
    CONSTRAINT test_series_enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- PAYMENT SYSTEM
-- ============================================================================

-- Course Payments Table
CREATE TABLE IF NOT EXISTS public.course_payments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    course_id uuid,
    amount numeric NOT NULL,
    transaction_id text NOT NULL UNIQUE,
    provider_transaction_id text,
    status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'success'::text, 'failed'::text, 'refunded'::text])),
    payment_method text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT course_payments_pkey PRIMARY KEY (id),
    CONSTRAINT course_payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT course_payments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE SET NULL
);

-- Test Series Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    series_id uuid NOT NULL,
    amount numeric NOT NULL,
    status text NOT NULL DEFAULT 'pending'::text,
    phonepe_transaction_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT payments_pkey PRIMARY KEY (id),
    CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT payments_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.test_series(id) ON DELETE CASCADE
);

-- ============================================================================
-- GAMIFICATION & REWARDS SYSTEM
-- ============================================================================

-- User Rewards Table
CREATE TABLE IF NOT EXISTS public.user_rewards (
    user_id uuid NOT NULL,
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
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_rewards_pkey PRIMARY KEY (user_id),
    CONSTRAINT user_rewards_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Reward Transactions Table
CREATE TABLE IF NOT EXISTS public.reward_transactions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    amount integer NOT NULL,
    action_type text NOT NULL,
    entity_id text,
    description text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT reward_transactions_pkey PRIMARY KEY (id),
    CONSTRAINT reward_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- User Badges Table
CREATE TABLE IF NOT EXISTS public.user_badges (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    badge_id text NOT NULL,
    earned_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_badges_pkey PRIMARY KEY (id),
    CONSTRAINT user_badges_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT user_badges_user_badge_unique UNIQUE (user_id, badge_id)
);

-- Daily Missions Table
CREATE TABLE IF NOT EXISTS public.daily_missions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    date date DEFAULT CURRENT_DATE,
    missions jsonb DEFAULT '[]'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT daily_missions_pkey PRIMARY KEY (id),
    CONSTRAINT daily_missions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT daily_missions_user_date_unique UNIQUE (user_id, date)
);

-- ============================================================================
-- COMMUNITY SYSTEM
-- ============================================================================

-- Community Channels Table
CREATE TABLE IF NOT EXISTS public.community_channels (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    course_id uuid NOT NULL,
    name text NOT NULL,
    type text NOT NULL CHECK (type IN ('announcement', 'discussion', 'qa')),
    description text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT community_channels_pkey PRIMARY KEY (id),
    CONSTRAINT community_channels_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
);

-- Community Messages Table
CREATE TABLE IF NOT EXISTS public.community_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    channel_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    attachments jsonb DEFAULT '[]'::jsonb,
    is_pinned boolean DEFAULT false,
    is_announcement boolean DEFAULT false,
    parent_message_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT community_messages_pkey PRIMARY KEY (id),
    CONSTRAINT community_messages_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.community_channels(id) ON DELETE CASCADE,
    CONSTRAINT community_messages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT community_messages_parent_message_id_fkey FOREIGN KEY (parent_message_id) REFERENCES public.community_messages(id) ON DELETE CASCADE
);

-- Community Reactions Table
CREATE TABLE IF NOT EXISTS public.community_reactions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    message_id uuid NOT NULL,
    user_id uuid NOT NULL,
    emoji text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT community_reactions_pkey PRIMARY KEY (id),
    CONSTRAINT community_reactions_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.community_messages(id) ON DELETE CASCADE,
    CONSTRAINT community_reactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT community_reactions_unique UNIQUE (message_id, user_id, emoji)
);

-- Community Bookmarks Table
CREATE TABLE IF NOT EXISTS public.community_bookmarks (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    message_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT community_bookmarks_pkey PRIMARY KEY (id),
    CONSTRAINT community_bookmarks_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.community_messages(id) ON DELETE CASCADE,
    CONSTRAINT community_bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT community_bookmarks_unique UNIQUE (message_id, user_id)
);

-- ============================================================================
-- NOTIFICATIONS SYSTEM
-- ============================================================================

-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read boolean DEFAULT false,
    link text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT notifications_pkey PRIMARY KEY (id),
    CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- ============================================================================
-- CHAT SYSTEM (AI Assistant)
-- ============================================================================

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    title text NOT NULL,
    user_id uuid,
    CONSTRAINT chat_sessions_pkey PRIMARY KEY (id)
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    session_id uuid NOT NULL,
    role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'ai'::text])),
    content text NOT NULL,
    CONSTRAINT chat_messages_pkey PRIMARY KEY (id),
    CONSTRAINT chat_messages_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id) ON DELETE CASCADE
);

-- ============================================================================
-- BUNNY CDN SETTINGS
-- ============================================================================

-- Bunny Settings Table
CREATE TABLE IF NOT EXISTS public.bunny_settings (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL UNIQUE,
    bunny_api_key text NOT NULL,
    bunny_library_id text NOT NULL,
    bunny_stream_library_id text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT bunny_settings_pkey PRIMARY KEY (id),
    CONSTRAINT bunny_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Live Stream Sessions Table
CREATE TABLE IF NOT EXISTS public.live_stream_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    lesson_id uuid NOT NULL,
    bunny_stream_id text NOT NULL,
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    status text DEFAULT 'scheduled'::text CHECK (status = ANY (ARRAY['scheduled'::text, 'live'::text, 'ended'::text, 'cancelled'::text])),
    viewer_count integer DEFAULT 0,
    duration_seconds integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT live_stream_sessions_pkey PRIMARY KEY (id),
    CONSTRAINT live_stream_sessions_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE
);

-- ============================================================================
-- ADD MISSING FOREIGN KEYS
-- ============================================================================

-- Add payment_id foreign key to enrollments (if not exists)
DO $$ BEGIN
    ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_payment_id_fkey 
    FOREIGN KEY (payment_id) REFERENCES public.course_payments(id) ON DELETE SET NULL;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- PERFORMANCE INDEXES
-- ============================================================================

-- Foreign Key Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON public.profiles(referred_by);
CREATE INDEX IF NOT EXISTS idx_courses_creator_id ON public.courses(creator_id);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module_id ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_exam_id ON public.lessons(exam_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_last_accessed_lesson_id ON public.enrollments(last_accessed_lesson_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_payment_id ON public.enrollments(payment_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON public.lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_course_id ON public.lesson_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_course_id ON public.reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_exams_admin_id ON public.exams(admin_id);
CREATE INDEX IF NOT EXISTS idx_exams_created_by ON public.exams(created_by);
CREATE INDEX IF NOT EXISTS idx_sections_exam_id ON public.sections(exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_section_id ON public.questions(section_id);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON public.options(question_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam_id ON public.exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_student_id ON public.exam_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_responses_attempt_id ON public.responses(attempt_id);
CREATE INDEX IF NOT EXISTS idx_responses_question_id ON public.responses(question_id);
CREATE INDEX IF NOT EXISTS idx_results_attempt_id ON public.results(attempt_id);
CREATE INDEX IF NOT EXISTS idx_section_results_result_id ON public.section_results(result_id);
CREATE INDEX IF NOT EXISTS idx_section_results_section_id ON public.section_results(section_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_admin_id ON public.question_bank(admin_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_options_question_id ON public.question_bank_options(question_id);
CREATE INDEX IF NOT EXISTS idx_student_uploaded_pdfs_uploader_id ON public.student_uploaded_pdfs(uploader_id);
CREATE INDEX IF NOT EXISTS idx_student_uploaded_pdfs_exam_id ON public.student_uploaded_pdfs(exam_id);
CREATE INDEX IF NOT EXISTS idx_test_series_admin_id ON public.test_series(admin_id);
CREATE INDEX IF NOT EXISTS idx_test_series_exams_series_id ON public.test_series_exams(test_series_id);
CREATE INDEX IF NOT EXISTS idx_test_series_exams_exam_id ON public.test_series_exams(exam_id);
CREATE INDEX IF NOT EXISTS idx_test_series_enrollments_series_id ON public.test_series_enrollments(test_series_id);
CREATE INDEX IF NOT EXISTS idx_test_series_enrollments_student_id ON public.test_series_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_course_payments_user_id ON public.course_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_payments_course_id ON public.course_payments(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_series_id ON public.payments(series_id);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_user_id ON public.reward_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_missions_user_id ON public.daily_missions(user_id);
CREATE INDEX IF NOT EXISTS idx_community_channels_course_id ON public.community_channels(course_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_channel_id ON public.community_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_user_id ON public.community_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_parent_id ON public.community_messages(parent_message_id);
CREATE INDEX IF NOT EXISTS idx_community_reactions_message_id ON public.community_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_community_reactions_user_id ON public.community_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_community_bookmarks_message_id ON public.community_bookmarks(message_id);
CREATE INDEX IF NOT EXISTS idx_community_bookmarks_user_id ON public.community_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_bunny_settings_user_id ON public.bunny_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_live_stream_sessions_lesson_id ON public.live_stream_sessions(lesson_id);

-- Composite Indexes for Frequent Queries
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course_status ON public.enrollments(user_id, course_id, status);
CREATE INDEX IF NOT EXISTS idx_modules_order ON public.modules(course_id, module_order);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON public.lessons(module_id, lesson_order);
CREATE INDEX IF NOT EXISTS idx_lessons_is_free_preview ON public.lessons(is_free_preview);
CREATE INDEX IF NOT EXISTS idx_courses_published_created ON public.courses(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_courses_is_published ON public.courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON public.courses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_messages_channel_created ON public.community_messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user_created ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_created_at ON public.exam_attempts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_created_at ON public.reward_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reward_transactions_action_type ON public.reward_transactions(user_id, action_type, created_at DESC);

-- JSONB Indexes (GIN)
CREATE INDEX IF NOT EXISTS idx_course_payments_metadata ON public.course_payments USING gin (metadata);
CREATE INDEX IF NOT EXISTS idx_community_messages_attachments ON public.community_messages USING gin (attachments);
CREATE INDEX IF NOT EXISTS idx_daily_missions_missions ON public.daily_missions USING gin (missions);

-- Text Search Index
CREATE INDEX IF NOT EXISTS idx_courses_title_trgm ON public.courses USING gin (title gin_trgm_ops);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_uploaded_pdfs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_series_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_series_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bunny_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_stream_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses Policies
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (is_published = true OR creator_id = auth.uid());

DROP POLICY IF EXISTS "Creators can manage their courses" ON public.courses;
CREATE POLICY "Creators can manage their courses" ON public.courses FOR ALL USING (creator_id = auth.uid());

-- Modules Policies
DROP POLICY IF EXISTS "Anyone can view modules of published courses" ON public.modules;
CREATE POLICY "Anyone can view modules of published courses" ON public.modules FOR SELECT USING (
    course_id IN (SELECT id FROM public.courses WHERE is_published = true OR creator_id = auth.uid())
);

DROP POLICY IF EXISTS "Course creators can manage modules" ON public.modules;
CREATE POLICY "Course creators can manage modules" ON public.modules FOR ALL USING (
    course_id IN (SELECT id FROM public.courses WHERE creator_id = auth.uid())
);

-- Lessons Policies
DROP POLICY IF EXISTS "Anyone can view lessons of published courses" ON public.lessons;
CREATE POLICY "Anyone can view lessons of published courses" ON public.lessons FOR SELECT USING (
    module_id IN (
        SELECT m.id FROM public.modules m
        JOIN public.courses c ON m.course_id = c.id
        WHERE c.is_published = true OR c.creator_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Course creators can manage lessons" ON public.lessons;
CREATE POLICY "Course creators can manage lessons" ON public.lessons FOR ALL USING (
    module_id IN (
        SELECT m.id FROM public.modules m
        JOIN public.courses c ON m.course_id = c.id
        WHERE c.creator_id = auth.uid()
    )
);

-- Enrollments Policies
DROP POLICY IF EXISTS "Users can view their enrollments" ON public.enrollments;
CREATE POLICY "Users can view their enrollments" ON public.enrollments FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create enrollments" ON public.enrollments;
CREATE POLICY "Users can create enrollments" ON public.enrollments FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their enrollments" ON public.enrollments;
CREATE POLICY "Users can update their enrollments" ON public.enrollments FOR UPDATE USING (user_id = auth.uid());

-- Lesson Progress Policies
DROP POLICY IF EXISTS "Users can view own progress" ON public.lesson_progress;
CREATE POLICY "Users can view own progress" ON public.lesson_progress FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own progress" ON public.lesson_progress;
CREATE POLICY "Users can manage own progress" ON public.lesson_progress FOR ALL USING (user_id = auth.uid());

-- Reviews Policies
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enrolled users can create reviews" ON public.reviews;
CREATE POLICY "Enrolled users can create reviews" ON public.reviews FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    course_id IN (SELECT course_id FROM public.enrollments WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (user_id = auth.uid());

-- Exam Attempts Policies
DROP POLICY IF EXISTS "Students can view own attempts" ON public.exam_attempts;
CREATE POLICY "Students can view own attempts" ON public.exam_attempts FOR SELECT USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can create attempts" ON public.exam_attempts;
CREATE POLICY "Students can create attempts" ON public.exam_attempts FOR INSERT WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can update own attempts" ON public.exam_attempts;
CREATE POLICY "Students can update own attempts" ON public.exam_attempts FOR UPDATE USING (student_id = auth.uid());

-- Responses Policies
DROP POLICY IF EXISTS "Students can manage own responses" ON public.responses;
CREATE POLICY "Students can manage own responses" ON public.responses FOR ALL USING (
    attempt_id IN (SELECT id FROM public.exam_attempts WHERE student_id = auth.uid())
);

-- Results Policies
DROP POLICY IF EXISTS "Students can view own results" ON public.results;
CREATE POLICY "Students can view own results" ON public.results FOR SELECT USING (
    attempt_id IN (SELECT id FROM public.exam_attempts WHERE student_id = auth.uid())
);

-- Section Results Policies
DROP POLICY IF EXISTS "Students can view own section results" ON public.section_results;
CREATE POLICY "Students can view own section results" ON public.section_results FOR SELECT USING (
    result_id IN (
        SELECT r.id FROM public.results r
        JOIN public.exam_attempts ea ON r.attempt_id = ea.id
        WHERE ea.student_id = auth.uid()
    )
);

-- Exams Policies
DROP POLICY IF EXISTS "Anyone can view published exams" ON public.exams;
CREATE POLICY "Anyone can view published exams" ON public.exams FOR SELECT USING (
    is_published = true OR admin_id = auth.uid() OR created_by = auth.uid()
);

DROP POLICY IF EXISTS "Admins can manage exams" ON public.exams;
CREATE POLICY "Admins can manage exams" ON public.exams FOR ALL USING (
    admin_id = auth.uid() OR created_by = auth.uid()
);

-- Sections Policies
DROP POLICY IF EXISTS "Anyone can view sections of published exams" ON public.sections;
CREATE POLICY "Anyone can view sections of published exams" ON public.sections FOR SELECT USING (
    exam_id IN (SELECT id FROM public.exams WHERE is_published = true OR admin_id = auth.uid() OR created_by = auth.uid())
);

DROP POLICY IF EXISTS "Exam creators can manage sections" ON public.sections;
CREATE POLICY "Exam creators can manage sections" ON public.sections FOR ALL USING (
    exam_id IN (SELECT id FROM public.exams WHERE admin_id = auth.uid() OR created_by = auth.uid())
);

-- Questions Policies
DROP POLICY IF EXISTS "Anyone can view questions of published exams" ON public.questions;
CREATE POLICY "Anyone can view questions of published exams" ON public.questions FOR SELECT USING (
    section_id IN (
        SELECT s.id FROM public.sections s
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.is_published = true OR e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can manage questions" ON public.questions;
CREATE POLICY "Exam creators can manage questions" ON public.questions FOR ALL USING (
    section_id IN (
        SELECT s.id FROM public.sections s
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

-- Options Policies
DROP POLICY IF EXISTS "Anyone can view options of published exams" ON public.options;
CREATE POLICY "Anyone can view options of published exams" ON public.options FOR SELECT USING (
    question_id IN (
        SELECT q.id FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.is_published = true OR e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can manage options" ON public.options;
CREATE POLICY "Exam creators can manage options" ON public.options FOR ALL USING (
    question_id IN (
        SELECT q.id FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

-- Notifications Policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;
CREATE POLICY "Anyone can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- User Rewards Policies
DROP POLICY IF EXISTS "Users can view own rewards" ON public.user_rewards;
CREATE POLICY "Users can view own rewards" ON public.user_rewards FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own rewards" ON public.user_rewards;
CREATE POLICY "Users can update own rewards" ON public.user_rewards FOR ALL USING (user_id = auth.uid());

-- Reward Transactions Policies
DROP POLICY IF EXISTS "Users can view own transactions" ON public.reward_transactions;
CREATE POLICY "Users can view own transactions" ON public.reward_transactions FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "System can insert transactions" ON public.reward_transactions;
CREATE POLICY "System can insert transactions" ON public.reward_transactions FOR INSERT WITH CHECK (true);

-- Daily Missions Policies
DROP POLICY IF EXISTS "Users can view own missions" ON public.daily_missions;
CREATE POLICY "Users can view own missions" ON public.daily_missions FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own missions" ON public.daily_missions;
CREATE POLICY "Users can manage own missions" ON public.daily_missions FOR ALL USING (user_id = auth.uid());

-- Community Policies
DROP POLICY IF EXISTS "Enrolled users can view channels" ON public.community_channels;
CREATE POLICY "Enrolled users can view channels" ON public.community_channels FOR SELECT USING (
    course_id IN (SELECT course_id FROM public.enrollments WHERE user_id = auth.uid() AND status = 'active')
    OR course_id IN (SELECT id FROM public.courses WHERE creator_id = auth.uid())
);

DROP POLICY IF EXISTS "Course creators can manage channels" ON public.community_channels;
CREATE POLICY "Course creators can manage channels" ON public.community_channels FOR ALL USING (
    course_id IN (SELECT id FROM public.courses WHERE creator_id = auth.uid())
);

DROP POLICY IF EXISTS "Enrolled users can view messages" ON public.community_messages;
CREATE POLICY "Enrolled users can view messages" ON public.community_messages FOR SELECT USING (
    channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.enrollments e ON cc.course_id = e.course_id
        WHERE e.user_id = auth.uid() AND e.status = 'active'
    ) OR channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.courses c ON cc.course_id = c.id
        WHERE c.creator_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Enrolled users can create messages" ON public.community_messages;
CREATE POLICY "Enrolled users can create messages" ON public.community_messages FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.enrollments e ON cc.course_id = e.course_id
        WHERE e.user_id = auth.uid() AND e.status = 'active'
    )
);

DROP POLICY IF EXISTS "Users can update own messages" ON public.community_messages;
CREATE POLICY "Users can update own messages" ON public.community_messages FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own messages" ON public.community_messages;
CREATE POLICY "Users can delete own messages" ON public.community_messages FOR DELETE USING (user_id = auth.uid());

-- Community Reactions Policies
DROP POLICY IF EXISTS "Enrolled users can view reactions" ON public.community_reactions;
CREATE POLICY "Enrolled users can view reactions" ON public.community_reactions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enrolled users can manage reactions" ON public.community_reactions;
CREATE POLICY "Enrolled users can manage reactions" ON public.community_reactions FOR ALL USING (user_id = auth.uid());

-- Community Bookmarks Policies
DROP POLICY IF EXISTS "Users can manage own bookmarks" ON public.community_bookmarks;
CREATE POLICY "Users can manage own bookmarks" ON public.community_bookmarks FOR ALL USING (user_id = auth.uid());

-- Chat Policies
DROP POLICY IF EXISTS "Users can view own sessions" ON public.chat_sessions;
CREATE POLICY "Users can view own sessions" ON public.chat_sessions FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own sessions" ON public.chat_sessions;
CREATE POLICY "Users can manage own sessions" ON public.chat_sessions FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view messages in own sessions" ON public.chat_messages;
CREATE POLICY "Users can view messages in own sessions" ON public.chat_messages FOR SELECT USING (
    session_id IN (SELECT id FROM public.chat_sessions WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can create messages in own sessions" ON public.chat_messages;
CREATE POLICY "Users can create messages in own sessions" ON public.chat_messages FOR INSERT WITH CHECK (
    session_id IN (SELECT id FROM public.chat_sessions WHERE user_id = auth.uid())
);

-- Payment Policies
DROP POLICY IF EXISTS "Users can view own payments" ON public.course_payments;
CREATE POLICY "Users can view own payments" ON public.course_payments FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create payments" ON public.course_payments;
CREATE POLICY "Users can create payments" ON public.course_payments FOR INSERT WITH CHECK (user_id = auth.uid());

-- Bunny Settings Policies
DROP POLICY IF EXISTS "Users can manage own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can manage own bunny settings" ON public.bunny_settings FOR ALL USING (user_id = auth.uid());

-- ============================================================================
-- ENABLE REALTIME
-- ============================================================================

-- Enable Realtime for notifications table
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enable Realtime for community messages
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE community_messages;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- END OF SCHEMA FILE
-- ============================================================================
