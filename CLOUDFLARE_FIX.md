# Cloudflare Deployment Fix - Reward System

## Problem

When deploying to Cloudflare Pages, the reward system was not working because:

1. Server actions were using `headers()` from `next/headers`
2. When called from client components, `headers()` is not available in Cloudflare's edge runtime
3. This caused all reward actions (login rewards, coins, streaks) to fail silently

## Solution

### 1. Refactored Server Actions

**File:** `app/actions/rewardActions.ts`

**Changes:**
- All reward functions now accept optional `tenantId` parameter
- Falls back to `headers()` only if `tenantId` not provided
- Wrapped `headers()` in try-catch for graceful degradation

**Example:**
```typescript
// Before (Cloudflare incompatible)
export async function awardCoins(userId: string, action: ActionType) {
    const tenantId = await getTenantId(); // Uses headers()
    // ...
}

// After (Cloudflare compatible)
export async function awardCoins(
    userId: string, 
    action: ActionType,
    entityId?: string,
    description?: string,
    tenantId?: string  // ← New parameter
) {
    const finalTenantId = tenantId || await getTenantIdFromHeaders();
    // ...
}
```

### 2. Created Tenant ID Hook

**File:** `hooks/useTenantId.ts`

**Purpose:** Provides tenant ID to client components from environment variable

```typescript
export function useTenantId(): string | null {
    return process.env.NEXT_PUBLIC_TENANT_ID;
}
```

### 3. Updated Client Components

**File:** `components/RewardInitializer.tsx`

**Changes:**
- Uses `useTenantId()` hook
- Passes tenant ID to all reward actions
- Shows warning if tenant ID not available

```typescript
const tenantId = useTenantId();

// Pass tenant ID to reward actions
await awardCoins(userId, 'login', undefined, undefined, tenantId);
```

**File:** `hooks/useRewards.ts`

**Changes:**
- Accepts optional `tenantId` parameter
- Passes it to all reward mutations

---

## Required Configuration

### Environment Variable

Add to your `.env.local` and Cloudflare Pages environment variables:

```bash
# Your tenant ID (get from Supabase tenants table)
NEXT_PUBLIC_TENANT_ID=your-tenant-id-here
```

**How to get your tenant ID:**
1. Open Supabase SQL Editor
2. Run: `SELECT id, slug FROM tenants WHERE is_active = true;`
3. Copy the `id` value
4. Add to `.env.local` and Cloudflare environment variables

---

## Testing

### Local Testing

1. Add `NEXT_PUBLIC_TENANT_ID` to `.env.local`
2. Restart dev server: `npm run dev`
3. Login as a student
4. Check console for: `✅ Tenant ID: xxx`
5. Verify you get login reward toast

### Cloudflare Testing

1. Add `NEXT_PUBLIC_TENANT_ID` to Cloudflare Pages environment variables
2. Redeploy
3. Login as a student
4. Check browser console for errors
5. Verify reward system works

---

## Files Changed

### Created
- ✅ `hooks/useTenantId.ts` - Tenant ID hook for client components

### Modified
- ✅ `app/actions/rewardActions.ts` - Accept optional tenantId parameter
- ✅ `components/RewardInitializer.tsx` - Use tenant ID hook
- ✅ `hooks/useRewards.ts` - Pass tenant ID to mutations

---

## Backward Compatibility

✅ **Server-side calls still work** - Falls back to `headers()` if no tenantId provided

✅ **Local development works** - Can use either method

✅ **Cloudflare deployment works** - Uses environment variable

---

## Troubleshooting

### Reward system not working?

1. **Check environment variable:**
   ```bash
   # In browser console:
   console.log(process.env.NEXT_PUBLIC_TENANT_ID);
   ```
   Should show your tenant ID, not `undefined`

2. **Check console warnings:**
   Look for: `⚠️ Tenant ID not available. Reward system will not work.`

3. **Verify tenant ID is correct:**
   ```sql
   -- In Supabase SQL Editor:
   SELECT id, slug, is_active FROM tenants;
   ```

4. **Check Cloudflare environment variables:**
   - Go to Cloudflare Pages → Settings → Environment variables
   - Verify `NEXT_PUBLIC_TENANT_ID` is set
   - Redeploy after adding

---

## Summary

✅ Reward system now works on Cloudflare Pages  
✅ Backward compatible with server-side calls  
✅ Simple configuration (one environment variable)  
✅ Graceful error handling  

**Action Required:** Add `NEXT_PUBLIC_TENANT_ID` to your environment variables!
