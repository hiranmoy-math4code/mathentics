import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPayment } from "@/lib/phonepe";


export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const { seriesId, amount, userId } = await request.json();

        if (!seriesId || !amount || !userId) {
            return NextResponse.json(
                { success: false, error: "Missing required parameters" },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Verify user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.id !== userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get course details (works for both courses and test series)
        const { data: course, error: courseError } = await supabase
            .from("courses")
            .select("*")
            .eq("id", seriesId)
            .single();

        if (courseError || !course) {
            return NextResponse.json(
                { success: false, error: "Course not found" },
                { status: 404 }
            );
        }

        // Check if already enrolled
        const { data: existingEnrollment } = await supabase
            .from("enrollments")
            .select("id")
            .eq("course_id", seriesId)
            .eq("user_id", userId)
            .single();

        if (existingEnrollment) {
            return NextResponse.json(
                { success: false, error: "Already enrolled in this course" },
                { status: 400 }
            );
        }

        // Create a unique Merchant Transaction ID
        // Format: MT_{timestamp}_{random} to ensure uniqueness and no special chars
        const merchantTransactionId = `MT${Date.now()}${Math.floor(Math.random() * 1000)}`;



        // Create payment record in DB first
        const { data: payment, error: paymentError } = await supabase
            .from("payments")
            .insert({
                user_id: userId,
                series_id: seriesId,
                amount: amount,
                status: "pending",
                phonepe_transaction_id: merchantTransactionId, // Store the exact ID we will send to PhonePe
            })
            .select()
            .single();

        if (paymentError) {

            return NextResponse.json(
                { success: false, error: "Failed to create payment record" },
                { status: 500 }
            );
        }

        // Initiate Payment using shared utility
        // Pass the EXACT merchantTransactionId we just stored
        const paymentResponse = await createPayment(merchantTransactionId, amount, userId);

        if (paymentResponse.success && paymentResponse.data?.redirectUrl) {
            return NextResponse.json({
                success: true,
                paymentUrl: paymentResponse.data.redirectUrl,
                transactionId: merchantTransactionId,
            });
        } else {
            // Update payment status to failed
            await supabase
                .from("payments")
                .update({ status: "failed" })
                .eq("id", payment.id);


            return NextResponse.json(
                { success: false, error: paymentResponse.error || "PhonePe payment initiation failed" },
                { status: 500 }
            );
        }
    } catch (error: any) {

        return NextResponse.json(
            { success: false, error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
