import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // ১. পারফরম্যান্স অপ্টিমাইজেশন: Static files, API routes এবং RSC requests দ্রুত স্কিপ করুন
  // এটি ১০,০০০+ ইউজার হ্যান্ডেল করার সময় সার্ভারের লোড কমাবে
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    search.includes('_rsc=') // ⚡ RSC requests skip করুন (এটাই মূল fix)
  ) {
    return NextResponse.next()
  }

  // ২. সেশন আপডেট করা (Supabase Auth এর জন্য)
  let response = await updateSession(request)

  // ৩. কাস্টম হেডার সেট করা (যাতে Server Components ইউআরএল দেখতে পায়)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", pathname)

  // ৪. অ্যাডমিন রুট প্রোটেকশন
  if (pathname.startsWith('/admin')) {
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
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
      }

      // রোল চেক করার জন্য ডাটাবেস কল (এটি শুধুমাত্র /admin রুটে হবে)
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin' && profile?.role !== 'creator') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/student/dashboard'
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error('Middleware auth error:', error)
    }
  }

  return response
}

// ৫. গুরুত্বপূর্ণ: Matcher কনফিগারেশন
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
