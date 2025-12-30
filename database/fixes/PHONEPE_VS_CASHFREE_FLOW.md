# PhonePe vs Cashfree Payment Flow Comparison

## 🔄 PhonePe Payment Flow

### **Authentication Method**
PhonePe uses **OAuth 2.0** (Client Credentials Grant)

### **Step 1: Get OAuth Token**
**API:** `POST /v1/oauth/token`
**File:** [`lib/phonepe.ts:31-63`](file:///e:/PROJECT%202025%20-%20October/math4code-website/lib/phonepe.ts#L31-L63)

```typescript
// Called BEFORE every payment operation
const token = await getOAuthToken();

// Request
POST https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id={PHONEPE_CLIENT_ID}
&client_secret={PHONEPE_CLIENT_SECRET}
&client_version=1

// Response
{
  "access_token": "eyJhbGc...",
  "expires_in": 3600
}
```

**⚠️ Important:** Token must be obtained for EACH API call (payment initiation, status check)

---

### **Step 2: Initiate Payment**
**API:** `POST /checkout/v2/pay`
**File:** [`lib/phonepe.ts:68-141`](file:///e:/PROJECT%202025%20-%20October/math4code-website/lib/phonepe.ts#L68-L141)

```typescript
// Request
POST https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay
Authorization: O-Bearer {access_token}
Content-Type: application/json

{
  "merchantOrderId": "MT1735456789123",
  "amount": 10000, // in paise (₹100.00)
  "paymentFlow": {
    "type": "PG_CHECKOUT",
    "merchantUrls": {
      "redirectUrl": "https://yoursite.com/api/phonepe/redirect?transactionId=MT...",
      "callbackUrl": "https://yoursite.com/api/phonepe/callback"
    }
  }
}

// Response
{
  "redirectUrl": "https://phonepe.com/pg-checkout?token=xyz..."
}
```

**What Happens:**
1. User redirected to `redirectUrl` (PhonePe hosted page)
2. User completes payment on PhonePe
3. PhonePe sends **webhook** to `callbackUrl` (async)
4. PhonePe redirects user to `redirectUrl` (sync)

---

### **Step 3: Webhook Callback (Async)**
**API:** PhonePe → Your Server
**Expected Endpoint:** `/api/phonepe/callback`
**Status:** ❌ **NOT IMPLEMENTED**

```typescript
// PhonePe sends POST request
POST https://yoursite.com/api/phonepe/callback
Content-Type: application/json

{
  "merchantOrderId": "MT1735456789123",
  "transactionId": "PP_TXN_123",
  "amount": 10000,
  "status": "SUCCESS",
  "code": "PAYMENT_SUCCESS"
}
```

**⚠️ Current Issue:** No handler exists, so webhook is ignored

---

### **Step 4: Status Check (Manual)**
**API:** `GET /checkout/v2/order/{orderId}/status`
**File:** [`lib/phonepe.ts:146-179`](file:///e:/PROJECT%202025%20-%20October/math4code-website/lib/phonepe.ts#L146-L179)

```typescript
// Called by verification API
GET https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/MT1735456789123/status
Authorization: O-Bearer {access_token}

// Response
{
  "success": true,
  "code": "PAYMENT_SUCCESS",
  "data": {
    "merchantOrderId": "MT1735456789123",
    "transactionId": "PP_TXN_123",
    "amount": 10000,
    "status": "SUCCESS"
  }
}
```

**When Called:**
- Frontend polling (every 2 seconds)
- Manual verification by admin

---

## 🔄 Cashfree Payment Flow

### **Authentication Method**
Cashfree uses **API Key** (x-client-id + x-client-secret headers)

### **Step 1: Create Order**
**API:** `POST /pg/orders`
**File:** [`lib/payments/cashfree.ts:120-152`](file:///e:/PROJECT%202025%20-%20October/math4code-website/lib/payments/cashfree.ts#L120-L152)

```typescript
// Request
POST https://sandbox.cashfree.com/pg/orders
x-client-id: {CASHFREE_APP_ID}
x-client-secret: {CASHFREE_SECRET_KEY}
x-api-version: 2025-01-01
Content-Type: application/json

{
  "order_id": "MT1735456789123",
  "order_amount": 100.00,
  "order_currency": "INR",
  "customer_details": {
    "customer_id": "user_123",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "9999999999"
  },
  "order_meta": {
    "return_url": "https://yoursite.com/student/payment/verify?txnId=MT...",
    "notify_url": "https://yoursite.com/api/payments/callback"
  }
}

// Response
{
  "cf_order_id": 123456,
  "order_id": "MT1735456789123",
  "payment_session_id": "session_abc123",
  "order_status": "ACTIVE"
}
```

---

### **Step 2: User Checkout**
**Method:** Redirect to Cashfree hosted page OR use JS SDK

```typescript
// Option 1: Redirect
window.location.href = `https://payments.cashfree.com/order/${payment_session_id}`;

// Option 2: JS SDK (currently used)
const cashfree = Cashfree({
  mode: "sandbox" // or "production"
});

cashfree.checkout({
  paymentSessionId: payment_session_id,
  returnUrl: "https://yoursite.com/student/payment/verify?txnId=MT...",
  redirectTarget: "_self"
});
```

---

### **Step 3: Webhook Callback (Async)**
**API:** Cashfree → Your Server
**Expected Endpoint:** `/api/payments/callback`
**Status:** ❌ **NOT IMPLEMENTED**

```typescript
// Cashfree sends POST request
POST https://yoursite.com/api/payments/callback
Content-Type: application/json
x-webhook-signature: {signature}

{
  "type": "PAYMENT_SUCCESS_WEBHOOK",
  "data": {
    "order": {
      "order_id": "MT1735456789123",
      "order_amount": 100.00,
      "order_status": "PAID"
    },
    "payment": {
      "cf_payment_id": 789456,
      "payment_status": "SUCCESS",
      "payment_amount": 100.00,
      "payment_time": "2025-12-29T12:00:00+05:30"
    }
  }
}
```

**⚠️ Current Issue:** No handler exists, so webhook is ignored

---

### **Step 4: Status Check (Manual)**
**API:** `GET /pg/orders/{order_id}`
**File:** [`lib/payments/cashfree.ts:173-210`](file:///e:/PROJECT%202025%20-%20October/math4code-website/lib/payments/cashfree.ts#L173-L210)

```typescript
// Called by verification API
GET https://sandbox.cashfree.com/pg/orders/MT1735456789123
x-client-id: {CASHFREE_APP_ID}
x-client-secret: {CASHFREE_SECRET_KEY}
x-api-version: 2025-01-01

// Response
{
  "cf_order_id": 123456,
  "order_id": "MT1735456789123",
  "order_status": "PAID",
  "order_amount": 100.00,
  "payment_session_id": "session_abc123"
}
```

---

## 📊 Key Differences

| Feature | PhonePe | Cashfree |
|---------|---------|----------|
| **Auth Method** | OAuth 2.0 (Token) | API Keys (Headers) |
| **Token Expiry** | 1 hour | N/A (keys don't expire) |
| **Payment API** | `/checkout/v2/pay` | `/pg/orders` |
| **Status API** | `/checkout/v2/order/{id}/status` | `/pg/orders/{id}` |
| **Webhook Signature** | ❌ Not documented | ✅ `x-webhook-signature` header |
| **Amount Format** | Paise (10000 = ₹100) | Rupees (100.00 = ₹100) |
| **Customer Details** | Optional | Required |
| **Redirect Method** | Direct URL | URL or JS SDK |

---

## ⚠️ Missing Implementation

### **Webhook Handler**
**File:** `app/api/payments/callback/route.ts` (DOES NOT EXIST)

**Required Logic:**
```typescript
export async function POST(req: Request) {
  // 1. Parse webhook payload
  const payload = await req.json();
  
  // 2. Verify signature (Cashfree) or validate source (PhonePe)
  // 3. Extract transaction ID
  // 4. Update course_payments table
  // 5. Create enrollment if success
  // 6. Send confirmation email
  
  return NextResponse.json({ received: true });
}
```

**Why Critical:**
- If user closes browser before polling completes
- If network drops during redirect
- Webhook ensures payment is processed even if user never returns

---

## 🎯 API Call Summary

### **PhonePe Flow**
1. ✅ `POST /v1/oauth/token` (Get Token)
2. ✅ `POST /checkout/v2/pay` (Initiate Payment)
3. ❌ `POST /api/phonepe/callback` (Webhook - NOT IMPLEMENTED)
4. ✅ `GET /checkout/v2/order/{id}/status` (Manual Check)

### **Cashfree Flow**
1. ✅ `POST /pg/orders` (Create Order)
2. ✅ User Checkout (JS SDK or Redirect)
3. ❌ `POST /api/payments/callback` (Webhook - NOT IMPLEMENTED)
4. ✅ `GET /pg/orders/{id}` (Manual Check)

---

## ✅ Next Steps

1. **Implement Unified Webhook Handler** at `/api/payments/callback`
2. **Verify Webhook Signatures** (especially for Cashfree)
3. **Test PhonePe OAuth Flow** (ensure token refresh works)
4. **Add Webhook Retry Logic** (in case first attempt fails)
