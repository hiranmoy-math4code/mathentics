-- ============================================================================
-- FIX: Ensure Strict Tenant Isolation for Enrollments
-- ============================================================================
-- This script ensures users can ONLY see enrollments from their ACTIVE tenant

-- STEP 1: Verify user_tenant_memberships has correct is_active flags
-- Only ONE membership should be active per user at a time
WITH active_counts AS (
    SELECT 
        user_id,
        tenant_id,
        is_active,
        COUNT(*) OVER (PARTITION BY user_id) as active_count
    FROM user_tenant_memberships
    WHERE is_active = true
)
SELECT * FROM active_counts WHERE active_count > 1;

-- If above query returns rows, it means a user has multiple active tenants (BAD!)
-- Fix: Ensure only one active tenant per user
-- (You'll need to manually decide which one should be active)

-- STEP 2: Update RLS policy for enrollments to be SUPER STRICT
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

CREATE POLICY "Users can view their own enrollments in active tenant"
ON public.enrollments
FOR SELECT
USING (
    user_id = auth.uid()
    AND tenant_id IN (
        SELECT tenant_id 
        FROM public.user_tenant_memberships 
        WHERE user_id = auth.uid() 
        AND is_active = true
        LIMIT 1
    )
);

-- STEP 3: Ensure enrollment INSERT also checks tenant
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON public.enrollments;

CREATE POLICY "Users can insert their own enrollments in active tenant"
ON public.enrollments
FOR INSERT
WITH CHECK (
    user_id = auth.uid()
    AND tenant_id IN (
        SELECT tenant_id 
        FROM public.user_tenant_memberships 
        WHERE user_id = auth.uid() 
        AND is_active = true
        LIMIT 1
    )
);

-- STEP 4: Check for any cross-tenant enrollments (data integrity check)
SELECT 
    e.id as enrollment_id,
    e.user_id,
    e.tenant_id as enrollment_tenant,
    m.tenant_id as user_active_tenant,
    c.title as course_title
FROM enrollments e
LEFT JOIN user_tenant_memberships m ON e.user_id = m.user_id AND m.is_active = true
LEFT JOIN courses c ON e.course_id = c.id
WHERE e.tenant_id != m.tenant_id
ORDER BY e.user_id;

-- If above query returns rows, those are problematic enrollments
-- They were created in a different tenant than user's current active tenant

-- STEP 5: Verify courses table also has proper tenant_id
SELECT 
    id,
    title,
    tenant_id,
    is_published
FROM courses
WHERE tenant_id IS NULL;

-- If above returns rows, those courses have no tenant (BAD!)

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check a specific user's enrollments across tenants
-- Replace 'USER_ID_HERE' with actual user ID
/*
SELECT 
    e.id,
    e.course_id,
    c.title,
    e.tenant_id,
    t.name as tenant_name,
    e.status,
    m.is_active as is_users_active_tenant
FROM enrollments e
JOIN courses c ON e.course_id = c.id
JOIN tenants t ON e.tenant_id = t.id
LEFT JOIN user_tenant_memberships m ON e.user_id = m.user_id AND e.tenant_id = m.tenant_id
WHERE e.user_id = 'USER_ID_HERE'
ORDER BY m.is_active DESC, e.created_at DESC;
*/
