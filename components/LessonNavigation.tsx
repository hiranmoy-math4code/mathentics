"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Loader2 } from "lucide-react"
import { useLessonProgress, useMarkLessonComplete, useMarkLessonIncomplete } from "@/hooks/student/useLessonProgress"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ClientSideLink } from "@/components/ClientSideLink"
import { cn } from "@/lib/utils"

import { useLessonPrefetch } from "@/hooks/useLessonPrefetch"

interface LessonNavigationProps {
    courseId: string
    currentLessonId: string
    prevLessonId: string | null
    nextLessonId: string | null
    variant?: "default" | "header"
    contentType?: "video" | "text" | "pdf" | "quiz" // NEW: Content type for conditional rendering
}

export function LessonNavigation({
    courseId,
    currentLessonId,
    prevLessonId,
    nextLessonId,
    variant = "default",
    contentType
}: LessonNavigationProps) {
    const [userId, setUserId] = useState<string | null>(null)
    const { data: lessonProgress } = useLessonProgress(userId || undefined, courseId)
    const { mutate: markComplete, isPending: isMarkingComplete } = useMarkLessonComplete()
    const { mutate: markIncomplete, isPending: isMarkingIncomplete } = useMarkLessonIncomplete()
    const { prefetchLesson } = useLessonPrefetch()

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) setUserId(user.id)
        }
        getUser()
    }, [])

    const isCompleted = lessonProgress?.some(p => p.lesson_id === currentLessonId && p.completed) || false

    const handleToggleComplete = () => {
        if (!userId) return

        if (isCompleted) {
            markIncomplete({ userId, lessonId: currentLessonId, courseId }, {
                onSuccess: () => toast.success("Marked incomplete"),
                onError: () => toast.error("Failed to update")
            })
        } else {
            markComplete({ userId, lessonId: currentLessonId, courseId }, {
                onSuccess: () => toast.success("Marked complete! 🎉"),
                onError: () => toast.error("Failed to update")
            })
        }
    }

    if (variant === "header") {
        return (
            <div className="flex items-center gap-1.5 md:gap-3 w-full justify-end sm:justify-center">
                {/* PREVIOUS BUTTON - Icon only on mobile */}
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 flex-shrink-0 md:w-auto md:px-4 md:h-9 gap-2 border-2 border-muted-foreground/10 hover:border-muted-foreground/30 rounded-md"
                    disabled={!prevLessonId}
                    asChild={!!prevLessonId}
                    onMouseEnter={() => prevLessonId && prefetchLesson(prevLessonId, courseId)}
                >
                    {prevLessonId ? (
                        <ClientSideLink href={`/learn/${courseId}?lessonId=${prevLessonId}`} lessonId={prevLessonId}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="hidden md:inline text-xs font-bold tracking-wider">PREV</span>
                        </ClientSideLink>
                    ) : (
                        <span className="opacity-30"><ChevronLeft className="h-4 w-4" /></span>
                    )}
                </Button>

                {/* COMPLETE TOGGLE - Only for text/PDF lessons */}
                {(contentType === "text" || contentType === "pdf") && (
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "h-9 w-9 p-0 flex-shrink-0 md:w-auto md:px-4 md:h-9 gap-2 border-2 transition-all rounded-md",
                            isCompleted ? "border-emerald-500/20 bg-emerald-50/10" : "border-muted-foreground/10"
                        )}
                        onClick={handleToggleComplete}
                        disabled={isMarkingComplete || isMarkingIncomplete}
                    >
                        {isMarkingComplete || isMarkingIncomplete ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="hidden md:inline text-xs font-bold tracking-wider uppercase">
                            {isCompleted ? "DONE" : "COMPLETE"}
                        </span>
                    </Button>
                )}

                {/* NEXT BUTTON - Icon only on mobile */}
                <Button
                    className="h-9 w-9 p-0 flex-shrink-0 md:w-auto md:px-5 md:h-9 gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-sm rounded-md"
                    disabled={!nextLessonId}
                    asChild={!!nextLessonId}
                    onMouseEnter={() => nextLessonId && prefetchLesson(nextLessonId, courseId)}
                >
                    {nextLessonId ? (
                        <ClientSideLink href={`/learn/${courseId}?lessonId=${nextLessonId}`} lessonId={nextLessonId}>
                            <span className="hidden md:inline text-xs font-bold tracking-wider">NEXT</span>
                            <ChevronRight className="h-4 w-4" />
                        </ClientSideLink>
                    ) : (
                        <span className="opacity-50"><ChevronRight className="h-4 w-4" /></span>
                    )}
                </Button>
            </div >
        )
    }

    // Default Bottom Navigation
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-border gap-4">
            <Button
                variant="outline"
                className="gap-2 h-11 px-6 w-full sm:w-auto order-2 sm:order-1"
                disabled={!prevLessonId}
                asChild={!!prevLessonId}
                onMouseEnter={() => prevLessonId && prefetchLesson(prevLessonId, courseId)}
            >
                {prevLessonId ? (
                    <ClientSideLink href={`/learn/${courseId}?lessonId=${prevLessonId}`} lessonId={prevLessonId}>
                        <ChevronLeft className="h-4 w-4" /> Prev Lesson
                    </ClientSideLink>
                ) : (
                    <span className="flex items-center gap-2"><ChevronLeft className="h-4 w-4" /> Prev</span>
                )}
            </Button>

            {/* COMPLETE TOGGLE - Only for text/PDF lessons */}
            {(contentType === "text" || contentType === "pdf") && (
                <Button
                    variant="ghost"
                    className="gap-2 text-muted-foreground hover:text-foreground flex w-full sm:w-auto order-3 sm:order-2"
                    onClick={handleToggleComplete}
                    disabled={isMarkingComplete || isMarkingIncomplete}
                >
                    {isCompleted ? (
                        <><CheckCircle className="h-5 w-5 text-emerald-500" /> Completed</>
                    ) : (
                        <><Circle className="h-5 w-5" /> Mark Complete</>
                    )}
                </Button>
            )}

            <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-8 shadow-md shadow-emerald-500/10 w-full sm:w-auto order-1 sm:order-3 font-bold"
                disabled={!nextLessonId}
                asChild={!!nextLessonId}
                onMouseEnter={() => nextLessonId && prefetchLesson(nextLessonId, courseId)}
            >
                {nextLessonId ? (
                    <ClientSideLink href={`/learn/${courseId}?lessonId=${nextLessonId}`} lessonId={nextLessonId}>
                        Next Lesson <ChevronRight className="h-4 w-4" />
                    </ClientSideLink>
                ) : (
                    <span className="flex items-center gap-2">Finished <CheckCircle className="h-4 w-4" /></span>
                )}
            </Button>
        </div>
    )
}
