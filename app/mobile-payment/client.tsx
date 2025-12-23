'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function MobilePaymentContent() {
    const searchParams = useSearchParams();
    const target = searchParams.get('target');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (target) {
            try {
                // Validate URL locally to be safe
                new URL(target);

                // Explicitly set referrer via history if possible, but location.replace usually works
                // if meta tag is present.
                // We use window.open as fallback if replace fails? No. 
                // Just use replace.
                window.location.replace(target);
            } catch (e) {
                setError('Invalid payment URL provided.');
            }
        } else {
            setError('No payment target specified.');
        }
    }, [target]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="p-6 bg-white rounded-lg shadow-md max-w-sm w-full text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Payment Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-800">Secure Payment</h1>
                <p className="text-gray-500">Redirecting to payment gateway...</p>
                <p className="text-xs text-gray-400 max-w-xs text-center">
                    Please do not close this window or press back.
                </p>
            </div>
        </div>
    );
}

export default function MobilePaymentClient() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        }>
            <MobilePaymentContent />
        </Suspense>
    );
}
