-- ============================================================================
-- ENROLLMENT MANAGEMENT SYSTEM - Phase 1 Migration
-- Adds expiry tracking, grant management, and access logging
-- ============================================================================

-- Step 1: Add new columns to enrollments table
-- These columns enable subscription management and audit trails
ALTER TABLE public.enrollments
ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS granted_by uuid REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS granted_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS grant_type text DEFAULT 'free' CHECK (grant_type IN ('manual', 'payment', 'free'));

-- Add comment for documentation
COMMENT ON COLUMN public.enrollments.expires_at IS 'Subscription expiry date. NULL = lifetime access';
COMMENT ON COLUMN public.enrollments.granted_by IS 'Admin who manually granted access. NULL if self-enrolled or payment';
COMMENT ON COLUMN public.enrollments.grant_type IS 'How access was granted: manual (admin), payment (purchased), free (self-enrolled)';

-- Step 2: Add new columns to test_series_enrollments table
ALTER TABLE public.test_series_enrollments
ADD COLUMN IF NOT EXISTS expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS granted_by uuid REFERENCES public.profiles(id),
ADD COLUMN IF NOT EXISTS granted_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS grant_type text DEFAULT 'free' CHECK (grant_type IN ('manual', 'payment', 'free'));

-- Add comments
COMMENT ON COLUMN public.test_series_enrollments.expires_at IS 'Subscription expiry date. NULL = lifetime access';
COMMENT ON COLUMN public.test_series_enrollments.granted_by IS 'Admin who manually granted access';

-- Step 3: Create enrollment_logs table for complete audit trail
CREATE TABLE IF NOT EXISTS public.enrollment_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id uuid REFERENCES public.enrollments(id) ON DELETE CASCADE,
  test_series_enrollment_id uuid REFERENCES public.test_series_enrollments(id) ON DELETE CASCADE,
  action text NOT NULL CHECK (action IN ('granted', 'revoked', 'expired', 'extended', 'modified')),
  performed_by uuid NOT NULL REFERENCES public.profiles(id),
  previous_expiry timestamp with time zone,
  new_expiry timestamp with time zone,
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  
  -- Ensure at least one enrollment ID is present
  CHECK ((enrollment_id IS NOT NULL) OR (test_series_enrollment_id IS NOT NULL))
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_enrollment ON public.enrollment_logs(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_test_series ON public.enrollment_logs(test_series_enrollment_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_performed_by ON public.enrollment_logs(performed_by);
CREATE INDEX IF NOT EXISTS idx_enrollment_logs_created_at ON public.enrollment_logs(created_at DESC);

-- Add index for expiry queries (finding expiring soon)
CREATE INDEX IF NOT EXISTS idx_enrollments_expires_at ON public.enrollments(expires_at) WHERE expires_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_test_series_enrollments_expires_at ON public.test_series_enrollments(expires_at) WHERE expires_at IS NOT NULL;

-- Step 4: Enable RLS on enrollment_logs
ALTER TABLE public.enrollment_logs ENABLE ROW LEVEL SECURITY;

-- Admin can view all logs
CREATE POLICY "Admins can view all enrollment logs"
ON public.enrollment_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Admin can insert logs
CREATE POLICY "Admins can insert enrollment logs"
ON public.enrollment_logs FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles  
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Step 5: Create helper function to log enrollment actions
CREATE OR REPLACE FUNCTION log_enrollment_action(
  p_action text,
  p_performed_by uuid,
  p_enrollment_id uuid DEFAULT NULL,
  p_test_series_enrollment_id uuid DEFAULT NULL,
  p_previous_expiry timestamp with time zone DEFAULT NULL,
  p_new_expiry timestamp with time zone DEFAULT NULL,
  p_notes text DEFAULT NULL
) RETURNS uuid AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO public.enrollment_logs (
    enrollment_id,
    test_series_enrollment_id,
    action,
    performed_by,
    previous_expiry,
    new_expiry,
    notes
  ) VALUES (
    p_enrollment_id,
    p_test_series_enrollment_id,
    p_action,
    p_performed_by,
    p_previous_expiry,
    p_new_expiry,
    p_notes
  ) RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create function to check and mark expired enrollments
CREATE OR REPLACE FUNCTION mark_expired_enrollments()
RETURNS void AS $$
BEGIN
  -- Mark expired course enrollments
  UPDATE public.enrollments
  SET status = 'expired'
  WHERE expires_at IS NOT NULL 
    AND expires_at < now()
    AND status = 'active';
  
  -- Log expiry actions
  INSERT INTO public.enrollment_logs (enrollment_id, action, performed_by, notes)
  SELECT 
    id,
    'expired',
    granted_by,
    'Automatically marked as expired'
  FROM public.enrollments
  WHERE expires_at IS NOT NULL 
    AND expires_at < now()
    AND status = 'expired'
    AND updated_at >= now() - interval '1 minute'; -- Only log recently expired
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add 'expired' as valid status if not already present
DO $$
BEGIN
  -- This will fail silently if constraint already allows 'expired'
  ALTER TABLE public.enrollments DROP CONSTRAINT IF EXISTS enrollments_status_check;
  ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_status_check 
    CHECK (status IN ('active', 'completed', 'refunded', 'pending', 'expired'));
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Step 7: Create view for easy querying of expiring subscriptions
CREATE OR REPLACE VIEW expiring_enrollments_view AS
SELECT 
  e.id as enrollment_id,
  e.user_id,
  e.course_id,
  e.expires_at,
  e.granted_by,
  e.grant_type,
  c.title as course_title,
  p.full_name as student_name,
  p.email as student_email,
  admin.full_name as granted_by_name,
  EXTRACT(DAY FROM (e.expires_at - now())) as days_until_expiry
FROM public.enrollments e
JOIN public.courses c ON e.course_id = c.id
JOIN public.profiles p ON e.user_id = p.id
LEFT JOIN public.profiles admin ON e.granted_by = admin.id
WHERE e.expires_at IS NOT NULL
  AND e.expires_at > now()
  AND e.status = 'active'
ORDER BY e.expires_at ASC;

-- Grant permissions
GRANT SELECT ON expiring_enrollments_view TO authenticated;

-- Migration completed successfully!
-- Run mark_expired_enrollments() periodically via cron or Edge Functions
