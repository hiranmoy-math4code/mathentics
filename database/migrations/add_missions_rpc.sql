-- ==========================================
-- RPC FUNCTION: Get or Create Daily Missions
-- ==========================================
-- This function will be called from the frontend to get/create missions

CREATE OR REPLACE FUNCTION public.get_or_create_daily_missions(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_today date := CURRENT_DATE;
    v_missions jsonb;
    v_mission_record record;
BEGIN
    -- Check if user has missions for today
    SELECT missions INTO v_missions
    FROM daily_missions
    WHERE user_id = p_user_id
    AND date = v_today;

    -- If no missions exist, create them
    IF v_missions IS NULL THEN
        v_missions := '[
            {"id": "login", "title": "Daily Login", "reward": 5, "progress": 0, "goal": 1, "completed": false, "icon": "Zap"},
            {"id": "quiz", "title": "Complete a Quiz", "reward": 20, "progress": 0, "goal": 1, "completed": false, "icon": "Brain"},
            {"id": "video", "title": "Watch a Video", "reward": 10, "progress": 0, "goal": 1, "completed": false, "icon": "Play"}
        ]'::jsonb;

        -- Insert new missions
        INSERT INTO daily_missions (user_id, date, missions)
        VALUES (p_user_id, v_today, v_missions)
        ON CONFLICT (user_id, date) 
        DO UPDATE SET missions = EXCLUDED.missions
        RETURNING missions INTO v_missions;
    END IF;

    RETURN v_missions;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_or_create_daily_missions(uuid) TO authenticated;


-- ==========================================
-- RPC FUNCTION: Update Mission Progress
-- ==========================================

CREATE OR REPLACE FUNCTION public.update_mission_progress(
    p_user_id uuid,
    p_mission_type text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_today date := CURRENT_DATE;
    v_missions jsonb;
    v_updated_missions jsonb;
    v_mission jsonb;
    v_index int;
BEGIN
    -- Get current missions
    SELECT missions INTO v_missions
    FROM daily_missions
    WHERE user_id = p_user_id
    AND date = v_today;

    IF v_missions IS NULL THEN
        RAISE EXCEPTION 'No missions found for today';
    END IF;

    -- Update the specific mission
    v_updated_missions := '[]'::jsonb;
    FOR v_index IN 0..(jsonb_array_length(v_missions) - 1)
    LOOP
        v_mission := v_missions->v_index;
        
        -- If this is the mission to update
        IF v_mission->>'id' = p_mission_type THEN
            -- Increment progress
            v_mission := jsonb_set(
                v_mission,
                '{progress}',
                to_jsonb((v_mission->>'progress')::int + 1)
            );
            
            -- Check if completed
            IF (v_mission->>'progress')::int >= (v_mission->>'goal')::int THEN
                v_mission := jsonb_set(v_mission, '{completed}', 'true'::jsonb);
            END IF;
        END IF;
        
        v_updated_missions := v_updated_missions || v_mission;
    END LOOP;

    -- Update in database
    UPDATE daily_missions
    SET missions = v_updated_missions,
        updated_at = now()
    WHERE user_id = p_user_id
    AND date = v_today;

    RETURN v_updated_missions;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.update_mission_progress(uuid, text) TO authenticated;
