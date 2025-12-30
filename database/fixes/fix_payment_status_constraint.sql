-- FIX: Allow 'completed' status in course_payments
-- Reason: The application sometimes uses 'completed' interchangeably with 'success'.
-- This script prevents "Violates Check Constraint" errors.

-- 1. Drop the existing strict constraint
ALTER TABLE public.course_payments 
DROP CONSTRAINT IF EXISTS course_payments_status_check;

-- 2. Add the relaxed constraint including 'completed'
ALTER TABLE public.course_payments 
ADD CONSTRAINT course_payments_status_check 
CHECK (status = ANY (ARRAY['pending'::text, 'success'::text, 'failed'::text, 'refunded'::text, 'completed'::text]));

-- 3. (Optional) Verify it works by updating any stuck 'pending' transactions if needed
-- UPDATE public.course_payments SET status = 'completed' WHERE transaction_id = 'YOUR_TXN_ID';
