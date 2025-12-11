"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from "lucide-react"
import { useLessonProgress, useMarkLessonComplete, useMarkLessonIncomplete } from "@/hooks/student/useLessonProgress"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface LessonNavigationProps {
    courseId: string
    currentLessonId: string
    prevLessonId: string | null
    nextLessonId: string | null
    variant?: "default" | "header"
}

export function LessonNavigation({
    courseId,
    currentLessonId,
    prevLessonId,
    nextLessonId,
    variant = "default"
}: LessonNavigationProps) {
    const [userId, setUserId] = useState<string | null>(null)
    const { data: lessonProgress } = useLessonProgress(userId || undefined, courseId)
    const { mutate: markComplete, isPending: isMarkingComplete } = useMarkLessonComplete()
    const { mutate: markIncomplete, isPending: isMarkingIncomplete } = useMarkLessonIncomplete()

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
                onSuccess: () => toast.success("Lesson marked as incomplete"),
                onError: () => toast.error("Failed to mark incomplete")
            })
        } else {
            markComplete({ userId, lessonId: currentLessonId, courseId }, {
                onSuccess: () => toast.success("Lesson marked as complete"),
                onError: () => toast.error("Failed to mark complete")
            })
        }
    }

    if (variant === "header") {
        return (
            <div className="flex items-center gap-1 md:gap-3">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 md:w-auto md:h-9 md:px-4 gap-2 uppercase text-xs font-bold tracking-wider rounded-md border-2 border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-transparent" disabled={!prevLessonId} asChild={!!prevLessonId}>
                    {prevLessonId ? (
                        <Link href={`/learn/${courseId}?lessonId=${prevLessonId}`} title="Previous Lesson">
                            <ChevronLeft className="h-4 w-4 md:h-3 md:w-3" /> <span className="hidden md:inline">PREVIOUS</span>
                        </Link>
                    ) : (
                        <span className="opacity-50 cursor-not-allowed flex items-center justify-center w-full h-full"><ChevronLeft className="h-4 w-4 md:h-3 md:w-3" /> <span className="hidden md:inline">PREVIOUS</span></span>
                    )}
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 md:w-auto md:h-9 md:px-4 gap-2 uppercase text-xs font-bold tracking-wider rounded-md border-2 border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-transparent text-muted-foreground hover:text-foreground"
                    onClick={handleToggleComplete}
                    disabled={isMarkingComplete || isMarkingIncomplete}
                    title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                >
                    {isCompleted ? (
                        <CheckCircle className="h-4 w-4 md:h-3 md:w-3 text-emerald-500" />
                    ) : (
                        <Circle className="h-4 w-4 md:h-3 md:w-3" />
                    )}
                    <span className="hidden md:inline">{isCompleted ? "COMPLETED" : "MARK COMPLETE"}</span>
                </Button>

                <Button className="bg-orange-500 hover:bg-orange-600 text-white h-8 w-8 p-0 md:w-auto md:h-9 md:px-5 gap-2 shadow-sm rounded-md uppercase text-xs font-bold tracking-wider" disabled={!nextLessonId} asChild={!!nextLessonId} size="sm">
                    {nextLessonId ? (
                        <Link href={`/learn/${courseId}?lessonId=${nextLessonId}`} title="Next Lesson">
                            <span className="hidden md:inline">NEXT LESSON</span> <ChevronRight className="h-4 w-4 md:h-3 md:w-3" />
                        </Link>
                    ) : (
                        <span className="opacity-50 cursor-not-allowed flex items-center justify-center w-full h-full"><span className="hidden md:inline">NEXT LESSON</span> <ChevronRight className="h-4 w-4 md:h-3 md:w-3" /></span>
                    )}
                </Button>
            </div>
        )
    }

    // Default variant
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 pt-8 border-t border-border gap-4">
            <Button variant="outline" className="gap-2 h-11 px-6 w-full sm:w-auto order-2 sm:order-1" disabled={!prevLessonId} asChild={!!prevLessonId}>
                {prevLessonId ? (
                    <Link href={`/learn/${courseId}?lessonId=${prevLessonId}`}>
                        <ChevronLeft className="h-4 w-4" /> Previous Lesson
                    </Link>
                ) : (
                    <span><ChevronLeft className="h-4 w-4" /> Previous Lesson</span>
                )}
            </Button>

            <Button
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-foreground flex w-full sm:w-auto order-3 sm:order-2"
                onClick={handleToggleComplete}
                disabled={isMarkingComplete || isMarkingIncomplete}
            >
                {isCompleted ? (
                    <>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Mark Incomplete
                    </>
                ) : (
                    <>
                        <Circle className="h-4 w-4" />
                        Mark Complete
                    </>
                )}
            </Button>

            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-6 shadow-md shadow-emerald-500/20 w-full sm:w-auto order-1 sm:order-3" disabled={!nextLessonId} asChild={!!nextLessonId}>
                {nextLessonId ? (
                    <Link href={`/learn/${courseId}?lessonId=${nextLessonId}`}>
                        Next Lesson <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <span>Next Lesson <ChevronRight className="h-4 w-4" /></span>
                )}
            </Button>
        </div>
    )
}
