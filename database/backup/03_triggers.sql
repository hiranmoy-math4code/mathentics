-- ============================================================================
-- MATH4CODE DATABASE TRIGGERS
-- File: 03_triggers.sql (Automations)
-- ============================================================================
-- This file contains all database triggers for automated actions
-- Execute this file AFTER running 01_schema.sql and 02_functions_rpc.sql
-- All statements are idempotent (safe to run multiple times)
-- ============================================================================

-- ============================================================================
-- AUTH TRIGGER: NEW USER REGISTRATION
-- ============================================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- NOTIFICATION TRIGGERS
-- ============================================================================

-- Trigger for new course published
DROP TRIGGER IF EXISTS on_course_published ON public.courses;
CREATE TRIGGER on_course_published
AFTER INSERT OR UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION notify_all_users_new_course();

-- Trigger for new lesson added
DROP TRIGGER IF EXISTS on_lesson_added ON public.lessons;
CREATE TRIGGER on_lesson_added
AFTER INSERT ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION notify_enrolled_users_new_lesson();

-- ============================================================================
-- UPDATED_AT TIMESTAMP TRIGGERS
-- ============================================================================

-- Generic function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at column
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_modules_updated_at ON public.modules;
CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON public.modules
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_lessons_updated_at ON public.lessons;
CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_enrollments_updated_at ON public.enrollments;
CREATE TRIGGER update_enrollments_updated_at
    BEFORE UPDATE ON public.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_lesson_progress_updated_at ON public.lesson_progress;
CREATE TRIGGER update_lesson_progress_updated_at
    BEFORE UPDATE ON public.lesson_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_exams_updated_at ON public.exams;
CREATE TRIGGER update_exams_updated_at
    BEFORE UPDATE ON public.exams
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON public.sections;
CREATE TRIGGER update_sections_updated_at
    BEFORE UPDATE ON public.sections
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_questions_updated_at ON public.questions;
CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON public.questions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_responses_updated_at ON public.responses;
CREATE TRIGGER update_responses_updated_at
    BEFORE UPDATE ON public.responses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_exam_attempts_updated_at ON public.exam_attempts;
CREATE TRIGGER update_exam_attempts_updated_at
    BEFORE UPDATE ON public.exam_attempts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_question_bank_updated_at ON public.question_bank;
CREATE TRIGGER update_question_bank_updated_at
    BEFORE UPDATE ON public.question_bank
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_test_series_updated_at ON public.test_series;
CREATE TRIGGER update_test_series_updated_at
    BEFORE UPDATE ON public.test_series
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_course_payments_updated_at ON public.course_payments;
CREATE TRIGGER update_course_payments_updated_at
    BEFORE UPDATE ON public.course_payments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_rewards_updated_at ON public.user_rewards;
CREATE TRIGGER update_user_rewards_updated_at
    BEFORE UPDATE ON public.user_rewards
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_daily_missions_updated_at ON public.daily_missions;
CREATE TRIGGER update_daily_missions_updated_at
    BEFORE UPDATE ON public.daily_missions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_community_channels_updated_at ON public.community_channels;
CREATE TRIGGER update_community_channels_updated_at
    BEFORE UPDATE ON public.community_channels
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_community_messages_updated_at ON public.community_messages;
CREATE TRIGGER update_community_messages_updated_at
    BEFORE UPDATE ON public.community_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_bunny_settings_updated_at ON public.bunny_settings;
CREATE TRIGGER update_bunny_settings_updated_at
    BEFORE UPDATE ON public.bunny_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_live_stream_sessions_updated_at ON public.live_stream_sessions;
CREATE TRIGGER update_live_stream_sessions_updated_at
    BEFORE UPDATE ON public.live_stream_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- REWARD SYSTEM TRIGGERS
-- ============================================================================

-- Function to update user rewards when transaction is inserted
CREATE OR REPLACE FUNCTION public.update_user_rewards_on_transaction()
RETURNS TRIGGER AS $$
DECLARE
    v_last_activity_date DATE;
    v_current_streak INT;
    v_longest_streak INT;
    v_new_streak INT;
    v_level INT;
    v_xp INT;
BEGIN
    -- Ensure user_rewards record exists
    INSERT INTO public.user_rewards (user_id, total_coins, xp, level, current_streak, longest_streak)
    VALUES (NEW.user_id, 0, 0, 1, 0, 0)
    ON CONFLICT (user_id) DO NOTHING;

    -- Get current data
    SELECT last_activity_date, current_streak, longest_streak, xp, level
    INTO v_last_activity_date, v_current_streak, v_longest_streak, v_xp, v_level
    FROM public.user_rewards
    WHERE user_id = NEW.user_id;

    -- Process login actions for streak
    IF NEW.action_type = 'login' THEN
        -- Calculate new streak
        IF v_last_activity_date IS NULL THEN
            v_new_streak := 1;
        ELSIF v_last_activity_date = CURRENT_DATE THEN
            v_new_streak := v_current_streak;
        ELSIF v_last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
            v_new_streak := v_current_streak + 1;
        ELSE
            v_new_streak := 1;
        END IF;

        -- Update longest streak
        IF v_new_streak > v_longest_streak THEN
            v_longest_streak := v_new_streak;
        END IF;

        -- Update with streak
        UPDATE public.user_rewards
        SET 
            current_streak = v_new_streak,
            longest_streak = v_longest_streak,
            last_activity_date = CURRENT_DATE,
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
            level = FLOOR((xp + NEW.amount) / 100.0) + 1,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;

        -- Award streak milestone bonuses
        IF v_new_streak = 3 AND NOT EXISTS (
            SELECT 1 FROM public.reward_transactions 
            WHERE user_id = NEW.user_id 
            AND action_type = 'bonus' 
            AND description LIKE '%3-day streak%'
            AND created_at >= CURRENT_DATE - INTERVAL '3 days'
        ) THEN
            INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
            VALUES (NEW.user_id, 10, 'bonus', '🔥 3-day streak bonus!');
        END IF;

        IF v_new_streak = 7 AND NOT EXISTS (
            SELECT 1 FROM public.reward_transactions 
            WHERE user_id = NEW.user_id 
            AND action_type = 'bonus' 
            AND description LIKE '%7-day streak%'
            AND created_at >= CURRENT_DATE - INTERVAL '7 days'
        ) THEN
            INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
            VALUES (NEW.user_id, 30, 'bonus', '🔥 7-day streak bonus!');
        END IF;

        IF v_new_streak = 30 AND NOT EXISTS (
            SELECT 1 FROM public.reward_transactions 
            WHERE user_id = NEW.user_id 
            AND action_type = 'bonus' 
            AND description LIKE '%30-day streak%'
            AND created_at >= CURRENT_DATE - INTERVAL '30 days'
        ) THEN
            INSERT INTO public.reward_transactions (user_id, amount, action_type, description)
            VALUES (NEW.user_id, 100, 'bonus', '🔥 30-day streak bonus!');
        END IF;

    ELSE
        -- For non-login actions, just update coins and XP
        UPDATE public.user_rewards
        SET 
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
            level = FLOOR((xp + NEW.amount) / 100.0) + 1,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for reward transactions
DROP TRIGGER IF EXISTS update_rewards_on_transaction ON public.reward_transactions;
CREATE TRIGGER update_rewards_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_rewards_on_transaction();

-- ============================================================================
-- COMMUNITY CHANNEL AUTO-CREATION TRIGGER
-- ============================================================================

-- Function to create default channels for a course
CREATE OR REPLACE FUNCTION public.create_default_community_channels()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create channels if community is enabled
    IF NEW.community_enabled = true THEN
        -- Check if this is a new course or community was just enabled
        IF (TG_OP = 'INSERT') OR 
           (TG_OP = 'UPDATE' AND OLD.community_enabled = false AND NEW.community_enabled = true) THEN
            
            -- Check if channels already exist for this course
            IF NOT EXISTS (
                SELECT 1 FROM public.community_channels 
                WHERE course_id = NEW.id
            ) THEN
                -- Create General Discussion channel
                INSERT INTO public.community_channels (course_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    'General Discussion',
                    'General discussions about the course',
                    'discussion',
                    true
                );

                -- Create Announcements channel
                INSERT INTO public.community_channels (course_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    'Announcements',
                    'Course announcements and updates',
                    'announcement',
                    true
                );

                -- Create Q&A channel
                INSERT INTO public.community_channels (course_id, name, description, type, is_active)
                VALUES (
                    NEW.id,
                    'Q&A',
                    'Ask questions and get help',
                    'discussion',
                    true
                );
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for courses table
DROP TRIGGER IF EXISTS create_community_channels_on_course ON public.courses;
CREATE TRIGGER create_community_channels_on_course
    AFTER INSERT OR UPDATE OF community_enabled ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.create_default_community_channels();

-- ============================================================================
-- BACKFILL: Create channels for existing courses with community enabled
-- ============================================================================

DO $$
DECLARE
    course_record RECORD;
BEGIN
    FOR course_record IN 
        SELECT id FROM public.courses 
        WHERE community_enabled = true
        AND NOT EXISTS (
            SELECT 1 FROM public.community_channels 
            WHERE course_id = courses.id
        )
    LOOP
        -- Create General Discussion channel
        INSERT INTO public.community_channels (course_id, name, description, type, is_active)
        VALUES (
            course_record.id,
            'General Discussion',
            'General discussions about the course',
            'discussion',
            true
        );

        -- Create Announcements channel
        INSERT INTO public.community_channels (course_id, name, description, type, is_active)
        VALUES (
            course_record.id,
            'Announcements',
            'Course announcements and updates',
            'announcement',
            true
        );

        -- Create Q&A channel
        INSERT INTO public.community_channels (course_id, name, description, type, is_active)
        VALUES (
            course_record.id,
            'Q&A',
            'Ask questions and get help',
            'discussion',
            true
        );

        RAISE NOTICE 'Created channels for course: %', course_record.id;
    END LOOP;
END $$;

-- ============================================================================
-- BACKFILL: Initialize user_rewards for existing users
-- ============================================================================

INSERT INTO public.user_rewards (user_id, total_coins, xp, level, current_streak, longest_streak)
SELECT 
    p.id,
    COALESCE((SELECT SUM(amount) FROM public.reward_transactions WHERE user_id = p.id), 0),
    COALESCE((SELECT SUM(amount) FROM public.reward_transactions WHERE user_id = p.id), 0),
    FLOOR(COALESCE((SELECT SUM(amount) FROM public.reward_transactions WHERE user_id = p.id), 0) / 100.0) + 1,
    0,
    0
FROM public.profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_rewards ur WHERE ur.user_id = p.id
)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- END OF TRIGGERS FILE
-- ============================================================================
