-- ==========================================
-- TEST RPC FUNCTION DIRECTLY
-- ==========================================

-- Step 1: Get your user ID
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 1;

-- Step 2: Test the RPC function directly (replace USER_ID)
SELECT public.get_or_create_daily_missions('YOUR_USER_ID_HERE'::uuid);

-- Step 3: Check if row was created
SELECT * FROM daily_missions WHERE date = CURRENT_DATE;

-- Step 4: If function doesn't exist, check this
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name = 'get_or_create_daily_missions';

-- Step 5: If table doesn't exist, create it first
CREATE TABLE IF NOT EXISTS public.daily_missions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date date NOT NULL,
    missions jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, date)
);

ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own missions"
    ON public.daily_missions
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Step 6: Grant permissions on table
GRANT ALL ON public.daily_missions TO authenticated;
GRANT ALL ON public.daily_missions TO service_role;
