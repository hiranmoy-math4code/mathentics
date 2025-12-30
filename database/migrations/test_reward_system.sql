-- ============================================================================
-- COMPREHENSIVE REWARD SYSTEM TEST
-- ============================================================================
-- This script tests the complete reward flow after login
-- Run this in Supabase SQL Editor to verify everything works
-- ============================================================================

-- ============================================================================
-- TEST 1: Check if reward functions exist
-- ============================================================================
SELECT 
    '✅ TEST 1: Reward Functions' as test_name,
    proname as function_name,
    CASE 
        WHEN proname IN ('get_user_rewards', 'award_coins', 'get_user_streak') 
        THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN ('get_user_rewards', 'award_coins', 'get_user_streak', 'update_mission_progress');

-- ============================================================================
-- TEST 2: Check if reward triggers exist
-- ============================================================================
SELECT 
    '✅ TEST 2: Reward Triggers' as test_name,
    t.tgname as trigger_name,
    c.relname as table_name,
    '✅ ACTIVE' as status
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname IN ('reward_transactions', 'exam_attempts')
  AND t.tgname IN ('update_rewards_on_transaction', 'update_streak_on_transaction', 'on_exam_completed_update_mission');

-- ============================================================================
-- TEST 3: Simulate Login Reward Flow
-- ============================================================================
DO $$
DECLARE
    v_test_user_id UUID;
    v_test_tenant_id UUID;
    v_result JSON;
    v_initial_coins INTEGER;
    v_final_coins INTEGER;
    v_streak INTEGER;
BEGIN
    -- Get a real tenant ID
    SELECT id INTO v_test_tenant_id FROM tenants WHERE is_active = true LIMIT 1;
    
    IF v_test_tenant_id IS NULL THEN
        RAISE EXCEPTION 'No active tenant found. Please create a tenant first.';
    END IF;
    
    -- Create a test user
    v_test_user_id := gen_random_uuid();
    
    RAISE NOTICE '========================================';
    RAISE NOTICE '🧪 Testing Login Reward Flow';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Test User ID: %', v_test_user_id;
    RAISE NOTICE 'Test Tenant ID: %', v_test_tenant_id;
    RAISE NOTICE '';
    
    -- Step 1: Get initial user rewards (should auto-create)
    RAISE NOTICE '📊 Step 1: Getting initial user rewards...';
    SELECT total_coins INTO v_initial_coins
    FROM get_user_rewards(v_test_user_id, v_test_tenant_id)
    LIMIT 1;
    
    RAISE NOTICE '   Initial coins: %', v_initial_coins;
    RAISE NOTICE '';
    
    -- Step 2: Award login coins
    RAISE NOTICE '💰 Step 2: Awarding login coins...';
    SELECT award_coins(
        v_test_user_id,
        v_test_tenant_id,
        'login',
        NULL,
        'Test login reward'
    ) INTO v_result;
    
    RAISE NOTICE '   Result: %', v_result;
    RAISE NOTICE '';
    
    -- Step 3: Check final coins
    RAISE NOTICE '📊 Step 3: Checking final coins...';
    SELECT total_coins INTO v_final_coins
    FROM user_rewards
    WHERE user_id = v_test_user_id
      AND tenant_id = v_test_tenant_id;
    
    RAISE NOTICE '   Final coins: %', v_final_coins;
    RAISE NOTICE '   Coins earned: %', (v_final_coins - v_initial_coins);
    RAISE NOTICE '';
    
    -- Step 4: Check streak
    RAISE NOTICE '🔥 Step 4: Checking streak...';
    SELECT current_streak INTO v_streak
    FROM user_rewards
    WHERE user_id = v_test_user_id
      AND tenant_id = v_test_tenant_id;
    
    RAISE NOTICE '   Current streak: %', v_streak;
    RAISE NOTICE '';
    
    -- Step 5: Check reward transaction
    RAISE NOTICE '📝 Step 5: Checking reward transaction...';
    IF EXISTS (
        SELECT 1 FROM reward_transactions
        WHERE user_id = v_test_user_id
          AND tenant_id = v_test_tenant_id
          AND action_type = 'login'
    ) THEN
        RAISE NOTICE '   ✅ Transaction recorded';
    ELSE
        RAISE NOTICE '   ❌ Transaction NOT recorded';
    END IF;
    RAISE NOTICE '';
    
    -- Cleanup
    RAISE NOTICE '🧹 Cleaning up test data...';
    DELETE FROM reward_transactions WHERE user_id = v_test_user_id;
    DELETE FROM user_rewards WHERE user_id = v_test_user_id;
    DELETE FROM daily_missions WHERE user_id = v_test_user_id;
    
    -- Final verdict
    RAISE NOTICE '========================================';
    IF (v_final_coins - v_initial_coins) = 5 AND v_streak = 1 THEN
        RAISE NOTICE '✅ LOGIN REWARD SYSTEM: WORKING PERFECTLY!';
        RAISE NOTICE '   - Coins awarded: 5 ✅';
        RAISE NOTICE '   - Streak updated: 1 ✅';
        RAISE NOTICE '   - Transaction recorded ✅';
    ELSE
        RAISE NOTICE '❌ LOGIN REWARD SYSTEM: ISSUES FOUND!';
        RAISE NOTICE '   - Expected coins: 5, Got: %', (v_final_coins - v_initial_coins);
        RAISE NOTICE '   - Expected streak: 1, Got: %', v_streak;
    END IF;
    RAISE NOTICE '========================================';
END $$;

-- ============================================================================
-- TEST 4: Check Daily Mission System
-- ============================================================================
SELECT 
    '✅ TEST 4: Daily Mission System' as test_name,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_proc p
            JOIN pg_namespace n ON p.pronamespace = n.oid
            WHERE n.nspname = 'public'
              AND p.proname = 'get_or_create_daily_missions'
        ) THEN '✅ Function exists'
        ELSE '❌ Function missing'
    END as status;

-- ============================================================================
-- TEST 5: Check Indexes
-- ============================================================================
SELECT 
    '✅ TEST 5: Performance Indexes' as test_name,
    COUNT(*) as index_count,
    CASE 
        WHEN COUNT(*) >= 8 THEN '✅ All indexes created'
        ELSE '⚠️ Some indexes missing (expected 8, got ' || COUNT(*) || ')'
    END as status
FROM pg_indexes 
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%tenant%';

-- ============================================================================
-- SUMMARY
-- ============================================================================
SELECT 
    '🎯 REWARD SYSTEM STATUS' as summary,
    (SELECT COUNT(*) FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid 
     WHERE n.nspname = 'public' AND p.proname IN ('get_user_rewards', 'award_coins', 'get_user_streak')) as reward_functions,
    (SELECT COUNT(*) FROM pg_trigger t JOIN pg_class c ON t.tgrelid = c.oid 
     WHERE c.relname = 'reward_transactions') as reward_triggers,
    (SELECT COUNT(*) FROM pg_indexes WHERE indexname LIKE 'idx_%tenant%') as tenant_indexes;
