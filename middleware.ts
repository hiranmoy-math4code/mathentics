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
  // - math4code.com -> math4code
  // - tenant-a.localhost:3000 -> tenant-a
  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts[0] : hostname.split(':')[0];

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

  // 1. STRICT SKIP: Static files and images don't need tenant context
  // This reduces overhead for assets
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/static') ||
    pathname.includes('.') || // Files like favicon.ico, robot.txt
    pathname === '/favicon.ico'
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
        redirectUrl.pathname = '/login'
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
