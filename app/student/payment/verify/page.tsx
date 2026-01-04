"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

function PaymentVerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const txnId = searchParams.get("txnId");
    const errorParam = searchParams.get("error");

    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [message, setMessage] = useState("Verifying payment... (v2)");

    useEffect(() => {
        if (!txnId) {
            setStatus("failed");
            setMessage("Invalid transaction ID");
            return;
        }

        if (errorParam) {
            setStatus("failed");
            setMessage("Payment failed or was cancelled");
            return;
        }

        const verifyPayment = async () => {
            try {
                const supabase = createClient();

                const checkStatus = async () => {
                    // Call our new generic status check API
                    const response = await fetch("/api/payments/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ transactionId: txnId }),
                    });

                    const data = await response.json();

                    if (data.status === "success") {
                        setStatus("success");
                        setMessage("Payment successful! Redirecting to course...");
                        setTimeout(() => {
                            window.location.href = "/student/dashboard?tab=my-courses";
                        }, 2000);
                        return true;
                    } else if (data.status === "failed") {
                        setStatus("failed");
                        setMessage("Payment failed. Please try again.");
                        return true;
                    }
                    return false;
                };

                // ✅ OPTIMIZED: Exponential backoff polling
                // Fast payments: verified in 500ms
                // Slow payments: covered up to 15.5 seconds
                const delays = [500, 1000, 2000, 4000, 8000]; // milliseconds
                let isDone = false;

                // Initial check
                isDone = await checkStatus();

                // Exponential backoff polling
                for (let i = 0; i < delays.length && !isDone; i++) {
                    await new Promise(resolve => setTimeout(resolve, delays[i]));
                    isDone = await checkStatus();
                }

                // If still not done after all attempts
                if (!isDone) {
                    setStatus("failed");
                    setMessage("Payment verification timed out. Please check 'My Courses' or contact support.");
                }

                // ✅ CLEANUP: No interval to clear (using delays instead)

            } catch (error) {
                console.error("Verification error:", error);
                setStatus("failed");
                setMessage("An error occurred during verification");
            }
        };

        verifyPayment();
    }, [txnId, errorParam, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        {status === "loading" && <Loader2 className="h-12 w-12 animate-spin text-blue-500" />}
                        {status === "success" && <CheckCircle2 className="h-12 w-12 text-green-500" />}
                        {status === "failed" && <XCircle className="h-12 w-12 text-red-500" />}
                    </div>
                    <CardTitle>
                        {status === "loading" && "Processing Payment"}
                        {status === "success" && "Payment Successful"}
                        {status === "failed" && "Payment Failed"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                    <p>{message}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    {status !== "loading" && (
                        <Button onClick={() => window.location.href = "/student/dashboard"}>
                            Go to Dashboard
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

export default function PaymentVerifyPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <PaymentVerifyContent />
        </Suspense>
    );
}
