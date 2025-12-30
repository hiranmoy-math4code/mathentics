   # Manual Tenant Setup via Supabase Dashboard

## Step 1: Open Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Table Editor** in left sidebar

## Step 2: Add Tenant A (Port 3000)

1. Select `tenants` table
2. Click **Insert** → **Insert row**
3. Fill in the values:

```
id: aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
name: Tenant A (Port 3000)
slug: tenant-a
custom_domain: localhost:3000
is_active: true
settings: {}
```

4. Click **Save**

## Step 3: Add Tenant B (Port 3001)

1. Click **Insert** → **Insert row** again
2. Fill in the values:

```
id: bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb
name: Tenant B (Port 3001)
slug: tenant-b
custom_domain: localhost:3001
is_active: true
settings: {}
```

3. Click **Save**

## Step 4: Verify Tenants Created

1. In `tenants` table, you should see:
   - Math4Code (existing)
   - Tenant A (Port 3000) ✅
   - Tenant B (Port 3001) ✅

## Important Fields Explained

- **id**: Unique identifier (use the exact UUIDs above for consistency)
- **name**: Display name (can be anything)
- **slug**: URL-friendly identifier (MUST match code: `tenant-a`, `tenant-b`)
- **custom_domain**: Domain/port mapping (MUST be exact: `localhost:3000`, `localhost:3001`)
- **is_active**: Enable/disable tenant (set to `true`)
- **settings**: JSON config (leave as `{}` for now)

## Step 5: Test the Setup

### Run Two Servers:

**Terminal 1**:
```bash
npm run dev
# Runs on localhost:3000
```

**Terminal 2**:
```bash
$env:PORT=3001; npm run dev
# Runs on localhost:3001
```

### Test Signup:

**Port 3000**:
1. Visit `http://localhost:3000/auth/sign-up`
2. Open Console (F12)
3. Signup with test email
4. Console should show: `tenantSlug: 'tenant-a'` ✅

**Port 3001**:
1. Visit `http://localhost:3001/auth/sign-up`
2. Open Console (F12)
3. Signup with different test email
4. Console should show: `tenantSlug: 'tenant-b'` ✅

## Step 6: Verify in Database

1. Go to **Table Editor** → `user_tenant_memberships`
2. You should see:
   - User from port 3000 → `tenant_id` = `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa` ✅
   - User from port 3001 → `tenant_id` = `bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb` ✅

## Troubleshooting

### If signup still goes to default tenant:
1. Check `slug` field exactly matches: `tenant-a` and `tenant-b`
2. Check `custom_domain` exactly matches: `localhost:3000` and `localhost:3001`
3. Restart dev servers
4. Clear browser cache (Ctrl+Shift+Delete)

### If tenant not found error:
1. Make sure `is_active` is `true`
2. Check middleware cache (wait 5 minutes or restart server)

## Quick Copy-Paste Values

### Tenant A:
```
id: aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa
name: Tenant A (Port 3000)
slug: tenant-a
custom_domain: localhost:3000
is_active: true
settings: {}
```

### Tenant B:
```
id: bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb
name: Tenant B (Port 3001)
slug: tenant-b
custom_domain: localhost:3001
is_active: true
settings: {}
```

## Done! 🎉

You can now test multi-tenant isolation on your local machine using two different ports!
