-- ==========================================
-- RECREATE DAILY MISSIONS TABLE FROM SCRATCH
-- ==========================================
-- This drops and recreates the daily_missions table with the correct structure

-- Step 1: Drop existing table (backup data first if needed)
DROP TABLE IF EXISTS public.daily_missions CASCADE;

-- Step 2: Create table with correct structure
CREATE TABLE public.daily_missions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date date NOT NULL,
    missions jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, date)
);

-- Step 3: Enable RLS
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;

-- Step 4: Create RLS policy
CREATE POLICY "Users can manage their own missions"
    ON public.daily_missions
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Step 5: Grant permissions
GRANT ALL ON public.daily_missions TO authenticated;
GRANT ALL ON public.daily_missions TO service_role;

-- Step 6: Drop and recreate RPC function
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

-- Step 7: Recreate update mission progress function
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

-- Step 8: Grant permissions on functions
GRANT EXECUTE ON FUNCTION public.get_or_create_daily_missions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_mission_progress(uuid, text) TO authenticated;

-- Step 9: Verify everything
SELECT 'Table created successfully' as status;

SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'daily_missions'
ORDER BY ordinal_position;
