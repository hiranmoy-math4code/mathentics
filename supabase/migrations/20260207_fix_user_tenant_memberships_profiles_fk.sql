-- Migration to link user_tenant_memberships to profiles
-- This allows PostgREST to automatically resolve the relationship for joins.

ALTER TABLE "public"."user_tenant_memberships"
  ADD CONSTRAINT "user_tenant_memberships_user_id_fkey_profiles"
  FOREIGN KEY ("user_id")
  REFERENCES "public"."profiles"("id");
