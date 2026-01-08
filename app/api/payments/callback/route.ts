import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// export const runtime = "edge";

/**
 * ============================================================================
 * UNIFIED PAYMENT WEBHOOK HANDLER
 * ============================================================================
 * Receives async payment notifications from Cashfree and PhonePe
 * Ensures payments are processed even if user closes browser
 * ============================================================================
 */

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        console.log("🔔 Webhook received:", JSON.stringify(payload, null, 2));

        // ============================================================================
        // HANDLE CASHFREE TEST WEBHOOK
        // ============================================================================
        // Cashfree sends test webhooks without transaction data
        if (payload.type === "TEST_WEBHOOK" || !payload.data) {
            console.log("✅ Cashfree test webhook received - responding with 200 OK");
            return NextResponse.json({
                received: true,
                message: "Test webhook received successfully"
            }, { status: 200 });
        }

        // Detect gateway type from payload structure
        const isCashfree = payload.type?.includes("WEBHOOK") || payload.data?.order;
        const isPhonePe = payload.merchantOrderId || payload.transactionId;

        let transactionId: string | null = null;
        let paymentStatus: string | null = null;

        // ============================================================================
        // CASHFREE WEBHOOK PARSING
        // ============================================================================
        if (isCashfree) {
            console.log("📱 Detected Cashfree webhook");

            // Verify signature (recommended for production)
            const signature = req.headers.get("x-webhook-signature");
            // TODO: Implement signature verification
            // const isValid = verifyCashfreeSignature(payload, signature);
            // if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

            transactionId = payload.data?.order?.order_id;

            // Cashfree status mapping
            const orderStatus = payload.data?.order?.order_status;
            if (orderStatus === "PAID") {
                paymentStatus = "success";
            } else if (orderStatus === "ACTIVE" || orderStatus === "PENDING") {
                paymentStatus = "pending";
            } else {
                paymentStatus = "failed";
            }
        }
        // ============================================================================
        // PHONEPE WEBHOOK PARSING
        // ============================================================================
        else if (isPhonePe) {
            console.log("📱 Detected PhonePe webhook");

            transactionId = payload.merchantOrderId;

            // PhonePe status mapping
            const code = payload.code?.toUpperCase();
            if (code === "PAYMENT_SUCCESS" || payload.status === "SUCCESS") {
                paymentStatus = "success";
            } else if (code === "PAYMENT_PENDING") {
                paymentStatus = "pending";
            } else {
                paymentStatus = "failed";
            }
        } else {
            console.error("❌ Unknown webhook format:", payload);
            return NextResponse.json({ error: "Unknown webhook format" }, { status: 400 });
        }

        if (!transactionId) {
            console.error("❌ Missing transaction ID in webhook");
            return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
        }

        console.log(`✅ Parsed: txnId=${transactionId}, status=${paymentStatus}`);

        // ============================================================================
        // UPDATE DATABASE
        // ============================================================================
        const supabase = createAdminClient();

        // Fetch payment record
        const { data: payment, error: fetchError } = await supabase
            .from("course_payments")
            .select("*")
            .eq("transaction_id", transactionId)
            .single();

        if (fetchError || !payment) {
            console.error("❌ Payment not found:", transactionId);
            return NextResponse.json({ error: "Payment not found" }, { status: 404 });
        }

        // Update payment status
        const { error: updateError } = await supabase
            .from("course_payments")
            .update({
                status: paymentStatus,
                metadata: payload,
                updated_at: new Date().toISOString()
            })
            .eq("transaction_id", transactionId);

        if (updateError) {
            console.error("❌ Failed to update payment:", updateError);
        } else {
            console.log(`✅ Payment updated: ${transactionId} → ${paymentStatus}`);
        }

        // ============================================================================
        // CREATE ENROLLMENT (if success)
        // ============================================================================
        if (paymentStatus === "success") {
            // ✅ SAFE: Use upsert to handle race conditions with UNIQUE constraint
            // If enrollment exists, update it. If not, create new one.
            const { error: enrollError } = await supabase
                .from("enrollments")
                .upsert({
                    user_id: payment.user_id,
                    course_id: payment.course_id,
                    status: "active",
                    payment_id: payment.id,
                    enrolled_at: new Date().toISOString(),
                    progress: 0,
                    tenant_id: payment.tenant_id
                }, {
                    onConflict: 'user_id,course_id',
                    ignoreDuplicates: false  // Update if exists
                });

            if (enrollError) {
                console.error("❌ Enrollment upsert failed:", enrollError);
            } else {
                console.log(`✅ Enrollment created/updated for user ${payment.user_id}`);
            }

            // TODO: Send confirmation email
            // await sendPaymentConfirmationEmail(payment);
        }

        // Return success to gateway
        return NextResponse.json({
            received: true,
            transactionId,
            status: paymentStatus
        });

    } catch (error: any) {
        console.error("❌ Webhook processing error:", error);
        return NextResponse.json({
            error: error.message || "Webhook processing failed"
        }, { status: 500 });
    }
}

// OPTIONS handler for CORS (if needed)
export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-webhook-signature',
        }
    });
}
