// ❌ import crypto from 'crypto'; // এই লাইনটি রিমুভ করা হয়েছে

// Environment Variables
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID!;
const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || MERCHANT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET!;
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1";
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

// Environment Check
const envVar = (process.env.PHONEPE_ENV || "").toLowerCase();
const isProd = envVar === "prod" || envVar === "production";

// Base URLs for V2
const HOST_URL = isProd
  ? 'https://api.phonepe.com/apis'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

/**
 * Helper Function: SHA256 Hash using Native Web Crypto API
 * এটি Cloudflare Edge এ কোনো ভারী লাইব্রেরি ছাড়াই চলে।
 */
async function generateChecksum(payload: string, apiPath: string, secret: string, index: string) {
  const stringToHash = payload + apiPath + secret;

  // Web Crypto API ব্যবহার করে হ্যাশ তৈরি
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToHash);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return `${sha256}###${index}`;
}

/**
 * 1. Create Payment
 */
export async function createPayment(merchantTransactionId: string, amount: number, userId: string) {
  try {
    const token = await getOAuthToken();
    if (!token) throw new Error("Failed to generate OAuth token");

    const redirectUrl = `${DOMAIN}/api/phonepe/redirect?transactionId=${merchantTransactionId}`;
    const callbackUrl = `${DOMAIN}/api/phonepe/callback`;

    const payload = {
      merchantOrderId: merchantTransactionId,
      merchantId: MERCHANT_ID,
      amount: amount * 100,
      mobileNumber: userId,
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: redirectUrl,
          callbackUrl: callbackUrl
        }
      },
      metaInfo: {
        udf1: "course_purchase",
        udf2: userId
      }
    };

    const url = `${HOST_URL}/pg/checkout/v2/pay`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `O-Bearer ${token}`,
        "X-MERCHANT-ID": MERCHANT_ID
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        data: {
          redirectUrl: data.data?.instrumentResponse?.redirectInfo?.url || data.data?.redirectUrl
        }
      };
    } else {
      throw new Error(data.message || "Payment initiation failed");
    }

  } catch (error: any) {
    console.error("❌ PhonePe Payment Initiation Error:", error);
    return {
      success: false,
      error: error.message || "Payment initiation failed",
      details: error
    };
  }
}

/**
 * 2. Check Payment Status
 */
export async function checkPaymentStatus(merchantTransactionId: string) {
  try {
    const token = await getOAuthToken();
    if (!token) throw new Error("Failed to generate OAuth token");

    const url = `${HOST_URL}/pg/checkout/v2/order/${merchantTransactionId}/status`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `O-Bearer ${token}`,
        "X-MERCHANT-ID": MERCHANT_ID
      },
      cache: "no-store"
    });

    return await response.json();

  } catch (error: any) {
    console.error("❌ Status Check Error:", error.message);
    return { success: false, code: "FAILED", message: error.message };
  }
}

/**
 * 3. Initiate Refund
 */
export async function refundTransaction(originalTransactionId: string, amount: number, userId: string) {
  try {
    const newRefundTxnId = `RF${Date.now()}`;
    const data = {
      merchantId: MERCHANT_ID,
      merchantUserId: userId,
      originalTransactionId: originalTransactionId,
      merchantTransactionId: newRefundTxnId,
      amount: amount * 100,
      callbackUrl: `${DOMAIN}/api/phonepe/callback`
    };

    const payloadBase64 = Buffer.from(JSON.stringify(data)).toString('base64');
    const apiPath = "/pg/v1/refund";

    // ✅ এখানে ম্যানুয়াল crypto র বদলে আমাদের নতুন ফাংশন ব্যবহার করছি
    const xVerify = await generateChecksum(payloadBase64, apiPath, CLIENT_SECRET, CLIENT_VERSION);

    const url = `${HOST_URL}${apiPath}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify
      },
      body: JSON.stringify({ request: payloadBase64 })
    });

    return await response.json();

  } catch (error: any) {
    console.error("❌ Refund Error:", error.message);
    return { success: false, message: error.message };
  }
}

/**
 * 4. OAuth Token Generator
 */
async function getOAuthToken() {
  try {
    const url = `${HOST_URL}/identity-manager/v1/oauth/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('client_version', CLIENT_VERSION);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      cache: "no-store"
    });

    const data = await response.json();
    return data.access_token || null;
  } catch (error: any) {
    console.error("❌ Token Error:", error.message);
    return null;
  }
}