"use client";

import { useState } from 'react';
import Script from 'next/script';

// Declare global Cashfree variable
declare const Cashfree: any;

export default function CashfreeDebugPage() {
    const [amount, setAmount] = useState('1.00');
    const [phone, setPhone] = useState('9999999999');
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

    const handlePay = async () => {
        try {
            setLoading(true);
            setLogs([]); // Clear previous logs
            addLog('🚀 Starting payment flow...');

            // 1. Create Order
            addLog('📞 Calling /api/cashfree/create-order...');
            const returnUrl = typeof window !== 'undefined' ? `${window.location.origin}/cashfree-debug?status={payment_status}` : '';

            const res = await fetch('/api/cashfree/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    customerId: `CUST_${Date.now()}`,
                    customerPhone: phone,
                    returnUrl: returnUrl,
                    customerName: 'Debug User',
                    customerEmail: 'debug@example.com'
                })
            });

            const data = await res.json();
            addLog(`📥 API Response: ${JSON.stringify(data, null, 2)}`);

            if (!res.ok || !data.success) {
                throw new Error(data.message || data.details?.message || 'Order creation failed');
            }

            const { paymentSessionId, environment } = data;

            if (!paymentSessionId) {
                throw new Error('paymentSessionId is missing from response');
            }

            // 2. Initialize SDK
            // We trust the backend's environment variable to ensure consistency
            addLog(`🛠️ Initializing Cashfree SDK (Mode: ${environment})...`);

            if (typeof Cashfree === 'undefined') {
                throw new Error('Cashfree SDK not loaded. Check internet connection or ad blockers.');
            }

            const cashfree = new Cashfree({
                mode: environment, // 'sandbox' or 'production' matches backend
            });

            // 3. Checkout
            addLog(`💸 invoking cashfree.checkout() with Session ID: ${paymentSessionId}`);

            await cashfree.checkout({
                paymentSessionId: paymentSessionId,
                returnUrl: returnUrl,
            });

            addLog('✅ Checkout invoked. Redirecting...');

        } catch (error: any) {
            console.error(error);
            addLog(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            <Script
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                strategy="lazyOnload"
                onLoad={() => console.log('Cashfree SDK Loaded')}
            />

            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Cashfree JS SDK Test</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    <button
                        onClick={handlePay}
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>

                {/* Logs Area */}
                <div className="mt-8 bg-gray-900 rounded-lg p-4 overflow-hidden">
                    <h3 className="text-gray-400 text-xs uppercase font-bold mb-2">Debug Console</h3>
                    <div className="h-64 overflow-y-auto font-mono text-xs text-green-400 space-y-1">
                        {logs.length === 0 && <span className="text-gray-600">Waiting for action...</span>}
                        {logs.map((log, i) => (
                            <div key={i} className="break-words border-b border-gray-800 pb-1 mb-1 last:border-0">{log}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
