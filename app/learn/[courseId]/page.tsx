import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlayCircle, FileText, HelpCircle, AlignLeft, Users, ChevronLeft, PanelLeft, Clock, RefreshCw, CheckCircle, Zap, Target, Sparkles } from "lucide-react";
import { CoursePlayerClient } from "@/components/CoursePlayerClient";
import { LessonTracker } from "@/components/LessonTracker";
import VideoPlayer from "@/components/VideoPlayer";
import { BunnyPlayer } from "@/components/BunnyPlayer";
import { LiveClassCard } from "@/components/LiveClassCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonNavigation } from "@/components/LessonNavigation";
import ConceptCard from "@/components/ConceptCard";
import { QuizPlayer } from "@/components/QuizPlayer";
import CustomPDFViewer from "@/components/CustomPDFViewer";
import { CommunityModalProvider } from "@/context/CommunityModalContext";
import { CommunityModal } from "@/components/community/CommunityModal";
import { CommunityButton } from "@/components/CommunityButton";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

// React Query / Hydration
export const runtime = 'edge';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { Button } from "@/components/ui/button";

export default async function CoursePlayerPage({
    params,
    searchParams,
}: {
    params: Promise<{ courseId: string }>;
    searchParams: Promise<{ lessonId?: string }>;
}) {
    const { courseId } = await params;
    const { lessonId } = await searchParams;
    const supabase = await createClient(); // Server Client

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect(`/auth/login?next=/learn/${courseId}`);
    }

    // Check enrollment
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("status")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();

    const isEnrolled = !!enrollment;

    // Fetch user profile (Server Side for Auth Context)
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // --- PREFETCHING START ---
    const queryClient = getQueryClient();

    // 1. Fetch Course Details
    const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    if (courseError || !course) redirect("/courses"); // Handle 404

    // Seed Cache
    queryClient.setQueryData(['course', courseId], course);

    // 2. Fetch Modules & Lessons
    // 2. Fetch Modules & Lessons (Optimized RPC)
    // 2. Fetch Modules & Lessons (Optimized RPC)
    let { data: modulesData, error: modulesError } = await supabase
        .rpc('get_course_structure', { target_course_id: courseId });

    if (modulesError) {
        console.warn("RPC fetch failed, falling back to standard query:", modulesError);
        const { data: fallbackData } = await supabase
            .from("modules")
            .select(`
                *,
                lessons (*)
            `)
            .eq("course_id", courseId)
            .order("module_order", { ascending: true });

        // Manually sort nested lessons for fallback
        modulesData = fallbackData?.map((m: any) => ({
            ...m,
            lessons: (m.lessons || []).sort((a: any, b: any) => a.lesson_order - b.lesson_order)
        }));
    }

    // RPC returns presorted data, but we keep the map structure for compatibility
    const modulesWithSortedLessons = (modulesData || []).map((module: any) => ({
        ...module,
        lessons: module.lessons || []
    }));

    // Seed Cache
    queryClient.setQueryData(['course-structure', courseId], modulesWithSortedLessons);

    // --- PREFETCHING END ---

    // Fetch course author profile (needed for UI, not heavy)
    const { data: authorProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", course.user_id)
        .single();


    // Find current lesson for SERVER SIDE RENDERING of content
    let currentLesson: any = null;
    let nextLessonId = null;
    let prevLessonId = null;

    const allLessons = modulesWithSortedLessons.flatMap((m: any) => m.lessons);

    // Fetch lesson progress for smart navigation (Server Side)
    const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id)
        .eq("course_id", courseId);

    const completedLessonIds = new Set(progressData?.filter((p: any) => p.completed).map((p: any) => p.lesson_id) || []);

    if (lessonId) {
        const currentIndex = allLessons.findIndex((l: any) => l.id === lessonId);
        if (currentIndex !== -1) {
            currentLesson = allLessons[currentIndex];
            prevLessonId = currentIndex > 0 ? allLessons[currentIndex - 1].id : null;
            nextLessonId = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].id : null;
        }
    } else if (allLessons.length > 0) {
        // Smart Navigation: Find first incomplete lesson
        // IF NOT ENROLLED: Find first FREE lesson
        if (!isEnrolled) {
            const firstFree = allLessons.find((l: any) => l.is_free_preview);
            if (firstFree) {
                currentLesson = firstFree;
            } else {
                // No free lessons available, redirection logic handles below
                currentLesson = null;
            }
        } else {
            const firstIncomplete = allLessons.find((l: any) => !completedLessonIds.has(l.id));
            currentLesson = firstIncomplete || allLessons[0];
        }

        if (currentLesson) {
            const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
            prevLessonId = currentIndex > 0 ? allLessons[currentIndex - 1].id : null;
            nextLessonId = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].id : null;
        }
    }

    // ACCESS CONTROL CHECK (FINAL GUARD)
    if (!currentLesson) {
        // Could not determine a lesson (e.g. no free lessons and not enrolled, or course empty)
        redirect(`/courses/${courseId}`);
    }

    if (!isEnrolled && !currentLesson.is_free_preview) {
        // User trying to access a paid lesson without enrollment
        redirect(`/courses/${courseId}`);
    }


    const iconMap = {
        video: <PlayCircle className="h-6 w-6" />,
        pdf: <FileText className="h-6 w-6" />,
        text: <AlignLeft className="h-6 w-6" />,
    } as const;

    const key = (currentLesson?.content_type ?? "text") as keyof typeof iconMap;
    const icon = iconMap[key];

    const isQuiz = currentLesson?.content_type === "quiz";
    const isVideo = currentLesson?.content_type === "video";

    let examData = null;
    let examAttempts: any[] = [];
    let questionsCount = 0;

    if (isQuiz && (currentLesson as any).exam_id) {
        const examId = (currentLesson as any).exam_id;
        const { data: exam } = await supabase.from("exams").select("*").eq("id", examId).single();
        examData = exam;
        if (user) {
            const { data: attempts } = await supabase.from("exam_attempts").select("*, result:results(*)").eq("exam_id", examId).eq("user_id", user.id);
            examAttempts = attempts || [];
        }
        const { data: sections } = await supabase.from("sections").select("id, questions:questions(id)").eq("exam_id", examId);
        if (sections) {
            questionsCount = sections.reduce((acc: number, section: any) => acc + (section.questions?.length || 0), 0);
        }
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CommunityModalProvider>
                <CoursePlayerClient
                    courseId={courseId}
                    user={user}
                    profile={profile}
                    isEnrolled={isEnrolled}
                >
                    <LessonTracker
                        key={currentLesson?.id}
                        lessonId={currentLesson?.id || ""}
                        courseId={courseId}
                        moduleId={currentLesson?.module_id}
                        contentType={currentLesson?.content_type as any}
                    >



                        {isVideo ? (
                            // PREMIUM VIDEO LAYOUT
                            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-background">
                                {/* Video Section */}
                                <div className="w-full bg-black relative shadow-lg z-20 shrink-0">
                                    <div className="w-full h-auto aspect-video max-h-[70vh] mx-auto bg-black flex items-center justify-center">
                                        {currentLesson.content_url || currentLesson.bunny_video_id || currentLesson.bunny_stream_id ? (
                                            <>
                                                {currentLesson.video_provider === 'bunny' && (currentLesson.bunny_video_id || currentLesson.bunny_stream_id) ? (
                                                    <BunnyPlayer
                                                        videoId={currentLesson.bunny_video_id || currentLesson.bunny_stream_id || ''}
                                                        libraryId={currentLesson.bunny_library_id || ''}
                                                        videoType={currentLesson.video_type || 'vod'}
                                                        videoStatus={currentLesson.video_status}
                                                        className="w-full h-full"
                                                    />
                                                ) : (
                                                    <VideoPlayer url={currentLesson.content_url} />
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-white/50">
                                                <PlayCircle className="h-16 w-16 mb-2 opacity-50" />
                                                <span className="text-sm">Video content unavailable</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tabs & Details */}
                                <div className="flex-1 bg-background">
                                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
                                        <Tabs defaultValue="overview" className="w-full">
                                            <TabsList className="bg-muted/50 p-1 h-auto rounded-lg mb-6 inline-flex flex-wrap gap-1">
                                                <TabsTrigger value="overview" className="px-4 py-1.5 text-sm rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
                                                <TabsTrigger value="resources" className="px-4 py-1.5 text-sm rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Resources</TabsTrigger>
                                                <TabsTrigger value="discussion" className="px-4 py-1.5 text-sm rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Discussion</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-300">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                    <div className="lg:col-span-2 space-y-6">
                                                        <div className="prose dark:prose-invert max-w-none">
                                                            <h3 className="text-lg font-semibold mb-2">About this lesson</h3>
                                                            {currentLesson.description ? (
                                                                <p className="text-muted-foreground leading-relaxed">
                                                                    {currentLesson.description}
                                                                </p>
                                                            ) : (
                                                                <p className="text-muted-foreground italic">No description available.</p>
                                                            )}
                                                        </div>
                                                        {currentLesson.content_text && (
                                                            <div className="mt-8 pt-8 border-t border-border">
                                                                <h3 className="text-lg font-semibold mb-4">Lesson Transcript / Notes</h3>
                                                                <div
                                                                    dangerouslySetInnerHTML={{ __html: currentLesson.content_text }}
                                                                    className="rich-text-content prose dark:prose-invert max-w-none text-sm text-muted-foreground"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <Avatar className="h-10 w-10 border border-border">
                                                                    <AvatarImage src={authorProfile?.avatar_url || ""} />
                                                                    <AvatarFallback>IN</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="text-sm font-medium leading-none">{authorProfile?.full_name}</p>
                                                                    <p className="text-xs text-muted-foreground mt-1">Instructor</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-muted-foreground space-y-2">
                                                                <div className="flex justify-between">
                                                                    <span>Duration</span>
                                                                    <span>{Math.round((currentLesson.duration || 300) / 60)} mins</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="resources" className="animate-in fade-in-50 duration-300">
                                                <div className="p-12 border border-dashed border-border rounded-xl text-center bg-muted/20">
                                                    <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                                    <h3 className="text-lg font-medium">No Resources</h3>
                                                    <p className="text-muted-foreground">There are no additional resources attached to this lesson.</p>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="discussion" className="animate-in fade-in-50 duration-300">
                                                <div className="max-w-2xl mx-auto text-center py-12">
                                                    <div className="bg-emerald-100 dark:bg-emerald-900/20 p-4 rounded-full inline-flex mb-6">
                                                        <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                                                    </div>
                                                    <h3 className="text-xl font-bold mb-3">Join the Conversation</h3>
                                                    <p className="text-muted-foreground mb-8">
                                                        Connect with fellow students, ask questions, and share insights about this lesson.
                                                    </p>
                                                    <CommunityButton />
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        ) : isQuiz ? (
                            // PREMIUM QUIZ LAYOUT
                            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-background dark:via-background dark:to-background">

                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle at 2px 2px, #94a3b8 1px, transparent 1px)',
                                            backgroundSize: '32px 32px'
                                        }}
                                    />
                                    {/* Gradient Overlays */}
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl" />
                                </div>

                                {/* Main Content Area */}
                                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">

                                    {(currentLesson as any).exam_id && examData ? (
                                        <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
                                            {/* Quiz Player Container - Premium Card Design */}
                                            <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-border overflow-hidden">
                                                <QuizPlayer
                                                    exam={examData}
                                                    attempts={examAttempts}
                                                    userId={user.id}
                                                    questionsCount={questionsCount}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        /* Empty State - Enhanced "Coming Soon" Design */
                                        <div className="flex flex-col items-center justify-center min-h-[500px] animate-in fade-in zoom-in-95 duration-500">
                                            <div className="w-full max-w-xl bg-white/95 dark:bg-card/95 backdrop-blur-sm p-12 rounded-3xl border border-slate-200/80 dark:border-border shadow-2xl shadow-slate-300/40 dark:shadow-none text-center relative overflow-hidden">

                                                {/* Decorative Top Accent */}
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                                                {/* Icon Container - Multi-layer Design */}
                                                <div className="relative inline-flex items-center justify-center mb-8">
                                                    {/* Outer glow */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl blur-2xl opacity-20 animate-pulse" />
                                                    {/* Main icon background */}
                                                    <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                                        <Clock className="h-10 w-10 text-white" strokeWidth={2.5} />
                                                    </div>
                                                    {/* Sparkle accent */}
                                                    <div className="absolute -top-1 -right-1">
                                                        <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                                                    </div>
                                                </div>

                                                {/* Heading with Gradient */}
                                                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent">
                                                    Quiz in Preparation
                                                </h3>

                                                {/* Description */}
                                                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
                                                    Our team is crafting engaging questions to help you master this lesson.
                                                    <br className="hidden sm:block" />
                                                    Check back soon or continue exploring other lessons.
                                                </p>

                                                {/* Feature Highlights */}
                                                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full">
                                                        <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Comprehensive</span>
                                                    </div>
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-full">
                                                        <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                        <span className="text-sm font-medium text-purple-700 dark:text-purple-400">Interactive</span>
                                                    </div>
                                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full">
                                                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                        <span className="text-sm font-medium text-green-700 dark:text-green-400">Validated</span>
                                                    </div>
                                                </div>

                                                {/* Status Badge with Pulse */}
                                                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full mb-8">
                                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                                                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-400 tracking-wide">IN PROGRESS</span>
                                                </div>

                                                {/* Action Button */}
                                                <button
                                                    onClick={() => window.location.reload()}
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5"
                                                >
                                                    <RefreshCw className="h-4 w-4" />
                                                    Refresh Page
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // STANDARD LAYOUT (Text, PDF)
                            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-background">
                                <div className="w-full max-w-4xl mx-auto p-6 md:p-10 space-y-8">
                                    {/* Content Title / Metadata */}
                                    <div className="space-y-4 text-center border-b border-border pb-8">
                                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                                            {currentLesson.content_type} Lesson
                                        </Badge>
                                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{currentLesson.title}</h1>
                                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6 border border-border">
                                                    <AvatarImage src={authorProfile?.avatar_url || ""} />
                                                    <AvatarFallback>IN</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-foreground">{authorProfile?.full_name || "Instructor"}</span>
                                            </div>
                                            <span>•</span>
                                            <span>{currentLesson.duration ? `${Math.round(currentLesson.duration / 60)} min read` : "5 min read"}</span>
                                        </div>
                                    </div>

                                    {/* Main Content Area */}
                                    <div className="space-y-8">
                                        {currentLesson.content_type === "pdf" && (
                                            <div className="rounded-xl border border-border overflow-hidden bg-muted/20 shadow-sm">
                                                {currentLesson?.content_url ? (
                                                    <div className="aspect-[4/3] w-full">
                                                        {/* Aspect ratio for PDF viewer, or allow it to be tall */}
                                                        <CustomPDFViewer
                                                            url={currentLesson.content_url}
                                                            title={currentLesson.title}
                                                            allowDownload={currentLesson.is_downloadable ?? true}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                                        <FileText className="h-16 w-16 opacity-20 mb-4" />
                                                        <span className="text-lg font-medium">PDF Content Not Available</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {currentLesson.content_type === "text" && (
                                            <div className="prose dark:prose-invert max-w-none prose-lg">
                                                {currentLesson.content_text ? (
                                                    <>
                                                        <style>{`
                                                            .rich-text-content { font-size: 1.125rem; line-height: 1.8; }
                                                            .rich-text-content h1, .rich-text-content h2 { color: var(--foreground); margin-top: 2em; margin-bottom: 1em; }
                                                            .rich-text-content p { margin-bottom: 1.5em; color: var(--muted-foreground); }
                                                            .rich-text-content strong { color: var(--foreground); font-weight: 700; }
                                                            .rich-text-content ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.5em; }
                                                            .rich-text-content blockquote { border-left: 4px solid var(--primary); padding-left: 1em; font-style: italic; color: var(--muted-foreground); }
                                                            .rich-text-content code { background: var(--muted); padding: 0.2em 0.4em; rounded: 0.25em; font-size: 0.9em; }
                                                        `}</style>
                                                        <div dangerouslySetInnerHTML={{ __html: currentLesson.content_text }} className="rich-text-content" />
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
                                                        <FileText className="h-20 w-20 opacity-20 mb-4" />
                                                        <span className="text-lg font-medium">Text Content Not Available</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer Section */}
                                    <div className="pt-8 border-t border-border mt-12 flex flex-col items-center gap-4">
                                        <p className="text-muted-foreground italic text-center text-sm">
                                            End of lesson. Mark as complete to continue.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </LessonTracker>
                </CoursePlayerClient>
                <CommunityModal />
            </CommunityModalProvider>
        </HydrationBoundary>
    );
}
