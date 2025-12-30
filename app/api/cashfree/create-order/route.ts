import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, customerId, customerPhone, returnUrl, customerName, customerEmail } = body;

        // 1. Environment Variables / Credentials
        const appId = process.env.CASHFREE_APP_ID || process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
        const secretKey = process.env.CASHFREE_SECRET_KEY;
        const apiVersion = process.env.CASHFREE_API_VERSION || '2025-01-01';
        const environment = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

        if (!appId || !secretKey) {
            return NextResponse.json({
                error: 'Configuration Error',
                message: 'CASHFREE_APP_ID or CASHFREE_SECRET_KEY is missing'
            }, { status: 500 });
        }

        // 2. Base URL
        const baseUrl = environment === 'production'
            ? 'https://api.cashfree.com/pg'
            : 'https://sandbox.cashfree.com/pg';

        // 3. Request Paylod
        const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // Ensure phone is valid (10 digits)
        const cleanPhone = customerPhone ? customerPhone.replace(/\D/g, '').slice(-10) : '9999999999';

        const payload = {
            order_id: orderId,
            order_amount: parseFloat(amount),
            order_currency: 'INR',
            customer_details: {
                customer_id: customerId || orderId,
                customer_name: customerName || 'User',
                customer_email: customerEmail || 'user@example.com',
                customer_phone: cleanPhone
            },
            order_meta: {
                return_url: returnUrl
            }
        };

        console.log('📤 [Cashfree CreateOrder] Request:', { url: `${baseUrl}/orders`, payload });

        // 4. Call Cashfree API
        const response = await fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': appId,
                'x-client-secret': secretKey,
                'x-api-version': apiVersion,
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log('📥 [Cashfree CreateOrder] Response:', { status: response.status, data });

        if (!response.ok) {
            return NextResponse.json({
                error: 'Cashfree API Error',
                details: data.message || data
            }, { status: response.status });
        }

        // 5. Success
        return NextResponse.json({
            success: true,
            orderId: data.order_id,
            cfOrderId: data.cf_order_id,
            paymentSessionId: data.payment_session_id,
            environment: environment // Explicitly sending env state to frontend
        });

    } catch (error: any) {
        console.error('❌ [Cashfree CreateOrder] Internal Error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message
        }, { status: 500 });
    }
}
