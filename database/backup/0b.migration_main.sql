-- ============================================================================
-- STEP 1: RUN 0a.helper_functions.sql FIRST!
-- Then run this complete migration script
-- ============================================================================

-- ============================================================================
-- STEP 2: CREATE TENANTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tenants_slug ON public.tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_custom_domain ON public.tenants(custom_domain) WHERE custom_domain IS NOT NULL;

-- ============================================================================
-- STEP 3: CREATE USER_TENANT_MEMBERSHIPS JUNCTION TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_tenant_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student', 'creator')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, tenant_id)
);

CREATE INDEX IF NOT EXISTS idx_user_tenant_memberships_user_id ON public.user_tenant_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tenant_memberships_tenant_id ON public.user_tenant_memberships(tenant_id);
CREATE INDEX IF NOT EXISTS idx_user_tenant_memberships_active ON public.user_tenant_memberships(user_id, tenant_id, is_active);

-- ============================================================================
-- STEP 4: ADD TENANT_ID TO CONTENT TABLES
-- ============================================================================

ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.modules ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.lesson_progress ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.sections ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.options ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.exam_attempts ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.results ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.section_results ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.question_bank ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.question_bank_options ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.student_uploaded_pdfs ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.course_payments ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.community_channels ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.community_messages ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.community_reactions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.community_bookmarks ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.chat_sessions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.chat_messages ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.bunny_settings ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.live_stream_sessions ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;
ALTER TABLE public.enrollment_logs ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE;

-- ============================================================================
-- STEP 5: CREATE DEFAULT TENANT
-- ============================================================================

INSERT INTO public.tenants (id, name, slug, custom_domain, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'mathentics',
  'mathentics',
  'www.mathentics.com',
  true
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 6: MIGRATE EXISTING USERS TO DEFAULT TENANT
-- ============================================================================

INSERT INTO public.user_tenant_memberships (user_id, tenant_id, role)
SELECT id, '00000000-0000-0000-0000-000000000001', role
FROM public.profiles
ON CONFLICT (user_id, tenant_id) DO NOTHING;

-- ============================================================================
-- STEP 7: BACKFILL TENANT_ID FOR EXISTING DATA
-- ============================================================================

UPDATE public.courses SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.modules SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.lessons SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.enrollments SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.lesson_progress SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.reviews SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.exams SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.sections SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.questions SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.options SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.exam_attempts SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.responses SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.results SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.section_results SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.question_bank SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.question_bank_options SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.student_uploaded_pdfs SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.course_payments SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.payments SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.community_channels SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.community_messages SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.community_reactions SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.community_bookmarks SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.notifications SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.chat_sessions SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.chat_messages SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.bunny_settings SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.live_stream_sessions SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;
UPDATE public.enrollment_logs SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

-- ============================================================================
-- STEP 8: SET TENANT_ID AS NOT NULL
-- ============================================================================

ALTER TABLE public.courses ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.modules ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.lessons ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.enrollments ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.lesson_progress ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.reviews ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.exams ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.sections ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.questions ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.options ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.exam_attempts ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.responses ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.results ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.section_results ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.question_bank ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.question_bank_options ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.student_uploaded_pdfs ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.course_payments ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.payments ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.community_channels ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.community_messages ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.community_reactions ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.community_bookmarks ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.notifications ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.chat_sessions ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.chat_messages ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.bunny_settings ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.live_stream_sessions ALTER COLUMN tenant_id SET NOT NULL;
ALTER TABLE public.enrollment_logs ALTER COLUMN tenant_id SET NOT NULL;

-- ============================================================================
-- STEP 9: CREATE TENANT-SCOPED INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_courses_tenant_id ON public.courses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_courses_tenant_published ON public.courses(tenant_id, is_published);
CREATE INDEX IF NOT EXISTS idx_modules_tenant_id ON public.modules(tenant_id);
CREATE INDEX IF NOT EXISTS idx_lessons_tenant_id ON public.lessons(tenant_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_tenant_user ON public.enrollments(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_tenant_user ON public.lesson_progress(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_tenant_id ON public.reviews(tenant_id);
CREATE INDEX IF NOT EXISTS idx_exams_tenant_status ON public.exams(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_sections_tenant_id ON public.sections(tenant_id);
CREATE INDEX IF NOT EXISTS idx_questions_tenant_id ON public.questions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_options_tenant_id ON public.options(tenant_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_tenant_student ON public.exam_attempts(tenant_id, student_id);
CREATE INDEX IF NOT EXISTS idx_responses_tenant_id ON public.responses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_results_tenant_id ON public.results(tenant_id);
CREATE INDEX IF NOT EXISTS idx_section_results_tenant_id ON public.section_results(tenant_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_tenant_id ON public.question_bank(tenant_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_options_tenant_id ON public.question_bank_options(tenant_id);
CREATE INDEX IF NOT EXISTS idx_student_pdfs_tenant_id ON public.student_uploaded_pdfs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_course_payments_tenant_user ON public.course_payments(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_payments_tenant_user ON public.payments(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_community_channels_tenant_id ON public.community_channels(tenant_id);
CREATE INDEX IF NOT EXISTS idx_community_messages_tenant_id ON public.community_messages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_community_reactions_tenant_id ON public.community_reactions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_community_bookmarks_tenant_id ON public.community_bookmarks(tenant_id);
CREATE INDEX IF NOT EXISTS idx_notifications_tenant_user ON public.notifications(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_tenant_user ON public.chat_sessions(tenant_id, user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_tenant_id ON public.chat_messages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bunny_settings_tenant_id ON public.bunny_settings(tenant_id);
CREATE INDEX IF NOT EXISTS idx_live_stream_sessions_tenant_id ON public.live_stream_sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_tenant_id ON public.enrollment_logs(tenant_id);

-- ============================================================================
-- STEP 10: ENABLE RLS ON NEW TABLES
-- ============================================================================

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tenant_memberships ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 11: CREATE RLS POLICIES FOR TENANTS TABLE
-- ============================================================================

DO $$ BEGIN
  CREATE POLICY "Anyone can view active tenants" ON public.tenants
    FOR SELECT USING (is_active = true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- STEP 12: CREATE RLS POLICIES FOR USER_TENANT_MEMBERSHIPS
-- ============================================================================

DO $$ BEGIN
  CREATE POLICY "Users can view own memberships" ON public.user_tenant_memberships
    FOR SELECT USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- STEP 13: UPDATE RLS POLICIES FOR CONTENT TABLES
-- ============================================================================

-- Courses
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
DROP POLICY IF EXISTS "Creators can manage their courses" ON public.courses;
DROP POLICY IF EXISTS "Creators can update their courses" ON public.courses;
DROP POLICY IF EXISTS "Creators can delete their courses" ON public.courses;

CREATE POLICY "tenant_isolation_courses_select" ON public.courses
  FOR SELECT USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
    AND (is_published = true OR creator_id = auth.uid())
  );

CREATE POLICY "tenant_isolation_courses_insert" ON public.courses
  FOR INSERT WITH CHECK (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
    AND creator_id = auth.uid()
  );

CREATE POLICY "tenant_isolation_courses_update" ON public.courses
  FOR UPDATE USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
    AND creator_id = auth.uid()
  );

CREATE POLICY "tenant_isolation_courses_delete" ON public.courses
  FOR DELETE USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
    AND creator_id = auth.uid()
  );

-- Modules
DROP POLICY IF EXISTS "Anyone can view modules of published courses" ON public.modules;
DROP POLICY IF EXISTS "Course creators can manage modules" ON public.modules;

CREATE POLICY "tenant_isolation_modules" ON public.modules
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Lessons
DROP POLICY IF EXISTS "Anyone can view lessons of published courses or free previews" ON public.lessons;
DROP POLICY IF EXISTS "Course creators can manage lessons" ON public.lessons;

CREATE POLICY "tenant_isolation_lessons" ON public.lessons
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Enrollments
DROP POLICY IF EXISTS "Users can view their enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Course creators can view enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Users can update their enrollments" ON public.enrollments;

CREATE POLICY "tenant_isolation_enrollments" ON public.enrollments
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Lesson Progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Users can manage own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Users can delete own progress" ON public.lesson_progress;

CREATE POLICY "tenant_isolation_lesson_progress" ON public.lesson_progress
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
    AND user_id = auth.uid()
  );

-- Reviews
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;

CREATE POLICY "tenant_isolation_reviews" ON public.reviews
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Exams
DROP POLICY IF EXISTS "Anyone can view published exams" ON public.exams;
DROP POLICY IF EXISTS "Exam creators can update exams" ON public.exams;
DROP POLICY IF EXISTS "Exam creators can delete exams" ON public.exams;

CREATE POLICY "tenant_isolation_exams" ON public.exams
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Sections
DROP POLICY IF EXISTS "Anyone can view sections of published exams" ON public.sections;
DROP POLICY IF EXISTS "Exam creators can manage sections" ON public.sections;

CREATE POLICY "tenant_isolation_sections" ON public.sections
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Questions
DROP POLICY IF EXISTS "Anyone can view questions of published exams" ON public.questions;
DROP POLICY IF EXISTS "Exam creators can manage questions" ON public.questions;

CREATE POLICY "tenant_isolation_questions" ON public.questions
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Options
DROP POLICY IF EXISTS "Anyone can view options of published exams" ON public.options;
DROP POLICY IF EXISTS "Exam creators can manage options" ON public.options;

CREATE POLICY "tenant_isolation_options" ON public.options
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Exam Attempts
DROP POLICY IF EXISTS "Students can view own attempts" ON public.exam_attempts;
DROP POLICY IF EXISTS "Exam creators can view all attempts" ON public.exam_attempts;
DROP POLICY IF EXISTS "Students can update own attempts" ON public.exam_attempts;

CREATE POLICY "tenant_isolation_exam_attempts" ON public.exam_attempts
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Responses
DROP POLICY IF EXISTS "Students can view own responses" ON public.responses;
DROP POLICY IF EXISTS "Students can manage own responses" ON public.responses;
DROP POLICY IF EXISTS "Students can update own responses" ON public.responses;
DROP POLICY IF EXISTS "Students can delete own responses" ON public.responses;

CREATE POLICY "tenant_isolation_responses" ON public.responses
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Results
DROP POLICY IF EXISTS "Students can view own results" ON public.results;
DROP POLICY IF EXISTS "Exam creators can view all results" ON public.results;

CREATE POLICY "tenant_isolation_results" ON public.results
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Section Results
DROP POLICY IF EXISTS "Students can view own section results" ON public.section_results;
DROP POLICY IF EXISTS "Exam creators can view all section results" ON public.section_results;

CREATE POLICY "tenant_isolation_section_results" ON public.section_results
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Question Bank
DROP POLICY IF EXISTS "Admins can view own question bank" ON public.question_bank;
DROP POLICY IF EXISTS "Admins can manage own question bank" ON public.question_bank;

CREATE POLICY "tenant_isolation_question_bank" ON public.question_bank
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Question Bank Options
DROP POLICY IF EXISTS "Admins can view own question bank options" ON public.question_bank_options;
DROP POLICY IF EXISTS "Admins can manage own question bank options" ON public.question_bank_options;

CREATE POLICY "tenant_isolation_question_bank_options" ON public.question_bank_options
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Student Uploaded PDFs
DROP POLICY IF EXISTS "Students can view own uploaded PDFs" ON public.student_uploaded_pdfs;
DROP POLICY IF EXISTS "Students can manage own uploaded PDFs" ON public.student_uploaded_pdfs;

CREATE POLICY "tenant_isolation_student_pdfs" ON public.student_uploaded_pdfs
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Course Payments
DROP POLICY IF EXISTS "Users can view own course payments" ON public.course_payments;
DROP POLICY IF EXISTS "Course creators can view payments for their courses" ON public.course_payments;

CREATE POLICY "tenant_isolation_course_payments" ON public.course_payments
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Payments
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;

CREATE POLICY "tenant_isolation_payments" ON public.payments
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Community Channels
DROP POLICY IF EXISTS "Enrolled users can view channels" ON public.community_channels;
DROP POLICY IF EXISTS "Course creators can manage channels" ON public.community_channels;

CREATE POLICY "tenant_isolation_community_channels" ON public.community_channels
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Community Messages
DROP POLICY IF EXISTS "Enrolled users can view messages" ON public.community_messages;
DROP POLICY IF EXISTS "Users can update own messages" ON public.community_messages;
DROP POLICY IF EXISTS "Users can delete own messages" ON public.community_messages;
DROP POLICY IF EXISTS "Course creators can manage all messages" ON public.community_messages;

CREATE POLICY "tenant_isolation_community_messages" ON public.community_messages
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Community Reactions
DROP POLICY IF EXISTS "Enrolled users can view reactions" ON public.community_reactions;
DROP POLICY IF EXISTS "Users can delete own reactions" ON public.community_reactions;

CREATE POLICY "tenant_isolation_community_reactions" ON public.community_reactions
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Community Bookmarks
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.community_bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.community_bookmarks;

CREATE POLICY "tenant_isolation_community_bookmarks" ON public.community_bookmarks
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Notifications
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;

CREATE POLICY "tenant_isolation_notifications" ON public.notifications
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
    AND user_id = auth.uid()
  );

-- Chat Sessions
DROP POLICY IF EXISTS "Users can view own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can delete own chat sessions" ON public.chat_sessions;

CREATE POLICY "tenant_isolation_chat_sessions" ON public.chat_sessions
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Chat Messages
DROP POLICY IF EXISTS "Users can view messages in own sessions" ON public.chat_messages;

CREATE POLICY "tenant_isolation_chat_messages" ON public.chat_messages
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Bunny Settings
DROP POLICY IF EXISTS "Users can view own bunny settings" ON public.bunny_settings;
DROP POLICY IF EXISTS "Users can update own bunny settings" ON public.bunny_settings;
DROP POLICY IF EXISTS "Users can delete own bunny settings" ON public.bunny_settings;

CREATE POLICY "tenant_isolation_bunny_settings" ON public.bunny_settings
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Live Stream Sessions
DROP POLICY IF EXISTS "Anyone can view live stream sessions" ON public.live_stream_sessions;
DROP POLICY IF EXISTS "Course creators can manage live stream sessions" ON public.live_stream_sessions;

CREATE POLICY "tenant_isolation_live_stream_sessions" ON public.live_stream_sessions
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- Enrollment Logs
DROP POLICY IF EXISTS "Admins can view all enrollment logs" ON public.enrollment_logs;

CREATE POLICY "tenant_isolation_enrollment_logs" ON public.enrollment_logs
  FOR ALL USING (
    tenant_id = public.get_current_tenant_id() 
    AND public.user_has_tenant_access()
  );

-- ============================================================================
-- MIGRATION COMPLETE!
-- ============================================================================
