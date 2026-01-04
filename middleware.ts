import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

// ============================================================================
// MULTI-TENANT: In-memory cache for tenant lookups (Cloudflare Pages optimization)
// ============================================================================
const tenantCache = new Map<string, { id: string; expiry: number }>();

// Cache TTL: 15 minutes in production, 5 minutes in development
// Longer cache in production reduces DB load significantly at scale
const CACHE_TTL = process.env.NODE_ENV === 'production'
  ? 15 * 60 * 1000  // 15 minutes (production)
  : 5 * 60 * 1000;  // 5 minutes (development)

async function getTenantFromHostname(hostname: string, supabase: any): Promise<string | null> {
  // 0. PERFORMANCE OVERRIDE: process.env.NEXT_PUBLIC_TENANT_ID
  // If a static tenant ID is set in environment, use it immediately.
  // This bypasses database lookups entirely for single-tenant deployments.
  if (process.env.NEXT_PUBLIC_TENANT_ID) {
    return process.env.NEXT_PUBLIC_TENANT_ID;
  }

  // Check cache first (reduces DB queries by ~90%)
  const cached = tenantCache.get(hostname);
  if (cached && cached.expiry > Date.now()) {
    return cached.id;
  }

  // Extract subdomain or use full domain
  // Examples: 
  // - mathentics.com -> mathentics
  // - tenant-a.localhost:3000 -> tenant-a
  // - www.mathentics.com -> mathentics (after normalization)

  // Normalize: remove www.
  const normalizedHost = hostname.replace(/^www\./, '');
  const parts = normalizedHost.split('.');

  // Logic: 
  // 1. If localhost (parts=1), use strictly localhost (or handle dev mode)
  // 2. If domain.com (parts=2), use domain.com (will check custom_domain)
  // 3. If sub.domain.com (parts>2), use sub (check slug)

  let subdomain = normalizedHost; // Default to full host for custom_domain check

  if (parts.length > 2) {
    subdomain = parts[0]; // Is a subdomain
  } else if (parts.length === 2) {
    // domain.com - might be a custom domain, or we might want to try parts[0] as slug?
    // Usually better to leave as full host to match custom_domain, 
    // BUT if you want mathentics.com -> mathentics slug, you can add that fallback logic in DB query logic.
    // For now, let's keep it as is, but rely on 'normalizedHost' for cleaner lookups.
    subdomain = normalizedHost.split(':')[0];
  } else {
    // localhost
    subdomain = normalizedHost.split(':')[0];
  }

  try {
    // Query tenants table
    const { data: tenant } = await supabase
      .from('tenants')
      .select('id')
      .or(`slug.eq.${subdomain},custom_domain.eq.${hostname}`)
      .eq('is_active', true)
      .single();

    if (tenant) {
      // Cache the result
      tenantCache.set(hostname, { id: tenant.id, expiry: Date.now() + CACHE_TTL });
      return tenant.id;
    }
  } catch (error) {
    console.error('Tenant lookup error:', error);
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (
    pathname.startsWith('/_next/static') || // static assets
    pathname.startsWith('/_next/image') ||  // optimized images
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    (pathname.includes('.') && !pathname.startsWith('/api') && !search.includes('_rsc'))
  ) {
    return NextResponse.next()
  }
  // 2. MULTI-TENANT: Get hostname and lookup tenant
  // We do this BEFORE skipping API/_rsc because they might need the tenant header
  const hostname = request.headers.get('host') || 'localhost:3000';

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        },
      },
    }
  )

  const tenantId = await getTenantFromHostname(hostname, supabase);

  // 3. Prepare Response Headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", pathname)

  if (tenantId) {
    requestHeaders.set("x-tenant-id", tenantId)
  }

  // 4. PARTIAL SKIP: API routes and RSC requests
  // They normally handle their own errors, but we MUST pass the tenant header
  if (
    pathname.startsWith('/api') ||
    search.includes('_rsc=')
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // 5. Handle Tenant Not Found (for main pages)
  if (!tenantId && !pathname.startsWith('/404-tenant-not-found')) {
    return NextResponse.rewrite(new URL('/404-tenant-not-found', request.url));
  }

  // 6. Session Update (for Auth)
  await updateSession(request)

  // 7. Admin Route Protection
  if (pathname.startsWith('/admin')) {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/auth/login'
        return NextResponse.redirect(redirectUrl)
      }

      // Check user role
      const { data: membership } = await supabase
        .from('user_tenant_memberships')
        .select('role')
        .eq('user_id', user.id)
        .eq('tenant_id', tenantId) // This works because we resolved tenantId above
        .eq('is_active', true)
        .single()

      if (membership?.role !== 'admin' && membership?.role !== 'creator') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/student/dashboard'
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error('Middleware auth error:', error)
    }
  }

  // 8. Final Response
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// ৬. গুরুত্বপূর্ণ: Matcher কনফিগারেশন
export const config = {
  matcher: [
    /*
     * এই প্যাটার্নটি নিশ্চিত করে যে:
     * - api রুটগুলো মিডলওয়্যার দ্বারা ব্লক হবে না (POST 404 ফিক্স করবে)
     * - সব স্ট্যাটিক ফাইল (images, css) স্কিপ হবে
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\..*).*)',
  ],
}
