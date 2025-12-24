-- ==========================================
-- MANUAL TEST: Create Daily Missions
-- ==========================================
-- Run this to manually create missions for your user

-- Replace YOUR_USER_ID with your actual user ID
-- You can find it by running: SELECT id FROM auth.users LIMIT 1;

-- Step 1: Get your user ID
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Step 2: Manually insert missions (replace the user_id below)
INSERT INTO daily_missions (user_id, date, missions)
VALUES (
    'YOUR_USER_ID_HERE',  -- Replace with your user ID from Step 1
    CURRENT_DATE,
    '[
        {"id": "login", "title": "Daily Login", "reward": 5, "progress": 1, "goal": 1, "completed": true, "icon": "Zap"},
        {"id": "quiz", "title": "Complete a Quiz", "reward": 20, "progress": 0, "goal": 1, "completed": false, "icon": "Brain"},
        {"id": "video", "title": "Watch a Video", "reward": 10, "progress": 0, "goal": 1, "completed": false, "icon": "Play"}
    ]'::jsonb
)
ON CONFLICT (user_id, date) 
DO UPDATE SET 
    missions = EXCLUDED.missions,
    updated_at = now();

-- Step 3: Verify it was created
SELECT * FROM daily_missions WHERE date = CURRENT_DATE;

-- Step 4: Check if you can read it (RLS test)
SELECT * FROM daily_missions WHERE user_id = 'YOUR_USER_ID_HERE';
