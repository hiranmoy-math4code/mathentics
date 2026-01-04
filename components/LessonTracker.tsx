"use client"

import { useEffect, useState, useCallback } from "react"
import { useMarkLessonComplete } from "@/hooks/student/useLessonProgress"
import { createClient } from "@/lib/supabase/client"
import { checkModuleCompletion, checkFirstLessonReward } from "@/app/actions/rewardActions"
import { useCurrentUser } from "@/hooks/student/useCurrentUser"
// Force HMR Update
import { toast } from "sonner"
import LessonContext from "@/context/LessonContext"

interface LessonTrackerProps {
    lessonId: string
    courseId: string
    moduleId?: string
    contentType?: "video" | "text" | "pdf" | "quiz"
    children: React.ReactNode
}

export function LessonTracker({ lessonId, courseId, moduleId, contentType = "text", children }: LessonTrackerProps) {
    const { mutate: markCompleteMutation } = useMarkLessonComplete()
    const [isCompleted, setIsCompleted] = useState(false)

    // Use centralized user hook
    const { data: userProfile } = useCurrentUser()
    const userId = userProfile?.id

    const handleMarkComplete = useCallback(() => {
        if (isCompleted || !userId) return

        if (lessonId) {
            markCompleteMutation({
                userId: userId,
                lessonId,
                courseId,
            }, {
                onSuccess: async () => {
                    setIsCompleted(true)
                    if (moduleId) {
                        const res = await checkModuleCompletion(userId, moduleId)
                        if (res?.success && res.message) {
                            toast.success(res.message, { icon: "🪙" })
                        }
                    }
                    // Check for first lesson reward (referral)
                    await checkFirstLessonReward(userId)
                }
            })
        }
    }, [isCompleted, lessonId, courseId, moduleId, markCompleteMutation, userId])

    useEffect(() => {
        // Reset completion state when lesson changes
        setIsCompleted(false)

        // Strict Rules for Text/PDF: 5 minutes timer
        if (contentType === "text" || contentType === "pdf") {
            const timer = setTimeout(() => {
                handleMarkComplete()
            }, 5 * 60 * 1000) // 5 minutes

            return () => clearTimeout(timer)
        }
    }, [lessonId, contentType, handleMarkComplete])

    return (
        <LessonContext.Provider value={{ markComplete: handleMarkComplete, isCompleted }}>
            {children}
        </LessonContext.Provider>
    )
}
