import { logger } from './logger';

// Environment Variables
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1";
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

// Robust Environment Check
const envVar = (process.env.PHONEPE_ENV || "").toLowerCase();
const isProd = envVar === "prod" || envVar === "production";

// Base URLs
const PHONEPE_HOST_URL = isProd
  ? "https://api.phonepe.com/apis/hermes"
  : "https://api-preprod.phonepe.com/apis/pg-sandbox";

// Validation
if (!MERCHANT_ID || !CLIENT_SECRET) {
  logger.error("❌ PhonePe Error: Missing Required Environment Variables (MERCHANT_ID or CLIENT_SECRET)");
}

/**
 * Utility: Create SHA-256 Hash using Web Crypto API
 */
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Utility: Base64 Encode
 */
function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Initiate Payment using Custom Fetch Implementation (Edge Compatible)
 */
export async function createPayment(merchantTransactionId: string, amount: number, userId: string) {
  try {
    const redirectUrl = `${DOMAIN}/api/phonepe/redirect?transactionId=${merchantTransactionId}`;
    const callbackUrl = `${DOMAIN}/api/phonepe/callback`;

    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100, // paise
      redirectUrl: redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl: callbackUrl,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const base64Payload = toBase64(JSON.stringify(payload));
    const apiPath = "/pg/v1/pay";

    // X-VERIFY calculation: SHA256(base64Payload + apiEndpoint + salt) + ### + saltIndex
    const stringToHash = base64Payload + apiPath + CLIENT_SECRET;
    const hash = await sha256(stringToHash);
    const xVerify = `${hash}###${CLIENT_VERSION}`;

    const url = `${PHONEPE_HOST_URL}${apiPath}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": MERCHANT_ID || ""
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        data: {
          redirectUrl: data.data.instrumentResponse.redirectInfo.url
        }
      };
    } else {
      throw new Error(data.message || "Payment initiation failed from PhonePe");
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
 * Check Payment Status (Edge Compatible)
 */
export async function checkPaymentStatus(merchantTransactionId: string) {
  try {
    const apiPath = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const stringToHash = apiPath + CLIENT_SECRET;
    const hash = await sha256(stringToHash);
    const xVerify = `${hash}###${CLIENT_VERSION}`;

    const url = `${PHONEPE_HOST_URL}${apiPath}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": MERCHANT_ID || ""
      }
    });

    const data = await response.json();
    return data;

  } catch (error: any) {
    logger.error("   ❌ Status Check Error:", error.message);
    return { success: false, code: "FAILED", message: error.message };
  }
}

/**
 * Initiate Refund (Edge Compatible)
 */
export async function refundTransaction(
  originalTransactionId: string,
  amount: number,
  userId: string
) {
  try {
    const newRefundTxnId = `RF${Date.now()}`;
    const apiPath = "/pg/v1/refund";

    const payload = {
      merchantId: MERCHANT_ID,
      merchantUserId: userId,
      originalTransactionId: originalTransactionId,
      merchantTransactionId: newRefundTxnId,
      amount: amount * 100, // paise
      callbackUrl: `${DOMAIN}/api/phonepe/callback`
    };

    const base64Payload = toBase64(JSON.stringify(payload));
    const stringToHash = base64Payload + apiPath + CLIENT_SECRET;
    const hash = await sha256(stringToHash);
    const xVerify = `${hash}###${CLIENT_VERSION}`;

    const url = `${PHONEPE_HOST_URL}${apiPath}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": MERCHANT_ID || ""
      },
      body: JSON.stringify({ request: base64Payload })
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, data: data.data, message: "Refund Initiated Successfully" };
    } else {
      return { success: false, message: data.message || "Refund Failed" };
    }

  } catch (error: any) {
    logger.error("   ❌ Refund Error:", error.message);
    return { success: false, message: error.message };
  }
}