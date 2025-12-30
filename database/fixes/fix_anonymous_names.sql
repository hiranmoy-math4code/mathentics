-- ============================================================================
-- FIX: Populate full_name in profiles table
-- ============================================================================
-- This will fix "Anonymous" names in leaderboard
-- ============================================================================

-- Option 1: Set full_name from email (before @ symbol)
UPDATE profiles
SET full_name = SPLIT_PART(email, '@', 1)
WHERE full_name IS NULL OR full_name = '';

-- Option 2: For users without email, generate a name
UPDATE profiles
SET full_name = 'User ' || SUBSTRING(id::text, 1, 8)
WHERE full_name IS NULL OR full_name = '';

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Check updated profiles
SELECT 
    id,
    full_name,
    email,
    avatar_url
FROM profiles
WHERE full_name IS NOT NULL
ORDER BY updated_at DESC
LIMIT 10;

-- Check if any NULL names remain
SELECT COUNT(*) as null_names_remaining
FROM profiles
WHERE full_name IS NULL OR full_name = '';
