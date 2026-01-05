import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * updateSession - Handles Supabase session refresh and auth redirects
 * 
 * CRITICAL: This function returns BOTH the response (with cookies) AND user data
 * to prevent creating multiple Supabase clients in the same request (cookie desync)
 * 
 * @param request - The incoming NextRequest
 * @param tenantId - Optional tenant ID for multi-tenant role checks
 * @returns Object with response (NextResponse with cookies) and user data
 */
export async function updateSession(
  request: NextRequest,
  tenantId?: string | null
): Promise<{
  response: NextResponse
  user: any | null
}> {
  // Initialize response - this will be updated with cookies
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // CRITICAL FIX: Do NOT create a new NextResponse here!
          // Just update the request cookies and set them on the existing response
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Get user and refresh session (triggers setAll if session needs refresh)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ============================================================================
  // PROTECTED ROUTES: Redirect non-logged-in users to login
  // ============================================================================
  // Public routes that don't require authentication:
  // - / (home)
  // - /courses, /test-series (public listings)
  // - /about, /contact (info pages)
  // - /privacy-policy, /terms-of-use, /refund-policy (legal pages)
  // - /api (API routes)
  // - /auth (login/signup pages)

  // DEBUG: Log user session status
  console.log('[MIDDLEWARE] Path:', request.nextUrl.pathname, 'User:', user ? 'LOGGED IN' : 'NOT LOGGED IN')

  if (
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/courses") &&
    !request.nextUrl.pathname.startsWith("/test-series") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/about") &&
    !request.nextUrl.pathname.startsWith("/contact") &&
    !request.nextUrl.pathname.startsWith("/privacy-policy") &&
    !request.nextUrl.pathname.startsWith("/terms-of-use") &&
    !request.nextUrl.pathname.startsWith("/refund-policy") &&
    !user &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // User is not logged in and trying to access protected route
    console.log('[MIDDLEWARE] Redirecting to login - no user session')
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search)
    return { response: NextResponse.redirect(url), user: null }
  }

  // ============================================================================
  // AUTH PAGE REDIRECT: Server-side redirect with cache control
  // ============================================================================
  // CRITICAL: We do this server-side to prevent flickering/double redirects
  // Cache-Control headers prevent browser from caching the redirect
  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone()

    if (!tenantId) {
      // If no tenant ID, can't check role - default to student dashboard
      url.pathname = "/student/dashboard"
      const redirectResponse = NextResponse.redirect(url)

      // CRITICAL: Prevent browser from caching this redirect
      redirectResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      redirectResponse.headers.set('Pragma', 'no-cache')
      redirectResponse.headers.set('Expires', '0')

      return { response: redirectResponse, user }
    }

    // Fetch user role from tenant memberships (tenant-aware)
    const { data: membership } = await supabase
      .from("user_tenant_memberships")
      .select("role")
      .eq("user_id", user.id)
      .eq("tenant_id", tenantId)
      .eq("is_active", true)
      .maybeSingle()

    // Redirect based on role
    if (membership?.role === "admin" || membership?.role === "creator") {
      url.pathname = "/admin/dashboard"
    } else {
      url.pathname = "/student/dashboard"
    }

    const redirectResponse = NextResponse.redirect(url)

    // CRITICAL: Prevent browser from caching this redirect
    redirectResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    redirectResponse.headers.set('Pragma', 'no-cache')
    redirectResponse.headers.set('Expires', '0')

    return { response: redirectResponse, user }
  }

  // Return response with cookies and user data
  return { response: supabaseResponse, user }
}
