"use client"

import { useState, useEffect, useMemo, startTransition } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlayCircle, FileText, ChevronLeft, ChevronRight, HelpCircle, Menu, X, PanelLeftClose, PanelLeft, CheckCircle, BookOpen, Video, Share2, User, Book, Users, Lock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { useLessonProgress, useMarkLessonComplete } from "@/hooks/student/useLessonProgress"
import { ModeToggle } from "@/components/mode-toggle"
import { useCommunityModal } from "@/context/CommunityModalContext"
import { useCourse } from "@/hooks/useCourse"
import { useLessons } from "@/hooks/useLessons"
import { LessonNavigation } from "@/components/LessonNavigation"
import { CommunityButton } from "@/components/CommunityButton"
import { ClientSideLink } from "@/components/ClientSideLink"
import { useLessonAccess } from "@/hooks/student/useLessonAccess"
import { toast } from "sonner"
import { useLessonPrefetch } from "@/hooks/useLessonPrefetch"
import { useCurrentUser } from "@/hooks/student/useCurrentUser"

interface CoursePlayerClientProps {
    courseId: string
    user: any
    profile: any
    isEnrolled: boolean
    children: React.ReactNode
}

export function CoursePlayerClient({
    courseId,
    user,
    profile,
    isEnrolled,
    children
}: CoursePlayerClientProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false)
    const [userId, setUserId] = useState<string | null>(user?.id || null)
    const { openCommunity } = useCommunityModal()

    // LAYER 2 OPTIMIZATION: Use Hooks with Cached Data
    const { data: course, isLoading: courseLoading, error: courseError } = useCourse(courseId);
    const { data: modules, isLoading: modulesLoading, error: modulesError } = useLessons(courseId);

    const searchParams = useSearchParams();
    const lessonIdParam = searchParams.get("lessonId");

    // Flatten lessons logic moved here
    const allLessons = useMemo(() => {
        if (!modules) return [];
        return modules.flatMap((m: any) => m.lessons); // Lessons are sorted in the hook
    }, [modules]);

    // Determine Current Lesson
    const currentLesson = useMemo(() => {
        if (!allLessons.length) return null;
        if (lessonIdParam) {
            return allLessons.find((l: any) => l.id === lessonIdParam) || null;
        }
        return allLessons[0]; // Default to first lesson if not specified
    }, [allLessons, lessonIdParam]);

    // Calculate Prev/Next Lesson IDs for Navigation
    const { prevLessonId, nextLessonId } = useMemo(() => {
        if (!currentLesson || !allLessons.length) return { prevLessonId: null, nextLessonId: null };
        const currentIndex = allLessons.findIndex((l: any) => l.id === currentLesson.id);
        const prev = currentIndex > 0 ? allLessons[currentIndex - 1].id : null;
        const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].id : null;
        return { prevLessonId: prev, nextLessonId: next };
    }, [currentLesson, allLessons]);

    // ⚡ AUTO-PREFETCH: Load next lesson in background
    const { prefetchLesson } = useLessonPrefetch();

    useEffect(() => {
        if (nextLessonId) {
            prefetchLesson(nextLessonId, courseId);
        }
    }, [nextLessonId, courseId, prefetchLesson]);

    const isQuiz = currentLesson?.content_type === "quiz";

    // Use centralized user hook
    const { data: userProfile } = useCurrentUser()
    // Prioritize prop user, then hook user
    const finalUserId = userId || userProfile?.id || null

    // Sync state if needed (mainly for initial prop hydration)
    useEffect(() => {
        if (!userId && userProfile?.id) {
            setUserId(userProfile.id)
        }
    }, [userId, userProfile?.id])

    // Fetch lesson progress
    const { data: lessonProgress } = useLessonProgress(userId || undefined, courseId)

    // ⚡ ZERO DB QUERIES: Client-side sequential access check using cached data
    const lessonAccessMap = useLessonAccess(allLessons, lessonProgress)

    // Calculate progress from lesson progress data
    const progressPercentage = useMemo(() => {
        if (!lessonProgress || !allLessons.length) return 0
        const completedCount = lessonProgress.filter(p => p.completed).length
        return Math.round((completedCount / allLessons.length) * 100)
    }, [lessonProgress, allLessons])

    // Check if lesson is completed
    const isLessonCompleted = (lessonId: string) => {
        return lessonProgress?.some(p => p.lesson_id === lessonId && p.completed) || false
    }

    // Mutation to mark lesson complete
    const { mutate: markComplete } = useMarkLessonComplete()

    // Show loading state
    if (courseLoading || modulesLoading) {
        return (
            <div className="flex h-screen bg-background">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">Loading course...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (courseError || modulesError) {
        return (
            <div className="flex h-screen bg-background">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <p className="text-destructive">Failed to load course</p>
                        <p className="text-sm text-muted-foreground">
                            {courseError?.message || modulesError?.message || 'Unknown error'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Render loading or empty states if data isn't hydrated yet
    if (!course || !modules) {
        return (
            <div className="flex h-screen bg-background">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">Loading course...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
            {/* Desktop Sidebar */}
            <motion.div
                initial={false}
                animate={{ width: desktopSidebarCollapsed ? 0 : 320 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-r border-border bg-card hidden md:flex flex-col overflow-hidden z-20"
            >
                <div className="p-6 border-b border-border bg-card">
                    <div className="flex items-center gap-3 mb-6">
                        <Link href="/student/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ChevronLeft className="h-5 w-5" />
                        </Link>
                        <h2 className="font-bold truncate text-lg text-foreground tracking-tight">{course.title}</h2>
                    </div>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-muted-foreground">
                            <span>Progress</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{progressPercentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-emerald-100 dark:bg-emerald-950/30 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.5 }}
                                className="h-full rounded-full bg-emerald-500"
                            />
                        </div>
                    </div>
                </div>
                <ScrollArea className="flex-1 min-h-0 bg-muted/5">
                    <TooltipProvider delayDuration={0}>
                        <Accordion type="single" collapsible className="w-full space-y-2 p-2" defaultValue={modules[0]?.id}>
                            {modules.map((module: any) => (
                                <AccordionItem key={module.id} value={module.id} className="border-none">
                                    <AccordionTrigger className="px-3 hover:no-underline hover:bg-muted/50 py-3 rounded-lg text-foreground/80 data-[state=open]:text-foreground transition-all">
                                        <div className="flex items-center justify-between w-full pr-2">
                                            <div className="text-left text-sm font-semibold tracking-tight line-clamp-1 mr-2">
                                                {module.title}
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-1 pb-0">
                                        <div className="space-y-1">
                                            {module.lessons.map((lesson: any) => {
                                                const isActive = currentLesson?.id === lesson.id;
                                                const isCompleted = isLessonCompleted(lesson.id);
                                                const isEnrollmentLocked = !isEnrolled && !lesson.is_free_preview;
                                                const accessInfo = lessonAccessMap.get(lesson.id);
                                                const isSequentialLocked = accessInfo?.isSequentialLocked || false;
                                                const shouldLock = isEnrollmentLocked || isSequentialLocked;

                                                let Icon = BookOpen;
                                                let typeLabel = "Reading";
                                                if (lesson.content_type === "video") { Icon = Video; typeLabel = "Video"; }
                                                if (lesson.content_type === "quiz") { Icon = HelpCircle; typeLabel = "Quiz"; }
                                                if (lesson.content_type === "pdf") { Icon = FileText; typeLabel = "PDF"; }

                                                if (shouldLock) {
                                                    return (
                                                        <Tooltip key={lesson.id}>
                                                            <TooltipTrigger asChild>
                                                                <div
                                                                    onClick={() => {
                                                                        if (isSequentialLocked && accessInfo) {
                                                                            toast.error(`Complete "${accessInfo.prerequisiteTitle}" first`, {
                                                                                description: "This lesson is locked until you complete the previous one."
                                                                            });
                                                                        } else {
                                                                            toast.info("Enroll to access this lesson");
                                                                        }
                                                                    }}
                                                                    className={cn(
                                                                        "group flex items-start gap-3 py-3 px-4 text-sm transition-all rounded-lg border-l-4 border-transparent cursor-not-allowed bg-muted/10",
                                                                        isSequentialLocked ? "text-orange-400/60" : "text-muted-foreground/50"
                                                                    )}
                                                                >
                                                                    <Lock className={cn("h-4 w-4 shrink-0 mt-0.5", isSequentialLocked ? "text-orange-400" : "text-muted-foreground/50")} />
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-medium line-clamp-2 leading-tight">
                                                                            {lesson.title}
                                                                        </div>
                                                                        <div className="text-xs mt-1 flex items-center gap-1.5">
                                                                            <span className="text-muted-foreground/40">{typeLabel}</span>
                                                                            {isSequentialLocked && (
                                                                                <Badge variant="outline" className="h-4 px-1 text-[9px] border-orange-300 text-orange-600 bg-orange-50 dark:bg-orange-900/20">
                                                                                    Complete Previous
                                                                                </Badge>
                                                                            )}
                                                                            {isEnrollmentLocked && <span className="text-muted-foreground/40">• Enroll</span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="right">
                                                                {isSequentialLocked && accessInfo
                                                                    ? `Complete "${accessInfo.prerequisiteTitle}" first`
                                                                    : "Enroll to access this lesson"
                                                                }
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )
                                                }

                                                return (
                                                    <ClientSideLink
                                                        key={lesson.id}
                                                        href={`/learn/${courseId}?lessonId=${lesson.id}`}
                                                        lessonId={lesson.id}
                                                        className={cn(
                                                            "group flex items-start gap-3 py-3 px-4 text-sm transition-all rounded-lg border-l-4",
                                                            isActive
                                                                ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-950 dark:text-emerald-50"
                                                                : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                        )}
                                                    >
                                                        <Icon className={cn(
                                                            "h-5 w-5 shrink-0 mt-0.5",
                                                            isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/70"
                                                        )} />
                                                        <div className="flex-1 min-w-0">
                                                            <div className={cn("font-medium line-clamp-2 leading-tight", isActive ? "text-emerald-900 dark:text-emerald-100" : "text-foreground")}>
                                                                {lesson.title}
                                                            </div>
                                                            <div className={cn("text-xs mt-1 flex items-center gap-2", isActive ? "text-emerald-600/80 dark:text-emerald-400/80" : "text-muted-foreground/60")}>
                                                                <span>{typeLabel} {lesson.is_free_preview && !isEnrolled && "• Free Preview"}</span>

                                                                {lesson.content_type === "quiz" && lesson.exam_details && (() => {
                                                                    const { allow_pause, start_time, end_time } = lesson.exam_details;
                                                                    const now = new Date();
                                                                    const start = start_time ? new Date(start_time) : null;
                                                                    const end = end_time ? new Date(end_time) : null;

                                                                    if (allow_pause === false) {
                                                                        return (
                                                                            <Badge variant="destructive" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold">
                                                                                Live
                                                                            </Badge>
                                                                        )
                                                                    }

                                                                    if (end && now > end) {
                                                                        return (
                                                                            <Badge variant="secondary" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold bg-muted text-muted-foreground">
                                                                                Ended
                                                                            </Badge>
                                                                        )
                                                                    }

                                                                    if (start && now < start) {
                                                                        return (
                                                                            <Badge variant="outline" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20">
                                                                                Upcom..
                                                                            </Badge>
                                                                        )
                                                                    }

                                                                    if (start && end && now >= start && now <= end) {
                                                                        return (
                                                                            <Badge variant="outline" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20">
                                                                                Open
                                                                            </Badge>
                                                                        )
                                                                    }

                                                                    // Default Practice
                                                                    return (
                                                                        <Badge variant="outline" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold border-blue-200 text-blue-600 bg-blue-50 dark:bg-blue-900/20">
                                                                            Practice
                                                                        </Badge>
                                                                    )

                                                                })()}
                                                            </div>
                                                        </div>
                                                        {isCompleted && (
                                                            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500 fill-emerald-500/10" />
                                                        )}
                                                    </ClientSideLink>
                                                );
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TooltipProvider>
                </ScrollArea>
                <div className="p-4 border-t border-border bg-card text-xs text-muted-foreground space-y-2">
                    <Link href="/student/dashboard" className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors text-foreground/80 hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        <span className="font-medium">Go to Dashboard</span>
                    </Link>
                    <div className="w-full"><CommunityButton className="w-full justify-center" /></div>
                </div>
            </motion.div>

            {/* Mobile Sidebar Drawer */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[90] md:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-[100] w-80 bg-card shadow-2xl border-r border-border md:hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-border bg-card flex items-center justify-between">
                                <span className="font-bold truncate text-lg text-foreground tracking-tight">{course.title}</span>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X className="h-5 w-5 text-muted-foreground" />
                                </button>
                            </div>
                            <ScrollArea className="flex-1 min-h-0 bg-muted/5">
                                <Accordion type="single" collapsible className="w-full space-y-2 p-2" defaultValue={modules[0]?.id}>
                                    {modules.map((module: any) => (
                                        <AccordionItem key={module.id} value={module.id} className="border-none">
                                            <AccordionTrigger className="px-3 hover:no-underline hover:bg-muted/50 py-3 rounded-lg text-foreground/80 data-[state=open]:text-foreground transition-all">
                                                <div className="flex items-center justify-between w-full pr-2">
                                                    <div className="text-left text-sm font-semibold tracking-tight line-clamp-1 mr-2">
                                                        {module.title}
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-1 pb-0">
                                                <div className="space-y-1">
                                                    {module.lessons.map((lesson: any) => {
                                                        const isActive = currentLesson?.id === lesson.id;
                                                        const isCompleted = isLessonCompleted(lesson.id);
                                                        const isEnrollmentLocked = !isEnrolled && !lesson.is_free_preview;
                                                        const accessInfo = lessonAccessMap.get(lesson.id);
                                                        const isSequentialLocked = accessInfo?.isSequentialLocked || false;
                                                        const shouldLock = isEnrollmentLocked || isSequentialLocked;

                                                        let Icon = BookOpen;
                                                        let typeLabel = "Reading";
                                                        if (lesson.content_type === "video") { Icon = Video; typeLabel = "Video"; }
                                                        if (lesson.content_type === "quiz") { Icon = HelpCircle; typeLabel = "Quiz"; }
                                                        if (lesson.content_type === "pdf") { Icon = FileText; typeLabel = "PDF"; }

                                                        if (shouldLock) {
                                                            return (
                                                                <div
                                                                    key={lesson.id}
                                                                    onClick={() => {
                                                                        if (isSequentialLocked && accessInfo) {
                                                                            toast.error(`Complete "${accessInfo.prerequisiteTitle}" first`, {
                                                                                description: "This lesson is locked until you complete the previous one."
                                                                            });
                                                                        } else {
                                                                            toast.info("Enroll to access this lesson");
                                                                        }
                                                                    }}
                                                                    className={cn(
                                                                        "group flex items-start gap-3 py-3 px-4 text-sm transition-all rounded-lg border-l-4 border-transparent cursor-not-allowed bg-muted/10",
                                                                        isSequentialLocked ? "text-orange-400/60" : "text-muted-foreground/50"
                                                                    )}
                                                                >
                                                                    <Lock className={cn("h-4 w-4 shrink-0 mt-0.5", isSequentialLocked ? "text-orange-400" : "text-muted-foreground/50")} />
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="font-medium line-clamp-2 leading-tight">
                                                                            {lesson.title}
                                                                        </div>
                                                                        <div className="text-xs mt-1 flex items-center gap-1.5">
                                                                            <span className="text-muted-foreground/40">{typeLabel}</span>
                                                                            {isSequentialLocked && (
                                                                                <Badge variant="outline" className="h-4 px-1 text-[9px] border-orange-300 text-orange-600 bg-orange-50 dark:bg-orange-900/20">
                                                                                    Complete Previous
                                                                                </Badge>
                                                                            )}
                                                                            {isEnrollmentLocked && <span className="text-muted-foreground/40">• Enroll</span>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                        return (
                                                            <ClientSideLink
                                                                key={lesson.id}
                                                                href={`/learn/${courseId}?lessonId=${lesson.id}`}
                                                                lessonId={lesson.id}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={cn(
                                                                    "group flex items-start gap-3 py-3 px-4 text-sm transition-all rounded-lg border-l-4",
                                                                    isActive
                                                                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-950 dark:text-emerald-50"
                                                                        : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                                )}
                                                            >
                                                                <Icon className={cn(
                                                                    "h-5 w-5 shrink-0 mt-0.5",
                                                                    isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/70"
                                                                )} />
                                                                <div className="flex-1 min-w-0">
                                                                    <div className={cn("font-medium line-clamp-2 leading-tight", isActive ? "text-emerald-900 dark:text-emerald-100" : "text-foreground")}>
                                                                        {lesson.title}
                                                                    </div>
                                                                    <div className={cn("text-xs mt-1 flex items-center gap-2", isActive ? "text-emerald-600/80 dark:text-emerald-400/80" : "text-muted-foreground/60")}>
                                                                        <span>{typeLabel} {lesson.is_free_preview && !isEnrolled && "• Free Preview"}</span>

                                                                        {lesson.content_type === "quiz" && lesson.exam_details && (() => {
                                                                            const { allow_pause, start_time, end_time } = lesson.exam_details;
                                                                            const now = new Date();
                                                                            const start = start_time ? new Date(start_time) : null;
                                                                            const end = end_time ? new Date(end_time) : null;

                                                                            if (allow_pause === false) {
                                                                                return (
                                                                                    <Badge variant="destructive" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold">
                                                                                        Live
                                                                                    </Badge>
                                                                                )
                                                                            }

                                                                            if (end && now > end) {
                                                                                return (
                                                                                    <Badge variant="secondary" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold bg-muted text-muted-foreground">
                                                                                        Ended
                                                                                    </Badge>
                                                                                )
                                                                            }

                                                                            if (start && now < start) {
                                                                                return (
                                                                                    <Badge variant="outline" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20">
                                                                                        Upcom..
                                                                                    </Badge>
                                                                                )
                                                                            }

                                                                            if (start && end && now >= start && now <= end) {
                                                                                return (
                                                                                    <Badge variant="outline" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20">
                                                                                        Open
                                                                                    </Badge>
                                                                                )
                                                                            }

                                                                            // Default Practice
                                                                            return (
                                                                                <Badge variant="outline" className="h-4 px-1 text-[9px] rounded-sm uppercase tracking-wider font-bold border-blue-200 text-blue-600 bg-blue-50 dark:bg-blue-900/20">
                                                                                    Practice
                                                                                </Badge>
                                                                            )

                                                                        })()}
                                                                    </div>

                                                                </div>
                                                                {isCompleted && (
                                                                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500 fill-emerald-500/10" />
                                                                )}
                                                            </ClientSideLink>
                                                        );
                                                    })}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </ScrollArea>
                            <div className="p-4 border-t border-border bg-card text-xs text-muted-foreground space-y-2">
                                <Link href="/student/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors text-foreground/80 hover:text-foreground">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="font-medium">Go to Dashboard</span>
                                </Link>
                                <div className="w-full"><CommunityButton className="w-full justify-center" /></div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Navigation Bar / Unified Header */}
                <div className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-2 md:px-6 shrink-0 z-10 gap-2">
                    {/* Left: Sidebar Toggle & Title */}
                    <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                                // Toggle logic
                                if (window.innerWidth < 768) {
                                    setSidebarOpen(true)
                                } else {
                                    setDesktopSidebarCollapsed(!desktopSidebarCollapsed)
                                }
                            }}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>

                        <div className="h-6 w-px bg-border hidden sm:block" />

                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-sm md:text-base tracking-tight line-clamp-1 uppercase" title={currentLesson?.title}>
                                    {currentLesson?.title}
                                </h1>
                                {isQuiz && (
                                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200 text-[10px] px-1.5 h-4 md:h-5 rounded-sm flex-shrink-0 hidden sm:flex">
                                        EXAM MODE
                                    </Badge>
                                )}
                            </div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium hidden md:inline-block">
                                {course.title || 'Course'}
                            </span>
                        </div>
                    </div>

                    {/* Right: Actions & Navigation */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <ModeToggle />

                        <div className="pl-1 md:pl-2 ml-1 md:ml-2 border-l border-border">
                            <LessonNavigation
                                courseId={courseId}
                                currentLessonId={currentLesson?.id || ""}
                                prevLessonId={prevLessonId}
                                nextLessonId={nextLessonId}
                                variant="header"
                                contentType={currentLesson?.content_type as any}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                {children}
            </div>
        </div>
    )
}
