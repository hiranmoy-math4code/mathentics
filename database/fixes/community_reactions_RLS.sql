-- ============================================================================
-- RLS POLICIES for community_reactions table
-- ============================================================================

-- Enable RLS
ALTER TABLE community_reactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "community_reactions_select_policy" ON community_reactions;
DROP POLICY IF EXISTS "community_reactions_insert_policy" ON community_reactions;
DROP POLICY IF EXISTS "community_reactions_delete_policy" ON community_reactions;

-- SELECT: Users can view reactions on messages they can see
CREATE POLICY "community_reactions_select_policy" ON community_reactions
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
    );

-- INSERT: Users can add reactions to messages they can see
CREATE POLICY "community_reactions_insert_policy" ON community_reactions
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND user_id = auth.uid()
    );

-- DELETE: Users can only delete their own reactions
CREATE POLICY "community_reactions_delete_policy" ON community_reactions
    FOR DELETE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
            AND is_active = true
        )
        AND user_id = auth.uid()
    );

-- Verify policies
SELECT 
    tablename,
    policyname,
    cmd,
    permissive
FROM pg_policies
WHERE tablename = 'community_reactions'
ORDER BY cmd, policyname;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ RLS policies created for community_reactions!';
    RAISE NOTICE '✅ Users can now add/remove reactions';
    RAISE NOTICE '✅ All reactions are tenant-isolated';
END $$;
