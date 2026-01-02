-- ============================================================================
-- EXAM-WISE LEADERBOARD FUNCTION
-- ============================================================================
-- Returns leaderboard for a specific exam showing each student's BEST attempt
-- Includes rank, student info, scores, and percentage
-- Optimized for performance with proper indexing

CREATE OR REPLACE FUNCTION get_exam_leaderboard(
    p_exam_id UUID,
    p_tenant_id UUID,
    p_limit INTEGER DEFAULT 50
)
RETURNS TABLE (
    rank BIGINT,
    student_id UUID,
    full_name TEXT,
    avatar_url TEXT,
    obtained_marks NUMERIC,
    total_marks NUMERIC,
    percentage NUMERIC,
    attempt_id UUID,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    WITH student_best_attempts AS (
        -- Get the best attempt for each student
        -- Note: results table doesn't have exam_id, we join through exam_attempts
        SELECT DISTINCT ON (ea.student_id)
            ea.student_id,
            ea.id as attempt_id,
            r.obtained_marks,
            r.total_marks,
            r.percentage,
            r.rank as current_rank,
            r.created_at
        FROM exam_attempts ea
        INNER JOIN results r ON r.attempt_id = ea.id
        WHERE ea.exam_id = p_exam_id
            AND ea.tenant_id = p_tenant_id
            AND ea.status = 'submitted'
        ORDER BY ea.student_id, r.obtained_marks DESC, r.created_at ASC
    ),
    ranked_students AS (
        -- Rank students based on their best marks
        SELECT
            sba.*,
            DENSE_RANK() OVER (ORDER BY sba.obtained_marks DESC) as new_rank
        FROM student_best_attempts sba
    )
    -- Join with profiles to get student info
    SELECT
        rs.new_rank::BIGINT as rank,
        rs.student_id,
        COALESCE(p.full_name, 'Anonymous User') as full_name,
        p.avatar_url,
        rs.obtained_marks,
        rs.total_marks,
        rs.percentage,
        rs.attempt_id,
        rs.created_at
    FROM ranked_students rs
    LEFT JOIN profiles p ON p.id = rs.student_id
    ORDER BY rs.new_rank ASC
    LIMIT p_limit;
END;
$$;

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for fast filtering by exam_id and tenant_id on exam_attempts
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam_tenant_status
ON exam_attempts(exam_id, tenant_id, status)
WHERE status = 'submitted';

-- Index for fast lookup of results by attempt_id
CREATE INDEX IF NOT EXISTS idx_results_attempt_marks
ON results(attempt_id, obtained_marks DESC);

-- Note: Removed idx_results_exam_tenant_marks since results table doesn't have exam_id

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
GRANT EXECUTE ON FUNCTION get_exam_leaderboard TO authenticated;

-- ============================================================================
-- USAGE EXAMPLE
-- ============================================================================
-- SELECT * FROM get_exam_leaderboard(
--     'exam-uuid-here'::uuid,
--     'tenant-uuid-here'::uuid,
--     50
-- );
