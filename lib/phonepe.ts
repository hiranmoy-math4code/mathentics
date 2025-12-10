import crypto from 'crypto'; // Cloudflare-এ 'nodejs_compat' ফ্ল্যাগ থাকলে এটি কাজ করবে

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
 * 1. Create Payment (Replaces SDK StandardCheckoutClient)
 * Uses V2 API: POST /checkout/v2/pay
 */
export async function createPayment(merchantTransactionId: string, amount: number, userId: string) {
  try {
    // ১. প্রথমে টোকেন জেনারেট করুন (আপনার বিদ্যমান ফাংশন ব্যবহার করে)
    const token = await getOAuthToken();
    if (!token) throw new Error("Failed to generate OAuth token");

    const redirectUrl = `${DOMAIN}/api/phonepe/redirect?transactionId=${merchantTransactionId}`;
    const callbackUrl = `${DOMAIN}/api/phonepe/callback`;

    // ২. পেমেন্ট পেইলড তৈরি (SDK-এর বদলে ম্যানুয়ালি)
    const payload = {
      merchantOrderId: merchantTransactionId,
      merchantId: MERCHANT_ID,
      amount: amount * 100, // পয়সায় রূপান্তর
      mobileNumber: userId, // অথবা ইউজার থেকে মোবাইল নম্বর নিতে পারেন
      paymentFlow: {
        type: "PG_CHECKOUT", // Standard Checkout V2 Flow
        merchantUrls: {
          redirectUrl: redirectUrl,
          callbackUrl: callbackUrl // কিছু ক্ষেত্রে এটি রুটে থাকতে পারে, ডকুমেন্টেশন ভেদে ভিন্ন হয়
        }
      },
      // V2-তে মেটা ইনফো এভাবে পাঠানো যায়
      metaInfo: {
        udf1: "course_purchase",
        udf2: userId
      }
    };

    // ৩. সরাসরি API কল (O-Bearer Token দিয়ে)
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
          // V2 রেসপন্স থেকে রিডাইরেক্ট ইউআরএল বের করা
          redirectUrl: data.data?.instrumentResponse?.redirectInfo?.url || data.data?.redirectUrl
        }
      };
    } else {
      throw new Error(data.message || "Payment initiation failed from PhonePe");
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
 * 2. Check Payment Status (আপনার আগের কোডই রাখা হয়েছে)
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
 * 3. Initiate Refund (আপনার আগের কোড, শুধু URL অ্যাডজাস্ট করা হয়েছে)
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

    // রিফান্ড সাধারণত V1 API বা checksum ব্যবহার করে
    const apiPath = "/pg/v1/refund";
    const stringToHash = payloadBase64 + apiPath + CLIENT_SECRET; // Client Secret কে সল্ট হিসেবে ব্যবহার করা হচ্ছে
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const xVerify = `${sha256}###${CLIENT_VERSION}`; // Salt Index হিসেবে Version ব্যবহার করা হচ্ছে

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
 * 4. OAuth Token Generator (পুনরায় ব্যবহারযোগ্য)
 */
async function getOAuthToken() {
  try {
    const url = `${HOST_URL}/identity-manager/v1/oauth/token`; // URL স্ট্রাকচার ঠিক করা হয়েছে

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
