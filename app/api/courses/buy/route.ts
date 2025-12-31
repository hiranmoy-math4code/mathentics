import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { initiatePayment } from "@/lib/payments/gateway-factory";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// export const runtime = 'edge';


// CORS headers for mobile app
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};


// Handle OPTIONS request for CORS preflight
export const runtime = 'edge';

export async function OPTIONS(req: Request) {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        const { courseId, isMobile = false } = await req.json();

        // Check for Authorization header (for mobile app)
        const authHeader = req.headers.get('Authorization');
        let supabase;
        let user;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            // Mobile app request with Bearer token
            const token = authHeader.split(' ')[1];

            supabase = createSupabaseClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    global: {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                }
            );

            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
            if (authError || !authUser) {
                return NextResponse.json(
                    { error: "Unauthorized (Invalid Token)" },
                    { status: 401, headers: corsHeaders }
                );
            }
            user = authUser;
        } else {
            // Web app request with cookies
            supabase = await createClient();
            const { data: { user: authUser } } = await supabase.auth.getUser();
            user = authUser;
        }

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401, headers: corsHeaders }
            );
        }

        // Get tenant context from request domain (not user membership!)
        // CRITICAL: Use domain to determine tenant, not user's membership
        const host = req.headers.get('host') || '';

        const { data: tenant } = await supabase
            .from('tenants')
            .select('id')
            .eq('custom_domain', host)
            .eq('is_active', true)
            .maybeSingle();

        let tenantId = tenant?.id;

        // Fallback to default tenant if not found
        if (!tenantId) {
            const { data: defaultTenant } = await supabase
                .from('tenants')
                .select('id')
                .eq('slug', 'math4code')
                .eq('is_active', true)
                .maybeSingle();
            tenantId = defaultTenant?.id;
        }

        if (!tenantId) {
            return NextResponse.json(
                { error: "Tenant not found" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Fetch course price
        const { data: course, error: courseError } = await supabase
            .from("courses")
            .select("price, title")
            .eq("id", courseId)
            .single();

        if (courseError || !course) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404, headers: corsHeaders }
            );
        }



        // Check if already enrolled
        const { data: existingEnrollment } = await supabase
            .from("enrollments")
            .select("id, status")
            .eq("user_id", user.id)
            .eq("course_id", courseId)
            .single();

        if (existingEnrollment && existingEnrollment.status === "active") {
            return NextResponse.json(
                { error: "Already enrolled" },
                { status: 400, headers: corsHeaders }
            );
        }

        // Handle Free Course - create enrollment directly
        if (course.price === 0) {
            let enrollmentId = existingEnrollment?.id;

            if (!existingEnrollment) {
                const { data: newEnrollment, error } = await supabase
                    .from("enrollments")
                    .insert({
                        user_id: user.id,
                        course_id: courseId,
                        status: "active",
                    })
                    .select()
                    .single();

                if (error) {

                    throw error;
                }
                enrollmentId = newEnrollment.id;
            } else {
                const { error } = await supabase
                    .from("enrollments")
                    .update({ status: "active" })
                    .eq("id", enrollmentId);

                if (error) {

                    throw error;
                }
            }


            return NextResponse.json(
                { success: true },
                { headers: corsHeaders }
            );
        }

        // For Paid Courses - Initiate Payment with Multi-Gateway


        // Create a unique Merchant Transaction ID
        const merchantTransactionId = `MT${Date.now()}${Math.floor(Math.random() * 1000)}`;



        // Create payment record in course_payments table
        const { error: paymentError } = await supabase
            .from("course_payments")
            .insert({
                user_id: user.id,
                course_id: courseId,
                amount: course.price,
                transaction_id: merchantTransactionId,
                status: "pending",
                tenant_id: tenantId,
            });

        if (paymentError) {

            return NextResponse.json({
                error: "Failed to initialize payment record",
                details: paymentError
            }, { status: 500, headers: corsHeaders });
        }

        // Get user profile for payment
        const { data: profile } = await supabase
            .from("profiles")
            .select("full_name, email, phone")
            .eq("id", user.id)
            .single();

        // Initiate Payment using Multi-Gateway Factory
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_DOMAIN || "http://tenant-a.local:3000";

        const paymentRequest = {
            orderId: merchantTransactionId,
            amount: course.price,
            customerName: profile?.full_name || "Student",
            customerEmail: profile?.email || user.email || "",
            customerPhone: profile?.phone || "9999999999",
            returnUrl: `${baseUrl}/student/payment/verify?txnId=${merchantTransactionId}`,
            callbackUrl: `${baseUrl}/api/payments/callback`,
        };

        const paymentResponse = await initiatePayment(tenantId, paymentRequest);



        if (!paymentResponse.success || !paymentResponse.paymentUrl) {


            // Update payment status to failed
            await supabase
                .from("course_payments")
                .update({ status: "failed", error_message: paymentResponse.error })
                .eq("transaction_id", merchantTransactionId);

            console.error('❌ Payment initiation failed:', paymentResponse);

            return NextResponse.json({
                error: paymentResponse.error || "Payment initiation failed",
                details: paymentResponse
            }, { status: 500, headers: corsHeaders });
        }

        let finalUrl = paymentResponse.paymentUrl;

        // If Mobile, wrap in Bridge URL to ensure Referer header is sent
        if (isMobile) {
            const domain = process.env.NEXT_PUBLIC_DOMAIN || baseUrl;
            finalUrl = `${domain}/mobile-payment?target=${encodeURIComponent(finalUrl)}`;
        }

        return NextResponse.json(
            {
                url: finalUrl,
                transactionId: merchantTransactionId,
                paymentSessionId: paymentResponse.paymentSessionId, // Forward Session ID
                environment: paymentResponse.environment, // Forward Environment
                returnUrl: paymentRequest.returnUrl, // ✅ Explicitly return the Verify URL
            },
            { headers: corsHeaders }
        );

    } catch (error: any) {

        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: error.toString()
        }, { status: 500, headers: corsHeaders });
    }
}
