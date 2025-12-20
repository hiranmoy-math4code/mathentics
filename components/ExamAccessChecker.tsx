"use client"

import { useEffect, useState } from "react"
import { Lock, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ExamAccessStatus {
    accessible: boolean
    reason?: "upcoming" | "expired" | "prerequisite" | "accessible"
    message?: string
    startTime?: Date
    endTime?: Date
    prerequisiteTitle?: string
}

interface ExamAccessCheckerProps {
    status: ExamAccessStatus
    onStartExam?: () => void
    className?: string
}

export function ExamAccessChecker({ status, onStartExam, className }: ExamAccessCheckerProps) {
    const [countdown, setCountdown] = useState<string>("")

    // Countdown timer for upcoming exams
    useEffect(() => {
        if (status.reason === "upcoming" && status.startTime) {
            const updateCountdown = () => {
                const now = new Date()
                const diff = status.startTime!.getTime() - now.getTime()

                if (diff <= 0) {
                    setCountdown("Starting now...")
                    // Refresh to update access status
                    setTimeout(() => window.location.reload(), 1000)
                    return
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)

                if (days > 0) {
                    setCountdown(`${days}d ${hours}h ${minutes}m`)
                } else if (hours > 0) {
                    setCountdown(`${hours}h ${minutes}m ${seconds}s`)
                } else if (minutes > 0) {
                    setCountdown(`${minutes}m ${seconds}s`)
                } else {
                    setCountdown(`${seconds}s`)
                }
            }

            updateCountdown()
            const interval = setInterval(updateCountdown, 1000)
            return () => clearInterval(interval)
        }
    }, [status.reason, status.startTime])

    if (status.accessible) {
        return (
            <div className={cn("space-y-4", className)}>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Exam is ready to start</span>
                </div>
                {onStartExam && (
                    <Button
                        onClick={onStartExam}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                    >
                        Start Exam
                    </Button>
                )}
            </div>
        )
    }

    // Upcoming exam
    if (status.reason === "upcoming") {
        return (
            <div className={cn("space-y-4 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30", className)}>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                        <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Exam Not Yet Started
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                            {status.message || "This exam will be available soon."}
                        </p>
                        {status.startTime && (
                            <div className="space-y-2">
                                <div className="text-xs text-blue-600 dark:text-blue-400">
                                    Starts on: {status.startTime.toLocaleString()}
                                </div>
                                {countdown && (
                                    <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        <span className="text-sm font-mono font-semibold text-blue-900 dark:text-blue-100">
                                            Starts in: {countdown}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    disabled
                    className="w-full"
                    size="lg"
                >
                    <Lock className="w-4 h-4 mr-2" />
                    Exam Locked
                </Button>
            </div>
        )
    }

    // Expired exam
    if (status.reason === "expired") {
        return (
            <div className={cn("space-y-4 p-6 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30", className)}>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/50">
                        <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-1">
                            Exam Has Ended
                        </h3>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                            {status.message || "This exam is no longer accepting submissions."}
                        </p>
                        {status.endTime && (
                            <div className="text-xs text-amber-600 dark:text-amber-400">
                                Ended on: {status.endTime.toLocaleString()}
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    disabled
                    className="w-full"
                    size="lg"
                >
                    <Lock className="w-4 h-4 mr-2" />
                    Exam Closed
                </Button>
            </div>
        )
    }

    // Prerequisite locked
    if (status.reason === "prerequisite") {
        return (
            <div className={cn("space-y-4 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/30", className)}>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                        <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-1">
                            Prerequisite Required
                        </h3>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                            {status.message || "You must complete the prerequisite exam first."}
                        </p>
                        {status.prerequisiteTitle && (
                            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800">
                                <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">
                                    Complete this first:
                                </div>
                                <div className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                                    {status.prerequisiteTitle}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    disabled
                    className="w-full"
                    size="lg"
                >
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Prerequisite First
                </Button>
            </div>
        )
    }

    // Default locked state
    return (
        <div className={cn("space-y-4 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30", className)}>
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900/50">
                    <Lock className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        Exam Locked
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        {status.message || "This exam is currently not accessible."}
                    </p>
                </div>
            </div>
            <Button
                disabled
                className="w-full"
                size="lg"
            >
                <Lock className="w-4 h-4 mr-2" />
                Exam Locked
            </Button>
        </div>
    )
}
