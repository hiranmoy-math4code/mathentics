import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/courses") &&
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/about") && // Allow access to /about
    !request.nextUrl.pathname.startsWith("/contact") && // Allow access to /contact
    !request.nextUrl.pathname.startsWith("/privacy-policy") && // Allow access to /privacy-policy
    !request.nextUrl.pathname.startsWith("/terms-of-use") && // Allow access to /terms-of-use
    !request.nextUrl.pathname.startsWith("/refund-policy") && // Allow access to /refund-policy
    !user &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search)
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    // Fetch user role to redirect to appropriate dashboard
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const url = request.nextUrl.clone()
    if (profile?.role === "admin") {
      url.pathname = "/admin/dashboard"
    } else {
      // Default to student dashboard for all other cases
      url.pathname = "/student/dashboard"
    }
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
