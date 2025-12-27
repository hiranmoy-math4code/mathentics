(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/student/useStudentCourses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudentCourses",
    ()=>useStudentCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useStudentCourses(userId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "student-courses",
            userId
        ],
        queryFn: {
            "useStudentCourses.useQuery": async ({ signal })=>{
                if (!userId) {
                    return [];
                }
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // ✅ OPTIMIZED: Direct query instead of RPC function
                // Progress is already calculated by trigger!
                const { data: enrollments, error } = await supabase.from('enrollments').select(`
                    id,
                    course_id,
                    progress_percentage,
                    last_accessed_at,
                    status,
                    courses (
                        id,
                        title,
                        description,
                        thumbnail_url,
                        course_type
                    )
                `).eq('user_id', userId).in('status', [
                    'active',
                    'completed'
                ]).order('last_accessed_at', {
                    ascending: false,
                    nullsFirst: false
                }).abortSignal(signal);
                if (error) {
                    // Ignore AbortError caused by navigation
                    if (error.code === '20' || error.message.includes('AbortError') || error.message.includes('aborted')) {
                        return [];
                    }
                    console.error('Error fetching student courses:', error);
                    throw error;
                }
                if (!enrollments || enrollments.length === 0) {
                    return [];
                }
                // Get course IDs for batch queries
                const courseIds = enrollments.map({
                    "useStudentCourses.useQuery.courseIds": (e)=>e.course_id
                }["useStudentCourses.useQuery.courseIds"]);
                // ✅ OPTIMIZED: Batch query for lesson counts (cached)
                const { data: lessonsData } = await supabase.from('modules').select(`
                    course_id,
                    lessons!inner(id)
                `).in('course_id', courseIds).abortSignal(signal);
                // ✅ OPTIMIZED: Batch query for completed lessons (cached)
                const { data: completedData } = await supabase.from('lesson_progress').select('course_id, lesson_id').eq('user_id', userId).eq('completed', true).in('course_id', courseIds).abortSignal(signal);
                // Calculate lesson counts per course
                const lessonCounts = {};
                const completedCounts = {};
                lessonsData?.forEach({
                    "useStudentCourses.useQuery": (module)=>{
                        const courseId = module.course_id;
                        lessonCounts[courseId] = (lessonCounts[courseId] || 0) + (module.lessons?.length || 0);
                    }
                }["useStudentCourses.useQuery"]);
                completedData?.forEach({
                    "useStudentCourses.useQuery": (progress)=>{
                        const courseId = progress.course_id;
                        completedCounts[courseId] = (completedCounts[courseId] || 0) + 1;
                    }
                }["useStudentCourses.useQuery"]);
                // Map enrollments to courses with progress data
                const courses = enrollments.filter({
                    "useStudentCourses.useQuery.courses": (e)=>e.courses?.course_type === 'course'
                }["useStudentCourses.useQuery.courses"]) // Only courses, not test series
                .map({
                    "useStudentCourses.useQuery.courses": (enrollment)=>({
                            id: enrollment.courses.id,
                            title: enrollment.courses.title,
                            description: enrollment.courses.description,
                            thumbnail_url: enrollment.courses.thumbnail_url,
                            course_type: enrollment.courses.course_type,
                            progress_percentage: enrollment.progress_percentage || 0,
                            last_accessed_at: enrollment.last_accessed_at,
                            total_lessons: lessonCounts[enrollment.course_id] || 0,
                            completed_lessons: completedCounts[enrollment.course_id] || 0
                        })
                }["useStudentCourses.useQuery.courses"]);
                return courses;
            }
        }["useStudentCourses.useQuery"],
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
}
_s(useStudentCourses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/lesson.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchLessonDetailedData",
    ()=>fetchLessonDetailedData
]);
async function fetchLessonDetailedData(supabase, lessonId, courseId, userId) {
    // 1. Get Core Lesson Details
    const { data: lesson, error } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
    if (error || !lesson) {
        console.error("Lesson fetch error:", error);
        return {
            error: "Lesson not found"
        };
    }
    const result = {
        lesson
    };
    // 2. Fetch Additional Type-Specific Data
    try {
        if (lesson.content_type === 'quiz' && lesson.exam_id) {
            // Fetch Exam Data
            const [examResult, sectionsResult] = await Promise.all([
                supabase.from("exams").select("*").eq("id", lesson.exam_id).single(),
                supabase.from("sections").select("id, questions:questions(id)").eq("exam_id", lesson.exam_id)
            ]);
            result.exam = examResult.data;
            // Calculate Question Count
            const sections = sectionsResult.data || [];
            result.questionsCount = sections.reduce((acc, section)=>acc + (section.questions?.length || 0), 0);
            // Fetch User Attempts
            if (userId) {
                const { data: attempts } = await supabase.from("exam_attempts").select("*").eq("exam_id", lesson.exam_id).eq("student_id", userId);
                result.attempts = attempts || [];
            }
        }
        // 3. Fetch Course/Author Context (optional, don't fail if this errors)
        if (courseId) {
            try {
                const { data: course } = await supabase.from("courses").select("user_id").eq("id", courseId).single();
                if (course?.user_id) {
                    const { data: author } = await supabase.from("profiles").select("*").eq("id", course.user_id).single();
                    result.author = author;
                }
            } catch (authorError) {
                // Ignore author fetch errors - not critical
                console.warn("Could not fetch author:", authorError);
            }
        }
        return result;
    } catch (e) {
        console.error("Error fetching detailed lesson data:", e);
        return {
            error: "Failed to load lesson details"
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/usePrefetchCourse.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrefetchCourse",
    ()=>usePrefetchCourse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$lesson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/lesson.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function usePrefetchCourse() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const prefetchCourse = async (courseId)=>{
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            // 1. Prefetch course structure (modules + lessons)
            await queryClient.prefetchQuery({
                queryKey: [
                    'course-structure',
                    courseId
                ],
                queryFn: async ()=>{
                    const { data, error } = await supabase.rpc('get_course_structure', {
                        target_course_id: courseId
                    });
                    if (error) {
                        // Fallback to standard query
                        const { data: fallbackData } = await supabase.from('modules').select(`
                                id, 
                                title, 
                                module_order,
                                lessons (
                                    id, 
                                    title, 
                                    module_id, 
                                    content_type, 
                                    video_duration, 
                                    is_free_preview, 
                                    lesson_order, 
                                    is_live,
                                    created_at, 
                                    updated_at
                                )
                            `).eq('course_id', courseId).order('module_order', {
                            ascending: true
                        });
                        return fallbackData?.map((module)=>({
                                ...module,
                                lessons: (module.lessons || []).sort((a, b)=>a.lesson_order - b.lesson_order)
                            }));
                    }
                    return data;
                },
                staleTime: 1000 * 60 * 5
            });
            // 2. Get first lesson and prefetch its data
            const structure = queryClient.getQueryData([
                'course-structure',
                courseId
            ]);
            if (structure?.[0]?.lessons?.[0]) {
                const firstLesson = structure[0].lessons[0];
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    // Prefetch first lesson detailed data
                    await queryClient.prefetchQuery({
                        queryKey: [
                            'lesson',
                            firstLesson.id,
                            courseId
                        ],
                        queryFn: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$lesson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchLessonDetailedData"])(supabase, firstLesson.id, courseId, user.id),
                        staleTime: 1000 * 60 * 10
                    });
                }
            }
        } catch (error) {
            // Silent fail - prefetching is optional enhancement
            // Navigation will still work, just not instant
            console.debug('Prefetch failed:', error);
        }
    };
    return {
        prefetchCourse
    };
}
_s(usePrefetchCourse, "4R+oYVB2Uc11P7bp1KcuhpkfaTw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/student/ExpiryComponents.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardExpiryBadge",
    ()=>DashboardExpiryBadge,
    "ExpiredAccessBlocker",
    ()=>ExpiredAccessBlocker,
    "ExpiryWarningBanner",
    ()=>ExpiryWarningBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function ExpiryWarningBanner({ daysRemaining, expiresAt, courseTitle, courseId, urgencyLevel }) {
    const expiryDate = new Date(expiresAt);
    const urgencyConfig = {
        CRITICAL: {
            bg: 'bg-linear-to-r from-red-500 via-orange-500 to-red-600',
            text: 'text-white',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
            message: '⚡ URGENT: Your access expires TODAY!',
            animate: 'animate-pulse'
        },
        HIGH: {
            bg: 'bg-linear-to-r from-orange-500 via-amber-500 to-orange-600',
            text: 'text-white',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
            message: '⏰ Access expiring in ' + daysRemaining + ' days',
            animate: 'animate-bounce'
        },
        MEDIUM: {
            bg: 'bg-linear-to-r from-amber-500 via-yellow-500 to-amber-600',
            text: 'text-white',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
            message: 'Renew soon! Access expires in ' + daysRemaining + ' days',
            animate: ''
        },
        LOW: {
            bg: 'bg-linear-to-r from-blue-500 via-indigo-500 to-blue-600',
            text: 'text-white',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
            message: daysRemaining + ' days of access remaining',
            animate: ''
        }
    };
    const config = urgencyConfig[urgencyLevel];
    const Icon = config.icon;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative overflow-hidden rounded-xl p-6 shadow-xl mb-6', config.bg),
        children: [
            urgencyLevel === 'CRITICAL' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/20 animate-pulse"
            }, void 0, false, {
                fileName: "[project]/components/student/ExpiryComponents.tsx",
                lineNumber: 66,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex items-center justify-between gap-4 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-3 rounded-full bg-white/20', config.animate),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-6 h-6', config.text)
                                }, void 0, false, {
                                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                                    lineNumber: 72,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xl font-bold', config.text),
                                        children: config.message
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm mt-1 opacity-90', config.text),
                                        children: [
                                            "Expires on ",
                                            expiryDate.toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 78,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/courses/${courseId}/renew`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            size: "lg",
                            className: "bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                    className: "w-5 h-5 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                                    lineNumber: 96,
                                    columnNumber: 25
                                }, this),
                                "Renew Now"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/student/ExpiryComponents.tsx",
                            lineNumber: 92,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/student/ExpiryComponents.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this),
            urgencyLevel === 'CRITICAL' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 px-4 py-1 bg-red-700 text-white text-xs font-black uppercase tracking-wider",
                children: "Last Day!"
            }, void 0, false, {
                fileName: "[project]/components/student/ExpiryComponents.tsx",
                lineNumber: 104,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/student/ExpiryComponents.tsx",
        lineNumber: 60,
        columnNumber: 9
    }, this);
}
_c = ExpiryWarningBanner;
function ExpiredAccessBlocker({ courseTitle, courseId, expiredAt, courseThumbnail, coursePrice }) {
    const expiredDate = new Date(expiredAt);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800",
                children: [
                    courseThumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-48 bg-linear-to-br from-red-500 to-orange-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: courseThumbnail,
                                alt: courseTitle,
                                className: "w-full h-full object-cover opacity-30"
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 136,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 rounded-full bg-white/10 backdrop-blur-xl",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-16 h-16 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 143,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                                    lineNumber: 142,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 141,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                        lineNumber: 135,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-500/20 border-2 border-red-500 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-5 h-5 text-red-600 dark:text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 152,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-black uppercase text-sm text-red-600 dark:text-red-400 tracking-wider",
                                        children: "Access Expired"
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 153,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 151,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-black text-slate-900 dark:text-white mb-3",
                                children: "Your Access Has Ended"
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 158,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-slate-600 dark:text-slate-400 mb-6",
                                children: courseTitle
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-600 dark:text-slate-400 mb-2",
                                children: "Your enrollment expired on:"
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 165,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold text-slate-900 dark:text-white mb-8",
                                children: expiredDate.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 168,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-500/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                        className: "w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3"
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 178,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-slate-900 dark:text-white mb-2",
                                        children: "Want to continue learning?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 179,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400",
                                        children: "Re-enroll now to regain access to all course materials, lessons, and your progress!"
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 182,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 177,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 justify-center flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/courses/${courseId}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "lg",
                                            className: "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                    className: "w-5 h-5 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 37
                                                }, this),
                                                "Re-Enroll Now",
                                                coursePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2",
                                                    children: [
                                                        "• ₹",
                                                        coursePrice
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 53
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/student/ExpiryComponents.tsx",
                                            lineNumber: 190,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 189,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/student/dashboard",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "lg",
                                            variant: "outline",
                                            className: "font-semibold",
                                            children: "Back to Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/components/student/ExpiryComponents.tsx",
                                            lineNumber: 197,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                                        lineNumber: 196,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 188,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500 dark:text-slate-400 mt-6",
                                children: "💡 Your progress is saved! Re-enroll to pick up right where you left off."
                            }, void 0, false, {
                                fileName: "[project]/components/student/ExpiryComponents.tsx",
                                lineNumber: 203,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/student/ExpiryComponents.tsx",
                        lineNumber: 149,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/student/ExpiryComponents.tsx",
                lineNumber: 132,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/student/ExpiryComponents.tsx",
            lineNumber: 131,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/student/ExpiryComponents.tsx",
        lineNumber: 130,
        columnNumber: 9
    }, this);
}
_c1 = ExpiredAccessBlocker;
function DashboardExpiryBadge({ daysRemaining, isExpired, urgencyLevel }) {
    if (isExpired) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                    className: "w-3 h-3 text-red-600 dark:text-red-400"
                }, void 0, false, {
                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                    lineNumber: 223,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-bold text-red-600 dark:text-red-400",
                    children: "EXPIRED"
                }, void 0, false, {
                    fileName: "[project]/components/student/ExpiryComponents.tsx",
                    lineNumber: 224,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/student/ExpiryComponents.tsx",
            lineNumber: 222,
            columnNumber: 13
        }, this);
    }
    if (!daysRemaining || !urgencyLevel) return null;
    const urgencyColors = {
        CRITICAL: 'bg-red-100 dark:bg-red-500/20 border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400',
        HIGH: 'bg-orange-100 dark:bg-orange-500/20 border-orange-300 dark:border-orange-500/30 text-orange-600 dark:text-orange-400',
        MEDIUM: 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400',
        LOW: 'bg-blue-100 dark:bg-blue-500/20 border-blue-300 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-bold', urgencyColors[urgencyLevel], urgencyLevel === 'CRITICAL' && 'animate-pulse'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                className: "w-3 h-3"
            }, void 0, false, {
                fileName: "[project]/components/student/ExpiryComponents.tsx",
                lineNumber: 244,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    daysRemaining,
                    "d left"
                ]
            }, void 0, true, {
                fileName: "[project]/components/student/ExpiryComponents.tsx",
                lineNumber: 245,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/student/ExpiryComponents.tsx",
        lineNumber: 239,
        columnNumber: 9
    }, this);
}
_c2 = DashboardExpiryBadge;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ExpiryWarningBanner");
__turbopack_context__.k.register(_c1, "ExpiredAccessBlocker");
__turbopack_context__.k.register(_c2, "DashboardExpiryBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/actions/data:ad6e89 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00f84ea184b6b74ed81e5f0c8bfe6fc5466e4716b1":"getUserEnrollmentsWithExpiry"},"actions/checkEnrollmentStatus.ts",""] */ __turbopack_context__.s([
    "getUserEnrollmentsWithExpiry",
    ()=>getUserEnrollmentsWithExpiry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getUserEnrollmentsWithExpiry = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("00f84ea184b6b74ed81e5f0c8bfe6fc5466e4716b1", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getUserEnrollmentsWithExpiry"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vY2hlY2tFbnJvbGxtZW50U3RhdHVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gRU5ST0xMTUVOVCBTVEFUVVMgJiBFWFBJUlkgQ0hFQ0tcclxuLy8gU2VydmVyIGFjdGlvbnMgdG8gY2hlY2sgZW5yb2xsbWVudCBzdGF0dXMgYW5kIGV4cGlyeVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4ndXNlIHNlcnZlcic7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL2xpYi9zdXBhYmFzZS9zZXJ2ZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbnJvbGxtZW50U3RhdHVzIHtcclxuICAgIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICAgIHN0YXR1czogJ2FjdGl2ZScgfCAnZXhwaXJlZCcgfCAnbm9uZSc7XHJcbiAgICBleHBpcmVzQXQ6IHN0cmluZyB8IG51bGw7XHJcbiAgICBkYXlzUmVtYWluaW5nOiBudW1iZXIgfCBudWxsO1xyXG4gICAgaXNFeHBpcmluZ1Nvb246IGJvb2xlYW47XHJcbiAgICBpc0V4cGlyZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBzdHVkZW50IGhhcyBhY3RpdmUgY291cnNlIGFjY2Vzc1xyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrQ291cnNlQWNjZXNzKGNvdXJzZUlkOiBzdHJpbmcpOiBQcm9taXNlPEVucm9sbG1lbnRTdGF0dXM+IHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3QgeyBkYXRhOiB7IHVzZXIgfSB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCk7XHJcblxyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzQWNjZXNzOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RhdHVzOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogbnVsbCxcclxuICAgICAgICAgICAgZGF5c1JlbWFpbmluZzogbnVsbCxcclxuICAgICAgICAgICAgaXNFeHBpcmluZ1Nvb246IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0V4cGlyZWQ6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIEdldCBlbnJvbGxtZW50IHdpdGggZXhwaXJ5IGluZm9cclxuICAgICAgICBjb25zdCB7IGRhdGE6IGVucm9sbG1lbnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKCdlbnJvbGxtZW50cycpXHJcbiAgICAgICAgICAgIC5zZWxlY3QoJ3N0YXR1cywgZXhwaXJlc19hdCcpXHJcbiAgICAgICAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgIC5lcSgnY291cnNlX2lkJywgY291cnNlSWQpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKCFlbnJvbGxtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBoYXNBY2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBleHBpcmVzQXQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBpcmluZ1Nvb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBpcmVkOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBleHBpcnlEYXRlID0gZW5yb2xsbWVudC5leHBpcmVzX2F0ID8gbmV3IERhdGUoZW5yb2xsbWVudC5leHBpcmVzX2F0KSA6IG51bGw7XHJcblxyXG4gICAgICAgIGxldCBkYXlzUmVtYWluaW5nID0gbnVsbDtcclxuICAgICAgICBsZXQgaXNFeHBpcmVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzRXhwaXJpbmdTb29uID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGhhc0FjY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZXhwaXJ5RGF0ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBkaWZmVGltZSA9IGV4cGlyeURhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcclxuICAgICAgICAgICAgY29uc3QgZGlmZkRheXMgPSBNYXRoLmNlaWwoZGlmZlRpbWUgLyAoMTAwMCAqIDYwICogNjAgKiAyNCkpO1xyXG5cclxuICAgICAgICAgICAgZGF5c1JlbWFpbmluZyA9IGRpZmZEYXlzO1xyXG4gICAgICAgICAgICBpc0V4cGlyZWQgPSBkaWZmRGF5cyA8IDA7XHJcbiAgICAgICAgICAgIGlzRXhwaXJpbmdTb29uID0gZGlmZkRheXMgPiAwICYmIGRpZmZEYXlzIDw9IDc7XHJcbiAgICAgICAgICAgIGhhc0FjY2VzcyA9IGVucm9sbG1lbnQuc3RhdHVzID09PSAnYWN0aXZlJyAmJiAhaXNFeHBpcmVkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIExpZmV0aW1lIGFjY2Vzc1xyXG4gICAgICAgICAgICBoYXNBY2Nlc3MgPSBlbnJvbGxtZW50LnN0YXR1cyA9PT0gJ2FjdGl2ZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNBY2Nlc3MsXHJcbiAgICAgICAgICAgIHN0YXR1czogaXNFeHBpcmVkID8gJ2V4cGlyZWQnIDogZW5yb2xsbWVudC5zdGF0dXMgYXMgYW55LFxyXG4gICAgICAgICAgICBleHBpcmVzQXQ6IGVucm9sbG1lbnQuZXhwaXJlc19hdCxcclxuICAgICAgICAgICAgZGF5c1JlbWFpbmluZyxcclxuICAgICAgICAgICAgaXNFeHBpcmluZ1Nvb24sXHJcbiAgICAgICAgICAgIGlzRXhwaXJlZFxyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNoZWNraW5nIGNvdXJzZSBhY2Nlc3M6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc0FjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0YXR1czogJ25vbmUnLFxyXG4gICAgICAgICAgICBleHBpcmVzQXQ6IG51bGwsXHJcbiAgICAgICAgICAgIGRheXNSZW1haW5pbmc6IG51bGwsXHJcbiAgICAgICAgICAgIGlzRXhwaXJpbmdTb29uOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNFeHBpcmVkOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgYWxsIHVzZXIncyBlbnJvbGxtZW50cyB3aXRoIGV4cGlyeSBzdGF0dXNcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyRW5yb2xsbWVudHNXaXRoRXhwaXJ5KCkge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICBjb25zdCB7IGRhdGE6IHsgdXNlciB9IH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcclxuICAgIGlmICghdXNlcikgcmV0dXJuIHsgZW5yb2xsbWVudHM6IFtdIH07XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IGRhdGE6IGVucm9sbG1lbnRzIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgICAgICAuZnJvbSgnZW5yb2xsbWVudHMnKVxyXG4gICAgICAgICAgICAuc2VsZWN0KGBcclxuICAgICAgICAqLFxyXG4gICAgICAgIGNvdXJzZXMgKFxyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIHRodW1ibmFpbF91cmwsXHJcbiAgICAgICAgICBwcmljZVxyXG4gICAgICAgIClcclxuICAgICAgYClcclxuICAgICAgICAgICAgLmVxKCd1c2VyX2lkJywgdXNlci5pZCk7XHJcblxyXG4gICAgICAgIC8vIFByb2Nlc3MgZWFjaCBlbnJvbGxtZW50IHRvIGNoZWNrIGV4cGlyeSBzdGF0dXNcclxuICAgICAgICBjb25zdCBwcm9jZXNzZWRFbnJvbGxtZW50cyA9IGVucm9sbG1lbnRzPy5tYXAoZW5yb2xsbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cGlyeURhdGUgPSBlbnJvbGxtZW50LmV4cGlyZXNfYXQgPyBuZXcgRGF0ZShlbnJvbGxtZW50LmV4cGlyZXNfYXQpIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXlzUmVtYWluaW5nID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IGlzRXhwaXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgaXNFeHBpcmluZ1Nvb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHVyZ2VuY3lMZXZlbDogJ0NSSVRJQ0FMJyB8ICdISUdIJyB8ICdNRURJVU0nIHwgJ0xPVycgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChleHBpcnlEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmVGltZSA9IGV4cGlyeURhdGUuZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpZmZEYXlzID0gTWF0aC5jZWlsKGRpZmZUaW1lIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXlzUmVtYWluaW5nID0gZGlmZkRheXM7XHJcbiAgICAgICAgICAgICAgICBpc0V4cGlyZWQgPSBkaWZmRGF5cyA8IDA7XHJcbiAgICAgICAgICAgICAgICBpc0V4cGlyaW5nU29vbiA9IGRpZmZEYXlzID4gMCAmJiBkaWZmRGF5cyA8PSAxNTsgLy8gU2hvdyBiYWRnZSBmb3IgMTUgZGF5cyBvciBsZXNzXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpZmZEYXlzIDw9IDEgJiYgZGlmZkRheXMgPiAwKSB1cmdlbmN5TGV2ZWwgPSAnQ1JJVElDQUwnO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlmZkRheXMgPD0gMyAmJiBkaWZmRGF5cyA+IDApIHVyZ2VuY3lMZXZlbCA9ICdISUdIJztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpZmZEYXlzIDw9IDcgJiYgZGlmZkRheXMgPiAwKSB1cmdlbmN5TGV2ZWwgPSAnTUVESVVNJztcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRpZmZEYXlzID4gNyAmJiBkaWZmRGF5cyA8PSAxNSkgdXJnZW5jeUxldmVsID0gJ0xPVyc7IC8vIFNob3cgdXAgdG8gMTUgZGF5c1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uZW5yb2xsbWVudCxcclxuICAgICAgICAgICAgICAgIGRheXNSZW1haW5pbmcsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGlyZWQsXHJcbiAgICAgICAgICAgICAgICBpc0V4cGlyaW5nU29vbixcclxuICAgICAgICAgICAgICAgIHVyZ2VuY3lMZXZlbCxcclxuICAgICAgICAgICAgICAgIGhhc0FjY2VzczogZW5yb2xsbWVudC5zdGF0dXMgPT09ICdhY3RpdmUnICYmICFpc0V4cGlyZWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KSB8fCBbXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgZW5yb2xsbWVudHM6IHByb2Nlc3NlZEVucm9sbG1lbnRzIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGVucm9sbG1lbnRzOicsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4geyBlbnJvbGxtZW50czogW10gfTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6InNUQXNHc0IifQ==
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useEnrollmentsWithExpiry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnrollmentsWithExpiry",
    ()=>useEnrollmentsWithExpiry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ad6e89__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/actions/data:ad6e89 [app-client] (ecmascript) <text/javascript>");
var _s = __turbopack_context__.k.signature();
;
;
function useEnrollmentsWithExpiry() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'enrollments-with-expiry'
        ],
        queryFn: {
            "useEnrollmentsWithExpiry.useQuery": async ()=>{
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$data$3a$ad6e89__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getUserEnrollmentsWithExpiry"])();
                return result.enrollments;
            }
        }["useEnrollmentsWithExpiry.useQuery"],
        staleTime: 30000
    });
}
_s(useEnrollmentsWithExpiry, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/student/my-courses/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useCurrentUser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useStudentCourses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/usePrefetchCourse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/CourseThumbnail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/student/ExpiryComponents.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEnrollmentsWithExpiry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useEnrollmentsWithExpiry.ts [app-client] (ecmascript)");
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
function MyCourses() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: user, isLoading: userLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const { data: myCourses, isLoading: coursesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentCourses"])(user?.id);
    const { data: enrollmentsWithExpiry } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEnrollmentsWithExpiry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollmentsWithExpiry"])();
    const { prefetchCourse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefetchCourse"])();
    // Create expiry map
    const expiryMap = new Map();
    enrollmentsWithExpiry?.forEach((enrollment)=>{
        expiryMap.set(enrollment.course_id, {
            daysRemaining: enrollment.daysRemaining,
            isExpired: enrollment.isExpired,
            urgencyLevel: enrollment.urgencyLevel
        });
    });
    const fadeIn = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: (i)=>({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.1,
                    duration: 0.5
                }
            })
    };
    const handleContinueCourse = (courseId)=>{
        router.push(`/learn/${courseId}`);
    };
    if (coursesLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700 animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                        }, void 0, false, {
                            fileName: "[project]/app/student/my-courses/page.tsx",
                            lineNumber: 49,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 w-96 bg-slate-100 dark:bg-slate-600 rounded"
                        }, void 0, false, {
                            fileName: "[project]/app/student/my-courses/page.tsx",
                            lineNumber: 50,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/student/my-courses/page.tsx",
                    lineNumber: 48,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: [
                        1,
                        2,
                        3
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 shadow-lg border border-slate-100 dark:border-slate-700 animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-40 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/my-courses/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/my-courses/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-4 bg-slate-100 dark:bg-slate-600 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/my-courses/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/student/my-courses/page.tsx",
                            lineNumber: 54,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/student/my-courses/page.tsx",
                    lineNumber: 52,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/student/my-courses/page.tsx",
            lineNumber: 47,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                className: "rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2",
                        children: "My Courses"
                    }, void 0, false, {
                        fileName: "[project]/app/student/my-courses/page.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-600 dark:text-slate-400",
                        children: "Track your enrolled courses and progress"
                    }, void 0, false, {
                        fileName: "[project]/app/student/my-courses/page.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/my-courses/page.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 1,
                className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-slate-800 dark:text-white mb-4",
                        children: "Your Courses"
                    }, void 0, false, {
                        fileName: "[project]/app/student/my-courses/page.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this),
                    coursesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-indigo-600"
                        }, void 0, false, {
                            fileName: "[project]/app/student/my-courses/page.tsx",
                            lineNumber: 94,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/student/my-courses/page.tsx",
                        lineNumber: 93,
                        columnNumber: 21
                    }, this) : myCourses && myCourses.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: myCourses.map((course)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                whileHover: {
                                    scale: 1.02
                                },
                                onClick: ()=>handleContinueCourse(course.id),
                                onMouseEnter: ()=>prefetchCourse(course.id),
                                className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-40 w-full mb-3 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseThumbnail"], {
                                            src: course.thumbnail_url,
                                            title: course.title,
                                            category: "Enrolled",
                                            className: "w-full h-full"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/my-courses/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/my-courses/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-800 dark:text-white flex-1",
                                                children: course.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/my-courses/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 37
                                            }, this),
                                            expiryMap.has(course.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardExpiryBadge"], {
                                                daysRemaining: expiryMap.get(course.id).daysRemaining,
                                                isExpired: expiryMap.get(course.id).isExpired,
                                                urgencyLevel: expiryMap.get(course.id).urgencyLevel
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/my-courses/page.tsx",
                                                lineNumber: 117,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/my-courses/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2",
                                        children: course.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/my-courses/page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs mb-2 text-slate-500 dark:text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    course.completed_lessons,
                                                    "/",
                                                    course.total_lessons,
                                                    " lessons"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/my-courses/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    course.progress_percentage.toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/my-courses/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/my-courses/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500",
                                            style: {
                                                width: `${course.progress_percentage}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/my-courses/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/my-courses/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            handleContinueCourse(course.id);
                                        },
                                        className: "w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/my-courses/page.tsx",
                                                lineNumber: 142,
                                                columnNumber: 37
                                            }, this),
                                            "Continue Learning"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/my-courses/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, course.id, true, {
                                fileName: "[project]/app/student/my-courses/page.tsx",
                                lineNumber: 99,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/student/my-courses/page.tsx",
                        lineNumber: 97,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                className: "w-12 h-12 mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/my-courses/page.tsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No courses enrolled yet"
                            }, void 0, false, {
                                fileName: "[project]/app/student/my-courses/page.tsx",
                                lineNumber: 151,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mt-1",
                                children: "Browse available courses to get started"
                            }, void 0, false, {
                                fileName: "[project]/app/student/my-courses/page.tsx",
                                lineNumber: 152,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>router.push("/student/all-courses"),
                                className: "mt-4 bg-indigo-600 hover:bg-indigo-700",
                                children: "Browse Courses"
                            }, void 0, false, {
                                fileName: "[project]/app/student/my-courses/page.tsx",
                                lineNumber: 153,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/my-courses/page.tsx",
                        lineNumber: 149,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/my-courses/page.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/student/my-courses/page.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, this);
}
_s(MyCourses, "1o+LC9mLbkreQTOeF1Sn6p7FOCk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentCourses"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEnrollmentsWithExpiry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollmentsWithExpiry"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefetchCourse"]
    ];
});
_c = MyCourses;
var _c;
__turbopack_context__.k.register(_c, "MyCourses");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>CirclePlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const CirclePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("CirclePlay", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "polygon",
        {
            points: "10 8 16 12 10 16 10 8",
            key: "1cimsy"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=circle-play.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>TriangleAlert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const TriangleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("TriangleAlert", [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=triangle-alert.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertTriangle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Lock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Lock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Lock", [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 10 0v4",
            key: "fwvmzm"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=lock.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>RefreshCw
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const RefreshCw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("RefreshCw", [
    [
        "path",
        {
            d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
            key: "v9h5vc"
        }
    ],
    [
        "path",
        {
            d: "M21 3v5h-5",
            key: "1q7to0"
        }
    ],
    [
        "path",
        {
            d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
            key: "3uifl3"
        }
    ],
    [
        "path",
        {
            d: "M8 16H3v5",
            key: "1cv678"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=refresh-cw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshCw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Calendar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Calendar", [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=calendar.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Calendar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Zap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Zap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Zap", [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=zap.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Zap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_d8e58f4e._.js.map