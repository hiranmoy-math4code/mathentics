-- ============================================================================
-- COMPREHENSIVE FIX: Update ALL content table RLS policies for multi-tenant
-- ============================================================================
-- This fixes RLS violations for modules, lessons, and all other content tables

-- Step 1: MODULES
DROP POLICY IF EXISTS "tenant_isolation_modules_select" ON modules;
DROP POLICY IF EXISTS "tenant_isolation_modules_insert" ON modules;
DROP POLICY IF EXISTS "tenant_isolation_modules_update" ON modules;
DROP POLICY IF EXISTS "tenant_isolation_modules_delete" ON modules;

CREATE POLICY "tenant_isolation_modules_select"
ON modules FOR SELECT TO public
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "tenant_isolation_modules_insert"
ON modules FOR INSERT TO authenticated
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator') 
    AND is_active = true
  )
);

CREATE POLICY "tenant_isolation_modules_update"
ON modules FOR UPDATE TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator') 
    AND is_active = true
  )
)
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator') 
    AND is_active = true
  )
);

CREATE POLICY "tenant_isolation_modules_delete"
ON modules FOR DELETE TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

-- Step 2: LESSONS
DROP POLICY IF EXISTS "tenant_isolation_lessons_select" ON lessons;
DROP POLICY IF EXISTS "tenant_isolation_lessons_insert" ON lessons;
DROP POLICY IF EXISTS "tenant_isolation_lessons_update" ON lessons;
DROP POLICY IF EXISTS "tenant_isolation_lessons_delete" ON lessons;

CREATE POLICY "tenant_isolation_lessons_select"
ON lessons FOR SELECT TO public
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "tenant_isolation_lessons_insert"
ON lessons FOR INSERT TO authenticated
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator') 
    AND is_active = true
  )
);

CREATE POLICY "tenant_isolation_lessons_update"
ON lessons FOR UPDATE TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator') 
    AND is_active = true
  )
)
WITH CHECK (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'creator') 
    AND is_active = true
  )
);

CREATE POLICY "tenant_isolation_lessons_delete"
ON lessons FOR DELETE TO authenticated
USING (
  tenant_id IN (
    SELECT tenant_id FROM user_tenant_memberships 
    WHERE user_id = auth.uid() 
    AND role = 'admin' 
    AND is_active = true
  )
);

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE '✅ RLS policies updated for modules and lessons!';
    RAISE NOTICE 'Course builder should work now.';
END $$;
