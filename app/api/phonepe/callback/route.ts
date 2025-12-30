import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// export const runtime = 'edge';




export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { response } = await req.json();

        // 1. Decode Response
        const decodedResponse = JSON.parse(Buffer.from(response, "base64").toString("utf-8"));


        const { code, merchantTransactionId, merchantOrderId, data } = decodedResponse;
        const transactionId = merchantOrderId || merchantTransactionId;

        if (!transactionId) {

            return NextResponse.json({ success: true }); // Acknowledge to stop retries
        }

        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {

            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        // 2. Update Payment Status
        // Use Service Role to allow updating status and enrolling users without authentication
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        // Determine status
        let status = "pending";
        if (code === "PAYMENT_SUCCESS") status = "success";
        else if (code === "PAYMENT_ERROR" || code === "PAYMENT_DECLINED") status = "failed";



        // Update course_payments table (works for both courses and test series)
        let { data: payment, error: updateError } = await supabase
            .from("course_payments")
            .update({
                status: status,
                provider_transaction_id: data?.transactionId,
                payment_method: data?.paymentInstrument?.type,
                metadata: decodedResponse
            })
            .eq("transaction_id", transactionId)
            .select()
            .single();

        if (updateError || !payment) {
            return NextResponse.json({ success: true });
        }

        // 3. If Success, Activate Enrollment (works for both courses and test series)
        if (status === "success") {
            const { data: existingEnrollment } = await supabase
                .from("enrollments")
                .select("id")
                .eq("user_id", payment.user_id)
                .eq("course_id", payment.course_id)
                .single();

            if (!existingEnrollment) {
                // Create new enrollment
                const { error: enrollError } = await supabase.from("enrollments").insert({
                    user_id: payment.user_id,
                    course_id: payment.course_id,
                    status: "active",
                    payment_id: payment.id
                });
            } else {
                // Update existing enrollment
                await supabase
                    .from("enrollments")
                    .update({
                        status: "active",
                        payment_id: payment.id
                    })
                    .eq("id", existingEnrollment.id);
            }
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
