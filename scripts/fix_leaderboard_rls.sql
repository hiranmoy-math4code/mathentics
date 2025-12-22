-- Fix Leaderboard RLS Policy
-- Problem: Current policy only allows users to see their own rewards
-- Solution: Allow public read access for leaderboard functionality

-- 1. Drop old restrictive policies
DROP POLICY IF EXISTS "Users can view own rewards" ON public.user_rewards;
DROP POLICY IF EXISTS "Users can update own rewards" ON public.user_rewards;

-- 2. Create new public read policy for leaderboard
CREATE POLICY "Public can view all rewards" 
ON public.user_rewards 
FOR SELECT 
USING (true);

-- 3. Keep updates restricted to own rewards
CREATE POLICY "Users can update own rewards" 
ON public.user_rewards 
FOR UPDATE 
USING (user_id = auth.uid());

-- 4. Allow system to insert (via triggers)
CREATE POLICY "System can insert rewards" 
ON public.user_rewards 
FOR INSERT 
WITH CHECK (true);

-- 5. Verify RLS is enabled
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;

-- Test query (should return all users now)
-- SELECT user_id, total_coins, xp, level 
-- FROM public.user_rewards 
-- ORDER BY total_coins DESC 
-- LIMIT 10;
