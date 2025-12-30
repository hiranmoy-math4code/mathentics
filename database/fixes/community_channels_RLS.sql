-- ============================================================================
-- RLS POLICIES for community_channels table
-- ============================================================================

-- Enable RLS
ALTER TABLE community_channels ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "community_channels_select_policy" ON community_channels;
DROP POLICY IF EXISTS "community_channels_insert_policy" ON community_channels;
DROP POLICY IF EXISTS "community_channels_update_policy" ON community_channels;
DROP POLICY IF EXISTS "community_channels_delete_policy" ON community_channels;

-- SELECT: Users can view channels for courses they're enrolled in (in their tenant)
CREATE POLICY "community_channels_select_policy" ON community_channels
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND (
            -- Students can see channels for courses they're enrolled in
            course_id IN (
                SELECT course_id 
                FROM enrollments 
                WHERE user_id = auth.uid()
            )
            OR
            -- Admins can see all channels in their tenant
            EXISTS (
                SELECT 1 FROM profiles
                WHERE id = auth.uid()
                AND role IN ('admin', 'super_admin')
            )
        )
    );

-- INSERT: Only admins and system can create channels
CREATE POLICY "community_channels_insert_policy" ON community_channels
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('admin', 'super_admin')
        )
    );

-- UPDATE: Only admins can update channels
CREATE POLICY "community_channels_update_policy" ON community_channels
    FOR UPDATE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('admin', 'super_admin')
        )
    );

-- DELETE: Only admins can delete channels
CREATE POLICY "community_channels_delete_policy" ON community_channels
    FOR DELETE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid()
            AND role IN ('admin', 'super_admin')
        )
    );

-- Verify policies
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies
WHERE tablename = 'community_channels'
ORDER BY cmd, policyname;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ RLS policies created for community_channels!';
    RAISE NOTICE '✅ Students can now view channels for enrolled courses';
    RAISE NOTICE '✅ Admins can manage all channels in their tenant';
END $$;
