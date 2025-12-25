-- ============================================================================
-- ALL TRIGGERS - COMPLETE TRIGGER SETUP FOR SUPABASE
-- ============================================================================
-- This file contains ALL triggers and their required functions
-- Run this file in Supabase SQL Editor to create all triggers at once
-- ============================================================================

-- ============================================================================
-- SECTION 1: REQUIRED FUNCTIONS FOR TRIGGERS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Handle new user registration
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

-- Function: Check enrollment expiry
CREATE OR REPLACE FUNCTION public.check_enrollment_expiry() 
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at < NOW() THEN 
    NEW.status := 'expired'; 
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Notify all users about new course
CREATE OR REPLACE FUNCTION public.notify_all_users_new_course()
RETURNS TRIGGER AS $$
BEGIN
  -- Only notify when a course is published for the first time
  IF (TG_OP = 'UPDATE' AND OLD.is_published = false AND NEW.is_published = true) THEN
    INSERT INTO public.notifications (user_id, title, message, type, link)
    SELECT 
      p.id,
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

-- Function: Notify enrolled users about new lesson
CREATE OR REPLACE FUNCTION public.notify_enrolled_users_new_lesson()
RETURNS TRIGGER AS $$
DECLARE
  v_course_id uuid;
  v_course_title text;
BEGIN
  -- Get course info from module
  SELECT m.course_id, c.title 
  INTO v_course_id, v_course_title
  FROM public.modules m
  JOIN public.courses c ON c.id = m.course_id
  WHERE m.id = NEW.module_id;
  
  -- Notify all enrolled users
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT 
    e.user_id,
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

-- Function: Update user rewards on transaction
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

-- Function: Handle reward transactions and update user rewards
CREATE OR REPLACE FUNCTION public.handle_reward_transaction_process()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user_rewards table
    UPDATE public.user_rewards
    SET 
        total_coins = total_coins + NEW.amount,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.user_rewards (user_id, total_coins)
        VALUES (NEW.user_id, NEW.amount);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Update user streak
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
    v_last_activity DATE;
    v_current_streak INT;
BEGIN
    SELECT last_activity_date, current_streak
    INTO v_last_activity, v_current_streak
    FROM public.user_rewards
    WHERE user_id = NEW.user_id;
    
    -- Calculate new streak
    IF v_last_activity IS NULL OR v_last_activity < CURRENT_DATE - INTERVAL '1 day' THEN
        -- Streak broken or first activity
        UPDATE public.user_rewards
        SET current_streak = 1,
            last_activity_date = CURRENT_DATE
        WHERE user_id = NEW.user_id;
    ELSIF v_last_activity = CURRENT_DATE - INTERVAL '1 day' THEN
        -- Continue streak
        UPDATE public.user_rewards
        SET current_streak = current_streak + 1,
            longest_streak = GREATEST(longest_streak, current_streak + 1),
            last_activity_date = CURRENT_DATE
        WHERE user_id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Create default community channels for a course
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

-- ============================================================================
-- SECTION 2: CREATE ALL TRIGGERS
-- ============================================================================

-- TRIGGER 1: Create community channels when course is created/updated
DROP TRIGGER IF EXISTS create_community_channels_on_course ON public.courses;
CREATE TRIGGER create_community_channels_on_course
    AFTER INSERT OR UPDATE OF community_enabled ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.create_default_community_channels();

-- TRIGGER 2: Notify users when new course is published
DROP TRIGGER IF EXISTS on_course_published ON public.courses;
CREATE TRIGGER on_course_published
    AFTER INSERT OR UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.notify_all_users_new_course();

-- TRIGGER 3: Notify enrolled users when new lesson is added
DROP TRIGGER IF EXISTS on_lesson_added ON public.lessons;
CREATE TRIGGER on_lesson_added
    AFTER INSERT ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION public.notify_enrolled_users_new_lesson();

-- TRIGGER 4: Process reward transactions
DROP TRIGGER IF EXISTS on_reward_transaction_process ON public.reward_transactions;
CREATE TRIGGER on_reward_transaction_process
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_reward_transaction_process();

-- TRIGGER 5: Check enrollment expiry before insert/update
DROP TRIGGER IF EXISTS trigger_check_enrollment_expiry ON public.enrollments;
CREATE TRIGGER trigger_check_enrollment_expiry
    BEFORE INSERT OR UPDATE ON public.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION public.check_enrollment_expiry();

-- TRIGGER 6: Update responses updated_at timestamp
DROP TRIGGER IF EXISTS update_responses_updated_at ON public.responses;
CREATE TRIGGER update_responses_updated_at
    BEFORE UPDATE ON public.responses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- TRIGGER 7: Update user rewards on transaction
DROP TRIGGER IF EXISTS update_rewards_on_transaction ON public.reward_transactions;
CREATE TRIGGER update_rewards_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_rewards_on_transaction();

-- TRIGGER 8: Update user streak
DROP TRIGGER IF EXISTS update_streak_on_transaction ON public.reward_transactions;
CREATE TRIGGER update_streak_on_transaction
    AFTER INSERT ON public.reward_transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_streak();

-- TRIGGER 9: Handle new user registration (auth.users)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SECTION 3: ADDITIONAL UPDATED_AT TRIGGERS FOR ALL TABLES
-- ============================================================================

-- Profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Courses
DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Modules
DROP TRIGGER IF EXISTS update_modules_updated_at ON public.modules;
CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON public.modules
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Lessons
DROP TRIGGER IF EXISTS update_lessons_updated_at ON public.lessons;
CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enrollments
DROP TRIGGER IF EXISTS update_enrollments_updated_at ON public.enrollments;
CREATE TRIGGER update_enrollments_updated_at
    BEFORE UPDATE ON public.enrollments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Lesson Progress
DROP TRIGGER IF EXISTS update_lesson_progress_updated_at ON public.lesson_progress;
CREATE TRIGGER update_lesson_progress_updated_at
    BEFORE UPDATE ON public.lesson_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Exams
DROP TRIGGER IF EXISTS update_exams_updated_at ON public.exams;
CREATE TRIGGER update_exams_updated_at
    BEFORE UPDATE ON public.exams
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Question Bank
DROP TRIGGER IF EXISTS update_question_bank_updated_at ON public.question_bank;
CREATE TRIGGER update_question_bank_updated_at
    BEFORE UPDATE ON public.question_bank
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();



-- Course Payments
DROP TRIGGER IF EXISTS update_course_payments_updated_at ON public.course_payments;
CREATE TRIGGER update_course_payments_updated_at
    BEFORE UPDATE ON public.course_payments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- User Rewards
DROP TRIGGER IF EXISTS update_user_rewards_updated_at ON public.user_rewards;
CREATE TRIGGER update_user_rewards_updated_at
    BEFORE UPDATE ON public.user_rewards
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Community Channels
DROP TRIGGER IF EXISTS update_community_channels_updated_at ON public.community_channels;
CREATE TRIGGER update_community_channels_updated_at
    BEFORE UPDATE ON public.community_channels
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Community Messages
DROP TRIGGER IF EXISTS update_community_messages_updated_at ON public.community_messages;
CREATE TRIGGER update_community_messages_updated_at
    BEFORE UPDATE ON public.community_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Bunny Settings
DROP TRIGGER IF EXISTS update_bunny_settings_updated_at ON public.bunny_settings;
CREATE TRIGGER update_bunny_settings_updated_at
    BEFORE UPDATE ON public.bunny_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Live Stream Sessions
DROP TRIGGER IF EXISTS update_live_stream_sessions_updated_at ON public.live_stream_sessions;
CREATE TRIGGER update_live_stream_sessions_updated_at
    BEFORE UPDATE ON public.live_stream_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '✅ ALL TRIGGERS CREATED SUCCESSFULLY!';
    RAISE NOTICE '📊 Total Triggers: 8 main triggers + updated_at triggers';
    RAISE NOTICE '🎯 All required functions have been created';
    RAISE NOTICE '🚀 Your database is now fully configured!';
END $$;
