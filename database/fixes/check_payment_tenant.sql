-- ============================================================================
-- DEBUG: Check Payment Records Tenant ID
-- ============================================================================
-- Replace 'YOUR_USER_ID' with actual user ID

SELECT 
    id,
    user_id,
    course_id,
    tenant_id,
    amount,
    status,
    transaction_id,
    created_at
FROM course_payments
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at DESC
LIMIT 10;

-- Expected: 
-- If payment was made on Tenant B domain, tenant_id should be Tenant B's ID
-- If tenant_id is Tenant A's ID, then payment initiate API is using wrong tenant
