import { logger } from './logger';

// Environment Variables
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || MERCHANT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const CLIENT_VERSION = parseInt(process.env.PHONEPE_CLIENT_VERSION || "1");
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://www.math4code.com";

// Environment Configuration
const envVar = (process.env.PHONEPE_ENV || "").toLowerCase();
const isProd = envVar === "prod" || envVar === "production";

// API Endpoints for Standard Checkout v2
const API_BASE = isProd
  ? 'https://api.phonepe.com/apis/pg'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

const OAUTH_BASE = isProd
  ? 'https://api.phonepe.com/apis/identity-manager'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

// Validation
if (!MERCHANT_ID || !CLIENT_SECRET) {
  logger.error("❌ PhonePe Error: Missing Required Environment Variables (MERCHANT_ID or CLIENT_SECRET)");
}

/**
 * Get OAuth Token for Standard Checkout v2
 */
async function getOAuthToken(): Promise<string | null> {
  try {
    const url = `${OAUTH_BASE}/v1/oauth/token`;

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID || "",
      client_secret: CLIENT_SECRET || "",
      client_version: CLIENT_VERSION.toString()
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params,
      cache: "no-store"
    });

    const data = await response.json();

    if (data?.access_token) {
      return data.access_token;
    } else {
      logger.error("❌ Token Generation Failed:", JSON.stringify(data));
      return null;
    }
  } catch (error: any) {
    logger.error("❌ Token Error:", error.message);
    return null;
  }
}

/**
 * Initiate Payment using Standard Checkout v2
 */
export async function createPayment(
  merchantTransactionId: string,
  amount: number,
  userId: string,
  isMobile: boolean = false
) {
  try {
    // Get OAuth Token
    const token = await getOAuthToken();
    if (!token) {
      throw new Error("Failed to generate OAuth token");
    }

    const redirectUrl = `${DOMAIN}/api/phonepe/redirect?transactionId=${merchantTransactionId}${isMobile ? '&source=mobile' : ''}`;
    const callbackUrl = `${DOMAIN}/api/phonepe/callback`;

    // Build Payment Request for Standard Checkout v2
    const paymentPayload = {
      merchantOrderId: merchantTransactionId,
      amount: amount * 100, // Convert to paise
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: redirectUrl,
          callbackUrl: callbackUrl
        }
      }
    };

    const url = `${API_BASE}/checkout/v2/pay`;

    logger.log(`🚀 Initiating Payment: ${url}`);
    logger.log(`   Payload:`, JSON.stringify(paymentPayload, null, 2));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `O-Bearer ${token}`
      },
      body: JSON.stringify(paymentPayload),
      cache: "no-store"
    });

    const data = await response.json();

    logger.log(`   Response:`, JSON.stringify(data, null, 2));

    if (data?.redirectUrl) {
      return {
        success: true,
        data: {
          redirectUrl: data.redirectUrl
        }
      };
    } else {
      logger.error("❌ Payment Initiation Failed:", JSON.stringify(data));
      return {
        success: false,
        error: data?.message || "Payment initiation failed",
        details: data

      };
    }

  } catch (error: any) {
    logger.error("❌ PhonePe Payment Initiation Error:", error);
    return {
      success: false,
      error: error.message || "Payment initiation failed",
      details: error
    };
  }
}

/**
 * Check Payment Status using Standard Checkout v2 (OAuth Flow)
 */
export async function checkPaymentStatus(merchantTransactionId: string) {
  logger.log(`🔄 Checking Payment Status (v2 OAuth) for: ${merchantTransactionId}`);

  try {
    // Get OAuth Token
    const token = await getOAuthToken();
    if (!token) {
      throw new Error("Failed to generate OAuth token");
    }

    const url = `${API_BASE}/checkout/v2/order/${merchantTransactionId}/status`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `O-Bearer ${token}`
      },
      cache: "no-store"
    });

    const data = await response.json();

    return data;

  } catch (error: any) {
    logger.error("❌ Status Check Error:", error.message);
    return {
      success: false,
      code: "FAILED",
      message: error.message
    };
  }
}

/**
 * Helper to compute SHA256 hash using Web Crypto API (Edge Runtime Compatible)
 */
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Initiate Refund using v1 API (checksum-based)
 * Note: Standard Checkout v2 doesn't support refunds yet, so we use v1
 */
export async function refundTransaction(
  originalTransactionId: string,
  amount: number,
  userId: string
) {
  try {
    const newRefundTxnId = `RF${Date.now()}`;

    const refundPayload = {
      merchantId: MERCHANT_ID,
      merchantUserId: userId,
      originalTransactionId: originalTransactionId,
      merchantTransactionId: newRefundTxnId,
      amount: amount * 100, // in paise
      callbackUrl: `${DOMAIN}/api/phonepe/callback`
    };

    const payload = JSON.stringify(refundPayload);
    // Buffer is available in Node.js and some Edge environments (like Cloudflare Workers)
    // If Buffer is not available, we can use btoa/TextEncoder
    const payloadBase64 = Buffer.from(payload).toString('base64');

    const saltKey = CLIENT_SECRET || "";
    const saltIndex = CLIENT_VERSION || 1;

    const apiPath = "/pg/v1/refund";
    const stringToHash = payloadBase64 + apiPath + saltKey;

    // Use Web Crypto API for hashing
    const sha256Hash = await sha256(stringToHash);
    const xVerify = `${sha256Hash}###${saltIndex}`;

    const url = `${API_BASE}${apiPath}`;

    logger.log(`💸 Initiating Refund for: ${originalTransactionId}, Amount: ${amount}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify
      },
      body: JSON.stringify({ request: payloadBase64 })
    });

    const resData = await response.json();

    if (resData.success) {
      return {
        success: true,
        data: resData.data,
        message: "Refund Initiated Successfully"
      };
    } else {
      return {
        success: false,
        message: resData.message || "Refund Failed"
      };
    }

  } catch (error: any) {
    logger.error("❌ Refund Error:", error.message);
    return {
      success: false,
      message: error.message
    };
  }
}
