(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
    "[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "createClient",
            () => createClient
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
        ;
        function createClient() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://wzlcuzygjdzolcycogow.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bGN1enlnamR6b2xjeWNvZ293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDc4MzMsImV4cCI6MjA4MjMyMzgzM30.wnsco6-dlGl4c1qUClZRLTikScX29sC3F0iPLK99c38"));
        }
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/SmartLink.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "SmartLink",
            () => SmartLink
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        'use client';
        ;
        ;
        ;
        function SmartLink({ href, prefetchQuery, queryKey, children, className, onClick }) {
            _s();
            const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            const prefetchedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
            const [isPending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
            const handlePrefetch = () => {
                // Prevent duplicate prefetches
                if (prefetchedRef.current) return;
                prefetchedRef.current = true;
                // If we have a query function, prefetch the data
                if (prefetchQuery && queryKey) {
                    queryClient.prefetchQuery({
                        queryKey,
                        queryFn: prefetchQuery,
                        staleTime: 1000 * 60 * 5
                    });
                }
                // Always prefetch the route for instant navigation
                router.prefetch(href);
            };
            const handleClick = (e) => {
                e.preventDefault();
                // Call custom onClick if provided (for things like closing mobile menu)
                if (onClick) {
                    onClick();
                }
                // List of routes that are handled by the SPA containers
                const spaRoutes = [
                    '/admin/dashboard',
                    '/admin/courses',
                    '/admin/test-series',
                    '/admin/question-bank',
                    '/admin/exams',
                    '/admin/payments',
                    '/admin/students',
                    '/admin/settings',
                    '/student/dashboard',
                    '/student/results',
                    '/student/rewards',
                    '/student/settings',
                    '/student/my-series',
                    '/student/my-courses',
                    '/student/all-courses',
                    '/student/all-test-series'
                ];
                const isExactSpaRoute = spaRoutes.includes(href);
                // ⚡ INSTANT STUDENT NAVIGATION: Use StudentAppContainer for exact SPA routes
                if (href.startsWith('/student/') && window.__studentNavigate && isExactSpaRoute) {
                    window.__studentNavigate(href);
                    return;
                }
                // ⚡ INSTANT ADMIN NAVIGATION: Use AdminAppContainer for exact SPA routes
                if (href.startsWith('/admin/') && window.__adminNavigate && isExactSpaRoute) {
                    window.__adminNavigate(href);
                    return;
                }
                // For all other routes (including dynamic routes), use router.push
                // Prefetching makes this fast
                startTransition(() => {
                    router.push(href);
                });
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: href,
                onClick: handleClick,
                onMouseEnter: handlePrefetch,
                onPointerDown: handlePrefetch,
                className: className,
                style: {
                    cursor: 'pointer'
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/components/SmartLink.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this);
        }
        _s(SmartLink, "EG6/jP2wGNfcg8oQKKFw5B8kQ/Q=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
            ];
        });
        _c = SmartLink;
        var _c;
        __turbopack_context__.k.register(_c, "SmartLink");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/context/CommunityModalContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "CommunityModalProvider",
            () => CommunityModalProvider,
            "useCommunityModal",
            () => useCommunityModal
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
        "use client";
        ;
        const CommunityModalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
        function CommunityModalProvider({ children }) {
            _s();
            const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
            const openCommunity = (opts = {}) => {
                setOptions(opts);
                setIsOpen(true);
            };
            const closeCommunity = () => {
                setIsOpen(false);
                // Reset options after a delay to avoid UI storage clearing while closing animation runs
                setTimeout(() => setOptions({}), 300);
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommunityModalContext.Provider, {
                value: {
                    isOpen,
                    openCommunity,
                    closeCommunity,
                    options
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/context/CommunityModalContext.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this);
        }
        _s(CommunityModalProvider, "BplJZMv5M0h/bM2UTAgT52vb2ng=");
        _c = CommunityModalProvider;
        function useCommunityModal() {
            _s1();
            const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CommunityModalContext);
            if (!context) {
                throw new Error('useCommunityModal must be used within CommunityModalProvider');
            }
            return context;
        }
        _s1(useCommunityModal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
        var _c;
        __turbopack_context__.k.register(_c, "CommunityModalProvider");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/admin/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "default",
            () => Sidebar
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-check.js [app-client] (ecmascript) <export default as BookCheck>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SmartLink.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CommunityModalContext.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        const iconMap = {
            dashboard: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            home: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
            book: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
            grid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"],
            settings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            question: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookCheck$3e$__["BookCheck"],
            layers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
            graduation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
            bookopen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
            trendingup: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            award: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
            payment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
            gift: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
            messagesquare: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
        };
        function Sidebar({ menuItems, sidebarCollapsed, setSidebarCollapsed, profile }) {
            _s();
            const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
            const [isMobileOpen, setIsMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [showControlMenu, setShowControlMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [expandMode, setExpandMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("expanded");
            const { openCommunity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommunityModal"])();
            // Lock scroll when mobile drawer is open
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "Sidebar.useEffect": () => {
                    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
                }
            }["Sidebar.useEffect"], [
                isMobileOpen
            ]);
            // Handle hover expansion mode
            const handleMouseEnter = () => {
                if (expandMode === "hover") setSidebarCollapsed(false);
            };
            const handleMouseLeave = () => {
                if (expandMode === "hover") setSidebarCollapsed(true);
            };
            const handleMenuItemClick = (item) => {
                if (item.onClick === "openCommunity") {
                    const isAdmin = profile?.role === 'admin' || profile?.role === 'creator';
                    openCommunity({
                        isAdmin
                    });
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    onMouseEnter: handleMouseEnter,
                    onMouseLeave: handleMouseLeave,
                    className: `hidden md:flex flex-col fixed left-0 top-0 h-screen p-4 
        bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800
        transition-all duration-500 z-40 
        ${sidebarCollapsed ? "w-20" : "w-64"}`,
                    children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex items-center gap-3 mb-8 transition-all duration-500 ${sidebarCollapsed ? "justify-center" : "px-2"}`,
                        children: [
                            sidebarCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartLink"], {
                                href: "/",
                                queryKey: [
                                    'route',
                                    '/'
                                ],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-lg overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/mathlogo.png",
                                        alt: "math4code",
                                        className: "w-full h-full object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartLink"], {
                                href: "/",
                                queryKey: [
                                    'route',
                                    '/'
                                ],
                                className: "flex items-center gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/mathlogo.png",
                                    alt: "math4code Academy",
                                    className: "h-10 w-auto object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 116,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    x: -10
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                transition: {
                                    delay: 0.1
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-500 dark:text-slate-400 font-medium",
                                    children: "Admin Workspace"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar py-2",
                        children: menuItems.map((it) => {
                            const Icon = iconMap[it.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"];
                            const isActive = pathname === it.href || pathname.startsWith(`${it.href}/`);
                            const hasOnClick = it.onClick === "openCommunity";
                            if (hasOnClick) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: () => handleMenuItemClick(it),
                                    className: `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden
                  ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"}`,
                                    children: [
                                        isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            layoutId: "activeTab",
                                            className: "absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 151,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: `w-5 h-5 min-w-[1.25rem] transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 156,
                                            columnNumber: 19
                                        }, this),
                                        !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            className: "text-sm font-medium truncate",
                                            children: it.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 159,
                                            columnNumber: 21
                                        }, this),
                                        sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50",
                                            children: it.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 170,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, it.label, true, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 141,
                                    columnNumber: 17
                                }, this);
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartLink"], {
                                href: it.href,
                                queryKey: it.prefetch ? [
                                    'route-data',
                                    it.href
                                ] : undefined,
                                prefetchQuery: it.prefetch,
                                className: `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden
                ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"}`,
                                children: [
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layoutId: "activeTab",
                                        className: "absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 191,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: `w-5 h-5 min-w-[1.25rem] transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this),
                                    !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        className: "text-sm font-medium truncate",
                                        children: it.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 199,
                                        columnNumber: 19
                                    }, this),
                                    sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50",
                                        children: it.label
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 210,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, it.label, true, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto pt-4 border-t border-slate-100 dark:border-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: () => setShowControlMenu((p) => !p),
                            className: `w-full flex items-center gap-3 py-2.5 px-3 rounded-xl 
            hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors
            ${sidebarCollapsed ? "justify-center" : ""}`,
                            children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "w-4 h-4 text-slate-600 dark:text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                                !sidebarCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 text-left",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-medium text-slate-700 dark:text-slate-200",
                                            children: "Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 234,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: `w-4 h-4 text-slate-400 transition-transform ${showControlMenu ? "rotate-180" : ""}`
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 238,
                                        columnNumber: 17
                                    }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: showControlMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.95
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1
                                },
                                exit: {
                                    opacity: 0,
                                    y: 10,
                                    scale: 0.95
                                },
                                transition: {
                                    duration: 0.2
                                },
                                className: `absolute bottom-20 ${sidebarCollapsed ? 'left-0 w-56' : 'left-4 right-4'} rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 overflow-hidden`,
                                children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-2 py-1.5 mb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
                                        children: "Sidebar Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 254,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 253,
                                    columnNumber: 17
                                }, this),
                                    [
                                        {
                                            key: "expanded",
                                            label: "Always Expanded"
                                        },
                                        {
                                            key: "collapsed",
                                            label: "Always Collapsed"
                                        },
                                        {
                                            key: "hover",
                                            label: "Expand on Hover"
                                        }
                                    ].map((mode) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: () => {
                                            setExpandMode(mode.key);
                                            setShowControlMenu(false);
                                            setSidebarCollapsed(mode.key === "collapsed");
                                        },
                                        className: `w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${expandMode === mode.key ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300" : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"}`,
                                        children: [
                                            mode.label,
                                            expandMode === mode.key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                                lineNumber: 278,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, mode.key, true, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 264,
                                        columnNumber: 19
                                    }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 246,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                    lineNumber: 98,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: () => setIsMobileOpen(true),
                    className: "fixed top-4 left-4 z-50 md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                    lineNumber: 289,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: isMobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            transition: {
                                duration: 0.2
                            },
                            className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 md:hidden",
                            onClick: () => setIsMobileOpen(false)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                            lineNumber: 301,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
                            initial: {
                                x: "-100%"
                            },
                            animate: {
                                x: 0
                            },
                            exit: {
                                x: "-100%"
                            },
                            transition: {
                                type: "spring",
                                damping: 25,
                                stiffness: 200
                            },
                            className: "fixed left-0 top-0 h-full w-80 z-50 bg-white dark:bg-slate-900 shadow-2xl flex flex-col md:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800",
                                children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/mathlogo.png",
                                        alt: "math4code Academy",
                                        className: "h-10 w-auto object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 321,
                                        columnNumber: 19
                                    }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500 dark:text-slate-400 font-medium",
                                            children: "Admin Panel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 323,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 322,
                                        columnNumber: 19
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 320,
                                    columnNumber: 17
                                }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: () => setIsMobileOpen(false),
                                    className: "p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 333,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 329,
                                    columnNumber: 17
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex-1 flex flex-col gap-1 p-4 overflow-y-auto",
                                children: menuItems.map((it) => {
                                    const Icon = iconMap[it.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"];
                                    const isActive = pathname === it.href || pathname.startsWith(`${it.href}/`);
                                    const hasOnClick = it.onClick === "openCommunity";
                                    if (hasOnClick) {
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: () => {
                                                handleMenuItemClick(it);
                                                setIsMobileOpen(false);
                                            },
                                            className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`,
                                            children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: `w-5 h-5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                                lineNumber: 358,
                                                columnNumber: 25
                                            }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm",
                                                children: it.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                                lineNumber: 359,
                                                columnNumber: 25
                                            }, this),
                                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, it.label, true, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 346,
                                            columnNumber: 23
                                        }, this);
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SmartLink$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmartLink"], {
                                        href: it.href,
                                        queryKey: it.prefetch ? [
                                            'route-data',
                                            it.href
                                        ] : undefined,
                                        prefetchQuery: it.prefetch,
                                        onClick: () => setIsMobileOpen(false),
                                        className: `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`,
                                        children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: `w-5 h-5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 382,
                                            columnNumber: 23
                                        }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: it.label
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                            lineNumber: 383,
                                            columnNumber: 23
                                        }, this),
                                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                                lineNumber: 387,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, it.label, true, {
                                        fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                        lineNumber: 370,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 338,
                                columnNumber: 15
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-t border-slate-100 dark:border-slate-800",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-center text-slate-400 dark:text-slate-500",
                                    children: "© 2025 math4code Academy. All rights reserved."
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                    lineNumber: 395,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                                lineNumber: 394,
                                columnNumber: 15
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/app/admin/components/layout/Sidebar.tsx",
                    lineNumber: 297,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true);
        }
        _s(Sidebar, "YedEyWGeQ/HrNj7ex2c4mckwB/8=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
                __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommunityModal"]
            ];
        });
        _c = Sidebar;
        var _c;
        __turbopack_context__.k.register(_c, "Sidebar");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/actions/data:eb12db [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
        "use strict";

/* __next_internal_action_entry_do_not_use__ [{"40d59f95dc89fd4dc26cbfaa1a6ee2c66ddc89d104":"getRewardStatus"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
            "getRewardStatus",
            () => getRewardStatus
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
        "use turbopack no side effects";
        ;
        var getRewardStatus = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40d59f95dc89fd4dc26cbfaa1a6ee2c66ddc89d104", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRewardStatus"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicVNBdUJzQiJ9
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/actions/data:b4dfac [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
        "use strict";

/* __next_internal_action_entry_do_not_use__ [{"409b6c9e7f7aeea92b23738c3b0bc90cec78ddfab0":"getDailyMissions"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
            "getDailyMissions",
            () => getDailyMissions
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
        "use turbopack no side effects";
        ;
        var getDailyMissions = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("409b6c9e7f7aeea92b23738c3b0bc90cec78ddfab0", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getDailyMissions"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1NBNk9zQiJ9
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/actions/data:50d26f [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
        "use strict";

/* __next_internal_action_entry_do_not_use__ [{"401af75fb501836c067ff5309414f33ff8ec6d523c":"getUserBadges"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
            "getUserBadges",
            () => getUserBadges
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
        "use turbopack no side effects";
        ;
        var getUserBadges = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("401af75fb501836c067ff5309414f33ff8ec6d523c", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUserBadges"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVNBb1RzQiJ9
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/actions/data:400330 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
        "use strict";

/* __next_internal_action_entry_do_not_use__ [{"606f53d15fe31c1858c290384edc7b7c0fb1e457e8":"getLeaderboard"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
            "getLeaderboard",
            () => getLeaderboard
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
        "use turbopack no side effects";
        ;
        var getLeaderboard = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("606f53d15fe31c1858c290384edc7b7c0fb1e457e8", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getLeaderboard"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoib1NBd0pzQiJ9
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/actions/data:879598 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
        "use strict";

/* __next_internal_action_entry_do_not_use__ [{"406ef9d617799bcd1e0cc901a06585cccfd9ea3b5e":"checkStreak"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
            "checkStreak",
            () => checkStreak
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
        "use turbopack no side effects";
        ;
        var checkStreak = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("406ef9d617799bcd1e0cc901a06585cccfd9ea3b5e", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkStreak"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiaVNBMkRzQiJ9
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/actions/data:1a3975 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
        "use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b0b14b03ca8c026611963a00d913cf1f9512bae9":"getStreakHistory"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
            "getStreakHistory",
            () => getStreakHistory
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
        "use turbopack no side effects";
        ;
        var getStreakHistory = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40b0b14b03ca8c026611963a00d913cf1f9512bae9", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getStreakHistory"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1NBNlRzQiJ9
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/useRewards.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "REWARD_KEYS",
            () => REWARD_KEYS,
            "useLeaderboard",
            () => useLeaderboard,
            "useRewards",
            () => useRewards,
            "useStreakHistory",
            () => useStreakHistory
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$eb12db__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:eb12db [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$b4dfac__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:b4dfac [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$50d26f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:50d26f [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$400330__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:400330 [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:bae3ba [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$879598__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:879598 [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$1a3975__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:1a3975 [app-client] (ecmascript) <text/javascript>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        const REWARD_KEYS = {
            all: [
                "rewards"
            ],
            status: (userId) => [
                ...REWARD_KEYS.all,
                "status",
                userId
            ],
            missions: (userId) => [
                ...REWARD_KEYS.all,
                "missions",
                userId
            ],
            badges: (userId) => [
                ...REWARD_KEYS.all,
                "badges",
                userId
            ],
            leaderboard: (type) => [
                ...REWARD_KEYS.all,
                "leaderboard",
                type
            ],
            transactions: (userId) => [
                ...REWARD_KEYS.all,
                "transactions",
                userId
            ],
            streakHistory: (userId) => [
                ...REWARD_KEYS.all,
                "streakHistory",
                userId
            ]
        };
        function useRewards(userId) {
            _s();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            // 1. Reward Status (Coins, Streak, XP)
            const { data: rewardStatus, isLoading: statusLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: REWARD_KEYS.status(userId || ""),
                queryFn: {
                    "useRewards.useQuery": () => userId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$eb12db__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRewardStatus"])(userId) : null
                }["useRewards.useQuery"],
                enabled: !!userId,
                staleTime: 1000 * 60 * 5
            });
            // 2. Daily Missions
            const { data: missions, isLoading: missionsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: REWARD_KEYS.missions(userId || ""),
                queryFn: {
                    "useRewards.useQuery": () => userId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$b4dfac__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getDailyMissions"])(userId) : []
                }["useRewards.useQuery"],
                enabled: !!userId,
                staleTime: 1000 * 60 * 60
            });
            // 3. User Badges
            const { data: badges, isLoading: badgesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: REWARD_KEYS.badges(userId || ""),
                queryFn: {
                    "useRewards.useQuery": () => userId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$50d26f__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserBadges"])(userId) : []
                }["useRewards.useQuery"],
                enabled: !!userId,
                staleTime: 1000 * 60 * 30
            });
            // 4. Transactions History
            const { data: transactions, isLoading: transactionsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: REWARD_KEYS.transactions(userId || ""),
                queryFn: {
                    "useRewards.useQuery": async () => {
                        if (!userId) return [];
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const { data } = await supabase.from("reward_transactions").select("*").eq("user_id", userId).order("created_at", {
                            ascending: false
                        }).limit(10);
                        return data || [];
                    }
                }["useRewards.useQuery"],
                enabled: !!userId
            });
            // Mutations
            // Award Coins
            const awardCoinsMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useRewards.useMutation[awardCoinsMutation]": async ({ action, entityId, description }) => {
                        if (!userId) throw new Error("User ID required");
                        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["awardCoins"])(userId, action, entityId, description);
                    }
                }["useRewards.useMutation[awardCoinsMutation]"],
                onSuccess: {
                    "useRewards.useMutation[awardCoinsMutation]": () => {
                        // Invalidate relevant queries to refresh data
                        if (userId) {
                            queryClient.invalidateQueries({
                                queryKey: REWARD_KEYS.status(userId)
                            });
                            queryClient.invalidateQueries({
                                queryKey: REWARD_KEYS.transactions(userId)
                            });
                            queryClient.invalidateQueries({
                                queryKey: REWARD_KEYS.leaderboard('weekly')
                            });
                            queryClient.invalidateQueries({
                                queryKey: REWARD_KEYS.leaderboard('all_time')
                            });
                        }
                    }
                }["useRewards.useMutation[awardCoinsMutation]"]
            });
            // Check Streak
            const checkStreakMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useRewards.useMutation[checkStreakMutation]": async () => {
                        if (!userId) throw new Error("User ID required");
                        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$879598__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkStreak"])(userId);
                    }
                }["useRewards.useMutation[checkStreakMutation]"],
                onSuccess: {
                    "useRewards.useMutation[checkStreakMutation]": () => {
                        if (userId) {
                            queryClient.invalidateQueries({
                                queryKey: REWARD_KEYS.status(userId)
                            });
                        }
                    }
                }["useRewards.useMutation[checkStreakMutation]"]
            });
            return {
                rewardStatus,
                statusLoading,
                missions,
                missionsLoading,
                badges,
                badgesLoading,
                transactions,
                transactionsLoading,
                awardCoins: awardCoinsMutation.mutateAsync,
                checkStreak: checkStreakMutation.mutateAsync
            };
        }
        _s(useRewards, "w5kWQxrpn/D9HFad+mWkQ/5xwNo=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        function useLeaderboard(type = 'weekly', limit = 10) {
            _s1();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    ...REWARD_KEYS.leaderboard(type),
                    limit
                ],
                queryFn: {
                    "useLeaderboard.useQuery": () => (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$400330__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getLeaderboard"])(type, limit)
                }["useLeaderboard.useQuery"],
                staleTime: 1000 * 60 * 5
            });
        }
        _s1(useLeaderboard, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        function useStreakHistory(userId) {
            _s2();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: REWARD_KEYS.streakHistory(userId),
                queryFn: {
                    "useStreakHistory.useQuery": () => (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$1a3975__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getStreakHistory"])(userId)
                }["useStreakHistory.useQuery"],
                enabled: !!userId
            });
        }
        _s2(useStreakHistory, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Tooltip",
            () => Tooltip,
            "TooltipContent",
            () => TooltipContent,
            "TooltipProvider",
            () => TooltipProvider,
            "TooltipTrigger",
            () => TooltipTrigger
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        function TooltipProvider({ delayDuration = 0, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
                "data-slot": "tooltip-provider",
                delayDuration: delayDuration,
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/tooltip.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, this);
        }
        _c = TooltipProvider;
        function Tooltip({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                    "data-slot": "tooltip",
                    ...props
                }, void 0, false, {
                    fileName: "[project]/components/ui/tooltip.tsx",
                    lineNumber: 26,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/tooltip.tsx",
                lineNumber: 25,
                columnNumber: 5
            }, this);
        }
        _c1 = Tooltip;
        function TooltipTrigger({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
                "data-slot": "tooltip-trigger",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/tooltip.tsx",
                lineNumber: 34,
                columnNumber: 10
            }, this);
        }
        _c2 = TooltipTrigger;
        function TooltipContent({ className, sideOffset = 0, children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    "data-slot": "tooltip-content",
                    sideOffset: sideOffset,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance', className),
                    ...props,
                    children: [
                        children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Arrow"], {
                            className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/tooltip.tsx",
                            lineNumber: 55,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/tooltip.tsx",
                    lineNumber: 45,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/tooltip.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, this);
        }
        _c3 = TooltipContent;
        ;
        var _c, _c1, _c2, _c3;
        __turbopack_context__.k.register(_c, "TooltipProvider");
        __turbopack_context__.k.register(_c1, "Tooltip");
        __turbopack_context__.k.register(_c2, "TooltipTrigger");
        __turbopack_context__.k.register(_c3, "TooltipContent");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Dialog",
            () => Dialog,
            "DialogClose",
            () => DialogClose,
            "DialogContent",
            () => DialogContent,
            "DialogDescription",
            () => DialogDescription,
            "DialogFooter",
            () => DialogFooter,
            "DialogHeader",
            () => DialogHeader,
            "DialogOverlay",
            () => DialogOverlay,
            "DialogPortal",
            () => DialogPortal,
            "DialogTitle",
            () => DialogTitle,
            "DialogTrigger",
            () => DialogTrigger
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        ;
        function Dialog({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "dialog",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 12,
                columnNumber: 10
            }, this);
        }
        _c = Dialog;
        function DialogTrigger({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
                "data-slot": "dialog-trigger",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 18,
                columnNumber: 10
            }, this);
        }
        _c1 = DialogTrigger;
        function DialogPortal({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
                "data-slot": "dialog-portal",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 24,
                columnNumber: 10
            }, this);
        }
        _c2 = DialogPortal;
        function DialogClose({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                "data-slot": "dialog-close",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 30,
                columnNumber: 10
            }, this);
        }
        _c3 = DialogClose;
        function DialogOverlay({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
                "data-slot": "dialog-overlay",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 38,
                columnNumber: 5
            }, this);
        }
        _c4 = DialogOverlay;
        function DialogContent({ className, children, showCloseButton = true, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
                "data-slot": "dialog-portal",
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                    fileName: "[project]/components/ui/dialog.tsx",
                    lineNumber: 59,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    "data-slot": "dialog-content",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                    ...props,
                    children: [
                        children,
                        showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                            "data-slot": "dialog-close",
                            className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/dialog.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/dialog.tsx",
                    lineNumber: 60,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 58,
                columnNumber: 5
            }, this);
        }
        _c5 = DialogContent;
        function DialogHeader({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "dialog-header",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 85,
                columnNumber: 5
            }, this);
        }
        _c6 = DialogHeader;
        function DialogFooter({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "dialog-footer",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 95,
                columnNumber: 5
            }, this);
        }
        _c7 = DialogFooter;
        function DialogTitle({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
                "data-slot": "dialog-title",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 111,
                columnNumber: 5
            }, this);
        }
        _c8 = DialogTitle;
        function DialogDescription({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
                "data-slot": "dialog-description",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/dialog.tsx",
                lineNumber: 124,
                columnNumber: 5
            }, this);
        }
        _c9 = DialogDescription;
        ;
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
        __turbopack_context__.k.register(_c, "Dialog");
        __turbopack_context__.k.register(_c1, "DialogTrigger");
        __turbopack_context__.k.register(_c2, "DialogPortal");
        __turbopack_context__.k.register(_c3, "DialogClose");
        __turbopack_context__.k.register(_c4, "DialogOverlay");
        __turbopack_context__.k.register(_c5, "DialogContent");
        __turbopack_context__.k.register(_c6, "DialogHeader");
        __turbopack_context__.k.register(_c7, "DialogFooter");
        __turbopack_context__.k.register(_c8, "DialogTitle");
        __turbopack_context__.k.register(_c9, "DialogDescription");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Avatar",
            () => Avatar,
            "AvatarFallback",
            () => AvatarFallback,
            "AvatarImage",
            () => AvatarImage
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        function Avatar({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "avatar",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex size-8 shrink-0 overflow-hidden rounded-full', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/avatar.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, this);
        }
        _c = Avatar;
        function AvatarImage({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                "data-slot": "avatar-image",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('aspect-square size-full', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/avatar.tsx",
                lineNumber: 29,
                columnNumber: 5
            }, this);
        }
        _c1 = AvatarImage;
        function AvatarFallback({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"], {
                "data-slot": "avatar-fallback",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted flex size-full items-center justify-center rounded-full', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/avatar.tsx",
                lineNumber: 42,
                columnNumber: 5
            }, this);
        }
        _c2 = AvatarFallback;
        ;
        var _c, _c1, _c2;
        __turbopack_context__.k.register(_c, "Avatar");
        __turbopack_context__.k.register(_c1, "AvatarImage");
        __turbopack_context__.k.register(_c2, "AvatarFallback");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "ScrollArea",
            () => ScrollArea,
            "ScrollBar",
            () => ScrollBar
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        function ScrollArea({ className, children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "scroll-area",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative', className),
                ...props,
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    "data-slot": "scroll-area-viewport",
                    className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/scroll-area.tsx",
                    lineNumber: 19,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                    fileName: "[project]/components/ui/scroll-area.tsx",
                    lineNumber: 25,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                    fileName: "[project]/components/ui/scroll-area.tsx",
                    lineNumber: 26,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 14,
                columnNumber: 5
            }, this);
        }
        _c = ScrollArea;
        function ScrollBar({ className, orientation = 'vertical', ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
                "data-slot": "scroll-area-scrollbar",
                orientation: orientation,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex touch-none p-px transition-colors select-none', orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent', orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent', className),
                ...props,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
                    "data-slot": "scroll-area-thumb",
                    className: "bg-border relative flex-1 rounded-full"
                }, void 0, false, {
                    fileName: "[project]/components/ui/scroll-area.tsx",
                    lineNumber: 50,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/scroll-area.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, this);
        }
        _c1 = ScrollBar;
        ;
        var _c, _c1;
        __turbopack_context__.k.register(_c, "ScrollArea");
        __turbopack_context__.k.register(_c1, "ScrollBar");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/RewardModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "RewardModal",
            () => RewardModal
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/scroll-area.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-client] (ecmascript) <export default as Coins>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hexagon.js [app-client] (ecmascript) <export default as Hexagon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-client] (ecmascript) <export default as Crown>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/medal.js [app-client] (ecmascript) <export default as Medal>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRewards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRewards.ts [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        function RewardModal({ isOpen, onClose, userRewards, userProfile }) {
            _s();
            const { data: leaderboardData, isLoading: loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRewards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeaderboard"])('all_time', 20);
            const leaderboard = leaderboardData || [];
            const getRankIcon = (index) => {
                switch (index) {
                    case 0:
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                            className: "w-5 h-5 text-yellow-500 fill-yellow-500"
                        }, void 0, false, {
                            fileName: "[project]/components/RewardModal.tsx",
                            lineNumber: 23,
                            columnNumber: 28
                        }, this);
                    case 1:
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__["Medal"], {
                            className: "w-5 h-5 text-slate-400 fill-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/components/RewardModal.tsx",
                            lineNumber: 24,
                            columnNumber: 28
                        }, this);
                    case 2:
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$medal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Medal$3e$__["Medal"], {
                            className: "w-5 h-5 text-amber-700 fill-amber-700"
                        }, void 0, false, {
                            fileName: "[project]/components/RewardModal.tsx",
                            lineNumber: 25,
                            columnNumber: 28
                        }, this);
                    default:
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-bold text-slate-500 w-5 text-center",
                            children: index + 1
                        }, void 0, false, {
                            fileName: "[project]/components/RewardModal.tsx",
                            lineNumber: 26,
                            columnNumber: 29
                        }, this);
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isOpen,
                onOpenChange: onClose,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-md md:max-w-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-0 overflow-hidden gap-0",
                    children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "sr-only",
                        children: "Rewards & Leaderboard"
                    }, void 0, false, {
                        fileName: "[project]/components/RewardModal.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid md:grid-cols-2 h-[600px] md:h-[500px]",
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-linear-to-br from-indigo-600 to-violet-700 p-6 text-white flex flex-col items-center justify-center relative overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[url('/grid.svg')] opacity-10"
                            }, void 0, false, {
                                fileName: "[project]/components/RewardModal.tsx",
                                lineNumber: 37,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"
                            }, void 0, false, {
                                fileName: "[project]/components/RewardModal.tsx",
                                lineNumber: 38,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16"
                            }, void 0, false, {
                                fileName: "[project]/components/RewardModal.tsx",
                                lineNumber: 39,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 flex flex-col items-center text-center space-y-4",
                                children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                        className: "w-24 h-24 border-4 border-white/20 shadow-xl",
                                        children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                            src: userProfile?.avatar_url
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 44,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                            className: "text-2xl font-bold bg-indigo-800 text-white",
                                            children: userProfile?.full_name?.[0] || "U"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 45,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 43,
                                        columnNumber: 33
                                    }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full border-2 border-indigo-600 shadow-lg flex items-center gap-1",
                                        children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 50,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Rank #",
                                                leaderboard.findIndex((u) => u.user_id === userRewards?.user_id) + 1 || "-"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 51,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 49,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardModal.tsx",
                                    lineNumber: 42,
                                    columnNumber: 29
                                }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold",
                                        children: userProfile?.full_name || "Learner"
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 56,
                                        columnNumber: 33
                                    }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-indigo-200 text-sm",
                                        children: "Keep pushing your limits!"
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 57,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardModal.tsx",
                                    lineNumber: 55,
                                    columnNumber: 29
                                }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-3 w-full mt-4",
                                    children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center border border-white/10",
                                        children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-yellow-400/20 p-2 rounded-full mb-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                className: "w-5 h-5 text-yellow-300"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 63,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 62,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg font-bold",
                                            children: userRewards?.total_coins || 0
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 65,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-indigo-200",
                                            children: "Coins"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 66,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 61,
                                        columnNumber: 33
                                    }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center border border-white/10",
                                        children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-orange-500/20 p-2 rounded-full mb-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                className: "w-5 h-5 text-orange-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 70,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 69,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg font-bold",
                                            children: userRewards?.current_streak || 0
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 72,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-indigo-200",
                                            children: "Streak"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 73,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 68,
                                        columnNumber: 33
                                    }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center border border-white/10",
                                        children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-purple-500/20 p-2 rounded-full mb-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__["Hexagon"], {
                                                className: "w-5 h-5 text-purple-300"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 77,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 76,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg font-bold",
                                            children: userRewards?.xp || 0
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 79,
                                            columnNumber: 37
                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-indigo-200",
                                            children: "XP"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 80,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 75,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/RewardModal.tsx",
                                lineNumber: 41,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RewardModal.tsx",
                            lineNumber: 36,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col h-full bg-slate-50 dark:bg-slate-900/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold flex items-center gap-2",
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                        className: "w-4 h-4 text-yellow-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 90,
                                        columnNumber: 33
                                    }, this),
                                        "Top Learners"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardModal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardModal.tsx",
                                lineNumber: 88,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                className: "flex-1 p-4",
                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5
                                    ].map((i) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-14 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"
                                    }, i, false, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 98,
                                        columnNumber: 41
                                    }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/RewardModal.tsx",
                                    lineNumber: 96,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: leaderboard.map((user, index) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: index * 0.05
                                        },
                                        className: `flex items-center gap-3 p-3 rounded-xl border transition-all ${user.user_id === userRewards?.user_id ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 shadow-sm" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`,
                                        children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 flex justify-center",
                                            children: getRankIcon(index)
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 114,
                                            columnNumber: 45
                                        }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                            className: "w-10 h-10 border border-slate-200 dark:border-slate-700",
                                            children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                src: user.profiles?.avatar_url
                                            }, void 0, false, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 118,
                                                columnNumber: 49
                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                className: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs",
                                                children: user.profiles?.full_name?.[0] || "U"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 119,
                                                columnNumber: 49
                                            }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 117,
                                            columnNumber: 45
                                        }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `text-sm font-medium truncate ${user.user_id === userRewards?.user_id ? "text-indigo-700 dark:text-indigo-300" : ""}`,
                                                children: user.profiles?.full_name || "Anonymous"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 124,
                                                columnNumber: 49
                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-xs text-slate-500",
                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-0.5",
                                                    children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                        className: "w-3 h-3 text-yellow-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/RewardModal.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 57
                                                    }, this),
                                                        " ",
                                                        user.total_coins
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/RewardModal.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 53
                                                }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-0.5",
                                                    children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__["Hexagon"], {
                                                        className: "w-3 h-3 text-purple-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/RewardModal.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 57
                                                    }, this),
                                                        " ",
                                                        user.xp || 0,
                                                        " XP"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/RewardModal.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 53
                                                }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RewardModal.tsx",
                                                lineNumber: 127,
                                                columnNumber: 49
                                            }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/RewardModal.tsx",
                                            lineNumber: 123,
                                            columnNumber: 45
                                        }, this)
                                        ]
                                    }, user.user_id, true, {
                                        fileName: "[project]/components/RewardModal.tsx",
                                        lineNumber: 104,
                                        columnNumber: 41
                                    }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/RewardModal.tsx",
                                    lineNumber: 102,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardModal.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RewardModal.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/RewardModal.tsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RewardModal.tsx",
                    lineNumber: 32,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/RewardModal.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this);
        }
        _s(RewardModal, "KRhdPrR7hbJdbS9M357dvemVu3o=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRewards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLeaderboard"]
            ];
        });
        _c = RewardModal;
        var _c;
        __turbopack_context__.k.register(_c, "RewardModal");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/RewardDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "RewardDisplay",
            () => RewardDisplay
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRewards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useRewards.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hexagon.js [app-client] (ecmascript) <export default as Hexagon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tooltip.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RewardModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RewardModal.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function RewardDisplay({ userId, userProfile }) {
            _s();
            const { rewardStatus: rewards } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRewards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRewards"])(userId);
            const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            // Fetch profile if not provided
            const { data: fetchedProfile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    'profile',
                    userId
                ],
                queryFn: {
                    "RewardDisplay.useQuery": async () => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
                        return data;
                    }
                }["RewardDisplay.useQuery"],
                enabled: !userProfile,
                staleTime: 1000 * 60 * 5
            });
            const profile = userProfile || fetchedProfile;
            if (!rewards) return null;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: () => setIsModalOpen(true),
                    className: "flex items-center gap-3 sm:gap-6 mr-4 cursor-pointer hover:opacity-90 transition-opacity",
                    children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                        className: "w-6 h-6 sm:w-7 sm:h-7 text-orange-400 fill-orange-400/20"
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardDisplay.tsx",
                                        lineNumber: 41,
                                        columnNumber: 33
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        mode: "popLayout",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            initial: {
                                                y: 10,
                                                opacity: 0
                                            },
                                            animate: {
                                                y: 0,
                                                opacity: 1
                                            },
                                            exit: {
                                                y: -10,
                                                opacity: 0
                                            },
                                            className: "text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200",
                                            children: rewards.total_coins
                                        }, rewards.total_coins, false, {
                                            fileName: "[project]/components/RewardDisplay.tsx",
                                            lineNumber: 43,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardDisplay.tsx",
                                        lineNumber: 42,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardDisplay.tsx",
                                    lineNumber: 40,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardDisplay.tsx",
                                lineNumber: 39,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Total Coins"
                                }, void 0, false, {
                                    fileName: "[project]/components/RewardDisplay.tsx",
                                    lineNumber: 55,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardDisplay.tsx",
                                lineNumber: 55,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RewardDisplay.tsx",
                            lineNumber: 38,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RewardDisplay.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex items-center gap-2",
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full ${rewards.current_streak > 0 ? "bg-orange-100 dark:bg-orange-900/30" : "bg-slate-200 dark:bg-slate-800"}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                            className: `w-4 h-4 sm:w-5 sm:h-5 ${rewards.current_streak > 0 ? "text-orange-500 fill-orange-500 animate-pulse" : "text-slate-400 fill-slate-400"}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardDisplay.tsx",
                                            lineNumber: 65,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardDisplay.tsx",
                                        lineNumber: 64,
                                        columnNumber: 33
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200",
                                        children: rewards.current_streak
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardDisplay.tsx",
                                        lineNumber: 67,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardDisplay.tsx",
                                    lineNumber: 63,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardDisplay.tsx",
                                lineNumber: 62,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Daily Streak"
                                }, void 0, false, {
                                    fileName: "[project]/components/RewardDisplay.tsx",
                                    lineNumber: 70,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardDisplay.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RewardDisplay.tsx",
                            lineNumber: 61,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RewardDisplay.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex items-center gap-2",
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8",
                                        children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__["Hexagon"], {
                                            className: "w-full h-full text-blue-200 dark:text-blue-900 fill-blue-100 dark:fill-blue-900/50"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardDisplay.tsx",
                                            lineNumber: 80,
                                            columnNumber: 37
                                        }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute text-[8px] sm:text-[10px] font-bold text-blue-600 dark:text-blue-400",
                                            children: "XP"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RewardDisplay.tsx",
                                            lineNumber: 81,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RewardDisplay.tsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200",
                                        children: rewards.xp || 0
                                    }, void 0, false, {
                                        fileName: "[project]/components/RewardDisplay.tsx",
                                        lineNumber: 83,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/RewardDisplay.tsx",
                                    lineNumber: 78,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardDisplay.tsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "XP Progress"
                                }, void 0, false, {
                                    fileName: "[project]/components/RewardDisplay.tsx",
                                    lineNumber: 86,
                                    columnNumber: 41
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/RewardDisplay.tsx",
                                lineNumber: 86,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RewardDisplay.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/RewardDisplay.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RewardDisplay.tsx",
                    lineNumber: 32,
                    columnNumber: 13
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RewardModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RewardModal"], {
                    isOpen: isModalOpen,
                    onClose: () => setIsModalOpen(false),
                    userRewards: rewards,
                    userProfile: profile
                }, void 0, false, {
                    fileName: "[project]/components/RewardDisplay.tsx",
                    lineNumber: 91,
                    columnNumber: 13
                }, this)
                ]
            }, void 0, true);
        }
        _s(RewardDisplay, "YfQiO5AYeRQq9YpkPEMNr5KxU4s=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useRewards$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRewards"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        _c = RewardDisplay;
        var _c;
        __turbopack_context__.k.register(_c, "RewardDisplay");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/useNotifications.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useNotifications",
            () => useNotifications
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useNotifications = (userId) => {
            _s();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            const { data: notifications = [], isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    "notifications",
                    userId
                ],
                queryFn: {
                    "useNotifications.useQuery": async () => {
                        if (!userId) return [];
                        const { data, error } = await supabase.from("notifications").select("*").eq("user_id", userId).order("created_at", {
                            ascending: false
                        }).limit(50); // Limit to last 50 notifications
                        if (error) {
                            throw error;
                        }
                        return data;
                    }
                }["useNotifications.useQuery"],
                enabled: !!userId,
                // Refetch every minute to keep fresh
                refetchInterval: 60000
            });
            const unreadCount = notifications.filter((n) => !n.is_read).length;
            const markAsReadMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useNotifications.useMutation[markAsReadMutation]": async (notificationId) => {
                        const { error } = await supabase.from("notifications").update({
                            is_read: true
                        }).eq("id", notificationId);
                        if (error) throw error;
                    }
                }["useNotifications.useMutation[markAsReadMutation]"],
                onSuccess: {
                    "useNotifications.useMutation[markAsReadMutation]": () => {
                        queryClient.invalidateQueries({
                            queryKey: [
                                "notifications",
                                userId
                            ]
                        });
                    }
                }["useNotifications.useMutation[markAsReadMutation]"],
                onError: {
                    "useNotifications.useMutation[markAsReadMutation]": () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update notification");
                    }
                }["useNotifications.useMutation[markAsReadMutation]"]
            });
            const markAllAsReadMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useNotifications.useMutation[markAllAsReadMutation]": async () => {
                        if (!userId) return;
                        const { error } = await supabase.from("notifications").update({
                            is_read: true
                        }).eq("user_id", userId).eq("is_read", false);
                        if (error) throw error;
                    }
                }["useNotifications.useMutation[markAllAsReadMutation]"],
                onSuccess: {
                    "useNotifications.useMutation[markAllAsReadMutation]": () => {
                        queryClient.invalidateQueries({
                            queryKey: [
                                "notifications",
                                userId
                            ]
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("All notifications marked as read");
                    }
                }["useNotifications.useMutation[markAllAsReadMutation]"],
                onError: {
                    "useNotifications.useMutation[markAllAsReadMutation]": () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to mark all as read");
                    }
                }["useNotifications.useMutation[markAllAsReadMutation]"]
            });
            // Real-time subscription
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "useNotifications.useEffect": () => {
                    if (!userId) return;
                    const channel = supabase.channel(`notifications-${userId}`).on("postgres_changes", {
                        event: "INSERT",
                        schema: "public",
                        table: "notifications",
                        filter: `user_id=eq.${userId}`
                    }, {
                        "useNotifications.useEffect.channel": (payload) => {
                            const newNotification = payload.new;
                            // 1. Invalidate query to refresh list
                            queryClient.invalidateQueries({
                                queryKey: [
                                    "notifications",
                                    userId
                                ]
                            });
                            // 2. Show Toast (Show this FIRST so it's visible even if audio fails)
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(newNotification.title, {
                                description: newNotification.message,
                                action: newNotification.link ? {
                                    label: "View",
                                    onClick: ({
                                        "useNotifications.useEffect.channel": () => window.location.href = newNotification.link
                                    })["useNotifications.useEffect.channel"]
                                } : undefined
                            });
                            // 3. Play Sound
                            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
                            audio.play().catch({
                                "useNotifications.useEffect.channel": () => {
                                    // Silently fail - audio is not critical
                                }
                            }["useNotifications.useEffect.channel"]);
                        }
                    }["useNotifications.useEffect.channel"]).subscribe();
                    return ({
                        "useNotifications.useEffect": () => {
                            supabase.removeChannel(channel);
                        }
                    })["useNotifications.useEffect"];
                }
            }["useNotifications.useEffect"], [
                userId,
                queryClient
            ]);
            return {
                notifications,
                isLoading,
                unreadCount,
                markAsRead: markAsReadMutation.mutate,
                markAllAsRead: markAllAsReadMutation.mutate
            };
        };
        _s(useNotifications, "Ma7iLeUusoiGVkepqhMLYLQGj4g=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/admin/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "default",
            () => Header
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RewardDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RewardDisplay.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNotifications.ts [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function Header({ theme, toggleTheme, sidebarCollapsed, profile, setSidebarCollapsed }) {
            _s();
            const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
            const [openProfile, setOpenProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [openNotif, setOpenNotif] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [expandedNotifId, setExpandedNotifId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
            const { notifications, unreadCount, markAsRead, markAllAsRead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"])(profile?.id);
            const profileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
            const notifRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
            // Close dropdowns when clicking outside
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "Header.useEffect": () => {
                    const handleClickOutside = {
                        "Header.useEffect.handleClickOutside": (e) => {
                            const target = e.target;
                            if (!target) return;
                            if (profileRef.current && !profileRef.current.contains(target)) {
                                setOpenProfile(false);
                            }
                            if (notifRef.current && !notifRef.current.contains(target)) {
                                setOpenNotif(false);
                            }
                        }
                    }["Header.useEffect.handleClickOutside"];
                    document.addEventListener("mousedown", handleClickOutside);
                    return ({
                        "Header.useEffect": () => document.removeEventListener("mousedown", handleClickOutside)
                    })["Header.useEffect"];
                }
            }["Header.useEffect"], []);
            const handleLogout = async () => {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                await supabase.auth.signOut();
                // Force a hard alignment to the login page to clear all React/Query state
                window.location.href = "/auth/login";
            };
            const handleNotificationClick = (id, isRead) => {
                // Toggle expansion
                if (expandedNotifId === id) {
                    setExpandedNotifId(null);
                } else {
                    setExpandedNotifId(id);
                    // Mark as read if not already
                    if (!isRead) {
                        markAsRead(id);
                    }
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: `fixed top-0 right-0 h-16 z-30 flex items-center justify-between px-4 md:px-8 transition-all duration-300
      ${sidebarCollapsed ? "md:left-20" : "md:left-64"} left-0
      bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm`,
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4 ml-12 md:ml-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:flex items-center relative",
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Search...",
                            className: "h-10 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500/20 w-64 text-sm transition-all"
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-medium text-slate-400 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-0.5",
                                children: "⌘K"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 md:gap-4",
                    children: [
                        profile?.id && profile?.role === "student" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RewardDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RewardDisplay"], {
                            userId: profile.id,
                            userProfile: profile
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 115,
                            columnNumber: 56
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleTheme,
                            className: "p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400",
                            children: theme === "light" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 122,
                                columnNumber: 32
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 122,
                                columnNumber: 63
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 118,
                            columnNumber: 9
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: notifRef,
                            className: "relative",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: () => setOpenNotif(!openNotif),
                                className: "relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, this),
                                    unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: openNotif && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.95
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    className: "absolute right-0 top-14 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden origin-top-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between",
                                        children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-slate-900 dark:text-white",
                                            children: "Notifications"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 149,
                                            columnNumber: 19
                                        }, this),
                                            unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: () => markAllAsRead(),
                                                className: "text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline",
                                                children: "Mark all as read"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-h-[400px] overflow-y-auto custom-scrollbar",
                                        children: notifications.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-8 text-center text-slate-500 dark:text-slate-400",
                                            children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                className: "w-8 h-8 mx-auto mb-2 opacity-20"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 162,
                                                columnNumber: 23
                                            }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No notifications yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 163,
                                                columnNumber: 23
                                            }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 161,
                                            columnNumber: 21
                                        }, this) : notifications.map((notif) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: () => handleNotificationClick(notif.id, notif.is_read),
                                            className: `p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer
                          ${!notif.is_read ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                            ${notif.type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : notif.type === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : notif.type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-100 text-slate-600'}`,
                                                    children: notif.type === 'success' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 57
                                                    }, this) : notif.type === 'warning' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 58
                                                    }, this) : notif.type === 'error' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 58
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 35
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 27
                                                }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-start",
                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: `text-sm font-medium ${!notif.is_read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`,
                                                            children: notif.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 31
                                                        }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-400 whitespace-nowrap ml-2",
                                                            children: new Date(notif.created_at).toLocaleDateString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 31
                                                        }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 29
                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1",
                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `text-xs text-slate-500 dark:text-slate-400 transition-all duration-300 ${expandedNotifId === notif.id ? '' : 'line-clamp-2'}`,
                                                            children: notif.message
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 31
                                                        }, this),
                                                            expandedNotifId === notif.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-indigo-500 font-medium mt-1 block",
                                                                children: "Show less"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 33
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 29
                                                    }, this),
                                                        notif.link && expandedNotifId === notif.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: (e) => {
                                                                e.stopPropagation();
                                                                router.push(notif.link);
                                                                setOpenNotif(false);
                                                            },
                                                            className: "mt-2 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors",
                                                            children: "View Details →"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 27
                                                }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 173,
                                                columnNumber: 25
                                            }, this)
                                        }, notif.id, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 167,
                                            columnNumber: 23
                                        }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 border-t border-slate-100 dark:border-slate-800 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors",
                                            children: "View All Notifications"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 228,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                                    lineNumber: 141,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 126,
                            columnNumber: 9
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: profileRef,
                            className: "relative ml-2",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: () => setOpenProfile(!openProfile),
                                className: "flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700",
                                children: [
                                    profile?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: profile.avatar_url,
                                        alt: profile?.full_name || "Profile",
                                        width: 32,
                                        height: 32,
                                        className: "w-8 h-8 rounded-full object-cover shadow-md",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md",
                                        children: profile?.full_name?.[0] || "A"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:block text-left mr-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-slate-700 dark:text-slate-200 leading-none",
                                            children: profile?.full_name || "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-slate-500 dark:text-slate-400 mt-1",
                                            children: profile?.role || "Administrator"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 257,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronDown, {
                                        className: "w-4 h-4 text-slate-400 hidden md:block"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: openProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.95
                                    },
                                    transition: {
                                        duration: 0.2
                                    },
                                    className: "absolute right-0 top-14 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden origin-top-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 border-b border-slate-100 dark:border-slate-800",
                                        children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-slate-900 dark:text-white",
                                            children: profile?.full_name
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 278,
                                            columnNumber: 19
                                        }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500 dark:text-slate-400 truncate",
                                            children: profile?.email
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 279,
                                            columnNumber: 19
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2",
                                        children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: () => {
                                                const profilePath = profile?.role === 'student' ? '/student/settings' : '/admin/profile';
                                                router.push(profilePath);
                                                setOpenProfile(false);
                                            },
                                            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                            children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 290,
                                                columnNumber: 21
                                            }, this),
                                                " Profile"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19
                                        }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: () => {
                                                const settingsPath = profile?.role === 'student' ? '/student/settings' : '/admin/settings';
                                                router.push(settingsPath);
                                                setOpenProfile(false);
                                            },
                                            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                            children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 300,
                                                columnNumber: 21
                                            }, this),
                                                " Settings"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 281,
                                        columnNumber: 17
                                    }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 border-t border-slate-100 dark:border-slate-800",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleLogout,
                                            className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors",
                                            children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                                lineNumber: 308,
                                                columnNumber: 21
                                            }, this),
                                                " Sign Out"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                                            lineNumber: 304,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/Header.tsx",
                                        lineNumber: 303,
                                        columnNumber: 17
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/Header.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/components/layout/Header.tsx",
                            lineNumber: 238,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                    lineNumber: 113,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/components/layout/Header.tsx",
                lineNumber: 90,
                columnNumber: 5
            }, this);
        }
        _s(Header, "lNMuk2hLR0v5EkIvmyUydyfxpSU=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNotifications$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNotifications"]
            ];
        });
        _c = Header;
        function ChevronDown({ className }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: className,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m6 9 6 6 6-6"
                }, void 0, false, {
                    fileName: "[project]/app/admin/components/layout/Header.tsx",
                    lineNumber: 334,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/components/layout/Header.tsx",
                lineNumber: 322,
                columnNumber: 5
            }, this);
        }
        _c1 = ChevronDown;
        var _c, _c1;
        __turbopack_context__.k.register(_c, "Header");
        __turbopack_context__.k.register(_c1, "ChevronDown");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/admin/components/layout/MobileNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "default",
            () => MobileNav
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-check.js [app-client] (ecmascript) <export default as BookCheck>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CommunityModalContext.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        const iconMap = {
            dashboard: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
            user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            home: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
            book: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
            grid: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"],
            settings: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
            question: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookCheck$3e$__["BookCheck"],
            layers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
            graduation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
            bookopen: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
            trendingup: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            award: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
            payment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
            gift: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
            messagesquare: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
        };
        function MobileNav({ theme, toggleTheme, links, profile }) {
            _s();
            const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
            const { openCommunity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommunityModal"])();
            // Filter links for mobile if needed, or use all. 
            // Typically bottom nav has 4-5 items. 
            // If many items, maybe show first 4 and a "More" or just scroll?
            // User asked for "same as app". App has Home, Library, Community, Account.
            // The links prop passed from StudentLayout has: Dashboard, My Courses, All Courses, Community, My Series, Result, Rewards, All Series, Settings.
            // That's too many for a bottom bar.
            // I should filter for the main ones that match the app.
            const appTabs = [
                "Dashboard",
                "My Courses",
                "All Series",
                "Community",
                "Settings"
            ];
            // Dynamic filtering:
            const navItems = links?.filter((link) => appTabs.includes(link.label)) || [];
            // Fallback to ensure we have at least these if links are missing/renamed
            // But wait, "My Courses" in links has label "My Courses".
            // "Settings" has label "Settings".
            // "Community" has label "Community".
            // "Dashboard" has label "Dashboard".
            const handleItemClick = (item) => {
                if (item.onClick === "openCommunity") {
                    const isAdmin = profile?.role === 'admin' || profile?.role === 'creator';
                    openCommunity({
                        isAdmin
                    });
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex items-center justify-around w-full h-16",
                    children: navItems.map((item) => {
                        const Icon = iconMap[item.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"];
                        const isActive = pathname === item.href || item.href !== '#' && pathname.startsWith(item.href);
                        const isCommunity = item.label === "Community";
                        const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center w-full h-full gap-1",
                            children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: `w-6 h-6 transition-all duration-300 ${isActive || isCommunity && false // Community doesn't have active route usually
                                        ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                                    lineNumber: 93,
                                    columnNumber: 17
                                }, this),
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layoutId: "mobileNavDot",
                                        className: "absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                                        lineNumber: 100,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[10px] font-medium transition-colors duration-300 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`,
                                children: item.label === "My Courses" ? "Library" : item.label === "Dashboard" ? "Home" : item.label === "Settings" ? "Account" : item.label
                            }, void 0, false, {
                                fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this);
                        if (item.onClick === "openCommunity") {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: () => handleItemClick(item),
                                className: "flex-1 h-full",
                                children: content
                            }, item.label, false, {
                                fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this);
                        }
                        // Use SPA navigation for student routes
                        const isStudentRoute = item.href.startsWith('/student');
                        if (isStudentRoute) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: () => {
                                    if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.__studentNavigate) {
                                        window.__studentNavigate(item.href);
                                    } else {
                                        window.location.href = item.href;
                                    }
                                },
                                className: "flex-1 h-full flex",
                                children: content
                            }, item.label, false, {
                                fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this);
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            className: "flex-1 h-full flex",
                            children: content
                        }, item.label, false, {
                            fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                    lineNumber: 84,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/admin/components/layout/MobileNav.tsx",
                lineNumber: 83,
                columnNumber: 5
            }, this);
        }
        _s(MobileNav, "DUrAyqKf7KsmNwuGkOOB9KpZUNo=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
                __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommunityModal"]
            ];
        });
        _c = MobileNav;
        var _c;
        __turbopack_context__.k.register(_c, "MobileNav");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Button",
            () => Button,
            "buttonVariants",
            () => buttonVariants
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        ;
        ;
        ;
        ;
        const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
            variants: {
                variant: {
                    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                    destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                    outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                    ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
                    link: 'text-primary underline-offset-4 hover:underline'
                },
                size: {
                    default: 'h-9 px-4 py-2 has-[>svg]:px-3',
                    sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                    lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                    icon: 'size-9',
                    'icon-sm': 'size-8',
                    'icon-lg': 'size-10'
                }
            },
            defaultVariants: {
                variant: 'default',
                size: 'default'
            }
        });
        function Button({ className, variant, size, asChild = false, ...props }) {
            const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
                "data-slot": "button",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
                    variant,
                    size,
                    className
                })),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/button.tsx",
                lineNumber: 52,
                columnNumber: 5
            }, this);
        }
        _c = Button;
        ;
        var _c;
        __turbopack_context__.k.register(_c, "Button");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/CourseThumbnail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "CourseThumbnail",
            () => CourseThumbnail
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        ;
        ;
        ;
        function CourseThumbnail({ src, title, category, className, priority = false, variant = "default" }) {
            const isCard = variant === "card";
            // Base classes that apply to both
            const baseClasses = "relative overflow-hidden bg-slate-100 dark:bg-slate-800";
            // Default variant specific classes (standalone card look)
            const defaultClasses = "aspect-video rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1";
            // Card variant specific classes (fills parent, no external styles)
            const cardClasses = "w-full h-full";
            // Check if we have a valid thumbnail URL (not null, empty, or the string "NULL")
            const hasValidThumbnail = src && src !== 'NULL' && src !== 'null' && src.trim() !== '';
            // If valid thumbnail exists, show it normally
            if (hasValidThumbnail) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(baseClasses, isCard ? cardClasses : defaultClasses, className),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: src,
                        alt: title,
                        fill: true,
                        className: "object-cover transition-transform duration-300 hover:scale-105",
                        priority: priority
                    }, void 0, false, {
                        fileName: "[project]/components/ui/CourseThumbnail.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                    lineNumber: 40,
                    columnNumber: 13
                }, this);
            }
            // Gradient Based on Title Hash
            const gradients = [
                "from-indigo-500 via-blue-600 to-sky-700",
                "from-emerald-400 via-green-600 to-teal-700",
                "from-orange-400 via-red-500 to-rose-600",
                "from-fuchsia-500 via-purple-600 to-indigo-700",
                "from-cyan-400 via-blue-600 to-slate-700"
            ];
            const safeTitle = title || "Untitled Course";
            const hash = [
                ...safeTitle
            ].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
            const gradientIndex = hash % gradients.length;
            const selectedGradient = gradients[gradientIndex];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden bg-linear-to-br", selectedGradient, isCard ? "w-full h-full" : "w-full aspect-video rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1", className),
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute -top-20 -left-20 w-48 h-48 bg-white/10 blur-3xl rounded-full pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                    lineNumber: 83,
                    columnNumber: 13
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-[-80px] right-[-40px] w-64 h-64 bg-black/20 blur-3xl rounded-full pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                    lineNumber: 84,
                    columnNumber: 13
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 opacity-10 pointer-events-none",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "100%",
                        height: "100%",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                id: "grid",
                                width: "40",
                                height: "40",
                                patternUnits: "userSpaceOnUse",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M 40 0 L 0 0 0 40",
                                    fill: "none",
                                    stroke: "white",
                                    strokeWidth: "1"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                                    lineNumber: 91,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/CourseThumbnail.tsx",
                                lineNumber: 90,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 89,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            width: "100%",
                            height: "100%",
                            fill: "url(#grid)"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "80%",
                            cy: "20%",
                            r: "100",
                            fill: "white",
                            fillOpacity: "0.1"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 95,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "10%",
                            cy: "90%",
                            r: "60",
                            fill: "white",
                            fillOpacity: "0.1"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/CourseThumbnail.tsx",
                        lineNumber: 88,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                    lineNumber: 87,
                    columnNumber: 13
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 opacity-15",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "100%",
                        height: "100%",
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                id: "pattern",
                                width: "36",
                                height: "36",
                                patternUnits: "userSpaceOnUse",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M 36 0 L 0 0 0 36",
                                    fill: "none",
                                    stroke: "white",
                                    strokeWidth: "0.8"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                                    lineNumber: 105,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ui/CourseThumbnail.tsx",
                                lineNumber: 104,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 103,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                            width: "100%",
                            height: "100%",
                            fill: "url(#pattern)"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 108,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/CourseThumbnail.tsx",
                        lineNumber: 102,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                    lineNumber: 101,
                    columnNumber: 13
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-[12px] rounded-2xl bg-white/10 backdrop-blur-lg flex flex-col justify-between p-4",
                    children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between",
                        children: [
                            category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-white/90 text-[10px] tracking-widest uppercase rounded-full px-2 py-1 bg-white/15 backdrop-blur-sm",
                                children: category
                            }, void 0, false, {
                                fileName: "[project]/components/ui/CourseThumbnail.tsx",
                                lineNumber: 118,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2.5 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-white font-extrabold text-xs tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]",
                                children: "math4code"
                            }, void 0, false, {
                                fileName: "[project]/components/ui/CourseThumbnail.tsx",
                                lineNumber: 124,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/CourseThumbnail.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg md:text-xl font-bold text-white leading-tight line-clamp-3 drop-shadow-md",
                            children: safeTitle
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 131,
                            columnNumber: 21
                        }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-5xl text-white/20 font-serif italic select-none",
                            children: "∫"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/CourseThumbnail.tsx",
                            lineNumber: 135,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/CourseThumbnail.tsx",
                        lineNumber: 130,
                        columnNumber: 17
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/CourseThumbnail.tsx",
                    lineNumber: 113,
                    columnNumber: 13
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/CourseThumbnail.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this);
        }
        _c = CourseThumbnail;
        var _c;
        __turbopack_context__.k.register(_c, "CourseThumbnail");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useMessages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useChannelMessages",
            () => useChannelMessages
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useChannelMessages = (channelId) => {
            _s();
            const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
                queryKey: [
                    "community",
                    "messages",
                    channelId
                ],
                queryFn: {
                    "useChannelMessages.useInfiniteQuery[query]": async ({ pageParam = 0 }) => {
                        const pageSize = 20; // Reduced from 50 for performance
                        const start = pageParam * pageSize;
                        const end = start + pageSize - 1;
                        const { data, error } = await supabase.from("community_messages").select(`
          id,
          content,
          created_at,
          user_id,
          channel_id,
          attachments,
          is_pinned,
          is_announcement,
          parent_message_id,
          profiles:user_id (
            full_name,
            avatar_url,
            role
          ),
          community_reactions!message_id (
            id,
            emoji,
            user_id
          ),
          community_bookmarks!message_id (
            id,
            user_id
          )
        `).eq("channel_id", channelId).order("created_at", {
                            ascending: false
                        }).range(start, end);
                        if (error) {
                            throw error;
                        }
                        return data;
                    }
                }["useChannelMessages.useInfiniteQuery[query]"],
                initialPageParam: 0,
                getNextPageParam: {
                    "useChannelMessages.useInfiniteQuery[query]": (lastPage, allPages) => {
                        return lastPage.length === 20 ? allPages.length : undefined;
                    }
                }["useChannelMessages.useInfiniteQuery[query]"],
                enabled: !!channelId,
                staleTime: 1000 * 60,
                gcTime: 1000 * 60 * 30,
                refetchOnWindowFocus: false
            });
            // Real-time subscription
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "useChannelMessages.useEffect": () => {
                    if (!channelId) return;
                    const channel = supabase.channel(`community_messages:${channelId}`).on("postgres_changes", {
                        event: "INSERT",
                        schema: "public",
                        table: "community_messages",
                        filter: `channel_id=eq.${channelId}`
                    }, {
                        "useChannelMessages.useEffect.channel": async (payload) => {
                            // Fetch the complete message with profile
                            const { data: newMessage, error } = await supabase.from("community_messages").select(`
                id,
                content,
                created_at,
                user_id,
                channel_id,
                attachments,
                is_pinned,
                is_announcement,
                parent_message_id,
                profiles:user_id (
                    full_name,
                    avatar_url,
                    role
                ),
                community_reactions!message_id (
                    id,
                    emoji,
                    user_id
                )
            `).eq("id", payload.new.id).single();
                            if (error) {
                                return;
                            }
                            if (newMessage) {
                                queryClient.setQueryData([
                                    "community",
                                    "messages",
                                    channelId
                                ], {
                                    "useChannelMessages.useEffect.channel": (old) => {
                                        if (!old) return {
                                            pages: [
                                                [
                                                    newMessage
                                                ]
                                            ],
                                            pageParams: [
                                                0
                                            ]
                                        };
                                        // Check if message already exists (optimistic update)
                                        const exists = old.pages[0].some({
                                            "useChannelMessages.useEffect.channel.exists": (m) => m.id === newMessage.id || m.id.startsWith('temp-') && m.content === newMessage.content && m.user_id === newMessage.user_id
                                        }["useChannelMessages.useEffect.channel.exists"]);
                                        if (exists) {
                                            return old;
                                        }
                                        const newPages = [
                                            ...old.pages
                                        ];
                                        newPages[0] = [
                                            newMessage,
                                            ...newPages[0]
                                        ];
                                        return {
                                            ...old,
                                            pages: newPages
                                        };
                                    }
                                }["useChannelMessages.useEffect.channel"]);
                            }
                        }
                    }["useChannelMessages.useEffect.channel"]).subscribe();
                    return ({
                        "useChannelMessages.useEffect": () => {
                            supabase.removeChannel(channel);
                        }
                    })["useChannelMessages.useEffect"];
                }
            }["useChannelMessages.useEffect"], [
                channelId,
                queryClient
            ]);
            return query;
        };
        _s(useChannelMessages, "mZHVrTk/D5FOt7OUb+e6Zx+xgoc=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useChannels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useChannels",
            () => useChannels
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useChannels = (courseId) => {
            _s();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    "community",
                    "channels",
                    courseId
                ],
                queryFn: {
                    "useChannels.useQuery": async () => {
                        // Use the Optimized RPC for fast loading
                        const { data, error } = await supabase.rpc('get_channels_with_meta', {
                            target_course_id: courseId
                        });
                        if (error) {
                            throw error;
                        }
                        return data;
                    }
                }["useChannels.useQuery"],
                enabled: !!courseId
            });
        };
        _s(useChannels, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useEnrolledCourses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useEnrolledCourses",
            () => useEnrolledCourses
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useEnrolledCourses = (userId) => {
            _s();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    "enrolled-courses",
                    userId
                ],
                queryFn: {
                    "useEnrolledCourses.useQuery": async () => {
                        if (!userId) throw new Error("User ID is required");
                        // Fetch enrollments with course details
                        const { data: enrollments, error: enrollmentsError } = await supabase.from("enrollments").select(`
          course_id,
          courses (
            id,
            title,
            thumbnail_url,
            community_enabled
          )
        `).eq("user_id", userId);
                        if (enrollmentsError) throw enrollmentsError;
                        // Filter courses with community enabled
                        const coursesWithCommunity = enrollments?.map({
                            "useEnrolledCourses.useQuery": (e) => e.courses
                        }["useEnrolledCourses.useQuery"]).filter({
                            "useEnrolledCourses.useQuery": (c) => c && c.community_enabled
                        }["useEnrolledCourses.useQuery"]) || [];
                        // Fetch channels for each course
                        const coursesWithChannels = await Promise.all(coursesWithCommunity.map({
                            "useEnrolledCourses.useQuery": async (course) => {
                                const { data: channels } = await supabase.from("community_channels").select("*").eq("course_id", course.id).order("created_at", {
                                    ascending: true
                                });
                                return {
                                    ...course,
                                    channels: channels || []
                                };
                            }
                        }["useEnrolledCourses.useQuery"]));
                        return coursesWithChannels;
                    }
                }["useEnrolledCourses.useQuery"],
                enabled: !!userId
            });
        };
        _s(useEnrolledCourses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useActions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useSendMessage",
            () => useSendMessage,
            "useToggleReaction",
            () => useToggleReaction
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
        ;
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useSendMessage = (channelId) => {
            _s();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useSendMessage.useMutation": async ({ content, attachments = [] }) => {
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) {
                            throw new Error("Not authenticated");
                        }
                        const { data, error } = await supabase.from("community_messages").insert({
                            channel_id: channelId,
                            user_id: user.id,
                            content,
                            attachments
                        }).select(`
                    *,
                    profiles!user_id (
                        full_name,
                        avatar_url,
                        role
                    )
                `).single();
                        if (error) {
                            throw error;
                        }
                        return data;
                    }
                }["useSendMessage.useMutation"],
                onMutate: {
                    "useSendMessage.useMutation": async ({ content, attachments = [] }) => {
                        await queryClient.cancelQueries({
                            queryKey: [
                                "community",
                                "messages",
                                channelId
                            ]
                        });
                        const previousMessages = queryClient.getQueryData([
                            "community",
                            "messages",
                            channelId
                        ]);
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) return {
                            previousMessages
                        };
                        // Fetch user profile for optimistic message
                        const { data: profile } = await supabase.from("profiles").select("full_name, avatar_url, role").eq("id", user.id).single();
                        const optimisticMessage = {
                            id: `temp-${Date.now()}`,
                            content,
                            channel_id: channelId,
                            user_id: user.id,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            attachments,
                            is_pinned: false,
                            is_announcement: false,
                            parent_message_id: null,
                            profiles: profile || {
                                full_name: user.user_metadata.full_name || "You",
                                avatar_url: user.user_metadata.avatar_url,
                                role: user.user_metadata.role || "student"
                            },
                            community_reactions: []
                        };
                        queryClient.setQueryData([
                            "community",
                            "messages",
                            channelId
                        ], {
                            "useSendMessage.useMutation": (old) => {
                                if (!old) return {
                                    pages: [
                                        [
                                            optimisticMessage
                                        ]
                                    ],
                                    pageParams: [
                                        0
                                    ]
                                };
                                const newPages = [
                                    ...old.pages
                                ];
                                newPages[0] = [
                                    optimisticMessage,
                                    ...newPages[0]
                                ];
                                return {
                                    ...old,
                                    pages: newPages
                                };
                            }
                        }["useSendMessage.useMutation"]);
                        return {
                            previousMessages
                        };
                    }
                }["useSendMessage.useMutation"],
                onSuccess: {
                    "useSendMessage.useMutation": () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Message sent!");
                    }
                }["useSendMessage.useMutation"],
                onError: {
                    "useSendMessage.useMutation": (error, _, context) => {
                        if (context?.previousMessages) {
                            queryClient.setQueryData([
                                "community",
                                "messages",
                                channelId
                            ], context.previousMessages);
                        }
                        const errorMessage = error.message || "Failed to send message";
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
                    }
                }["useSendMessage.useMutation"],
                onSettled: {
                    "useSendMessage.useMutation": () => {
                        queryClient.invalidateQueries({
                            queryKey: [
                                "community",
                                "messages",
                                channelId
                            ]
                        });
                    }
                }["useSendMessage.useMutation"]
            });
        };
        _s(useSendMessage, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        const useToggleReaction = () => {
            _s1();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useToggleReaction.useMutation": async ({ messageId, emoji }) => {
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) throw new Error("Not authenticated");
                        // Check if reaction exists
                        const { data: existing } = await supabase.from("community_reactions").select("id").eq("message_id", messageId).eq("user_id", user.id).eq("emoji", emoji).single();
                        if (existing) {
                            // Remove reaction
                            const { error } = await supabase.from("community_reactions").delete().eq("id", existing.id);
                            if (error) throw error;
                        } else {
                            // Add reaction
                            const { error } = await supabase.from("community_reactions").insert({
                                message_id: messageId,
                                user_id: user.id,
                                emoji
                            });
                            if (error) throw error;
                        }
                    }
                }["useToggleReaction.useMutation"],
                onSuccess: {
                    "useToggleReaction.useMutation": (_, { messageId }) => {
                        // Invalidate specific message or channel messages
                        queryClient.invalidateQueries({
                            queryKey: [
                                "community",
                                "messages"
                            ]
                        });
                    }
                }["useToggleReaction.useMutation"],
                onError: {
                    "useToggleReaction.useMutation": () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to update reaction");
                    }
                }["useToggleReaction.useMutation"]
            });
        };
        _s1(useToggleReaction, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useBookmarks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useBookmarkedMessages",
            () => useBookmarkedMessages,
            "useMentions",
            () => useMentions,
            "useToggleBookmark",
            () => useToggleBookmark
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
        ;
        ;
        ;
        const useMentions = () => {
            _s();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    'community',
                    'mentions'
                ],
                queryFn: {
                    "useMentions.useQuery": async () => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) throw new Error('Not authenticated');
                        // Get user's name to search for mentions
                        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
                        if (!profile?.full_name) return [];
                        // Search for messages that mention the user
                        const { data, error } = await supabase.from('community_messages').select(`
                    *,
                    profiles!user_id (
                        full_name,
                        avatar_url,
                        role
                    ),
                    community_reactions (
                        id,
                        emoji,
                        user_id
                    ),
                    community_bookmarks (
                        id,
                        user_id
                    ),
                    community_channels!channel_id (
                        id,
                        name,
                        course_id,
                        courses (
                            id,
                            title
                        )
                    )
                `).ilike('content', `%@${profile.full_name}%`).order('created_at', {
                            ascending: false
                        }).limit(50);
                        if (error) throw error;
                        return data || [];
                    }
                }["useMentions.useQuery"]
            });
        };
        _s(useMentions, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        const useBookmarkedMessages = () => {
            _s1();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    'community',
                    'bookmarks'
                ],
                queryFn: {
                    "useBookmarkedMessages.useQuery": async () => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) throw new Error('Not authenticated');
                        const { data, error } = await supabase.from('community_bookmarks').select(`
                    id,
                    created_at,
                    community_messages (
                        id,
                        content,
                        created_at,
                        channel_id,
                        user_id,
                        is_pinned,
                        is_announcement,
                        profiles:user_id (
                            full_name,
                            avatar_url,
                            role
                        ),
                        community_reactions (
                            id,
                            emoji,
                            user_id
                        ),
                        community_bookmarks (
                            id,
                            user_id
                        ),
                        community_channels (
                            id,
                            name,
                            course_id,
                            courses (
                                id,
                                title
                            )
                        )
                    )
                `).eq('user_id', user.id).order('created_at', {
                            ascending: false
                        });
                        if (error) throw error;
                        // Transform data to include message details
                        return data?.map({
                            "useBookmarkedMessages.useQuery": (bookmark) => ({
                                bookmarkId: bookmark.id,
                                bookmarkedAt: bookmark.created_at,
                                message: bookmark.community_messages
                            })
                        }["useBookmarkedMessages.useQuery"]) || [];
                    }
                }["useBookmarkedMessages.useQuery"]
            });
        };
        _s1(useBookmarkedMessages, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        const useToggleBookmark = (channelId) => {
            _s2();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useToggleBookmark.useMutation": async ({ messageId, isBookmarked }) => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) throw new Error('Not authenticated');
                        if (isBookmarked) {
                            // Remove bookmark
                            const { error } = await supabase.from('community_bookmarks').delete().eq('user_id', user.id).eq('message_id', messageId);
                            if (error) throw error;
                            return {
                                action: 'removed'
                            };
                        } else {
                            // Add bookmark - check if it already exists first
                            const { data: existing } = await supabase.from('community_bookmarks').select('id').eq('user_id', user.id).eq('message_id', messageId).single();
                            if (existing) {
                                return {
                                    action: 'added'
                                };
                            }
                            const { error } = await supabase.from('community_bookmarks').insert({
                                user_id: user.id,
                                message_id: messageId
                            });
                            if (error) {
                                if (error.code === '23505') {
                                    return {
                                        action: 'added'
                                    };
                                }
                                throw error;
                            }
                            return {
                                action: 'added'
                            };
                        }
                    }
                }["useToggleBookmark.useMutation"],
                onSuccess: {
                    "useToggleBookmark.useMutation": (data) => {
                        // Invalidate all message queries
                        if (channelId) {
                            queryClient.invalidateQueries({
                                queryKey: [
                                    'community',
                                    'messages',
                                    channelId
                                ]
                            });
                        }
                        queryClient.invalidateQueries({
                            queryKey: [
                                'community',
                                'bookmarks'
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                'community',
                                'messages'
                            ]
                        });
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                            title: data.action === 'added' ? 'Message bookmarked' : 'Bookmark removed',
                            description: data.action === 'added' ? 'Message saved to bookmarks' : 'Message removed from bookmarks'
                        });
                    }
                }["useToggleBookmark.useMutation"],
                onError: {
                    "useToggleBookmark.useMutation": (error) => {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])({
                            title: 'Failed to update bookmark',
                            description: error instanceof Error ? error.message : 'Unknown error',
                            variant: 'destructive'
                        });
                    }
                }["useToggleBookmark.useMutation"]
            });
        };
        _s2(useToggleBookmark, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useMessages.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useChannels.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useEnrolledCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useEnrolledCourses.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useActions.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useBookmarks.ts [app-client] (ecmascript)");
        ;
        ;
        ;
        ;
        ;
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/ChannelSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "ChannelSidebar",
            () => ChannelSidebar
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-client] (ecmascript) <export default as HelpCircle>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/at-sign.js [app-client] (ecmascript) <export default as AtSign>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/CourseThumbnail.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/community/index.ts [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useBookmarks.ts [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        const ChannelSidebar = ({ channels, activeChannelId, onSelectChannel, courseId, enrolledCourses, isOpen, onClose, isAdmin = false, onViewChange, onSelectCourse }) => {
            _s();
            const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
            const [expandedCourses, setExpandedCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set([
                courseId
            ]));
            const getIcon = (type) => {
                switch (type) {
                    case "announcement":
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 42,
                            columnNumber: 24
                        }, ("TURBOPACK compile-time value", void 0));
                    case "qa":
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 44,
                            columnNumber: 24
                        }, ("TURBOPACK compile-time value", void 0));
                    default:
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 46,
                            columnNumber: 24
                        }, ("TURBOPACK compile-time value", void 0));
                }
            };
            const toggleCourse = (id) => {
                const newExpanded = new Set(expandedCourses);
                if (newExpanded.has(id)) {
                    newExpanded.delete(id);
                } else {
                    newExpanded.add(id);
                }
                setExpandedCourses(newExpanded);
            };
            // Toggle course expansion and handle selection
            const handleCourseClick = (id) => {
                onSelectCourse?.(id);
                toggleCourse(id);
            };
            // Auto-expand course when a channel from it is selected
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "ChannelSidebar.useEffect": () => {
                    if (activeChannelId) {
                        const channelCourse = enrolledCourses.find({
                            "ChannelSidebar.useEffect.channelCourse": (course) => course.channels?.some({
                                "ChannelSidebar.useEffect.channelCourse": (ch) => ch.id === activeChannelId
                            }["ChannelSidebar.useEffect.channelCourse"])
                        }["ChannelSidebar.useEffect.channelCourse"]);
                        if (channelCourse && !expandedCourses.has(channelCourse.id)) {
                            toggleCourse(channelCourse.id);
                        }
                    }
                }
            }["ChannelSidebar.useEffect"], [
                activeChannelId,
                enrolledCourses
            ]);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm",
                        onClick: onClose
                    }, void 0, false, {
                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-72 border-r border-slate-200/80 dark:border-slate-800/80 h-full flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-transform duration-300 z-50 shadow-xl", // Mobile: slide-in drawer
                            "fixed md:relative inset-y-0 left-0", isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"),
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-linear-to-r from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/5 dark:to-blue-500/5",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-bold text-xl tracking-tight flex items-center gap-2 text-slate-900 dark:text-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                        className: "w-5 h-5 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                                        lineNumber: 103,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                    "Community"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "md:hidden h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800",
                                onClick: onClose,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                    lineNumber: 113,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 107,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 100,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ForYouSection, {
                                onViewChange: onViewChange,
                                onClose: onClose
                            }, void 0, false, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 120,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2",
                                    children: "All Channels"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: enrolledCourses.map((course) => {
                                        const isExpanded = expandedCourses.has(course.id);
                                        // Check if this course contains the active channel
                                        const isActive = course.channels?.some((ch) => ch.id === activeChannelId) || false;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all duration-200", isActive ? "bg-linear-to-r from-emerald-500/15 to-blue-500/15 dark:from-emerald-500/10 dark:to-blue-500/10 shadow-sm" : "hover:bg-slate-100 dark:hover:bg-slate-800"),
                                                children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: () => toggleCourse(course.id),
                                                    className: "shrink-0 hover:bg-slate-200 dark:hover:bg-slate-700 rounded p-1 transition-colors",
                                                    children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "w-4 h-4 text-slate-600 dark:text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "w-4 h-4 text-slate-600 dark:text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: () => handleCourseClick(course.id),
                                                    className: "flex items-center gap-3 flex-1 min-w-0",
                                                    children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 border-white dark:border-slate-800 shadow-md",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseThumbnail"], {
                                                            src: course.thumbnail_url,
                                                            title: course.title,
                                                            variant: "card"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm font-semibold truncate", isActive ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"),
                                                        children: course.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 49
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                lineNumber: 136,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0)),
                                                isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ml-8 mt-1 space-y-0.5",
                                                    children: course.channels.map((channel) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: () => onSelectChannel(channel.id),
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group relative", activeChannelId === channel.id ? "bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold shadow-sm" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"),
                                                        children: [
                                                            activeChannelId === channel.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-500 rounded-r-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 61
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shrink-0", activeChannelId === channel.id ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"),
                                                                children: getIcon(channel.type)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                                lineNumber: 191,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate",
                                                                children: channel.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, channel.id, true, {
                                                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, course.id, true, {
                                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                                            lineNumber: 134,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 118,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true);
        };
        _s(ChannelSidebar, "17Mzvf44PKf0E2B9vtnnfsKcnVk=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
            ];
        });
        _c = ChannelSidebar;
        // For You Section Component
        const ForYouSection = ({ onViewChange, onClose }) => {
            _s1();
            const { data: mentions = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMentions"])();
            const { data: bookmarks = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookmarkedMessages"])();
            const handleNavigation = (view) => {
                if (onViewChange) {
                    onViewChange(view);
                    onClose();
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2",
                    children: "For You"
                }, void 0, false, {
                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                    lineNumber: 235,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: () => handleNavigation('mentions'),
                        className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-slate-700 dark:text-slate-300 hover:bg-linear-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-900/20 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__["AtSign"], {
                                className: "w-4 h-4 text-blue-600 dark:text-blue-400"
                            }, void 0, false, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 244,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 243,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            children: "Mentions"
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 246,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                            mentions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-xs bg-linear-to-r from-blue-500 to-blue-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm",
                                children: mentions.length
                            }, void 0, false, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 248,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                        lineNumber: 239,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: () => handleNavigation('bookmarks'),
                        className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-slate-700 dark:text-slate-300 hover:bg-linear-to-r hover:from-amber-50 hover:to-transparent dark:hover:from-amber-900/20 group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg bg-linear-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                className: "w-4 h-4 text-amber-600 dark:text-amber-400"
                            }, void 0, false, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 258,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 257,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold",
                            children: "Bookmarks"
                        }, void 0, false, {
                            fileName: "[project]/components/community/ChannelSidebar.tsx",
                            lineNumber: 260,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                            bookmarks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-xs bg-linear-to-r from-amber-500 to-amber-600 text-white px-2 py-0.5 rounded-full font-bold shadow-sm",
                                children: bookmarks.length
                            }, void 0, false, {
                                fileName: "[project]/components/community/ChannelSidebar.tsx",
                                lineNumber: 262,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/ChannelSidebar.tsx",
                        lineNumber: 253,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/community/ChannelSidebar.tsx",
                    lineNumber: 238,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/community/ChannelSidebar.tsx",
                lineNumber: 234,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        };
        _s1(ForYouSection, "aFExEzVndFlX10WuObjADKGGiNw=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMentions"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookmarkedMessages"]
            ];
        });
        _c1 = ForYouSection;
        var _c, _c1;
        __turbopack_context__.k.register(_c, "ChannelSidebar");
        __turbopack_context__.k.register(_c1, "ForYouSection");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useMessageReactions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useMessageReactions",
            () => useMessageReactions,
            "useToggleMessageReaction",
            () => useToggleMessageReaction
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
        ;
        ;
        function useMessageReactions(messageId) {
            _s();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    "message-reactions",
                    messageId
                ],
                queryFn: {
                    "useMessageReactions.useQuery": async () => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const { data, error } = await supabase.from("community_reactions").select("*").eq("message_id", messageId);
                        if (error) throw error;
                        return data || [];
                    }
                }["useMessageReactions.useQuery"]
            });
        }
        _s(useMessageReactions, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        function useToggleMessageReaction() {
            _s1();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useToggleMessageReaction.useMutation": async ({ messageId, emoji }) => {
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) throw new Error("Not authenticated");
                        // Check if reaction already exists
                        const { data: existing, error: checkError } = await supabase.from("community_reactions").select("id").eq("message_id", messageId).eq("user_id", user.id).eq("emoji", emoji).single();
                        if (checkError && checkError.code !== 'PGRST116') {
                            throw checkError;
                        }
                        if (existing) {
                            // Remove reaction
                            const { error } = await supabase.from("community_reactions").delete().eq("id", existing.id);
                            if (error) throw error;
                            return {
                                action: "removed"
                            };
                        } else {
                            // Add reaction
                            const { error } = await supabase.from("community_reactions").insert({
                                message_id: messageId,
                                user_id: user.id,
                                emoji
                            });
                            if (error) throw error;
                            return {
                                action: "added"
                            };
                        }
                    }
                }["useToggleMessageReaction.useMutation"],
                onSuccess: {
                    "useToggleMessageReaction.useMutation": (_, variables) => {
                        // Invalidate queries to refetch messages
                        queryClient.invalidateQueries({
                            queryKey: [
                                "community",
                                "messages"
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                "message-reactions",
                                variables.messageId
                            ]
                        });
                    }
                }["useToggleMessageReaction.useMutation"]
            });
        }
        _s1(useToggleMessageReaction, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/useUser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useUser",
            () => useUser
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        function useUser() {
            _s();
            const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
            const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
            const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "useUser.useEffect": () => {
                    let mounted = true;
                    const getUser = {
                        "useUser.useEffect.getUser": async () => {
                            try {
                                // Get session from local storage first (faster)
                                const { data: { session } } = await supabase.auth.getSession();
                                if (mounted) {
                                    if (session?.user) {
                                        setUser(session.user);
                                        // Fetch profile in background to unblock UI
                                        fetchProfile(session.user.id);
                                    } else {
                                        // Fallback to getUser if no session (only if session is null)
                                        const { data: { user } } = await supabase.auth.getUser();
                                        if (mounted) setUser(user);
                                        if (user) fetchProfile(user.id);
                                    }
                                }
                            } catch (error) {
                                // Silently fail - auth errors are handled by Supabase
                            } finally {
                                if (mounted) setLoading(false);
                            }
                        }
                    }["useUser.useEffect.getUser"];
                    const fetchProfile = {
                        "useUser.useEffect.fetchProfile": async (userId) => {
                            const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
                            if (mounted) setProfile(profile);
                        }
                    }["useUser.useEffect.fetchProfile"];
                    getUser();
                    const { data: { subscription } } = supabase.auth.onAuthStateChange({
                        "useUser.useEffect": async (_event, session) => {
                            if (mounted) {
                                setUser(session?.user ?? null);
                                if (session?.user) {
                                    fetchProfile(session.user.id);
                                } else {
                                    setProfile(null);
                                }
                                setLoading(false);
                            }
                        }
                    }["useUser.useEffect"]);
                    return ({
                        "useUser.useEffect": () => {
                            mounted = false;
                            subscription.unsubscribe();
                        }
                    })["useUser.useEffect"];
                }
            }["useUser.useEffect"], []);
            return {
                user,
                profile,
                loading
            };
        }
        _s(useUser, "DYSpA4ZauWKW8e4CNkO4ayA+RbM=");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Popover",
            () => Popover,
            "PopoverAnchor",
            () => PopoverAnchor,
            "PopoverContent",
            () => PopoverContent,
            "PopoverTrigger",
            () => PopoverTrigger
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-popover/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        function Popover({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "popover",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/popover.tsx",
                lineNumber: 11,
                columnNumber: 10
            }, this);
        }
        _c = Popover;
        function PopoverTrigger({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
                "data-slot": "popover-trigger",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/popover.tsx",
                lineNumber: 17,
                columnNumber: 10
            }, this);
        }
        _c1 = PopoverTrigger;
        function PopoverContent({ className, align = 'center', sideOffset = 4, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    "data-slot": "popover-content",
                    align: align,
                    sideOffset: sideOffset,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden', className),
                    ...props
                }, void 0, false, {
                    fileName: "[project]/components/ui/popover.tsx",
                    lineNumber: 28,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/popover.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this);
        }
        _c2 = PopoverContent;
        function PopoverAnchor({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Anchor"], {
                "data-slot": "popover-anchor",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/popover.tsx",
                lineNumber: 45,
                columnNumber: 10
            }, this);
        }
        _c3 = PopoverAnchor;
        ;
        var _c, _c1, _c2, _c3;
        __turbopack_context__.k.register(_c, "Popover");
        __turbopack_context__.k.register(_c1, "PopoverTrigger");
        __turbopack_context__.k.register(_c2, "PopoverContent");
        __turbopack_context__.k.register(_c3, "PopoverAnchor");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/MessageCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "MessageCard",
            () => MessageCard
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-client] (ecmascript) <export default as Megaphone>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/community/index.ts [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useActions.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useBookmarks.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessageReactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useMessageReactions.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUser.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/popover.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        // Common emoji reactions
        const EMOJI_REACTIONS = [
            "👍",
            "❤️",
            "😂",
            "😮",
            "😢",
            "🎉",
            "🔥",
            "👏"
        ];
        const MessageCard = ({ message, isOwnMessage, isPinned = false, onDelete, channelId }) => {
            _s();
            const { mutate: toggleReaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleReaction"])();
            const { mutate: toggleBookmark } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleBookmark"])(channelId);
            const { mutate: toggleMessageReaction } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessageReactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleMessageReaction"])();
            const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
            const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
            const [showEmojiPicker, setShowEmojiPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const handleReaction = (emoji) => {
                toggleMessageReaction({
                    messageId: message.id,
                    emoji
                });
                setShowEmojiPicker(false);
            };
            const handleBookmark = () => {
                const isBookmarked = message.community_bookmarks?.some((b) => b.user_id === user?.id) || false;
                toggleBookmark({
                    messageId: message.id,
                    isBookmarked
                }, {
                    onSuccess: () => {
                        toast({
                            title: isBookmarked ? "Bookmark removed" : "Bookmark added",
                            description: isBookmarked ? "Message removed from your bookmarks" : "Message saved to your bookmarks",
                            duration: 3000
                        });
                    }
                });
            };
            // Check if current user has bookmarked this message
            const isBookmarked = message.community_bookmarks?.some((b) => b.user_id === user?.id) || false;
            // Group reactions by emoji
            const reactionCounts = message.community_reactions?.reduce((acc, reaction) => {
                acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
                return acc;
            }, {});
            const userReactions = new Set(message.community_reactions?.filter((r) => r.user_id === user?.id).map((r) => r.emoji));
            // Parse message content for mentions
            const renderMessageContent = (content) => {
                const mentionRegex = /@(\w+)/g;
                const parts = [];
                let lastIndex = 0;
                let match;
                while ((match = mentionRegex.exec(content)) !== null) {
                    // Add text before mention
                    if (match.index > lastIndex) {
                        parts.push(content.substring(lastIndex, match.index));
                    }
                    // Add mention with styling
                    parts.push(/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-900/30 px-1 rounded",
                        children: [
                            "@",
                            match[1]
                        ]
                    }, match.index, true, {
                        fileName: "[project]/components/community/MessageCard.tsx",
                        lineNumber: 87,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)));
                    lastIndex = match.index + match[0].length;
                }
                // Add remaining text
                if (lastIndex < content.length) {
                    parts.push(content.substring(lastIndex));
                }
                return parts.length > 0 ? parts : content;
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative px-4 md:px-6 py-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors", isPinned && "bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-500"),
                children: [
                    isPinned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-4 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageCard.tsx",
                            lineNumber: 109,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium",
                            children: "Pinned"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageCard.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageCard.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                            className: "h-10 w-10 shrink-0 border-2 border-white dark:border-slate-800 shadow-sm",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                src: message.profiles?.avatar_url || undefined
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageCard.tsx",
                                lineNumber: 116,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                className: "bg-linear-to-br from-emerald-500 to-blue-600 text-white font-semibold",
                                children: message.profiles?.full_name?.substring(0, 2).toUpperCase() || "U"
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageCard.tsx",
                                lineNumber: 117,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/MessageCard.tsx",
                            lineNumber: 115,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline gap-2 mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-slate-900 dark:text-slate-100",
                                    children: message.profiles?.full_name || "Unknown User"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageCard.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                    message.profiles?.role === "admin" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 129,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                            "Admin"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/MessageCard.tsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500 dark:text-slate-400",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(message.created_at), {
                                            addSuffix: true
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/MessageCard.tsx",
                                        lineNumber: 133,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/MessageCard.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap break-words",
                                children: renderMessageContent(message.content)
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageCard.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                                reactionCounts && Object.keys(reactionCounts).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1.5 mt-2",
                                    children: Object.entries(reactionCounts).map(([emoji, count]) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: () => handleReaction(emoji),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all hover:scale-105", userReactions.has(emoji) ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/50" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: emoji
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 156,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: count
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 157,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, emoji, true, {
                                        fileName: "[project]/components/community/MessageCard.tsx",
                                        lineNumber: 146,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageCard.tsx",
                                    lineNumber: 144,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                    children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                        open: showEmojiPicker,
                                        onOpenChange: setShowEmojiPicker,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "h-7 px-2 text-xs text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400",
                                                children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                                    className: "w-4 h-4 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/community/MessageCard.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                    "React"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/community/MessageCard.tsx",
                                                lineNumber: 167,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 166,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                            className: "w-auto p-2",
                                            align: "start",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: EMOJI_REACTIONS.map((emoji) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: () => handleReaction(emoji),
                                                    className: "w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xl",
                                                    children: emoji
                                                }, emoji, false, {
                                                    fileName: "[project]/components/community/MessageCard.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/MessageCard.tsx",
                                                lineNumber: 177,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 176,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/MessageCard.tsx",
                                        lineNumber: 165,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: handleBookmark,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-7 px-2 text-xs", isBookmarked ? "text-amber-600 dark:text-amber-400" : "text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-4 h-4 mr-1", isBookmarked && "fill-current")
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 202,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                            isBookmarked ? "Saved" : "Save"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/MessageCard.tsx",
                                        lineNumber: 191,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                        isOwnMessage && onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: onDelete,
                                            className: "h-7 px-2 text-xs text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400",
                                            children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                className: "w-4 h-4 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/MessageCard.tsx",
                                                lineNumber: 213,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                                "Delete"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/community/MessageCard.tsx",
                                            lineNumber: 207,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/MessageCard.tsx",
                                    lineNumber: 164,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/MessageCard.tsx",
                            lineNumber: 122,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageCard.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/community/MessageCard.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        };
        _s(MessageCard, "8atZAcr8HQTSK4dfrDz4PW6V6HA=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleReaction"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleBookmark"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessageReactions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleMessageReaction"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
            ];
        });
        _c = MessageCard;
        var _c;
        __turbopack_context__.k.register(_c, "MessageCard");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/MessageList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "MessageList",
            () => MessageList
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/community/index.ts [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useMessages.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageCard.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUser.ts [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        ;
        ;
        const MessageList = ({ channelId }) => {
            _s();
            const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChannelMessages"])(channelId);
            const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
            // All hooks must be called unconditionally at the top level
            const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
            const topObserver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
            const topSentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
            // Auto-scroll to bottom on initial load
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "MessageList.useEffect": () => {
                    if (!isLoading) {
                        bottomRef.current?.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            }["MessageList.useEffect"], [
                isLoading,
                channelId
            ]);
            // Infinite scroll observer setup
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "MessageList.useEffect": () => {
                    if (!hasNextPage || isFetchingNextPage || isLoading) return;
                    const observer = new IntersectionObserver({
                        "MessageList.useEffect": (entries) => {
                            if (entries[0].isIntersecting) {
                                fetchNextPage();
                            }
                        }
                    }["MessageList.useEffect"], {
                        threshold: 0.5
                    });
                    if (topSentinelRef.current) {
                        observer.observe(topSentinelRef.current);
                    }
                    topObserver.current = observer;
                    return ({
                        "MessageList.useEffect": () => {
                            if (topObserver.current) observer.disconnect();
                        }
                    })["MessageList.useEffect"];
                }
            }["MessageList.useEffect"], [
                hasNextPage,
                isFetchingNextPage,
                fetchNextPage,
                isLoading
            ]);
            if (isLoading) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex items-center justify-center bg-linear-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-950/50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-3",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-10 h-10 animate-spin text-emerald-500"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageList.tsx",
                            lineNumber: 53,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-600 dark:text-slate-400",
                            children: "Loading messages..."
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageList.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageList.tsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/community/MessageList.tsx",
                    lineNumber: 51,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            }
            const allMessages = data?.pages.flatMap((page) => page) || [];
            const pinnedMessages = allMessages.filter((m) => m.is_pinned || m.is_announcement);
            // For flex-col-reverse, we keep messages in default order (Latest First)
            // and let CSS handle the visual stacking (Latest at Bottom)
            const regularMessages = allMessages.filter((m) => !m.is_pinned && !m.is_announcement);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-h-0 bg-linear-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-950/50",
                children: [
                    pinnedMessages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-none bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-b border-blue-200 dark:border-blue-900/50 backdrop-blur-sm shadow-sm z-10",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-2 flex items-center gap-2 border-b border-blue-200/50 dark:border-blue-900/30",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                                className: "w-4 h-4 text-blue-600 dark:text-blue-400"
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageList.tsx",
                                lineNumber: 72,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide",
                                children: "Pinned Messages"
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageList.tsx",
                                lineNumber: 73,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/MessageList.tsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-32 overflow-y-auto",
                            children: pinnedMessages.map((message) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageCard"], {
                                message: message,
                                isOwnMessage: message.user_id === user?.id,
                                isPinned: true
                            }, message.id, false, {
                                fileName: "[project]/components/community/MessageList.tsx",
                                lineNumber: 79,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageList.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageList.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-2 flex flex-col-reverse scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent pb-24",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: bottomRef,
                            className: "h-1 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageList.tsx",
                            lineNumber: 94,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                            regularMessages.length === 0 && pinnedMessages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col items-center justify-center text-center px-4 py-12",
                                children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-linear-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-3xl",
                                        children: "💬"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/MessageList.tsx",
                                        lineNumber: 99,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageList.tsx",
                                    lineNumber: 98,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2",
                                    children: "No messages yet"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageList.tsx",
                                    lineNumber: 101,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600 dark:text-slate-400 max-w-sm",
                                    children: "Be the first to start the conversation!"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageList.tsx",
                                    lineNumber: 104,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/MessageList.tsx",
                                lineNumber: 97,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1 flex flex-col-reverse",
                                children: regularMessages.map((message) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageCard"], {
                                        message: message,
                                        isOwnMessage: message.user_id === user?.id
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/MessageList.tsx",
                                        lineNumber: 112,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, message.id, false, {
                                    fileName: "[project]/components/community/MessageList.tsx",
                                    lineNumber: 111,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageList.tsx",
                                lineNumber: 109,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: topSentinelRef,
                                className: "w-full py-4 flex justify-center flex-shrink-0",
                                children: isFetchingNextPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 animate-spin text-slate-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageList.tsx",
                                    lineNumber: 123,
                                    columnNumber: 44
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageList.tsx",
                                lineNumber: 122,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageList.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/community/MessageList.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        };
        _s(MessageList, "M4vh+e2avDql7Vt+FnK1tt91ee4=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useMessages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChannelMessages"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"]
            ];
        });
        _c = MessageList;
        var _c;
        __turbopack_context__.k.register(_c, "MessageList");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Textarea",
            () => Textarea
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        ;
        ;
        function Textarea({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                "data-slot": "textarea",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/textarea.tsx",
                lineNumber: 7,
                columnNumber: 5
            }, this);
        }
        _c = Textarea;
        ;
        var _c;
        __turbopack_context__.k.register(_c, "Textarea");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/community/useChannelUsers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useChannelUsers",
            () => useChannelUsers
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        function useChannelUsers(channelId) {
            _s();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    "channel-users",
                    channelId
                ],
                queryFn: {
                    "useChannelUsers.useQuery": async () => {
                        if (!channelId) return [];
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        // Get the channel to find its course
                        const { data: channel } = await supabase.from("community_channels").select("course_id").eq("id", channelId).single();
                        if (!channel) return [];
                        // Get all users enrolled in this course
                        const { data: enrollments } = await supabase.from("enrollments").select(`
                    user_id,
                    profiles:user_id (
                        id,
                        full_name,
                        avatar_url
                    )
                `).eq("course_id", channel.course_id);
                        if (!enrollments) return [];
                        // Format the data
                        return enrollments.map({
                            "useChannelUsers.useQuery": (enrollment) => ({
                                id: enrollment.profiles.id,
                                full_name: enrollment.profiles.full_name,
                                avatar_url: enrollment.profiles.avatar_url
                            })
                        }["useChannelUsers.useQuery"]);
                    }
                }["useChannelUsers.useQuery"],
                enabled: !!channelId
            });
        }
        _s(useChannelUsers, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/MessageInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "MessageInput",
            () => MessageInput
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-client] (ecmascript) <export default as Paperclip>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/community/index.ts [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useActions.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useChannelUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useChannelUsers.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        const MessageInput = ({ channelId }) => {
            _s();
            const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
            const [showMentions, setShowMentions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [mentionSearch, setMentionSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
            const [mentionStartPos, setMentionStartPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
            const [selectedMentionIndex, setSelectedMentionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
            const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
            const { mutate: sendMessage, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendMessage"])(channelId);
            const { data: users = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useChannelUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChannelUsers"])(channelId);
            // Filter users based on mention search
            const filteredUsers = users.filter((user) => user.full_name?.toLowerCase().includes(mentionSearch.toLowerCase()));
            // Detect @ mentions
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "MessageInput.useEffect": () => {
                    const cursorPos = textareaRef.current?.selectionStart || 0;
                    const textBeforeCursor = content.substring(0, cursorPos);
                    const lastAtSymbol = textBeforeCursor.lastIndexOf('@');
                    if (lastAtSymbol !== -1) {
                        const textAfterAt = textBeforeCursor.substring(lastAtSymbol + 1);
                        // Check if there's no space after @
                        if (!textAfterAt.includes(' ')) {
                            setMentionSearch(textAfterAt);
                            setMentionStartPos(lastAtSymbol);
                            setShowMentions(true);
                            setSelectedMentionIndex(0);
                            return;
                        }
                    }
                    setShowMentions(false);
                }
            }["MessageInput.useEffect"], [
                content
            ]);
            const insertMention = (userName) => {
                const beforeMention = content.substring(0, mentionStartPos);
                const afterCursor = content.substring(textareaRef.current?.selectionStart || 0);
                const newContent = `${beforeMention}@${userName} ${afterCursor}`;
                setContent(newContent);
                setShowMentions(false);
                // Focus back on textarea
                setTimeout(() => {
                    textareaRef.current?.focus();
                    const newCursorPos = mentionStartPos + userName.length + 2;
                    textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
                }, 0);
            };
            const handleSubmit = (e) => {
                e?.preventDefault();
                if (!content.trim() || isPending) return;
                sendMessage({
                    content
                }, {
                    onSuccess: () => setContent("")
                });
            };
            const handleKeyDown = (e) => {
                if (showMentions && filteredUsers.length > 0) {
                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSelectedMentionIndex((prev) => prev < filteredUsers.length - 1 ? prev + 1 : prev);
                        return;
                    }
                    if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSelectedMentionIndex((prev) => prev > 0 ? prev - 1 : 0);
                        return;
                    }
                    if (e.key === "Enter" || e.key === "Tab") {
                        e.preventDefault();
                        insertMention(filteredUsers[selectedMentionIndex].full_name);
                        return;
                    }
                    if (e.key === "Escape") {
                        setShowMentions(false);
                        return;
                    }
                }
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 md:p-6 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl relative",
                children: [
                    showMentions && filteredUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-full left-4 right-4 mb-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto z-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2 space-y-1",
                            children: filteredUsers.map((user, index) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: () => insertMention(user.full_name),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors", index === selectedMentionIndex ? "bg-emerald-100 dark:bg-emerald-900/30" : "hover:bg-slate-100 dark:hover:bg-slate-700"),
                                children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                    className: "h-8 w-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                        src: user.avatar_url
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/MessageInput.tsx",
                                        lineNumber: 126,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                        className: "bg-linear-to-br from-emerald-500 to-blue-600 text-white text-xs",
                                        children: user.full_name?.substring(0, 2).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/MessageInput.tsx",
                                        lineNumber: 127,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/MessageInput.tsx",
                                    lineNumber: 125,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium",
                                    children: user.full_name
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageInput.tsx",
                                    lineNumber: 131,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, user.id, true, {
                                fileName: "[project]/components/community/MessageInput.tsx",
                                lineNumber: 115,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/community/MessageInput.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex items-end gap-3 bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-2xl border-2 border-transparent focus-within:border-emerald-500/50 dark:focus-within:border-emerald-500/30 transition-all shadow-sm hover:shadow-md",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: "h-10 w-10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-slate-700/50 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageInput.tsx",
                                lineNumber: 144,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 139,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                            ref: textareaRef,
                            value: content,
                            onChange: (e) => setContent(e.target.value),
                            onKeyDown: handleKeyDown,
                            placeholder: "Type a message... (Use @ to mention someone)",
                            disabled: isPending,
                            className: "min-h-[48px] max-h-[180px] border-0 bg-transparent focus-visible:ring-0 resize-none py-3 px-2 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-100",
                            rows: 1
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 147,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 pb-1 shrink-0",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "h-10 w-10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/50 dark:hover:bg-slate-700/50",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageInput.tsx",
                                    lineNumber: 164,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageInput.tsx",
                                lineNumber: 159,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: () => handleSubmit(),
                                disabled: !content.trim() || isPending,
                                size: "icon",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-10 w-10 rounded-xl transition-all duration-200 shadow-md", content.trim() && !isPending ? "bg-linear-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-emerald-500/50 dark:shadow-emerald-500/30 hover:shadow-lg hover:scale-105" : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-500 cursor-not-allowed opacity-60"),
                                children: isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-5 h-5 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageInput.tsx",
                                    lineNumber: 178,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/MessageInput.tsx",
                                    lineNumber: 180,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/community/MessageInput.tsx",
                                lineNumber: 166,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 158,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageInput.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[11px] text-slate-500 dark:text-slate-500 mt-2.5 text-center flex items-center justify-center gap-2",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Press"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 186,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                            className: "font-mono px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-[10px] font-semibold",
                            children: "Enter"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 187,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "to send"
                        }, void 0, false, {
                            fileName: "[project]/components/community/MessageInput.tsx",
                            lineNumber: 188,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/MessageInput.tsx",
                        lineNumber: 185,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/community/MessageInput.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        };
        _s(MessageInput, "T/Y9xKO8NiIFK6ENOFyfWZx1VBo=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendMessage"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useChannelUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChannelUsers"]
            ];
        });
        _c = MessageInput;
        var _c;
        __turbopack_context__.k.register(_c, "MessageInput");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/index.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$ChannelSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/ChannelSidebar.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageList.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageInput.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageCard.tsx [app-client] (ecmascript)");
        ;
        ;
        ;
        ;
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/admin/useAdminCoursesWithChannels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useAdminCoursesWithChannels",
            () => useAdminCoursesWithChannels
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useAdminCoursesWithChannels = (userId) => {
            _s();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
                queryKey: [
                    "admin",
                    "courses-with-channels",
                    userId
                ],
                queryFn: {
                    "useAdminCoursesWithChannels.useQuery": async () => {
                        if (!userId) return [];
                        const { data, error } = await supabase.from("courses").select(`
                    id,
                    title,
                    thumbnail_url,
                    category,
                    community_enabled
                `).eq("creator_id", userId);
                        if (error) throw error;
                        // Fetch channels for each course
                        const coursesWithChannels = await Promise.all((data || []).map({
                            "useAdminCoursesWithChannels.useQuery": async (course) => {
                                const { data: channels } = await supabase.from("community_channels").select("*").eq("course_id", course.id).order("created_at", {
                                    ascending: true
                                });
                                return {
                                    ...course,
                                    channels: channels || []
                                };
                            }
                        }["useAdminCoursesWithChannels.useQuery"]));
                        return coursesWithChannels;
                    }
                }["useAdminCoursesWithChannels.useQuery"],
                enabled: !!userId
            });
        };
        _s(useAdminCoursesWithChannels, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Card",
            () => Card,
            "CardAction",
            () => CardAction,
            "CardContent",
            () => CardContent,
            "CardDescription",
            () => CardDescription,
            "CardFooter",
            () => CardFooter,
            "CardHeader",
            () => CardHeader,
            "CardTitle",
            () => CardTitle
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        ;
        ;
        function Card({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 7,
                columnNumber: 5
            }, this);
        }
        _c = Card;
        function CardHeader({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card-header",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this);
        }
        _c1 = CardHeader;
        function CardTitle({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card-title",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 33,
                columnNumber: 5
            }, this);
        }
        _c2 = CardTitle;
        function CardDescription({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card-description",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 43,
                columnNumber: 5
            }, this);
        }
        _c3 = CardDescription;
        function CardAction({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card-action",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 53,
                columnNumber: 5
            }, this);
        }
        _c4 = CardAction;
        function CardContent({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 66,
                columnNumber: 5
            }, this);
        }
        _c5 = CardContent;
        function CardFooter({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "card-footer",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/card.tsx",
                lineNumber: 76,
                columnNumber: 5
            }, this);
        }
        _c6 = CardFooter;
        ;
        var _c, _c1, _c2, _c3, _c4, _c5, _c6;
        __turbopack_context__.k.register(_c, "Card");
        __turbopack_context__.k.register(_c1, "CardHeader");
        __turbopack_context__.k.register(_c2, "CardTitle");
        __turbopack_context__.k.register(_c3, "CardDescription");
        __turbopack_context__.k.register(_c4, "CardAction");
        __turbopack_context__.k.register(_c5, "CardContent");
        __turbopack_context__.k.register(_c6, "CardFooter");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Badge",
            () => Badge,
            "badgeVariants",
            () => badgeVariants
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        ;
        ;
        ;
        ;
        const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
            variants: {
                variant: {
                    default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
                    secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
                    destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                    outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
                }
            },
            defaultVariants: {
                variant: 'default'
            }
        });
        function Badge({ className, variant, asChild = false, ...props }) {
            const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
                "data-slot": "badge",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
                    variant
                }), className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/badge.tsx",
                lineNumber: 38,
                columnNumber: 5
            }, this);
        }
        _c = Badge;
        ;
        var _c;
        __turbopack_context__.k.register(_c, "Badge");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/admin/useToggleCommunity.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useToggleCommunity",
            () => useToggleCommunity
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useToggleCommunity = () => {
            _s();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useToggleCommunity.useMutation": async ({ courseId, enabled }) => {
                        const { error } = await supabase.from("courses").update({
                            community_enabled: enabled
                        }).eq("id", courseId);
                        if (error) throw error;
                    }
                }["useToggleCommunity.useMutation"],
                onSuccess: {
                    "useToggleCommunity.useMutation": (_, { courseId, enabled }) => {
                        queryClient.invalidateQueries({
                            queryKey: [
                                "courses"
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                "course",
                                courseId
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                "admin",
                                "courses-with-channels"
                            ]
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(enabled ? "Community enabled!" : "Community disabled");
                    }
                }["useToggleCommunity.useMutation"],
                onError: {
                    "useToggleCommunity.useMutation": (error) => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Failed to toggle community");
                        console.error("Toggle community error:", error);
                    }
                }["useToggleCommunity.useMutation"]
            });
        };
        _s(useToggleCommunity, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Switch",
            () => Switch
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-switch/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        function Switch({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "switch",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
                ...props,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "switch-thumb",
                    className: 'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
                }, void 0, false, {
                    fileName: "[project]/components/ui/switch.tsx",
                    lineNumber: 21,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/switch.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, this);
        }
        _c = Switch;
        ;
        var _c;
        __turbopack_context__.k.register(_c, "Switch");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Label",
            () => Label
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        function Label({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "label",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/label.tsx",
                lineNumber: 13,
                columnNumber: 5
            }, this);
        }
        _c = Label;
        ;
        var _c;
        __turbopack_context__.k.register(_c, "Label");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Input",
            () => Input
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        ;
        ;
        function Input({ className, type, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                "data-slot": "input",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/input.tsx",
                lineNumber: 7,
                columnNumber: 5
            }, this);
        }
        _c = Input;
        ;
        var _c;
        __turbopack_context__.k.register(_c, "Input");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "Select",
            () => Select,
            "SelectContent",
            () => SelectContent,
            "SelectGroup",
            () => SelectGroup,
            "SelectItem",
            () => SelectItem,
            "SelectLabel",
            () => SelectLabel,
            "SelectScrollDownButton",
            () => SelectScrollDownButton,
            "SelectScrollUpButton",
            () => SelectScrollUpButton,
            "SelectSeparator",
            () => SelectSeparator,
            "SelectTrigger",
            () => SelectTrigger,
            "SelectValue",
            () => SelectValue
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        ;
        function Select({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "select",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 12,
                columnNumber: 10
            }, this);
        }
        _c = Select;
        function SelectGroup({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
                "data-slot": "select-group",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 18,
                columnNumber: 10
            }, this);
        }
        _c1 = SelectGroup;
        function SelectValue({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
                "data-slot": "select-value",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 24,
                columnNumber: 10
            }, this);
        }
        _c2 = SelectValue;
        function SelectTrigger({ className, size = 'default', children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
                "data-slot": "select-trigger",
                "data-size": size,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
                ...props,
                children: [
                    children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                            className: "size-4 opacity-50"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/select.tsx",
                            lineNumber: 47,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 46,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, this);
        }
        _c3 = SelectTrigger;
        function SelectContent({ className, children, position = 'popper', ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    "data-slot": "select-content",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
                    position: position,
                    ...props,
                    children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 61,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 60,
                columnNumber: 5
            }, this);
        }
        _c4 = SelectContent;
        function SelectLabel({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                "data-slot": "select-label",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 93,
                columnNumber: 5
            }, this);
        }
        _c5 = SelectLabel;
        function SelectItem({ className, children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
                "data-slot": "select-item",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
                ...props,
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "absolute right-2 flex size-3.5 items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/select.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 115,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 120,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 107,
                columnNumber: 5
            }, this);
        }
        _c6 = SelectItem;
        function SelectSeparator({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                "data-slot": "select-separator",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 130,
                columnNumber: 5
            }, this);
        }
        _c7 = SelectSeparator;
        function SelectScrollUpButton({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
                "data-slot": "select-scroll-up-button",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
                ...props,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 151,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 143,
                columnNumber: 5
            }, this);
        }
        _c8 = SelectScrollUpButton;
        function SelectScrollDownButton({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
                "data-slot": "select-scroll-down-button",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
                ...props,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 169,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 161,
                columnNumber: 5
            }, this);
        }
        _c9 = SelectScrollDownButton;
        ;
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
        __turbopack_context__.k.register(_c, "Select");
        __turbopack_context__.k.register(_c1, "SelectGroup");
        __turbopack_context__.k.register(_c2, "SelectValue");
        __turbopack_context__.k.register(_c3, "SelectTrigger");
        __turbopack_context__.k.register(_c4, "SelectContent");
        __turbopack_context__.k.register(_c5, "SelectLabel");
        __turbopack_context__.k.register(_c6, "SelectItem");
        __turbopack_context__.k.register(_c7, "SelectSeparator");
        __turbopack_context__.k.register(_c8, "SelectScrollUpButton");
        __turbopack_context__.k.register(_c9, "SelectScrollDownButton");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/admin/useCreateChannel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useCreateChannel",
            () => useCreateChannel
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature();
        ;
        ;
        ;
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        const useCreateChannel = () => {
            _s();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useCreateChannel.useMutation": async ({ courseId, name, type, description }) => {
                        const { data, error } = await supabase.from("community_channels").insert({
                            course_id: courseId,
                            name: name.toLowerCase().replace(/\s+/g, '-'),
                            type,
                            description,
                            is_active: true
                        }).select().single();
                        if (error) throw error;
                        return data;
                    }
                }["useCreateChannel.useMutation"],
                onSuccess: {
                    "useCreateChannel.useMutation": () => {
                        queryClient.invalidateQueries({
                            queryKey: [
                                "community",
                                "channels"
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                "admin",
                                "courses-with-channels"
                            ]
                        });
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Channel created successfully!");
                    }
                }["useCreateChannel.useMutation"],
                onError: {
                    "useCreateChannel.useMutation": (error) => {
                        if (error.code === '23505') {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("A channel with this name already exists");
                        } else {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Failed to create channel");
                        }
                        console.error("Create channel error:", error);
                    }
                }["useCreateChannel.useMutation"]
            });
        };
        _s(useCreateChannel, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/admin/AddChannelDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "AddChannelDialog",
            () => AddChannelDialog
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useCreateChannel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/admin/useCreateChannel.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function AddChannelDialog({ open, onOpenChange, courseId }) {
            _s();
            const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
            const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("discussion");
            const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
            const { mutate: createChannel, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useCreateChannel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateChannel"])();
            const handleSubmit = (e) => {
                e.preventDefault();
                if (!name.trim()) {
                    return;
                }
                createChannel({
                    courseId,
                    name: name.trim(),
                    type,
                    description: description.trim()
                }, {
                    onSuccess: () => {
                        setName("");
                        setType("discussion");
                        setDescription("");
                        onOpenChange(false);
                    }
                });
            };
            const getTypeDescription = (type) => {
                switch (type) {
                    case 'announcement':
                        return 'Only instructors can post. Students can read and react.';
                    case 'qa':
                        return 'Students can ask questions. Everyone can answer.';
                    case 'discussion':
                        return 'Open discussion for all students and instructors.';
                    default:
                        return '';
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: open,
                onOpenChange: onOpenChange,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-[500px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "Add New Channel"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: "Create a new channel for your course community. Choose a name and type."
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 78,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4 py-4",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "name",
                                    children: "Channel Name"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 86,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "name",
                                    placeholder: "e.g., homework-help",
                                    value: name,
                                    onChange: (e) => setName(e.target.value),
                                    disabled: isPending,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 87,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Use lowercase letters, numbers, and hyphens only"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 95,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 85,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "type",
                                    children: "Channel Type"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 102,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    value: type,
                                    onValueChange: (value) => setType(value),
                                    disabled: isPending,
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "type",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                            lineNumber: 109,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                        lineNumber: 108,
                                        columnNumber: 33
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "discussion",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "💬"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 45
                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Discussion"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 45
                                                }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                lineNumber: 113,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                            lineNumber: 112,
                                            columnNumber: 37
                                        }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "qa",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "❓"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 45
                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Q&A"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 45
                                                }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                lineNumber: 119,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                            lineNumber: 118,
                                            columnNumber: 37
                                        }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "announcement",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "📢"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 45
                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Announcement"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 45
                                                }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                                lineNumber: 125,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                            lineNumber: 124,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                        lineNumber: 111,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 103,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: getTypeDescription(type)
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 132,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 101,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "description",
                                    children: "Description (Optional)"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 139,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                    id: "description",
                                    placeholder: "What is this channel for?",
                                    value: description,
                                    onChange: (e) => setDescription(e.target.value),
                                    disabled: isPending,
                                    rows: 3
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                    lineNumber: 140,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 138,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                            lineNumber: 83,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                onClick: () => onOpenChange(false),
                                disabled: isPending,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 152,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "submit",
                                disabled: isPending || !name.trim(),
                                children: [
                                    isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-4 h-4 mr-2 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                        lineNumber: 161,
                                        columnNumber: 43
                                    }, this),
                                    "Create Channel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                                lineNumber: 160,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/AddChannelDialog.tsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/AddChannelDialog.tsx",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/admin/AddChannelDialog.tsx",
                    lineNumber: 74,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/admin/AddChannelDialog.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this);
        }
        _s(AddChannelDialog, "d7R7RhkuKifQ4svSkTGq9zQ6sTU=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useCreateChannel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateChannel"]
            ];
        });
        _c = AddChannelDialog;
        var _c;
        __turbopack_context__.k.register(_c, "AddChannelDialog");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/hooks/admin/useAdminChannels.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "useDeleteChannel",
            () => useDeleteChannel,
            "useUpdateChannel",
            () => useUpdateChannel
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
        var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
        ;
        ;
        ;
        const useUpdateChannel = () => {
            _s();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useUpdateChannel.useMutation": async ({ channelId, name, description, type }) => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        const updates = {
                            name
                        };
                        if (description !== undefined) updates.description = description;
                        if (type !== undefined) updates.type = type;
                        const { data, error } = await supabase.from("community_channels").update(updates).eq("id", channelId).select().single();
                        if (error) throw new Error(error.message);
                        return data;
                    }
                }["useUpdateChannel.useMutation"],
                onSuccess: {
                    "useUpdateChannel.useMutation": () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Channel updated successfully");
                        queryClient.invalidateQueries({
                            queryKey: [
                                "admin",
                                "courses-with-channels"
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                "channels"
                            ]
                        });
                    }
                }["useUpdateChannel.useMutation"],
                onError: {
                    "useUpdateChannel.useMutation": (error) => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Failed to update channel");
                    }
                }["useUpdateChannel.useMutation"]
            });
        };
        _s(useUpdateChannel, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        const useDeleteChannel = () => {
            _s1();
            const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
                mutationFn: {
                    "useDeleteChannel.useMutation": async ({ channelId, courseId }) => {
                        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                        console.log("Creating supabase client for delete...");
                        // 1. Fetch all message IDs to clean up dependent tables
                        console.log("Fetching message IDs for channel:", channelId);
                        const { data: messages, error: fetchError } = await supabase.from("community_messages").select("id").eq("channel_id", channelId);
                        if (fetchError) {
                            console.error("Error fetching messages:", fetchError);
                        }
                        const messageIds = messages?.map({
                            "useDeleteChannel.useMutation": (m) => m.id
                        }["useDeleteChannel.useMutation"]) || [];
                        console.log(`Found ${messageIds.length} messages to clean up.`);
                        if (messageIds.length > 0) {
                            // 2. Delete Reactions
                            console.log("Deleting reactions...");
                            const { error: reactionError } = await supabase.from("community_reactions").delete().in("message_id", messageIds);
                            if (reactionError) console.error("Error deleting reactions:", reactionError);
                            // 3. Delete Bookmarks
                            console.log("Deleting bookmarks...");
                            const { error: bookmarkError } = await supabase.from("community_bookmarks").delete().in("message_id", messageIds);
                            if (bookmarkError) console.error("Error deleting bookmarks:", bookmarkError);
                        }
                        // 4. Delete Messages (Manual Cascade)
                        console.log("Deleting messages for channel:", channelId);
                        const { error: msgError } = await supabase.from("community_messages").delete().eq("channel_id", channelId);
                        if (msgError) {
                            console.error("Error deleting messages:", msgError);
                        }
                        // 5. Delete Channel
                        console.log("Deleting channel:", channelId);
                        const { error } = await supabase.from("community_channels").delete().eq("id", channelId);
                        if (error) {
                            console.error("Error deleting channel:", error);
                            throw new Error(error.message);
                        }
                        console.log("Channel deleted successfully");
                        return {
                            channelId,
                            courseId
                        };
                    }
                }["useDeleteChannel.useMutation"],
                onMutate: {
                    "useDeleteChannel.useMutation": async ({ channelId, courseId }) => {
                        console.log("Optimistic update start");
                        // Cancel any outgoing refetches
                        await queryClient.cancelQueries({
                            queryKey: [
                                "admin",
                                "courses-with-channels"
                            ]
                        });
                        // Snapshot the previous value
                        const previousCourses = queryClient.getQueryData([
                            "admin",
                            "courses-with-channels"
                        ]);
                        // Optimistically update to the new value
                        if (previousCourses) {
                            queryClient.setQueryData([
                                "admin",
                                "courses-with-channels"
                            ], {
                                "useDeleteChannel.useMutation": (old) => {
                                    if (!old) return [];
                                    return old.map({
                                        "useDeleteChannel.useMutation": (course) => {
                                            if (course.id === courseId) {
                                                return {
                                                    ...course,
                                                    channels: course.channels.filter({
                                                        "useDeleteChannel.useMutation": (ch) => ch.id !== channelId
                                                    }["useDeleteChannel.useMutation"])
                                                };
                                            }
                                            return course;
                                        }
                                    }["useDeleteChannel.useMutation"]);
                                }
                            }["useDeleteChannel.useMutation"]);
                        }
                        // Return a context object with the snapshotted value
                        return {
                            previousCourses
                        };
                    }
                }["useDeleteChannel.useMutation"],
                onError: {
                    "useDeleteChannel.useMutation": (err, newTodo, context) => {
                        if (context?.previousCourses) {
                            queryClient.setQueryData([
                                "admin",
                                "courses-with-channels"
                            ], context.previousCourses);
                        }
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.message || "Failed to delete channel");
                    }
                }["useDeleteChannel.useMutation"],
                onSettled: {
                    "useDeleteChannel.useMutation": () => {
                        queryClient.invalidateQueries({
                            queryKey: [
                                "admin",
                                "courses-with-channels"
                            ]
                        });
                        queryClient.invalidateQueries({
                            queryKey: [
                                "channels"
                            ]
                        });
                    }
                }["useDeleteChannel.useMutation"],
                onSuccess: {
                    "useDeleteChannel.useMutation": () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Channel deleted");
                    }
                }["useDeleteChannel.useMutation"]
            });
        };
        _s1(useDeleteChannel, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
            ];
        });
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/admin/EditChannelDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "EditChannelDialog",
            () => EditChannelDialog
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/dialog.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/admin/useAdminChannels.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function EditChannelDialog({ open, onOpenChange, channel }) {
            _s();
            const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
            const { mutate: updateChannel, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateChannel"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "EditChannelDialog.useEffect": () => {
                    if (channel) {
                        setName(channel.name);
                    }
                }
            }["EditChannelDialog.useEffect"], [
                channel
            ]);
            const handleSubmit = (e) => {
                e.preventDefault();
                if (!channel || !name.trim()) return;
                updateChannel({
                    channelId: channel.id,
                    name: name.trim()
                }, {
                    onSuccess: () => {
                        onOpenChange(false);
                    }
                });
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: open,
                onOpenChange: onOpenChange,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "sm:max-w-[425px]",
                    children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            children: "Edit Channel"
                        }, void 0, false, {
                            fileName: "[project]/components/admin/EditChannelDialog.tsx",
                            lineNumber: 57,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            children: "Update the channel name."
                        }, void 0, false, {
                            fileName: "[project]/components/admin/EditChannelDialog.tsx",
                            lineNumber: 58,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/EditChannelDialog.tsx",
                        lineNumber: 56,
                        columnNumber: 17
                    }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "name",
                                    children: "Channel Name"
                                }, void 0, false, {
                                    fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                    lineNumber: 65,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500 font-bold",
                                        children: "#"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                        lineNumber: 67,
                                        columnNumber: 33
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "name",
                                        value: name,
                                        onChange: (e) => setName(e.target.value),
                                        placeholder: "e.g. announcements",
                                        className: "flex-1",
                                        disabled: isPending
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                        lineNumber: 68,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                    lineNumber: 66,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                lineNumber: 64,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/admin/EditChannelDialog.tsx",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                onClick: () => onOpenChange(false),
                                disabled: isPending,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                lineNumber: 80,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "submit",
                                disabled: isPending || !name.trim(),
                                children: [
                                    isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "mr-2 h-4 w-4 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                        lineNumber: 89,
                                        columnNumber: 43
                                    }, this),
                                    "Save Changes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/admin/EditChannelDialog.tsx",
                                lineNumber: 88,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/admin/EditChannelDialog.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/admin/EditChannelDialog.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/admin/EditChannelDialog.tsx",
                    lineNumber: 55,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/admin/EditChannelDialog.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this);
        }
        _s(EditChannelDialog, "nObHZEKlm1ZqxEdQhL/4AR1TSdQ=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateChannel"]
            ];
        });
        _c = EditChannelDialog;
        var _c;
        __turbopack_context__.k.register(_c, "EditChannelDialog");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/ui/alert-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "AlertDialog",
            () => AlertDialog,
            "AlertDialogAction",
            () => AlertDialogAction,
            "AlertDialogCancel",
            () => AlertDialogCancel,
            "AlertDialogContent",
            () => AlertDialogContent,
            "AlertDialogDescription",
            () => AlertDialogDescription,
            "AlertDialogFooter",
            () => AlertDialogFooter,
            "AlertDialogHeader",
            () => AlertDialogHeader,
            "AlertDialogOverlay",
            () => AlertDialogOverlay,
            "AlertDialogPortal",
            () => AlertDialogPortal,
            "AlertDialogTitle",
            () => AlertDialogTitle,
            "AlertDialogTrigger",
            () => AlertDialogTrigger
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        'use client';
        ;
        ;
        ;
        ;
        function AlertDialog({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                "data-slot": "alert-dialog",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 12,
                columnNumber: 10
            }, this);
        }
        _c = AlertDialog;
        function AlertDialogTrigger({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
                "data-slot": "alert-dialog-trigger",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this);
        }
        _c1 = AlertDialogTrigger;
        function AlertDialogPortal({ ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
                "data-slot": "alert-dialog-portal",
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this);
        }
        _c2 = AlertDialogPortal;
        function AlertDialogOverlay({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
                "data-slot": "alert-dialog-overlay",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, this);
        }
        _c3 = AlertDialogOverlay;
        function AlertDialogContent({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogPortal, {
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogOverlay, {}, void 0, false, {
                    fileName: "[project]/components/ui/alert-dialog.tsx",
                    lineNumber: 53,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                    "data-slot": "alert-dialog-content",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                    ...props
                }, void 0, false, {
                    fileName: "[project]/components/ui/alert-dialog.tsx",
                    lineNumber: 54,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 52,
                columnNumber: 5
            }, this);
        }
        _c4 = AlertDialogContent;
        function AlertDialogHeader({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "alert-dialog-header",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 71,
                columnNumber: 5
            }, this);
        }
        _c5 = AlertDialogHeader;
        function AlertDialogFooter({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-slot": "alert-dialog-footer",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 84,
                columnNumber: 5
            }, this);
        }
        _c6 = AlertDialogFooter;
        function AlertDialogTitle({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
                "data-slot": "alert-dialog-title",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg font-semibold', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 100,
                columnNumber: 5
            }, this);
        }
        _c7 = AlertDialogTitle;
        function AlertDialogDescription({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
                "data-slot": "alert-dialog-description",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 113,
                columnNumber: 5
            }, this);
        }
        _c8 = AlertDialogDescription;
        function AlertDialogAction({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])(), className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 126,
                columnNumber: 5
            }, this);
        }
        _c9 = AlertDialogAction;
        function AlertDialogCancel({ className, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cancel"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
                    variant: 'outline'
                }), className),
                ...props
            }, void 0, false, {
                fileName: "[project]/components/ui/alert-dialog.tsx",
                lineNumber: 138,
                columnNumber: 5
            }, this);
        }
        _c10 = AlertDialogCancel;
        ;
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
        __turbopack_context__.k.register(_c, "AlertDialog");
        __turbopack_context__.k.register(_c1, "AlertDialogTrigger");
        __turbopack_context__.k.register(_c2, "AlertDialogPortal");
        __turbopack_context__.k.register(_c3, "AlertDialogOverlay");
        __turbopack_context__.k.register(_c4, "AlertDialogContent");
        __turbopack_context__.k.register(_c5, "AlertDialogHeader");
        __turbopack_context__.k.register(_c6, "AlertDialogFooter");
        __turbopack_context__.k.register(_c7, "AlertDialogTitle");
        __turbopack_context__.k.register(_c8, "AlertDialogDescription");
        __turbopack_context__.k.register(_c9, "AlertDialogAction");
        __turbopack_context__.k.register(_c10, "AlertDialogCancel");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/CommunitySettingsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "CommunitySettingsView",
            () => CommunitySettingsView
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useToggleCommunity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/admin/useToggleCommunity.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/switch.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/label.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AddChannelDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/AddChannelDialog.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$EditChannelDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/EditChannelDialog.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/admin/useAdminChannels.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert-dialog.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function CommunitySettingsView({ courseId, courseTitle, communityEnabled: initialEnabled, channels, onBack }) {
            _s();
            const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialEnabled);
            const [isAddDialogOpen, setIsAddDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [isEditDialogOpen, setIsEditDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [selectedChannel, setSelectedChannel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
            const { mutate: toggleCommunity, isPending: isTogglePending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useToggleCommunity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleCommunity"])();
            const { mutate: deleteChannel, isPending: isDeletePending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteChannel"])();
            const handleToggle = (checked) => {
                toggleCommunity({
                    courseId,
                    enabled: checked
                }, {
                    onSuccess: () => {
                        setEnabled(checked);
                        if (checked) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Community enabled! Default channels have been created.");
                        } else {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Community disabled");
                        }
                    },
                    onError: () => {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to toggle community");
                    }
                });
            };
            const confirmDelete = (channel) => {
                setSelectedChannel(channel);
                setIsDeleteDialogOpen(true);
            };
            const handleDelete = () => {
                if (!selectedChannel) return;
                deleteChannel({
                    channelId: selectedChannel.id,
                    courseId
                }, {
                    onSuccess: () => {
                        setIsDeleteDialogOpen(false);
                        setSelectedChannel(null);
                    }
                });
            };
            const openEdit = (channel) => {
                setSelectedChannel(channel);
                setIsEditDialogOpen(true);
            };
            const getChannelIcon = (type) => {
                switch (type) {
                    case 'announcement':
                        return '📢';
                    case 'qa':
                        return '❓';
                    default:
                        return '💬';
                }
            };
            const getChannelColor = (type) => {
                switch (type) {
                    case 'announcement':
                        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
                    case 'qa':
                        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
                    default:
                        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
                }
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto p-6 space-y-6",
                    children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-slate-900 dark:text-slate-100",
                            children: "Community Settings"
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 116,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-600 dark:text-slate-400 mt-1",
                            children: [
                                "Manage community settings for ",
                                courseTitle
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 119,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                        lineNumber: 115,
                        columnNumber: 17
                    }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "flex items-center gap-2",
                                children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 128,
                                    columnNumber: 29
                                }, this),
                                    "Community Status"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 127,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                children: "Enable or disable community features for this course"
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 131,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 126,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-0.5",
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "community-toggle",
                                        className: "text-base",
                                        children: "Community Features"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 138,
                                        columnNumber: 33
                                    }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "Allow students to discuss and ask questions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 141,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 137,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                    id: "community-toggle",
                                    checked: enabled,
                                    onCheckedChange: handleToggle,
                                    disabled: isTogglePending
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 145,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 136,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 135,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                        lineNumber: 125,
                        columnNumber: 17
                    }, this),
                        enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "Channels"
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 161,
                                            columnNumber: 37
                                        }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "Manage discussion channels for your course"
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 162,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 160,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        onClick: () => setIsAddDialogOpen(true),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-4 w-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 167,
                                            columnNumber: 37
                                        }, this),
                                            "Add Channel"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 166,
                                        columnNumber: 33
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 159,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: channels.map((channel) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: getChannelIcon(channel.type)
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 180,
                                                columnNumber: 45
                                            }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-slate-900 dark:text-slate-100",
                                                        children: [
                                                            "#",
                                                            channel.name
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 53
                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        className: getChannelColor(channel.type),
                                                        children: channel.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 53
                                                    }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 49
                                                }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-600 dark:text-slate-400",
                                                    children: channel.description || "No description"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 49
                                                }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 181,
                                                columnNumber: 45
                                            }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 179,
                                            columnNumber: 41
                                        }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: () => openEdit(channel),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 196,
                                                columnNumber: 45
                                            }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "sm",
                                                className: "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
                                                onClick: () => confirmDelete(channel),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 203,
                                                columnNumber: 45
                                            }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 195,
                                            columnNumber: 41
                                        }, this)
                                        ]
                                    }, channel.id, true, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 175,
                                        columnNumber: 37
                                    }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 173,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 172,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 157,
                            columnNumber: 21
                        }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                className: "w-5 h-5 text-blue-600 dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 225,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 224,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 223,
                                        columnNumber: 29
                                    }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-semibold text-blue-900 dark:text-blue-100",
                                            children: "About Community Features"
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 229,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-blue-800 dark:text-blue-200",
                                            children: "When enabled, students can participate in discussions, ask questions, and interact with each other. As an instructor, you can post announcements and moderate conversations."
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                            lineNumber: 232,
                                            columnNumber: 33
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 228,
                                        columnNumber: 29
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 222,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 221,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 220,
                            columnNumber: 17
                        }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$AddChannelDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddChannelDialog"], {
                            open: isAddDialogOpen,
                            onOpenChange: setIsAddDialogOpen,
                            courseId: courseId
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 242,
                            columnNumber: 17
                        }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$EditChannelDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditChannelDialog"], {
                            open: isEditDialogOpen,
                            onOpenChange: setIsEditDialogOpen,
                            channel: selectedChannel
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 248,
                            columnNumber: 17
                        }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
                            open: isDeleteDialogOpen,
                            onOpenChange: setIsDeleteDialogOpen,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                                children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                                    children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                        children: "Delete Channel?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 257,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                        children: [
                                            "Are you sure you want to delete ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold",
                                                children: [
                                                    "#",
                                                    selectedChannel?.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 259,
                                                columnNumber: 65
                                            }, this),
                                            "? This action cannot be undone and all messages in this channel will be permanently deleted."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 258,
                                        columnNumber: 29
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 256,
                                    columnNumber: 25
                                }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                                    children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                        disabled: isDeletePending,
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 264,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                        onClick: (e) => {
                                            e.preventDefault();
                                            handleDelete();
                                        },
                                        className: "bg-red-600 hover:bg-red-700",
                                        disabled: isDeletePending,
                                        children: isDeletePending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                                lineNumber: 275,
                                                columnNumber: 41
                                            }, this),
                                                "Deleting..."
                                            ]
                                        }, void 0, true) : "Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                        lineNumber: 265,
                                        columnNumber: 29
                                    }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                    lineNumber: 263,
                                    columnNumber: 25
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                                lineNumber: 255,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunitySettingsView.tsx",
                            lineNumber: 254,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/community/CommunitySettingsView.tsx",
                    lineNumber: 114,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/community/CommunitySettingsView.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this);
        }
        _s(CommunitySettingsView, "oRlZGUqNWMzf4S4/gqHj2+x8w/E=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useToggleCommunity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToggleCommunity"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteChannel"]
            ];
        });
        _c = CommunitySettingsView;
        var _c;
        __turbopack_context__.k.register(_c, "CommunitySettingsView");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/community/CommunityModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "CommunityModal",
            () => CommunityModal
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/community/index.tsx [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$ChannelSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/ChannelSidebar.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageList.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageInput.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useEnrolledCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useEnrolledCourses.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminCoursesWithChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/admin/useAdminCoursesWithChannels.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/community/index.ts [app-client] (ecmascript) <locals>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/community/useBookmarks.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/MessageCard.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$CommunitySettingsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/CommunitySettingsView.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/at-sign.js [app-client] (ecmascript) <export default as AtSign>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
        var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUser.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CommunityModalContext.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function CommunityModal() {
            _s();
            const { isOpen, closeCommunity, options } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommunityModal"])();
            const { user, profile, loading: userLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"])();
            const isAdmin = options?.isAdmin || false;
            // Data fetching
            const { data: studentCourses, isLoading: studentLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useEnrolledCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrolledCourses"])(user?.id);
            const { data: adminCourses, isLoading: adminLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminCoursesWithChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminCoursesWithChannels"])(user?.id);
            const enrolledCourses = isAdmin ? adminCourses : studentCourses;
            const coursesLoading = isAdmin ? adminLoading : studentLoading;
            const { data: mentions = [], isLoading: mentionsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMentions"])();
            const { data: bookmarks = [], isLoading: bookmarksLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookmarkedMessages"])();
            const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('channels');
            const [activeChannelId, setActiveChannelId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
            const [selectedCourseId, setSelectedCourseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
            const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            // Get all channels from all enrolled courses
            const allChannels = enrolledCourses?.flatMap((course) => course.channels || []) || [];
            // Only show active channels in the sidebar
            const visibleChannels = allChannels.filter((c) => c.is_active);
            const activeChannel = allChannels.find((c) => c.id === activeChannelId);
            // Get the course for the active channel or use the selected course
            const activeCourse = enrolledCourses?.find((course) => course.id === selectedCourseId || course.channels?.some((ch) => ch.id === activeChannelId));
            const canPost = activeChannel && (profile?.role === 'admin' || profile?.role === 'instructor' || profile?.role === 'creator' || activeChannel.type !== 'announcement');
            // Initial setup when opening
            // Initial setup when opening
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "CommunityModal.useEffect": () => {
                    if (isOpen) {
                        // Priority: Options -> Existing Selected -> First Available
                        let targetCourseId = options?.courseId || selectedCourseId || enrolledCourses?.[0]?.id;
                        if (targetCourseId) {
                            setSelectedCourseId(targetCourseId);
                            // If the selected course has active channels, select the default one
                            // UNLESS we are simply navigating back to a course we were already on? 
                            // Actually, if activeChannelId is already set and belongs to this course, keep it.
                            // Otherwise, find default.
                            const courseChannels = visibleChannels.filter({
                                "CommunityModal.useEffect.courseChannels": (c) => c.course_id === targetCourseId
                            }["CommunityModal.useEffect.courseChannels"]);
                            const currentChannelValid = activeChannelId && courseChannels.some({
                                "CommunityModal.useEffect": (c) => c.id === activeChannelId
                            }["CommunityModal.useEffect"]);
                            if (!currentChannelValid && courseChannels.length > 0) {
                                const defaultChannel = courseChannels.find({
                                    "CommunityModal.useEffect": (c) => c.type === 'announcement'
                                }["CommunityModal.useEffect"]) || courseChannels.find({
                                    "CommunityModal.useEffect": (c) => c.type === 'discussion'
                                }["CommunityModal.useEffect"]) || courseChannels[0];
                                setActiveChannelId(defaultChannel.id);
                                setActiveView('channels');
                            } else if (!currentChannelValid) {
                                // No channels for this course
                                setActiveChannelId(null);
                                setActiveView('channels');
                            }
                        }
                    }
                }
            }["CommunityModal.useEffect"], [
                isOpen,
                options,
                visibleChannels,
                enrolledCourses
            ]);
            // Handle course selection from sidebar
            const handleCourseSelect = (courseId) => {
                setSelectedCourseId(courseId);
                // Find default channel for this course
                const courseChannels = visibleChannels.filter((c) => c.course_id === courseId);
                if (courseChannels.length > 0) {
                    const defaultChannel = courseChannels.find((c) => c.type === 'announcement') || courseChannels.find((c) => c.type === 'discussion') || courseChannels[0];
                    setActiveChannelId(defaultChannel.id);
                } else {
                    setActiveChannelId(null);
                }
                setActiveView('channels');
            };
            // Close sidebar when channel is selected on mobile
            const handleChannelSelect = (channelId) => {
                setActiveChannelId(channelId);
                // Also ensure course is selected
                const channel = visibleChannels.find((c) => c.id === channelId);
                if (channel) {
                    setSelectedCourseId(channel.course_id);
                }
                setActiveView('channels');
                setIsSidebarOpen(false);
            };
            const handleViewChange = (view) => {
                setActiveView(view);
                setIsSidebarOpen(false);
            };
            if (!isOpen) return null;
            if (userLoading || coursesLoading) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-4",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-12 h-12 animate-spin text-white mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 132,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white font-medium",
                            children: "Loading community..."
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 133,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 131,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/community/CommunityModal.tsx",
                    lineNumber: 130,
                    columnNumber: 13
                }, this);
            }
            if (!enrolledCourses || enrolledCourses.length === 0) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl relative",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: "absolute top-2 right-2 hover:bg-slate-100 dark:hover:bg-slate-800",
                            onClick: closeCommunity,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 149,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 143,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-4",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10 flex items-center justify-center mx-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-5xl",
                                    children: "📚"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 153,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 152,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold",
                                children: "No Community Channels"
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 155,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "No community channels are available yet."
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 156,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: closeCommunity,
                                className: "w-full",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 159,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 142,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/community/CommunityModal.tsx",
                    lineNumber: 141,
                    columnNumber: 13
                }, this);
            }
            // Render different views
            const renderContent = () => {
                if (activeView === 'settings' && activeCourse && isAdmin) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-16 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center px-6 justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "md:hidden",
                                    onClick: () => setIsSidebarOpen(true),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 176,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 175,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-lg",
                                    children: "Settings"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 178,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 174,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 173,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$CommunitySettingsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommunitySettingsView"], {
                            courseId: activeCourse.id,
                            courseTitle: activeCourse.title,
                            communityEnabled: activeCourse.community_enabled,
                            channels: activeCourse.channels || [],
                            onBack: () => setActiveView('channels')
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 182,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 172,
                        columnNumber: 17
                    }, this);
                }
                if (activeView === 'mentions') {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col overflow-hidden",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-16 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "md:hidden mr-4",
                                onClick: () => setIsSidebarOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 198,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 197,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__["AtSign"], {
                                        className: "w-5 h-5 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 202,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 201,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-lg",
                                        children: "Mentions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 205,
                                        columnNumber: 33
                                    }, this),
                                        mentions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                mentions.length,
                                                " ",
                                                mentions.length === 1 ? 'mention' : 'mentions'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/community/CommunityModal.tsx",
                                            lineNumber: 207,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 204,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 200,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 196,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: mentionsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-8 h-8 animate-spin text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 216,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 215,
                                columnNumber: 29
                            }, this) : mentions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center h-full text-center p-8",
                                children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$at$2d$sign$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AtSign$3e$__["AtSign"], {
                                        className: "w-12 h-12 text-blue-500 dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 221,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 220,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-2",
                                    children: "No Mentions Yet"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 223,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground max-w-sm",
                                    children: "When someone mentions you in a message, it will appear here."
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 224,
                                    columnNumber: 33
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 219,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: mentions.map((message) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageCard"], {
                                    message: message,
                                    isOwnMessage: message.user_id === user?.id,
                                    channelId: message.channel_id
                                }, message.id, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 231,
                                    columnNumber: 37
                                }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 229,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 213,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 195,
                        columnNumber: 17
                    }, this);
                }
                if (activeView === 'bookmarks') {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col overflow-hidden",
                        children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-16 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm",
                            children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "md:hidden mr-4",
                                onClick: () => setIsSidebarOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 250,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 249,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                        className: "w-5 h-5 text-white fill-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 254,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 253,
                                    columnNumber: 29
                                }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-lg",
                                        children: "Bookmarks"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 257,
                                        columnNumber: 33
                                    }, this),
                                        bookmarks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                bookmarks.length,
                                                " ",
                                                bookmarks.length === 1 ? 'bookmark' : 'bookmarks'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/community/CommunityModal.tsx",
                                            lineNumber: 259,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 256,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 252,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 248,
                            columnNumber: 21
                        }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: bookmarksLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-8 h-8 animate-spin text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 268,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 267,
                                columnNumber: 29
                            }, this) : bookmarks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center h-full text-center p-8",
                                children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-24 h-24 rounded-full bg-linear-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10 flex items-center justify-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                        className: "w-12 h-12 text-amber-500 dark:text-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 273,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 272,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold mb-2",
                                    children: "No Bookmarks Yet"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 275,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground max-w-sm",
                                    children: "Save important messages by clicking the bookmark icon."
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 276,
                                    columnNumber: 33
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 271,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: bookmarks.map((bookmark) =>/*#__PURE__*/(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageCard"], {
                                    message: bookmark.message,
                                    isOwnMessage: bookmark.message.user_id === user?.id,
                                    channelId: bookmark.message.channel_id
                                }, bookmark.bookmarkId, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 283,
                                    columnNumber: 37
                                }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 281,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 265,
                            columnNumber: 21
                        }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 247,
                        columnNumber: 17
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col min-w-0 overflow-hidden",
                    children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-16 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center px-6 justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm",
                        children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "md:hidden hover:bg-slate-100 dark:hover:bg-slate-800",
                                onClick: () => setIsSidebarOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 302,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 301,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-6 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block"
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 305,
                                columnNumber: 25
                            }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-2 h-2 rounded-full", activeChannel?.type === 'announcement' ? "bg-blue-500" : activeChannel?.type === 'qa' ? "bg-purple-500" : "bg-emerald-500")
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 308,
                                    columnNumber: 29
                                }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-slate-900 dark:text-slate-100",
                                        children: [
                                            "#",
                                            activeChannel?.name || 'Select a channel'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 314,
                                        columnNumber: 33
                                    }, this),
                                        activeCourse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500 dark:text-slate-400",
                                            children: activeCourse.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunityModal.tsx",
                                            lineNumber: 318,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 313,
                                    columnNumber: 29
                                }, this),
                                    activeChannel?.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 hidden lg:inline-block ml-2",
                                        children: [
                                            "— ",
                                            activeChannel.description
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 324,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 307,
                                columnNumber: 25
                            }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 300,
                            columnNumber: 21
                        }, this),
                            isAdmin && activeCourse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 mr-12",
                                onClick: () => setActiveView('settings'),
                                children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 339,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:inline",
                                    children: "Settings"
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 340,
                                    columnNumber: 29
                                }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 333,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 299,
                        columnNumber: 17
                    }, this),
                        activeChannelId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageList"], {
                                channelId: activeChannelId
                            }, void 0, false, {
                                fileName: "[project]/components/community/CommunityModal.tsx",
                                lineNumber: 347,
                                columnNumber: 25
                            }, this),
                                canPost ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$MessageInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageInput"], {
                                    channelId: activeChannelId
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 349,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border-t border-slate-200 dark:border-slate-800 bg-amber-50/50 dark:bg-amber-900/10 text-center text-sm text-amber-800 dark:text-amber-200 backdrop-blur-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-2",
                                        children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/components/community/CommunityModal.tsx",
                                                lineNumber: 354,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunityModal.tsx",
                                            lineNumber: 353,
                                            columnNumber: 37
                                        }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Only instructors can post in this announcement channel"
                                        }, void 0, false, {
                                            fileName: "[project]/components/community/CommunityModal.tsx",
                                            lineNumber: 356,
                                            columnNumber: 37
                                        }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/community/CommunityModal.tsx",
                                        lineNumber: 352,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/community/CommunityModal.tsx",
                                    lineNumber: 351,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/community/CommunityModal.tsx",
                    lineNumber: 298,
                    columnNumber: 13
                }, this);
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 animate-in slide-in-from-bottom duration-300",
                    children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$ChannelSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChannelSidebar"], {
                        channels: visibleChannels,
                        activeChannelId: activeChannelId,
                        onSelectChannel: handleChannelSelect,
                        courseId: selectedCourseId || enrolledCourses?.[0]?.id || '',
                        enrolledCourses: enrolledCourses || [],
                        isOpen: isSidebarOpen,
                        onClose: () => setIsSidebarOpen(false),
                        isAdmin: isAdmin,
                        onViewChange: (view) => handleViewChange(view),
                        onSelectCourse: handleCourseSelect
                    }, void 0, false, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 369,
                        columnNumber: 17
                    }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "fixed top-4 right-4 z-10 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg",
                        onClick: closeCommunity,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/components/community/CommunityModal.tsx",
                            lineNumber: 389,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/community/CommunityModal.tsx",
                        lineNumber: 383,
                        columnNumber: 17
                    }, this),
                        renderContent()
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/community/CommunityModal.tsx",
                    lineNumber: 368,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/community/CommunityModal.tsx",
                lineNumber: 367,
                columnNumber: 9
            }, this);
        }
        _s(CommunityModal, "jmEvu8WbHPdScrhz6xSd8Eyos6A=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCommunityModal"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUser"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useEnrolledCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrolledCourses"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$admin$2f$useAdminCoursesWithChannels$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminCoursesWithChannels"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMentions"],
                __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$community$2f$useBookmarks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookmarkedMessages"]
            ];
        });
        _c = CommunityModal;
        var _c;
        __turbopack_context__.k.register(_c, "CommunityModal");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/app/admin/AdminClientLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

        __turbopack_context__.s([
            "default",
            () => AdminClientLayout
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/components/layout/Sidebar.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/components/layout/Header.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/admin/components/layout/MobileNav.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/CommunityModalContext.tsx [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$CommunityModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/community/CommunityModal.tsx [app-client] (ecmascript)");
        ;
        var _s = __turbopack_context__.k.signature();
        "use client";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        function AdminClientLayout({ profile, links, children }) {
            _s();
            const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
            const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
            const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
            const chartData = [
                {
                    name: "Mon",
                    users: 400,
                    exams: 240
                },
                {
                    name: "Tue",
                    users: 300,
                    exams: 139
                },
                {
                    name: "Wed",
                    users: 200,
                    exams: 380
                },
                {
                    name: "Thu",
                    users: 278,
                    exams: 390
                },
                {
                    name: "Fri",
                    users: 189,
                    exams: 480
                },
                {
                    name: "Sat",
                    users: 239,
                    exams: 380
                },
                {
                    name: "Sun",
                    users: 349,
                    exams: 430
                }
            ];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "AdminClientLayout.useEffect": () => {
                    const saved = localStorage.getItem("m4c_theme");
                    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
                    const initial = saved || (prefersDark ? "dark" : "light");
                    setTheme(initial);
                    applyTheme(initial);
                }
            }["AdminClientLayout.useEffect"], []);
            function applyTheme(t) {
                const root = document.documentElement;
                if (t === "dark") root.classList.add("dark");
                else root.classList.remove("dark");
            }
            function toggleTheme() {
                const next = theme === "light" ? "dark" : "light";
                setTheme(next);
                localStorage.setItem("m4c_theme", next);
                applyTheme(next);
            }
            const cardVariants = {
                hidden: {
                    opacity: 0,
                    y: 20
                },
                visible: {
                    opacity: 1,
                    y: 0
                }
            };
            const handleLogout = async () => {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                await supabase.auth.signOut();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirect"])("/auth/login");
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$CommunityModalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommunityModalProvider"], {
                children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-linear-to-br from-white via-sky-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-black transition-colors duration-700",
                    children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        menuItems: links,
                        sidebarCollapsed: sidebarCollapsed,
                        setSidebarCollapsed: setSidebarCollapsed,
                        profile: profile
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClientLayout.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        theme: theme,
                        toggleTheme: toggleTheme,
                        sidebarCollapsed: sidebarCollapsed,
                        profile: profile,
                        setSidebarCollapsed: setSidebarCollapsed
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClientLayout.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: `flex-1 p-4 md:p-6 mt-16 pb-24 md:pb-8 transition-all duration-500 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`,
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClientLayout.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$admin$2f$components$2f$layout$2f$MobileNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        theme: theme,
                        toggleTheme: toggleTheme,
                        links: links,
                        profile: profile
                    }, void 0, false, {
                        fileName: "[project]/app/admin/AdminClientLayout.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/admin/AdminClientLayout.tsx",
                    lineNumber: 74,
                    columnNumber: 7
                }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$community$2f$CommunityModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommunityModal"], {}, void 0, false, {
                    fileName: "[project]/app/admin/AdminClientLayout.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/AdminClientLayout.tsx",
                lineNumber: 73,
                columnNumber: 5
            }, this);
        }
        _s(AdminClientLayout, "t8BCwe0ZZ96Ic6qLjMaqi8l7STc=");
        _c = AdminClientLayout;
        var _c;
        __turbopack_context__.k.register(_c, "AdminClientLayout");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
    "[project]/components/admin/AdminAppContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
        "use strict";

/**
 * HYBRID SPA PATTERN - Admin App Container
 * 
 * This component handles admin route navigation purely on the client for instant transitions.
 */ __turbopack_context__.s([
            "AdminAppContainer",
            () => AdminAppContainer
        ]);
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
        var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var _s = __turbopack_context__.k.signature();
        'use client';
        ;
        ;
        ;
        ;
        // Dynamically import page components
        const DashboardPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/dashboard/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/dashboard/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c = DashboardPage;
        const CoursesPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/courses/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/courses/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c1 = CoursesPage;
        const TestSeriesPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/test-series/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/test-series/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c2 = TestSeriesPage;
        const QuestionBankPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/question-bank/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/question-bank/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c3 = QuestionBankPage;
        const ExamsPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/exams/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/exams/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c4 = ExamsPage;
        const PaymentsPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/payments/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/payments/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c5 = PaymentsPage;
        const StudentsPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/students/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/students/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c6 = StudentsPage;
        const SettingsPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(() => __turbopack_context__.A("[project]/app/admin/settings/page.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
            loadableGenerated: {
                modules: [
                    "[project]/app/admin/settings/page.tsx [app-client] (ecmascript, next/dynamic entry)"
                ]
            },
            ssr: false
        });
        _c7 = SettingsPage;
        function AdminAppContainer({ initialRoute, children }) {
            _s();
            const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
            const [currentRoute, setCurrentRoute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialRoute || pathname || '/admin/dashboard');
            // Sync state with URL (handles browser back/forward and initial hit)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "AdminAppContainer.useEffect": () => {
                    if (pathname && pathname !== currentRoute) {
                        setCurrentRoute(pathname);
                    }
                }
            }["AdminAppContainer.useEffect"], [
                pathname,
                currentRoute
            ]);
            const navigateTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
                "AdminAppContainer.useCallback[navigateTo]": (route) => {
                    if (route === currentRoute) return;
                    // Update URL and state
                    window.history.pushState({}, '', route);
                    setCurrentRoute(route);
                    // Scroll to top on navigation for better UX
                    window.scrollTo(0, 0);
                }
            }["AdminAppContainer.useCallback[navigateTo]"], [
                currentRoute
            ]);
            // Expose navigation function globally for SmartLink
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
                "AdminAppContainer.useEffect": () => {
                    window.__adminNavigate = navigateTo;
                    return ({
                        "AdminAppContainer.useEffect": () => {
                            delete window.__adminNavigate;
                        }
                    })["AdminAppContainer.useEffect"];
                }
            }["AdminAppContainer.useEffect"], [
                navigateTo
            ]);
            const renderPage = () => {
                // SPA Routing for exact matches only
                if (currentRoute === '/admin/dashboard') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 63,
                    columnNumber: 57
                }, this);
                if (currentRoute === '/admin/courses') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoursesPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 64,
                    columnNumber: 55
                }, this);
                if (currentRoute === '/admin/test-series') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TestSeriesPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 65,
                    columnNumber: 59
                }, this);
                if (currentRoute === '/admin/question-bank') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionBankPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 66,
                    columnNumber: 61
                }, this);
                if (currentRoute === '/admin/exams') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExamsPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 67,
                    columnNumber: 53
                }, this);
                if (currentRoute === '/admin/payments') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentsPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 68,
                    columnNumber: 56
                }, this);
                if (currentRoute === '/admin/students') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentsPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 69,
                    columnNumber: 56
                }, this);
                if (currentRoute === '/admin/settings') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsPage, {}, void 0, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 70,
                    columnNumber: 56
                }, this);
                // For dynamic routes (like course pages), use standard Next.js routing
                // This allows server components to work properly
                return children;
            };
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                initial: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 5
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    exit: {
                        opacity: 0,
                        x: -5
                    },
                    transition: {
                        duration: 0.15,
                        ease: "easeOut"
                    },
                    className: "admin-app-container w-full h-full",
                    children: renderPage()
                }, currentRoute, false, {
                    fileName: "[project]/components/admin/AdminAppContainer.tsx",
                    lineNumber: 79,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/admin/AdminAppContainer.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this);
        }
        _s(AdminAppContainer, "q+0hz30pDePy7Iw+PWJfdR9Gyqg=", false, function () {
            return [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
            ];
        });
        _c8 = AdminAppContainer;
        var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
        __turbopack_context__.k.register(_c, "DashboardPage");
        __turbopack_context__.k.register(_c1, "CoursesPage");
        __turbopack_context__.k.register(_c2, "TestSeriesPage");
        __turbopack_context__.k.register(_c3, "QuestionBankPage");
        __turbopack_context__.k.register(_c4, "ExamsPage");
        __turbopack_context__.k.register(_c5, "PaymentsPage");
        __turbopack_context__.k.register(_c6, "StudentsPage");
        __turbopack_context__.k.register(_c7, "SettingsPage");
        __turbopack_context__.k.register(_c8, "AdminAppContainer");
        if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
            __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
        }
    }),
]);

//# sourceMappingURL=_615f2ea2._.js.map