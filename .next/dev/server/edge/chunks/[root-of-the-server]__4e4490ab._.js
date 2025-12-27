(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__4e4490ab._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/supabase/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateSession",
    ()=>updateSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
async function updateSession(request) {
    let supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request
    });
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://wzlcuzygjdzolcycogow.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bGN1enlnamR6b2xjeWNvZ293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDc4MzMsImV4cCI6MjA4MjMyMzgzM30.wnsco6-dlGl4c1qUClZRLTikScX29sC3F0iPLK99c38"), {
        cookies: {
            getAll () {
                return request.cookies.getAll();
            },
            setAll (cookiesToSet) {
                cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                supabaseResponse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request
                });
                cookiesToSet.forEach(({ name, value, options })=>supabaseResponse.cookies.set(name, value, options));
            }
        }
    });
    const { data: { user } } = await supabase.auth.getUser();
    if (request.nextUrl.pathname !== "/" && !request.nextUrl.pathname.startsWith("/courses") && !request.nextUrl.pathname.startsWith("/test-series") && !request.nextUrl.pathname.startsWith("/api") && !request.nextUrl.pathname.startsWith("/about") && // Allow access to /about
    !request.nextUrl.pathname.startsWith("/contact") && // Allow access to /contact
    !request.nextUrl.pathname.startsWith("/privacy-policy") && // Allow access to /privacy-policy
    !request.nextUrl.pathname.startsWith("/terms-of-use") && // Allow access to /terms-of-use
    !request.nextUrl.pathname.startsWith("/refund-policy") && // Allow access to /refund-policy
    !user && !request.nextUrl.pathname.startsWith("/auth")) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        url.searchParams.set("next", request.nextUrl.pathname + request.nextUrl.search);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    if (user && request.nextUrl.pathname.startsWith("/auth")) {
        // Fetch user role to redirect to appropriate dashboard
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        const url = request.nextUrl.clone();
        if (profile?.role === "admin") {
            url.pathname = "/admin/dashboard";
        } else {
            // Default to student dashboard for all other cases
            url.pathname = "/student/dashboard";
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(url);
    }
    return supabaseResponse;
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/middleware.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [middleware-edge] (ecmascript)");
;
;
;
async function middleware(request) {
    const { pathname, search } = request.nextUrl;
    // ১. পারফরম্যান্স অপ্টিমাইজেশন: Static files, API routes এবং RSC requests দ্রুত স্কিপ করুন
    // এটি ১০,০০০+ ইউজার হ্যান্ডেল করার সময় সার্ভারের লোড কমাবে
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.') || search.includes('_rsc=') // ⚡ RSC requests skip করুন (এটাই মূল fix)
    ) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // ২. সেশন আপডেট করা (Supabase Auth এর জন্য)
    let response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$middleware$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["updateSession"])(request);
    // ৩. কাস্টম হেডার সেট করা (যাতে Server Components ইউআরএল দেখতে পায়)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", pathname);
    // ৪. অ্যাডমিন রুট প্রোটেকশন
    if (pathname.startsWith('/admin')) {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://wzlcuzygjdzolcycogow.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bGN1enlnamR6b2xjeWNvZ293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDc4MzMsImV4cCI6MjA4MjMyMzgzM30.wnsco6-dlGl4c1qUClZRLTikScX29sC3F0iPLK99c38"), {
            cookies: {
                getAll () {
                    return request.cookies.getAll();
                },
                setAll (cookiesToSet) {
                    cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));
                }
            }
        });
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                const redirectUrl = request.nextUrl.clone();
                redirectUrl.pathname = '/login';
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
            }
            // রোল চেক করার জন্য ডাটাবেস কল (এটি শুধুমাত্র /admin রুটে হবে)
            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
            if (profile?.role !== 'admin' && profile?.role !== 'creator') {
                const redirectUrl = request.nextUrl.clone();
                redirectUrl.pathname = '/student/dashboard';
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
            }
        } catch (error) {
            console.error('Middleware auth error:', error);
        }
    }
    return response;
}
const config = {
    matcher: [
        /*
     * এই প্যাটার্নটি নিশ্চিত করে যে:
     * - api রুটগুলো মিডলওয়্যার দ্বারা ব্লক হবে না (POST 404 ফিক্স করবে)
     * - সব স্ট্যাটিক ফাইল (images, css) স্কিপ হবে
     */ '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|.*\\..*).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__4e4490ab._.js.map