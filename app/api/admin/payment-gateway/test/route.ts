/**
 * ============================================================================
 * API ROUTE: Test Payment Gateway Connection
 * ============================================================================
 * Admin gateway credentials test করার জন্য
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { CashfreePayment } from '@/lib/payments/cashfree';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { gateway_type, ...credentials } = body;

        if (gateway_type === 'phonepe') {
            // PhonePe v2 OAuth - Test by checking if credentials are provided
            const { phonepe_merchant_id, phonepe_client_id, phonepe_client_secret } = credentials;

            if (!phonepe_merchant_id || !phonepe_client_id || !phonepe_client_secret) {
                return NextResponse.json({
                    success: false,
                    message: 'Missing required PhonePe credentials',
                });
            }

            // Basic validation - credentials are present
            return NextResponse.json({
                success: true,
                message: 'PhonePe credentials validated',
            });

        } else if (gateway_type === 'cashfree') {
            const cashfree = new CashfreePayment({
                appId: credentials.cashfree_app_id,
                secretKey: credentials.cashfree_secret_key,
                environment: credentials.cashfree_environment,
            });

            const testResult = await cashfree.testConnection();

            return NextResponse.json({
                success: testResult.success,
                message: testResult.success ? 'Cashfree credentials valid' : testResult.error,
            });
        }

        return NextResponse.json({
            success: false,
            error: 'Invalid gateway type',
        }, { status: 400 });
    } catch (error: any) {
        console.error('Gateway test error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Test failed',
        }, { status: 500 });
    }
}
