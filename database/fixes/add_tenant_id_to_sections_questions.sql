-- ============================================================================
-- ADD tenant_id to sections table if not exists
-- ============================================================================

-- Check if tenant_id column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'sections' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Add tenant_id column
        ALTER TABLE sections 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Update existing rows with tenant_id from parent exam
        UPDATE sections s
        SET tenant_id = e.tenant_id
        FROM exams e
        WHERE s.exam_id = e.id;
        
        -- Make it NOT NULL after populating
        ALTER TABLE sections 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        -- Add index
        CREATE INDEX IF NOT EXISTS idx_sections_tenant_id ON sections(tenant_id);
        
        RAISE NOTICE 'Added tenant_id column to sections table';
    ELSE
        RAISE NOTICE 'tenant_id column already exists in sections table';
    END IF;
END $$;

-- Similarly for questions table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'questions' 
        AND column_name = 'tenant_id'
    ) THEN
        -- Add tenant_id column
        ALTER TABLE questions 
        ADD COLUMN tenant_id UUID REFERENCES tenants(id);
        
        -- Update existing rows with tenant_id from parent exam
        UPDATE questions q
        SET tenant_id = e.tenant_id
        FROM sections s
        INNER JOIN exams e ON s.exam_id = e.id
        WHERE q.section_id = s.id;
        
        -- Make it NOT NULL after populating
        ALTER TABLE questions 
        ALTER COLUMN tenant_id SET NOT NULL;
        
        -- Add index
        CREATE INDEX IF NOT EXISTS idx_questions_tenant_id ON questions(tenant_id);
        
        RAISE NOTICE 'Added tenant_id column to questions table';
    ELSE
        RAISE NOTICE 'tenant_id column already exists in questions table';
    END IF;
END $$;

-- Verify
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name IN ('sections', 'questions')
AND column_name = 'tenant_id';
