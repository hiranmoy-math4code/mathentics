-- ==========================================
-- CHECK DAILY MISSIONS ISSUE
-- ==========================================

-- 1. Check if daily_missions table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'daily_missions';
-- Expected: Should return 'daily_missions'
-- If empty: Table doesn't exist


-- 2. Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'daily_missions'
ORDER BY ordinal_position;


-- 3. Check if there are any missions
SELECT * FROM daily_missions
ORDER BY created_at DESC
LIMIT 5;


-- 4. Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'daily_missions';


-- 5. Try to manually insert a mission for testing
-- (Uncomment to test)
/*
INSERT INTO daily_missions (user_id, date, missions)
VALUES (
    (SELECT id FROM auth.users LIMIT 1),
    CURRENT_DATE,
    '[
        {"id": "login", "title": "Daily Login", "reward": 5, "progress": 0, "goal": 1, "completed": false, "icon": "Zap"},
        {"id": "quiz", "title": "Complete a Quiz", "reward": 20, "progress": 0, "goal": 1, "completed": false, "icon": "Brain"},
        {"id": "video", "title": "Watch a Video", "reward": 10, "progress": 0, "goal": 1, "completed": false, "icon": "Play"}
    ]'::jsonb
);
*/


-- 6. If table doesn't exist, create it
/*
CREATE TABLE IF NOT EXISTS public.daily_missions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date date NOT NULL,
    missions jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own missions"
    ON public.daily_missions
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own missions"
    ON public.daily_missions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own missions"
    ON public.daily_missions
    FOR UPDATE
    USING (auth.uid() = user_id);
*/
