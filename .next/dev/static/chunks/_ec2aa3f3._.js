(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/app/student/all-test-series/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AllTestSeriesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useCurrentUser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useAllTestSeries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/usePrefetchCourse.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$CourseThumbnail$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/CourseThumbnail.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/hooks/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useEnrollCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/mutations/useEnrollCourse.ts [app-client] (ecmascript)");
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
function AllTestSeriesPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: user, isLoading: userLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"])();
    const { data: allTestSeries, isLoading: allTestSeriesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllTestSeries"])();
    const { prefetchCourse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefetchCourse"])();
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
                    delay: i * 0.1,
                    duration: 0.5
                }
            })
    };
    const handleContinueCourse = (courseId)=>{
        router.push(`/learn/${courseId}`);
    };
    const handleEnrollCourse = (courseId, price)=>{
        if (!user?.id) {
            router.push(`/auth/login?redirect=/courses/${courseId}`);
            return;
        }
        if (price === 0) {
            setEnrollingCourseId(courseId);
            enrollMutation.mutate({
                courseId,
                userId: user.id
            }, {
                onSuccess: ()=>{
                    setEnrollingCourseId(null);
                },
                onError: ()=>{
                    setEnrollingCourseId(null);
                }
            });
        } else {
            router.push(`/courses/${courseId}`);
        }
    };
    if (userLoading || allTestSeriesLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700 animate-pulse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                        }, void 0, false, {
                            fileName: "[project]/app/student/all-test-series/page.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 w-96 bg-slate-100 dark:bg-slate-600 rounded"
                        }, void 0, false, {
                            fileName: "[project]/app/student/all-test-series/page.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/student/all-test-series/page.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 shadow-lg border border-slate-100 dark:border-slate-700 animate-pulse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-40 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/all-test-series/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/all-test-series/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-4 bg-slate-100 dark:bg-slate-600 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/app/student/all-test-series/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/app/student/all-test-series/page.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/student/all-test-series/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/student/all-test-series/page.tsx",
            lineNumber: 61,
            columnNumber: 7
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
                        children: "All Test Series"
                    }, void 0, false, {
                        fileName: "[project]/app/student/all-test-series/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-600 dark:text-slate-400",
                        children: "Explore and enroll in our comprehensive test series"
                    }, void 0, false, {
                        fileName: "[project]/app/student/all-test-series/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/all-test-series/page.tsx",
                lineNumber: 82,
                columnNumber: 7
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
                        children: "Available Test Series"
                    }, void 0, false, {
                        fileName: "[project]/app/student/all-test-series/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    allTestSeriesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-6 h-6 animate-spin text-indigo-600"
                        }, void 0, false, {
                            fileName: "[project]/app/student/all-test-series/page.tsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/student/all-test-series/page.tsx",
                        lineNumber: 107,
                        columnNumber: 11
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
                                            fileName: "[project]/app/student/all-test-series/page.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/all-test-series/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-slate-800 dark:text-white mb-2",
                                        children: series.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/all-test-series/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2",
                                        children: series.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/all-test-series/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
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
                                                fileName: "[project]/app/student/all-test-series/page.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-indigo-600 dark:text-indigo-400",
                                                children: series.price === 0 ? "Free" : `₹${series.price}`
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/all-test-series/page.tsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/all-test-series/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, this),
                                    series.is_enrolled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>handleContinueCourse(series.id),
                                        className: "w-full bg-green-600 hover:bg-green-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/all-test-series/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            "Continue Learning"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/all-test-series/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: ()=>handleEnrollCourse(series.id, series.price),
                                        disabled: enrollingCourseId === series.id,
                                        className: "w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50",
                                        children: enrollingCourseId === series.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "w-4 h-4 mr-2 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/all-test-series/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 25
                                                }, this),
                                                "Enrolling..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                    className: "w-4 h-4 mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/student/all-test-series/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 25
                                                }, this),
                                                series.price === 0 ? "Enroll Free" : "View Details"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/all-test-series/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, series.id, true, {
                                fileName: "[project]/app/student/all-test-series/page.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/student/all-test-series/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-slate-500 dark:text-slate-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                className: "w-12 h-12 mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/all-test-series/page.tsx",
                                lineNumber: 167,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "No test series available yet"
                            }, void 0, false, {
                                fileName: "[project]/app/student/all-test-series/page.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/all-test-series/page.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/all-test-series/page.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/student/all-test-series/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(AllTestSeriesPage, "CzT8veMLKqWyxxrP58E+vUntiaU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useCurrentUser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCurrentUser"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useAllTestSeries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAllTestSeries"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$usePrefetchCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePrefetchCourse"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$mutations$2f$useEnrollCourse$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollCourse"]
    ];
});
_c = AllTestSeriesPage;
var _c;
__turbopack_context__.k.register(_c, "AllTestSeriesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/student/all-test-series/page.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/student/all-test-series/page.tsx [app-client] (ecmascript)"));
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
"[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ShoppingCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ShoppingCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ShoppingCart", [
    [
        "circle",
        {
            cx: "8",
            cy: "21",
            r: "1",
            key: "jimo8o"
        }
    ],
    [
        "circle",
        {
            cx: "19",
            cy: "21",
            r: "1",
            key: "13723u"
        }
    ],
    [
        "path",
        {
            d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
            key: "9zh506"
        }
    ]
]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=shopping-cart.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShoppingCart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_ec2aa3f3._.js.map