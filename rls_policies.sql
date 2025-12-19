-- ============================================================================
-- SUPABASE DATABASE SCHEMA RECONSTRUCTION
-- FILE 3: ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
-- This file contains all Row Level Security policies for every table.
-- Execute this file AFTER running full_schema.sql and logic_and_triggers.sql
-- OR run this separately to update/recreate policies on existing tables.
-- ============================================================================

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================

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

-- ============================================================================
-- PROFILES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles" 
ON public.profiles FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- ============================================================================
-- COURSES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
CREATE POLICY "Anyone can view published courses" 
ON public.courses FOR SELECT 
USING (is_published = true OR creator_id = auth.uid());

DROP POLICY IF EXISTS "Creators can insert their courses" ON public.courses;
CREATE POLICY "Creators can insert their courses" 
ON public.courses FOR INSERT 
WITH CHECK (creator_id = auth.uid());

DROP POLICY IF EXISTS "Creators can update their courses" ON public.courses;
CREATE POLICY "Creators can update their courses" 
ON public.courses FOR UPDATE 
USING (creator_id = auth.uid());

DROP POLICY IF EXISTS "Creators can delete their courses" ON public.courses;
CREATE POLICY "Creators can delete their courses" 
ON public.courses FOR DELETE 
USING (creator_id = auth.uid());

-- ============================================================================
-- MODULES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view modules of published courses" ON public.modules;
CREATE POLICY "Anyone can view modules of published courses" 
ON public.modules FOR SELECT 
USING (
    course_id IN (
        SELECT id FROM public.courses 
        WHERE is_published = true OR creator_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Course creators can manage modules" ON public.modules;
CREATE POLICY "Course creators can manage modules" 
ON public.modules FOR ALL 
USING (
    course_id IN (
        SELECT id FROM public.courses WHERE creator_id = auth.uid()
    )
);

-- ============================================================================
-- LESSONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view lessons of published courses or free previews" ON public.lessons;
CREATE POLICY "Anyone can view lessons of published courses or free previews" 
ON public.lessons FOR SELECT 
USING (
    is_free_preview = true OR
    module_id IN (
        SELECT m.id FROM public.modules m
        JOIN public.courses c ON m.course_id = c.id
        WHERE c.is_published = true AND (
            c.creator_id = auth.uid() OR
            EXISTS (
                SELECT 1 FROM public.enrollments e 
                WHERE e.course_id = c.id 
                AND e.user_id = auth.uid() 
                AND e.status = 'active'
            )
        )
    )
);

DROP POLICY IF EXISTS "Course creators can manage lessons" ON public.lessons;
CREATE POLICY "Course creators can manage lessons" 
ON public.lessons FOR ALL 
USING (
    module_id IN (
        SELECT m.id FROM public.modules m
        JOIN public.courses c ON m.course_id = c.id
        WHERE c.creator_id = auth.uid()
    )
);

-- ============================================================================
-- ENROLLMENTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view their enrollments" ON public.enrollments;
CREATE POLICY "Users can view their enrollments" 
ON public.enrollments FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create enrollments" ON public.enrollments;
CREATE POLICY "Users can create enrollments" 
ON public.enrollments FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their enrollments" ON public.enrollments;
CREATE POLICY "Users can update their enrollments" 
ON public.enrollments FOR UPDATE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Course creators can view enrollments" ON public.enrollments;
CREATE POLICY "Course creators can view enrollments" 
ON public.enrollments FOR SELECT 
USING (
    course_id IN (
        SELECT id FROM public.courses WHERE creator_id = auth.uid()
    )
);

-- ============================================================================
-- LESSON PROGRESS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own progress" ON public.lesson_progress;
CREATE POLICY "Users can view own progress" 
ON public.lesson_progress FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own progress" ON public.lesson_progress;
CREATE POLICY "Users can insert own progress" 
ON public.lesson_progress FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own progress" ON public.lesson_progress;
CREATE POLICY "Users can update own progress" 
ON public.lesson_progress FOR UPDATE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own progress" ON public.lesson_progress;
CREATE POLICY "Users can delete own progress" 
ON public.lesson_progress FOR DELETE 
USING (user_id = auth.uid());

-- ============================================================================
-- REVIEWS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews" 
ON public.reviews FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Enrolled users can create reviews" ON public.reviews;
CREATE POLICY "Enrolled users can create reviews" 
ON public.reviews FOR INSERT 
WITH CHECK (
    user_id = auth.uid() AND
    course_id IN (
        SELECT course_id FROM public.enrollments 
        WHERE user_id = auth.uid() AND status = 'active'
    )
);

DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews" 
ON public.reviews FOR UPDATE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
CREATE POLICY "Users can delete own reviews" 
ON public.reviews FOR DELETE 
USING (user_id = auth.uid());

-- ============================================================================
-- EXAMS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view published exams" ON public.exams;
CREATE POLICY "Anyone can view published exams" 
ON public.exams FOR SELECT 
USING (
    status = 'published' OR 
    admin_id = auth.uid() OR 
    created_by = auth.uid()
);

DROP POLICY IF EXISTS "Users can create exams" ON public.exams;
CREATE POLICY "Users can create exams" 
ON public.exams FOR INSERT 
WITH CHECK (admin_id = auth.uid() OR created_by = auth.uid());

DROP POLICY IF EXISTS "Exam creators can update exams" ON public.exams;
CREATE POLICY "Exam creators can update exams" 
ON public.exams FOR UPDATE 
USING (admin_id = auth.uid() OR created_by = auth.uid());

DROP POLICY IF EXISTS "Exam creators can delete exams" ON public.exams;
CREATE POLICY "Exam creators can delete exams" 
ON public.exams FOR DELETE 
USING (admin_id = auth.uid() OR created_by = auth.uid());

-- ============================================================================
-- SECTIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view sections of published exams" ON public.sections;
CREATE POLICY "Anyone can view sections of published exams" 
ON public.sections FOR SELECT 
USING (
    exam_id IN (
        SELECT id FROM public.exams 
        WHERE status = 'published' OR admin_id = auth.uid() OR created_by = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can manage sections" ON public.sections;
CREATE POLICY "Exam creators can manage sections" 
ON public.sections FOR ALL 
USING (
    exam_id IN (
        SELECT id FROM public.exams 
        WHERE admin_id = auth.uid() OR created_by = auth.uid()
    )
);

-- ============================================================================
-- QUESTIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view questions of published exams" ON public.questions;
CREATE POLICY "Anyone can view questions of published exams" 
ON public.questions FOR SELECT 
USING (
    section_id IN (
        SELECT s.id FROM public.sections s
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.status = 'published' OR e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can manage questions" ON public.questions;
CREATE POLICY "Exam creators can manage questions" 
ON public.questions FOR ALL 
USING (
    section_id IN (
        SELECT s.id FROM public.sections s
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

-- ============================================================================
-- OPTIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view options of published exams" ON public.options;
CREATE POLICY "Anyone can view options of published exams" 
ON public.options FOR SELECT 
USING (
    question_id IN (
        SELECT q.id FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.status = 'published' OR e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can manage options" ON public.options;
CREATE POLICY "Exam creators can manage options" 
ON public.options FOR ALL 
USING (
    question_id IN (
        SELECT q.id FROM public.questions q
        JOIN public.sections s ON q.section_id = s.id
        JOIN public.exams e ON s.exam_id = e.id
        WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

-- ============================================================================
-- EXAM ATTEMPTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own attempts" ON public.exam_attempts;
CREATE POLICY "Students can view own attempts" 
ON public.exam_attempts FOR SELECT 
USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can create attempts" ON public.exam_attempts;
CREATE POLICY "Students can create attempts" 
ON public.exam_attempts FOR INSERT 
WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can update own attempts" ON public.exam_attempts;
CREATE POLICY "Students can update own attempts" 
ON public.exam_attempts FOR UPDATE 
USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Exam creators can view all attempts" ON public.exam_attempts;
CREATE POLICY "Exam creators can view all attempts" 
ON public.exam_attempts FOR SELECT 
USING (
    exam_id IN (
        SELECT id FROM public.exams 
        WHERE admin_id = auth.uid() OR created_by = auth.uid()
    )
);

-- ============================================================================
-- RESPONSES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own responses" ON public.responses;
CREATE POLICY "Students can view own responses" 
ON public.responses FOR SELECT 
USING (
    attempt_id IN (
        SELECT id FROM public.exam_attempts WHERE student_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Students can insert own responses" ON public.responses;
CREATE POLICY "Students can insert own responses" 
ON public.responses FOR INSERT 
WITH CHECK (
    attempt_id IN (
        SELECT id FROM public.exam_attempts WHERE student_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Students can update own responses" ON public.responses;
CREATE POLICY "Students can update own responses" 
ON public.responses FOR UPDATE 
USING (
    attempt_id IN (
        SELECT id FROM public.exam_attempts WHERE student_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Students can delete own responses" ON public.responses;
CREATE POLICY "Students can delete own responses" 
ON public.responses FOR DELETE 
USING (
    attempt_id IN (
        SELECT id FROM public.exam_attempts WHERE student_id = auth.uid()
    )
);

-- ============================================================================
-- RESULTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own results" ON public.results;
CREATE POLICY "Students can view own results" 
ON public.results FOR SELECT 
USING (
    attempt_id IN (
        SELECT id FROM public.exam_attempts WHERE student_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can view all results" ON public.results;
CREATE POLICY "Exam creators can view all results" 
ON public.results FOR SELECT 
USING (
    attempt_id IN (
        SELECT ea.id FROM public.exam_attempts ea
        JOIN public.exams e ON ea.exam_id = e.id
        WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

-- ============================================================================
-- SECTION RESULTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own section results" ON public.section_results;
CREATE POLICY "Students can view own section results" 
ON public.section_results FOR SELECT 
USING (
    result_id IN (
        SELECT r.id FROM public.results r
        JOIN public.exam_attempts ea ON r.attempt_id = ea.id
        WHERE ea.student_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Exam creators can view all section results" ON public.section_results;
CREATE POLICY "Exam creators can view all section results" 
ON public.section_results FOR SELECT 
USING (
    result_id IN (
        SELECT r.id FROM public.results r
        JOIN public.exam_attempts ea ON r.attempt_id = ea.id
        JOIN public.exams e ON ea.exam_id = e.id
        WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()
    )
);

-- ============================================================================
-- QUESTION BANK TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view own question bank" ON public.question_bank;
CREATE POLICY "Admins can view own question bank" 
ON public.question_bank FOR SELECT 
USING (admin_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage own question bank" ON public.question_bank;
CREATE POLICY "Admins can manage own question bank" 
ON public.question_bank FOR ALL 
USING (admin_id = auth.uid());

-- ============================================================================
-- QUESTION BANK OPTIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Admins can view own question bank options" ON public.question_bank_options;
CREATE POLICY "Admins can view own question bank options" 
ON public.question_bank_options FOR SELECT 
USING (
    question_id IN (
        SELECT id FROM public.question_bank WHERE admin_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Admins can manage own question bank options" ON public.question_bank_options;
CREATE POLICY "Admins can manage own question bank options" 
ON public.question_bank_options FOR ALL 
USING (
    question_id IN (
        SELECT id FROM public.question_bank WHERE admin_id = auth.uid()
    )
);

-- ============================================================================
-- STUDENT UPLOADED PDFS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own uploaded PDFs" ON public.student_uploaded_pdfs;
CREATE POLICY "Students can view own uploaded PDFs" 
ON public.student_uploaded_pdfs FOR SELECT 
USING (uploader_id = auth.uid());

DROP POLICY IF EXISTS "Students can manage own uploaded PDFs" ON public.student_uploaded_pdfs;
CREATE POLICY "Students can manage own uploaded PDFs" 
ON public.student_uploaded_pdfs FOR ALL 
USING (uploader_id = auth.uid());

-- ============================================================================
-- TEST SERIES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view published test series" ON public.test_series;
CREATE POLICY "Anyone can view published test series" 
ON public.test_series FOR SELECT 
USING (status = 'published' OR admin_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage own test series" ON public.test_series;
CREATE POLICY "Admins can manage own test series" 
ON public.test_series FOR ALL 
USING (admin_id = auth.uid());

-- ============================================================================
-- TEST SERIES EXAMS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view exams in published test series" ON public.test_series_exams;
CREATE POLICY "Anyone can view exams in published test series" 
ON public.test_series_exams FOR SELECT 
USING (
    test_series_id IN (
        SELECT id FROM public.test_series 
        WHERE status = 'published' OR admin_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Test series creators can manage exams" ON public.test_series_exams;
CREATE POLICY "Test series creators can manage exams" 
ON public.test_series_exams FOR ALL 
USING (
    test_series_id IN (
        SELECT id FROM public.test_series WHERE admin_id = auth.uid()
    )
);

-- ============================================================================
-- TEST SERIES ENROLLMENTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Students can view own test series enrollments" ON public.test_series_enrollments;
CREATE POLICY "Students can view own test series enrollments" 
ON public.test_series_enrollments FOR SELECT 
USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can create test series enrollments" ON public.test_series_enrollments;
CREATE POLICY "Students can create test series enrollments" 
ON public.test_series_enrollments FOR INSERT 
WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "Students can update own test series enrollments" ON public.test_series_enrollments;
CREATE POLICY "Students can update own test series enrollments" 
ON public.test_series_enrollments FOR UPDATE 
USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Test series creators can view enrollments" ON public.test_series_enrollments;
CREATE POLICY "Test series creators can view enrollments" 
ON public.test_series_enrollments FOR SELECT 
USING (
    test_series_id IN (
        SELECT id FROM public.test_series WHERE admin_id = auth.uid()
    )
);

-- ============================================================================
-- COURSE PAYMENTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own course payments" ON public.course_payments;
CREATE POLICY "Users can view own course payments" 
ON public.course_payments FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create course payments" ON public.course_payments;
CREATE POLICY "Users can create course payments" 
ON public.course_payments FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Course creators can view payments for their courses" ON public.course_payments;
CREATE POLICY "Course creators can view payments for their courses" 
ON public.course_payments FOR SELECT 
USING (
    course_id IN (
        SELECT id FROM public.courses WHERE creator_id = auth.uid()
    )
);

-- ============================================================================
-- PAYMENTS TABLE (Test Series) POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments" 
ON public.payments FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create payments" ON public.payments;
CREATE POLICY "Users can create payments" 
ON public.payments FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Test series creators can view payments" ON public.payments;
CREATE POLICY "Test series creators can view payments" 
ON public.payments FOR SELECT 
USING (
    series_id IN (
        SELECT id FROM public.test_series WHERE admin_id = auth.uid()
    )
);

-- ============================================================================
-- USER REWARDS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own rewards" ON public.user_rewards;
CREATE POLICY "Users can view own rewards" 
ON public.user_rewards FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own rewards" ON public.user_rewards;
CREATE POLICY "Users can insert own rewards" 
ON public.user_rewards FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own rewards" ON public.user_rewards;
CREATE POLICY "Users can update own rewards" 
ON public.user_rewards FOR UPDATE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own rewards" ON public.user_rewards;
CREATE POLICY "Users can delete own rewards" 
ON public.user_rewards FOR DELETE 
USING (user_id = auth.uid());

-- ============================================================================
-- REWARD TRANSACTIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own reward transactions" ON public.reward_transactions;
CREATE POLICY "Users can view own reward transactions" 
ON public.reward_transactions FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own reward transactions" ON public.reward_transactions;
CREATE POLICY "Users can insert own reward transactions" 
ON public.reward_transactions FOR INSERT 
WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- USER BADGES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own badges" ON public.user_badges;
CREATE POLICY "Users can view own badges" 
ON public.user_badges FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own badges" ON public.user_badges;
CREATE POLICY "Users can insert own badges" 
ON public.user_badges FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can view all badges" ON public.user_badges;
CREATE POLICY "Anyone can view all badges" 
ON public.user_badges FOR SELECT 
USING (true);

-- ============================================================================
-- DAILY MISSIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own daily missions" ON public.daily_missions;
CREATE POLICY "Users can view own daily missions" 
ON public.daily_missions FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own daily missions" ON public.daily_missions;
CREATE POLICY "Users can manage own daily missions" 
ON public.daily_missions FOR ALL 
USING (user_id = auth.uid());

-- ============================================================================
-- COMMUNITY CHANNELS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Enrolled users can view channels" ON public.community_channels;
CREATE POLICY "Enrolled users can view channels" 
ON public.community_channels FOR SELECT 
USING (
    course_id IN (
        SELECT course_id FROM public.enrollments 
        WHERE user_id = auth.uid() AND status = 'active'
    ) OR
    course_id IN (
        SELECT id FROM public.courses WHERE creator_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Course creators can manage channels" ON public.community_channels;
CREATE POLICY "Course creators can manage channels" 
ON public.community_channels FOR ALL 
USING (
    course_id IN (
        SELECT id FROM public.courses WHERE creator_id = auth.uid()
    )
);

-- ============================================================================
-- COMMUNITY MESSAGES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Enrolled users can view messages" ON public.community_messages;
CREATE POLICY "Enrolled users can view messages" 
ON public.community_messages FOR SELECT 
USING (
    channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.enrollments e ON cc.course_id = e.course_id
        WHERE e.user_id = auth.uid() AND e.status = 'active'
    ) OR
    channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.courses c ON cc.course_id = c.id
        WHERE c.creator_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Enrolled users can create messages" ON public.community_messages;
CREATE POLICY "Enrolled users can create messages" 
ON public.community_messages FOR INSERT 
WITH CHECK (
    user_id = auth.uid() AND
    channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.enrollments e ON cc.course_id = e.course_id
        WHERE e.user_id = auth.uid() AND e.status = 'active'
    )
);

DROP POLICY IF EXISTS "Users can update own messages" ON public.community_messages;
CREATE POLICY "Users can update own messages" 
ON public.community_messages FOR UPDATE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own messages" ON public.community_messages;
CREATE POLICY "Users can delete own messages" 
ON public.community_messages FOR DELETE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Course creators can manage all messages" ON public.community_messages;
CREATE POLICY "Course creators can manage all messages" 
ON public.community_messages FOR ALL 
USING (
    channel_id IN (
        SELECT cc.id FROM public.community_channels cc
        JOIN public.courses c ON cc.course_id = c.id
        WHERE c.creator_id = auth.uid()
    )
);

-- ============================================================================
-- COMMUNITY REACTIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Enrolled users can view reactions" ON public.community_reactions;
CREATE POLICY "Enrolled users can view reactions" 
ON public.community_reactions FOR SELECT 
USING (
    message_id IN (
        SELECT cm.id FROM public.community_messages cm
        JOIN public.community_channels cc ON cm.channel_id = cc.id
        JOIN public.enrollments e ON cc.course_id = e.course_id
        WHERE e.user_id = auth.uid() AND e.status = 'active'
    )
);

DROP POLICY IF EXISTS "Enrolled users can create reactions" ON public.community_reactions;
CREATE POLICY "Enrolled users can create reactions" 
ON public.community_reactions FOR INSERT 
WITH CHECK (
    user_id = auth.uid() AND
    message_id IN (
        SELECT cm.id FROM public.community_messages cm
        JOIN public.community_channels cc ON cm.channel_id = cc.id
        JOIN public.enrollments e ON cc.course_id = e.course_id
        WHERE e.user_id = auth.uid() AND e.status = 'active'
    )
);

DROP POLICY IF EXISTS "Users can delete own reactions" ON public.community_reactions;
CREATE POLICY "Users can delete own reactions" 
ON public.community_reactions FOR DELETE 
USING (user_id = auth.uid());

-- ============================================================================
-- COMMUNITY BOOKMARKS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.community_bookmarks;
CREATE POLICY "Users can view own bookmarks" 
ON public.community_bookmarks FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create own bookmarks" ON public.community_bookmarks;
CREATE POLICY "Users can create own bookmarks" 
ON public.community_bookmarks FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.community_bookmarks;
CREATE POLICY "Users can delete own bookmarks" 
ON public.community_bookmarks FOR DELETE 
USING (user_id = auth.uid());

-- ============================================================================
-- NOTIFICATIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;
CREATE POLICY "Anyone can insert notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;
CREATE POLICY "Users can delete own notifications" 
ON public.notifications FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================================================
-- CHAT SESSIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can view own chat sessions" 
ON public.chat_sessions FOR SELECT 
USING (user_id = auth.uid() OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can create chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can create chat sessions" 
ON public.chat_sessions FOR INSERT 
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can update own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can update own chat sessions" 
ON public.chat_sessions FOR UPDATE 
USING (user_id = auth.uid() OR user_id IS NULL);

DROP POLICY IF EXISTS "Users can delete own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can delete own chat sessions" 
ON public.chat_sessions FOR DELETE 
USING (user_id = auth.uid() OR user_id IS NULL);

-- ============================================================================
-- CHAT MESSAGES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view messages in own sessions" ON public.chat_messages;
CREATE POLICY "Users can view messages in own sessions" 
ON public.chat_messages FOR SELECT 
USING (
    session_id IN (
        SELECT id FROM public.chat_sessions 
        WHERE user_id = auth.uid() OR user_id IS NULL
    )
);

DROP POLICY IF EXISTS "Users can create messages in own sessions" ON public.chat_messages;
CREATE POLICY "Users can create messages in own sessions" 
ON public.chat_messages FOR INSERT 
WITH CHECK (
    session_id IN (
        SELECT id FROM public.chat_sessions 
        WHERE user_id = auth.uid() OR user_id IS NULL
    )
);

-- ============================================================================
-- BUNNY SETTINGS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Users can view own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can view own bunny settings" 
ON public.bunny_settings FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can insert own bunny settings" 
ON public.bunny_settings FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can update own bunny settings" 
ON public.bunny_settings FOR UPDATE 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can delete own bunny settings" 
ON public.bunny_settings FOR DELETE 
USING (user_id = auth.uid());

-- ============================================================================
-- LIVE STREAM SESSIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view live stream sessions" ON public.live_stream_sessions;
CREATE POLICY "Anyone can view live stream sessions" 
ON public.live_stream_sessions FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Course creators can manage live stream sessions" ON public.live_stream_sessions;
CREATE POLICY "Course creators can manage live stream sessions" 
ON public.live_stream_sessions FOR ALL 
USING (
    lesson_id IN (
        SELECT l.id FROM public.lessons l
        JOIN public.modules m ON l.module_id = m.id
        JOIN public.courses c ON m.course_id = c.id
        WHERE c.creator_id = auth.uid()
    )
);

-- ============================================================================
-- END OF RLS POLICIES FILE
-- ============================================================================
