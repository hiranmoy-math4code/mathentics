(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/hooks/useLessonData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLessonData",
    ()=>useLessonData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useLessonData(lessonId, courseId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'lesson',
            lessonId,
            courseId
        ],
        queryFn: {
            "useLessonData.useQuery": async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                // Get authenticated user
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Not authenticated");
                // Fetch lesson data
                const { data: lesson, error: lessonError } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
                if (lessonError || !lesson) {
                    throw new Error("Lesson not found");
                }
                const result = {
                    lesson
                };
                // Fetch quiz/exam data if lesson is a quiz
                if (lesson.content_type === 'quiz' && lesson.exam_id) {
                    const [examResult, sectionsResult, attemptsResult] = await Promise.all([
                        supabase.from("exams").select("*").eq("id", lesson.exam_id).single(),
                        supabase.from("sections").select("id, questions:questions(id)").eq("exam_id", lesson.exam_id),
                        supabase.from("exam_attempts").select("*").eq("exam_id", lesson.exam_id).eq("student_id", user.id)
                    ]);
                    result.exam = examResult.data;
                    // Calculate question count
                    const sections = sectionsResult.data || [];
                    result.questionsCount = sections.reduce({
                        "useLessonData.useQuery": (acc, section)=>acc + (section.questions?.length || 0)
                    }["useLessonData.useQuery"], 0);
                    result.attempts = attemptsResult.data || [];
                }
                // Fetch course/author context (optional)
                try {
                    const { data: course } = await supabase.from("courses").select("creator_id").eq("id", courseId).single();
                    if (course?.creator_id) {
                        const { data: author } = await supabase.from("profiles").select("*").eq("id", course.creator_id).single();
                        result.author = author;
                    }
                } catch (authorError) {
                    // Ignore author fetch errors - not critical
                    console.warn("Could not fetch author:", authorError);
                }
                return result;
            }
        }["useLessonData.useQuery"],
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        placeholderData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keepPreviousData"],
        enabled: !!lessonId,
        retry: 1
    });
}
_s(useLessonData, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/LessonContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "useLessonContext",
    ()=>useLessonContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const LessonContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useLessonContext() {
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LessonContext);
    if (!context) {
        throw new Error("useLessonContext must be used within a LessonTracker (Provider)");
    }
    return context;
}
_s(useLessonContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const __TURBOPACK__default__export__ = LessonContext;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/VideoPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize.js [app-client] (ecmascript) <export default as Maximize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize.js [app-client] (ecmascript) <export default as Minimize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:bae3ba [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LessonContext.tsx [app-client] (ecmascript)");
;
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
// Dynamically import ReactPlayer to avoid hydration errors
const ReactPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/node_modules/react-player/dist/index.js [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/node_modules/react-player/dist/index.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ReactPlayer;
const extractYouTubeId = (s)=>{
    if (!s) return null;
    const str = s.trim();
    const idMatch = str.match(/^[\w-]{11}$/);
    if (idMatch) return idMatch[0];
    const qMatch = str.match(/[?&]v=([\w-]{11})/);
    if (qMatch) return qMatch[1];
    const shortMatch = str.match(/youtu\.be\/([\w-]{11})/);
    if (shortMatch) return shortMatch[1];
    const embMatch = str.match(/embed\/([\w-]{11})/);
    if (embMatch) return embMatch[1];
    return null;
};
const formatTime = (seconds)=>{
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
function loadYouTubeIframeAPI() {
    return new Promise((resolve)=>{
        if (window.YT && window.YT.Player) return resolve();
        if (document.getElementById("youtube-iframe-api")) {
            const interval = setInterval(()=>{
                if (window.YT && window.YT.Player) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
            return;
        }
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = ()=>resolve();
    });
}
function VideoPlayer({ url, className = "", thumbUrl }) {
    _s();
    const wrapperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const progressContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ytRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rpRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const controlsTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [usingYouTube, setUsingYouTube] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [youtubeId, setYoutubeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlayingState, setIsPlayingState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showCover, setShowCover] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [muted, setMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [sliderValue, setSliderValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [seeking, setSeeking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rewarded, setRewarded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Make lesson context optional - it may not exist in admin builder
    let markComplete = null;
    try {
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessonContext"])();
        markComplete = context.markComplete;
    } catch (error) {
        // Context not available (e.g., in admin builder), that's okay
        markComplete = null;
    }
    // Missing state variables
    const [showControls, setShowControls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showQualityModal, setShowQualityModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSpeedMenu, setShowSpeedMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullScreen, setIsFullScreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [playbackRate, setPlaybackRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedQuality, setSelectedQuality] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("auto");
    const [qualityOptions, setQualityOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const speedOptions = [
        0.5,
        0.75,
        1,
        1.25,
        1.5,
        2
    ];
    const updateQualityOptions = (target)=>{
        try {
            if (typeof target.getAvailableQualityLevels === 'function') {
                const levels = target.getAvailableQualityLevels();
                if (levels && levels.length > 0) {
                    setQualityOptions(levels);
                }
            }
        } catch (e) {}
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            setMounted(true);
            const yId = extractYouTubeId(url);
            if (yId) {
                setUsingYouTube(true);
                setYoutubeId(yId);
            } else {
                setUsingYouTube(false);
                setYoutubeId(null);
            }
        }
    }["VideoPlayer.useEffect"], [
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const getUser = {
                "VideoPlayer.useEffect.getUser": async ()=>{
                    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) setUserId(user.id);
                }
            }["VideoPlayer.useEffect.getUser"];
            getUser();
        }
    }["VideoPlayer.useEffect"], []);
    const startHideControlsTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[startHideControlsTimer]": ()=>{
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            if (isPlayingState && !showQualityModal && !showSpeedMenu) {
                controlsTimeoutRef.current = setTimeout({
                    "VideoPlayer.useCallback[startHideControlsTimer]": ()=>{
                        setShowControls(false);
                        setShowSpeedMenu(false);
                        setShowQualityModal(false);
                    }
                }["VideoPlayer.useCallback[startHideControlsTimer]"], 3000);
            }
        }
    }["VideoPlayer.useCallback[startHideControlsTimer]"], [
        isPlayingState,
        showQualityModal,
        showSpeedMenu
    ]);
    const handleMouseMove = ()=>{
        setShowControls(true);
        startHideControlsTimer();
    };
    const handleMouseLeave = ()=>{
        if (isPlayingState && !showQualityModal && !showSpeedMenu) setShowControls(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            if (isPlayingState) startHideControlsTimer();
            else {
                setShowControls(true);
                if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            }
        }
    }["VideoPlayer.useEffect"], [
        isPlayingState,
        startHideControlsTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            let pollTimer = null;
            const initYT = {
                "VideoPlayer.useEffect.initYT": async ()=>{
                    if (!usingYouTube || !youtubeId || !containerRef.current) return;
                    try {
                        await loadYouTubeIframeAPI();
                    } catch  {
                        setErrorMsg("Load Error");
                        return;
                    }
                    if (ytRef.current) {
                        try {
                            ytRef.current.destroy();
                        } catch  {}
                        ytRef.current = null;
                    }
                    containerRef.current.innerHTML = "";
                    const el = document.createElement("div");
                    el.id = `yt - player - ${youtubeId} -${Date.now()} `;
                    el.style.width = "100%";
                    el.style.height = "100%";
                    el.style.pointerEvents = "none";
                    containerRef.current.appendChild(el);
                    ytRef.current = new window.YT.Player(el.id, {
                        videoId: youtubeId,
                        playerVars: {
                            controls: 0,
                            modestbranding: 1,
                            rel: 0,
                            disablekb: 1,
                            iv_load_policy: 3,
                            showinfo: 0,
                            playsinline: 1,
                            enablejsapi: 1,
                            origin: ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable"
                        },
                        events: {
                            onReady: {
                                "VideoPlayer.useEffect.initYT": (ev)=>{
                                    setIsReady(true);
                                    try {
                                        const d = ev.target.getDuration();
                                        if (d > 0) setDuration(d);
                                    } catch  {}
                                    updateQualityOptions(ev.target);
                                    pollTimer = window.setInterval({
                                        "VideoPlayer.useEffect.initYT": ()=>{
                                            if (seeking) return;
                                            try {
                                                const t = ev.target.getCurrentTime?.() || 0;
                                                const d = ev.target.getDuration?.() || duration || 0;
                                                setCurrentTime(t);
                                                if (d > 0) {
                                                    setDuration(d);
                                                    setSliderValue(t / d);
                                                }
                                            } catch  {}
                                        }
                                    }["VideoPlayer.useEffect.initYT"], 250);
                                }
                            }["VideoPlayer.useEffect.initYT"],
                            onStateChange: {
                                "VideoPlayer.useEffect.initYT": (e)=>{
                                    const s = e.data;
                                    if (s === 1) {
                                        setIsPlayingState(true);
                                        setIsPaused(false);
                                        setShowCover(false);
                                        updateQualityOptions(e.target);
                                    } else if (s === 2 || s === 0) {
                                        setIsPlayingState(false);
                                        setIsPaused(true);
                                    }
                                }
                            }["VideoPlayer.useEffect.initYT"],
                            onError: {
                                "VideoPlayer.useEffect.initYT": ()=>{
                                    setErrorMsg("Error");
                                    setIsReady(true);
                                }
                            }["VideoPlayer.useEffect.initYT"]
                        }
                    });
                }
            }["VideoPlayer.useEffect.initYT"];
            if (usingYouTube) initYT();
            return ({
                "VideoPlayer.useEffect": ()=>{
                    if (pollTimer) clearInterval(pollTimer);
                    if (ytRef.current) {
                        try {
                            ytRef.current.destroy();
                        } catch  {}
                    }
                }
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], [
        usingYouTube,
        youtubeId
    ]);
    const onRPReady = ()=>{
        setIsReady(true);
        try {
            const d = rpRef.current?.getDuration();
            if (d > 0) setDuration(d);
        } catch  {}
    };
    const onRPProgress = async (state)=>{
        if (!seeking) {
            setSliderValue(state.played);
            setCurrentTime(state.playedSeconds);
            // Reward Logic
            if (!rewarded && userId && state.played > 0.8) {
                setRewarded(true);
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["awardCoins"])(userId, 'video_watch', url, `Watched video: ${url} `);
                if (res.success && res.message) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res.message, {
                        icon: "🪙"
                    });
                }
                // Mark lesson complete via context (if available)
                if (markComplete) {
                    markComplete();
                }
            }
        }
    };
    const onRPPause = ()=>{
        setIsPlayingState(false);
        setIsPaused(true);
    };
    const onRPPlay = ()=>{
        setIsPlayingState(true);
        setIsPaused(false);
        setShowCover(false);
    };
    const sendYTCommand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[sendYTCommand]": (func, args = [])=>{
            if (!usingYouTube) return;
            try {
                if (ytRef.current && typeof ytRef.current[func] === 'function') return ytRef.current[func](...args);
            } catch  {}
            try {
                const iframe = containerRef.current?.querySelector("iframe");
                iframe?.contentWindow?.postMessage(JSON.stringify({
                    event: "command",
                    func,
                    args
                }), "*");
            } catch  {}
        }
    }["VideoPlayer.useCallback[sendYTCommand]"], [
        usingYouTube
    ]);
    const handlePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[handlePlay]": ()=>{
            if (usingYouTube) sendYTCommand("playVideo");
            else setIsPlayingState(true);
            setIsPaused(false);
            setShowQualityModal(false);
            setShowSpeedMenu(false);
        }
    }["VideoPlayer.useCallback[handlePlay]"], [
        usingYouTube,
        sendYTCommand
    ]);
    const handlePause = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[handlePause]": ()=>{
            if (usingYouTube) sendYTCommand("pauseVideo");
            else setIsPlayingState(false);
            setIsPaused(true);
        }
    }["VideoPlayer.useCallback[handlePause]"], [
        usingYouTube,
        sendYTCommand
    ]);
    const togglePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[togglePlay]": ()=>isPlayingState ? handlePause() : handlePlay()
    }["VideoPlayer.useCallback[togglePlay]"], [
        isPlayingState,
        handlePause,
        handlePlay
    ]);
    const seekToFraction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[seekToFraction]": (fraction)=>{
            const d = duration || (usingYouTube ? ytRef.current?.getDuration() : rpRef.current?.getDuration()) || 0;
            if (d <= 0) return;
            const secs = fraction * d;
            if (usingYouTube) sendYTCommand("seekTo", [
                secs,
                true
            ]);
            else rpRef.current?.seekTo(fraction, "fraction");
            setCurrentTime(secs);
            setSliderValue(fraction);
            handlePlay();
            startHideControlsTimer();
        }
    }["VideoPlayer.useCallback[seekToFraction]"], [
        duration,
        usingYouTube,
        sendYTCommand,
        handlePlay,
        startHideControlsTimer
    ]);
    /* --- CLICK-TO-SEEK LOGIC --- */ const handleProgressBarClick = (e)=>{
        if (!progressContainerRef.current) return;
        const rect = progressContainerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const fraction = Math.max(0, Math.min(1, clickX / rect.width));
        setSeeking(false);
        seekToFraction(fraction);
    };
    const handleSliderChange = (e)=>{
        setSliderValue(parseFloat(e.target.value));
        startHideControlsTimer();
    };
    const handleSliderEnd = (e)=>{
        setSeeking(false);
        seekToFraction(parseFloat(e.currentTarget.value));
    };
    const toggleMute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[toggleMute]": ()=>{
            if (usingYouTube) sendYTCommand(muted ? "unMute" : "mute");
            setMuted({
                "VideoPlayer.useCallback[toggleMute]": (p)=>!p
            }["VideoPlayer.useCallback[toggleMute]"]);
        }
    }["VideoPlayer.useCallback[toggleMute]"], [
        usingYouTube,
        sendYTCommand,
        muted
    ]);
    const rewind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[rewind]": ()=>{
            const d = duration || 1;
            const t = Math.max(0, currentTime - 10);
            seekToFraction(t / d);
            setShowControls(true);
        }
    }["VideoPlayer.useCallback[rewind]"], [
        currentTime,
        duration,
        seekToFraction
    ]);
    const fastForward = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[fastForward]": ()=>{
            const d = duration || 1;
            const t = Math.min(d, currentTime + 10);
            seekToFraction(t / d);
            setShowControls(true);
        }
    }["VideoPlayer.useCallback[fastForward]"], [
        currentTime,
        duration,
        seekToFraction
    ]);
    const handleFullScreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "VideoPlayer.useCallback[handleFullScreen]": async ()=>{
            if (!wrapperRef.current) return;
            try {
                if (document.fullscreenElement) {
                    await document.exitFullscreen();
                    setIsFullScreen(false);
                } else {
                    await wrapperRef.current.requestFullscreen();
                    setIsFullScreen(true);
                }
            } catch  {}
        }
    }["VideoPlayer.useCallback[handleFullScreen]"], []);
    // --- KEYBOARD SHORTCUTS ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const handleKeyDown = {
                "VideoPlayer.useEffect.handleKeyDown": (e)=>{
                    if (e.target.tagName === 'INPUT') return;
                    setShowControls(true);
                    startHideControlsTimer();
                    switch(e.key){
                        case ' ':
                        case 'k':
                        case 'K':
                            e.preventDefault();
                            togglePlay();
                            break;
                        case 'ArrowRight':
                        case 'l':
                        case 'L':
                            e.preventDefault();
                            fastForward();
                            break;
                        case 'ArrowLeft':
                        case 'j':
                        case 'J':
                            e.preventDefault();
                            rewind();
                            break;
                        case 'f':
                        case 'F':
                            e.preventDefault();
                            handleFullScreen();
                            break;
                        case 'm':
                        case 'M':
                            e.preventDefault();
                            toggleMute();
                            break;
                    }
                }
            }["VideoPlayer.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "VideoPlayer.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], [
        togglePlay,
        fastForward,
        rewind,
        handleFullScreen,
        toggleMute,
        startHideControlsTimer
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const onFullscreenChange = {
                "VideoPlayer.useEffect.onFullscreenChange": ()=>setIsFullScreen(!!document.fullscreenElement)
            }["VideoPlayer.useEffect.onFullscreenChange"];
            document.addEventListener('fullscreenchange', onFullscreenChange);
            return ({
                "VideoPlayer.useEffect": ()=>document.removeEventListener('fullscreenchange', onFullscreenChange)
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], []);
    const changeQuality = (q)=>{
        setSelectedQuality(q);
        setShowQualityModal(false);
        if (usingYouTube) {
            sendYTCommand("setPlaybackQuality", [
                q
            ]);
            sendYTCommand("setPlaybackQualityRange", [
                q
            ]);
        }
    };
    const changeSpeed = (s)=>{
        setPlaybackRate(s);
        setShowSpeedMenu(false);
        if (usingYouTube) sendYTCommand("setPlaybackRate", [
            s
        ]);
    };
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "aspect-video bg-slate-900 rounded-xl"
    }, void 0, false, {
        fileName: "[project]/components/VideoPlayer.tsx",
        lineNumber: 330,
        columnNumber: 26
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapperRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: "jsx-14d53511f5361a60" + " " + `relative w-full h-full bg-black group overflow-hidden rounded-xl shadow-2xl border border-slate-900 ${className} ${isFullScreen ? 'rounded-none border-none cursor-none' : ''} ${showControls ? 'cursor-auto' : ''} `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-14d53511f5361a60" + " " + "w-full h-full relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        className: "jsx-14d53511f5361a60" + " " + "w-full h-full bg-black"
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 340,
                        columnNumber: 17
                    }, this),
                    !usingYouTube && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReactPlayer, {
                        ref: rpRef,
                        url: url,
                        width: "100%",
                        height: "100%",
                        playing: isPlayingState,
                        muted: muted,
                        playbackRate: playbackRate,
                        controls: false,
                        onReady: onRPReady,
                        onProgress: onRPProgress,
                        onPause: onRPPause,
                        onPlay: onRPPlay,
                        config: {
                            file: {
                                attributes: {
                                    controlsList: "nodownload"
                                }
                            }
                        },
                        playsinline: true
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 342,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/VideoPlayer.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this),
            !showCover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: togglePlay,
                onContextMenu: (e)=>e.preventDefault(),
                className: "jsx-14d53511f5361a60" + " " + "absolute inset-0 z-10 cursor-pointer"
            }, void 0, false, {
                fileName: "[project]/components/VideoPlayer.tsx",
                lineNumber: 346,
                columnNumber: 29
            }, this),
            usingYouTube && !showCover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-14d53511f5361a60" + " " + `absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/90 via-black/40 to-transparent z-20 pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'} `
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 351,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-14d53511f5361a60" + " " + `absolute top-4 left-4 z-30 pointer-events-none flex items-center gap-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'} `,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-14d53511f5361a60" + " " + "bg-blue-600 w-2 h-6 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 353,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jsx-14d53511f5361a60" + " " + "text-white font-bold tracking-wider text-sm shadow-black drop-shadow-md",
                                children: "math4code"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 354,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 352,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-14d53511f5361a60" + " " + `absolute top-4 right-4 z-30 pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'} `,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-14d53511f5361a60" + " " + "bg-white/10 p-2 rounded-full backdrop-blur-md",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                size: 20,
                                className: "text-white/80"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 357,
                                columnNumber: 88
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/VideoPlayer.tsx",
                            lineNumber: 357,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 356,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true),
            showCover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundImage: thumbUrl ? `url(${thumbUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                },
                onClick: handlePlay,
                className: "jsx-14d53511f5361a60" + " " + "absolute inset-0 z-50 flex items-center justify-center bg-black cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-14d53511f5361a60" + " " + `absolute inset-0 ${thumbUrl ? 'bg-black/40' : 'bg-slate-900'} `
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 365,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-14d53511f5361a60" + " " + "relative z-10 bg-white/10 p-5 rounded-full backdrop-blur-md border border-white/20 hover:scale-110 transition-transform shadow-2xl",
                        children: !isReady && youtubeId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-16 h-16 text-white animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/VideoPlayer.tsx",
                            lineNumber: 367,
                            columnNumber: 52
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                            className: "w-20 h-20 text-white"
                        }, void 0, false, {
                            fileName: "[project]/components/VideoPlayer.tsx",
                            lineNumber: 367,
                            columnNumber: 112
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 366,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/VideoPlayer.tsx",
                lineNumber: 364,
                columnNumber: 17
            }, this),
            !showCover && isPaused && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-14d53511f5361a60" + " " + "absolute inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-300 pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-14d53511f5361a60" + " " + "bg-white/10 p-5 rounded-full backdrop-blur-md shadow-2xl animate-in zoom-in-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        className: "w-12 h-12 text-white fill-white"
                    }, void 0, false, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 375,
                        columnNumber: 117
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/VideoPlayer.tsx",
                    lineNumber: 375,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/VideoPlayer.tsx",
                lineNumber: 374,
                columnNumber: 17
            }, this),
            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-14d53511f5361a60" + " " + "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-900/90 text-white px-4 py-2 rounded-lg z-50 backdrop-blur-md",
                children: errorMsg
            }, void 0, false, {
                fileName: "[project]/components/VideoPlayer.tsx",
                lineNumber: 379,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseEnter: ()=>{
                    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
                    setShowControls(true);
                },
                onMouseLeave: startHideControlsTimer,
                className: "jsx-14d53511f5361a60" + " " + `absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/80 to-transparent pt-12 pb-4 px-3 sm:px-5 z-50 transition-all duration-300 pointer-events-auto ${showControls || !isPlayingState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} `,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: progressContainerRef,
                        onClick: handleProgressBarClick,
                        className: "jsx-14d53511f5361a60" + " " + "relative group/slider h-6 flex items-center mb-1 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-14d53511f5361a60" + " " + "absolute inset-0 h-1 top-2.5 bg-white/20 rounded-full group-hover/slider:h-1.5 transition-all pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 393,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: `${sliderValue * 100}% `
                                },
                                className: "jsx-14d53511f5361a60" + " " + "absolute left-0 top-2.5 h-1 bg-blue-500 rounded-full group-hover/slider:h-1.5 transition-all pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 395,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: 0,
                                max: 0.999999,
                                step: "any",
                                value: seeking ? sliderValue : duration ? currentTime / duration : 0,
                                onMouseDown: ()=>setSeeking(true),
                                onTouchStart: ()=>setSeeking(true),
                                onChange: handleSliderChange,
                                onMouseUp: handleSliderEnd,
                                onTouchEnd: handleSliderEnd,
                                className: "jsx-14d53511f5361a60" + " " + "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 398,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    left: `${sliderValue * 100}% `
                                },
                                className: "jsx-14d53511f5361a60" + " " + "absolute h-3.5 w-3.5 top-2.5 bg-white border-2 border-blue-500 rounded-full -ml-1.5 -mt-[4px] shadow-lg scale-0 group-hover/slider:scale-100 transition-transform pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 410,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 387,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-14d53511f5361a60" + " " + "flex items-center justify-between text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-14d53511f5361a60" + " " + "flex items-center gap-2 sm:gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: togglePlay,
                                        title: "Space",
                                        className: "jsx-14d53511f5361a60" + " " + "hover:text-blue-400 transition-colors transform active:scale-90",
                                        children: isPlayingState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                            size: 24,
                                            className: "sm:w-7 sm:h-7",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 418,
                                            columnNumber: 47
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            size: 24,
                                            className: "sm:w-7 sm:h-7",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 418,
                                            columnNumber: 115
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 417,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-14d53511f5361a60" + " " + "hidden sm:flex items-center gap-3 text-white/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: rewind,
                                                className: "jsx-14d53511f5361a60" + " " + "hover:text-white transition-colors hover:bg-white/10 p-1 rounded-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/components/VideoPlayer.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 136
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/VideoPlayer.tsx",
                                                lineNumber: 423,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: fastForward,
                                                className: "jsx-14d53511f5361a60" + " " + "hover:text-white transition-colors hover:bg-white/10 p-1 rounded-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/components/VideoPlayer.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 141
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/VideoPlayer.tsx",
                                                lineNumber: 424,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 422,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleMute,
                                        className: "jsx-14d53511f5361a60" + " " + "hover:text-white transition-colors ml-0 sm:ml-2",
                                        children: muted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                            size: 20,
                                            className: "sm:w-6 sm:h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 428,
                                            columnNumber: 38
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                            size: 20,
                                            className: "sm:w-6 sm:h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 428,
                                            columnNumber: 88
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 427,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-14d53511f5361a60" + " " + "text-[10px] sm:text-xs font-mono text-white/60 whitespace-nowrap",
                                        children: [
                                            formatTime(currentTime),
                                            " / ",
                                            duration ? formatTime(duration) : "0:00"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 431,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 416,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-14d53511f5361a60" + " " + "flex items-center gap-2 sm:gap-3 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowQualityModal((s)=>!s);
                                            setShowSpeedMenu(false);
                                        },
                                        className: "jsx-14d53511f5361a60" + " " + "hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg transition-all backdrop-blur-sm text-[10px] sm:text-xs font-semibold tracking-wide",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/components/VideoPlayer.tsx",
                                                lineNumber: 440,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-14d53511f5361a60" + " " + "hidden sm:inline",
                                                children: selectedQuality === 'auto' ? 'AUTO' : selectedQuality.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/components/VideoPlayer.tsx",
                                                lineNumber: 441,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 439,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowSpeedMenu((s)=>!s);
                                            setShowQualityModal(false);
                                        },
                                        className: "jsx-14d53511f5361a60" + " " + "hover:text-white bg-white/10 hover:bg-white/20 border border-white/5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg transition-all backdrop-blur-sm text-[10px] sm:text-xs font-bold min-w-[2.5rem] sm:min-w-[3rem]",
                                        children: [
                                            playbackRate,
                                            "x"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 445,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleFullScreen,
                                        className: "jsx-14d53511f5361a60" + " " + "hover:text-white transition-colors hover:bg-white/20 p-1.5 sm:p-2 rounded-lg",
                                        children: isFullScreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize$3e$__["Minimize"], {
                                            size: 18,
                                            className: "sm:w-5 sm:h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 450,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__["Maximize"], {
                                            size: 18,
                                            className: "sm:w-5 sm:h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 450,
                                            columnNumber: 96
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 449,
                                        columnNumber: 25
                                    }, this),
                                    (showQualityModal || showSpeedMenu) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-14d53511f5361a60" + " " + "absolute bottom-full mb-4 right-0 bg-slate-900/95 border border-white/10 text-white rounded-xl shadow-2xl p-2 w-28 sm:w-32 backdrop-blur-xl z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 origin-bottom-right",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-14d53511f5361a60" + " " + "max-h-[150px] sm:max-h-[200px] overflow-y-auto thin-scrollbar flex flex-col gap-1",
                                            children: [
                                                showQualityModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>changeQuality("auto"),
                                                            className: "jsx-14d53511f5361a60" + " " + `modal-btn ${selectedQuality === "auto" ? "active" : ""} `,
                                                            children: "Auto"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/VideoPlayer.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 61
                                                        }, this),
                                                        qualityOptions.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>changeQuality(q),
                                                                className: "jsx-14d53511f5361a60" + " " + `modal-btn ${selectedQuality === q ? "active" : ""} `,
                                                                children: q.toUpperCase()
                                                            }, q, false, {
                                                                fileName: "[project]/components/VideoPlayer.tsx",
                                                                lineNumber: 457,
                                                                columnNumber: 216
                                                            }, this))
                                                    ]
                                                }, void 0, true),
                                                showSpeedMenu && speedOptions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>changeSpeed(s),
                                                        className: "jsx-14d53511f5361a60" + " " + `modal-btn ${playbackRate === s ? "active" : ""} `,
                                                        children: [
                                                            s,
                                                            "x"
                                                        ]
                                                    }, s, true, {
                                                        fileName: "[project]/components/VideoPlayer.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 78
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/VideoPlayer.tsx",
                                            lineNumber: 456,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/VideoPlayer.tsx",
                                        lineNumber: 455,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/VideoPlayer.tsx",
                                lineNumber: 437,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/VideoPlayer.tsx",
                        lineNumber: 414,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/VideoPlayer.tsx",
                lineNumber: 382,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "14d53511f5361a60",
                children: "@apply w-full text-left px-3 py-2 text-xs font-medium rounded-md transition-all hover:bg-white/10 text-white/70 hover:text-white;@apply bg-blue-600 text-white shadow-md;.thin-scrollbar.jsx-14d53511f5361a60::-webkit-scrollbar{width:3px}@apply bg-white/20 rounded-full;"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/VideoPlayer.tsx",
        lineNumber: 333,
        columnNumber: 9
    }, this);
}
_s(VideoPlayer, "3XjY1WzoTp/j8PX0auK5DfvCAYw=");
_c1 = VideoPlayer;
var _c, _c1;
__turbopack_context__.k.register(_c, "ReactPlayer");
__turbopack_context__.k.register(_c1, "VideoPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/BunnyPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BunnyPlayer",
    ()=>BunnyPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function BunnyPlayer({ videoId, libraryId, videoType, videoStatus = 'ready', className = '', onComplete }) {
    _s();
    const [isLive, setIsLive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(videoStatus === 'live');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Poll for live status if it's a live stream
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BunnyPlayer.useEffect": ()=>{
            if (videoType === 'live' && videoStatus !== 'live') {
                const interval = setInterval({
                    "BunnyPlayer.useEffect.interval": async ()=>{
                        try {
                        // You can add an API call here to check live status
                        // For now, we'll rely on the videoStatus prop
                        } catch (err) {
                            console.error('Failed to check live status:', err);
                        }
                    }
                }["BunnyPlayer.useEffect.interval"], 10000); // Check every 10 seconds
                return ({
                    "BunnyPlayer.useEffect": ()=>clearInterval(interval)
                })["BunnyPlayer.useEffect"];
            }
        }
    }["BunnyPlayer.useEffect"], [
        videoType,
        videoStatus
    ]);
    // Generate embed URL
    const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&preload=true`;
    // Handle different states
    if (videoStatus === 'processing') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center justify-center bg-gray-900 text-white ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-semibold",
                        children: "Processing Video..."
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 50,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mt-2",
                        children: "This may take a few minutes"
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 51,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BunnyPlayer.tsx",
                lineNumber: 48,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/BunnyPlayer.tsx",
            lineNumber: 47,
            columnNumber: 13
        }, this);
    }
    if (videoStatus === 'error') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center justify-center bg-gray-900 text-white ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-16 h-16 text-red-500 mx-auto mb-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }, void 0, false, {
                            fileName: "[project]/components/BunnyPlayer.tsx",
                            lineNumber: 62,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 61,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-semibold",
                        children: "Video Error"
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 64,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mt-2",
                        children: "Failed to load video. Please try again later."
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BunnyPlayer.tsx",
                lineNumber: 60,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/BunnyPlayer.tsx",
            lineNumber: 59,
            columnNumber: 13
        }, this);
    }
    if (videoType === 'live' && videoStatus !== 'live') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 text-white ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative inline-block mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-20 h-20 text-gray-600",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                                }, void 0, false, {
                                    fileName: "[project]/components/BunnyPlayer.tsx",
                                    lineNumber: 77,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/BunnyPlayer.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute -top-1 -right-1 flex h-6 w-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BunnyPlayer.tsx",
                                        lineNumber: 80,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative inline-flex rounded-full h-6 w-6 bg-red-500 items-center justify-center text-xs font-bold",
                                        children: "LIVE"
                                    }, void 0, false, {
                                        fileName: "[project]/components/BunnyPlayer.tsx",
                                        lineNumber: 81,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BunnyPlayer.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 75,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl font-bold mb-2",
                        children: "Stream Scheduled"
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 86,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: "Waiting for instructor to start the live session..."
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 87,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-center justify-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce",
                                style: {
                                    animationDelay: '0ms'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BunnyPlayer.tsx",
                                lineNumber: 89,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce",
                                style: {
                                    animationDelay: '150ms'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BunnyPlayer.tsx",
                                lineNumber: 90,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce",
                                style: {
                                    animationDelay: '300ms'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/BunnyPlayer.tsx",
                                lineNumber: 91,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 88,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BunnyPlayer.tsx",
                lineNumber: 74,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/BunnyPlayer.tsx",
            lineNumber: 73,
            columnNumber: 13
        }, this);
    }
    // Render the video player
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative ${className}`,
        children: [
            videoType === 'live' && videoStatus === 'live' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-2 h-2 bg-white rounded-full animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 103,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "LIVE"
                    }, void 0, false, {
                        fileName: "[project]/components/BunnyPlayer.tsx",
                        lineNumber: 104,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BunnyPlayer.tsx",
                lineNumber: 102,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                src: embedUrl,
                loading: "lazy",
                style: {
                    border: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                },
                allow: "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen",
                allowFullScreen: true,
                onError: ()=>setError('Failed to load video player')
            }, void 0, false, {
                fileName: "[project]/components/BunnyPlayer.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-gray-900 text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/BunnyPlayer.tsx",
                    lineNumber: 124,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BunnyPlayer.tsx",
                lineNumber: 123,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BunnyPlayer.tsx",
        lineNumber: 100,
        columnNumber: 9
    }, this);
}
_s(BunnyPlayer, "00IU7fUUn9lFrOlp3n9rNvmIlz0=");
_c = BunnyPlayer;
var _c;
__turbopack_context__.k.register(_c, "BunnyPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c2 = TabsTrigger;
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 outline-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/tabs.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c3 = TabsContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger");
__turbopack_context__.k.register(_c3, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/student/useExamSession.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useExamSession",
    ()=>useExamSession,
    "useSaveAnswer",
    ()=>useSaveAnswer,
    "useSubmitExam",
    ()=>useSubmitExam,
    "useUpdateTimer",
    ()=>useUpdateTimer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
function useExamSession(examId, userId, retakeAttempt = 0, enabled = true) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "exam-session",
            examId,
            userId,
            retakeAttempt
        ],
        queryFn: {
            "useExamSession.useQuery": async ()=>{
                if (!userId) throw new Error("User not logged in");
                // 1. Fetch Exam Details
                const { data: exam, error: examError } = await supabase.from("exams").select("*").eq("id", examId).single();
                if (examError) throw examError;
                if (!exam) throw new Error("Exam not found");
                // 2. Check exam scheduling (start_time and end_time)
                const now = new Date();
                const examData = exam;
                if (examData.start_time) {
                    const startTime = new Date(examData.start_time);
                    if (now < startTime) {
                        throw new Error(`This exam is not yet available. It will start on ${startTime.toLocaleString()}.`);
                    }
                }
                if (examData.end_time) {
                    const endTime = new Date(examData.end_time);
                    if (now > endTime) {
                        throw new Error(`This exam has ended. It was available until ${endTime.toLocaleString()}.`);
                    }
                }
                // 3. Check LESSON-based prerequisite (quiz lessons only)
                const { data: currentLesson } = await supabase.from("lessons").select("id, title, prerequisite_lesson_id, sequential_unlock_enabled").eq("exam_id", examId).eq("content_type", "quiz").single();
                if (currentLesson?.sequential_unlock_enabled && currentLesson.prerequisite_lesson_id) {
                    // Get the prerequisite lesson and its exam
                    const { data: prereqLesson } = await supabase.from("lessons").select("id, title, exam_id").eq("id", currentLesson.prerequisite_lesson_id).single();
                    if (prereqLesson?.exam_id) {
                        // Check if student has completed the prerequisite lesson's exam
                        const { data: prerequisiteAttempts, error: prereqError } = await supabase.from("exam_attempts").select("id, status").eq("exam_id", prereqLesson.exam_id).eq("student_id", userId).eq("status", "submitted");
                        if (prereqError) throw prereqError;
                        if (!prerequisiteAttempts || prerequisiteAttempts.length === 0) {
                            const prereqTitle = prereqLesson.title || "the previous quiz";
                            throw new Error(`You must complete ${prereqTitle} before accessing this exam.`);
                        }
                    }
                }
                // 4. Fetch Sections with Questions and Options
                const { data: sections, error: sectionsError } = await supabase.from("sections").select("*, questions(*, options(*))").eq("exam_id", examId).order("section_order");
                if (sectionsError) throw sectionsError;
                // 5. Find or Create Attempt
                let attempt = null;
                const { data: existingAttempts, error: attemptsError } = await supabase.from("exam_attempts").select("*").eq("exam_id", examId).eq("student_id", userId).order("created_at", {
                    ascending: false
                });
                if (attemptsError) throw attemptsError;
                // Check if there's an in-progress attempt
                const inProgressAttempt = existingAttempts?.find({
                    "useExamSession.useQuery": (a)=>a.status === "in_progress"
                }["useExamSession.useQuery"]);
                const submittedAttempts = existingAttempts?.filter({
                    "useExamSession.useQuery": (a)=>a.status === "submitted"
                }["useExamSession.useQuery"]) || [];
                if (inProgressAttempt) {
                    attempt = inProgressAttempt;
                } else {
                    // Check if there are submitted attempts and NOT retaking
                    if (submittedAttempts.length > 0 && retakeAttempt === 0) {
                        throw new Error("This exam has already been submitted. Please return to the test series page to retake the exam.");
                    }
                    const maxAttempts = exam.max_attempts;
                    const hasAttemptsRemaining = !maxAttempts || submittedAttempts.length < maxAttempts;
                    if (hasAttemptsRemaining) {
                        const { data: newAttempt, error: createError } = await supabase.from("exam_attempts").insert({
                            exam_id: examId,
                            student_id: userId,
                            status: "in_progress",
                            total_time_spent: 0
                        }).select().single();
                        if (createError) throw createError;
                        attempt = newAttempt;
                    } else {
                        throw new Error(`You have reached the maximum number of attempts (${maxAttempts}) for this exam.`);
                    }
                }
                // 4. Fetch Existing Responses
                let previousResponses = {};
                if (attempt) {
                    const { data: responses, error: respError } = await supabase.from("responses").select("question_id, student_answer").eq("attempt_id", attempt.id);
                    if (respError) throw respError;
                    if (responses) {
                        responses.forEach({
                            "useExamSession.useQuery": (r)=>{
                                try {
                                    // Try to parse if it's JSON (for arrays/MSQ), otherwise keep as is
                                    const parsed = JSON.parse(r.student_answer);
                                    previousResponses[r.question_id] = parsed;
                                } catch  {
                                    previousResponses[r.question_id] = r.student_answer;
                                }
                            }
                        }["useExamSession.useQuery"]);
                    }
                }
                return {
                    exam: exam,
                    sections: sections,
                    attempt: attempt,
                    previousResponses
                };
            }
        }["useExamSession.useQuery"],
        enabled: !!examId && !!userId && enabled,
        staleTime: 0,
        refetchOnWindowFocus: false
    });
}
_s(useExamSession, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useUpdateTimer() {
    _s1();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useUpdateTimer.useMutation": async ({ attemptId, timeSpent })=>{
                const { error } = await supabase.from("exam_attempts").update({
                    total_time_spent: timeSpent
                }).eq("id", attemptId);
                if (error) throw error;
            }
        }["useUpdateTimer.useMutation"]
    });
}
_s1(useUpdateTimer, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSubmitExam() {
    _s2();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSubmitExam.useMutation": async ({ attemptId, examId, responses, sections, totalMarks// Unused in RPC
             })=>{
                // 1. Ensure all local responses are synced one last time (Optimization)
                // Although we auto-saved, sending final state is safer.
                // However, for pure speed, we assume auto-save worked or we do a bulk upsert here first.
                const entries = Object.entries(responses).map({
                    "useSubmitExam.useMutation.entries": ([qid, ans])=>({
                            attempt_id: attemptId,
                            question_id: qid,
                            student_answer: Array.isArray(ans) ? JSON.stringify(ans) : String(ans),
                            updated_at: new Date().toISOString()
                        })
                }["useSubmitExam.useMutation.entries"]);
                if (entries.length > 0) {
                    const { error: respError } = await supabase.from("responses").upsert(entries, {
                        onConflict: "attempt_id,question_id"
                    });
                    if (respError) {
                        throw new Error(`Failed to sync responses: ${respError.message}`);
                    }
                }
                // 2. Call the Secure RPC
                const { data: resultData, error: rpcError } = await supabase.rpc('submit_exam_attempt', {
                    p_attempt_id: attemptId,
                    p_exam_id: examId
                });
                if (rpcError) {
                    // Handle duplicate submission gracefully
                    if (rpcError.message.includes("already submitted")) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Exam was already submitted.");
                        // Fetch existing result
                        const { data: existing } = await supabase.from("results").select("*").eq("attempt_id", attemptId).single();
                        return existing;
                    }
                    throw rpcError;
                }
                // If RPC returned an error object inside JSON
                if (resultData && resultData.error) {
                    throw new Error(resultData.error);
                }
                return resultData;
            }
        }["useSubmitExam.useMutation"],
        onSuccess: {
            "useSubmitExam.useMutation": ()=>{
                queryClient.invalidateQueries({
                    queryKey: [
                        "test-series-details"
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        "exam-attempts"
                    ]
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Exam submitted successfully!");
            }
        }["useSubmitExam.useMutation"],
        onError: {
            "useSubmitExam.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message || "Failed to submit exam.");
            }
        }["useSubmitExam.useMutation"]
    });
}
_s2(useSubmitExam, "YK0wzM21ECnncaq5SECwU+/SVdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function useSaveAnswer() {
    _s3();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "useSaveAnswer.useMutation": async ({ attemptId, questionId, answer })=>{
                const { error } = await supabase.from("responses").upsert({
                    attempt_id: attemptId,
                    question_id: questionId,
                    student_answer: Array.isArray(answer) ? JSON.stringify(answer) : String(answer),
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: "attempt_id,question_id"
                });
                if (error) throw error;
            }
        }["useSaveAnswer.useMutation"]
    });
}
_s3(useSaveAnswer, "wwwtpB20p0aLiHIvSy5P98MwIUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useExamResult.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchExamResult",
    ()=>fetchExamResult,
    "useExamResult",
    ()=>useExamResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
async function fetchExamResult(attemptId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        // 1. Fetch attempt info
        const { data: attempt, error: attemptError } = await supabase.from("exam_attempts").select("*, exams(title, id, result_visibility, result_release_time, show_answers)").eq("id", attemptId).single();
        if (attemptError) {
            throw attemptError;
        }
        if (!attempt) throw new Error("Attempt not found");
        const examId = attempt.exam_id;
        // Auto-cleanup expired responses (calls database function)
        // This runs in background and doesn't block the query
        const { cleanupAttemptResponses } = await __turbopack_context__.A("[project]/lib/responseCleanup.ts [app-client] (ecmascript, async loader)");
        cleanupAttemptResponses(attemptId).catch((err)=>{
            console.warn('Background cleanup failed:', err);
        });
        // 2. Fetch all responses for this attempt
        const { data: responses, error: responsesError } = await supabase.from("responses").select("*").eq("attempt_id", attemptId);
        if (responsesError) {
            throw responsesError;
        }
        const responseMap = {};
        responses?.forEach((r)=>{
            if (!r.student_answer) {
                // No answer provided
                return;
            }
            try {
                // Try to parse as JSON first (for arrays and objects)
                const parsed = JSON.parse(r.student_answer);
                responseMap[r.question_id] = parsed;
            } catch  {
                // If parsing fails, use the raw value (for strings/numbers)
                // Remove quotes if it's a quoted string
                let value = r.student_answer;
                if (typeof value === 'string') {
                    // Remove surrounding quotes if present
                    value = value.replace(/^["']|["']$/g, '');
                }
                responseMap[r.question_id] = value;
            }
        });
        // 3. Fetch ALL sections for this exam
        const { data: sections, error: sectionsError } = await supabase.from("sections").select("*").eq("exam_id", examId).order("section_order");
        if (sectionsError) {
            throw sectionsError;
        }
        if (!sections?.length) throw new Error("Sections not found");
        // 4. Fetch ALL questions for these sections
        const sectionIds = sections.map((s)=>s.id);
        const { data: questions, error: questionsError } = await supabase.from("questions").select("*, options(*)").in("section_id", sectionIds);
        if (questionsError) {
            throw questionsError;
        }
        if (!questions?.length) throw new Error("Questions not found");
        // 5. Fetch result summary
        const { data: resultSummary, error: resultError } = await supabase.from("results").select("*").eq("attempt_id", attemptId).single();
        if (resultError && resultError.code !== 'PGRST116') {
        // Silently ignore - result may not exist yet
        }
        // 6. Fetch section results
        let sectionResults = [];
        if (resultSummary) {
            const { data: secResults, error: secError } = await supabase.from("section_results").select("*").eq("result_id", resultSummary.id);
            if (secResults) sectionResults = secResults;
        }
        // 7. Structure the data by sections
        const structured = sections.map((s)=>({
                ...s,
                questions: questions.filter((q)=>q.section_id === s.id),
                result: sectionResults.find((sr)=>sr.section_id === s.id)
            }));
        return {
            attempt,
            responseMap,
            structured,
            result: resultSummary
        };
    } catch (error) {
        throw error;
    }
}
function useExamResult(attemptId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "exam-result",
            attemptId
        ],
        queryFn: {
            "useExamResult.useQuery": ()=>fetchExamResult(attemptId)
        }["useExamResult.useQuery"],
        enabled: !!attemptId,
        staleTime: 1000 * 60 * 2,
        retry: 1
    });
}
_s(useExamResult, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/renderWithLatex.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderWithLatex",
    ()=>renderWithLatex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$react$2d$mathjax$2f$esm$2f$MathJax$2f$MathJax$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MathJax$3e$__ = __turbopack_context__.i("[project]/node_modules/better-react-mathjax/esm/MathJax/MathJax.js [app-client] (ecmascript) <export default as MathJax>");
;
;
function renderWithLatex(text) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$react$2d$mathjax$2f$esm$2f$MathJax$2f$MathJax$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MathJax$3e$__["MathJax"], {
        inline: true,
        dynamic: true,
        children: text
    }, void 0, false, {
        fileName: "[project]/lib/renderWithLatex.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground',
            destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Alert;
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = AlertTitle;
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = AlertDescription;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "AlertTitle");
__turbopack_context__.k.register(_c2, "AlertDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/responseCleanup.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanupAllExpiredResponses",
    ()=>cleanupAllExpiredResponses,
    "cleanupAttemptResponses",
    ()=>cleanupAttemptResponses,
    "getDaysUntilExpiry",
    ()=>getDaysUntilExpiry,
    "isResponseExpired",
    ()=>isResponseExpired
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
function isResponseExpired(submittedAt) {
    const submittedDate = new Date(submittedAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= 30;
}
function getDaysUntilExpiry(submittedAt) {
    const submittedDate = new Date(submittedAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 30 - daysDiff);
}
async function cleanupAttemptResponses(attemptId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        const { data, error } = await supabase.rpc('cleanup_attempt_responses', {
            p_attempt_id: attemptId
        });
        if (error) {
            console.error('Error cleaning up responses:', error);
            return {
                success: false,
                error: error.message
            };
        }
        return {
            success: true,
            deleted: data?.[0]?.deleted || false,
            daysOld: data?.[0]?.days_old || 0
        };
    } catch (error) {
        console.error('Error cleaning up responses:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
async function cleanupAllExpiredResponses() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        const { data, error } = await supabase.rpc('cleanup_expired_responses');
        if (error) {
            console.error('Error cleaning up all responses:', error);
            return {
                success: false,
                error: error.message
            };
        }
        return {
            success: true,
            deletedCount: data?.[0]?.deleted_count || 0
        };
    } catch (error) {
        console.error('Error cleaning up all responses:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/exam/ResponseExpiryWarning.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResponseExpiryWarning",
    ()=>ResponseExpiryWarning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responseCleanup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responseCleanup.ts [app-client] (ecmascript)");
;
;
;
;
function ResponseExpiryWarning({ submittedAt }) {
    const daysRemaining = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responseCleanup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDaysUntilExpiry"])(submittedAt);
    // Expired - no answers available
    if (daysRemaining === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
            variant: "destructive",
            className: "mb-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                    lineNumber: 16,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertTitle"], {
                    children: "Response Review Period Expired"
                }, void 0, false, {
                    fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                    lineNumber: 17,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    children: "Your selected answers have been automatically deleted after 30 days. You can still view your results and question analysis."
                }, void 0, false, {
                    fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
            lineNumber: 15,
            columnNumber: 13
        }, this);
    }
    // Urgent - less than 7 days remaining
    if (daysRemaining <= 7) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
            className: "mb-6 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "h-4 w-4 text-orange-600 dark:text-orange-400"
                }, void 0, false, {
                    fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertTitle"], {
                    className: "text-orange-900 dark:text-orange-400",
                    children: "⚠️ Review Your Answers Soon"
                }, void 0, false, {
                    fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                    lineNumber: 31,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                    className: "text-orange-800 dark:text-orange-300",
                    children: [
                        "You have ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: [
                                daysRemaining,
                                " ",
                                daysRemaining === 1 ? 'day' : 'days'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                            lineNumber: 35,
                            columnNumber: 30
                        }, this),
                        " remaining to review your selected answers. After that, only results and analysis will be available."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
            lineNumber: 29,
            columnNumber: 13
        }, this);
    }
    // Active - more than 7 days remaining
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
        className: "mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "h-4 w-4 text-blue-600 dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertTitle"], {
                className: "text-blue-900 dark:text-blue-400",
                children: "Review Period Active"
            }, void 0, false, {
                fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                className: "text-blue-800 dark:text-blue-300",
                children: [
                    "You can review your answers for the next ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            daysRemaining,
                            " days"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                        lineNumber: 50,
                        columnNumber: 58
                    }, this),
                    ". After 30 days, selected answers will be automatically removed."
                ]
            }, void 0, true, {
                fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/exam/ResponseExpiryWarning.tsx",
        lineNumber: 44,
        columnNumber: 9
    }, this);
}
_c = ResponseExpiryWarning;
var _c;
__turbopack_context__.k.register(_c, "ResponseExpiryWarning");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/exam/ExamTimer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamTimer",
    ()=>ExamTimer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ExamTimerComponent({ initialSeconds, onTimeUp, timeRef, isActive }) {
    _s();
    const [secondsLeft, setSecondsLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialSeconds);
    const onTimeUpRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onTimeUp);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamTimerComponent.useEffect": ()=>{
            setSecondsLeft(initialSeconds);
            timeRef.current = initialSeconds;
        }
    }["ExamTimerComponent.useEffect"], [
        initialSeconds,
        timeRef
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamTimerComponent.useEffect": ()=>{
            onTimeUpRef.current = onTimeUp;
        }
    }["ExamTimerComponent.useEffect"], [
        onTimeUp
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamTimerComponent.useEffect": ()=>{
            if (!isActive || secondsLeft <= 0) return;
            const timer = setInterval({
                "ExamTimerComponent.useEffect.timer": ()=>{
                    setSecondsLeft({
                        "ExamTimerComponent.useEffect.timer": (prev)=>{
                            if (prev <= 1) {
                                clearInterval(timer);
                                onTimeUpRef.current();
                                return 0;
                            }
                            const newVal = prev - 1;
                            timeRef.current = newVal;
                            return newVal;
                        }
                    }["ExamTimerComponent.useEffect.timer"]);
                }
            }["ExamTimerComponent.useEffect.timer"], 1000);
            return ({
                "ExamTimerComponent.useEffect": ()=>clearInterval(timer)
            })["ExamTimerComponent.useEffect"];
        }
    }["ExamTimerComponent.useEffect"], [
        isActive,
        timeRef
    ]);
    // Monitor for finish (if loaded with 0/negative)
    // Monitor for finish (if loaded with 0/negative)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamTimerComponent.useEffect": ()=>{
            // Guard against race condition where secondsLeft is 0 (from initial state)
            // but initialSeconds is > 0 (new prop received but effect hasn't synced state yet)
            if (initialSeconds > 0 && secondsLeft === 0) return;
            if (secondsLeft <= 0 && isActive) {
                onTimeUpRef.current();
            }
        }
    }["ExamTimerComponent.useEffect"], [
        secondsLeft,
        isActive,
        initialSeconds
    ]);
    const formatTime = (s)=>{
        const h = Math.floor(s / 3600);
        const m = Math.floor(s % 3600 / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return h > 0 ? `${h}:${m}:${sec}` : `${m}:${sec}`;
    };
    const isCritical = secondsLeft < 300 // 5 mins
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full border text-xs md:text-sm transition-colors duration-300 ${isCritical ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                className: `w-3 h-3 md:w-4 md:h-4 ${isCritical ? 'text-rose-500' : 'text-emerald-500'}`
            }, void 0, false, {
                fileName: "[project]/components/exam/ExamTimer.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-semibold tabular-nums",
                children: formatTime(secondsLeft)
            }, void 0, false, {
                fileName: "[project]/components/exam/ExamTimer.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/exam/ExamTimer.tsx",
        lineNumber: 68,
        columnNumber: 9
    }, this);
}
_s(ExamTimerComponent, "/vxf8TNdbDhoKslp6WqFeRwTrh8=");
_c = ExamTimerComponent;
const ExamTimer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(ExamTimerComponent);
_c1 = ExamTimer;
var _c, _c1;
__turbopack_context__.k.register(_c, "ExamTimerComponent");
__turbopack_context__.k.register(_c1, "ExamTimer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/exam/QuestionDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionDisplay",
    ()=>QuestionDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/renderWithLatex.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function QuestionDisplayComponent({ question, activeQuestionIdx, response, isMarked, onSave, onMark, onNext, onPrev, onClear, isFirst, isLast }) {
    if (!question) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                x: 10
            },
            animate: {
                opacity: 1,
                x: 0
            },
            exit: {
                opacity: 0,
                x: -10
            },
            transition: {
                duration: 0.2
            },
            className: "flex-1 flex flex-col min-h-0 bg-card rounded-2xl shadow-sm border border-border overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start mb-4 flex-wrap gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs md:text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded",
                                    children: [
                                        "Question ",
                                        activeQuestionIdx + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                    lineNumber: 51,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs md:text-sm text-muted-foreground",
                                    children: [
                                        "Marks: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-emerald-500",
                                            children: [
                                                "+",
                                                question.marks
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                            lineNumber: 55,
                                            columnNumber: 36
                                        }, this),
                                        " | Negative: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-semibold text-rose-500",
                                            children: [
                                                "-",
                                                question.negative_marks
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                            lineNumber: 56,
                                            columnNumber: 39
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                    lineNumber: 54,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                            lineNumber: 50,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-base md:text-lg font-medium mb-6 leading-relaxed text-foreground select-none",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderWithLatex"])(question.question_text)
                        }, void 0, false, {
                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 pb-4",
                            children: [
                                question.question_type === "MCQ" && question.options?.map((opt, idx)=>{
                                    const chosen = response === opt.id;
                                    const optionLabel = String.fromCharCode(65 + idx);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onSave(question.id, opt.id),
                                        className: `w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 md:gap-4 group ${chosen ? "bg-primary/10 border-primary shadow-sm ring-1 ring-primary" : "bg-muted/30 border-border hover:border-primary hover:bg-muted/50"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-7 h-7 md:w-8 md:h-8 rounded-full shrink-0 flex items-center justify-center text-xs md:text-sm font-bold transition-colors ${chosen ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30 text-muted-foreground group-hover:border-primary group-hover:text-primary"}`,
                                                children: optionLabel
                                            }, void 0, false, {
                                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                                lineNumber: 79,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm md:text-base text-foreground group-hover:text-foreground",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderWithLatex"])(opt.option_text)
                                            }, void 0, false, {
                                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                                lineNumber: 87,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, opt.id, true, {
                                        fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                        lineNumber: 71,
                                        columnNumber: 37
                                    }, this);
                                }),
                                question.question_type === "MSQ" && question.options?.map((opt, idx)=>{
                                    const current = Array.isArray(response) ? response : [];
                                    const checked = current.includes(opt.id);
                                    const optionLabel = String.fromCharCode(65 + idx);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const next = checked ? current.filter((x)=>x !== opt.id) : [
                                                ...current,
                                                opt.id
                                            ];
                                            onSave(question.id, next);
                                        },
                                        className: `w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 md:gap-4 group ${checked ? "bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-500" : "bg-muted/30 border-border hover:border-amber-500 hover:bg-muted/50"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-6 h-6 rounded shrink-0 flex items-center justify-center text-xs md:text-sm font-bold transition-colors ${checked ? "bg-amber-500 text-white" : "border border-muted-foreground/30 text-muted-foreground group-hover:border-amber-500"}`,
                                                children: optionLabel
                                            }, void 0, false, {
                                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                                lineNumber: 111,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm md:text-base text-foreground group-hover:text-foreground",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderWithLatex"])(opt.option_text)
                                            }, void 0, false, {
                                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                                lineNumber: 117,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, opt.id, true, {
                                        fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                        lineNumber: 98,
                                        columnNumber: 37
                                    }, this);
                                }),
                                question.question_type === "NAT" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-foreground mb-2",
                                            children: "Your Answer:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                            lineNumber: 124,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: "w-full max-w-md p-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm md:text-base",
                                            placeholder: "Enter numeric value...",
                                            value: response || "",
                                            onChange: (e)=>onSave(question.id, e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                            lineNumber: 125,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                    lineNumber: 123,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/exam/QuestionDisplay.tsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/exam/QuestionDisplay.tsx",
                    lineNumber: 49,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "shrink-0 p-4 md:p-6 pt-4 border-t border-border bg-card/95 backdrop-blur-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap justify-between items-center gap-2 md:gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onPrev,
                                        disabled: isFirst,
                                        className: "px-3 md:px-4 py-1.5 md:py-2 border border-border text-foreground rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors text-xs md:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                className: "w-3 h-3 md:w-4 md:h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                                lineNumber: 146,
                                                columnNumber: 33
                                            }, this),
                                            " Previous"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                        lineNumber: 141,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClear,
                                        disabled: !response || Array.isArray(response) && response.length === 0,
                                        className: "px-3 md:px-4 py-1.5 md:py-2 border border-border text-foreground rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs md:text-sm",
                                        children: "Clear"
                                    }, void 0, false, {
                                        fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                        lineNumber: 148,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>onMark(question.id),
                                        className: `px-3 md:px-4 py-1.5 md:py-2 rounded-lg flex items-center gap-2 transition-colors text-xs md:text-sm ${isMarked ? "bg-amber-500 text-white hover:bg-amber-600" : "border border-amber-500 text-amber-500 hover:bg-amber-500/10"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                                                className: "w-3 h-3 md:w-4 md:h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                                lineNumber: 162,
                                                columnNumber: 33
                                            }, this),
                                            " ",
                                            isMarked ? "Marked" : "Mark"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                        lineNumber: 155,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                lineNumber: 140,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onNext,
                                    className: "px-4 md:px-6 py-1.5 md:py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-colors text-xs md:text-sm",
                                    children: isLast ? "Review" : "Save & Next"
                                }, void 0, false, {
                                    fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                    lineNumber: 166,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/exam/QuestionDisplay.tsx",
                                lineNumber: 165,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/exam/QuestionDisplay.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/exam/QuestionDisplay.tsx",
                    lineNumber: 138,
                    columnNumber: 17
                }, this)
            ]
        }, question.id, true, {
            fileName: "[project]/components/exam/QuestionDisplay.tsx",
            lineNumber: 40,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/exam/QuestionDisplay.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
}
_c = QuestionDisplayComponent;
const QuestionDisplay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(QuestionDisplayComponent);
_c1 = QuestionDisplay;
var _c, _c1;
__turbopack_context__.k.register(_c, "QuestionDisplayComponent");
__turbopack_context__.k.register(_c1, "QuestionDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/exam/QuestionPalette.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuestionPalette",
    ()=>QuestionPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
"use client";
;
;
;
;
function QuestionPaletteComponent({ questions, activeQuestionIdx, responses, marked, visited, onNavigate, onSubmit, sectionTitle, isMobileOpen, onMobileClose }) {
    const isAnswered = (qid)=>{
        const val = responses[qid];
        return val !== undefined && val !== null && val !== "" && !(Array.isArray(val) && val.length === 0);
    };
    const getStatusClass = (qid, isActive)=>{
        let cls = "bg-muted text-muted-foreground hover:bg-muted/80";
        if (isAnswered(qid)) {
            cls = "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600";
        } else if (marked[qid]) {
            cls = "bg-amber-500 text-white shadow-sm hover:bg-amber-600";
        } else if (visited[qid]) {
            cls = "bg-primary/20 text-primary border border-primary hover:bg-primary/30";
        }
        if (isActive) {
            cls += " ring-2 ring-offset-1 ring-offset-card ring-primary scale-105";
        }
        return cls;
    };
    const PaletteGrid = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-5 gap-2",
            children: questions.map((q, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        onNavigate(idx);
                        if (isMobileOpen) onMobileClose();
                    },
                    className: `h-10 w-full rounded-lg text-sm font-semibold transition-all duration-200 ${getStatusClass(q.id, idx === activeQuestionIdx)}`,
                    "aria-label": `Question ${idx + 1}`,
                    children: idx + 1
                }, q.id, false, {
                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/exam/QuestionPalette.tsx",
            lineNumber: 57,
            columnNumber: 9
        }, this);
    // Desktop View
    const DesktopView = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden lg:flex flex-col bg-card border-l border-border overflow-hidden h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 border-b border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-bold text-foreground",
                        children: "Question Palette"
                    }, void 0, false, {
                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, this),
                    sectionTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground mt-1 font-medium",
                        children: sectionTitle
                    }, void 0, false, {
                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-y-2 gap-x-4 mt-4 text-xs text-muted-foreground flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                                        lineNumber: 83,
                                        columnNumber: 62
                                    }, this),
                                    " Answered"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/exam/QuestionPalette.tsx",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded bg-amber-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                                        lineNumber: 84,
                                        columnNumber: 62
                                    }, this),
                                    " Marked"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/exam/QuestionPalette.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded bg-primary/20 border border-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                                        lineNumber: 85,
                                        columnNumber: 62
                                    }, this),
                                    " Visited"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/exam/QuestionPalette.tsx",
                                lineNumber: 85,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded bg-muted"
                                    }, void 0, false, {
                                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                                        lineNumber: 86,
                                        columnNumber: 62
                                    }, this),
                                    " Unvisited"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/exam/QuestionPalette.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/exam/QuestionPalette.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-5 custom-scrollbar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaletteGrid, {}, void 0, false, {
                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                    lineNumber: 91,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/exam/QuestionPalette.tsx",
                lineNumber: 90,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 border-t border-border bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onSubmit,
                    className: "w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold shadow-sm transition-colors active:scale-[0.98]",
                    children: "Submit Exam"
                }, void 0, false, {
                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                    lineNumber: 95,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/exam/QuestionPalette.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/exam/QuestionPalette.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
    // Mobile Drawer
    const MobileView = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
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
                    onClick: onMobileClose,
                    className: "fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                }, void 0, false, {
                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                    lineNumber: 110,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        x: "100%"
                    },
                    animate: {
                        x: 0
                    },
                    exit: {
                        x: "100%"
                    },
                    transition: {
                        type: "spring",
                        damping: 25,
                        stiffness: 200
                    },
                    className: "fixed inset-y-0 right-0 z-50 w-80 bg-card shadow-2xl border-l border-border lg:hidden flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 flex items-center justify-between border-b border-border",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-bold text-foreground",
                                            children: "Question Palette"
                                        }, void 0, false, {
                                            fileName: "[project]/components/exam/QuestionPalette.tsx",
                                            lineNumber: 126,
                                            columnNumber: 33
                                        }, this),
                                        sectionTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground mt-0.5 font-medium",
                                            children: sectionTitle
                                        }, void 0, false, {
                                            fileName: "[project]/components/exam/QuestionPalette.tsx",
                                            lineNumber: 128,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                                    lineNumber: 125,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onMobileClose,
                                    className: "p-2 hover:bg-muted rounded-full transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/components/exam/QuestionPalette.tsx",
                                        lineNumber: 132,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                                    lineNumber: 131,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/exam/QuestionPalette.tsx",
                            lineNumber: 124,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-4 custom-scrollbar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaletteGrid, {}, void 0, false, {
                                fileName: "[project]/components/exam/QuestionPalette.tsx",
                                lineNumber: 136,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/exam/QuestionPalette.tsx",
                            lineNumber: 135,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-t border-border bg-background",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onSubmit,
                                className: "w-full bg-rose-600 text-white py-3 rounded-xl font-bold active:scale-[0.98] transition-transform",
                                children: "Submit Exam"
                            }, void 0, false, {
                                fileName: "[project]/components/exam/QuestionPalette.tsx",
                                lineNumber: 139,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/exam/QuestionPalette.tsx",
                            lineNumber: 138,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/exam/QuestionPalette.tsx",
                    lineNumber: 117,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/components/exam/QuestionPalette.tsx",
        lineNumber: 107,
        columnNumber: 9
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            DesktopView,
            MobileView
        ]
    }, void 0, true);
}
_c = QuestionPaletteComponent;
const QuestionPalette = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(QuestionPaletteComponent);
_c1 = QuestionPalette;
var _c, _c1;
__turbopack_context__.k.register(_c, "QuestionPaletteComponent");
__turbopack_context__.k.register(_c1, "QuestionPalette");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/EmbeddedExam.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmbeddedExam",
    ()=>EmbeddedExam,
    "PreviousResultView",
    ()=>PreviousResultView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:bae3ba [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useExamSession.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useExamResult$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useExamResult.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-client] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-checks.js [app-client] (ecmascript) <export default as ListChecks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize.js [app-client] (ecmascript) <export default as Maximize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize.js [app-client] (ecmascript) <export default as Minimize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-pause.js [app-client] (ecmascript) <export default as PauseCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/renderWithLatex.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LessonContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$ResponseExpiryWarning$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/exam/ResponseExpiryWarning.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responseCleanup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/responseCleanup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$ExamTimer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/exam/ExamTimer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$QuestionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/exam/QuestionDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$QuestionPalette$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/exam/QuestionPalette.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
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
;
;
;
;
;
// Component to show detailed question analysis
function QuestionAnalysisView({ structured, responseMap, onBack, isExpired = false }) {
    _s();
    const [activeSectionIdx, setActiveSectionIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const allQuestions = structured.flatMap((s)=>s.questions);
    const activeSection = structured[activeSectionIdx];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background rounded-xl border border-border overflow-hidden shadow-sm flex flex-col h-[80vh]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-card border-b border-border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 w-full md:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: onBack,
                                className: "text-muted-foreground hover:text-foreground px-0 md:px-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 67,
                                        columnNumber: 25
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden md:inline",
                                        children: "Back to Result"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 67,
                                        columnNumber: 64
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "md:hidden",
                                        children: "Back"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 67,
                                        columnNumber: 120
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-foreground truncate",
                                children: "Question Analysis"
                            }, void 0, false, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 69,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar",
                        children: structured.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveSectionIdx(i),
                                className: `px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${activeSectionIdx === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                                children: s.title
                            }, s.id, false, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 73,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-6",
                children: activeSection?.questions.map((q, idx)=>{
                    // Hide user response if expired
                    const userAns = isExpired ? undefined : responseMap[q.id];
                    // If expired, we can't really judge Correct/Incorrect based on userAns (it's undefined).
                    // But we likely want to show just the question and correct answer.
                    // However, `isCorrect` logic depends on `userAns`.
                    // If isExpired, isCorrect will be false (undefined ans).
                    // We should probably adjust the display to generic "View Solution" mode.
                    const isCorrect = !isExpired && checkAnswer(q, userAns);
                    const isSkipped = !isExpired && (userAns === undefined || userAns === null || Array.isArray(userAns) && userAns.length === 0);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 md:p-6 rounded-xl border ${isExpired ? "border-border bg-card" : isCorrect ? "border-emerald-500/30 bg-emerald-500/5" : isSkipped ? "border-border bg-muted/20" : "border-rose-500/30 bg-rose-500/5"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded",
                                                children: [
                                                    "Q",
                                                    idx + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 110,
                                                columnNumber: 37
                                            }, this),
                                            !isExpired && isCorrect && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-emerald-500 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 142
                                                    }, this),
                                                    " Correct"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 113,
                                                columnNumber: 65
                                            }, this),
                                            !isExpired && !isCorrect && !isSkipped && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-rose-500 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 154
                                                    }, this),
                                                    " Incorrect"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 114,
                                                columnNumber: 80
                                            }, this),
                                            !isExpired && isSkipped && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 147
                                                    }, this),
                                                    " Skipped"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 115,
                                                columnNumber: 65
                                            }, this),
                                            isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 133
                                                    }, this),
                                                    " Response Expired"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 116,
                                                columnNumber: 51
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 109,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            "Marks: ",
                                            isCorrect ? `+${q.marks}` : isSkipped || isExpired ? "0" : `-${q.negative_marks}`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 118,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 108,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-base text-foreground mb-6",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderWithLatex"])(q.question_text)
                            }, void 0, false, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 123,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 mb-6",
                                children: [
                                    q.options?.map((opt, optIdx)=>{
                                        const isSelected = !isExpired && isOptionSelected(q, opt.id, userAns);
                                        const isRightOption = isOptionCorrect(q, opt.id);
                                        let optClass = "border-border bg-muted/30 text-muted-foreground";
                                        if (isRightOption) optClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500";
                                        else if (isSelected && !isRightOption) optClass = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-3 rounded-lg border flex items-center gap-3 ${optClass}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isRightOption ? "bg-emerald-500 text-white" : isSelected ? "bg-rose-500 text-white" : "border border-muted-foreground/30"}`,
                                                    children: isRightOption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 66
                                                    }, this) : isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "w-3 h-3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 142,
                                                        columnNumber: 118
                                                    }, this) : String.fromCharCode(65 + optIdx)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/EmbeddedExam.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderWithLatex"])(opt.option_text)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/EmbeddedExam.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, opt.id, true, {
                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                            lineNumber: 137,
                                            columnNumber: 41
                                        }, this);
                                    }),
                                    q.question_type === "NAT" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg border border-border bg-muted/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-muted-foreground mb-1",
                                                children: [
                                                    "Correct Answer: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-emerald-500 font-mono",
                                                        children: q.correct_answer
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 109
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 150,
                                                columnNumber: 41
                                            }, this),
                                            !isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-muted-foreground",
                                                children: [
                                                    "Your Answer: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${isCorrect ? "text-emerald-500" : "text-rose-500"} font-mono`,
                                                        children: userAns ?? "N/A"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 116
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 151,
                                                columnNumber: 56
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 149,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 127,
                                columnNumber: 29
                            }, this),
                            q.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-500/10 border border-blue-500/30 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-sm font-bold text-blue-500 mb-2 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 159,
                                                columnNumber: 41
                                            }, this),
                                            " Explanation"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 158,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-foreground/90",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$renderWithLatex$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderWithLatex"])(q.explanation)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 161,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 157,
                                columnNumber: 33
                            }, this)
                        ]
                    }, q.id, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 103,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EmbeddedExam.tsx",
        lineNumber: 62,
        columnNumber: 9
    }, this);
}
_s(QuestionAnalysisView, "e+MJT8dKj6nR4oDBl1Hgi2giuOc=");
_c = QuestionAnalysisView;
// Helper functions for analysis
function checkAnswer(q, ans) {
    if (ans === undefined || ans === null || Array.isArray(ans) && ans.length === 0) return false;
    if (q.question_type === "NAT") return Number(ans) === Number(q.correct_answer);
    if (q.question_type === "MCQ") {
        const correctOpt = q.options.find((o)=>o.is_correct)?.id;
        return ans === correctOpt;
    }
    if (q.question_type === "MSQ") {
        const correctIds = q.options.filter((o)=>o.is_correct).map((o)=>o.id).sort();
        const ansIds = (Array.isArray(ans) ? ans : [
            ans
        ]).sort();
        return correctIds.length === ansIds.length && correctIds.every((x, i)=>x === ansIds[i]);
    }
    return false;
}
function isOptionSelected(q, optId, ans) {
    if (!ans) return false;
    if (q.question_type === "MCQ") return ans === optId;
    if (q.question_type === "MSQ") return (Array.isArray(ans) ? ans : [
        ans
    ]).includes(optId);
    return false;
}
function isOptionCorrect(q, optId) {
    return q.options?.find((o)=>o.id === optId)?.is_correct;
}
function PreviousResultView({ examId, userId, onRetake, attemptId, initialResult, onBack }) {
    _s1();
    const [effectiveAttemptId, setEffectiveAttemptId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(attemptId || null);
    const [showAnalysis, setShowAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    // If no attemptId provided, fetch the latest one
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviousResultView.useEffect": ()=>{
            if (attemptId) {
                setEffectiveAttemptId(attemptId);
                return;
            }
            const fetchLatestAttempt = {
                "PreviousResultView.useEffect.fetchLatestAttempt": async ()=>{
                    const { data: attempts } = await supabase.from("exam_attempts").select("id").eq("exam_id", examId).eq("student_id", userId).eq("status", "submitted").order("created_at", {
                        ascending: false
                    }).limit(1);
                    if (attempts && attempts.length > 0) {
                        setEffectiveAttemptId(attempts[0].id);
                    }
                }
            }["PreviousResultView.useEffect.fetchLatestAttempt"];
            fetchLatestAttempt();
        }
    }["PreviousResultView.useEffect"], [
        examId,
        userId,
        attemptId,
        supabase
    ]);
    const { data: resultData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useExamResult$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamResult"])(effectiveAttemptId || "");
    if (isLoading || !effectiveAttemptId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "w-8 h-8 animate-spin text-indigo-600"
            }, void 0, false, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 250,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 249,
            columnNumber: 13
        }, this);
    }
    if (!resultData || !resultData.result) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8 bg-card rounded-xl border border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-amber-500 mb-2",
                        children: "Result Not Found"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 259,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground text-sm mb-4",
                        children: "Could not find the result for this attempt."
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 260,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onRetake,
                        className: "bg-primary hover:bg-primary/90",
                        children: "Retake Quiz"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 261,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 258,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 257,
            columnNumber: 13
        }, this);
    }
    const { result, structured, responseMap, attempt } = resultData;
    const passed = result.passed ?? result.percentage >= 40;
    // Check for response expiry
    const isExpired = attempt?.submitted_at ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$responseCleanup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isResponseExpired"])(attempt.submitted_at) : false;
    // Check visibility settings
    const examSettings = attempt?.exams;
    const visibility = examSettings?.result_visibility || "immediate";
    const releaseTime = examSettings?.result_release_time;
    const showAnswers = examSettings?.show_answers ?? true;
    const isResultVisible = ()=>{
        if (visibility === "immediate") return true;
        if (visibility === "manual") return false;
        if (visibility === "scheduled" && releaseTime) {
            return new Date() >= new Date(releaseTime);
        }
        return false;
    };
    if (!isResultVisible()) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-background rounded-xl border border-border p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                        className: "w-8 h-8 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 294,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/EmbeddedExam.tsx",
                    lineNumber: 293,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-xl font-bold text-foreground mb-2",
                    children: "Results Not Yet Available"
                }, void 0, false, {
                    fileName: "[project]/components/EmbeddedExam.tsx",
                    lineNumber: 296,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground max-w-md mx-auto mb-6",
                    children: visibility === "scheduled" && releaseTime ? `The results for this exam will be released on ${new Date(releaseTime).toLocaleString()}.` : "The instructor has not released the results for this exam yet."
                }, void 0, false, {
                    fileName: "[project]/components/EmbeddedExam.tsx",
                    lineNumber: 297,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: onRetake,
                    variant: "outline",
                    className: "border-border text-foreground hover:bg-muted",
                    children: "Back to Exam"
                }, void 0, false, {
                    fileName: "[project]/components/EmbeddedExam.tsx",
                    lineNumber: 302,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 292,
            columnNumber: 13
        }, this);
    }
    if (showAnalysis) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionAnalysisView, {
            structured: structured,
            responseMap: responseMap,
            onBack: ()=>setShowAnalysis(false),
            isExpired: isExpired
        }, void 0, false, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 310,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background rounded-xl border border-border overflow-hidden shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-linear-to-r from-indigo-600 to-purple-600 text-white p-6 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                        className: "w-16 h-16 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 316,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold mb-2",
                        children: "Quiz Result"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-indigo-100",
                        children: [
                            "Attempted on ",
                            new Date(result.created_at).toLocaleDateString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 318,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 315,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 md:p-6 space-y-6",
                children: [
                    attempt?.submitted_at && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$ResponseExpiryWarning$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponseExpiryWarning"], {
                        submittedAt: attempt.submitted_at
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 326,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                        className: "w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-500 dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 330,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300",
                                        children: result.score ?? result.obtained_marks ?? 0
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 331,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-blue-600 dark:text-blue-400 font-medium",
                                        children: "Score"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 332,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 329,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-purple-50 dark:bg-purple-900/20 p-3 md:p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                        className: "w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-purple-500 dark:text-purple-400"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 335,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300",
                                        children: [
                                            result.percentage?.toFixed(1) || 0,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 336,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-purple-600 dark:text-purple-400 font-medium",
                                        children: "Percentage"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 337,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 334,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `bg-linear-to-br p-3 md:p-4 rounded-xl border text-center col-span-2 md:col-span-1 ${passed ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/50' : 'from-amber-500/20 to-amber-600/20 border-amber-500/50'}`,
                                children: [
                                    passed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                className: "w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-emerald-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 342,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400",
                                                children: "Passed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 343,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 347,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400",
                                                children: "Not Passed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 348,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground font-medium",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 351,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 339,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 328,
                        columnNumber: 17
                    }, this),
                    structured && structured.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-foreground flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                        className: "w-5 h-5 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 359,
                                        columnNumber: 29
                                    }, this),
                                    "Section Analysis"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 358,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4",
                                children: structured.map((section)=>{
                                    const secResult = section.result;
                                    const totalQuestions = section.questions.length;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-card p-4 rounded-xl border border-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-center mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-foreground",
                                                        children: section.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: [
                                                            totalQuestions,
                                                            " Questions"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 369,
                                                columnNumber: 41
                                            }, this),
                                            secResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-muted/50 p-2 rounded-lg border border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-muted-foreground text-xs",
                                                                children: "Score"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 377,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-blue-500",
                                                                children: [
                                                                    secResult.obtained_marks,
                                                                    " / ",
                                                                    secResult.total_marks
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-muted/50 p-2 rounded-lg border border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-muted-foreground text-xs",
                                                                children: "Correct"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-emerald-500",
                                                                children: secResult.correct_answers
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 382,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-muted/50 p-2 rounded-lg border border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-muted-foreground text-xs",
                                                                children: "Wrong"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-rose-500",
                                                                children: secResult.wrong_answers
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-muted/50 p-2 rounded-lg border border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-muted-foreground text-xs",
                                                                children: "Unanswered"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold text-muted-foreground",
                                                                children: secResult.unanswered
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                                lineNumber: 390,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 388,
                                                        columnNumber: 49
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 375,
                                                columnNumber: 45
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-muted-foreground italic",
                                                children: "No detailed result available for this section."
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 394,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, section.id, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 368,
                                        columnNumber: 37
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 362,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 357,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row justify-center gap-3 pt-4",
                        children: [
                            showAnswers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>setShowAnalysis(true),
                                className: "bg-blue-600 hover:bg-blue-700 text-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 412,
                                        columnNumber: 29
                                    }, this),
                                    "Review Questions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 408,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: onRetake,
                                className: "bg-primary hover:bg-primary/90 text-primary-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"], {
                                        className: "w-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 420,
                                        columnNumber: 25
                                    }, this),
                                    "Retake Quiz"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 416,
                                columnNumber: 21
                            }, this),
                            onBack && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: onBack,
                                variant: "outline",
                                className: "border-border text-foreground hover:bg-muted",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 429,
                                        columnNumber: 29
                                    }, this),
                                    "Back to Attempts"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 424,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>window.location.reload(),
                                variant: "secondary",
                                className: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                children: "Continue Learning"
                            }, void 0, false, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 433,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 406,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 323,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EmbeddedExam.tsx",
        lineNumber: 314,
        columnNumber: 9
    }, this);
}
_s1(PreviousResultView, "GTAWKJL1vPekoTmCEAi/JBo1M1M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useExamResult$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamResult"]
    ];
});
_c1 = PreviousResultView;
function EmbeddedExam({ examId, onExit, isRetake = false, onSuccessfulSubmit }) {
    _s2();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const examContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [responses, setResponses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [marked, setMarked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [visited, setVisited] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [activeQuestionIdx, setActiveQuestionIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Timer Logic - Ref to avoid re-renders
    const timeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [initialTime, setInitialTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTimerActive, setIsTimerActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSubmitDialog, setShowSubmitDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paletteOpenMobile, setPaletteOpenMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [retakeAttempt, setRetakeAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isRetake ? 1 : 0);
    const [submittedAttemptId, setSubmittedAttemptId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPauseDialog, setShowPauseDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPausing, setIsPausing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { markComplete } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessonContext"])();
    // Auth check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmbeddedExam.useEffect": ()=>{
            const checkUser = {
                "EmbeddedExam.useEffect.checkUser": async ()=>{
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) return router.push("/auth/login");
                    setUserId(user.id);
                }
            }["EmbeddedExam.useEffect.checkUser"];
            checkUser();
        }
    }["EmbeddedExam.useEffect"], [
        router,
        supabase
    ]);
    const { data: sessionData, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamSession"])(examId, userId, retakeAttempt, !showResults);
    const { mutate: submitExam, isPending: isSubmitting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmitExam"])();
    const { mutate: saveAnswer, isPending: isSaving } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSaveAnswer"])();
    const { mutate: updateTimer } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateTimer"])();
    // Initialize session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmbeddedExam.useEffect": ()=>{
            if (!sessionData) return;
            if (sessionData.previousResponses) {
                setResponses(sessionData.previousResponses);
                const newVisited = {};
                Object.keys(sessionData.previousResponses).forEach({
                    "EmbeddedExam.useEffect": (k)=>newVisited[k] = true
                }["EmbeddedExam.useEffect"]);
                setVisited(newVisited);
            }
            const totalDuration = sessionData.exam.duration_minutes * 60;
            const timeSpent = sessionData.attempt.total_time_spent || 0;
            const remaining = Math.max(0, totalDuration - timeSpent);
            setInitialTime(remaining);
            timeRef.current = remaining;
            setIsTimerActive(true);
        }
    }["EmbeddedExam.useEffect"], [
        sessionData
    ]);
    // Fullscreen handler
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmbeddedExam.useEffect": ()=>{
            const handleFullscreenChange = {
                "EmbeddedExam.useEffect.handleFullscreenChange": ()=>{
                    setIsFullscreen(!!document.fullscreenElement);
                }
            }["EmbeddedExam.useEffect.handleFullscreenChange"];
            document.addEventListener('fullscreenchange', handleFullscreenChange);
            return ({
                "EmbeddedExam.useEffect": ()=>document.removeEventListener('fullscreenchange', handleFullscreenChange)
            })["EmbeddedExam.useEffect"];
        }
    }["EmbeddedExam.useEffect"], []);
    const toggleFullscreen = async ()=>{
        if (!examContainerRef.current) return;
        if (!document.fullscreenElement) {
            try {
                await examContainerRef.current.requestFullscreen();
            } catch (err) {
                console.error("Error attempting to enable fullscreen:", err);
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
    };
    const forceExitFullscreen = async ()=>{
        if (document.fullscreenElement && document.exitFullscreen) {
            try {
                await document.exitFullscreen();
            } catch (err) {
                console.error("Error exiting fullscreen:", err);
            }
        }
    };
    const confirmPauseAndExit = async ()=>{
        setIsPausing(true);
        try {
            if (sessionData?.attempt?.id) {
                // Determine time spent
                const currentSecondsLeft = timeRef.current;
                const totalDur = sessionData.exam.duration_minutes * 60;
                const timeSpent = Math.max(0, totalDur - currentSecondsLeft);
                await new Promise((resolve, reject)=>{
                    updateTimer({
                        attemptId: sessionData.attempt.id,
                        timeSpent
                    }, {
                        onSuccess: ()=>resolve(),
                        onError: (error)=>reject(error)
                    });
                });
            }
            // Invalidate queries to ensure fresh data on return
            await queryClient.invalidateQueries({
                queryKey: [
                    "exam-attempts",
                    examId,
                    userId
                ]
            });
            await queryClient.invalidateQueries({
                queryKey: [
                    "exam-session"
                ]
            });
            // Exit fullscreen if active
            await forceExitFullscreen();
            setShowPauseDialog(false);
            if (onExit) onExit();
        } catch (error) {
            console.error("Error pausing exam:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to save progress");
        } finally{
            setIsPausing(false);
        }
    };
    const allQuestions = sessionData?.sections.flatMap((s)=>s.questions) || [];
    const currentQuestion = allQuestions[activeQuestionIdx];
    const isAnswered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedExam.useCallback[isAnswered]": (val)=>{
            return val !== undefined && val !== null && val !== "" && !(Array.isArray(val) && val.length === 0);
        }
    }["EmbeddedExam.useCallback[isAnswered]"], []);
    const getSectionAttemptCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedExam.useCallback[getSectionAttemptCount]": (sectionId)=>{
            const section = sessionData?.sections.find({
                "EmbeddedExam.useCallback[getSectionAttemptCount]": (s)=>s.id === sectionId
            }["EmbeddedExam.useCallback[getSectionAttemptCount]"]);
            if (!section) return 0;
            return section.questions.filter({
                "EmbeddedExam.useCallback[getSectionAttemptCount]": (q)=>isAnswered(responses[q.id])
            }["EmbeddedExam.useCallback[getSectionAttemptCount]"]).length;
        }
    }["EmbeddedExam.useCallback[getSectionAttemptCount]"], [
        sessionData,
        responses,
        isAnswered
    ]);
    const currentSection = sessionData?.sections.find((s)=>s.id === currentQuestion?.section_id);
    const handleSaveResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedExam.useCallback[handleSaveResponse]": (qid, ans)=>{
            // Max Attempts Enforcement
            if (currentSection?.max_questions_to_attempt) {
                const wasAnswered = isAnswered(responses[qid]);
                // Check if this is a "clearing" action (empty string or explicit null/undefined)
                const isClearing = ans === "" || ans === null || ans === undefined || Array.isArray(ans) && ans.length === 0;
                const willBeAnswered = isAnswered(ans);
                // Only block if we are ADDING an answer (was not answered, and will be answered)
                // If we are clearing (willBeAnswered is false), we should ALWAYS allow it.
                if (!wasAnswered && willBeAnswered && !isClearing) {
                    const currentCount = getSectionAttemptCount(currentSection.id);
                    if (currentCount >= currentSection.max_questions_to_attempt) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Maximum attempts (${currentSection.max_questions_to_attempt}) reached for this section. Clear an existing answer to change.`);
                        return; // Prevent saving
                    }
                }
            }
            setResponses({
                "EmbeddedExam.useCallback[handleSaveResponse]": (r)=>({
                        ...r,
                        [qid]: ans
                    })
            }["EmbeddedExam.useCallback[handleSaveResponse]"]);
            setVisited({
                "EmbeddedExam.useCallback[handleSaveResponse]": (v)=>({
                        ...v,
                        [qid]: true
                    })
            }["EmbeddedExam.useCallback[handleSaveResponse]"]);
            if (sessionData?.attempt?.id) {
                saveAnswer({
                    attemptId: sessionData.attempt.id,
                    questionId: qid,
                    answer: ans
                });
            }
        }
    }["EmbeddedExam.useCallback[handleSaveResponse]"], [
        currentSection,
        getSectionAttemptCount,
        isAnswered,
        responses,
        sessionData?.attempt?.id,
        saveAnswer
    ]);
    const handleMark = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedExam.useCallback[handleMark]": (qid)=>{
            setMarked({
                "EmbeddedExam.useCallback[handleMark]": (m)=>({
                        ...m,
                        [qid]: !m[qid]
                    })
            }["EmbeddedExam.useCallback[handleMark]"]);
        }
    }["EmbeddedExam.useCallback[handleMark]"], []);
    const performSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedExam.useCallback[performSubmit]": async ()=>{
            if (!sessionData?.attempt?.id || !sessionData?.exam) return;
            submitExam({
                attemptId: sessionData.attempt.id,
                examId: sessionData.exam.id,
                responses: responses,
                sections: sessionData.sections,
                totalMarks: sessionData.exam.total_marks || 0
            }, {
                onSuccess: {
                    "EmbeddedExam.useCallback[performSubmit]": async (result)=>{
                        // Exit Fullscreen IMMEDIATELY
                        await forceExitFullscreen();
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Quiz submitted successfully!");
                        setIsTimerActive(false);
                        // Wait a moment for database to update
                        await new Promise({
                            "EmbeddedExam.useCallback[performSubmit]": (resolve)=>setTimeout(resolve, 500)
                        }["EmbeddedExam.useCallback[performSubmit]"]);
                        // Award coins and mark complete
                        if (userId) {
                            try {
                                const rewardRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["awardCoins"])(userId, 'quiz_completion', examId, `Completed quiz: ${sessionData.exam.title}`);
                                if (rewardRes.success && rewardRes.message) {
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(rewardRes.message, {
                                        icon: "🪙"
                                    });
                                }
                            } catch (error) {
                                // Silently fail - don't break submission if reward fails
                                console.error("Failed to award coins:", error);
                            }
                            // Mark lesson complete via context
                            markComplete();
                        }
                        // Check if results should be shown immediately
                        let shouldShowResults = true; // Default to showing results
                        try {
                            const { data: examData, error } = await supabase.from("exams").select("result_visibility").eq("id", examId).single();
                            if (!error && examData) {
                                // Only hide results if explicitly set to manual or scheduled
                                shouldShowResults = examData.result_visibility === "immediate" || !examData.result_visibility;
                            }
                        } catch (error) {
                            console.error("Error fetching result visibility:", error);
                        // On error, default to showing results
                        }
                        // Close the submit dialog
                        setShowSubmitDialog(false);
                        if (shouldShowResults) {
                            // If onSuccessfulSubmit is provided (standalone mode), use it
                            if (onSuccessfulSubmit) {
                                onSuccessfulSubmit(sessionData.attempt.id);
                            } else {
                                // Otherwise show results inline (embedded mode)
                                setSubmittedAttemptId(sessionData.attempt.id);
                                setShowResults(true);
                            }
                        } else {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Results will be available once the instructor releases them");
                            if (onExit) onExit();
                        }
                    }
                }["EmbeddedExam.useCallback[performSubmit]"],
                onError: {
                    "EmbeddedExam.useCallback[performSubmit]": (error)=>{
                        console.error("Submission error:", error);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to submit quiz. Please try again.");
                        setShowSubmitDialog(false);
                    }
                }["EmbeddedExam.useCallback[performSubmit]"]
            });
        }
    }["EmbeddedExam.useCallback[performSubmit]"], [
        sessionData,
        responses,
        submitExam,
        examId,
        userId,
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$bae3ba__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["awardCoins"],
        markComplete,
        onExit,
        onSuccessfulSubmit,
        supabase
    ]);
    const handleAutoSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EmbeddedExam.useCallback[handleAutoSubmit]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Time's up! Submitting quiz...");
            performSubmit();
        }
    }["EmbeddedExam.useCallback[handleAutoSubmit]"], [
        performSubmit
    ]);
    const validateMinimumAttempts = ()=>{
        if (!sessionData) return true;
        let isValid = true;
        sessionData.sections.forEach((s)=>{
            if (s.required_attempts && getSectionAttemptCount(s.id) < s.required_attempts) {
                isValid = false;
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].warning(`Section "${s.title}" requires at least ${s.required_attempts} attempted questions.`);
            }
        });
        return isValid;
    };
    if (isLoading || !userId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96 text-muted-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "w-8 h-8 animate-spin text-indigo-600"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 728,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Loading Quiz..."
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 729,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 727,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 726,
            columnNumber: 13
        }, this);
    }
    if (error || !sessionData && !isLoading) {
        const errorMessage = error?.message || "Unknown error";
        const isAlreadySubmitted = errorMessage.includes("already been submitted");
        if (isAlreadySubmitted && userId) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviousResultView, {
                examId: examId,
                userId: userId,
                onRetake: ()=>{
                    queryClient.invalidateQueries({
                        queryKey: [
                            "exam-session"
                        ]
                    });
                    setRetakeAttempt((prev)=>prev + 1);
                }
            }, void 0, false, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 740,
                columnNumber: 20
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-96",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center p-8 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-bold text-rose-900 dark:text-rose-400 mb-2",
                        children: "Failed to Load Quiz"
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 753,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-rose-700 dark:text-rose-500 text-sm",
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 754,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 752,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 751,
            columnNumber: 13
        }, this);
    }
    if (showResults && submittedAttemptId && userId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviousResultView, {
            examId: examId,
            userId: userId,
            attemptId: submittedAttemptId,
            onRetake: ()=>{
                setRetakeAttempt((prev)=>{
                    const newRetakeAttempt = prev + 1;
                    queryClient.invalidateQueries({
                        queryKey: [
                            "exam-session",
                            examId,
                            userId,
                            prev
                        ]
                    });
                    queryClient.invalidateQueries({
                        queryKey: [
                            "exam-session",
                            examId,
                            userId,
                            newRetakeAttempt
                        ]
                    });
                    return newRetakeAttempt;
                });
                setShowResults(false);
                setSubmittedAttemptId(null);
            },
            onBack: onExit ? ()=>onExit() : undefined
        }, void 0, false, {
            fileName: "[project]/components/EmbeddedExam.tsx",
            lineNumber: 762,
            columnNumber: 13
        }, this);
    }
    if (!sessionData) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: examContainerRef,
        className: "grid grid-cols-1 lg:grid-cols-[1fr_360px] bg-background text-foreground rounded-xl overflow-hidden border border-border h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col min-h-0 p-3 md:p-6 relative bg-background",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 bg-card border border-border py-3 px-3 md:px-4 rounded-xl flex flex-wrap items-center justify-between gap-2 md:gap-3 shadow-sm mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-base md:text-lg font-bold text-primary truncate",
                                                children: sessionData.exam.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 791,
                                                columnNumber: 29
                                            }, this),
                                            currentSection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-semibold px-2 py-0.5 rounded border border-border bg-muted/50 text-muted-foreground ml-2",
                                                children: [
                                                    "Attempted: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${currentSection.max_questions_to_attempt && getSectionAttemptCount(currentSection.id) >= currentSection.max_questions_to_attempt ? "text-rose-500" : "text-foreground"}`,
                                                        children: getSectionAttemptCount(currentSection.id)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 48
                                                    }, this),
                                                    currentSection.required_attempts ? ` / Min ${currentSection.required_attempts}` : "",
                                                    currentSection.max_questions_to_attempt ? ` / Max ${currentSection.max_questions_to_attempt}` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 793,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 790,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 mt-2 overflow-x-auto pb-1",
                                        children: sessionData.sections.map((s, i)=>{
                                            const startIdx = sessionData.sections.slice(0, i).reduce((a, b)=>a + b.questions.length, 0);
                                            const isActive = activeQuestionIdx >= startIdx && activeQuestionIdx < startIdx + s.questions.length;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveQuestionIdx(startIdx),
                                                className: `px-2 md:px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${isActive ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
                                                children: s.title
                                            }, s.id, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 805,
                                                columnNumber: 37
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 800,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 789,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 md:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex items-center gap-2 text-xs text-muted-foreground font-medium",
                                        children: isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "w-3 h-3 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/EmbeddedExam.tsx",
                                                    lineNumber: 825,
                                                    columnNumber: 37
                                                }, this),
                                                "Saving..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/EmbeddedExam.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 37
                                                }, this),
                                                "Saved"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 822,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$ExamTimer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExamTimer"], {
                                        initialSeconds: initialTime,
                                        isActive: isTimerActive,
                                        onTimeUp: handleAutoSubmit,
                                        timeRef: timeRef
                                    }, initialTime, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 836,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            if (validateMinimumAttempts()) {
                                                setShowSubmitDialog(true);
                                            } else {
                                                setShowSubmitDialog(true);
                                            }
                                        },
                                        className: "hidden sm:block bg-rose-600 hover:bg-rose-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors shadow-sm",
                                        children: "Submit"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 844,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowPauseDialog(true),
                                        className: "flex items-center gap-2 bg-muted hover:bg-muted/80 text-muted-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 860,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden lg:inline",
                                                children: "Pause & Exit"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 861,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 856,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: toggleFullscreen,
                                        className: "p-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors",
                                        title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
                                        children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize$3e$__["Minimize"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                            lineNumber: 868,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__["Maximize"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                            lineNumber: 868,
                                            columnNumber: 80
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 863,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPaletteOpenMobile(true),
                                        className: "block lg:hidden bg-primary text-primary-foreground px-2 md:px-3 py-1.5 md:py-2 rounded-md text-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                            lineNumber: 874,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 870,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 820,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 788,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$QuestionDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuestionDisplay"], {
                        question: currentQuestion,
                        activeQuestionIdx: activeQuestionIdx,
                        response: responses[currentQuestion?.id],
                        isMarked: marked[currentQuestion?.id] || false,
                        onSave: handleSaveResponse,
                        onMark: handleMark,
                        onNext: ()=>{
                            if (activeQuestionIdx < allQuestions.length - 1) setActiveQuestionIdx((i)=>i + 1);
                        },
                        onPrev: ()=>{
                            if (activeQuestionIdx > 0) setActiveQuestionIdx((i)=>i - 1);
                        },
                        onClear: ()=>handleSaveResponse(currentQuestion.id, ""),
                        isFirst: activeQuestionIdx === 0,
                        isLast: activeQuestionIdx === allQuestions.length - 1
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 880,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 786,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$exam$2f$QuestionPalette$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuestionPalette"], {
                questions: allQuestions,
                activeQuestionIdx: activeQuestionIdx,
                responses: responses,
                marked: marked,
                visited: visited,
                onNavigate: (idx)=>setActiveQuestionIdx(idx),
                onSubmit: ()=>setShowSubmitDialog(true),
                sectionTitle: currentSection?.title,
                isMobileOpen: paletteOpenMobile,
                onMobileClose: ()=>setPaletteOpenMobile(false)
            }, void 0, false, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 900,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showSubmitDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        onClick: ()=>setShowSubmitDialog(false),
                        className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0.95,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            exit: {
                                scale: 0.95,
                                opacity: 0
                            },
                            onClick: (e)=>e.stopPropagation(),
                            className: "bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "w-8 h-8 text-rose-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                            lineNumber: 933,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 932,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-foreground mb-2",
                                        children: "Submit Exam?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 935,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground mb-6",
                                        children: "Are you sure you want to submit? You won't be able to change your answers after this."
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 936,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-muted/50 rounded-lg p-4 mb-6 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Answered"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 942,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-emerald-500 font-semibold",
                                                        children: Object.values(responses).filter((v)=>v !== null && (Array.isArray(v) ? v.length > 0 : true)).length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 943,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 941,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Marked for Review"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 948,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-amber-500 font-semibold",
                                                        children: Object.values(marked).filter(Boolean).length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 947,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted-foreground",
                                                        children: "Unanswered"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 954,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground font-semibold",
                                                        children: allQuestions.length - Object.values(responses).filter((v)=>v !== null && (Array.isArray(v) ? v.length > 0 : true)).length
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                                        lineNumber: 955,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 953,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 940,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowSubmitDialog(false),
                                                className: "flex-1 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted font-medium transition-colors",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 962,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: performSubmit,
                                                disabled: isSubmitting,
                                                className: "flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-lg shadow-rose-900/20 transition-colors flex items-center justify-center gap-2",
                                                children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "w-4 h-4 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                                            lineNumber: 975,
                                                            columnNumber: 53
                                                        }, this),
                                                        "Submitting..."
                                                    ]
                                                }, void 0, true) : "Submit Now"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 968,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 961,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 931,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/EmbeddedExam.tsx",
                            lineNumber: 924,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 917,
                        columnNumber: 25
                    }, this)
                }, void 0, false)
            }, void 0, false, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 914,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showPauseDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        onClick: ()=>setShowPauseDialog(false),
                        className: "fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0.95,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            exit: {
                                scale: 0.95,
                                opacity: 0
                            },
                            onClick: (e)=>e.stopPropagation(),
                            className: "bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                            className: "w-8 h-8 text-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                            lineNumber: 1010,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 1009,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-foreground mb-2",
                                        children: "Pause & Exit?"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 1012,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground mb-6",
                                        children: "Your progress will be saved and you can resume this exam later."
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 1013,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowPauseDialog(false),
                                                className: "flex-1 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted font-medium transition-colors",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: confirmPauseAndExit,
                                                disabled: isPausing,
                                                className: "flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium shadow-lg shadow-amber-900/20 transition-colors flex items-center justify-center gap-2",
                                                children: isPausing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                            className: "w-4 h-4 animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 53
                                                        }, this),
                                                        "Saving..."
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PauseCircle$3e$__["PauseCircle"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/EmbeddedExam.tsx",
                                                            lineNumber: 1036,
                                                            columnNumber: 53
                                                        }, this),
                                                        "Pause & Exit"
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmbeddedExam.tsx",
                                                lineNumber: 1024,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmbeddedExam.tsx",
                                        lineNumber: 1017,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmbeddedExam.tsx",
                                lineNumber: 1008,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/EmbeddedExam.tsx",
                            lineNumber: 1001,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/EmbeddedExam.tsx",
                        lineNumber: 994,
                        columnNumber: 25
                    }, this)
                }, void 0, false)
            }, void 0, false, {
                fileName: "[project]/components/EmbeddedExam.tsx",
                lineNumber: 991,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EmbeddedExam.tsx",
        lineNumber: 784,
        columnNumber: 9
    }, this);
}
_s2(EmbeddedExam, "zHiVBGoNyRznic6Vlv+vIC04/TM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessonContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSubmitExam"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSaveAnswer"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useExamSession$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateTimer"]
    ];
});
_c2 = EmbeddedExam;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "QuestionAnalysisView");
__turbopack_context__.k.register(_c1, "PreviousResultView");
__turbopack_context__.k.register(_c2, "EmbeddedExam");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/examAccess.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkExamAccess",
    ()=>checkExamAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
async function checkExamAccess(examId, userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        // Fetch exam details
        const { data: exam, error: examError } = await supabase.from("exams").select("*").eq("id", examId).single();
        if (examError || !exam) {
            return {
                accessible: false,
                reason: undefined,
                message: "Exam not found"
            };
        }
        const examData = exam;
        const now = new Date();
        // Check start time
        if (examData.start_time) {
            const startTime = new Date(examData.start_time);
            if (now < startTime) {
                return {
                    accessible: false,
                    reason: "upcoming",
                    message: `This exam will be available starting ${startTime.toLocaleString()}`,
                    startTime
                };
            }
        }
        // Check end time
        if (examData.end_time) {
            const endTime = new Date(examData.end_time);
            if (now > endTime) {
                return {
                    accessible: false,
                    reason: "expired",
                    message: `This exam ended on ${endTime.toLocaleString()}`,
                    endTime
                };
            }
        }
        // Check LESSON-based prerequisite (quiz lessons only)
        // 1. Find the lesson containing this exam
        const { data: currentLesson } = await supabase.from("lessons").select("id, title, prerequisite_lesson_id, sequential_unlock_enabled, content_type, exam_id").eq("exam_id", examId).eq("content_type", "quiz").limit(1).maybeSingle();
        // If exam is not in a quiz lesson, or lesson doesn't exist, allow access
        if (!currentLesson) {
            return {
                accessible: true,
                reason: "accessible"
            };
        }
        // 2. Check if this lesson has sequential unlock enabled and a prerequisite
        // SAFEGUARD: Ignore if prerequisite is the lesson itself (prevent infinite lock)
        if (currentLesson.sequential_unlock_enabled && currentLesson.prerequisite_lesson_id && currentLesson.prerequisite_lesson_id !== currentLesson.id) {
            // 3. Get the prerequisite lesson and its exam
            const { data: prereqLesson } = await supabase.from("lessons").select("id, title, exam_id").eq("id", currentLesson.prerequisite_lesson_id).single();
            if (prereqLesson && prereqLesson.exam_id) {
                // Safeguard: If the prerequisite points to the SAME exam, ignore it (deadlock prevention)
                if (prereqLesson.exam_id === examId) {
                    return {
                        accessible: true,
                        reason: "accessible"
                    };
                }
                // 4. Check if student has completed the prerequisite lesson's exam
                const { data: prerequisiteAttempts } = await supabase.from("exam_attempts").select("id, status").eq("exam_id", prereqLesson.exam_id).eq("student_id", userId).eq("status", "submitted");
                if (!prerequisiteAttempts || prerequisiteAttempts.length === 0) {
                    return {
                        accessible: false,
                        reason: "prerequisite",
                        message: "You must complete the previous quiz first",
                        prerequisiteTitle: prereqLesson.title || "Previous Quiz"
                    };
                }
            }
        }
        // Exam is accessible
        return {
            accessible: true,
            reason: "accessible"
        };
    } catch (error) {
        console.error("❌ Error checking exam access:", error);
        // Return accessible on error to avoid blocking students
        return {
            accessible: true,
            reason: "accessible"
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useExamAccess.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useExamAccess",
    ()=>useExamAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$examAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/examAccess.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useExamAccess(examId, userId) {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'exam-access',
            examId,
            userId
        ],
        queryFn: {
            "useExamAccess.useQuery": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$examAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkExamAccess"])(examId, userId)
        }["useExamAccess.useQuery"],
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        retry: 1,
        // Return cached data instantly while revalidating in background
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
}
_s(useExamAccess, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ExamAccessChecker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExamAccessChecker",
    ()=>ExamAccessChecker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ExamAccessChecker({ status, onStartExam, className }) {
    _s();
    const [countdown, setCountdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Countdown timer for upcoming exams
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExamAccessChecker.useEffect": ()=>{
            if (status.reason === "upcoming" && status.startTime) {
                const updateCountdown = {
                    "ExamAccessChecker.useEffect.updateCountdown": ()=>{
                        const now = new Date();
                        const diff = status.startTime.getTime() - now.getTime();
                        if (diff <= 0) {
                            setCountdown("Starting now...");
                            // Refresh to update access status
                            setTimeout({
                                "ExamAccessChecker.useEffect.updateCountdown": ()=>window.location.reload()
                            }["ExamAccessChecker.useEffect.updateCountdown"], 1000);
                            return;
                        }
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                        const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
                        const seconds = Math.floor(diff % (1000 * 60) / 1000);
                        if (days > 0) {
                            setCountdown(`${days}d ${hours}h ${minutes}m`);
                        } else if (hours > 0) {
                            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
                        } else if (minutes > 0) {
                            setCountdown(`${minutes}m ${seconds}s`);
                        } else {
                            setCountdown(`${seconds}s`);
                        }
                    }
                }["ExamAccessChecker.useEffect.updateCountdown"];
                updateCountdown();
                const interval = setInterval(updateCountdown, 1000);
                return ({
                    "ExamAccessChecker.useEffect": ()=>clearInterval(interval)
                })["ExamAccessChecker.useEffect"];
            }
        }
    }["ExamAccessChecker.useEffect"], [
        status.reason,
        status.startTime
    ]);
    // 1. Ready to Start State
    if (status.accessible) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-w-md mx-auto p-1 bg-white dark:bg-slate-900 rounded-[2rem] border border-green-100 dark:border-green-900/30 transition-all duration-300", className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 sm:p-8 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-100 dark:border-green-800/50 w-fit mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 68,
                                columnNumber: 25
                            }, this),
                            "System Ready"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 67,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight",
                                children: "Exam is Ready"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 73,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 dark:text-slate-400 font-medium",
                                children: "Your credentials have been verified. You may now enter the secure examination area."
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 74,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this),
                    onStartExam && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: onStartExam,
                        className: "w-full py-6 text-lg shadow-lg shadow-green-200 dark:shadow-none",
                        variant: "ghost",
                        size: "lg",
                        children: "Start Exam Now"
                    }, void 0, false, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 78,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExamAccessChecker.tsx",
                lineNumber: 66,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ExamAccessChecker.tsx",
            lineNumber: 65,
            columnNumber: 13
        }, this);
    }
    // 2. Upcoming exam
    if (status.reason === "upcoming") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-h-screen bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center font-sans transition-colors duration-300", className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-2xl space-y-4 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-wider uppercase transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex h-1.5 w-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ExamAccessChecker.tsx",
                                            lineNumber: 102,
                                            columnNumber: 33
                                        }, this),
                                        "Access Restricted"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                    lineNumber: 101,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 100,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-8 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors",
                                        children: "Exam Not Yet Started"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 111,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-md mx-auto leading-relaxed transition-colors",
                                        children: status.message
                                    }, void 0, false, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 114,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 110,
                                columnNumber: 25
                            }, this),
                            countdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-center transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2 transition-colors",
                                            children: "Launch Sequence In"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ExamAccessChecker.tsx",
                                            lineNumber: 123,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl sm:text-5xl font-mono font-bold tracking-tighter text-slate-900 dark:text-white tabular-nums transition-colors",
                                            children: countdown
                                        }, void 0, false, {
                                            fileName: "[project]/components/ExamAccessChecker.tsx",
                                            lineNumber: 124,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center gap-8 mt-2 text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Hours"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Minutes"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Seconds"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ExamAccessChecker.tsx",
                                            lineNumber: 127,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                    lineNumber: 122,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 121,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    size: 18,
                                                    strokeWidth: 2.5
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 139,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors",
                                                        children: "Scheduled Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors",
                                                        children: status.startTime?.toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 142,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 138,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                    size: 18,
                                                    strokeWidth: 2.5
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 151,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors",
                                                        children: "Environment"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors text-nowrap",
                                                        children: "Secure Portal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 154,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 150,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 137,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        disabled: true,
                                        className: "w-full py-5 text-base bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 cursor-not-allowed transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                size: 18,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 166,
                                                columnNumber: 33
                                            }, this),
                                            "Awaiting Scheduled Start"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                size: 12
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 171,
                                                columnNumber: 33
                                            }, this),
                                            "Unlocks at ",
                                            status.startTime?.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 170,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 98,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                size: 16,
                                                className: "text-amber-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 180,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-black text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider transition-colors",
                                                children: "Key Rules"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 181,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 179,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: [
                                            "No external applications.",
                                            "System clock must be synced.",
                                            "120 minutes total duration."
                                        ].map((rule, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        size: 12,
                                                        className: "mt-0.5 text-slate-300 dark:text-slate-700 shrink-0 transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 41
                                                    }, this),
                                                    rule
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 189,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 183,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 178,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between items-start mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "font-black text-sm",
                                                        children: "Need Help?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 200,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        size: 16,
                                                        className: "text-indigo-200 opacity-60"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 199,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-indigo-100 dark:text-indigo-200/80 font-medium leading-relaxed transition-colors",
                                                children: "Support available 24/7 for troubleshooting."
                                            }, void 0, false, {
                                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                                lineNumber: 203,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 198,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "relative z-10 w-full mt-4 text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 hover:bg-indigo-50 dark:bg-indigo-800 dark:text-white dark:hover:bg-indigo-700 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm border border-transparent dark:border-indigo-700/50",
                                        children: "Connect Support"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 207,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 197,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 177,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExamAccessChecker.tsx",
                lineNumber: 96,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ExamAccessChecker.tsx",
            lineNumber: 95,
            columnNumber: 13
        }, this);
    }
    // 3. Expired exam
    if (status.reason === "expired") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-amber-100 dark:border-amber-900/30 transition-all duration-300", className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                    lineNumber: 224,
                                    columnNumber: 29
                                }, this),
                                "Session Expired"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ExamAccessChecker.tsx",
                            lineNumber: 223,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 222,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight",
                                children: "Exam Has Ended"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 230,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed",
                                children: status.message || "This examination period has concluded and is no longer accepting submissions."
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 231,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 229,
                        columnNumber: 21
                    }, this),
                    status.endTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center justify-center gap-3 border border-slate-100 dark:border-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                className: "w-4 h-4 text-slate-400"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 238,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-slate-500 dark:text-slate-400",
                                children: [
                                    "Closed on ",
                                    status.endTime.toLocaleString([], {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 239,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 237,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        disabled: true,
                        className: "w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed",
                        size: "lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 250,
                                columnNumber: 25
                            }, this),
                            "Exam Closed"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 245,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExamAccessChecker.tsx",
                lineNumber: 221,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ExamAccessChecker.tsx",
            lineNumber: 220,
            columnNumber: 13
        }, this);
    }
    // 4. Prerequisite locked
    if (status.reason === "prerequisite") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-purple-100 dark:border-purple-900/30 transition-all duration-300", className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-100 dark:border-purple-800/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                    lineNumber: 265,
                                    columnNumber: 29
                                }, this),
                                "Prerequisite Required"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ExamAccessChecker.tsx",
                            lineNumber: 264,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 263,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-black text-slate-900 dark:text-white tracking-tight",
                                children: "Access Locked"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 271,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed",
                                children: status.message || "You must successfully complete the prerequisite assessment to unlock this exam."
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 272,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 270,
                        columnNumber: 21
                    }, this),
                    status.prerequisiteTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 flex items-start gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                    size: 18,
                                    className: "text-purple-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/ExamAccessChecker.tsx",
                                    lineNumber: 280,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 279,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1",
                                        children: "Required Task"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 283,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-bold text-purple-900 dark:text-purple-100",
                                        children: status.prerequisiteTitle
                                    }, void 0, false, {
                                        fileName: "[project]/components/ExamAccessChecker.tsx",
                                        lineNumber: 284,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 282,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 278,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        disabled: true,
                        className: "w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed",
                        size: "lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 296,
                                columnNumber: 25
                            }, this),
                            "Complete Task First"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 291,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExamAccessChecker.tsx",
                lineNumber: 262,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ExamAccessChecker.tsx",
            lineNumber: 261,
            columnNumber: 13
        }, this);
    }
    // Default locked state
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("space-y-4 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 rounded-lg bg-slate-100 dark:bg-slate-900/50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                            className: "w-6 h-6 text-slate-600 dark:text-slate-400"
                        }, void 0, false, {
                            fileName: "[project]/components/ExamAccessChecker.tsx",
                            lineNumber: 309,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 308,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1",
                                children: "Exam Locked"
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 312,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-700 dark:text-slate-300",
                                children: status.message || "This exam is currently not accessible."
                            }, void 0, false, {
                                fileName: "[project]/components/ExamAccessChecker.tsx",
                                lineNumber: 315,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 311,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExamAccessChecker.tsx",
                lineNumber: 307,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                disabled: true,
                className: "w-full",
                size: "lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                        className: "w-4 h-4 mr-2"
                    }, void 0, false, {
                        fileName: "[project]/components/ExamAccessChecker.tsx",
                        lineNumber: 325,
                        columnNumber: 17
                    }, this),
                    "Exam Locked"
                ]
            }, void 0, true, {
                fileName: "[project]/components/ExamAccessChecker.tsx",
                lineNumber: 320,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ExamAccessChecker.tsx",
        lineNumber: 306,
        columnNumber: 9
    }, this);
}
_s(ExamAccessChecker, "YZ9VIIBniY3MrwVjIrsyVnEaX1I=");
_c = ExamAccessChecker;
var _c;
__turbopack_context__.k.register(_c, "ExamAccessChecker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/QuizPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuizPlayer",
    ()=>QuizPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmbeddedExam$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/EmbeddedExam.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-question.js [app-client] (ecmascript) <export default as FileQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-checks.js [app-client] (ecmascript) <export default as ListChecks>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useExamAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useExamAccess.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExamAccessChecker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ExamAccessChecker.tsx [app-client] (ecmascript)");
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
;
function QuizPlayer({ exam, attempts, userId, questionsCount, maxAttempts = 1 }) {
    _s();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("landing");
    const [selectedAttempt, setSelectedAttempt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ⚡ INSTANT CACHED ACCESS: Use React Query for access check
    // First visit: Checks access (~50ms), caches result
    // Return visits: Uses cached result (0ms instant!)
    const { data: accessStatus, isPending: isCheckingAccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useExamAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamAccess"])(exam.id, userId);
    // Fetch attempts with React Query
    const { data: attemptsData, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "exam-attempts",
            exam.id,
            userId
        ],
        queryFn: {
            "QuizPlayer.useQuery": async ()=>{
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                const { data } = await supabase.from("exam_attempts").select("*, result:results(*)").eq("exam_id", exam.id).eq("student_id", userId).order("created_at", {
                    ascending: false
                });
                return data || [];
            }
        }["QuizPlayer.useQuery"],
        initialData: attempts,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    });
    const completedAttempts = (attemptsData || []).filter((a)=>a.status === 'submitted');
    const limit = exam.max_attempts !== undefined ? exam.max_attempts : maxAttempts;
    const attemptsLeft = limit !== null && limit !== undefined ? Math.max(0, limit - completedAttempts.length) : Infinity;
    const activeAttempt = (attemptsData || []).find((a)=>a.status !== 'submitted');
    const hasAttempted = completedAttempts.length > 0 || !!activeAttempt;
    const handleStart = ()=>{
        setView("exam");
    };
    const handleViewResult = (attempt)=>{
        setSelectedAttempt(attempt);
        setView("result");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuizPlayer.useEffect": ()=>{
            if (view === "landing") {
                refetch();
            }
        }
    }["QuizPlayer.useEffect"], [
        view,
        refetch
    ]);
    // ⚡ INSTANT STATE: Show skeleton ONLY while checking access for first time
    // Cached access status returns instantly (0ms), no spinner!
    if (isCheckingAccess && !accessStatus) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-8 w-8 animate-spin text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/components/QuizPlayer.tsx",
                lineNumber: 84,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/QuizPlayer.tsx",
            lineNumber: 83,
            columnNumber: 13
        }, this);
    }
    // Access denied / locked state
    if (accessStatus && !accessStatus.accessible) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ExamAccessChecker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExamAccessChecker"], {
            status: accessStatus
        }, void 0, false, {
            fileName: "[project]/components/QuizPlayer.tsx",
            lineNumber: 93,
            columnNumber: 13
        }, this);
    }
    if (view === "exam") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmbeddedExam$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmbeddedExam"], {
            examId: exam.id,
            onExit: ()=>setView("landing"),
            isRetake: hasAttempted && !activeAttempt
        }, void 0, false, {
            fileName: "[project]/components/QuizPlayer.tsx",
            lineNumber: 99,
            columnNumber: 16
        }, this);
    }
    if (view === "result") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    onClick: ()=>setView("landing"),
                    className: "pl-0 hover:pl-2 transition-all gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "h-4 w-4 rotate-180"
                        }, void 0, false, {
                            fileName: "[project]/components/QuizPlayer.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, this),
                        " Back to Quiz Overview"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/QuizPlayer.tsx",
                    lineNumber: 105,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl overflow-hidden border border-border shadow-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmbeddedExam$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PreviousResultView"], {
                        examId: exam.id,
                        userId: userId,
                        onRetake: ()=>setView("exam"),
                        attemptId: selectedAttempt?.id,
                        initialResult: selectedAttempt?.result
                    }, void 0, false, {
                        fileName: "[project]/components/QuizPlayer.tsx",
                        lineNumber: 113,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/QuizPlayer.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/QuizPlayer.tsx",
            lineNumber: 104,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto bg-app transition-theme",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:col-span-2 relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "relative border-none border-border shadow-xl bg-card overflow-hidden z-10 transition-theme",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            className: "pb-2 pt-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-4xl font-serif font-medium mb-3 tracking-wide text-foreground",
                                    children: exam.title
                                }, void 0, false, {
                                    fileName: "[project]/components/QuizPlayer.tsx",
                                    lineNumber: 131,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                    className: "text-base text-muted-foreground max-w-xl mx-auto",
                                    children: exam.description || 'This exam covers the comprehensive syllabus including Algebra, Calculus, and more.'
                                }, void 0, false, {
                                    fileName: "[project]/components/QuizPlayer.tsx",
                                    lineNumber: 134,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/QuizPlayer.tsx",
                            lineNumber: 130,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "space-y-10 px-6 py-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-4 md:gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 py-8 rounded-xl border border-border flex flex-col items-center justify-center text-center shadow-sm transition-theme",
                                        style: {
                                            background: 'linear-gradient(180deg, rgba(59,130,246,0.06), transparent)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2.5 rounded-full mb-3",
                                                style: {
                                                    background: 'rgba(59,130,246,0.12)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"], {
                                                    className: "w-6 h-6 text-blue-700 dark:text-blue-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 147,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-foreground min-w-[2ch]",
                                                children: questionsCount
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 150,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1",
                                                children: "Questions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 151,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/QuizPlayer.tsx",
                                        lineNumber: 143,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 py-8 rounded-xl border border-border flex flex-col items-center justify-center text-center shadow-sm transition-theme",
                                        style: {
                                            background: 'linear-gradient(180deg, rgba(249,115,22,0.06), transparent)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2.5 rounded-full mb-3",
                                                style: {
                                                    background: 'rgba(249,115,22,0.12)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "w-6 h-6 text-orange-700 dark:text-orange-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 161,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-foreground min-w-[2ch]",
                                                children: [
                                                    exam.duration_minutes ?? 0,
                                                    "m"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 164,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1",
                                                children: "Duration"
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 165,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/QuizPlayer.tsx",
                                        lineNumber: 157,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 py-8 rounded-xl border border-border flex flex-col items-center justify-center text-center shadow-sm transition-theme",
                                        style: {
                                            background: 'linear-gradient(180deg, rgba(16,185,129,0.06), transparent)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2.5 rounded-full mb-3",
                                                style: {
                                                    background: 'rgba(16,185,129,0.12)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$checks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListChecks$3e$__["ListChecks"], {
                                                    className: "w-6 h-6 text-emerald-700 dark:text-emerald-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 175,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-foreground min-w-[2ch]",
                                                children: limit === null || limit === undefined ? '∞' : attemptsLeft
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 178,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] md:text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1",
                                                children: "Attempts Left"
                                            }, void 0, false, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 181,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/QuizPlayer.tsx",
                                        lineNumber: 171,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/QuizPlayer.tsx",
                                lineNumber: 141,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/QuizPlayer.tsx",
                            lineNumber: 139,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                            className: "pb-8 px-6",
                            children: limit === null || limit === undefined || attemptsLeft > 0 || activeAttempt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleStart,
                                size: "lg",
                                className: "w-full text-base font-bold uppercase tracking-wider py-6 bg-linear-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg shadow-orange-500/20 border-0 rounded-lg transition-all transform hover:scale-[1.01]",
                                children: activeAttempt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            className: "w-5 h-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/QuizPlayer.tsx",
                                            lineNumber: 197,
                                            columnNumber: 41
                                        }, this),
                                        " Resume Quiz"
                                    ]
                                }, void 0, true) : hasAttempted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: "w-5 h-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/QuizPlayer.tsx",
                                            lineNumber: 201,
                                            columnNumber: 41
                                        }, this),
                                        " Retake Quiz"
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            className: "w-5 h-5 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/QuizPlayer.tsx",
                                            lineNumber: 205,
                                            columnNumber: 41
                                        }, this),
                                        " Start Quiz"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/QuizPlayer.tsx",
                                lineNumber: 190,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                disabled: true,
                                size: "lg",
                                className: "w-full py-6 text-base uppercase font-bold tracking-wider",
                                children: "No Attempts Remaining"
                            }, void 0, false, {
                                fileName: "[project]/components/QuizPlayer.tsx",
                                lineNumber: 210,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/QuizPlayer.tsx",
                            lineNumber: 188,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/QuizPlayer.tsx",
                    lineNumber: 129,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/QuizPlayer.tsx",
                lineNumber: 128,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "border-none border-border shadow-md bg-card h-full min-h-[400px] transition-theme",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            className: "pb-4 border-b border-border/50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "text-xl font-serif tracking-wide text-foreground flex items-center gap-2",
                                children: "HISTORY"
                            }, void 0, false, {
                                fileName: "[project]/components/QuizPlayer.tsx",
                                lineNumber: 222,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/QuizPlayer.tsx",
                            lineNumber: 221,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "pt-6 relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/QuizPlayer.tsx",
                                    lineNumber: 229,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-[38px] top-6 bottom-6 w-0.5 bg-border z-0"
                                }, void 0, false, {
                                    fileName: "[project]/components/QuizPlayer.tsx",
                                    lineNumber: 232,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6 relative z-10",
                                    children: [
                                        completedAttempts.length === 0 && !activeAttempt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground pl-4",
                                            children: "No history yet."
                                        }, void 0, false, {
                                            fileName: "[project]/components/QuizPlayer.tsx",
                                            lineNumber: 236,
                                            columnNumber: 33
                                        }, this),
                                        activeAttempt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4 items-start group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 rounded-full bg-orange-500 border-4 border-orange-100 dark:border-orange-900 mt-1 relative z-10 shadow-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 -mt-0.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-bold text-sm text-foreground",
                                                                    children: "In Progress"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                                    lineNumber: 244,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-muted-foreground whitespace-nowrap",
                                                                    children: "Just now"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/QuizPlayer.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs font-medium text-muted-foreground mt-1",
                                                            children: [
                                                                "Attempt #",
                                                                completedAttempts.length + 1
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/QuizPlayer.tsx",
                                                            lineNumber: 247,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "link",
                                                            onClick: handleStart,
                                                            className: "p-0 h-auto text-xs text-orange-600 font-semibold mt-1 hover:text-orange-700",
                                                            children: "Resume"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/QuizPlayer.tsx",
                                                            lineNumber: 248,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/QuizPlayer.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/QuizPlayer.tsx",
                                            lineNumber: 240,
                                            columnNumber: 33
                                        }, this),
                                        completedAttempts.map((attempt, idx)=>{
                                            const result = Array.isArray(attempt.result) ? attempt.result[0] : attempt.result;
                                            const score = result?.score ?? result?.obtained_marks ?? 0;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-4 items-start group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors mt-1.5 relative z-10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/QuizPlayer.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 -mt-0.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "font-semibold text-sm text-foreground group-hover:text-primary transition-colors",
                                                                        children: [
                                                                            "Attempt #",
                                                                            completedAttempts.length - idx
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/QuizPlayer.tsx",
                                                                        lineNumber: 267,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-muted-foreground font-bold",
                                                                        children: [
                                                                            score,
                                                                            "/",
                                                                            exam.total_marks ?? '-'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/QuizPlayer.tsx",
                                                                        lineNumber: 270,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-center mt-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-muted-foreground",
                                                                        children: attempt.submitted_at ? new Date(attempt.submitted_at).toLocaleDateString() : '-'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/QuizPlayer.tsx",
                                                                        lineNumber: 276,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        variant: "ghost",
                                                                        className: "h-6 px-2 text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity",
                                                                        onClick: ()=>handleViewResult(attempt),
                                                                        children: "View Result"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/QuizPlayer.tsx",
                                                                        lineNumber: 279,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/QuizPlayer.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, attempt.id, true, {
                                                fileName: "[project]/components/QuizPlayer.tsx",
                                                lineNumber: 263,
                                                columnNumber: 37
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/QuizPlayer.tsx",
                                    lineNumber: 234,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/QuizPlayer.tsx",
                            lineNumber: 227,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/QuizPlayer.tsx",
                    lineNumber: 220,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/QuizPlayer.tsx",
                lineNumber: 219,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/QuizPlayer.tsx",
        lineNumber: 126,
        columnNumber: 9
    }, this);
}
_s(QuizPlayer, "mfU5eM74Pr23pHyj3XCa0Qg11tQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useExamAccess$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExamAccess"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = QuizPlayer;
var _c;
__turbopack_context__.k.register(_c, "QuizPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CustomPDFViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomPDFViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-in.js [app-client] (ecmascript) <export default as ZoomIn>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zoom-out.js [app-client] (ecmascript) <export default as ZoomOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CustomPDFViewer({ url, title, allowDownload = false }) {
    _s();
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🔒 Block Ctrl+P / Cmd+P and PrintScreen (best-effort)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomPDFViewer.useEffect": ()=>{
            const handleKeyDown = {
                "CustomPDFViewer.useEffect.handleKeyDown": (e)=>{
                    // Ctrl+P / Cmd+P
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
                        e.preventDefault();
                        e.stopPropagation();
                        alert("Printing is disabled for this protected document.");
                    }
                    // PrintScreen key (some browsers will still ignore this)
                    if (e.key === "PrintScreen") {
                        e.preventDefault();
                        e.stopPropagation();
                    // Optional: you could also briefly hide content here
                    }
                }
            }["CustomPDFViewer.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "CustomPDFViewer.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["CustomPDFViewer.useEffect"];
        }
    }["CustomPDFViewer.useEffect"], []);
    const handleDownload = ()=>{
        if (allowDownload && url) {
            window.open(url, "_blank");
        }
    };
    const zoomOut = ()=>setScale((prev)=>Math.max(prev - 0.1, 0.5));
    const zoomIn = ()=>setScale((prev)=>Math.min(prev + 0.2, 2));
    const toggleFullscreen = ()=>setIsFullscreen((prev)=>!prev);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "protected-pdf-viewer",
        className: "flex flex-col gap-4 w-full transition-all duration-300 " + (isFullscreen ? "fixed inset-0 z-[100] bg-slate-900/90 p-4 md:p-6" : ""),
        // 🔒 Block right-click on our app area
        onContextMenu: (e)=>e.preventDefault(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-base md:text-lg font-semibold tracking-tight",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                lineNumber: 70,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs md:text-sm text-muted-foreground",
                                children: [
                                    "Secured PDF viewer • Watermarked by",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: "math4code"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CustomPDFViewer.tsx",
                        lineNumber: 68,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-2 py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-7 w-7",
                                        onClick: zoomOut,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomOut$3e$__["ZoomOut"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/CustomPDFViewer.tsx",
                                            lineNumber: 89,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium w-10 text-center",
                                        children: [
                                            Math.round(scale * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-7 w-7",
                                        onClick: zoomIn,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zoom$2d$in$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ZoomIn$3e$__["ZoomIn"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/CustomPDFViewer.tsx",
                                            lineNumber: 100,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                        lineNumber: 94,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                lineNumber: 82,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "icon",
                                className: "h-8 w-8",
                                onClick: toggleFullscreen,
                                children: isFullscreen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/CustomPDFViewer.tsx",
                                    lineNumber: 112,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/CustomPDFViewer.tsx",
                                    lineNumber: 114,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                lineNumber: 105,
                                columnNumber: 21
                            }, this),
                            allowDownload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "secondary",
                                size: "sm",
                                className: "gap-1",
                                onClick: handleDownload,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                        lineNumber: 126,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "Download"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                        lineNumber: 127,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                lineNumber: 120,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CustomPDFViewer.tsx",
                        lineNumber: 80,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CustomPDFViewer.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/70 overflow-hidden " + (isFullscreen ? "flex-1" : "min-h-[450px] md:min-h-[550px]"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.10),_transparent_55%)]"
                    }, void 0, false, {
                        fileName: "[project]/components/CustomPDFViewer.tsx",
                        lineNumber: 141,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-full flex items-center justify-center overflow-auto p-4 md:p-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative shadow-2xl rounded-lg overflow-hidden bg-white origin-top",
                            style: {
                                transform: `scale(${scale})`,
                                transformOrigin: "top center",
                                minWidth: "70%"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    // toolbar=0 & navpanes=0 -> hides default PDF viewer UI (download/print buttons)
                                    src: `${url}#toolbar=0&navpanes=0&scrollbar=1`,
                                    className: "w-[800px] max-w-full h-[1000px] border-none",
                                    title: title ?? "PDF Document"
                                }, void 0, false, {
                                    fileName: "[project]/components/CustomPDFViewer.tsx",
                                    lineNumber: 154,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pointer-events-none absolute inset-0 flex items-center justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 opacity-[0.11]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.08),_transparent_60%)]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                                lineNumber: 164,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/CustomPDFViewer.tsx",
                                            lineNumber: 163,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex items-center justify-center overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-5xl md:text-7xl font-extrabold tracking-[0.3em] uppercase text-slate-900/5 dark:text-white/5 -rotate-30 select-none",
                                                children: "math4code"
                                            }, void 0, false, {
                                                fileName: "[project]/components/CustomPDFViewer.tsx",
                                                lineNumber: 169,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/CustomPDFViewer.tsx",
                                            lineNumber: 168,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-4 grid grid-cols-3 grid-rows-3 gap-6 opacity-30",
                                            children: Array.from({
                                                length: 9
                                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center rotate-[-18deg]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs md:text-sm font-semibold tracking-widest text-slate-500/70",
                                                        children: "math4code • do not share"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CustomPDFViewer.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 41
                                                    }, this)
                                                }, i, false, {
                                                    fileName: "[project]/components/CustomPDFViewer.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/CustomPDFViewer.tsx",
                                            lineNumber: 175,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CustomPDFViewer.tsx",
                                    lineNumber: 162,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CustomPDFViewer.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CustomPDFViewer.tsx",
                        lineNumber: 144,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 inset-x-0 h-8 bg-linear-to-t from-slate-950/40 to-transparent pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/components/CustomPDFViewer.tsx",
                        lineNumber: 192,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CustomPDFViewer.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CustomPDFViewer.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, this);
}
_s(CustomPDFViewer, "zcwKEf7DMYYuvhyOP9kok1PT+0A=");
_c = CustomPDFViewer;
var _c;
__turbopack_context__.k.register(_c, "CustomPDFViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-accent animate-pulse rounded-md', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/skeletons/LessonSkeletons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuizSkeleton",
    ()=>QuizSkeleton,
    "TextSkeleton",
    ()=>TextSkeleton,
    "VideoSkeleton",
    ()=>VideoSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
;
function VideoSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col min-h-0 bg-background animate-in fade-in duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full bg-black/5 relative shadow-sm z-20 shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-auto aspect-video max-h-[70vh] mx-auto bg-muted/50 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                        className: "w-16 h-16 rounded-full opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                        lineNumber: 10,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                    lineNumber: 9,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                lineNumber: 8,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-9 w-24 rounded-md"
                                }, void 0, false, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 17,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-9 w-24 rounded-md"
                                }, void 0, false, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 18,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-9 w-24 rounded-md"
                                }, void 0, false, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 19,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 16,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-2 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-6 w-48 mb-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                            lineNumber: 23,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-4 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                            lineNumber: 24,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-4 w-[90%]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                            lineNumber: 25,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-4 w-[95%]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                            lineNumber: 26,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "h-32 w-full rounded-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                        lineNumber: 29,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 28,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 21,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                    lineNumber: 15,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                lineNumber: 14,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
_c = VideoSkeleton;
function QuizSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-background animate-in fade-in duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-border overflow-hidden h-[600px] flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 bg-muted w-full"
                    }, void 0, false, {
                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                        lineNumber: 43,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 flex-1 flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "h-8 w-64 rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                        lineNumber: 46,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                        className: "h-10 w-32 rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                        lineNumber: 47,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                lineNumber: 45,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-6 h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                className: "h-24 w-full rounded-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                                lineNumber: 52,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-14 w-full rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                                        lineNumber: 54,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-14 w-full rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-14 w-full rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                                        className: "h-14 w-full rounded-lg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                                        lineNumber: 57,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                                lineNumber: 53,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                        lineNumber: 51,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-72 hidden lg:block space-y-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-full w-full rounded-xl"
                                        }, void 0, false, {
                                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                            lineNumber: 62,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                        lineNumber: 61,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                lineNumber: 49,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                        lineNumber: 44,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                lineNumber: 42,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
            lineNumber: 41,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
_c1 = QuizSkeleton;
function TextSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col min-h-0 bg-background animate-in fade-in duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-4xl mx-auto p-6 md:p-10 space-y-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 text-center border-b border-border pb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-6 w-24 rounded-full mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-12 w-3/4 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 78,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-4 w-32"
                                }, void 0, false, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 80,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-4 w-20"
                                }, void 0, false, {
                                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                    lineNumber: 81,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-full"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 85,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-[98%]"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 86,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-[95%]"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-[90%]"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-[92%]"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 89,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                                className: "h-64 w-full rounded-xl"
                            }, void 0, false, {
                                fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                                lineNumber: 91,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-full"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "h-4 w-[96%]"
                        }, void 0, false, {
                            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
            lineNumber: 75,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/skeletons/LessonSkeletons.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, this);
}
_c2 = TextSkeleton;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "VideoSkeleton");
__turbopack_context__.k.register(_c1, "QuizSkeleton");
__turbopack_context__.k.register(_c2, "TextSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/lesson/LessonContentClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LessonContentClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLessonData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLessonData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-client] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$VideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/VideoPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BunnyPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BunnyPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$QuizPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/QuizPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CustomPDFViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CustomPDFViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommunityButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CommunityButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/skeletons/LessonSkeletons.tsx [app-client] (ecmascript)");
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
function LessonContentClient({ lessonId, courseId, user, contentType// Optional: Use for showing specific skeleton
 }) {
    _s();
    // ⚡ GUARD: Prevent query with invalid lessonId
    // Show skeleton while parent component determines the correct lesson
    if (!lessonId) {
        if (contentType === 'video') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 29,
            columnNumber: 45
        }, this);
        if (contentType === 'quiz') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuizSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 30,
            columnNumber: 44
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 31,
            columnNumber: 16
        }, this);
    }
    // ⚡ CRITICAL: Use isPending AND check for data existence
    // isPending = true only on FIRST load (no data at all)
    // isLoading = true even when showing placeholder data
    // This ensures we show previous lesson instantly while fetching new one
    const { data: fullData, isPending, isError, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLessonData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessonData"])(lessonId, courseId);
    // Only show skeleton if BOTH conditions are true:
    // 1. isPending (no query has run yet)
    // 2. No data exists (not even placeholder/cached data)
    if (isPending && !fullData) {
        if (contentType === 'video') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 44,
            columnNumber: 45
        }, this);
        if (contentType === 'quiz') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuizSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 45,
            columnNumber: 44
        }, this);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 46,
            columnNumber: 16
        }, this);
    }
    if (isError || !fullData || fullData.error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-destructive/10 border border-destructive/20 p-8 rounded-2xl shadow-sm max-w-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-2 text-destructive",
                        children: "Failed to Load Content"
                    }, void 0, false, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 53,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mb-6",
                        children: "We couldn't load the lesson content. Please try again."
                    }, void 0, false, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                lineNumber: 52,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 51,
            columnNumber: 13
        }, this);
    }
    const { lesson, exam, attempts, questionsCount, author } = fullData;
    const isQuiz = lesson.content_type === "quiz";
    const isVideo = lesson.content_type === "video";
    const isPdf = lesson.content_type === "pdf";
    const isText = lesson.content_type === "text";
    // ⚡ INSTANT TRANSITIONS: Detect stale data from keepPreviousData
    // When navigating Lesson 1 → Lesson 2, fullData still contains Lesson 1 briefly
    // Show skeleton instead of wrong content for instant, correct display
    // Check for stale data for ALL lesson types
    if (lesson.id !== lessonId) {
        if (isQuiz) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuizSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 73,
            columnNumber: 28
        }, this);
        if (isVideo) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 74,
            columnNumber: 29
        }, this);
        // PDF and text both use TextSkeleton
        if (isPdf || isText) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 76,
            columnNumber: 37
        }, this);
    }
    if (isVideo) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col min-h-0 overflow-y-auto bg-background animate-in fade-in slide-in-from-right-4 duration-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full bg-black relative shadow-lg z-20 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-auto aspect-video max-h-[70vh] mx-auto bg-black flex items-center justify-center",
                        children: lesson.content_url || lesson.bunny_video_id || lesson.bunny_stream_id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: lesson.video_provider === 'bunny' && (lesson.bunny_video_id || lesson.bunny_stream_id) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BunnyPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BunnyPlayer"], {
                                videoId: lesson.bunny_video_id || lesson.bunny_stream_id || '',
                                libraryId: lesson.bunny_library_id || '',
                                videoType: lesson.video_type || 'vod',
                                videoStatus: lesson.video_status,
                                className: "w-full h-full"
                            }, void 0, false, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 88,
                                columnNumber: 37
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$VideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                url: lesson.content_url
                            }, void 0, false, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 96,
                                columnNumber: 37
                            }, this)
                        }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center text-white/50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"], {
                                    className: "h-16 w-16 mb-2 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 101,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm",
                                    children: "Video content unavailable"
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 102,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 100,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 84,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 bg-background",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 md:px-6 py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            defaultValue: "overview",
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                    className: "bg-muted/50 p-1 h-auto rounded-lg mb-6 inline-flex flex-wrap gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "overview",
                                            className: "px-4 py-1.5 text-sm rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm",
                                            children: "Overview"
                                        }, void 0, false, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 113,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "resources",
                                            className: "px-4 py-1.5 text-sm rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm",
                                            children: "Resources"
                                        }, void 0, false, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 114,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                            value: "discussion",
                                            className: "px-4 py-1.5 text-sm rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm",
                                            children: "Discussion"
                                        }, void 0, false, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 115,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 112,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "overview",
                                    className: "space-y-8 animate-in fade-in-50 duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "lg:col-span-2 space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "prose dark:prose-invert max-w-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold mb-2",
                                                                children: "About this lesson"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 45
                                                            }, this),
                                                            lesson.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground leading-relaxed",
                                                                children: lesson.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 49
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground italic",
                                                                children: "No description available."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                lineNumber: 128,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 41
                                                    }, this),
                                                    lesson.content_text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-8 pt-8 border-t border-border",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold mb-4",
                                                                children: "Lesson Transcript / Notes"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                lineNumber: 133,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                dangerouslySetInnerHTML: {
                                                                    __html: lesson.content_text
                                                                },
                                                                className: "rich-text-content prose dark:prose-invert max-w-none text-sm text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                lineNumber: 134,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                        lineNumber: 132,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 120,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-xl border border-border bg-card p-5 shadow-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                                                    className: "h-10 w-10 border border-border",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                                            src: author?.avatar_url || ""
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                            lineNumber: 145,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                                            children: "IN"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                            lineNumber: 146,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                    lineNumber: 144,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium leading-none",
                                                                            children: author?.full_name || 'Instructor'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                            lineNumber: 149,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-muted-foreground mt-1",
                                                                            children: "Instructor"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                            lineNumber: 150,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                    lineNumber: 148,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                            lineNumber: 143,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-muted-foreground space-y-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Duration"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                        lineNumber: 155,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            Math.round((lesson.duration || 300) / 60),
                                                                            " mins"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                        lineNumber: 156,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                                lineNumber: 154,
                                                                columnNumber: 49
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                    lineNumber: 142,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 141,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 119,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "resources",
                                    className: "animate-in fade-in-50 duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-12 border border-dashed border-border rounded-xl text-center bg-muted/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "h-12 w-12 mx-auto text-muted-foreground/50 mb-3"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 165,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-medium",
                                                children: "No Resources"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 166,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-muted-foreground",
                                                children: "There are no additional resources attached to this lesson."
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 167,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 164,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 163,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                    value: "discussion",
                                    className: "animate-in fade-in-50 duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "max-w-2xl mx-auto text-center py-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-emerald-100 dark:bg-emerald-900/20 p-4 rounded-full inline-flex mb-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                    className: "h-8 w-8 text-emerald-600 dark:text-emerald-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 172,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-bold mb-3",
                                                children: "Join the Conversation"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 175,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-muted-foreground mb-8",
                                                children: "Connect with fellow students, ask questions, and share insights about this lesson."
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 176,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommunityButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommunityButton"], {}, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 179,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 171,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 170,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 111,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 110,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 109,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 81,
            columnNumber: 13
        }, this);
    }
    if (isQuiz) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex-1 flex flex-col min-h-0 overflow-y-auto relative bg-slate-50 dark:bg-background animate-in fade-in slide-in-from-right-4 duration-500",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full",
                children: lesson.exam_id && exam ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-in fade-in zoom-in-95 duration-500 ease-out",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-border overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$QuizPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuizPlayer"], {
                            exam: exam,
                            attempts: attempts || [],
                            userId: user.id,
                            questionsCount: questionsCount || 0
                        }, exam.id, false, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 199,
                            columnNumber: 33
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 198,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 196,
                    columnNumber: 25
                }, this) : /* Empty State - Enhanced "Coming Soon" Design */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center min-h-[500px] animate-in fade-in zoom-in-95 duration-500",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-xl bg-white/95 dark:bg-card/95 backdrop-blur-sm p-12 rounded-3xl border border-slate-200/80 dark:border-border shadow-2xl shadow-slate-300/40 dark:shadow-none text-center relative overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
                            }, void 0, false, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 214,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative inline-flex items-center justify-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-linear-to-br from-orange-400 to-amber-500 rounded-2xl blur-2xl opacity-20 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 219,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-20 h-20 bg-linear-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "h-10 w-10 text-white",
                                            strokeWidth: 2.5
                                        }, void 0, false, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 222,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 221,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-1 -right-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "h-6 w-6 text-yellow-400 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 226,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 225,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 217,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl md:text-3xl font-bold mb-4 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent",
                                children: "Test in Preparation"
                            }, void 0, false, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 231,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md mx-auto",
                                children: [
                                    "Our team is crafting engaging questions to help you master this lesson.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "hidden sm:block"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 238,
                                        columnNumber: 37
                                    }, this),
                                    "Check back soon or continue exploring other lessons."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 236,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-center gap-3 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                className: "h-4 w-4 text-blue-600 dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 245,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-blue-700 dark:text-blue-400",
                                                children: "Comprehensive"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 246,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 244,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "h-4 w-4 text-purple-600 dark:text-purple-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 249,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-purple-700 dark:text-purple-400",
                                                children: "Interactive"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 250,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 248,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "h-4 w-4 text-green-600 dark:text-green-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 253,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-green-700 dark:text-green-400",
                                                children: "Validated"
                                            }, void 0, false, {
                                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                lineNumber: 254,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 252,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 243,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 bg-amber-500 rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 260,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-amber-700 dark:text-amber-400 tracking-wide",
                                        children: "IN PROGRESS"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 261,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 259,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 211,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 210,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                lineNumber: 193,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 191,
            columnNumber: 13
        }, this);
    }
    // STANDARD LAYOUT (Text, PDF)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 flex flex-col min-h-0 overflow-y-auto bg-background animate-in fade-in slide-in-from-right-4 duration-500",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-4xl mx-auto p-6 md:p-10 space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 text-center border-b border-border pb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                            variant: "secondary",
                            className: "bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                            children: [
                                lesson.content_type,
                                " Lesson"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 277,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold tracking-tight text-foreground",
                            children: lesson.title
                        }, void 0, false, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 280,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-4 text-sm text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                            className: "h-6 w-6 border border-border",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                    src: author?.avatar_url || ""
                                                }, void 0, false, {
                                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                    children: "IN"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 283,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-foreground",
                                            children: author?.full_name || "Instructor"
                                        }, void 0, false, {
                                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                            lineNumber: 287,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 282,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 289,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: lesson.duration ? `${Math.round(lesson.duration / 60)} min read` : "5 min read"
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 290,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 281,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 276,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        lesson.content_type === "pdf" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-border overflow-hidden bg-muted/20 shadow-sm",
                            children: lesson?.content_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-4/3 w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CustomPDFViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    url: lesson.content_url,
                                    title: lesson.title,
                                    allowDownload: lesson.is_downloadable ?? true
                                }, void 0, false, {
                                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                    lineNumber: 300,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 299,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center py-20 text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "h-16 w-16 opacity-20 mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 308,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-medium",
                                        children: "PDF Content Not Available"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 309,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 307,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 297,
                            columnNumber: 25
                        }, this),
                        lesson.content_type === "text" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "prose dark:prose-invert max-w-none prose-lg",
                            children: lesson.content_text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                        children: `
                                        .rich-text-content { font-size: 1.125rem; line-height: 1.8; }
                                        .rich-text-content h1, .rich-text-content h2 { color: var(--foreground); margin-top: 2em; margin-bottom: 1em; }
                                        .rich-text-content p { margin-bottom: 1.5em; color: var(--muted-foreground); }
                                        .rich-text-content strong { color: var(--foreground); font-weight: 700; }
                                        .rich-text-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.5em; }
                                        .rich-text-content blockquote { border-left: 4px solid var(--primary); padding-left: 1em; font-style: italic; color: var(--muted-foreground); }
                                        .rich-text-content code { background: var(--muted); padding: 0.2em 0.4em; rounded: 0.25em; font-size: 0.9em; }
                                    `
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 319,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        dangerouslySetInnerHTML: {
                                            __html: lesson.content_text
                                        },
                                        className: "rich-text-content"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 328,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center py-20 text-muted-foreground border border-dashed border-border rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "h-20 w-20 opacity-20 mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 332,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-medium",
                                        children: "Text Content Not Available"
                                    }, void 0, false, {
                                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                        lineNumber: 333,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/lesson/LessonContentClient.tsx",
                                lineNumber: 331,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/lesson/LessonContentClient.tsx",
                            lineNumber: 316,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 295,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-8 border-t border-border mt-12 flex flex-col items-center gap-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground italic text-center text-sm",
                        children: "End of lesson. Mark as complete to continue."
                    }, void 0, false, {
                        fileName: "[project]/components/lesson/LessonContentClient.tsx",
                        lineNumber: 342,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/lesson/LessonContentClient.tsx",
                    lineNumber: 341,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/lesson/LessonContentClient.tsx",
            lineNumber: 274,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/lesson/LessonContentClient.tsx",
        lineNumber: 273,
        columnNumber: 9
    }, this);
}
_s(LessonContentClient, "xeyjWKeOx+qsZjSlgt86jiuw/Dw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLessonData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessonData"]
    ];
});
_c = LessonContentClient;
var _c;
__turbopack_context__.k.register(_c, "LessonContentClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/actions/data:fc31af [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"605b2718d30b6957cb337670f642e33a6d21f15a27":"checkModuleCompletion"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
    "checkModuleCompletion",
    ()=>checkModuleCompletion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var checkModuleCompletion = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("605b2718d30b6957cb337670f642e33a6d21f15a27", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkModuleCompletion"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMlNBb0xzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/actions/data:d77658 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40eb846706f4430296b7c962019c2b1ef327ed506f":"checkFirstLessonReward"},"app/actions/rewardActions.ts",""] */ __turbopack_context__.s([
    "checkFirstLessonReward",
    ()=>checkFirstLessonReward
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var checkFirstLessonReward = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40eb846706f4430296b7c962019c2b1ef327ed506f", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "checkFirstLessonReward"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmV3YXJkQWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIjtcclxuXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAL2xpYi9zdXBhYmFzZS9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tIFwibmV4dC9jYWNoZVwiO1xyXG5cclxudHlwZSBBY3Rpb25UeXBlID0gJ2xvZ2luJyB8ICd2aWRlb193YXRjaCcgfCAnbGVzc29uX2NvbXBsZXRpb24nIHwgJ3F1aXpfY29tcGxldGlvbicgfCAnbW9kdWxlX2NvbXBsZXRpb24nIHwgJ3JlZmVycmFsJyB8ICdib251cycgfCAnbWlzc2lvbl9jb21wbGV0ZSc7XHJcblxyXG5jb25zdCBSRVdBUkRfUlVMRVMgPSB7XHJcbiAgICBsb2dpbjogeyBjb2luczogNSwgbGltaXQ6IDEgfSxcclxuICAgIHZpZGVvX3dhdGNoOiB7IGNvaW5zOiAxMCwgbGltaXQ6IDEwIH0sXHJcbiAgICBsZXNzb25fY29tcGxldGlvbjogeyBjb2luczogMTAsIGxpbWl0OiAyMCB9LCAvLyBHZW5lcmljIGxlc3NvbiBjb21wbGV0aW9uXHJcbiAgICBxdWl6X2NvbXBsZXRpb246IHsgY29pbnM6IDE1LCBsaW1pdDogMTAgfSxcclxuICAgIHF1aXpfYm9udXM6IHsgY29pbnM6IDEwLCBsaW1pdDogMTAgfSxcclxuICAgIG1vZHVsZV9jb21wbGV0aW9uOiB7IGNvaW5zOiA1MCwgbGltaXQ6IDUgfSxcclxuICAgIHJlZmVycmFsOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxMCB9LFxyXG4gICAgc3RyZWFrXzM6IHsgY29pbnM6IDEwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzc6IHsgY29pbnM6IDMwLCBsaW1pdDogMSB9LFxyXG4gICAgc3RyZWFrXzMwOiB7IGNvaW5zOiAxMDAsIGxpbWl0OiAxIH0sXHJcbiAgICBtaXNzaW9uX2NvbXBsZXRlOiB7IGNvaW5zOiAyMCwgbGltaXQ6IDMgfVxyXG59O1xyXG5cclxuY29uc3QgREFJTFlfQ09JTl9DQVAgPSAxMDA7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UmV3YXJkU3RhdHVzKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG4gICAgbGV0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgaWYgbm90IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogbmV3RGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwidXNlcl9yZXdhcmRzXCIpXHJcbiAgICAgICAgICAgIC5pbnNlcnQoeyB1c2VyX2lkOiB1c2VySWQgfSlcclxuICAgICAgICAgICAgLnNlbGVjdCgpXHJcbiAgICAgICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnMjM1MDUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHJldHJ5RGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAgICAgICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpbmdsZSgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHJldHJ5RGF0YTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjcmVhdGluZyB1c2VyX3Jld2FyZHMgaW4gZ2V0UmV3YXJkU3RhdHVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU3RyZWFrKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEp1c3QgZmV0Y2ggdGhlIGN1cnJlbnQgc3RhdHVzIHRvIGRpc3BsYXkgdG8gdGhlIHVzZXJcclxuICAgIC8vIFRoZSBhY3R1YWwgdXBkYXRlIGhhcHBlbnMgd2hlbiAnbG9naW4nIHJld2FyZCBpcyBhd2FyZGVkIGJlbG93XHJcbiAgICBjb25zdCB7IGRhdGE6IHJld2FyZFN0YXR1cyB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjdXJyZW50X3N0cmVhaywgbG9uZ2VzdF9zdHJlYWssIGxhc3RfYWN0aXZpdHlfZGF0ZVwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXJld2FyZFN0YXR1cykgcmV0dXJuIHsgc3RyZWFrOiAwLCBtZXNzYWdlOiBudWxsIH07XHJcblxyXG4gICAgLy8gV2UgY2FuIGluZmVyIGlmIHRoZXkgYXJlIG9uIGEgc3RyZWFrIG9yIGlmIGl0J3MgYnJva2VuIGJhc2VkIG9uIHRoZSBkYXRlLFxyXG4gICAgLy8gYnV0IHByaW1hcmlseSB3ZSBqdXN0IHdhbnQgdG8gc2hvdyB0aGUgY3VycmVudCB2YWx1ZS5cclxuICAgIC8vIFRoZSBEQiB0cmlnZ2VyIHVwZGF0ZXMgdGhpcyBpbW1lZGlhdGVseSB1cG9uIHRoZSAnbG9naW4nIHRyYW5zYWN0aW9uIGluc2VydGlvbi5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0cmVhazogcmV3YXJkU3RhdHVzLmN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgIG1lc3NhZ2U6IG51bGxcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhd2FyZENvaW5zKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBhY3Rpb246IEFjdGlvblR5cGUsXHJcbiAgICBlbnRpdHlJZD86IHN0cmluZyxcclxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXHJcbikge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4gICAgLy8gMS4gQ2hlY2sgc3RyaWN0IGR1cGxpY2F0ZSBydWxlcyAoQ2xpZW50LVNpZGUgUHJvdGVjdGlvbilcclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3BhbSB0aGUgREIgdHJpZ2dlciB3aXRoICdsb2dpbicgZXZlbnRzIGV2ZXJ5IHJlZnJlc2hcclxuICAgIGlmIChhY3Rpb24gPT09ICdsb2dpbicpIHtcclxuICAgICAgICBlbnRpdHlJZCA9IHRvZGF5OyAvLyBGb3JjZSBlbnRpdHlJZCB0byBiZSBkYXRlIGZvciBsb2dpblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRpdHlJZCkge1xyXG4gICAgICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgICAgICAuc2VsZWN0KFwiaWRcIilcclxuICAgICAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsIGFjdGlvbilcclxuICAgICAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIGVudGl0eUlkKVxyXG4gICAgICAgICAgICAuZ3RlKFwiY3JlYXRlZF9hdFwiLCBgJHt0b2RheX1UMDA6MDA6MDBgKVxyXG4gICAgICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJBbHJlYWR5IHJld2FyZGVkIGZvciB0aGlzIHRvZGF5IVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIERlZmluZSBBbW91bnQgKFdlIHN0aWxsIGRlZmluZSBpdCBoZXJlIHRvIHBhc3MgdG8gREIsIG9yIERCIGNvdWxkIGhhbmRsZSBkZWZhdWx0KVxyXG4gICAgbGV0IGNvaW5zID0gMDtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnbG9naW4nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sb2dpbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndmlkZW9fd2F0Y2gnOiBjb2lucyA9IFJFV0FSRF9SVUxFUy52aWRlb193YXRjaC5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnbGVzc29uX2NvbXBsZXRpb24nOiBjb2lucyA9IFJFV0FSRF9SVUxFUy5sZXNzb25fY29tcGxldGlvbi5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncXVpel9jb21wbGV0aW9uJzogY29pbnMgPSBSRVdBUkRfUlVMRVMucXVpel9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtb2R1bGVfY29tcGxldGlvbic6IGNvaW5zID0gUkVXQVJEX1JVTEVTLm1vZHVsZV9jb21wbGV0aW9uLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdyZWZlcnJhbCc6IGNvaW5zID0gUkVXQVJEX1JVTEVTLnJlZmVycmFsLmNvaW5zOyBicmVhaztcclxuICAgICAgICBjYXNlICdtaXNzaW9uX2NvbXBsZXRlJzogY29pbnMgPSBSRVdBUkRfUlVMRVMubWlzc2lvbl9jb21wbGV0ZS5jb2luczsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm9udXMnOiBjb2lucyA9IDEwOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBjb2lucyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSW5zZXJ0IFRyYW5zYWN0aW9uIChUaGUgREIgVHJpZ2dlciB0YWtlcyBpdCBmcm9tIGhlcmUhKVxyXG4gICAgLy8gSXQgd2lsbDogVXBkYXRlIENvaW5zLCBYUCwgTGV2ZWwsIGFuZCBTdHJlYWsgKGlmIGxvZ2luKVxyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuZnJvbShcInJld2FyZF90cmFuc2FjdGlvbnNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYW1vdW50OiBjb2lucyxcclxuICAgICAgICBhY3Rpb25fdHlwZTogYWN0aW9uLFxyXG4gICAgICAgIGVudGl0eV9pZDogZW50aXR5SWQsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IGBSZXdhcmQgZm9yICR7YWN0aW9ufWBcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXdhcmQgSW5zZXJ0IEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHByb2Nlc3MgcmV3YXJkLlwiIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4gUG9zdC1Qcm9jZXNzIChPcHRpb25hbCBOb3RpZmljYXRpb25zIG9yIFJldmFsaWRhdGlvbilcclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcblxyXG4gICAgaWYgKGFjdGlvbiA9PT0gJ2xvZ2luJykge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgbWVzc2FnZSBmb3IgbG9naW5cclxuICAgICAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBjb2lucywgbWVzc2FnZTogXCJEYWlseSBSZXdhcmQgQ2xhaW1lZCFcIiB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIGNvaW5zLCBtZXNzYWdlOiBg4q2QICske2NvaW5zfSBjb2lucyFgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMZWFkZXJib2FyZCh0eXBlOiAnd2Vla2x5JyB8ICdhbGxfdGltZScgPSAnYWxsX3RpbWUnLCBsaW1pdDogbnVtYmVyID0gMTApIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcblxyXG4gICAgY29uc3Qgc29ydENvbHVtbiA9IHR5cGUgPT09ICd3ZWVrbHknID8gJ3dlZWtseV94cCcgOiAndG90YWxfY29pbnMnOyAvLyBvciB4cFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInVzZXJfcmV3YXJkc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoYFxyXG4gICAgICAgICAgICB0b3RhbF9jb2lucyxcclxuICAgICAgICAgICAgeHAsXHJcbiAgICAgICAgICAgIHdlZWtseV94cCxcclxuICAgICAgICAgICAgbGV2ZWwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfc3RyZWFrLFxyXG4gICAgICAgICAgICB1c2VyX2lkLFxyXG4gICAgICAgICAgICBwcm9maWxlczp1c2VyX2lkIChcclxuICAgICAgICAgICAgICAgIGZ1bGxfbmFtZSxcclxuICAgICAgICAgICAgICAgIGF2YXRhcl91cmxcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIGApXHJcbiAgICAgICAgLm9yZGVyKHNvcnRDb2x1bW4sIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE/Lm1hcCgoZW50cnk6IGFueSkgPT4gKHtcclxuICAgICAgICAuLi5lbnRyeSxcclxuICAgICAgICBwcm9maWxlczogQXJyYXkuaXNBcnJheShlbnRyeS5wcm9maWxlcykgPyBlbnRyeS5wcm9maWxlc1swXSA6IGVudHJ5LnByb2ZpbGVzXHJcbiAgICB9KSkgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja01vZHVsZUNvbXBsZXRpb24odXNlcklkOiBzdHJpbmcsIG1vZHVsZUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGxlc3NvbnMgfSA9IGF3YWl0IHN1cGFiYXNlLmZyb20oXCJsZXNzb25zXCIpLnNlbGVjdChcImlkXCIpLmVxKFwibW9kdWxlX2lkXCIsIG1vZHVsZUlkKTtcclxuICAgIGlmICghbGVzc29ucyB8fCBsZXNzb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogY29tcGxldGVkIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwibGVzc29uX3Byb2dyZXNzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcImxlc3Nvbl9pZFwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImNvbXBsZXRlZFwiLCB0cnVlKVxyXG4gICAgICAgIC5pbihcImxlc3Nvbl9pZFwiLCBsZXNzb25zLm1hcChsID0+IGwuaWQpKTtcclxuXHJcbiAgICBjb25zdCBjb21wbGV0ZWRDb3VudCA9IGNvbXBsZXRlZD8ubGVuZ3RoIHx8IDA7XHJcbiAgICBpZiAoY29tcGxldGVkQ291bnQgPT09IGxlc3NvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGF3YXJkQ29pbnModXNlcklkLCAnbW9kdWxlX2NvbXBsZXRpb24nLCBtb2R1bGVJZCwgJ0NvbXBsZXRlZCBhIG1vZHVsZSEnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tGaXJzdExlc3NvblJld2FyZCh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuICAgIGNvbnN0IHsgY291bnQgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJsZXNzb25fcHJvZ3Jlc3NcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiLCB7IGNvdW50OiAnZXhhY3QnLCBoZWFkOiB0cnVlIH0pXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLmVxKFwiY29tcGxldGVkXCIsIHRydWUpO1xyXG5cclxuICAgIGlmIChjb3VudCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogcHJvZmlsZSB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgICAuZnJvbShcInByb2ZpbGVzXCIpXHJcbiAgICAgICAgLnNlbGVjdChcInJlZmVycmVkX2J5XCIpXHJcbiAgICAgICAgLmVxKFwiaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5zaW5nbGUoKTtcclxuXHJcbiAgICBpZiAoIXByb2ZpbGU/LnJlZmVycmVkX2J5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVmZXJyZXJJZCA9IHByb2ZpbGUucmVmZXJyZWRfYnk7XHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCIqXCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCByZWZlcnJlcklkKVxyXG4gICAgICAgIC5lcShcImFjdGlvbl90eXBlXCIsICdyZWZlcnJhbCcpXHJcbiAgICAgICAgLmVxKFwiZW50aXR5X2lkXCIsIHVzZXJJZClcclxuICAgICAgICAuc2luZ2xlKCk7XHJcblxyXG4gICAgaWYgKGV4aXN0aW5nKSByZXR1cm47XHJcblxyXG4gICAgLy8gQXdhcmQgcmVmZXJyZXJcclxuICAgIGF3YWl0IGF3YXJkQ29pbnMocmVmZXJyZXJJZCwgJ3JlZmVycmFsJywgdXNlcklkLCBgUmVmZXJyYWwgYm9udXMgZm9yIHVzZXIgJHt1c2VySWR9YCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgQmFkZ2UgZm9yIFJlZmVycmVyXHJcbiAgICBhd2FpdCBjaGVja0JhZGdlVW5sb2NrKHJlZmVycmVySWQsICdzb2NpYWxfYnV0dGVyZmx5Jyk7XHJcbn1cclxuXHJcbi8vIC0tLSBORVcgR0FNSUZJQ0FUSU9OIEZVTkNUSU9OUyAtLS1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU1pc3Npb25zKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIFVzZSBSUEMgZnVuY3Rpb24gdG8gZ2V0IG9yIGNyZWF0ZSBtaXNzaW9uc1xyXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UucnBjKCdnZXRfb3JfY3JlYXRlX2RhaWx5X21pc3Npb25zJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGFpbHkgbWlzc2lvbnM6XCIsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWlzc2lvblByb2dyZXNzKHVzZXJJZDogc3RyaW5nLCB0eXBlOiAnbG9naW4nIHwgJ3F1aXonIHwgJ3ZpZGVvJykge1xyXG4gICAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcclxuXHJcbiAgICAvLyBVc2UgUlBDIGZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXNzaW9uIHByb2dyZXNzXHJcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5ycGMoJ3VwZGF0ZV9taXNzaW9uX3Byb2dyZXNzJywge1xyXG4gICAgICAgIHBfdXNlcl9pZDogdXNlcklkLFxyXG4gICAgICAgIHBfbWlzc2lvbl90eXBlOiB0eXBlXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgbWlzc2lvbiBwcm9ncmVzczpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhbnkgbWlzc2lvbiB3YXMgY29tcGxldGVkXHJcbiAgICBjb25zdCBtaXNzaW9ucyA9IGRhdGEgfHwgW107XHJcbiAgICBjb25zdCBjb21wbGV0ZWRNaXNzaW9uID0gbWlzc2lvbnMuZmluZCgobTogYW55KSA9PlxyXG4gICAgICAgIG0uaWQgPT09IHR5cGUgJiYgbS5jb21wbGV0ZWQgJiYgbS5wcm9ncmVzcyA9PT0gbS5nb2FsXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChjb21wbGV0ZWRNaXNzaW9uKSB7XHJcbiAgICAgICAgLy8gQXdhcmQgbWlzc2lvbiBib251c1xyXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgYXdhaXQgYXdhcmRDb2lucyh1c2VySWQsICdtaXNzaW9uX2NvbXBsZXRlJywgYCR7dG9kYXl9LSR7dHlwZX1gLCBgTWlzc2lvbiBDb21wbGV0ZTogJHtjb21wbGV0ZWRNaXNzaW9uLnRpdGxlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldmFsaWRhdGVQYXRoKFwiL3N0dWRlbnRcIik7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tCYWRnZVVubG9jayh1c2VySWQ6IHN0cmluZywgYmFkZ2VJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaGFzIGJhZGdlXHJcbiAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwidXNlcl9iYWRnZXNcIilcclxuICAgICAgICAuc2VsZWN0KFwiKlwiKVxyXG4gICAgICAgIC5lcShcInVzZXJfaWRcIiwgdXNlcklkKVxyXG4gICAgICAgIC5lcShcImJhZGdlX2lkXCIsIGJhZGdlSWQpXHJcbiAgICAgICAgLnNpbmdsZSgpO1xyXG5cclxuICAgIGlmIChleGlzdGluZykgcmV0dXJuO1xyXG5cclxuICAgIC8vIExvZ2ljIHRvIHZlcmlmeSBpZiB0aGV5IGFjdHVhbGx5IGVhcm5lZCBpdCBjb3VsZCBnbyBoZXJlLCBcclxuICAgIC8vIGJ1dCB1c3VhbGx5IHdlIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGVuIHdlIEtOT1cgdGhleSBtZXQgdGhlIGNvbmRpdGlvbi5cclxuXHJcbiAgICBhd2FpdCBzdXBhYmFzZS5mcm9tKFwidXNlcl9iYWRnZXNcIikuaW5zZXJ0KHtcclxuICAgICAgICB1c2VyX2lkOiB1c2VySWQsXHJcbiAgICAgICAgYmFkZ2VfaWQ6IGJhZGdlSWRcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvdWxkIHJldHVybiBhIG5vdGlmaWNhdGlvbiBvYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXJCYWRnZXModXNlcklkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHN1cGFiYXNlXHJcbiAgICAgICAgLmZyb20oXCJ1c2VyX2JhZGdlc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJiYWRnZV9pZCwgZWFybmVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpO1xyXG4gICAgcmV0dXJuIGRhdGEgfHwgW107XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYWtIaXN0b3J5KHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBzdXBhYmFzZSA9IGF3YWl0IGNyZWF0ZUNsaWVudCgpO1xyXG5cclxuICAgIC8vIEZldGNoIGRhdGVzIGZyb20gcmV3YXJkX3RyYW5zYWN0aW9uc1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAgIC5mcm9tKFwicmV3YXJkX3RyYW5zYWN0aW9uc1wiKVxyXG4gICAgICAgIC5zZWxlY3QoXCJjcmVhdGVkX2F0XCIpXHJcbiAgICAgICAgLmVxKFwidXNlcl9pZFwiLCB1c2VySWQpXHJcbiAgICAgICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XHJcblxyXG4gICAgaWYgKCFkYXRhKSByZXR1cm4gW107XHJcblxyXG4gICAgLy8gRXh0cmFjdCB1bmlxdWUgZGF0ZXMgKFlZWVktTU0tREQpXHJcbiAgICBjb25zdCB1bmlxdWVEYXRlcyA9IG5ldyBTZXQoXHJcbiAgICAgICAgZGF0YS5tYXAoaXRlbSA9PiBpdGVtLmNyZWF0ZWRfYXQuc3BsaXQoJ1QnKVswXSlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odW5pcXVlRGF0ZXMpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiNFNBdU1zQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LessonTracker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LessonTracker",
    ()=>LessonTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useLessonProgress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/student/useLessonProgress.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$fc31af__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:fc31af [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$d77658__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/actions/data:d77658 [app-client] (ecmascript) <text/javascript>");
// Force HMR Update
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LessonContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function LessonTracker({ lessonId, courseId, moduleId, contentType = "text", children }) {
    _s();
    const { mutate: markCompleteMutation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useLessonProgress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarkLessonComplete"])();
    const [isCompleted, setIsCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleMarkComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LessonTracker.useCallback[handleMarkComplete]": ()=>{
            if (isCompleted) return;
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            supabase.auth.getUser().then({
                "LessonTracker.useCallback[handleMarkComplete]": async ({ data: { user } })=>{
                    if (user && lessonId) {
                        markCompleteMutation({
                            userId: user.id,
                            lessonId,
                            courseId
                        }, {
                            onSuccess: {
                                "LessonTracker.useCallback[handleMarkComplete]": async ()=>{
                                    setIsCompleted(true);
                                    if (moduleId) {
                                        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$fc31af__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkModuleCompletion"])(user.id, moduleId);
                                        if (res?.success && res.message) {
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res.message, {
                                                icon: "🪙"
                                            });
                                        }
                                    }
                                    // Check for first lesson reward (referral)
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$data$3a$d77658__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["checkFirstLessonReward"])(user.id);
                                }
                            }["LessonTracker.useCallback[handleMarkComplete]"]
                        });
                    }
                }
            }["LessonTracker.useCallback[handleMarkComplete]"]);
        }
    }["LessonTracker.useCallback[handleMarkComplete]"], [
        isCompleted,
        lessonId,
        courseId,
        moduleId,
        markCompleteMutation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonTracker.useEffect": ()=>{
            // Reset completion state when lesson changes
            setIsCompleted(false);
            // Strict Rules for Text/PDF: 5 minutes timer
            if (contentType === "text" || contentType === "pdf") {
                const timer = setTimeout({
                    "LessonTracker.useEffect.timer": ()=>{
                        handleMarkComplete();
                    }
                }["LessonTracker.useEffect.timer"], 5 * 60 * 1000) // 5 minutes
                ;
                return ({
                    "LessonTracker.useEffect": ()=>clearTimeout(timer)
                })["LessonTracker.useEffect"];
            }
        }
    }["LessonTracker.useEffect"], [
        lessonId,
        contentType,
        handleMarkComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LessonContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Provider, {
        value: {
            markComplete: handleMarkComplete,
            isCompleted
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/LessonTracker.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
_s(LessonTracker, "P7DRJCwy0pnXEIIGNdtQJR3TWAs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$student$2f$useLessonProgress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMarkLessonComplete"]
    ];
});
_c = LessonTracker;
var _c;
__turbopack_context__.k.register(_c, "LessonTracker");
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
"[project]/components/LessonAppContainer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HYBRID SPA PATTERN - Lesson App Container
 * 
 * This component handles ALL lesson navigation purely on the client.
 * - Uses React state for instant transitions (0ms)
 * - Updates URL with window.history.pushState (no server round-trip)
 * - Maintains browser history and shareable URLs
 * - Keeps sidebar and player mounted (no re-mounting)
 */ __turbopack_context__.s([
    "LessonAppContainer",
    ()=>LessonAppContainer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLessons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useLessons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$lesson$2f$LessonContentClient$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/lesson/LessonContentClient.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LessonTracker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/skeletons/LessonSkeletons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$lesson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/lesson.ts [app-client] (ecmascript)");
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
function LessonAppContainer({ courseId, user, isEnrolled, initialLessonId }) {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    // ⚡ CLIENT-SIDE STATE: The source of truth for current lesson
    const [currentLessonId, setCurrentLessonId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(searchParams.get('lessonId') || initialLessonId || null);
    // Get modules/lessons from cache (loaded by layout)
    const { data: modules, isPending: isLoadingModules } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLessons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessons"])(courseId);
    // Flatten lessons
    const allLessons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonAppContainer.useMemo[allLessons]": ()=>{
            if (!modules) return [];
            return modules.flatMap({
                "LessonAppContainer.useMemo[allLessons]": (m)=>m.lessons
            }["LessonAppContainer.useMemo[allLessons]"]);
        }
    }["LessonAppContainer.useMemo[allLessons]"], [
        modules
    ]);
    // Get current lesson object
    const currentLesson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LessonAppContainer.useMemo[currentLesson]": ()=>{
            if (!currentLessonId || !allLessons.length) return allLessons[0] || null;
            return allLessons.find({
                "LessonAppContainer.useMemo[currentLesson]": (l)=>l.id === currentLessonId
            }["LessonAppContainer.useMemo[currentLesson]"]) || allLessons[0];
        }
    }["LessonAppContainer.useMemo[currentLesson]"], [
        currentLessonId,
        allLessons
    ]);
    // ⚡ SHALLOW ROUTING: Update URL without server round-trip
    const navigateToLesson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LessonAppContainer.useCallback[navigateToLesson]": (lessonId)=>{
            // Update state (instant)
            setCurrentLessonId(lessonId);
            // Update URL (no server request)
            const url = new URL(window.location.href);
            url.searchParams.set('lessonId', lessonId);
            window.history.pushState({}, '', url.toString());
        }
    }["LessonAppContainer.useCallback[navigateToLesson]"], []);
    // Listen to browser back/forward buttons
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonAppContainer.useEffect": ()=>{
            const handlePopState = {
                "LessonAppContainer.useEffect.handlePopState": ()=>{
                    const params = new URLSearchParams(window.location.search);
                    const lessonId = params.get('lessonId');
                    if (lessonId) {
                        setCurrentLessonId(lessonId);
                    }
                }
            }["LessonAppContainer.useEffect.handlePopState"];
            window.addEventListener('popstate', handlePopState);
            return ({
                "LessonAppContainer.useEffect": ()=>window.removeEventListener('popstate', handlePopState)
            })["LessonAppContainer.useEffect"];
        }
    }["LessonAppContainer.useEffect"], []);
    // Sync with URL changes (from external navigation)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonAppContainer.useEffect": ()=>{
            const urlLessonId = searchParams.get('lessonId');
            if (urlLessonId && urlLessonId !== currentLessonId) {
                setCurrentLessonId(urlLessonId);
            }
        }
    }["LessonAppContainer.useEffect"], [
        searchParams,
        currentLessonId
    ]);
    // Expose navigation function globally for sidebar to use
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonAppContainer.useEffect": ()=>{
            window.__navigateToLesson = navigateToLesson;
            return ({
                "LessonAppContainer.useEffect": ()=>{
                    delete window.__navigateToLesson;
                }
            })["LessonAppContainer.useEffect"];
        }
    }["LessonAppContainer.useEffect"], [
        navigateToLesson
    ]);
    // ⚡ PREDICTIVE PREFETCHING: Prefetch next lesson for instant forward navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LessonAppContainer.useEffect": ()=>{
            if (!currentLesson || !allLessons.length) return;
            // Find next lesson
            const currentIndex = allLessons.findIndex({
                "LessonAppContainer.useEffect.currentIndex": (l)=>l.id === currentLesson.id
            }["LessonAppContainer.useEffect.currentIndex"]);
            const nextLesson = allLessons[currentIndex + 1];
            if (nextLesson) {
                // Check if already cached
                const cached = queryClient.getQueryData([
                    'lesson',
                    nextLesson.id,
                    courseId
                ]);
                if (cached) return; // Already prefetched
                // Prefetch next lesson in background
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                supabase.auth.getUser().then({
                    "LessonAppContainer.useEffect": ({ data: { user } })=>{
                        if (user) {
                            queryClient.prefetchQuery({
                                queryKey: [
                                    'lesson',
                                    nextLesson.id,
                                    courseId
                                ],
                                queryFn: {
                                    "LessonAppContainer.useEffect": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$lesson$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchLessonDetailedData"])(supabase, nextLesson.id, courseId, user.id)
                                }["LessonAppContainer.useEffect"],
                                staleTime: 1000 * 60 * 10
                            });
                        }
                    }
                }["LessonAppContainer.useEffect"]);
            }
        }
    }["LessonAppContainer.useEffect"], [
        currentLesson,
        allLessons,
        courseId,
        queryClient
    ]);
    // ⚡ LOADING STATE: Show skeleton while course structure loads
    // This prevents "Failed to Load Content" error when navigating without lessonId
    // Once loaded, navigation between lessons is instant (0ms) via keepPreviousData
    if (isLoadingModules && !currentLesson) {
        // Determine skeleton type - default to text if unknown
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/LessonAppContainer.tsx",
            lineNumber: 132,
            columnNumber: 16
        }, this);
    }
    if (!currentLesson) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-2",
                        children: "No Lessons Available"
                    }, void 0, false, {
                        fileName: "[project]/components/LessonAppContainer.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "This course has no lessons yet."
                    }, void 0, false, {
                        fileName: "[project]/components/LessonAppContainer.tsx",
                        lineNumber: 140,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LessonAppContainer.tsx",
                lineNumber: 138,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LessonAppContainer.tsx",
            lineNumber: 137,
            columnNumber: 13
        }, this);
    }
    // Access control
    if (!isEnrolled && !currentLesson.is_free_preview) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-full p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold mb-2",
                        children: "Content Locked"
                    }, void 0, false, {
                        fileName: "[project]/components/LessonAppContainer.tsx",
                        lineNumber: 151,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: "Enroll in this course to access this lesson."
                    }, void 0, false, {
                        fileName: "[project]/components/LessonAppContainer.tsx",
                        lineNumber: 152,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LessonAppContainer.tsx",
                lineNumber: 150,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LessonAppContainer.tsx",
            lineNumber: 149,
            columnNumber: 13
        }, this);
    }
    // Determine skeleton type
    let SkeletonComponent = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextSkeleton"];
    if (currentLesson.content_type === 'video') SkeletonComponent = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VideoSkeleton"];
    if (currentLesson.content_type === 'quiz') SkeletonComponent = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$skeletons$2f$LessonSkeletons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuizSkeleton"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LessonTracker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LessonTracker"], {
            lessonId: currentLesson.id,
            courseId: courseId,
            moduleId: currentLesson.module_id,
            contentType: currentLesson.content_type,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$lesson$2f$LessonContentClient$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                lessonId: currentLesson.id,
                courseId: courseId,
                user: user,
                contentType: currentLesson.content_type
            }, void 0, false, {
                fileName: "[project]/components/LessonAppContainer.tsx",
                lineNumber: 173,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LessonAppContainer.tsx",
            lineNumber: 166,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_s(LessonAppContainer, "1g0y41jQ/1sWKPXzx9gjd94TNh8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useLessons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLessons"]
    ];
});
_c = LessonAppContainer;
var _c;
__turbopack_context__.k.register(_c, "LessonAppContainer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_821eee27._.js.map