import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyPayment } from "@/lib/payments/gateway-factory";

// export const runtime = 'edge';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const runtime = 'edge';

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try {
        const { transactionId } = await req.json();

        if (!transactionId) {
            return NextResponse.json({ error: "Transaction ID required" }, { status: 400, headers: corsHeaders });
        }

        const supabase = createAdminClient();

        // 1. Get Payment Record to find Tenant
        const { data: payment, error: fetchError } = await supabase
            .from("course_payments")
            .select("*")
            .eq("transaction_id", transactionId)
            .single();

        if (fetchError || !payment) {
            return NextResponse.json({
                status: "failed",
                message: "Transaction not found"
            }, { status: 404, headers: corsHeaders });
        }

        let result: any = null;
        var status = "pending";

        // If already completed, we still need to ensure enrollment exists (Self-Healing)
        if (payment.status === "completed" || payment.status === "success") {
            // Check/Create enrollment logic below
            // We can skip re-verification via gateway to save API calls
            // Just fall through to Enrollment Logic with status='success'
            status = "success";
        } else {
            // 2. Verify via Factory
            // verifyPayment returns { success: boolean, status: string, ... }
            result = await verifyPayment(payment.tenant_id, transactionId);

            console.log("🔍 Payment Verification Result:", result);

            // Normalize status strings from different gateways
            const s = result.status?.toUpperCase();
            if (result.success && (s === "SUCCESS" || s === "PAYMENT_SUCCESS" || s === "COMPLETED" || s === "PAID")) {
                status = "success";
            } else if (s === "FAILED" || s === "PAYMENT_FAILED" || s === "PAYMENT_DECLINED" || s === "CANCELLED") {
                status = "failed";
            }

            // 3. Update DB
            // DB expects 'success', 'pending', 'failed'. Do not map to 'completed'.
            const dbStatus = status;

            const { error: updateError } = await supabase
                .from("course_payments")
                .update({
                    status: dbStatus,
                    metadata: result
                })
                .eq("transaction_id", transactionId);

            if (updateError) {
                console.error("❌ Failed to update payment status:", updateError);
            }
        }

        // 4. Enroll User (if success)
        if (status === "success") {
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
                console.error("❌ Enrollment upsert error:", enrollError);
            } else {
                console.log(`✅ Enrollment created/updated for user ${payment.user_id}`);
            }
        }

        return NextResponse.json({ status, result }, { headers: corsHeaders });

    } catch (error: any) {
        console.error("Verification error:", error);
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }
}
