-- ============================================================================
-- 🕵️ CHECK ACTIVE TRIGGERS
-- ============================================================================
-- Run this to see EXACTLY which triggers are running on the table.
-- You should ONLY see 'on_transaction_update_rewards'.
-- If you see others, they might be interfering.
-- ============================================================================

SELECT 
    trigger_name,
    event_manipulation,
    action_order,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'reward_transactions'
ORDER BY action_order;
