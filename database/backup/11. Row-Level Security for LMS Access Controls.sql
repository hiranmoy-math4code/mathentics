--------------------------------------------------------------------------------
-- 1. PROFILES
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

--------------------------------------------------------------------------------
-- 2. COURSES
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view published courses" ON public.courses;
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING ((is_published = true) OR (creator_id = auth.uid()));

DROP POLICY IF EXISTS "Creators can manage their courses" ON public.courses;
CREATE POLICY "Creators can manage their courses" ON public.courses FOR ALL USING (creator_id = auth.uid());

DROP POLICY IF EXISTS "Creators can update their courses" ON public.courses;
CREATE POLICY "Creators can update their courses" ON public.courses FOR UPDATE USING (creator_id = auth.uid());

DROP POLICY IF EXISTS "Creators can delete their courses" ON public.courses;
CREATE POLICY "Creators can delete their courses" ON public.courses FOR DELETE USING (creator_id = auth.uid());

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.exams;
CREATE POLICY "Enable insert for authenticated users only" ON public.exams FOR INSERT TO authenticated WITH CHECK (true);

--------------------------------------------------------------------------------
-- 3. MODULES
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view modules of published courses" ON public.modules;
CREATE POLICY "Anyone can view modules of published courses" ON public.modules FOR SELECT USING (course_id IN (SELECT id FROM courses WHERE is_published = true OR creator_id = auth.uid()));

DROP POLICY IF EXISTS "Course creators can manage modules" ON public.modules;
CREATE POLICY "Course creators can manage modules" ON public.modules FOR ALL USING (course_id IN (SELECT id FROM courses WHERE creator_id = auth.uid()));

--------------------------------------------------------------------------------
-- 4. LESSONS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view lessons of published courses or free previews" ON public.lessons;
CREATE POLICY "Anyone can view lessons of published courses or free previews" ON public.lessons FOR SELECT USING ((is_free_preview = true) OR (module_id IN (SELECT m.id FROM modules m JOIN courses c ON m.course_id = c.id WHERE c.is_published = true AND (c.creator_id = auth.uid() OR EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = c.id AND e.user_id = auth.uid() AND e.status = 'active')))));

DROP POLICY IF EXISTS "Course creators can manage lessons" ON public.lessons;
CREATE POLICY "Course creators can manage lessons" ON public.lessons FOR ALL USING (module_id IN (SELECT m.id FROM modules m JOIN courses c ON m.course_id = c.id WHERE c.creator_id = auth.uid()));

--------------------------------------------------------------------------------
-- 5. ENROLLMENTS & LOGS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their enrollments" ON public.enrollments;
CREATE POLICY "Users can view their enrollments" ON public.enrollments FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Course creators can view enrollments" ON public.enrollments;
CREATE POLICY "Course creators can view enrollments" ON public.enrollments FOR SELECT USING (course_id IN (SELECT id FROM courses WHERE creator_id = auth.uid()));

DROP POLICY IF EXISTS "Users can update their enrollments" ON public.enrollments;
CREATE POLICY "Users can update their enrollments" ON public.enrollments FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.enrollments;
CREATE POLICY "Enable insert for authenticated users only" ON public.enrollments FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update all enrollments" ON public.enrollments;
CREATE POLICY "Admins can update all enrollments" ON public.enrollments FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;
CREATE POLICY "Admins can view all enrollments" ON public.enrollments FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can view all enrollment logs" ON public.enrollment_logs;
CREATE POLICY "Admins can view all enrollment logs" ON public.enrollment_logs FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

--------------------------------------------------------------------------------
-- 6. CHAT SESSIONS & MESSAGES
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can delete own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can delete own chat sessions" ON public.chat_sessions FOR DELETE USING ((user_id = auth.uid()) OR (user_id IS NULL));

DROP POLICY IF EXISTS "Users can update own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can update own chat sessions" ON public.chat_sessions FOR UPDATE USING ((user_id = auth.uid()) OR (user_id IS NULL));

DROP POLICY IF EXISTS "Users can create chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can create chat sessions" ON public.chat_sessions FOR INSERT WITH CHECK ((user_id = auth.uid()) OR (user_id IS NULL));

DROP POLICY IF EXISTS "Enable read access for all users" ON public.chat_sessions;
CREATE POLICY "Enable read access for all users" ON public.chat_sessions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can view messages in own sessions" ON public.chat_messages;
CREATE POLICY "Users can view messages in own sessions" ON public.chat_messages FOR SELECT USING (session_id IN (SELECT id FROM chat_sessions WHERE user_id = auth.uid() OR user_id IS NULL));

DROP POLICY IF EXISTS "Authenticated users can create messages" ON public.chat_messages;
CREATE POLICY "Authenticated users can create messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

--------------------------------------------------------------------------------
-- 7. LESSON PROGRESS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own progress" ON public.lesson_progress;
CREATE POLICY "Users can view own progress" ON public.lesson_progress FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage own progress" ON public.lesson_progress;
CREATE POLICY "Users can manage own progress" ON public.lesson_progress FOR ALL USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own progress" ON public.lesson_progress;
CREATE POLICY "Users can update own progress" ON public.lesson_progress FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own progress" ON public.lesson_progress;
CREATE POLICY "Users can delete own progress" ON public.lesson_progress FOR DELETE USING (user_id = auth.uid());

--------------------------------------------------------------------------------
-- 8. REVIEWS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own reviews" ON public.reviews;
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own reviews" ON public.reviews;
CREATE POLICY "Users can delete own reviews" ON public.reviews FOR DELETE USING (user_id = auth.uid());

--------------------------------------------------------------------------------
-- 9. EXAMS, SECTIONS, QUESTIONS, OPTIONS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can view published exams" ON public.exams;
CREATE POLICY "Anyone can view published exams" ON public.exams FOR SELECT USING ((status = 'published') OR (admin_id = auth.uid()) OR (created_by = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can update exams" ON public.exams;
CREATE POLICY "Exam creators can update exams" ON public.exams FOR UPDATE USING ((admin_id = auth.uid()) OR (created_by = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can delete exams" ON public.exams;
CREATE POLICY "Exam creators can delete exams" ON public.exams FOR DELETE USING ((admin_id = auth.uid()) OR (created_by = auth.uid()));

DROP POLICY IF EXISTS "Anyone can view sections of published exams" ON public.sections;
CREATE POLICY "Anyone can view sections of published exams" ON public.sections FOR SELECT USING (exam_id IN (SELECT id FROM exams WHERE status = 'published' OR admin_id = auth.uid() OR created_by = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can manage sections" ON public.sections;
CREATE POLICY "Exam creators can manage sections" ON public.sections FOR ALL USING (exam_id IN (SELECT id FROM exams WHERE admin_id = auth.uid() OR created_by = auth.uid()));

DROP POLICY IF EXISTS "Anyone can view questions of published exams" ON public.questions;
CREATE POLICY "Anyone can view questions of published exams" ON public.questions FOR SELECT USING (section_id IN (SELECT s.id FROM sections s JOIN exams e ON s.exam_id = e.id WHERE e.status = 'published' OR e.admin_id = auth.uid() OR e.created_by = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can manage questions" ON public.questions;
CREATE POLICY "Exam creators can manage questions" ON public.questions FOR ALL USING (section_id IN (SELECT s.id FROM sections s JOIN exams e ON s.exam_id = e.id WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()));

DROP POLICY IF EXISTS "Anyone can view options of published exams" ON public.options;
CREATE POLICY "Anyone can view options of published exams" ON public.options FOR SELECT USING (question_id IN (SELECT q.id FROM questions q JOIN sections s ON q.section_id = s.id JOIN exams e ON s.exam_id = e.id WHERE e.status = 'published' OR e.admin_id = auth.uid() OR e.created_by = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can manage options" ON public.options;
CREATE POLICY "Exam creators can manage options" ON public.options FOR ALL USING (question_id IN (SELECT q.id FROM questions q JOIN sections s ON q.section_id = s.id JOIN exams e ON s.exam_id = e.id WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()));

--------------------------------------------------------------------------------
-- 10. EXAM ATTEMPTS, RESPONSES, RESULTS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Students can view own attempts" ON public.exam_attempts;
CREATE POLICY "Students can view own attempts" ON public.exam_attempts FOR SELECT USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Exam creators can view all attempts" ON public.exam_attempts;
CREATE POLICY "Exam creators can view all attempts" ON public.exam_attempts FOR SELECT USING (exam_id IN (SELECT id FROM exams WHERE admin_id = auth.uid() OR created_by = auth.uid()));

DROP POLICY IF EXISTS "Students can update own attempts" ON public.exam_attempts;
CREATE POLICY "Students can update own attempts" ON public.exam_attempts FOR UPDATE USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.exam_attempts;
CREATE POLICY "Enable insert for authenticated users only" ON public.exam_attempts FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Students can view own responses" ON public.responses;
CREATE POLICY "Students can view own responses" ON public.responses FOR SELECT USING (attempt_id IN (SELECT id FROM exam_attempts WHERE student_id = auth.uid()));

DROP POLICY IF EXISTS "Students can manage own responses" ON public.responses;
CREATE POLICY "Students can manage own responses" ON public.responses FOR ALL USING (attempt_id IN (SELECT id FROM exam_attempts WHERE student_id = auth.uid()));

DROP POLICY IF EXISTS "Students can update own responses" ON public.responses;
CREATE POLICY "Students can update own responses" ON public.responses FOR UPDATE USING (attempt_id IN (SELECT id FROM exam_attempts WHERE student_id = auth.uid()));

DROP POLICY IF EXISTS "Students can delete own responses" ON public.responses;
CREATE POLICY "Students can delete own responses" ON public.responses FOR DELETE USING (attempt_id IN (SELECT id FROM exam_attempts WHERE student_id = auth.uid()));

DROP POLICY IF EXISTS "Enable read access for all users" ON public.responses;
CREATE POLICY "Enable read access for all users" ON public.responses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Students can view own results" ON public.results;
CREATE POLICY "Students can view own results" ON public.results FOR SELECT USING (attempt_id IN (SELECT id FROM exam_attempts WHERE student_id = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can view all results" ON public.results;
CREATE POLICY "Exam creators can view all results" ON public.results FOR SELECT USING (attempt_id IN (SELECT ea.id FROM exam_attempts ea JOIN exams e ON ea.exam_id = e.id WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()));

DROP POLICY IF EXISTS "Students can view own section results" ON public.section_results;
CREATE POLICY "Students can view own section results" ON public.section_results FOR SELECT USING (result_id IN (SELECT r.id FROM results r JOIN exam_attempts ea ON r.attempt_id = ea.id WHERE ea.student_id = auth.uid()));

DROP POLICY IF EXISTS "Exam creators can view all section results" ON public.section_results;
CREATE POLICY "Exam creators can view all section results" ON public.section_results FOR SELECT USING (result_id IN (SELECT r.id FROM results r JOIN exam_attempts ea ON r.attempt_id = ea.id JOIN exams e ON ea.exam_id = e.id WHERE e.admin_id = auth.uid() OR e.created_by = auth.uid()));

--------------------------------------------------------------------------------
-- 11. QUESTION BANK
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view own question bank" ON public.question_bank;
CREATE POLICY "Admins can view own question bank" ON public.question_bank FOR SELECT USING (admin_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage own question bank" ON public.question_bank;
CREATE POLICY "Admins can manage own question bank" ON public.question_bank FOR ALL USING (admin_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view own question bank options" ON public.question_bank_options;
CREATE POLICY "Admins can view own question bank options" ON public.question_bank_options FOR SELECT USING (question_id IN (SELECT id FROM question_bank WHERE admin_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can manage own question bank options" ON public.question_bank_options;
CREATE POLICY "Admins can manage own question bank options" ON public.question_bank_options FOR ALL USING (question_id IN (SELECT id FROM question_bank WHERE admin_id = auth.uid()));

--------------------------------------------------------------------------------
-- 12. PDFs & PAYMENTS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Students can view own uploaded PDFs" ON public.student_uploaded_pdfs;
CREATE POLICY "Students can view own uploaded PDFs" ON public.student_uploaded_pdfs FOR SELECT USING (uploader_id = auth.uid());

DROP POLICY IF EXISTS "Students can manage own uploaded PDFs" ON public.student_uploaded_pdfs;
CREATE POLICY "Students can manage own uploaded PDFs" ON public.student_uploaded_pdfs FOR ALL USING (uploader_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own course payments" ON public.course_payments;
CREATE POLICY "Users can view own course payments" ON public.course_payments FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Course creators can view payments for their courses" ON public.course_payments;
CREATE POLICY "Course creators can view payments for their courses" ON public.course_payments FOR SELECT USING (course_id IN (SELECT id FROM courses WHERE creator_id = auth.uid()));

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.course_payments;
CREATE POLICY "Enable insert for authenticated users only" ON public.course_payments FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Enable read access for all users" ON public.course_payments;
CREATE POLICY "Enable read access for all users" ON public.course_payments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT USING (user_id = auth.uid());

--------------------------------------------------------------------------------
-- 13. REWARDS & MISSIONS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view all rewards" ON public.user_rewards;
CREATE POLICY "Public can view all rewards" ON public.user_rewards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own rewards" ON public.user_rewards;
CREATE POLICY "Users can update own rewards" ON public.user_rewards FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own rewards" ON public.user_rewards;
CREATE POLICY "Users can delete own rewards" ON public.user_rewards FOR DELETE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own reward transactions" ON public.reward_transactions;
CREATE POLICY "Users can view own reward transactions" ON public.reward_transactions FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Enable read access for all users" ON public.reward_transactions;
CREATE POLICY "Enable read access for all users" ON public.reward_transactions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own reward transactions" ON public.reward_transactions;
CREATE POLICY "Users can insert own reward transactions" ON public.reward_transactions FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can view all badges" ON public.user_badges;
CREATE POLICY "Anyone can view all badges" ON public.user_badges FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can view own badges" ON public.user_badges;
CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can manage their own missions" ON public.daily_missions;
CREATE POLICY "Users can manage their own missions" ON public.daily_missions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

--------------------------------------------------------------------------------
-- 14. COMMUNITY CHANNELS, MESSAGES, REACTIONS, BOOKMARKS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Enrolled users can view channels" ON public.community_channels;
CREATE POLICY "Enrolled users can view channels" ON public.community_channels FOR SELECT USING (course_id IN (SELECT course_id FROM enrollments WHERE user_id = auth.uid() AND status = 'active') OR course_id IN (SELECT id FROM courses WHERE creator_id = auth.uid()));

DROP POLICY IF EXISTS "Course creators can manage channels" ON public.community_channels;
CREATE POLICY "Course creators can manage channels" ON public.community_channels FOR ALL USING (course_id IN (SELECT id FROM courses WHERE creator_id = auth.uid()));

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.community_messages;
CREATE POLICY "Enable insert for authenticated users only" ON public.community_messages FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Enrolled users can view messages" ON public.community_messages;
CREATE POLICY "Enrolled users can view messages" ON public.community_messages FOR SELECT USING (channel_id IN (SELECT cc.id FROM community_channels cc JOIN enrollments e ON cc.course_id = e.course_id WHERE e.user_id = auth.uid() AND e.status = 'active') OR channel_id IN (SELECT cc.id FROM community_channels cc JOIN courses c ON cc.course_id = c.id WHERE c.creator_id = auth.uid()));

DROP POLICY IF EXISTS "Users can update own messages" ON public.community_messages;
CREATE POLICY "Users can update own messages" ON public.community_messages FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own messages" ON public.community_messages;
CREATE POLICY "Users can delete own messages" ON public.community_messages FOR DELETE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Course creators can manage all messages" ON public.community_messages;
CREATE POLICY "Course creators can manage all messages" ON public.community_messages FOR ALL USING (channel_id IN (SELECT cc.id FROM community_channels cc JOIN courses c ON cc.course_id = c.id WHERE c.creator_id = auth.uid()));

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.community_reactions;
CREATE POLICY "Enable insert for authenticated users only" ON public.community_reactions FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Enrolled users can view reactions" ON public.community_reactions;
CREATE POLICY "Enrolled users can view reactions" ON public.community_reactions FOR SELECT USING (message_id IN (SELECT cm.id FROM community_messages cm JOIN community_channels cc ON cm.channel_id = cc.id JOIN enrollments e ON cc.course_id = e.course_id WHERE e.user_id = auth.uid() AND e.status = 'active'));

DROP POLICY IF EXISTS "Users can delete own reactions" ON public.community_reactions;
CREATE POLICY "Users can delete own reactions" ON public.community_reactions FOR DELETE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.community_bookmarks;
CREATE POLICY "Enable insert for authenticated users only" ON public.community_bookmarks FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.community_bookmarks;
CREATE POLICY "Users can view own bookmarks" ON public.community_bookmarks FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own bookmarks" ON public.community_bookmarks;
CREATE POLICY "Users can delete own bookmarks" ON public.community_bookmarks FOR DELETE USING (user_id = auth.uid());

--------------------------------------------------------------------------------
-- 15. NOTIFICATIONS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;
CREATE POLICY "Users can delete own notifications" ON public.notifications FOR DELETE USING (auth.uid() = user_id);

--------------------------------------------------------------------------------
-- 16. BUNNY SETTINGS & LIVE STREAMS
--------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can view own bunny settings" ON public.bunny_settings FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can update own bunny settings" ON public.bunny_settings FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own bunny settings" ON public.bunny_settings;
CREATE POLICY "Users can delete own bunny settings" ON public.bunny_settings FOR DELETE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can view live stream sessions" ON public.live_stream_sessions;
CREATE POLICY "Anyone can view live stream sessions" ON public.live_stream_sessions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Course creators can manage live stream sessions" ON public.live_stream_sessions;
CREATE POLICY "Course creators can manage live stream sessions" ON public.live_stream_sessions FOR ALL USING (lesson_id IN (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id JOIN courses c ON m.course_id = c.id WHERE c.creator_id = auth.uid()));