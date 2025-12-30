-- ============================================================================
-- ADD tenant_id to question_bank table if not exists
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'question_bank' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Add tenant_id column
        ALTER TABLE question_bank 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- For existing rows, try to get tenant from admin's membership
        -- If admin has multiple tenants, this might need manual fixing
        UPDATE question_bank qb
        SET tenant_id = (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = qb.admin_id 
            AND is_active = true 
            LIMIT 1
        )
        WHERE tenant_id IS NULL;
        
        -- Make it NOT NULL after populating
        ALTER TABLE question_bank 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        -- Add index
        CREATE INDEX IF NOT EXISTS idx_question_bank_tenant_id ON question_bank(tenant_id);
        
        RAISE NOTICE 'Added tenant_id column to question_bank table';
    ELSE
        RAISE NOTICE 'tenant_id column already exists in question_bank table';
    END IF;
END $$;

-- Verify
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'question_bank'
AND column_name = 'tenant_id';
