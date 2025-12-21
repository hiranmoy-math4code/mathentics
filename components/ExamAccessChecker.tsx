"use client"

import { useEffect, useState } from "react"
import { Lock, Clock, CheckCircle, AlertCircle, ExternalLink, AlertTriangle, ShieldCheck, Calendar, Info, CheckCircle2, BookOpen } from "lucide-react"
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

    // 1. Ready to Start State
    if (status.accessible) {
        return (
            <div className={cn("max-w-md mx-auto p-1 bg-white dark:bg-slate-900 rounded-[2rem] border border-green-100 dark:border-green-900/30 transition-all duration-300", className)}>
                <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-100 dark:border-green-800/50 w-fit mx-auto">
                        <CheckCircle className="w-3.5 h-3.5" />
                        System Ready
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Exam is Ready</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Your credentials have been verified. You may now enter the secure examination area.</p>
                    </div>

                    {onStartExam && (
                        <Button
                            onClick={onStartExam}
                            className="w-full py-6 text-lg shadow-lg shadow-green-200 dark:shadow-none"
                            variant="ghost"
                            size="lg"
                        >
                            Start Exam Now
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // 2. Upcoming exam
    if (status.reason === "upcoming") {
        return (
            <div className={cn("min-h-screen bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center font-sans transition-colors duration-300", className)}>
                <div className="w-full max-w-2xl space-y-4 relative z-10">

                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
                        {/* Top Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-wider uppercase transition-colors">
                                <div className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                                </div>
                                Access Restricted
                            </div>
                        </div>

                        <div className="text-center mb-8 space-y-2">
                            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                                Exam Not Yet Started
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base max-w-md mx-auto leading-relaxed transition-colors">
                                {status.message}
                            </p>
                        </div>

                        {/* Compact Countdown Module */}
                        {countdown && (
                            <div className="relative mb-8">
                                <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-center transition-colors">
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2 transition-colors">Launch Sequence In</div>
                                    <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tighter text-slate-900 dark:text-white tabular-nums transition-colors">
                                        {countdown}
                                    </div>
                                    <div className="flex justify-center gap-8 mt-2 text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                                        <span>Hours</span>
                                        <span>Minutes</span>
                                        <span>Seconds</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Detail Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors">
                                    <Calendar size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <div className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors">Scheduled Date</div>
                                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors">
                                        {status.startTime?.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 transition-colors">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors">
                                    <ShieldCheck size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <div className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors">Environment</div>
                                    <div className="text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors text-nowrap">Secure Portal</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                disabled
                                className="w-full py-5 text-base bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 cursor-not-allowed transition-colors"
                            >
                                <Lock size={18} strokeWidth={2.5} />
                                Awaiting Scheduled Start
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                                <Info size={12} />
                                Unlocks at {status.startTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle size={16} className="text-amber-500" />
                                <h3 className="font-black text-slate-800 dark:text-slate-100 text-xs uppercase tracking-wider transition-colors">Key Rules</h3>
                            </div>
                            <ul className="space-y-2">
                                {[
                                    "No external applications.",
                                    "System clock must be synced.",
                                    "120 minutes total duration."
                                ].map((rule, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium transition-colors">
                                        <CheckCircle2 size={12} className="mt-0.5 text-slate-300 dark:text-slate-700 shrink-0 transition-colors" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-indigo-600 dark:bg-indigo-900 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden transition-colors">
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-black text-sm">Need Help?</h3>
                                    <ExternalLink size={16} className="text-indigo-200 opacity-60" />
                                </div>
                                <p className="text-[10px] text-indigo-100 dark:text-indigo-200/80 font-medium leading-relaxed transition-colors">
                                    Support available 24/7 for troubleshooting.
                                </p>
                            </div>
                            <button className="relative z-10 w-full mt-4 text-[10px] font-black uppercase tracking-widest bg-white text-indigo-600 hover:bg-indigo-50 dark:bg-indigo-800 dark:text-white dark:hover:bg-indigo-700 py-2.5 rounded-xl transition-all active:scale-95 shadow-sm border border-transparent dark:border-indigo-700/50">
                                Connect Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Expired exam
    if (status.reason === "expired") {
        return (
            <div className={cn("max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-amber-100 dark:border-amber-900/30 transition-all duration-300", className)}>
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800/50">
                            <AlertCircle size={14} />
                            Session Expired
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Exam Has Ended</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {status.message || "This examination period has concluded and is no longer accepting submissions."}
                        </p>
                    </div>

                    {status.endTime && (
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center justify-center gap-3 border border-slate-100 dark:border-slate-800">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                Closed on {status.endTime.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    )}

                    <Button
                        disabled
                        className="w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
                        size="lg"
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        Exam Closed
                    </Button>
                </div>
            </div>
        );
    }

    // 4. Prerequisite locked
    if (status.reason === "prerequisite") {
        return (
            <div className={cn("max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-purple-100 dark:border-purple-900/30 transition-all duration-300", className)}>
                <div className="space-y-6">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-100 dark:border-purple-800/50">
                            <Lock size={14} />
                            Prerequisite Required
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Access Locked</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                            {status.message || "You must successfully complete the prerequisite assessment to unlock this exam."}
                        </p>
                    </div>

                    {status.prerequisiteTitle && (
                        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20 flex items-start gap-4">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                <BookOpen size={18} className="text-purple-500" />
                            </div>
                            <div>
                                <div className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1">Required Task</div>
                                <div className="text-sm font-bold text-purple-900 dark:text-purple-100">
                                    {status.prerequisiteTitle}
                                </div>
                            </div>
                        </div>
                    )}

                    <Button
                        disabled
                        className="w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed"
                        size="lg"
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        Complete Task First
                    </Button>
                </div>
            </div>
        );
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
