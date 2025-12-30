/**
 * ============================================================================
 * PAYMENT GATEWAY FACTORY
 * ============================================================================
 * Dynamically selects payment gateway based on tenant config
 * PhonePe v2 OAuth বা Cashfree select করে tenant configuration অনুযায়ী
 * ============================================================================
 */

import { createClient } from '@/lib/supabase/server';
import { createPayment as createPhonePePayment, checkPaymentStatus as checkPhonePeStatus } from '@/lib/phonepe';
import { CashfreePayment } from './cashfree';

export interface UnifiedPaymentRequest {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    returnUrl: string;
    callbackUrl: string;
}

export interface UnifiedPaymentResponse {
    success: boolean;
    paymentUrl?: string;
    transactionId?: string;
    error?: string;
    paymentSessionId?: string; // Forwarded from Cashfree
    environment?: 'sandbox' | 'production'; // Forwarded from Cashfree
}

/**
 * Initiate payment using configured gateway
 * Configure করা gateway দিয়ে payment শুরু করে
 */
export async function initiatePayment(
    tenantId: string,
    request: UnifiedPaymentRequest
): Promise<UnifiedPaymentResponse> {
    try {
        const supabase = await createClient();

        // ============================================================================
        // STEP 1: Try to fetch tenant-specific gateway
        // ============================================================================
        let { data, error } = await supabase
            .from('payment_gateway_settings')
            .select('*')
            .eq('tenant_id', tenantId)
            .eq('is_active', true)
            .maybeSingle();

        // ============================================================================
        // STEP 2: Fallback to math4code tenant gateway if tenant doesn't have one
        // ============================================================================
        if (!data) {
            console.log(`⚠️ No tenant-specific gateway for ${tenantId}, trying math4code default...`);

            // Get math4code tenant's gateway as fallback
            const { data: defaultTenant } = await supabase
                .from('tenants')
                .select('id')
                .eq('slug', 'math4code')
                .eq('is_active', true)
                .maybeSingle();

            console.log("this is defalut tanent ", defaultTenant?.id)

            if (defaultTenant) {
                const { data: defaultGateway, error } = await supabase
                    .from('payment_gateway_settings')
                    .select('*')
                    .eq('tenant_id', defaultTenant?.id)
                    .eq('is_active', true)
                    .single();

                console.log("this is defalut gateway error ", defaultGateway)

                if (defaultGateway) {
                    console.log(`✅ Using math4code default gateway: ${defaultGateway.gateway_type}`);
                    data = defaultGateway;
                } else {
                    console.error('❌ No math4code default gateway found either');
                }
            }
        } else {
            console.log(`✅ Using tenant-specific gateway: ${data.gateway_type}`);
        }

        if (error || !data) {
            console.error('No active payment gateway found for tenant:', tenantId);
            return {
                success: false,
                error: 'No payment gateway configured. Please contact support.',
            };
        }

        // PhonePe v2 OAuth
        if (data.gateway_type === 'phonepe') {
            const phonePeConfig = {
                merchantId: data.phonepe_merchant_id!,
                clientId: data.phonepe_client_id!,
                clientSecret: data.phonepe_client_secret!,
                clientVersion: parseInt(data.phonepe_client_version || "1"),
                environment: data.phonepe_environment as 'preprod' | 'production'
            };

            const result = await createPhonePePayment(
                phonePeConfig,
                request.orderId,
                request.amount,
                request.customerEmail,
                false // isMobile
            );

            if (result.success && result.data?.redirectUrl) {
                return {
                    success: true,
                    paymentUrl: result.data.redirectUrl,
                    transactionId: request.orderId,
                };
            } else {
                return {
                    success: false,
                    error: result.error || 'PhonePe payment initiation failed',
                };
            }
        }
        // Cashfree
        else if (data.gateway_type === 'cashfree') {
            const cashfree = new CashfreePayment({
                appId: data.cashfree_app_id!,
                secretKey: data.cashfree_secret_key!,
                environment: data.cashfree_environment as 'sandbox' | 'production',
            });

            const result = await cashfree.initiatePayment({
                orderId: request.orderId,
                orderAmount: request.amount,
                customerName: request.customerName,
                customerEmail: request.customerEmail,
                customerPhone: request.customerPhone,
                returnUrl: request.returnUrl,
                notifyUrl: request.callbackUrl,
            });

            return {
                success: result.success,
                paymentUrl: result.paymentUrl,
                transactionId: request.orderId,
                error: result.error,
                paymentSessionId: result.paymentSessionId,
                environment: result.environment,
            };
        }

        return {
            success: false,
            error: 'Unknown gateway type',
        };
    } catch (error: any) {
        console.error('Payment initiation error:', error);
        return {
            success: false,
            error: error.message || 'Payment initiation failed',
        };
    }
}

/**
 * Verify payment using configured gateway
 * Configure করা gateway দিয়ে payment verify করে
 */
export async function verifyPayment(
    tenantId: string,
    transactionId: string
): Promise<{
    success: boolean;
    status?: string;
    amount?: number;
    error?: string;
}> {
    try {
        const supabase = await createClient();

        // ============================================================================
        // STEP 1: Try to fetch tenant-specific gateway
        // ============================================================================
        let { data, error } = await supabase
            .from('payment_gateway_settings')
            .select('*')
            .eq('tenant_id', tenantId)
            .eq('is_active', true)
            .maybeSingle();

        // ============================================================================
        // STEP 2: Fallback to math4code tenant gateway if tenant doesn't have one
        // ============================================================================
        if (!data) {
            console.log(`⚠️ No tenant-specific gateway for verification, trying math4code default...`);

            // Get math4code tenant's gateway as fallback
            const { data: defaultTenant } = await supabase
                .from('tenants')
                .select('id')
                .eq('slug', 'math4code')
                .eq('is_active', true)
                .maybeSingle();

            if (defaultTenant) {
                const { data: defaultGateway } = await supabase
                    .from('payment_gateway_settings')
                    .select('*')
                    .eq('tenant_id', defaultTenant.id)
                    .eq('is_active', true)
                    .maybeSingle();

                if (defaultGateway) {
                    console.log(`✅ Using math4code default gateway for verification`);
                    data = defaultGateway;
                }
            }
        }

        if (error || !data) {
            return {
                success: false,
                error: 'No payment gateway configured',
            };
        }

        // PhonePe v2
        if (data.gateway_type === 'phonepe') {
            const phonePeConfig = {
                merchantId: data.phonepe_merchant_id!,
                clientId: data.phonepe_client_id!,
                clientSecret: data.phonepe_client_secret!,
                clientVersion: parseInt(data.phonepe_client_version || "1"),
                environment: data.phonepe_environment as 'preprod' | 'production'
            };

            const result = await checkPhonePeStatus(phonePeConfig, transactionId);
            return {
                success: result.success || false,
                status: result.code,
                amount: result.data?.amount,
            };
        }
        // Cashfree
        else if (data.gateway_type === 'cashfree') {
            const cashfree = new CashfreePayment({
                appId: data.cashfree_app_id!,
                secretKey: data.cashfree_secret_key!,
                environment: data.cashfree_environment as 'sandbox' | 'production',
            });

            return await cashfree.verifyPayment(transactionId);
        }

        return {
            success: false,
            error: 'Unknown gateway type',
        };
    } catch (error: any) {
        console.error('Payment verification error:', error);
        return {
            success: false,
            error: error.message || 'Payment verification failed',
        };
    }
}
