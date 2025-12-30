-- ============================================================================
-- PAYMENT GATEWAY SETTINGS TABLE
-- ============================================================================
-- Admin নিজের payment gateway configure করতে পারবে
-- Admin can configure their own payment gateway
-- ============================================================================

-- Create table
CREATE TABLE IF NOT EXISTS public.payment_gateway_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Gateway Type
    gateway_type text NOT NULL CHECK (gateway_type IN ('phonepe', 'cashfree')),
    is_active boolean DEFAULT false,
    
    -- PhonePe v2 OAuth Credentials (encrypted)
    phonepe_merchant_id text,
    phonepe_client_id text,
    phonepe_client_secret text,
    phonepe_client_version text DEFAULT '1',
    phonepe_environment text CHECK (phonepe_environment IN ('preprod', 'production')),
    
    -- Cashfree Credentials (encrypted)
    cashfree_app_id text,
    cashfree_secret_key text,
    cashfree_environment text CHECK (cashfree_environment IN ('sandbox', 'production')),
    
    -- Metadata
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id),
    
    -- Constraints
    UNIQUE(tenant_id) -- One active gateway per tenant
);

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE payment_gateway_settings ENABLE ROW LEVEL SECURITY;

-- Admin can view their tenant's gateway settings
CREATE POLICY "Admins can view gateway settings"
    ON payment_gateway_settings
    FOR SELECT
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
              AND role IN ('admin', 'creator')
              AND is_active = true
        )
    );

-- Admin can insert gateway settings
CREATE POLICY "Admins can insert gateway settings"
    ON payment_gateway_settings
    FOR INSERT
    WITH CHECK (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
              AND role IN ('admin', 'creator')
              AND is_active = true
        )
    );

-- Admin can update gateway settings
CREATE POLICY "Admins can update gateway settings"
    ON payment_gateway_settings
    FOR UPDATE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
              AND role IN ('admin', 'creator')
              AND is_active = true
        )
    );

-- Admin can delete gateway settings
CREATE POLICY "Admins can delete gateway settings"
    ON payment_gateway_settings
    FOR DELETE
    USING (
        tenant_id IN (
            SELECT tenant_id 
            FROM user_tenant_memberships 
            WHERE user_id = auth.uid() 
              AND role IN ('admin', 'creator')
              AND is_active = true
        )
    );

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_payment_gateway_tenant 
    ON payment_gateway_settings(tenant_id);

CREATE INDEX IF NOT EXISTS idx_payment_gateway_active 
    ON payment_gateway_settings(tenant_id, is_active);

-- ============================================================================
-- HELPER FUNCTION: Get Active Gateway for Tenant
-- ============================================================================

CREATE OR REPLACE FUNCTION get_active_payment_gateway(target_tenant_id uuid)
RETURNS TABLE (
    gateway_type text,
    phonepe_merchant_id text,
    phonepe_client_id text,
    phonepe_client_secret text,
    phonepe_client_version text,
    phonepe_environment text,
    cashfree_app_id text,
    cashfree_secret_key text,
    cashfree_environment text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pgs.gateway_type,
        pgs.phonepe_merchant_id,
        pgs.phonepe_client_id,
        pgs.phonepe_client_secret,
        pgs.phonepe_client_version,
        pgs.phonepe_environment,
        pgs.cashfree_app_id,
        pgs.cashfree_secret_key,
        pgs.cashfree_environment
    FROM payment_gateway_settings pgs
    WHERE pgs.tenant_id = target_tenant_id
      AND pgs.is_active = true
    LIMIT 1;
END;
$$;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$ 
BEGIN 
    RAISE NOTICE '✅ Payment gateway settings table created!';
    RAISE NOTICE 'Admins can now configure PhonePe or Cashfree from settings.';
END $$;
