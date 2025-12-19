-- =====================================================
-- DATABASE INDEXING VERIFICATION SCRIPT
-- =====================================================
-- Purpose: Verify and create critical indexes for optimal query performance
-- Run this in Supabase SQL Editor to ensure parallel fetching is backed by fast queries

-- =====================================================
-- STEP 1: CHECK EXISTING INDEXES
-- =====================================================
SELECT 
    tablename, 
    indexname, 
    indexdef 
FROM 
    pg_indexes 
WHERE 
    schemaname = 'public' 
    AND tablename IN ('courses', 'enrollments', 'lessons', 'lesson_progress', 'modules', 'profiles')
ORDER BY 
    tablename, indexname;

-- =====================================================
-- STEP 2: CREATE MISSING CRITICAL INDEXES
-- =====================================================

-- Composite index for enrollment checks (user_id, course_id)
-- Used in: Course layout, lesson pages, dashboard
CREATE INDEX IF NOT EXISTS idx_enrollments_user_course 
ON enrollments(user_id, course_id);

-- Composite index for lesson progress lookups
-- Used in: Course structure, progress tracking
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_course 
ON lesson_progress(user_id, course_id);

-- Index for module-lesson joins
-- Used in: Course structure queries
CREATE INDEX IF NOT EXISTS idx_lessons_module 
ON lessons(module_id);

-- Index for course-module joins
-- Used in: Course structure queries
CREATE INDEX IF NOT EXISTS idx_modules_course 
ON modules(course_id);

-- Partial index for active enrollments only (reduces index size)
-- Used in: Enrollment status checks
CREATE INDEX IF NOT EXISTS idx_enrollments_status 
ON enrollments(status) 
WHERE status = 'active';

-- Index for lesson completion tracking
-- Used in: Progress calculations
CREATE INDEX IF NOT EXISTS idx_lesson_progress_completed 
ON lesson_progress(completed, user_id, course_id);

-- Index for course published status
-- Used in: Course listings
CREATE INDEX IF NOT EXISTS idx_courses_published 
ON courses(is_published) 
WHERE is_published = true;

-- =====================================================
-- STEP 3: VERIFY INDEX CREATION
-- =====================================================
SELECT 
    tablename, 
    indexname, 
    indexdef 
FROM 
    pg_indexes 
WHERE 
    schemaname = 'public' 
    AND indexname LIKE 'idx_%'
ORDER BY 
    tablename, indexname;

-- =====================================================
-- STEP 4: ANALYZE TABLES (Update statistics)
-- =====================================================
ANALYZE enrollments;
ANALYZE lesson_progress;
ANALYZE lessons;
ANALYZE modules;
ANALYZE courses;
ANALYZE profiles;

-- =====================================================
-- PERFORMANCE VERIFICATION QUERIES (OPTIONAL)
-- =====================================================
-- NOTE: These queries use placeholder UUIDs and will fail if run as-is.
-- To test index performance, replace the placeholder UUIDs with actual values from your database.

-- Example: Get a real user_id and course_id from your database first:
-- SELECT id FROM profiles LIMIT 1;
-- SELECT id FROM courses LIMIT 1;

-- Then uncomment and replace the UUIDs below:

/*
-- Test enrollment check performance (should use idx_enrollments_user_course)
EXPLAIN ANALYZE
SELECT status 
FROM enrollments 
WHERE user_id = '00000000-0000-0000-0000-000000000000'  -- Replace with real UUID
  AND course_id = '00000000-0000-0000-0000-000000000000'  -- Replace with real UUID
  AND status = 'active';

-- Test lesson progress lookup (should use idx_lesson_progress_user_course)
EXPLAIN ANALYZE
SELECT * 
FROM lesson_progress 
WHERE user_id = '00000000-0000-0000-0000-000000000000'  -- Replace with real UUID
  AND course_id = '00000000-0000-0000-0000-000000000000';  -- Replace with real UUID
*/

-- =====================================================
-- EXPECTED RESULTS
-- =====================================================
-- All EXPLAIN ANALYZE queries should show "Index Scan" instead of "Seq Scan"
-- Query execution time should be < 10ms for indexed queries
-- If you see "Seq Scan", the index is not being used - check your WHERE clause

