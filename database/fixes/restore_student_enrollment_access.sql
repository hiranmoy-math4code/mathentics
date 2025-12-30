-- STRICT TENANT ISOLATION POLICY for Enrollments
-- The user requires that students can only see enrollments belonging to the CURRENT Tenant.
-- This prevents data leakage if a user is a member of multiple tenants.
--
-- Logic:
-- 1. Match User ID (Auth)
-- 2. Match Tenant ID (Header 'x-tenant-id')
--
-- Note: The Frontend Hook 'useStudentCourses' now sends the 'x-tenant-id' header.

DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;

CREATE POLICY "Users can view their own enrollments"
ON public.enrollments FOR SELECT TO authenticated
USING (
  user_id = auth.uid()
  AND
  -- Cast header to UUID safely. If header missing, access is DENIED.
  tenant_id = (current_setting('request.headers', true)::json->>'x-tenant-id')::uuid
);
