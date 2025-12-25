-- ============================================================================
-- ALL FUNCTIONS - COMPLETE FUNCTION SETUP FOR SUPABASE
-- ============================================================================
-- This file contains ALL database functions and RPCs
-- Run this file in Supabase SQL Editor to create all functions at once
-- ============================================================================

-- ============================================================================
-- SECTION 1: UTILITY FUNCTIONS
-- ============================================================================

-- Function: Calculate level from XP
CREATE OR REPLACE FUNCTION public.calculate_level(p_xp integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS $function$
BEGIN
    RETURN GREATEST(1, floor(sqrt(p_xp::numeric / 100.0))::integer);
END;
$function$;

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$;

-- ============================================================================
-- SECTION 2: AUTHENTICATION & USER MANAGEMENT
-- ============================================================================

-- Function: Handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- ============================================================================
-- SECTION 3: ENROLLMENT MANAGEMENT
-- ============================================================================

-- Function: Log enrollment action
CREATE OR REPLACE FUNCTION public.log_enrollment_action(
    p_action text, 
    p_performed_by uuid, 
    p_enrollment_id uuid DEFAULT NULL::uuid, 
    p_test_series_enrollment_id uuid DEFAULT NULL::uuid, 
    p_previous_expiry timestamp with time zone DEFAULT NULL::timestamp with time zone, 
    p_new_expiry timestamp with time zone DEFAULT NULL::timestamp with time zone, 
    p_notes text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO public.enrollment_logs (
    enrollment_id,
    test_series_enrollment_id,
    action,
    performed_by,
    previous_expiry,
    new_expiry,
    notes
  ) VALUES (
    p_enrollment_id,
    p_test_series_enrollment_id,
    p_action,
    p_performed_by,
    p_previous_expiry,
    p_new_expiry,
    p_notes
  ) RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$function$;

-- Function: Check enrollment expiry
CREATE OR REPLACE FUNCTION public.check_enrollment_expiry()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  -- If checking an enrollment and it has an expiry date
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at < NOW() THEN
    -- Automatically set status to expired
    NEW.status := 'expired';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Function: Mark expired enrollments
CREATE OR REPLACE FUNCTION public.mark_expired_enrollments()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  expired_count INTEGER := 0;
BEGIN
  -- Mark expired course enrollments
  WITH updated AS (
    UPDATE public.enrollments
    SET status = 'expired'
    WHERE expires_at IS NOT NULL
      AND expires_at < NOW()
      AND status = 'active'
    RETURNING id
  )
  SELECT COUNT(*) INTO expired_count FROM updated;

  RETURN expired_count;
END;
$function$;

-- Function: Check if user has active course access
CREATE OR REPLACE FUNCTION public.has_active_course_access(p_user_id uuid, p_course_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_has_access BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM public.enrollments
    WHERE user_id = p_user_id
      AND course_id = p_course_id
      AND status = 'active'
      AND (expires_at IS NULL OR expires_at > NOW())
  ) INTO v_has_access;
  
  RETURN v_has_access;
END;
$function$;

-- Function: Check if user has active test series access
CREATE OR REPLACE FUNCTION public.has_active_test_series_access(p_user_id uuid, p_test_series_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_has_access BOOLEAN := FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM public.test_series_enrollments
    WHERE student_id = p_user_id
      AND test_series_id = p_test_series_id
      AND (expires_at IS NULL OR expires_at > NOW())
  ) INTO v_has_access;
  
  RETURN v_has_access;
END;
$function$;

-- Function: Get enrollment status
CREATE OR REPLACE FUNCTION public.get_enrollment_status(p_user_id uuid, p_course_id uuid)
RETURNS TABLE(
    has_access boolean, 
    status text, 
    expires_at timestamp with time zone, 
    days_remaining integer, 
    is_expiring_soon boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    (e.status = 'active' AND (e.expires_at IS NULL OR e.expires_at > NOW())) as has_access,
    e.status,
    e.expires_at,
    CASE 
      WHEN e.expires_at IS NULL THEN NULL
      ELSE EXTRACT(DAY FROM (e.expires_at - NOW()))::INTEGER
    END as days_remaining,
    CASE
      WHEN e.expires_at IS NULL THEN FALSE
      WHEN e.expires_at <= NOW() THEN FALSE
      ELSE EXTRACT(DAY FROM (e.expires_at - NOW())) <= 7
    END as is_expiring_soon
  FROM public.enrollments e
  WHERE e.user_id = p_user_id
    AND e.course_id = p_course_id
  LIMIT 1;
END;
$function$;

-- Function: Get course learners
CREATE OR REPLACE FUNCTION public.get_course_learners(p_course_id uuid)
RETURNS TABLE(
    student_id uuid, 
    email text, 
    full_name text, 
    avatar_url text, 
    enrolled_at timestamp with time zone, 
    status text, 
    progress integer, 
    progress_percentage numeric, 
    last_accessed_at timestamp with time zone, 
    expires_at timestamp with time zone, 
    grant_type text, 
    granted_by uuid, 
    granted_by_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as student_id,
    p.email,
    p.full_name,
    p.avatar_url,
    e.enrolled_at,
    e.status,
    e.progress,
    e.progress_percentage,
    e.last_accessed_at,
    e.expires_at,
    e.grant_type,
    e.granted_by,
    admin.full_name as granted_by_name
  FROM public.enrollments e
  JOIN public.profiles p ON e.user_id = p.id
  LEFT JOIN public.profiles admin ON e.granted_by = admin.id
  WHERE e.course_id = p_course_id
  ORDER BY e.enrolled_at DESC;
END;
$function$;

-- ============================================================================
-- SECTION 4: COURSE MANAGEMENT
-- ============================================================================

-- Function: Get course structure
CREATE OR REPLACE FUNCTION public.get_course_structure(target_course_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- Function: Get published courses with metadata
CREATE OR REPLACE FUNCTION public.get_published_courses_with_meta(
    target_user_id uuid, 
    p_limit integer DEFAULT 50, 
    p_offset integer DEFAULT 0
)
RETURNS TABLE(
    id uuid, 
    title text, 
    description text, 
    thumbnail_url text, 
    price numeric, 
    course_type text, 
    is_published boolean, 
    created_at timestamp with time zone, 
    instructor_name text, 
    total_lessons bigint, 
    is_enrolled boolean
)
LANGUAGE plpgsql
STABLE
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.title,
        c.description,
        c.thumbnail_url,
        c.price,
        c.course_type,
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
$function$;

-- Function: Get student courses progress
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
LANGUAGE plpgsql
AS $function$
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
        tmp_type text,
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
            c.course_type as c_type,
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
            course_record.c_type,
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
        tmp_type,
        tmp_prog,
        tmp_last,
        tmp_total,
        tmp_comp
    FROM temp_course_progress;
END;
$function$;

-- ============================================================================
-- SECTION 5: COMMUNITY FUNCTIONS
-- ============================================================================

-- Function: Create default community channels
CREATE OR REPLACE FUNCTION public.create_default_community_channels()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- Function: Get channels with metadata
CREATE OR REPLACE FUNCTION public.get_channels_with_meta(target_course_id uuid)
RETURNS TABLE(
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
AS $function$
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
$function$;

-- ============================================================================
-- SECTION 6: NOTIFICATION FUNCTIONS
-- ============================================================================

-- Function: Create notification
CREATE OR REPLACE FUNCTION public.create_notification(
    p_user_id uuid, 
    p_title text, 
    p_message text, 
    p_type text DEFAULT 'info'::text, 
    p_link text DEFAULT NULL::text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, title, message, type, link)
  VALUES (p_user_id, p_title, p_message, p_type, p_link)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$function$;

-- Function: Notify all users about new course
CREATE OR REPLACE FUNCTION public.notify_all_users_new_course()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- Function: Notify enrolled users about new lesson
CREATE OR REPLACE FUNCTION public.notify_enrolled_users_new_lesson()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- ============================================================================
-- SECTION 7: REWARD SYSTEM FUNCTIONS
-- ============================================================================

-- Function: Handle reward transaction
CREATE OR REPLACE FUNCTION public.handle_reward_transaction()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    -- Current State Variables
    v_user_record public.user_rewards%ROWTYPE;
    v_today date := CURRENT_DATE;
    v_yesterday date := CURRENT_DATE - 1;
    
    -- Calculated Values
    v_new_streak integer;
    v_new_longest_streak integer;
    v_xp_gain integer;
    v_coins_gain integer;
    
    -- Constants
    c_xp_multiplier constant integer := 10; -- 1 Coin = 10 XP
    c_daily_cap constant integer := 100;    -- Max coins per day
BEGIN
    -- A. FETCH USER STATE (Locking the row for consistency)
    SELECT * INTO v_user_record 
    FROM public.user_rewards 
    WHERE user_id = NEW.user_id 
    FOR UPDATE;

    -- If user doesn't exist in user_rewards, create them first (Safety Net)
    IF NOT FOUND THEN
        INSERT INTO public.user_rewards (user_id) VALUES (NEW.user_id)
        RETURNING * INTO v_user_record;
    END IF;

    -- B. INITIALIZE VARIABLES
    v_new_streak := COALESCE(v_user_record.current_streak, 0);
    v_new_longest_streak := COALESCE(v_user_record.longest_streak, 0);
    v_coins_gain := NEW.amount;
    v_xp_gain := NEW.amount * c_xp_multiplier;

    -- C. HANDLE DAILY RESET
    -- If the last coin earned date is NOT today, reset the daily counter
    IF v_user_record.last_coin_date IS NULL OR v_user_record.last_coin_date <> v_today THEN
        v_user_record.daily_coins_earned := 0;
    END IF;

    -- D. CHECK DAILY CAP
    -- If (daily_earned + gain) > cap, gain = cap - daily_earned
    IF (COALESCE(v_user_record.daily_coins_earned, 0) + v_coins_gain) > c_daily_cap THEN
       v_coins_gain := GREATEST(0, c_daily_cap - COALESCE(v_user_record.daily_coins_earned, 0));
       -- Adjust XP to match the actual coin gain
       v_xp_gain := v_coins_gain * c_xp_multiplier;
    END IF;

    -- E. UPDATE STREAK (Only for 'login' actions)
    IF NEW.action_type = 'login' THEN
        -- FIX: Handle NULL last_activity_date (first login)
        IF v_user_record.last_activity_date IS NULL THEN
            -- First time login
            v_new_streak := 1;
        ELSIF v_user_record.last_activity_date = v_today THEN
            -- Already logged in today, no streak change
            NULL;
        ELSIF v_user_record.last_activity_date = v_yesterday THEN
            -- Consecutive day
            v_new_streak := v_new_streak + 1;
        ELSE
            -- Missed a day (Streak Broken!)
            v_new_streak := 1;
            
            -- STREAK BREAK PENALTY: Reset Coins
            v_user_record.total_coins := 0; 
        END IF;

        -- Update Longest Streak
        IF v_new_streak > v_new_longest_streak THEN
            v_new_longest_streak := v_new_streak;
        END IF;
        
        -- Update activity date
        v_user_record.last_activity_date := v_today;
    END IF;

    -- F. PERFORM UPDATE
    UPDATE public.user_rewards
    SET 
        -- Economy
        total_coins = COALESCE(total_coins, 0) + v_coins_gain,
        daily_coins_earned = COALESCE(v_user_record.daily_coins_earned, 0) + v_coins_gain,
        last_coin_date = v_today,
        
        -- XP & Level
        xp = COALESCE(xp, 0) + v_xp_gain,
        level = public.calculate_level(COALESCE(xp, 0) + v_xp_gain),
        
        -- Streak (Updated only if changed above)
        current_streak = v_new_streak,
        longest_streak = v_new_longest_streak,
        last_activity_date = COALESCE(v_user_record.last_activity_date, v_today),
        
        updated_at = now()
    WHERE user_id = NEW.user_id;

    RETURN NEW;
END;
$function$;

-- Function: Update user rewards on transaction
CREATE OR REPLACE FUNCTION public.update_user_rewards_on_transaction()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- Function: Update user streak
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_last_activity_date DATE;
    v_current_streak INT;
    v_longest_streak INT;
    v_new_streak INT;
BEGIN
    -- Only process login actions
    IF NEW.action_type = 'login' THEN
        -- Get current streak data
        SELECT last_activity_date, current_streak, longest_streak
        INTO v_last_activity_date, v_current_streak, v_longest_streak
        FROM public.user_rewards
        WHERE user_id = NEW.user_id;

        -- If no record exists, initialize
        IF NOT FOUND THEN
            INSERT INTO public.user_rewards (user_id, current_streak, longest_streak, last_activity_date)
            VALUES (NEW.user_id, 1, 1, CURRENT_DATE);
            RETURN NEW;
        END IF;

        -- Calculate new streak
        IF v_last_activity_date IS NULL THEN
            -- First login ever
            v_new_streak := 1;
        ELSIF v_last_activity_date = CURRENT_DATE THEN
            -- Already logged in today, no change
            v_new_streak := v_current_streak;
        ELSIF v_last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
            -- Consecutive day login
            v_new_streak := v_current_streak + 1;
        ELSE
            -- Streak broken, start over
            v_new_streak := 1;
        END IF;

        -- Update longest streak if needed
        IF v_new_streak > v_longest_streak THEN
            v_longest_streak := v_new_streak;
        END IF;

        -- Update user_rewards
        UPDATE public.user_rewards
        SET 
            current_streak = v_new_streak,
            longest_streak = v_longest_streak,
            last_activity_date = CURRENT_DATE,
            total_coins = total_coins + NEW.amount,
            xp = xp + NEW.amount,
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
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$function$;

-- ============================================================================
-- SECTION 8: DAILY MISSIONS FUNCTIONS
-- ============================================================================

-- Function: Get or create daily missions
CREATE OR REPLACE FUNCTION public.get_or_create_daily_missions(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_today date := CURRENT_DATE;
    v_missions jsonb;
BEGIN
    -- Try to get existing missions for today
    SELECT missions INTO v_missions
    FROM daily_missions
    WHERE user_id = p_user_id AND date = v_today;

    -- If no missions exist for today, create them
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

        -- Insert new missions for today
        INSERT INTO daily_missions (user_id, date, missions)
        VALUES (p_user_id, v_today, v_missions)
        ON CONFLICT (user_id, date) DO UPDATE
        SET missions = EXCLUDED.missions;
    END IF;

    RETURN v_missions;
END;
$function$;

-- Function: Update mission progress
CREATE OR REPLACE FUNCTION public.update_mission_progress(p_user_id uuid, p_mission_type text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_today date := CURRENT_DATE;
    v_missions jsonb;
    v_mission jsonb;
    v_updated_missions jsonb := '[]'::jsonb;
    v_mission_found boolean := false;
BEGIN
    -- Get current missions
    SELECT missions INTO v_missions
    FROM daily_missions
    WHERE user_id = p_user_id AND date = v_today;

    -- If no missions exist, create them first
    IF v_missions IS NULL THEN
        v_missions := public.get_or_create_daily_missions(p_user_id);
    END IF;

    -- Update the specific mission
    FOR v_mission IN SELECT * FROM jsonb_array_elements(v_missions)
    LOOP
        IF v_mission->>'id' = p_mission_type THEN
            v_mission_found := true;
            
            -- Increment progress if not completed
            IF (v_mission->>'completed')::boolean = false THEN
                v_mission := jsonb_set(
                    v_mission,
                    '{progress}',
                    to_jsonb(LEAST((v_mission->>'progress')::int + 1, (v_mission->>'goal')::int))
                );
                
                -- Mark as completed if goal reached
                IF (v_mission->>'progress')::int >= (v_mission->>'goal')::int THEN
                    v_mission := jsonb_set(v_mission, '{completed}', 'true'::jsonb);
                END IF;
            END IF;
        END IF;
        
        v_updated_missions := v_updated_missions || v_mission;
    END LOOP;

    -- Update the database
    IF v_mission_found THEN
        UPDATE daily_missions
        SET missions = v_updated_missions, updated_at = now()
        WHERE user_id = p_user_id AND date = v_today;
    END IF;

    RETURN v_updated_missions;
END;
$function$;

-- ============================================================================
-- SECTION 9: EXAM & STATISTICS FUNCTIONS
-- ============================================================================

-- Function: Submit exam attempt
CREATE OR REPLACE FUNCTION public.submit_exam_attempt(p_attempt_id uuid, p_exam_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
    UPDATE public.exam_attempts SET status = 'submitted' WHERE id = p_attempt_id;

    -- Get Final Result Data to Return
    SELECT jsonb_build_object(
        'id', r.id,
        'obtained_marks', r.obtained_marks,
        'percentage', r.percentage
    ) INTO v_return_data
    FROM public.results r WHERE r.attempt_id = p_attempt_id;

    RETURN v_return_data;
END;
$function$;

-- Function: Get student stats
CREATE OR REPLACE FUNCTION public.get_student_stats(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- Function: Get admin dashboard stats
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats(admin_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- Function: Get admin chart data
CREATE OR REPLACE FUNCTION public.get_admin_chart_data(admin_uuid uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
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
$function$;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '✅ ALL FUNCTIONS CREATED SUCCESSFULLY!';
    RAISE NOTICE '📊 Total Functions: 30+ functions';
    RAISE NOTICE '🎯 Includes: Auth, Enrollment, Course, Community, Rewards, Exams, Stats';
    RAISE NOTICE '🚀 Your database is now fully configured!';
END $$;
