(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/student/useStudentStats.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudentStats",
    ()=>useStudentStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useStudentStats(userId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "student-stats",
            userId
        ],
        queryFn: {
            "useStudentStats.useQuery": async ({ signal })=>{
                if (!userId) {
                    return {
                        totalExams: 0,
                        averageScore: 0,
                        totalTimeSpent: 0,
                        rank: 0
                    };
                }
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // Call the optimized RPC function
                const { data, error } = await supabase.rpc('get_student_stats', {
                    target_user_id: userId
                }).abortSignal(signal);
                if (error) {
                    // Ignore AbortError caused by navigation
                    if (error.code === '20' || error.message.includes('AbortError') || error.message.includes('aborted')) {
                        return {
                            totalExams: 0,
                            averageScore: 0,
                            totalTimeSpent: 0,
                            rank: 0
                        };
                    }
                    // Return defaults instead of throwing to prevent UI crash for new users
                    return {
                        totalExams: 0,
                        averageScore: 0,
                        totalTimeSpent: 0,
                        rank: 0
                    };
                }
                // If data is null (fresh user), return defaults
                if (!data) {
                    return {
                        totalExams: 0,
                        averageScore: 0,
                        totalTimeSpent: 0,
                        rank: 0
                    };
                }
                return data;
            }
        }["useStudentStats.useQuery"],
        enabled: !!userId
    });
}
_s(useStudentStats, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/student/useStudentTestSeries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudentTestSeries",
    ()=>useStudentTestSeries
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useStudentTestSeries(userId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "student-test-series",
            userId
        ],
        queryFn: {
            "useStudentTestSeries.useQuery": async ({ signal })=>{
                if (!userId) {
                    return [];
                }
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // ✅ OPTIMIZED: Direct query instead of RPC function
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
                    if (error.code === '20' || error.message.includes('AbortError') || error.message.includes('aborted')) {
                        return [];
                    }
                    console.error('Error fetching student test series:', error);
                    throw error;
                }
                if (!enrollments || enrollments.length === 0) {
                    return [];
                }
                // Get course IDs for test series only
                const testSeriesIds = enrollments.filter({
                    "useStudentTestSeries.useQuery.testSeriesIds": (e)=>e.courses?.course_type === 'test_series'
                }["useStudentTestSeries.useQuery.testSeriesIds"]).map({
                    "useStudentTestSeries.useQuery.testSeriesIds": (e)=>e.course_id
                }["useStudentTestSeries.useQuery.testSeriesIds"]);
                if (testSeriesIds.length === 0) {
                    return [];
                }
                // ✅ OPTIMIZED: Batch query for lesson counts (tests in test series)
                const { data: lessonsData } = await supabase.from('modules').select(`
                    course_id,
                    lessons!inner(id)
                `).in('course_id', testSeriesIds).abortSignal(signal);
                // ✅ OPTIMIZED: Batch query for completed tests
                const { data: completedData } = await supabase.from('lesson_progress').select('course_id, lesson_id').eq('user_id', userId).eq('completed', true).in('course_id', testSeriesIds).abortSignal(signal);
                // Calculate counts per test series
                const testCounts = {};
                const completedCounts = {};
                lessonsData?.forEach({
                    "useStudentTestSeries.useQuery": (module)=>{
                        const courseId = module.course_id;
                        testCounts[courseId] = (testCounts[courseId] || 0) + (module.lessons?.length || 0);
                    }
                }["useStudentTestSeries.useQuery"]);
                completedData?.forEach({
                    "useStudentTestSeries.useQuery": (progress)=>{
                        const courseId = progress.course_id;
                        completedCounts[courseId] = (completedCounts[courseId] || 0) + 1;
                    }
                }["useStudentTestSeries.useQuery"]);
                // Map enrollments to test series with progress data
                const testSeries = enrollments.filter({
                    "useStudentTestSeries.useQuery.testSeries": (e)=>e.courses?.course_type === 'test_series'
                }["useStudentTestSeries.useQuery.testSeries"]) // Only test series
                .map({
                    "useStudentTestSeries.useQuery.testSeries": (enrollment)=>({
                            id: enrollment.courses.id,
                            title: enrollment.courses.title,
                            description: enrollment.courses.description,
                            thumbnail_url: enrollment.courses.thumbnail_url,
                            course_type: enrollment.courses.course_type,
                            progress: enrollment.progress_percentage || 0,
                            last_accessed_at: enrollment.last_accessed_at,
                            total_tests: testCounts[enrollment.course_id] || 0,
                            completed_tests: completedCounts[enrollment.course_id] || 0
                        })
                }["useStudentTestSeries.useQuery.testSeries"]);
                return testSeries;
            }
        }["useStudentTestSeries.useQuery"],
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
}
_s(useStudentTestSeries, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/student/useLastAttempt.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLastAttempt",
    ()=>useLastAttempt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useLastAttempt(userId) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "last-attempt",
            userId
        ],
        queryFn: {
            "useLastAttempt.useQuery": async ()=>{
                if (!userId) return null;
                // Get the most recent in-progress attempt
                const { data: attempt, error } = await supabase.from("exam_attempts").select(`
          id,
          exam_id,
          status,
          started_at,
          exams (
            id,
            title
          )
        `).eq("student_id", userId).eq("status", "in_progress").order("started_at", {
                    ascending: false
                }).limit(1).single();
                if (error || !attempt) return null;
                const exam = attempt.exams;
                return {
                    attemptId: attempt.id,
                    examId: attempt.exam_id,
                    examTitle: exam?.title || "Untitled Exam",
                    status: attempt.status,
                    startedAt: attempt.started_at
                };
            }
        }["useLastAttempt.useQuery"],
        enabled: !!userId,
        staleTime: 1000 * 30
    });
}
_s(useLastAttempt, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/hooks/student/useAllCourses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllCourses",
    ()=>useAllCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useAllCourses(userId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "all-courses",
            userId
        ],
        queryFn: {
            "useAllCourses.useQuery": async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // Call Optimized RPC
                const { data, error } = await supabase.rpc('get_published_courses_with_meta', {
                    target_user_id: userId || null,
                    p_limit: 50,
                    p_offset: 0
                });
                if (error) {
                    throw error;
                }
                // Filter to show only courses (not test series)
                const courses = (data || []).filter({
                    "useAllCourses.useQuery.courses": (course)=>course.course_type === 'course'
                }["useAllCourses.useQuery.courses"]);
                return courses;
            }
        }["useAllCourses.useQuery"],
        enabled: userId !== undefined
    });
}
_s(useAllCourses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
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
"[project]/hooks/student/useAllTestSeries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAllTestSeries",
    ()=>useAllTestSeries
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useCurrentUser.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useAllTestSeries() {
    _s();
    const { data: user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "all-test-series",
            user?.id
        ],
        queryFn: {
            "useAllTestSeries.useQuery": async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // Use RPC function for optimized query
                const { data, error } = await supabase.rpc('get_published_courses_with_meta', {
                    target_user_id: user?.id || null,
                    p_limit: 50,
                    p_offset: 0
                });
                if (error) {
                    console.error('Error fetching test series:', error);
                    throw error;
                }
                // Filter for test series only
                const testSeries = (data || []).filter({
                    "useAllTestSeries.useQuery.testSeries": (item)=>item.course_type === 'test_series'
                }["useAllTestSeries.useQuery.testSeries"]);
                return testSeries;
            }
        }["useAllTestSeries.useQuery"],
        // Remove enabled condition - should work even without user
        staleTime: 1000 * 60 * 5
    });
}
_s(useAllTestSeries, "hYaU90Yz5yf9NrDu7ZdeHb666Ug=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/queryKeys.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized Query Key Factory
 * Provides type-safe, consistent query keys across the application
 */ __turbopack_context__.s([
    "queryKeys",
    ()=>queryKeys
]);
const queryKeys = {
    // Auth
    auth: {
        user: ()=>[
                "auth",
                "user"
            ],
        session: ()=>[
                "auth",
                "session"
            ]
    },
    // Courses
    courses: {
        all: ()=>[
                "courses"
            ],
        lists: ()=>[
                "courses",
                "list"
            ],
        list: (filters)=>[
                "courses",
                "list",
                filters
            ],
        details: ()=>[
                "courses",
                "detail"
            ],
        detail: (id)=>[
                "courses",
                "detail",
                id
            ],
        enrolled: (userId)=>[
                "courses",
                "enrolled",
                userId
            ]
    },
    // Exams
    exams: {
        all: ()=>[
                "exams"
            ],
        lists: ()=>[
                "exams",
                "list"
            ],
        list: (filters)=>[
                "exams",
                "list",
                {
                    filters
                }
            ],
        details: ()=>[
                "exams",
                "detail"
            ],
        detail: (id)=>[
                "exams",
                "detail",
                id
            ],
        sections: (examId)=>[
                "exams",
                examId,
                "sections"
            ],
        questions: (sectionId)=>[
                "sections",
                sectionId,
                "questions"
            ]
    },
    // Attempts
    attempts: {
        all: ()=>[
                "attempts"
            ],
        lists: ()=>[
                "attempts",
                "list"
            ],
        list: (userId)=>[
                "attempts",
                "list",
                userId
            ],
        details: ()=>[
                "attempts",
                "detail"
            ],
        detail: (id)=>[
                "attempts",
                "detail",
                id
            ],
        active: (userId, examId)=>[
                "attempts",
                "active",
                userId,
                examId
            ]
    },
    // Results
    results: {
        all: ()=>[
                "results"
            ],
        lists: ()=>[
                "results",
                "list"
            ],
        list: (userId)=>[
                "results",
                "list",
                userId
            ],
        details: ()=>[
                "results",
                "detail"
            ],
        detail: (id)=>[
                "results",
                "detail",
                id
            ],
        byAttempt: (attemptId)=>[
                "results",
                "attempt",
                attemptId
            ]
    },
    // Test Series
    testSeries: {
        all: ()=>[
                "testSeries"
            ],
        lists: ()=>[
                "testSeries",
                "list"
            ],
        list: (filters)=>[
                "testSeries",
                "list",
                {
                    filters
                }
            ],
        details: ()=>[
                "testSeries",
                "detail"
            ],
        detail: (id)=>[
                "testSeries",
                "detail",
                id
            ],
        enrolled: (userId)=>[
                "testSeries",
                "enrolled",
                userId
            ],
        exams: (seriesId)=>[
                "testSeries",
                seriesId,
                "exams"
            ]
    },
    // Enrollments
    enrollments: {
        all: ()=>[
                "enrollments"
            ],
        course: (userId, courseId)=>[
                "enrollments",
                "course",
                userId,
                courseId
            ],
        testSeries: (userId, seriesId)=>[
                "enrollments",
                "testSeries",
                userId,
                seriesId
            ],
        user: (userId)=>[
                "enrollments",
                "user",
                userId
            ]
    },
    // Payments
    payments: {
        all: ()=>[
                "payments"
            ],
        lists: ()=>[
                "payments",
                "list"
            ],
        list: (userId)=>[
                "payments",
                "list",
                {
                    userId
                }
            ],
        details: ()=>[
                "payments",
                "detail"
            ],
        detail: (id)=>[
                "payments",
                "detail",
                id
            ],
        status: (transactionId)=>[
                "payments",
                "status",
                transactionId
            ]
    },
    // Admin
    admin: {
        students: ()=>[
                "admin",
                "students"
            ],
        analytics: ()=>[
                "admin",
                "analytics"
            ],
        questionBank: (filters)=>[
                "admin",
                "questionBank",
                {
                    filters
                }
            ]
    },
    // Rewards
    rewards: {
        user: (userId)=>[
                "rewards",
                "user",
                userId
            ],
        leaderboard: ()=>[
                "rewards",
                "leaderboard"
            ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/invalidations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invalidations",
    ()=>invalidations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
;
const invalidations = {
    /**
     * After course enrollment
     */ afterCourseEnrollment: (queryClient, userId, courseId)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].enrollments.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].enrollments.user(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.enrolled(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.detail(courseId)
        });
    },
    /**
     * After test series enrollment
     */ afterTestSeriesEnrollment: (queryClient, userId, seriesId)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].enrollments.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].enrollments.user(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.enrolled(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.detail(seriesId)
        });
    },
    /**
     * After exam submission
     */ afterExamSubmission: (queryClient, userId, attemptId)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.list(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(attemptId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].results.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].results.list(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].rewards.user(userId)
        });
    },
    /**
     * After payment success
     */ afterPaymentSuccess: (queryClient, userId)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].payments.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].payments.list(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].enrollments.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].enrollments.user(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.enrolled(userId)
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.enrolled(userId)
        });
    },
    /**
     * After exam creation/update (admin)
     */ afterExamMutation: (queryClient, examId)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.lists()
        });
        if (examId) {
            queryClient.invalidateQueries({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.detail(examId)
            });
        }
    },
    /**
     * After course creation/update (admin)
     */ afterCourseMutation: (queryClient, courseId)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.all()
        });
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.lists()
        });
        if (courseId) {
            queryClient.invalidateQueries({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.detail(courseId)
            });
        }
    },
    /**
     * After question bank update (admin)
     */ afterQuestionBankUpdate: (queryClient)=>{
        queryClient.invalidateQueries({
            queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].admin.questionBank()
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/mutations/useEnrollCourse.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnrollCourse",
    ()=>useEnrollCourse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invalidations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invalidations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useEnrollCourse() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useEnrollCourse.useMutation": async ({ courseId, userId })=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // Check if already enrolled - use maybeSingle() to avoid 406 error
                const { data: existingEnrollment } = await supabase.from("enrollments").select("id, user_id, course_id").eq("user_id", userId).eq("course_id", courseId).maybeSingle();
                if (existingEnrollment) {
                    throw new Error("You are already enrolled in this course");
                }
                // Create enrollment
                const { data, error } = await supabase.from("enrollments").insert({
                    user_id: userId,
                    course_id: courseId,
                    enrolled_at: new Date().toISOString()
                }).select().single();
                if (error) throw error;
                return data;
            }
        }["useEnrollCourse.useMutation"],
        onSuccess: {
            "useEnrollCourse.useMutation": (_, variables)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invalidations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invalidations"].afterCourseEnrollment(queryClient, variables.userId, variables.courseId);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Successfully enrolled in course!");
            }
        }["useEnrollCourse.useMutation"],
        onError: {
            "useEnrollCourse.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || "Failed to enroll in course");
            }
        }["useEnrollCourse.useMutation"]
    });
}
_s(useEnrollCourse, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/mutations/useSubmitExam.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSubmitExam",
    ()=>useSubmitExam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invalidations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/invalidations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useSubmitExam() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSubmitExam.useMutation": async ({ attemptId, userId, responses })=>{
                // Start a transaction-like operation
                // 1. Update attempt status
                const { error: attemptError } = await supabase.from("exam_attempts").update({
                    status: "submitted",
                    submitted_at: new Date().toISOString()
                }).eq("id", attemptId);
                if (attemptError) throw attemptError;
                // 2. Save all responses
                const responseEntries = Object.entries(responses).map({
                    "useSubmitExam.useMutation.responseEntries": ([questionId, answer])=>({
                            attempt_id: attemptId,
                            question_id: questionId,
                            selected_answer: answer,
                            answered_at: new Date().toISOString()
                        })
                }["useSubmitExam.useMutation.responseEntries"]);
                if (responseEntries.length > 0) {
                    const { error: responsesError } = await supabase.from("responses").upsert(responseEntries, {
                        onConflict: "attempt_id,question_id"
                    });
                    if (responsesError) throw responsesError;
                }
                // 3. Trigger result calculation (this should be done server-side ideally)
                // For now, we'll just return success and let the server handle it
                return {
                    attemptId,
                    success: true
                };
            }
        }["useSubmitExam.useMutation"],
        onSuccess: {
            "useSubmitExam.useMutation": (_, variables)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$invalidations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invalidations"].afterExamSubmission(queryClient, variables.userId, variables.attemptId);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success("Exam submitted successfully!");
            }
        }["useSubmitExam.useMutation"],
        onError: {
            "useSubmitExam.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(error.message || "Failed to submit exam");
            }
        }["useSubmitExam.useMutation"]
    });
}
_s(useSubmitExam, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/mutations/useSaveResponse.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSaveResponse",
    ()=>useSaveResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useSaveResponse() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSaveResponse.useMutation": async ({ attemptId, questionId, answer })=>{
                const { data, error } = await supabase.from("responses").upsert({
                    attempt_id: attemptId,
                    question_id: questionId,
                    selected_answer: answer,
                    answered_at: new Date().toISOString()
                }, {
                    onConflict: "attempt_id,question_id"
                }).select().single();
                if (error) throw error;
                return data;
            }
        }["useSaveResponse.useMutation"],
        // Optimistic update for instant UI feedback
        onMutate: {
            "useSaveResponse.useMutation": async (variables)=>{
                // Cancel outgoing refetches
                await queryClient.cancelQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId)
                });
                // Snapshot previous value
                const previousData = queryClient.getQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId));
                // Optimistically update
                queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId), {
                    "useSaveResponse.useMutation": (old)=>{
                        if (!old) return old;
                        return {
                            ...old,
                            responses: {
                                ...old.responses,
                                [variables.questionId]: variables.answer
                            }
                        };
                    }
                }["useSaveResponse.useMutation"]);
                return {
                    previousData
                };
            }
        }["useSaveResponse.useMutation"],
        onError: {
            "useSaveResponse.useMutation": (err, variables, context)=>{
                // Rollback on error
                if (context?.previousData) {
                    queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId), context.previousData);
                }
            }
        }["useSaveResponse.useMutation"],
        onSettled: {
            "useSaveResponse.useMutation": (_, __, variables)=>{
                // Refetch to ensure consistency
                queryClient.invalidateQueries({
                    queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId)
                });
            }
        }["useSaveResponse.useMutation"]
    });
}
_s(useSaveResponse, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/mutations/useToggleMarkForReview.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useToggleMarkForReview",
    ()=>useToggleMarkForReview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function useToggleMarkForReview() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useToggleMarkForReview.useMutation": async ({ attemptId, questionId, marked })=>{
                // This would typically update a separate table or field
                // For now, we'll use local state with optimistic updates
                return {
                    attemptId,
                    questionId,
                    marked
                };
            }
        }["useToggleMarkForReview.useMutation"],
        // Optimistic update for instant UI feedback
        onMutate: {
            "useToggleMarkForReview.useMutation": async (variables)=>{
                const queryKey = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId);
                await queryClient.cancelQueries({
                    queryKey
                });
                const previousData = queryClient.getQueryData(queryKey);
                queryClient.setQueryData(queryKey, {
                    "useToggleMarkForReview.useMutation": (old)=>{
                        if (!old) return old;
                        return {
                            ...old,
                            markedForReview: {
                                ...old.markedForReview,
                                [variables.questionId]: variables.marked
                            }
                        };
                    }
                }["useToggleMarkForReview.useMutation"]);
                return {
                    previousData
                };
            }
        }["useToggleMarkForReview.useMutation"],
        onError: {
            "useToggleMarkForReview.useMutation": (err, variables, context)=>{
                if (context?.previousData) {
                    queryClient.setQueryData(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].attempts.detail(variables.attemptId), context.previousData);
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error("Failed to update mark status");
            }
        }["useToggleMarkForReview.useMutation"]
    });
}
_s(useToggleMarkForReview, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/queries/useCourses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourse",
    ()=>useCourse,
    "useCourses",
    ()=>useCourses,
    "useEnrolledCourses",
    ()=>useEnrolledCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
function useCourses(filters) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.list(JSON.stringify(filters)),
        queryFn: {
            "useCourses.useQuery": async ()=>{
                let query = supabase.from("courses").select("id, title, description, price, is_free, thumbnail_url, status, created_at").order("created_at", {
                    ascending: false
                });
                if (filters?.status) {
                    query = query.eq("status", filters.status);
                }
                if (filters?.search) {
                    query = query.ilike("title", `%${filters.search}%`);
                }
                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
        }["useCourses.useQuery"],
        staleTime: 1000 * 60 * 5
    });
}
_s(useCourses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCourse(courseId) {
    _s1();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.detail(courseId),
        queryFn: {
            "useCourse.useQuery": async ()=>{
                const { data, error } = await supabase.from("courses").select("*").eq("id", courseId).single();
                if (error) throw error;
                return data;
            }
        }["useCourse.useQuery"],
        enabled: !!courseId,
        staleTime: 1000 * 60 * 10
    });
}
_s1(useCourse, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useEnrolledCourses(userId) {
    _s2();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.enrolled(userId),
        queryFn: {
            "useEnrolledCourses.useQuery": async ()=>{
                const { data, error } = await supabase.from("enrollments").select(`
          id,
          enrolled_at,
          progress,
          completed,
          courses (
            id,
            title,
            description,
            thumbnail_url,
            price
          )
        `).eq("user_id", userId).eq("status", "active").order("enrolled_at", {
                    ascending: false
                });
                if (error) throw error;
                return data;
            }
        }["useEnrolledCourses.useQuery"],
        enabled: !!userId,
        staleTime: 1000 * 60 * 3
    });
}
_s2(useEnrolledCourses, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/queries/useExams.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useExam",
    ()=>useExam,
    "useExamQuestions",
    ()=>useExamQuestions,
    "useExamSections",
    ()=>useExamSections,
    "useExams",
    ()=>useExams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
function useExams(filters) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.list(JSON.stringify(filters)),
        queryFn: {
            "useExams.useQuery": async ()=>{
                let query = supabase.from("exams").select("id, title, description, duration_minutes, total_marks, status, created_at").order("created_at", {
                    ascending: false
                });
                if (filters?.status) {
                    query = query.eq("status", filters.status);
                }
                if (filters?.search) {
                    query = query.ilike("title", `%${filters.search}%`);
                }
                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
        }["useExams.useQuery"],
        staleTime: 1000 * 60 * 5
    });
}
_s(useExams, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useExam(examId) {
    _s1();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.detail(examId),
        queryFn: {
            "useExam.useQuery": async ()=>{
                const { data, error } = await supabase.from("exams").select("*").eq("id", examId).single();
                if (error) throw error;
                return data;
            }
        }["useExam.useQuery"],
        enabled: !!examId,
        staleTime: 1000 * 60 * 10
    });
}
_s1(useExam, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useExamSections(examId) {
    _s2();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.sections(examId),
        queryFn: {
            "useExamSections.useQuery": async ()=>{
                const { data, error } = await supabase.from("sections").select("id, title, duration_minutes, total_marks, section_order").eq("exam_id", examId).order("section_order", {
                    ascending: true
                });
                if (error) throw error;
                return data;
            }
        }["useExamSections.useQuery"],
        enabled: !!examId,
        staleTime: 1000 * 60 * 15
    });
}
_s2(useExamSections, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useExamQuestions(sectionId) {
    _s3();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.questions(sectionId),
        queryFn: {
            "useExamQuestions.useQuery": async ()=>{
                const { data: questions, error } = await supabase.from("questions").select("id, question_text, question_type, marks, correct_answer, created_at").eq("section_id", sectionId).order("created_at", {
                    ascending: true
                });
                if (error) throw error;
                // Fetch options for each question
                const questionsWithOptions = await Promise.all((questions || []).map({
                    "useExamQuestions.useQuery": async (question)=>{
                        const { data: options } = await supabase.from("options").select("id, option_text, is_correct, option_order").eq("question_id", question.id).order("option_order", {
                            ascending: true
                        });
                        return {
                            ...question,
                            options: options || []
                        };
                    }
                }["useExamQuestions.useQuery"]));
                return questionsWithOptions;
            }
        }["useExamQuestions.useQuery"],
        enabled: !!sectionId,
        staleTime: 1000 * 60 * 15
    });
}
_s3(useExamQuestions, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/queries/useTestSeries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTestSeries",
    ()=>useTestSeries,
    "useTestSeriesDetail",
    ()=>useTestSeriesDetail,
    "useTestSeriesExams",
    ()=>useTestSeriesExams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
function useTestSeries(filters) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.list(JSON.stringify(filters)),
        queryFn: {
            "useTestSeries.useQuery": async ()=>{
                let query = supabase.from("test_series").select("id, title, description, price, is_free, status, created_at").order("created_at", {
                    ascending: false
                });
                if (filters?.status) {
                    query = query.eq("status", filters.status);
                }
                if (filters?.search) {
                    query = query.ilike("title", `%${filters.search}%`);
                }
                const { data, error } = await query;
                if (error) throw error;
                return data;
            }
        }["useTestSeries.useQuery"],
        staleTime: 1000 * 60 * 5
    });
}
_s(useTestSeries, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useTestSeriesDetail(seriesId) {
    _s1();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.detail(seriesId),
        queryFn: {
            "useTestSeriesDetail.useQuery": async ()=>{
                const { data, error } = await supabase.from("test_series").select("*").eq("id", seriesId).single();
                if (error) throw error;
                return data;
            }
        }["useTestSeriesDetail.useQuery"],
        enabled: !!seriesId,
        staleTime: 1000 * 60 * 10
    });
}
_s1(useTestSeriesDetail, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useTestSeriesExams(seriesId) {
    _s2();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.exams(seriesId),
        queryFn: {
            "useTestSeriesExams.useQuery": async ()=>{
                const { data, error } = await supabase.from("test_series_exams").select(`
          id,
          exam_order,
          max_attempts,
          exams (
            id,
            title,
            description,
            duration_minutes,
            total_marks,
            negative_marks
          )
        `).eq("test_series_id", seriesId).order("exam_order", {
                    ascending: true
                });
                if (error) throw error;
                return data;
            }
        }["useTestSeriesExams.useQuery"],
        enabled: !!seriesId,
        staleTime: 1000 * 60 * 10
    });
}
_s2(useTestSeriesExams, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/queries/useInfiniteQuestions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteQuestions",
    ()=>useInfiniteQuestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const PAGE_SIZE = 20;
function useInfiniteQuestions(filters) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"])({
        queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].admin.questionBank(JSON.stringify(filters)),
        queryFn: {
            "useInfiniteQuestions.useInfiniteQuery": async ({ pageParam = 0 })=>{
                let query = supabase.from("questions").select(`
          id,
          question_text,
          question_type,
          marks,
          created_at,
          sections (
            id,
            title,
            exams (
              id,
              title
            )
          )
        `, {
                    count: "exact"
                }).order("created_at", {
                    ascending: false
                }).range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);
                if (filters?.search) {
                    query = query.ilike("question_text", `%${filters.search}%`);
                }
                if (filters?.type) {
                    query = query.eq("question_type", filters.type);
                }
                const { data, error, count } = await query;
                if (error) throw error;
                return {
                    questions: data,
                    nextCursor: data.length === PAGE_SIZE ? pageParam + 1 : undefined,
                    totalCount: count
                };
            }
        }["useInfiniteQuestions.useInfiniteQuery"],
        getNextPageParam: {
            "useInfiniteQuestions.useInfiniteQuery": (lastPage)=>lastPage.nextCursor
        }["useInfiniteQuestions.useInfiniteQuery"],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 2
    });
}
_s(useInfiniteQuestions, "xMCOiuh9cV5e8gBi6hogZoGnISk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useInfiniteQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/usePrefetch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrefetch",
    ()=>usePrefetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/queryKeys.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function usePrefetch() {
    _s();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return {
        /**
         * Prefetch course details on hover
         */ prefetchCourse: (courseId)=>{
            queryClient.prefetchQuery({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].courses.detail(courseId),
                queryFn: async ()=>{
                    const { data, error } = await supabase.from("courses").select("*").eq("id", courseId).single();
                    if (error) throw error;
                    return data;
                },
                staleTime: 1000 * 60 * 10
            });
        },
        /**
         * Prefetch exam details on hover
         */ prefetchExam: (examId)=>{
            queryClient.prefetchQuery({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.detail(examId),
                queryFn: async ()=>{
                    const { data, error } = await supabase.from("exams").select("*").eq("id", examId).single();
                    if (error) throw error;
                    return data;
                },
                staleTime: 1000 * 60 * 10
            });
        },
        /**
         * Prefetch test series details on hover
         */ prefetchTestSeries: (seriesId)=>{
            queryClient.prefetchQuery({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].testSeries.detail(seriesId),
                queryFn: async ()=>{
                    const { data, error } = await supabase.from("test_series").select("*").eq("id", seriesId).single();
                    if (error) throw error;
                    return data;
                },
                staleTime: 1000 * 60 * 10
            });
        },
        /**
         * Prefetch exam sections (for exam player)
         */ prefetchExamSections: (examId)=>{
            queryClient.prefetchQuery({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$queryKeys$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryKeys"].exams.sections(examId),
                queryFn: async ()=>{
                    const { data, error } = await supabase.from("sections").select("id, title, duration_minutes, total_marks, section_order").eq("exam_id", examId).order("section_order", {
                        ascending: true
                    });
                    if (error) throw error;
                    return data;
                },
                staleTime: 1000 * 60 * 15
            });
        }
    };
}
_s(usePrefetch, "4R+oYVB2Uc11P7bp1KcuhpkfaTw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Mutation Hooks
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useEnrollCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/mutations/useEnrollCourse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useSubmitExam$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/mutations/useSubmitExam.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useSaveResponse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/mutations/useSaveResponse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useToggleMarkForReview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/mutations/useToggleMarkForReview.ts [app-client] (ecmascript)");
// Query Hooks
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$queries$2f$useCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/queries/useCourses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$queries$2f$useExams$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/queries/useExams.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$queries$2f$useTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/queries/useTestSeries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$queries$2f$useInfiniteQuestions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/queries/useInfiniteQuestions.ts [app-client] (ecmascript)");
// Utilities
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/usePrefetch.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
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
"[project]/app/student/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudentDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useCurrentUser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useStudentStats.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useStudentTestSeries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useLastAttempt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useLastAttempt.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useStudentCourses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useAllCourses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/usePrefetchCourse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEnrollmentsWithExpiry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useEnrollmentsWithExpiry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useAllTestSeries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/CourseThumbnail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useEnrollCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/mutations/useEnrollCourse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/student/ExpiryComponents.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
;
;
;
;
;
function StudentDashboard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const tabParam = searchParams.get("tab");
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    // Set active tab from URL parameter
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentDashboard.useEffect": ()=>{
            if (tabParam === "my-courses" || tabParam === "all-courses" || tabParam === "test-series" || tabParam === "all-test-series") {
                setActiveTab(tabParam);
            }
        }
    }["StudentDashboard.useEffect"], [
        tabParam
    ]);
    // Fetch data
    const { data: user, isLoading: userLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const { data: stats, isLoading: statsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentStats"])(user?.id);
    const { data: testSeries, isLoading: seriesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentTestSeries"])(user?.id);
    const { data: lastAttempt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useLastAttempt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLastAttempt"])(user?.id);
    const { data: myCourses, isLoading: myCoursesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentCourses"])(user?.id);
    const { data: allCourses, isLoading: allCoursesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllCourses"])(user?.id);
    const { data: allTestSeries, isLoading: allTestSeriesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllTestSeries"])();
    const { data: enrollmentsWithExpiry } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEnrollmentsWithExpiry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollmentsWithExpiry"])();
    // Create a map of course ID to expiry info for quick lookup
    const expiryMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StudentDashboard.useMemo[expiryMap]": ()=>{
            const map = new Map();
            enrollmentsWithExpiry?.forEach({
                "StudentDashboard.useMemo[expiryMap]": (enrollment)=>{
                    map.set(enrollment.course_id, {
                        daysRemaining: enrollment.daysRemaining,
                        isExpired: enrollment.isExpired,
                        urgencyLevel: enrollment.urgencyLevel
                    });
                }
            }["StudentDashboard.useMemo[expiryMap]"]);
            return map;
        }
    }["StudentDashboard.useMemo[expiryMap]"], [
        enrollmentsWithExpiry
    ]);
    // ⚡ INSTANT NAVIGATION: Prefetch course data on hover
    const { prefetchCourse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefetchCourse"])();
    // Enrollment mutation
    const enrollMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useEnrollCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollCourse"])();
    const [enrollingCourseId, setEnrollingCourseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fadeIn = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: (i)=>({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.15,
                    duration: 0.6
                }
            })
    };
    const handleContinueTest = ()=>{
        if (lastAttempt) {
            router.push(`/student/exam/${lastAttempt.examId}/attempt/${lastAttempt.attemptId}`);
        }
    };
    const handleContinueCourse = (courseId)=>{
        router.push(`/learn/${courseId}`);
    };
    const handleEnrollCourse = (courseId, price)=>{
        if (!user?.id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please log in to enroll");
            router.push("/auth/login");
            return;
        }
        if (price === 0) {
            // Free course - use mutation hook
            setEnrollingCourseId(courseId);
            enrollMutation.mutate({
                courseId,
                userId: user.id
            }, {
                onSuccess: ()=>{
                    setEnrollingCourseId(null);
                    router.push(`/learn/${courseId}`);
                },
                onError: ()=>{
                    setEnrollingCourseId(null);
                }
            });
        } else {
            // Paid course - go to course page for payment
            router.push(`/courses/${courseId}`);
        }
    };
    const formatDate = (dateString)=>{
        if (!dateString) return "TBA";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };
    const getSeriesIcon = (index)=>{
        const icons = [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                className: "w-5 h-5 text-indigo-500"
            }, "book", false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                className: "w-5 h-5 text-green-500"
            }, "cal", false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                className: "w-5 h-5 text-yellow-500"
            }, "star", false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ];
        return icons[index % icons.length];
    };
    const statsData = [
        {
            title: "Total Exams Given",
            value: statsLoading ? "..." : stats?.totalExams.toString() || "0",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                className: "w-6 h-6 text-green-500"
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 148,
                columnNumber: 13
            }, this),
            color: "from-green-50 to-emerald-100 dark:from-slate-800 dark:to-slate-900"
        },
        {
            title: "Average Score",
            value: statsLoading ? "..." : `${stats?.averageScore || 0}%`,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                className: "w-6 h-6 text-indigo-500"
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 154,
                columnNumber: 13
            }, this),
            color: "from-indigo-50 to-blue-100 dark:from-slate-800 dark:to-slate-900"
        },
        {
            title: "Courses Enrolled",
            value: myCoursesLoading ? "..." : myCourses?.length.toString() || "0",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                className: "w-6 h-6 text-purple-500"
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 160,
                columnNumber: 13
            }, this),
            color: "from-purple-50 to-pink-100 dark:from-slate-800 dark:to-slate-900"
        },
        {
            title: "Rank",
            value: statsLoading ? "..." : `#${stats?.rank || 0}`,
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                className: "w-6 h-6 text-yellow-500"
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 166,
                columnNumber: 13
            }, this),
            color: "from-yellow-50 to-amber-100 dark:from-slate-800 dark:to-slate-900"
        }
    ];
    if (userLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700 animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 w-96 bg-slate-100 dark:bg-slate-600 rounded"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/student/dashboard/page.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
                    children: [
                        1,
                        2,
                        3,
                        4
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 rounded-2xl bg-white/70 dark:bg-slate-800/60 shadow-lg border border-slate-100 dark:border-slate-700 animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 w-16 bg-slate-100 dark:bg-slate-600 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-3 w-24 bg-slate-100 dark:bg-slate-600 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/student/dashboard/page.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 border-b border-slate-200 dark:border-slate-700 pb-1",
                    children: [
                        1,
                        2,
                        3,
                        4
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
                        }, i, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/student/dashboard/page.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-4 animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                1,
                                2,
                                3
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md animate-pulse",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-40 w-full bg-slate-200 dark:bg-slate-700 rounded-lg mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 w-full bg-slate-100 dark:bg-slate-600 rounded mb-1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-4 w-2/3 bg-slate-100 dark:bg-slate-600 rounded mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2 w-full bg-slate-100 dark:bg-slate-600 rounded mb-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-10 w-full bg-slate-200 dark:bg-slate-700 rounded"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/student/dashboard/page.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/student/dashboard/page.tsx",
            lineNumber: 173,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen transition-colors duration-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 0,
                className: "rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl md:text-3xl font-bold text-slate-800 dark:text-white",
                                children: [
                                    "Welcome back, ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-indigo-600 dark:text-indigo-400",
                                        children: [
                                            user?.fullName || "Student",
                                            "!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-600 dark:text-slate-400 mt-2",
                                children: "Keep up the great work! You're progressing steadily towards your goals."
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    lastAttempt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileHover: {
                            scale: 1.05
                        },
                        onClick: handleContinueTest,
                        className: "mt-4 md:mt-0 bg-linear-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Continue Last Test"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
                children: statsData.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: fadeIn,
                        initial: "hidden",
                        animate: "visible",
                        custom: i + 1,
                        whileHover: {
                            scale: 1.03
                        },
                        className: `p-5 rounded-2xl bg-linear-to-br ${stat.color} shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-between`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-300",
                                        children: stat.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-slate-800 dark:text-white",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this),
                            stat.icon
                        ]
                    }, i, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 255,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-1 scrollbar-hide",
                children: [
                    {
                        id: "overview",
                        label: "Overview"
                    },
                    {
                        id: "my-courses",
                        label: "My Courses"
                    },
                    {
                        id: "all-courses",
                        label: "All Courses"
                    },
                    {
                        id: "test-series",
                        label: "Test Series"
                    },
                    {
                        id: "all-test-series",
                        label: "All Test Series"
                    }
                ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(tab.id),
                        className: `px-4 py-2 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"}`,
                        children: tab.label
                    }, tab.id, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: (myCourses && myCourses.length > 0 || testSeries && testSeries.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: fadeIn,
                    initial: "hidden",
                    animate: "visible",
                    custom: 5,
                    className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-slate-800 dark:text-white",
                                    children: "Continue Learning"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 308,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: ()=>setActiveTab("my-courses"),
                                    className: "text-indigo-600 dark:text-indigo-400",
                                    children: [
                                        "View All ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "w-4 h-4 ml-1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 315,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 307,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                myCourses?.slice(0, 2).map((course)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        onClick: ()=>handleContinueCourse(course.id),
                                        onMouseEnter: ()=>prefetchCourse(course.id),
                                        className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-slate-800 dark:text-white flex-1",
                                                        children: course.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                                                        children: "Course"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 21
                                            }, this),
                                            expiryMap.has(course.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardExpiryBadge"], {
                                                daysRemaining: expiryMap.get(course.id).daysRemaining,
                                                isExpired: expiryMap.get(course.id).isExpired,
                                                urgencyLevel: expiryMap.get(course.id).urgencyLevel
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs mb-2 text-slate-500 dark:text-slate-400 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Progress"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            course.progress_percentage.toFixed(0),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500",
                                                    style: {
                                                        width: `${course.progress_percentage}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, course.id, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 19
                                    }, this)),
                                testSeries?.slice(0, 1).map((test)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        onClick: ()=>handleContinueCourse(test.id),
                                        onMouseEnter: ()=>prefetchCourse(test.id),
                                        className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-slate-800 dark:text-white flex-1",
                                                        children: test.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                                                        children: "Test Series"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 363,
                                                columnNumber: 21
                                            }, this),
                                            expiryMap.has(test.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardExpiryBadge"], {
                                                daysRemaining: expiryMap.get(test.id).daysRemaining,
                                                isExpired: expiryMap.get(test.id).isExpired,
                                                urgencyLevel: expiryMap.get(test.id).urgencyLevel
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 370,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs mb-2 text-slate-500 dark:text-slate-400 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Progress"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            test.progress.toFixed(0),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 376,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500",
                                                    style: {
                                                        width: `${test.progress}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                                    lineNumber: 381,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 380,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, test.id, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 356,
                                        columnNumber: 19
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 318,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/student/dashboard/page.tsx",
                    lineNumber: 300,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this),
            activeTab === "my-courses" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 5,
                className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-slate-800 dark:text-white mb-4",
                        children: "My Courses"
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this),
                    myCoursesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-indigo-600"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 406,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 405,
                        columnNumber: 13
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
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-800 dark:text-white flex-1",
                                                children: course.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 427,
                                                columnNumber: 21
                                            }, this),
                                            expiryMap.has(course.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardExpiryBadge"], {
                                                daysRemaining: expiryMap.get(course.id).daysRemaining,
                                                isExpired: expiryMap.get(course.id).isExpired,
                                                urgencyLevel: expiryMap.get(course.id).urgencyLevel
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 429,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 426,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2",
                                        children: course.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 436,
                                        columnNumber: 19
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
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    course.progress_percentage.toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500",
                                            style: {
                                                width: `${course.progress_percentage}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 441,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            handleContinueCourse(course.id);
                                        },
                                        className: "w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
                                        children: "Continue Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 447,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, course.id, true, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 411,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 409,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                className: "w-12 h-12 mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 461,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No courses enrolled yet"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 462,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mt-1",
                                children: "Browse available courses to get started"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 463,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>setActiveTab("all-courses"),
                                className: "mt-4 bg-indigo-600 hover:bg-indigo-700",
                                children: "Browse Courses"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 464,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 460,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 395,
                columnNumber: 9
            }, this),
            activeTab === "all-courses" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 5,
                className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-slate-800 dark:text-white mb-4",
                        children: "All Courses"
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 483,
                        columnNumber: 11
                    }, this),
                    allCoursesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-indigo-600"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 487,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 486,
                        columnNumber: 13
                    }, this) : allCourses && allCourses.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: allCourses.map((course)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                whileHover: {
                                    scale: 1.02
                                },
                                onMouseEnter: ()=>prefetchCourse(course.id),
                                className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-40 w-full mb-3 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseThumbnail"], {
                                            src: course.thumbnail_url,
                                            title: course.title,
                                            category: "Course",
                                            className: "w-full h-full"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 499,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 498,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-slate-800 dark:text-white mb-2",
                                        children: course.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 506,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-2",
                                        children: [
                                            "By ",
                                            course.instructor_name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2",
                                        children: course.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-slate-500 dark:text-slate-400",
                                                children: [
                                                    course.total_lessons,
                                                    " lessons"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 510,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold text-indigo-600 dark:text-indigo-400",
                                                children: course.price === 0 ? "Free" : `₹${course.price}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 511,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 509,
                                        columnNumber: 19
                                    }, this),
                                    course.is_enrolled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>handleContinueCourse(course.id),
                                        className: "w-full bg-green-600 hover:bg-green-700",
                                        children: "Continue Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 516,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>handleEnrollCourse(course.id, course.price),
                                        disabled: enrollingCourseId === course.id,
                                        className: "w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50",
                                        children: enrollingCourseId === course.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "w-4 h-4 mr-2 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                                    lineNumber: 530,
                                                    columnNumber: 27
                                                }, this),
                                                "Enrolling..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 27
                                                }, this),
                                                course.price === 0 ? "Enroll Free" : "View Course"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 523,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, course.id, true, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 492,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 490,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "w-12 h-12 mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 546,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No courses available yet"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 547,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 545,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 476,
                columnNumber: 9
            }, this),
            activeTab === "test-series" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 5,
                className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-slate-800 dark:text-white mb-4",
                        children: "Your Test Series"
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this),
                    seriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-indigo-600"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 565,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 564,
                        columnNumber: 13
                    }, this) : testSeries && testSeries.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: testSeries.map((test)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                whileHover: {
                                    scale: 1.02
                                },
                                onClick: ()=>handleContinueCourse(test.id),
                                onMouseEnter: ()=>prefetchCourse(test.id),
                                className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-40 w-full mb-3 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseThumbnail"], {
                                            src: test.thumbnail_url,
                                            title: test.title,
                                            category: "Test Series",
                                            className: "w-full h-full"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 578,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 577,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-slate-800 dark:text-white flex-1",
                                                children: test.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 586,
                                                columnNumber: 21
                                            }, this),
                                            expiryMap.has(test.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$ExpiryComponents$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardExpiryBadge"], {
                                                daysRemaining: expiryMap.get(test.id).daysRemaining,
                                                isExpired: expiryMap.get(test.id).isExpired,
                                                urgencyLevel: expiryMap.get(test.id).urgencyLevel
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 588,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 585,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2",
                                        children: test.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 595,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs mb-2 text-slate-500 dark:text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    test.completedExams,
                                                    "/",
                                                    test.totalExams,
                                                    " exams"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 597,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    test.progress.toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 596,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2 rounded-full bg-linear-to-r from-indigo-500 to-purple-500",
                                            style: {
                                                width: `${test.progress}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 601,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 600,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            handleContinueCourse(test.id);
                                        },
                                        className: "w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
                                        children: "Continue Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, test.id, true, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 570,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 568,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "w-12 h-12 mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 620,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No test series enrolled yet"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 621,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mt-1",
                                children: "Browse available test series to get started"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 622,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>setActiveTab("all-test-series"),
                                className: "mt-4 bg-indigo-600 hover:bg-indigo-700",
                                children: "Browse Test Series"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 623,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 619,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 554,
                columnNumber: 9
            }, this),
            activeTab === "all-test-series" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 5,
                className: "rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-slate-800 dark:text-white mb-4",
                        children: "All Test Series"
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 642,
                        columnNumber: 11
                    }, this),
                    allTestSeriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-indigo-600"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 646,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 645,
                        columnNumber: 13
                    }, this) : allTestSeries && allTestSeries.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: allTestSeries.map((series)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                whileHover: {
                                    scale: 1.02
                                },
                                onMouseEnter: ()=>prefetchCourse(series.id),
                                className: "p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-40 w-full mb-3 rounded-lg overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CourseThumbnail"], {
                                            src: series.thumbnail_url,
                                            title: series.title,
                                            category: "Test Series",
                                            className: "w-full h-full"
                                        }, void 0, false, {
                                            fileName: "[project]/app/student/dashboard/page.tsx",
                                            lineNumber: 658,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 657,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-slate-800 dark:text-white mb-2",
                                        children: series.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 665,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2",
                                        children: series.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 666,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs mb-3 text-slate-500 dark:text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    series.total_lessons || 0,
                                                    " exams"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 668,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-indigo-600 dark:text-indigo-400",
                                                children: series.price === 0 ? "Free" : `₹${series.price}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/dashboard/page.tsx",
                                                lineNumber: 669,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 667,
                                        columnNumber: 19
                                    }, this),
                                    series.is_enrolled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>handleContinueCourse(series.id),
                                        className: "w-full bg-green-600 hover:bg-green-700",
                                        children: "Continue Learning"
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 674,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>handleEnrollCourse(series.id, series.price),
                                        disabled: enrollingCourseId === series.id,
                                        className: "w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50",
                                        children: enrollingCourseId === series.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "w-4 h-4 mr-2 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 27
                                                }, this),
                                                "Enrolling..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                                    lineNumber: 693,
                                                    columnNumber: 27
                                                }, this),
                                                series.price === 0 ? "Enroll Free" : "View Details"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/dashboard/page.tsx",
                                        lineNumber: 681,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, series.id, true, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 651,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 649,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                className: "w-12 h-12 mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 704,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No test series available yet"
                            }, void 0, false, {
                                fileName: "[project]/app/student/dashboard/page.tsx",
                                lineNumber: 705,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/dashboard/page.tsx",
                        lineNumber: 703,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 635,
                columnNumber: 9
            }, this),
            stats && stats.averageScore >= 75 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: fadeIn,
                initial: "hidden",
                animate: "visible",
                custom: 6,
                className: "rounded-3xl bg-linear-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between flex-wrap gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold",
                                    children: "Congratulations! 🎉"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-90",
                                    children: [
                                        "You're performing excellently with ",
                                        stats.averageScore,
                                        "% average score!"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/student/dashboard/page.tsx",
                                    lineNumber: 723,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 721,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            whileHover: {
                                scale: 1.05
                            },
                            onClick: ()=>router.push("/student/achievements"),
                            className: "px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold shadow-md",
                            children: "View Achievements"
                        }, void 0, false, {
                            fileName: "[project]/app/student/dashboard/page.tsx",
                            lineNumber: 727,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/student/dashboard/page.tsx",
                    lineNumber: 720,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/student/dashboard/page.tsx",
                lineNumber: 713,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/student/dashboard/page.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}
_s(StudentDashboard, "0GfjxeGOzwdNA/o7YakeWVR2kAQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentStats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentStats"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentTestSeries"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useLastAttempt$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLastAttempt"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useStudentCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudentCourses"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllCourses"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllTestSeries"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useEnrollmentsWithExpiry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollmentsWithExpiry"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefetchCourse"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useEnrollCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollCourse"]
    ];
});
_c = StudentDashboard;
var _c;
__turbopack_context__.k.register(_c, "StudentDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/student/dashboard/page.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/student/dashboard/page.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_886b9930._.js.map