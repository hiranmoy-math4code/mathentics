import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

// ============================================================================
// SINGLE-TENANT: Direct environment variable lookup (Zero DB queries)
// ============================================================================
// For single-tenant deployments, tenant ID is always in environment variables
// This eliminates database lookups entirely for maximum performance

/**
 * getTenantId - Retrieves tenant ID from environment variables
 * 
 * PERFORMANCE: Zero database queries, instant resolution
 * 
 * @returns Tenant ID from NEXT_PUBLIC_TENANT_ID or null if not set
 */
function getTenantId(): string | null {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID

  if (!tenantId) {
    console.error('❌ NEXT_PUBLIC_TENANT_ID not found in environment variables!')
    console.error('Please set NEXT_PUBLIC_TENANT_ID in your .env.local file')
    return null
  }

  // Optional: Log in development to verify it's working
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Using tenant ID from environment:', tenantId)
  }

  return tenantId
}

// ============================================================================
// MAIN MIDDLEWARE
// ============================================================================

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // ============================================================================
  // 1. EARLY RETURN: Skip static assets and special files
  // ============================================================================
  if (
    pathname.startsWith('/_next/static') || // Next.js static files
    pathname.startsWith('/_next/image') ||  // Next.js image optimization
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/manifest.json' ||
    // Skip files with extensions (except API routes and RSC)
    (pathname.includes('.') && !pathname.startsWith('/api') && !search.includes('_rsc'))
  ) {
    return NextResponse.next()
  }

  // ============================================================================
  // 2. TENANT RESOLUTION: Get tenant ID from environment
  // ============================================================================
  // PERFORMANCE: Zero database queries - instant tenant resolution
  const tenantId = getTenantId()

  // ============================================================================
  // 3. API ROUTES: Early return with tenant header
  // ============================================================================
  // API routes handle their own auth, we just pass the tenant header
  if (pathname.startsWith('/api') || search.includes('_rsc=')) {
    const response = NextResponse.next()
    if (tenantId) {
      response.headers.set("x-tenant-id", tenantId)
    }
    response.headers.set("x-url", pathname)
    return response
  }

  // ============================================================================
  // 4. TENANT NOT FOUND: Show error page
  // ============================================================================
  if (!tenantId && !pathname.startsWith('/404-tenant-not-found')) {
    return NextResponse.rewrite(new URL('/404-tenant-not-found', request.url))
  }

  // ============================================================================
  // 5. SESSION UPDATE & AUTH: Get response and user data
  // ============================================================================
  // CRITICAL: updateSession returns BOTH response (with cookies) AND user data
  // This prevents creating multiple Supabase clients (cookie desync risk)
  // 
  // updateSession handles:
  // - Session refresh and cookie updates
  // - Auth page redirects (logged-in users away from /auth)
  // - Protected route redirects (non-logged-in users to /auth/login)
  const { response, user } = await updateSession(request, tenantId)

  // ============================================================================
  // 6. ADD TENANT HEADERS: Merge into response
  // ============================================================================
  // The response might be a redirect or a next() response
  // We add tenant headers to whatever updateSession returned
  if (tenantId) {
    response.headers.set("x-tenant-id", tenantId)
  }
  response.headers.set("x-url", pathname)

  // ============================================================================
  // 7. ADMIN ROUTE PROTECTION: Check admin role
  // ============================================================================
  // We use the user data from updateSession (no second getUser() call)
  // This prevents cookie desync and reduces latency
  if (pathname.startsWith('/admin') && user) {
    // Create client only for role check (we already have user data)
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

    try {
      // Check if user has admin/creator role in this tenant
      const { data: membership } = await supabase
        .from('user_tenant_memberships')
        .select('role')
        .eq('user_id', user.id)
        .eq('tenant_id', tenantId)
        .eq('is_active', true)
        .single()

      // If not admin/creator, redirect to student dashboard
      if (membership?.role !== 'admin' && membership?.role !== 'creator') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/student/dashboard'
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error('Admin auth check error:', error)
      // On error, redirect to student dashboard for safety
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/student/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // ============================================================================
  // 8. RETURN RESPONSE: With cookies and headers intact
  // ============================================================================
  return response
}

// ============================================================================
// MATCHER CONFIGURATION
// ============================================================================
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes - handled separately)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, manifest.json (special files)
     * - Files with extensions (images, css, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\..*)*)',
  ],
}
