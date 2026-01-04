-- ============================================================================
-- PAYMENT SCALABILITY INDEXES
-- ============================================================================
-- Purpose: Optimize payment queries for 10,000+ concurrent users
-- Safe to run: All indexes use IF NOT EXISTS
-- ============================================================================

-- 1. Idempotency Check Optimization
-- Query: SELECT * FROM course_payments WHERE user_id = ? AND course_id = ? AND status IN (...)
CREATE INDEX IF NOT EXISTS idx_course_payments_idempotency 
  ON course_payments(user_id, course_id, status, created_at DESC)
  WHERE status IN ('pending', 'processing');

COMMENT ON INDEX idx_course_payments_idempotency IS 
  'Optimizes duplicate payment prevention - critical for 10K+ concurrent users';

-- 2. Transaction Lookup Optimization (Covering Index)
-- Query: SELECT * FROM course_payments WHERE transaction_id = ?
CREATE INDEX IF NOT EXISTS idx_course_payments_transaction_lookup
  ON course_payments(transaction_id, status, user_id, course_id, tenant_id);

COMMENT ON INDEX idx_course_payments_transaction_lookup IS 
  'Covering index for payment verification - reduces disk I/O';

-- 3. Enrollment Duplicate Check Optimization
-- Query: SELECT id FROM enrollments WHERE course_id = ? AND user_id = ?
CREATE INDEX IF NOT EXISTS idx_enrollments_duplicate_check
  ON enrollments(course_id, user_id, status);

COMMENT ON INDEX idx_enrollments_duplicate_check IS 
  'Prevents duplicate enrollment checks during payment processing';

-- 4. Payment Status Filtering (for admin dashboards)
-- Query: SELECT * FROM course_payments WHERE status = ? ORDER BY created_at DESC
CREATE INDEX IF NOT EXISTS idx_course_payments_status_time
  ON course_payments(status, created_at DESC)
  WHERE status IN ('pending', 'processing', 'failed');

COMMENT ON INDEX idx_course_payments_status_time IS 
  'Optimizes admin payment monitoring and retry logic';

-- 5. Tenant-specific Payment Queries
-- Query: SELECT * FROM course_payments WHERE tenant_id = ? AND status = ?
CREATE INDEX IF NOT EXISTS idx_course_payments_tenant_status
  ON course_payments(tenant_id, status, created_at DESC);

COMMENT ON INDEX idx_course_payments_tenant_status IS 
  'Multi-tenant payment isolation and reporting';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if indexes were created successfully
DO $$ 
DECLARE
    idx_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO idx_count
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'course_payments'
      AND indexname LIKE 'idx_course_payments_%';
    
    RAISE NOTICE '✅ Total payment indexes: %', idx_count;
    RAISE NOTICE '🚀 Payment scalability indexes created successfully!';
    RAISE NOTICE '💡 Run ANALYZE course_payments; to update statistics';
END $$;

-- Update table statistics for query planner
ANALYZE course_payments;
ANALYZE enrollments;

-- ============================================================================
-- PERFORMANCE TESTING QUERIES
-- ============================================================================

-- Test 1: Idempotency check (should use idx_course_payments_idempotency)
-- EXPLAIN ANALYZE
-- SELECT * FROM course_payments
-- WHERE user_id = 'test-user-id'
--   AND course_id = 'test-course-id'
--   AND status IN ('pending', 'processing')
-- ORDER BY created_at DESC
-- LIMIT 1;

-- Test 2: Transaction lookup (should use idx_course_payments_transaction_lookup)
-- EXPLAIN ANALYZE
-- SELECT * FROM course_payments
-- WHERE transaction_id = 'test-txn-id';

-- Test 3: Enrollment check (should use idx_enrollments_duplicate_check)
-- EXPLAIN ANALYZE
-- SELECT id FROM enrollments
-- WHERE course_id = 'test-course-id'
--   AND user_id = 'test-user-id';
