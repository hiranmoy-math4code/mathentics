-- ============================================================================
-- VERIFICATION SCRIPT: Test All Critical Fixes
-- ============================================================================
-- Run this script in Supabase SQL Editor after deploying all fixes
-- ============================================================================

-- ============================================================================
-- TEST 1: Verify Tenant Indexes Created
-- ============================================================================
SELECT 
    '✅ TEST 1: Tenant Indexes' as test_name,
    COUNT(*) as index_count,
    CASE 
        WHEN COUNT(*) >= 8 THEN '✅ PASS'
        ELSE '❌ FAIL - Expected 8 indexes'
    END as status
FROM pg_indexes 
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%tenant%';

-- Detailed index list
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
  AND indexname LIKE 'idx_%tenant%'
ORDER BY tablename, indexname;

-- ============================================================================
-- TEST 2: Verify Daily Mission Trigger Exists
-- ============================================================================
SELECT 
    '✅ TEST 2: Daily Mission Trigger' as test_name,
    COUNT(*) as trigger_count,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ PASS'
        ELSE '❌ FAIL - Trigger not found'
    END as status
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
WHERE c.relname = 'exam_attempts'
  AND t.tgname = 'on_exam_completed_update_mission';

-- ============================================================================
-- TEST 3: Verify Daily Mission Function Exists
-- ============================================================================
SELECT 
    '✅ TEST 3: Daily Mission Function' as test_name,
    COUNT(*) as function_count,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ PASS'
        ELSE '❌ FAIL - Function not found'
    END as status
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname = 'handle_quiz_completion_mission';

-- ============================================================================
-- TEST 4: Verify Reward Functions Exist
-- ============================================================================
SELECT 
    '✅ TEST 4: Reward Functions' as test_name,
    COUNT(*) as function_count,
    CASE 
        WHEN COUNT(*) >= 3 THEN '✅ PASS'
        ELSE '❌ FAIL - Expected 3 functions'
    END as status
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname IN ('get_user_rewards', 'award_coins', 'get_user_streak');

-- ============================================================================
-- TEST 5: Test Daily Mission Trigger (Functional Test)
-- ============================================================================
-- This test creates a test exam attempt and verifies the trigger fires

DO $$
DECLARE
    v_test_user_id UUID := gen_random_uuid();
    v_test_exam_id UUID := gen_random_uuid();
    v_test_attempt_id UUID := gen_random_uuid();
    v_mission_progress INTEGER;
BEGIN
    -- Create test exam attempt
    INSERT INTO exam_attempts (id, student_id, exam_id, status, submitted_at)
    VALUES (v_test_attempt_id, v_test_user_id, v_test_exam_id, 'in_progress', NOW());
    
    -- Update to submitted (should trigger mission update)
    UPDATE exam_attempts 
    SET status = 'submitted'
    WHERE id = v_test_attempt_id;
    
    -- Check if mission was updated
    SELECT progress INTO v_mission_progress
    FROM daily_missions
    WHERE user_id = v_test_user_id
      AND id = 'quiz'
      AND date = CURRENT_DATE;
    
    -- Cleanup
    DELETE FROM daily_missions WHERE user_id = v_test_user_id;
    DELETE FROM exam_attempts WHERE id = v_test_attempt_id;
    
    -- Report result
    IF v_mission_progress = 1 THEN
        RAISE NOTICE '✅ TEST 5: Daily Mission Trigger - PASS (mission updated to 1)';
    ELSE
        RAISE NOTICE '❌ TEST 5: Daily Mission Trigger - FAIL (mission progress: %)', COALESCE(v_mission_progress::TEXT, 'NULL');
    END IF;
END $$;

-- ============================================================================
-- TEST 6: Verify Index Usage (Performance Test)
-- ============================================================================
-- This explains the query plan to verify indexes are being used

EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM user_rewards
WHERE tenant_id = (SELECT id FROM tenants LIMIT 1)
  AND user_id = (SELECT id FROM profiles LIMIT 1);

-- Expected: Should use idx_user_rewards_tenant_user

-- ============================================================================
-- SUMMARY
-- ============================================================================
SELECT 
    '🎯 VERIFICATION SUMMARY' as summary,
    (SELECT COUNT(*) FROM pg_indexes WHERE indexname LIKE 'idx_%tenant%') as tenant_indexes,
    (SELECT COUNT(*) FROM pg_trigger t JOIN pg_class c ON t.tgrelid = c.oid 
     WHERE c.relname = 'exam_attempts' AND t.tgname = 'on_exam_completed_update_mission') as mission_trigger,
    (SELECT COUNT(*) FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid 
     WHERE n.nspname = 'public' AND p.proname IN ('get_user_rewards', 'award_coins', 'get_user_streak')) as reward_functions;

-- ============================================================================
-- EXPECTED RESULTS:
-- - tenant_indexes: 8
-- - mission_trigger: 1
-- - reward_functions: 3
-- ============================================================================
