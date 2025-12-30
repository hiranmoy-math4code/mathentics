-- ============================================================================
-- ADD tenant_id to options and question_bank_options tables
-- ============================================================================

-- 1. Add tenant_id to options table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'options' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Add tenant_id column
        ALTER TABLE options 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Update existing rows with tenant_id from parent question
        UPDATE options o
        SET tenant_id = q.tenant_id
        FROM questions q
        WHERE o.question_id = q.id;
        
        -- Make it NOT NULL after populating
        ALTER TABLE options 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        -- Add index
        CREATE INDEX IF NOT EXISTS idx_options_tenant_id ON options(tenant_id);
        
        RAISE NOTICE 'Added tenant_id column to options table';
    ELSE
        RAISE NOTICE 'tenant_id column already exists in options table';
    END IF;
END $$;

-- 2. Add tenant_id to question_bank_options table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'question_bank_options' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Add tenant_id column
        ALTER TABLE question_bank_options 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Update existing rows with tenant_id from parent question_bank
        UPDATE question_bank_options qbo
        SET tenant_id = qb.tenant_id
        FROM question_bank qb
        WHERE qbo.question_id = qb.id;
        
        -- Make it NOT NULL after populating
        ALTER TABLE question_bank_options 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        -- Add index
        CREATE INDEX IF NOT EXISTS idx_question_bank_options_tenant_id ON question_bank_options(tenant_id);
        
        RAISE NOTICE 'Added tenant_id column to question_bank_options table';
    ELSE
        RAISE NOTICE 'tenant_id column already exists in question_bank_options table';
    END IF;
END $$;

-- Verify
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name IN ('options', 'question_bank_options')
AND column_name = 'tenant_id'
ORDER BY table_name;
