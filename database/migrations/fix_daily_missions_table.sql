-- ==========================================
-- FIX DAILY MISSIONS TABLE STRUCTURE
-- ==========================================
-- This migration adds the missing 'missions' column to daily_missions table
-- and recreates the RPC function with correct column references

-- Step 1: Check if table exists and add missions column if missing
DO $$ 
BEGIN
    -- Add missions column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'daily_missions' 
        AND column_name = 'missions'
    ) THEN
        ALTER TABLE public.daily_missions 
        ADD COLUMN missions jsonb NOT NULL DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- Step 2: Drop and recreate the RPC function with correct logic
DROP FUNCTION IF EXISTS public.get_or_create_daily_missions(uuid);

CREATE OR REPLACE FUNCTION public.get_or_create_daily_missions(p_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Step 3: Recreate update mission progress function
DROP FUNCTION IF EXISTS public.update_mission_progress(uuid, text);

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
$$;

-- Step 4: Grant permissions
GRANT EXECUTE ON FUNCTION public.get_or_create_daily_missions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_mission_progress(uuid, text) TO authenticated;

-- Step 5: Verify the fix
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'daily_missions'
ORDER BY ordinal_position;
