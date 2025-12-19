import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Update session and get response
  const response = await updateSession(request)

  // ⚡ EDGE AUTH: Check admin routes before rendering
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Create Supabase client for auth check
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
          },
        },
      }
    )

    try {
      const { data: { user } } = await supabase.auth.getUser()

      // No user - let updateSession handle redirect (it already does this)
      if (!user) {
        return response
      }

      // Fetch user profile to check role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      // Not admin/creator - redirect to student dashboard
      if (profile?.role !== 'admin' && profile?.role !== 'creator') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/student/dashboard'
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      // On error, let updateSession handle it
      console.error('Middleware auth error:', error)
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
