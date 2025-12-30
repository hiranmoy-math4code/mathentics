-- ============================================================================
-- RLS POLICIES for community_messages table
-- ============================================================================

-- Enable RLS
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "community_messages_select_policy" ON community_messages;
DROP POLICY IF EXISTS "community_messages_insert_policy" ON community_messages;
DROP POLICY IF EXISTS "community_messages_update_policy" ON community_messages;
DROP POLICY IF EXISTS "community_messages_delete_policy" ON community_messages;

-- SELECT: Users can view messages in channels they have access to
CREATE POLICY "community_messages_select_policy" ON community_messages
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND channel_id IN (
            SELECT id FROM community_channels
            WHERE course_id IN (
                SELECT course_id FROM enrollments WHERE user_id = auth.uid()
            )
            OR EXISTS (
                SELECT 1 FROM profiles
                WHERE id = auth.uid()
                AND role IN ('admin', 'super_admin')
            )
        )
    );

-- INSERT: Users can send messages in channels they have access to
CREATE POLICY "community_messages_insert_policy" ON community_messages
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND user_id = auth.uid()
        AND channel_id IN (
            SELECT id FROM community_channels
            WHERE course_id IN (
                SELECT course_id FROM enrollments WHERE user_id = auth.uid()
            )
        )
    );

-- UPDATE: Users can only update their own messages
CREATE POLICY "community_messages_update_policy" ON community_messages
    FOR UPDATE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND user_id = auth.uid()
    );

-- DELETE: Users can delete their own messages, admins can delete any
CREATE POLICY "community_messages_delete_policy" ON community_messages
    FOR DELETE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND (
            user_id = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles
                WHERE id = auth.uid()
                AND role IN ('admin', 'super_admin')
            )
        )
    );

-- Verify policies
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies
WHERE tablename = 'community_messages'
ORDER BY cmd, policyname;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ RLS policies created for community_messages!';
    RAISE NOTICE '✅ Users can now send and view messages';
    RAISE NOTICE '✅ All messages are tenant-isolated';
END $$;
