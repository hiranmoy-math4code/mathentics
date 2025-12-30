# Tenant Filtering Debug Checklist

## Problem
All tenants' courses showing on all domains (tenant-a.local:3000 shows tenant-b courses and vice versa)

## Steps to Debug

### 1. Hard Refresh Browser
- [ ] Press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)
- [ ] Or clear browser cache completely
- [ ] This ensures new code is loaded

### 2. Check Browser Console
Open Console (F12 → Console tab) and look for these logs:

```
🔍 Detecting tenant from domain: tenant-b.local:3000
🏢 Tenant found by domain: { id: 'de4cea86-71bb-4091-b336-91ee530f7d16', name: 'Tenant B (Port 3000)', ... }
✅ Using tenant ID for courses: de4cea86-71bb-4091-b336-91ee530f7d16
```

**What to check:**
- [ ] Is domain detected correctly?
- [ ] Is tenant found?
- [ ] Is tenant_id correct for the domain?

### 3. If Tenant NOT Found
Run this SQL to verify domain configuration:
```sql
SELECT id, name, slug, custom_domain 
FROM public.tenants 
WHERE custom_domain IN ('tenant-a.local:3000', 'tenant-b.local:3000');
```

### 4. Check Course Distribution
Run this SQL to see which courses belong to which tenant:
```sql
SELECT 
    c.title,
    t.name as tenant_name,
    t.slug as tenant_slug
FROM courses c
LEFT JOIN tenants t ON c.tenant_id = t.id
WHERE c.is_published = true
ORDER BY t.slug, c.title;
```

**Expected:** Some courses should have tenant_id = 'f9c03969-da89-4d2e-92eb-029490268453' (Tenant A)
and others should have tenant_id = 'de4cea86-71bb-4091-b336-91ee530f7d16' (Tenant B)

**If ALL courses have SAME tenant_id:** You need to manually assign courses to different tenants:
```sql
-- Move some courses to Tenant B
UPDATE courses 
SET tenant_id = 'de4cea86-71bb-4091-b336-91ee530f7d16'
WHERE title IN ('Course Name 1', 'Course Name 2');
```

### 5. Check Network Tab
- [ ] Open Network tab (F12 → Network)
- [ ] Filter by "courses"
- [ ] Check the Supabase query
- [ ] Verify `tenant_id` filter is in the query

### 6. Restart Dev Server
Sometimes Next.js needs restart:
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

## Current Status
- ✅ Code updated with tenant detection
- ✅ Debug logs added
- ⏳ Waiting for browser console output
- ⏳ Need to verify course distribution

## Next Steps
1. Share browser console output
2. Share course distribution SQL results
3. If needed, manually assign courses to tenants
