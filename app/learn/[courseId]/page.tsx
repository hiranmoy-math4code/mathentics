import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PlayCircle, FileText, HelpCircle, AlignLeft, Users } from "lucide-react";
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

// React Query / Hydration
// export const runtime = 'edge';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";

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
                            <div className="flex-1 flex flex-col h-full bg-background overflow-y-auto">
                                {/* ... (Video Layout Code remains same) ... */}
                                <div className="w-full bg-black relative shadow-xl z-20">
                                    <div className="w-full h-auto aspect-video max-h-[85vh] mx-auto bg-black flex items-center justify-center">
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

                                {/* 2. Action Bar & Navigation */}
                                <div className="border-b border-border bg-card shadow-sm z-10 sticky top-0">
                                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h1 className="text-lg md:text-xl font-bold text-foreground line-clamp-1" title={currentLesson.title}>
                                                {currentLesson.title}
                                            </h1>
                                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                                <span>Lesson {currentLesson.lesson_order}</span>
                                                <span>•</span>
                                                <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal border-border">
                                                    {course.level || "Course Lvl"}
                                                </Badge>
                                            </p>
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <LessonNavigation
                                                courseId={courseId}
                                                currentLessonId={currentLesson.id}
                                                prevLessonId={prevLessonId}
                                                nextLessonId={nextLessonId}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Tabs & Details */}
                                <div className="flex-1 bg-background">
                                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                                        <Tabs defaultValue="overview" className="w-full">
                                            <TabsList className="bg-muted/50 p-1 h-auto rounded-lg mb-8 inline-flex flex-wrap gap-1">
                                                <TabsTrigger value="overview" className="px-6 py-2 rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
                                                <TabsTrigger value="resources" className="px-6 py-2 rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Resources</TabsTrigger>
                                                <TabsTrigger value="discussion" className="px-6 py-2 rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Discussion</TabsTrigger>
                                                <TabsTrigger value="notes" className="px-6 py-2 rounded-md font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">Notes</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-300">
                                                {/* Description / Key Concepts */}
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
                                                                    <span>Last Updated</span>
                                                                    <span>{new Date(currentLesson.updated_at).toLocaleDateString()}</span>
                                                                </div>
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

                                            <TabsContent value="notes" className="animate-in fade-in-50 duration-300">
                                                <div className="p-12 border border-dashed border-border rounded-xl text-center bg-muted/20">
                                                    <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                                    <h3 className="text-lg font-medium">Personal Notes</h3>
                                                    <p className="text-muted-foreground mb-4">You haven't taken any notes for this lesson yet.</p>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        ) : isQuiz ? (
                            // PREMIUM QUIZ LAYOUT
                            <div className="flex-1 flex flex-col h-full bg-muted/30 relative">
                                {/* Header / Nav */}
                                <div className="border-b border-border bg-background shadow-sm z-10 sticky top-0">
                                    <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                                <HelpCircle className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h1 className="text-lg font-bold text-foreground line-clamp-1">{currentLesson.title}</h1>
                                                <p className="text-xs text-muted-foreground">Exam Mode</p>
                                            </div>
                                        </div>
                                        <div className="w-auto">
                                            <LessonNavigation
                                                courseId={courseId}
                                                currentLessonId={currentLesson.id}
                                                prevLessonId={prevLessonId}
                                                nextLessonId={nextLessonId}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Quiz Area */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
                                        {(currentLesson as any).exam_id && examData ? (
                                            <div className="animate-in zoom-in-95 duration-300">
                                                <QuizPlayer
                                                    exam={examData}
                                                    attempts={examAttempts}
                                                    userId={user.id}
                                                    questionsCount={questionsCount}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-border shadow-sm">
                                                <div className="bg-muted p-4 rounded-full mb-4">
                                                    <HelpCircle className="h-8 w-8 text-muted-foreground" />
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2">Quiz Not Available</h3>
                                                <p className="text-muted-foreground max-w-md mx-auto">
                                                    This quiz is currently being prepared. Check back later!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // STANDARD LAYOUT (Text, PDF)
                            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col items-center bg-background">
                                <div className="w-full max-w-4xl space-y-8">
                                    <div className="border-b border-border pb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 rounded-full px-3 border-none font-medium">
                                                {course.level || "Beginner"}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                                                {currentLesson.duration ? `${Math.round(currentLesson.duration / 60)} min read` : "5 min read"}
                                            </span>
                                        </div>
                                        <h1 className="text-4xl font-bold tracking-tight mb-6 text-foreground">{currentLesson.title}</h1>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border border-border">
                                                <AvatarImage src={authorProfile?.avatar_url || "https://github.com/shadcn.png"} />
                                                <AvatarFallback>{authorProfile?.full_name?.substring(0, 2).toUpperCase() || "AU"}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-foreground">
                                                By {authorProfile?.full_name || "Unknown Instructor"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        {currentLesson.content_type === "pdf" && (
                                            <div className="space-y-4">
                                                {currentLesson?.content_url ? (
                                                    <CustomPDFViewer
                                                        url={currentLesson.content_url}
                                                        title={currentLesson.title}
                                                        allowDownload={currentLesson.is_downloadable ?? true}
                                                    />
                                                ) : (
                                                    <div className="aspect-video flex flex-col items-center justify-center bg-card rounded-xl border border-border text-muted-foreground">
                                                        <FileText className="h-20 w-20 opacity-20 mb-4" />
                                                        <span className="text-lg font-medium">PDF Content Not Available</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {currentLesson.content_type === "text" && (
                                            <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed">
                                                {currentLesson.content_text ? (
                                                    <>
                                                        <style>{`
                                                            .rich-text-content ul { list-style-type: disc !important; padding-left: 1.5em !important; margin-top: 0.5em !important; margin-bottom: 0.5em !important; }
                                                            .rich-text-content ol { list-style-type: decimal !important; padding-left: 1.5em !important; margin-top: 0.5em !important; margin-bottom: 0.5em !important; }
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

                                    <ConceptCard title={currentLesson?.title} contentType={currentLesson?.content_type} icon={icon}>
                                        {currentLesson?.description}
                                    </ConceptCard>
                                    <LessonNavigation
                                        courseId={courseId}
                                        currentLessonId={currentLesson.id}
                                        prevLessonId={prevLessonId}
                                        nextLessonId={nextLessonId}
                                    />
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
