'use client';

import { useLessonData } from "@/hooks/useLessonData";
import { PlayCircle, FileText, Users, Clock, Target, Zap, CheckCircle, Sparkles, RefreshCw } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { BunnyPlayer } from "@/components/BunnyPlayer";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizPlayer } from "@/components/QuizPlayer";
import CustomPDFViewer from "@/components/CustomPDFViewer";
import { CommunityButton } from "@/components/CommunityButton";
import { QuizSkeleton, VideoSkeleton, TextSkeleton } from "@/components/skeletons/LessonSkeletons";

export default function LessonContentClient({
    lessonId,
    courseId,
    user,
    contentType // Optional: Use for showing specific skeleton
}: {
    lessonId: string;
    courseId: string;
    user: any;
    contentType?: 'video' | 'quiz' | 'text' | 'pdf';
}) {
    // ⚡ GUARD: Prevent query with invalid lessonId
    // Show skeleton while parent component determines the correct lesson
    if (!lessonId) {
        if (contentType === 'video') return <VideoSkeleton />;
        if (contentType === 'quiz') return <QuizSkeleton />;
        return <TextSkeleton />;
    }

    // ⚡ CRITICAL: Use isPending AND check for data existence
    // isPending = true only on FIRST load (no data at all)
    // isLoading = true even when showing placeholder data
    // This ensures we show previous lesson instantly while fetching new one
    const { data: fullData, isPending, isError, isFetching } = useLessonData(lessonId, courseId);

    // Only show skeleton if BOTH conditions are true:
    // 1. isPending (no query has run yet)
    // 2. No data exists (not even placeholder/cached data)
    if (isPending && !fullData) {
        if (contentType === 'video') return <VideoSkeleton />;
        if (contentType === 'quiz') return <QuizSkeleton />;
        return <TextSkeleton />;
    }

    if (isError || !fullData || fullData.error) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in">
                <div className="bg-destructive/10 border border-destructive/20 p-8 rounded-2xl shadow-sm max-w-md">
                    <h3 className="text-xl font-bold mb-2 text-destructive">Failed to Load Content</h3>
                    <p className="text-muted-foreground mb-6">We couldn't load the lesson content. Please try again.</p>
                </div>
            </div>
        );
    }

    const { lesson, exam, attempts, questionsCount, author } = fullData;
    const isQuiz = lesson.content_type === "quiz";
    const isVideo = lesson.content_type === "video";

    // ⚡ INSTANT EXAM TRANSITIONS: Detect stale quiz data from keepPreviousData
    // When navigating from Exam 1 → Exam 2, fullData still contains Exam 1 briefly
    // Show skeleton instead of wrong exam for instant, correct state display
    if (isQuiz && lesson.id !== lessonId) {
        return <QuizSkeleton />;
    }

    if (isVideo) {
        return (
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-background animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Video Section */}
                <div className="w-full bg-black relative shadow-lg z-20 shrink-0">
                    <div className="w-full h-auto aspect-video max-h-[70vh] mx-auto bg-black flex items-center justify-center">
                        {lesson.content_url || lesson.bunny_video_id || lesson.bunny_stream_id ? (
                            <>
                                {lesson.video_provider === 'bunny' && (lesson.bunny_video_id || lesson.bunny_stream_id) ? (
                                    <BunnyPlayer
                                        videoId={lesson.bunny_video_id || lesson.bunny_stream_id || ''}
                                        libraryId={lesson.bunny_library_id || ''}
                                        videoType={lesson.video_type || 'vod'}
                                        videoStatus={lesson.video_status}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <VideoPlayer url={lesson.content_url} />
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
                                            {lesson.description ? (
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {lesson.description}
                                                </p>
                                            ) : (
                                                <p className="text-muted-foreground italic">No description available.</p>
                                            )}
                                        </div>
                                        {lesson.content_text && (
                                            <div className="mt-8 pt-8 border-t border-border">
                                                <h3 className="text-lg font-semibold mb-4">Lesson Transcript / Notes</h3>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: lesson.content_text }}
                                                    className="rich-text-content prose dark:prose-invert max-w-none text-sm text-muted-foreground"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Avatar className="h-10 w-10 border border-border">
                                                    <AvatarImage src={author?.avatar_url || ""} />
                                                    <AvatarFallback>IN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{author?.full_name || 'Instructor'}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">Instructor</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-muted-foreground space-y-2">
                                                <div className="flex justify-between">
                                                    <span>Duration</span>
                                                    <span>{Math.round((lesson.duration || 300) / 60)} mins</span>
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
        );
    }

    if (isQuiz) {
        return (
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto relative bg-slate-50 dark:bg-background animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Main Content Area */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">

                    {lesson.exam_id && exam ? (
                        <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
                            {/* Quiz Player Container - Premium Card Design */}
                            <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-border overflow-hidden">
                                <QuizPlayer
                                    key={exam.id}
                                    exam={exam}
                                    attempts={attempts || []}
                                    userId={user.id}
                                    questionsCount={questionsCount || 0}
                                />
                            </div>
                        </div>
                    ) : (
                        /* Empty State - Enhanced "Coming Soon" Design */
                        <div className="flex flex-col items-center justify-center min-h-[500px] animate-in fade-in zoom-in-95 duration-500">
                            <div className="w-full max-w-xl bg-white/95 dark:bg-card/95 backdrop-blur-sm p-12 rounded-3xl border border-slate-200/80 dark:border-border shadow-2xl shadow-slate-300/40 dark:shadow-none text-center relative overflow-hidden">

                                {/* Decorative Top Accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

                                {/* Icon Container - Multi-layer Design */}
                                <div className="relative inline-flex items-center justify-center mb-8">
                                    {/* Outer glow */}
                                    <div className="absolute inset-0 bg-linear-to-br from-orange-400 to-amber-500 rounded-2xl blur-2xl opacity-20 animate-pulse" />
                                    {/* Main icon background */}
                                    <div className="relative w-20 h-20 bg-linear-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                                        <Clock className="h-10 w-10 text-white" strokeWidth={2.5} />
                                    </div>
                                    {/* Sparkle accent */}
                                    <div className="absolute -top-1 -right-1">
                                        <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                                    </div>
                                </div>

                                {/* Heading with Gradient */}
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent">
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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // STANDARD LAYOUT (Text, PDF)
    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-background animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-full max-w-4xl mx-auto p-6 md:p-10 space-y-8">
                {/* Content Title / Metadata */}
                <div className="space-y-4 text-center border-b border-border pb-8">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                        {lesson.content_type} Lesson
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{lesson.title}</h1>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-border">
                                <AvatarImage src={author?.avatar_url || ""} />
                                <AvatarFallback>IN</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{author?.full_name || "Instructor"}</span>
                        </div>
                        <span>•</span>
                        <span>{lesson.duration ? `${Math.round(lesson.duration / 60)} min read` : "5 min read"}</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-8">
                    {lesson.content_type === "pdf" && (
                        <div className="rounded-xl border border-border overflow-hidden bg-muted/20 shadow-sm">
                            {lesson?.content_url ? (
                                <div className="aspect-4/3 w-full">
                                    <CustomPDFViewer
                                        url={lesson.content_url}
                                        title={lesson.title}
                                        allowDownload={lesson.is_downloadable ?? true}
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

                    {lesson.content_type === "text" && (
                        <div className="prose dark:prose-invert max-w-none prose-lg">
                            {lesson.content_text ? (
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
                                    <div dangerouslySetInnerHTML={{ __html: lesson.content_text }} className="rich-text-content" />
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
    );
}
