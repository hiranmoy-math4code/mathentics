import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js"; // Remove
import { createClient } from "@/lib/supabase/server"; // For fallback
import { createAdminClient } from "@/lib/supabase/admin";
import { checkPaymentStatus } from "@/lib/phonepe";

export const runtime = 'edge';


// CORS headers for mobile app
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(req: Request) {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const { transactionId } = await req.json();

        if (!transactionId) {
            return NextResponse.json(
                { error: "Transaction ID is required" },
                { status: 400, headers: corsHeaders }
            );
        }


        let supabase;
        try {
            // Try to use Admin Client for RLS bypass
            supabase = createAdminClient();
            // supabase = await createClient();
        } catch (e) {

            supabase = await createClient();
        }

        // 1. Call PhonePe Status API
        const statusResponse = await checkPaymentStatus(transactionId);

        let status = "pending";

        // Cast to any to handle SDK/Manual response type safely
        const response = statusResponse as any;

        // PhonePe v2 response structure (from user logs): { state: "COMPLETED", ... }
        let state = null;

        if (response.state) {
            // Direct state property (as seen in user logs)
            state = response.state;
        } else if (response.success && response.data) {
            // Nested state (standard SDK format)
            state = response.data.state;
        } else if (response.code) {
            // Error code
            state = response.code;
        }

        if (state === "COMPLETED" || state === "PAYMENT_SUCCESS") {
            status = "success";
        } else if (state === "FAILED" || state === "PAYMENT_ERROR" || state === "PAYMENT_DECLINED") {
            status = "failed";
        }



        // 3. Update Database - Use course_payments for all payments
        let { data: payments, error: updateError } = await supabase
            .from("course_payments")
            .update({
                status: status,
                metadata: statusResponse
            })
            .eq("transaction_id", transactionId)
            .select();

        const payment = payments?.[0] || null;

        if (updateError || !payment) {
            // Return more helpful error message
            return NextResponse.json({
                error: "Transaction not found in database",
                details: "This transaction ID does not exist in our records. Please ensure the payment was initiated correctly.",
                transactionId: transactionId,
                status: "failed"
            }, {
                status: 404,
                headers: corsHeaders
            });
        }

        // 4. If Success, Activate Enrollment
        if (status === "success") {
            // Course Enrollment (works for both courses and test series)
            const { data: existingEnrollment } = await supabase
                .from("enrollments")
                .select("id")
                .eq("user_id", payment.user_id)
                .eq("course_id", payment.course_id)
                .single();

            if (!existingEnrollment) {
                const { error: enrollError } = await supabase.from("enrollments").insert({
                    user_id: payment.user_id,
                    course_id: payment.course_id,
                    status: "active",
                    payment_id: payment.id,
                    enrolled_at: new Date().toISOString(),
                    progress: 0
                });

                if (enrollError) {
                    // Don't throw here to ensure we still return the payment success status
                    // but we should probably alert or return a warning in the response
                }
            } else {
                // Update existing enrollment to active
                const { error: updateError } = await supabase.from("enrollments").update({
                    status: "active",
                    payment_id: payment.id
                }).eq("id", existingEnrollment.id);

                if (updateError) {
                    // Log error but don't fail the request
                }
            }
        }

        return NextResponse.json({
            status: status,
            state: state,
            data: statusResponse
        }, { headers: corsHeaders });

    } catch (error: any) {

        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500, headers: corsHeaders }
        );
    }
}
