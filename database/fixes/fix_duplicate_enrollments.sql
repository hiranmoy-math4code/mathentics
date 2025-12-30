-- FIX: Remove Duplicate Enrollments & Add Unique Constraint
-- Reason: Multiple API calls created duplicate enrollments because (user_id, course_id) was not unique.

-- 1. Remove Duplicates (Keep the SINGLE LATEST enrollment for each user+course)
DELETE FROM public.enrollments a
WHERE a.id NOT IN (
    SELECT DISTINCT ON (user_id, course_id) id
    FROM public.enrollments
    ORDER BY user_id, course_id, enrolled_at DESC
);

-- 2. Add Unique Constraint to prevent future duplicates
-- This ensures that even if API is called 10 times, only 1 enrollment exists.
-- The existing 'upsert' logic will then work correctly (or insert will fail harmlessly).

ALTER TABLE public.enrollments
ADD CONSTRAINT enrollments_user_course_unique UNIQUE (user_id, course_id);

-- 3. (Optional) Fix any 'active' status if needed (Existing logic sets it active)
