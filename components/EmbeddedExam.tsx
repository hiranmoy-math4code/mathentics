"use client"

import React, { useEffect, useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { awardCoins } from "@/app/actions/rewardActions"
import { useExamSession, useSubmitExam, useSaveAnswer, useUpdateTimer } from "@/hooks/student/useExamSession"
import { useExamResult } from "@/hooks/useExamResult"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Clock, CheckCircle2, Loader2, ArrowLeft, Flag, TrendingUp, Award, Target, BarChart3,
    Menu, AlertTriangle, Save, ListChecks, Maximize, Minimize, PauseCircle, X
} from "lucide-react"
import { renderWithLatex } from "@/lib/renderWithLatex"
import { useRouter } from "next/navigation"
import { useLessonContext } from "@/context/LessonContext"
import { ResponseExpiryWarning } from "@/components/exam/ResponseExpiryWarning"
import { isResponseExpired } from "@/lib/responseCleanup"
import { ExamTimer } from "@/components/exam/ExamTimer"
import { QuestionDisplay } from "@/components/exam/QuestionDisplay"
import { QuestionPalette } from "@/components/exam/QuestionPalette"

interface EmbeddedExamProps {
    examId: string
    onExit?: () => void
    isRetake?: boolean
    onSuccessfulSubmit?: (attemptId: string) => void
}

interface QuizResult {
    id: string
    score: number
    total_marks: number
    percentage: number
    passed: boolean
    time_taken: number
    correct_answers: number
    wrong_answers: number
    unattempted: number
}

// Component to show detailed question analysis
function QuestionAnalysisView({
    structured,
    responseMap,
    onBack,
    isExpired = false
}: {
    structured: any[],
    responseMap: Record<string, any>,
    onBack: () => void,
    isExpired?: boolean
}) {
    const [activeSectionIdx, setActiveSectionIdx] = useState(0)

    const allQuestions = structured.flatMap(s => s.questions)
    const activeSection = structured[activeSectionIdx]

    return (
        <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm flex flex-col h-[80vh]">
            {/* Header */}
            <div className="bg-card border-b border-border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground px-0 md:px-3">
                        <ArrowLeft className="w-4 h-4 mr-2" /> <span className="hidden md:inline">Back to Result</span><span className="md:hidden">Back</span>
                    </Button>
                    <h2 className="text-lg font-bold text-foreground truncate">Question Analysis</h2>
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {structured.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSectionIdx(i)}
                            className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap ${activeSectionIdx === i
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            {s.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {activeSection?.questions.map((q: any, idx: number) => {
                    // Hide user response if expired
                    const userAns = isExpired ? undefined : responseMap[q.id]

                    // If expired, we can't really judge Correct/Incorrect based on userAns (it's undefined).
                    // But we likely want to show just the question and correct answer.
                    // However, `isCorrect` logic depends on `userAns`.
                    // If isExpired, isCorrect will be false (undefined ans).
                    // We should probably adjust the display to generic "View Solution" mode.

                    const isCorrect = !isExpired && checkAnswer(q, userAns)
                    const isSkipped = !isExpired && (userAns === undefined || userAns === null || (Array.isArray(userAns) && userAns.length === 0))

                    return (
                        <div key={q.id} className={`p-4 md:p-6 rounded-xl border ${isExpired ? "border-border bg-card" :
                            isCorrect ? "border-emerald-500/30 bg-emerald-500/5" :
                                isSkipped ? "border-border bg-muted/20" :
                                    "border-rose-500/30 bg-rose-500/5"
                            }`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                        Q{idx + 1}
                                    </span>
                                    {!isExpired && isCorrect && <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Correct</span>}
                                    {!isExpired && !isCorrect && !isSkipped && <span className="text-xs font-bold text-rose-500 flex items-center gap-1"><X className="w-3 h-3" /> Incorrect</span>}
                                    {!isExpired && isSkipped && <span className="text-xs font-bold text-muted-foreground flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Skipped</span>}
                                    {isExpired && <span className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Response Expired</span>}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Marks: {isCorrect ? `+${q.marks}` : isSkipped || isExpired ? "0" : `-${q.negative_marks}`}
                                </div>
                            </div>

                            <div className="text-base text-foreground mb-6">
                                {renderWithLatex(q.question_text)}
                            </div>

                            <div className="space-y-2 mb-6">
                                {q.options?.map((opt: any, optIdx: number) => {
                                    const isSelected = !isExpired && isOptionSelected(q, opt.id, userAns)
                                    const isRightOption = isOptionCorrect(q, opt.id)

                                    let optClass = "border-border bg-muted/30 text-muted-foreground"
                                    if (isRightOption) optClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500"
                                    else if (isSelected && !isRightOption) optClass = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500"

                                    return (
                                        <div key={opt.id} className={`p-3 rounded-lg border flex items-center gap-3 ${optClass}`}>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isRightOption ? "bg-emerald-500 text-white" :
                                                isSelected ? "bg-rose-500 text-white" :
                                                    "border border-muted-foreground/30"
                                                }`}>
                                                {isRightOption ? <CheckCircle2 className="w-3 h-3" /> : isSelected ? <X className="w-3 h-3" /> : String.fromCharCode(65 + optIdx)}
                                            </div>
                                            <span className="text-sm">{renderWithLatex(opt.option_text)}</span>
                                        </div>
                                    )
                                })}
                                {q.question_type === "NAT" && (
                                    <div className="p-3 rounded-lg border border-border bg-muted/30">
                                        <div className="text-sm text-muted-foreground mb-1">Correct Answer: <span className="text-emerald-500 font-mono">{q.correct_answer}</span></div>
                                        {!isExpired && <div className="text-sm text-muted-foreground">Your Answer: <span className={`${isCorrect ? "text-emerald-500" : "text-rose-500"} font-mono`}>{userAns ?? "N/A"}</span></div>}
                                    </div>
                                )}
                            </div>

                            {q.explanation && (
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <h4 className="text-sm font-bold text-blue-500 mb-2 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Explanation
                                    </h4>
                                    <div className="text-sm text-foreground/90">
                                        {renderWithLatex(q.explanation)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Helper functions for analysis
function checkAnswer(q: any, ans: any) {
    if (ans === undefined || ans === null || (Array.isArray(ans) && ans.length === 0)) return false
    if (q.question_type === "NAT") return Number(ans) === Number(q.correct_answer)
    if (q.question_type === "MCQ") {
        const correctOpt = q.options.find((o: any) => o.is_correct)?.id
        return ans === correctOpt
    }
    if (q.question_type === "MSQ") {
        const correctIds = q.options.filter((o: any) => o.is_correct).map((o: any) => o.id).sort()
        const ansIds = (Array.isArray(ans) ? ans : [ans]).sort()
        return correctIds.length === ansIds.length && correctIds.every((x: string, i: number) => x === ansIds[i])
    }
    return false
}

function isOptionSelected(q: any, optId: string, ans: any) {
    if (!ans) return false
    if (q.question_type === "MCQ") return ans === optId
    if (q.question_type === "MSQ") return (Array.isArray(ans) ? ans : [ans]).includes(optId)
    return false
}

function isOptionCorrect(q: any, optId: string) {
    return q.options?.find((o: any) => o.id === optId)?.is_correct
}

export function PreviousResultView({
    examId,
    userId,
    onRetake,
    attemptId,
    initialResult,
    onBack
}: {
    examId: string,
    userId: string,
    onRetake: () => void,
    attemptId?: string,
    initialResult?: any,
    onBack?: () => void
}) {
    const [effectiveAttemptId, setEffectiveAttemptId] = useState<string | null>(attemptId || null)
    const [showAnalysis, setShowAnalysis] = useState(false)
    const supabase = createClient()

    // If no attemptId provided, fetch the latest one
    useEffect(() => {
        if (attemptId) {
            setEffectiveAttemptId(attemptId)
            return
        }

        const fetchLatestAttempt = async () => {
            const { data: attempts } = await supabase
                .from("exam_attempts")
                .select("id")
                .eq("exam_id", examId)
                .eq("student_id", userId)
                .eq("status", "submitted")
                .order("created_at", { ascending: false })
                .limit(1)

            if (attempts && attempts.length > 0) {
                setEffectiveAttemptId(attempts[0].id)
            }
        }

        fetchLatestAttempt()
    }, [examId, userId, attemptId, supabase])

    const { data: resultData, isLoading } = useExamResult(effectiveAttemptId || "")

    if (isLoading || !effectiveAttemptId) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        )
    }

    if (!resultData || !resultData.result) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center p-8 bg-card rounded-xl border border-border">
                    <h3 className="text-lg font-bold text-amber-500 mb-2">Result Not Found</h3>
                    <p className="text-muted-foreground text-sm mb-4">Could not find the result for this attempt.</p>
                    <Button onClick={onRetake} className="bg-primary hover:bg-primary/90">
                        Retake Quiz
                    </Button>
                </div>
            </div>
        )
    }

    const { result, structured, responseMap, attempt } = resultData
    const passed = result.passed ?? (result.percentage >= 40)

    // Check for response expiry
    const isExpired = attempt?.submitted_at ? isResponseExpired(attempt.submitted_at) : false

    // Check visibility settings
    const examSettings = attempt?.exams
    const visibility = examSettings?.result_visibility || "immediate"
    const releaseTime = examSettings?.result_release_time
    const showAnswers = examSettings?.show_answers ?? true

    const isResultVisible = () => {
        if (visibility === "immediate") return true
        if (visibility === "manual") return false
        if (visibility === "scheduled" && releaseTime) {
            return new Date() >= new Date(releaseTime)
        }
        return false
    }

    if (!isResultVisible()) {
        return (
            <div className="bg-background rounded-xl border border-border p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Results Not Yet Available</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    {visibility === "scheduled" && releaseTime
                        ? `The results for this exam will be released on ${new Date(releaseTime).toLocaleString()}.`
                        : "The instructor has not released the results for this exam yet."}
                </p>
                <Button onClick={onRetake} variant="outline" className="border-border text-foreground hover:bg-muted">
                    Back to Exam
                </Button>
            </div>
        )
    }

    if (showAnalysis) {
        return <QuestionAnalysisView structured={structured} responseMap={responseMap} onBack={() => setShowAnalysis(false)} isExpired={isExpired} />
    }

    return (
        <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Quiz Result</h2>
                <p className="text-indigo-100">
                    Attempted on {new Date(result.created_at).toLocaleDateString()}
                </p>
            </div>

            <div className="p-4 md:p-6 space-y-6">

                {attempt?.submitted_at && (
                    <ResponseExpiryWarning submittedAt={attempt.submitted_at} />
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 md:p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                        <Target className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                        <div className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-300">{result.score ?? result.obtained_marks ?? 0}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Score</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 md:p-4 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
                        <TrendingUp className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-purple-500 dark:text-purple-400" />
                        <div className="text-xl md:text-2xl font-bold text-purple-700 dark:text-purple-300">{result.percentage?.toFixed(1) || 0}%</div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Percentage</div>
                    </div>
                    <div className={`bg-gradient-to-br p-3 md:p-4 rounded-xl border text-center col-span-2 md:col-span-1 ${passed ? 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/50' : 'from-amber-500/20 to-amber-600/20 border-amber-500/50'}`}>
                        {passed ? (
                            <>
                                <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-emerald-500" />
                                <div className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">Passed</div>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-amber-500" />
                                <div className="text-xl md:text-2xl font-bold text-amber-600 dark:text-amber-400">Not Passed</div>
                            </>
                        )}
                        <div className="text-xs text-muted-foreground font-medium">Status</div>
                    </div>
                </div>

                {/* Section Analysis */}
                {structured && structured.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Section Analysis
                        </h3>
                        <div className="grid gap-4">
                            {structured.map((section: any) => {
                                const secResult = section.result
                                const totalQuestions = section.questions.length

                                return (
                                    <div key={section.id} className="bg-card p-4 rounded-xl border border-border">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-foreground">{section.title}</h4>
                                            <span className="text-xs text-muted-foreground">{totalQuestions} Questions</span>
                                        </div>

                                        {secResult ? (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div className="bg-muted/50 p-2 rounded-lg border border-border">
                                                    <div className="text-muted-foreground text-xs">Score</div>
                                                    <div className="font-semibold text-blue-500">{secResult.obtained_marks} / {secResult.total_marks}</div>
                                                </div>
                                                <div className="bg-muted/50 p-2 rounded-lg border border-border">
                                                    <div className="text-muted-foreground text-xs">Correct</div>
                                                    <div className="font-semibold text-emerald-500">{secResult.correct_answers}</div>
                                                </div>
                                                <div className="bg-muted/50 p-2 rounded-lg border border-border">
                                                    <div className="text-muted-foreground text-xs">Wrong</div>
                                                    <div className="font-semibold text-rose-500">{secResult.wrong_answers}</div>
                                                </div>
                                                <div className="bg-muted/50 p-2 rounded-lg border border-border">
                                                    <div className="text-muted-foreground text-xs">Unanswered</div>
                                                    <div className="font-semibold text-muted-foreground">{secResult.unanswered}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-muted-foreground italic">
                                                No detailed result available for this section.
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    {showAnswers && (
                        <Button
                            onClick={() => setShowAnalysis(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <ListChecks className="w-4 h-4 mr-2" />
                            Review Questions
                        </Button>
                    )}
                    <Button
                        onClick={onRetake}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        <Flag className="w-4 w-4 mr-2" />
                        Retake Quiz
                    </Button>
                    {onBack && (
                        <Button
                            onClick={onBack}
                            variant="outline"
                            className="border-border text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Attempts
                        </Button>
                    )}
                    <Button
                        onClick={() => window.location.reload()}
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                        Continue Learning
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function EmbeddedExam({ examId, onExit, isRetake = false, onSuccessfulSubmit }: EmbeddedExamProps) {
    const queryClient = useQueryClient()
    const supabase = createClient()
    const router = useRouter()
    const examContainerRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [responses, setResponses] = useState<Record<string, any>>({})
    const [marked, setMarked] = useState<Record<string, boolean>>({})
    const [visited, setVisited] = useState<Record<string, boolean>>({})
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0)

    // Timer Logic - Ref to avoid re-renders
    const timeRef = useRef(0)
    const [initialTime, setInitialTime] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)

    const [showSubmitDialog, setShowSubmitDialog] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [paletteOpenMobile, setPaletteOpenMobile] = useState(false)
    const [retakeAttempt, setRetakeAttempt] = useState(isRetake ? 1 : 0)
    const [submittedAttemptId, setSubmittedAttemptId] = useState<string | null>(null)
    const [showPauseDialog, setShowPauseDialog] = useState(false)
    const [isPausing, setIsPausing] = useState(false)
    const { markComplete } = useLessonContext()

    // Auth check
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return router.push("/auth/login")
            setUserId(user.id)
        }
        checkUser()
    }, [router, supabase])

    const { data: sessionData, isLoading, error } = useExamSession(examId, userId, retakeAttempt, !showResults)
    const { mutate: submitExam, isPending: isSubmitting } = useSubmitExam()
    const { mutate: saveAnswer, isPending: isSaving } = useSaveAnswer()
    const { mutate: updateTimer } = useUpdateTimer()

    // Initialize session
    useEffect(() => {
        if (!sessionData) return

        if (sessionData.previousResponses) {
            setResponses(sessionData.previousResponses)
            const newVisited: Record<string, boolean> = {}
            Object.keys(sessionData.previousResponses).forEach(k => newVisited[k] = true)
            setVisited(newVisited)
        }

        const totalDuration = sessionData.exam.duration_minutes * 60
        const timeSpent = sessionData.attempt.total_time_spent || 0
        const remaining = Math.max(0, totalDuration - timeSpent)

        setInitialTime(remaining)
        timeRef.current = remaining
        setIsTimerActive(true)
    }, [sessionData])


    // Fullscreen handler
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const toggleFullscreen = async () => {
        if (!examContainerRef.current) return

        if (!document.fullscreenElement) {
            try {
                await examContainerRef.current.requestFullscreen()
            } catch (err) {
                console.error("Error attempting to enable fullscreen:", err)
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen()
            }
        }
    }

    const forceExitFullscreen = async () => {
        if (document.fullscreenElement && document.exitFullscreen) {
            try {
                await document.exitFullscreen()
            } catch (err) {
                console.error("Error exiting fullscreen:", err)
            }
        }
    }

    const confirmPauseAndExit = async () => {
        setIsPausing(true)
        try {
            if (sessionData?.attempt?.id) {
                // Determine time spent
                const currentSecondsLeft = timeRef.current
                const totalDur = sessionData.exam.duration_minutes * 60
                const timeSpent = Math.max(0, totalDur - currentSecondsLeft)

                await new Promise<void>((resolve, reject) => {
                    updateTimer(
                        { attemptId: sessionData.attempt.id, timeSpent },
                        {
                            onSuccess: () => resolve(),
                            onError: (error) => reject(error)
                        }
                    )
                })
            }

            // Invalidate queries to ensure fresh data on return
            await queryClient.invalidateQueries({ queryKey: ["exam-attempts", examId, userId] })
            await queryClient.invalidateQueries({ queryKey: ["exam-session"] })

            // Exit fullscreen if active
            await forceExitFullscreen()

            setShowPauseDialog(false)
            if (onExit) onExit()
        } catch (error) {
            console.error("Error pausing exam:", error)
            toast.error("Failed to save progress")
        } finally {
            setIsPausing(false)
        }
    }

    const allQuestions = sessionData?.sections.flatMap((s) => s.questions) || []
    const currentQuestion = allQuestions[activeQuestionIdx]

    const isAnswered = useCallback((val: any) => {
        return val !== undefined && val !== null && val !== "" && !(Array.isArray(val) && val.length === 0)
    }, [])

    const getSectionAttemptCount = useCallback((sectionId: string) => {
        const section = sessionData?.sections.find(s => s.id === sectionId)
        if (!section) return 0
        return section.questions.filter(q => isAnswered(responses[q.id])).length
    }, [sessionData, responses, isAnswered])

    const currentSection = sessionData?.sections.find(s => s.id === currentQuestion?.section_id)

    const handleSaveResponse = useCallback((qid: string, ans: any) => {
        // Max Attempts Enforcement
        if (currentSection?.max_questions_to_attempt) {
            const wasAnswered = isAnswered(responses[qid])
            // Check if this is a "clearing" action (empty string or explicit null/undefined)
            const isClearing = ans === "" || ans === null || ans === undefined || (Array.isArray(ans) && ans.length === 0);
            const willBeAnswered = isAnswered(ans)

            // Only block if we are ADDING an answer (was not answered, and will be answered)
            // If we are clearing (willBeAnswered is false), we should ALWAYS allow it.
            if (!wasAnswered && willBeAnswered && !isClearing) {
                const currentCount = getSectionAttemptCount(currentSection.id)
                if (currentCount >= currentSection.max_questions_to_attempt) {
                    toast.error(`Maximum attempts (${currentSection.max_questions_to_attempt}) reached for this section. Clear an existing answer to change.`)
                    return // Prevent saving
                }
            }
        }

        setResponses((r) => ({ ...r, [qid]: ans }))
        setVisited((v) => ({ ...v, [qid]: true }))

        if (sessionData?.attempt?.id) {
            saveAnswer({ attemptId: sessionData.attempt.id, questionId: qid, answer: ans })
        }
    }, [currentSection, getSectionAttemptCount, isAnswered, responses, sessionData?.attempt?.id, saveAnswer])


    const handleMark = useCallback((qid: string) => {
        setMarked((m) => ({ ...m, [qid]: !m[qid] }))
    }, [])


    const performSubmit = useCallback(async () => {
        if (!sessionData?.attempt?.id || !sessionData?.exam) return

        submitExam({
            attemptId: sessionData.attempt.id,
            examId: sessionData.exam.id,
            responses: responses,
            sections: sessionData.sections,
            totalMarks: sessionData.exam.total_marks || 0
        }, {
            onSuccess: async (result: any) => {
                // Exit Fullscreen IMMEDIATELY
                await forceExitFullscreen()

                toast.success("Quiz submitted successfully!")
                setIsTimerActive(false)

                // Wait a moment for database to update
                await new Promise(resolve => setTimeout(resolve, 500))

                // Award coins and mark complete
                if (userId) {
                    try {
                        const rewardRes = await awardCoins(userId, 'quiz_completion', examId, `Completed quiz: ${sessionData.exam.title}`);
                        if (rewardRes.success && rewardRes.message) {
                            toast.success(rewardRes.message, { icon: "🪙" });
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
                    const { data: examData, error } = await supabase
                        .from("exams")
                        .select("result_visibility")
                        .eq("id", examId)
                        .single()

                    if (!error && examData) {
                        // Only hide results if explicitly set to manual or scheduled
                        shouldShowResults = examData.result_visibility === "immediate" || !examData.result_visibility
                    }
                } catch (error) {
                    console.error("Error fetching result visibility:", error)
                    // On error, default to showing results
                }

                // Close the submit dialog
                setShowSubmitDialog(false)

                if (shouldShowResults) {
                    // If onSuccessfulSubmit is provided (standalone mode), use it
                    if (onSuccessfulSubmit) {
                        onSuccessfulSubmit(sessionData.attempt.id)
                    } else {
                        // Otherwise show results inline (embedded mode)
                        setSubmittedAttemptId(sessionData.attempt.id)
                        setShowResults(true)
                    }
                } else {
                    toast.info("Results will be available once the instructor releases them")
                    if (onExit) onExit()
                }
            },
            onError: (error: any) => {
                console.error("Submission error:", error)
                toast.error("Failed to submit quiz. Please try again.")
                setShowSubmitDialog(false)
            }
        })
    }, [sessionData, responses, submitExam, examId, userId, awardCoins, markComplete, onExit, onSuccessfulSubmit, supabase])

    const handleAutoSubmit = useCallback(() => {
        toast.info("Time's up! Submitting quiz...")
        performSubmit()
    }, [performSubmit])

    const validateMinimumAttempts = () => {
        if (!sessionData) return true
        let isValid = true
        sessionData.sections.forEach(s => {
            if (s.required_attempts && getSectionAttemptCount(s.id) < s.required_attempts) {
                isValid = false
                toast.warning(`Section "${s.title}" requires at least ${s.required_attempts} attempted questions.`)
            }
        })
        return isValid
    }

    if (isLoading || !userId) {
        return (
            <div className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    <p>Loading Quiz...</p>
                </div>
            </div>
        )
    }

    if (error || (!sessionData && !isLoading)) {
        const errorMessage = (error as Error)?.message || "Unknown error"
        const isAlreadySubmitted = errorMessage.includes("already been submitted")

        if (isAlreadySubmitted && userId) {
            return <PreviousResultView
                examId={examId}
                userId={userId}
                onRetake={() => {
                    queryClient.invalidateQueries({ queryKey: ["exam-session"] })
                    setRetakeAttempt(prev => prev + 1)
                }}
            />
        }

        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center p-8 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-800">
                    <h3 className="text-lg font-bold text-rose-900 dark:text-rose-400 mb-2">Failed to Load Quiz</h3>
                    <p className="text-rose-700 dark:text-rose-500 text-sm">{errorMessage}</p>
                </div>
            </div>
        )
    }

    if (showResults && submittedAttemptId && userId) {
        return (
            <PreviousResultView
                examId={examId}
                userId={userId}
                attemptId={submittedAttemptId}
                onRetake={() => {
                    setRetakeAttempt(prev => {
                        const newRetakeAttempt = prev + 1
                        queryClient.invalidateQueries({ queryKey: ["exam-session", examId, userId, prev] })
                        queryClient.invalidateQueries({ queryKey: ["exam-session", examId, userId, newRetakeAttempt] })
                        return newRetakeAttempt
                    })
                    setShowResults(false)
                    setSubmittedAttemptId(null)
                }}
                onBack={onExit ? () => onExit() : undefined}
            />
        )
    }

    if (!sessionData) return null

    return (
        <div ref={examContainerRef} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] bg-background text-foreground rounded-xl overflow-hidden border border-border h-full">
            {/* LEFT PANEL */}
            <div className="flex flex-col min-h-0 p-3 md:p-6 relative bg-background">
                {/* HEADER NAV */}
                <div className="flex-shrink-0 bg-card border border-border py-3 px-3 md:px-4 rounded-xl flex flex-wrap items-center justify-between gap-2 md:gap-3 shadow-sm mb-4">
                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-base md:text-lg font-bold text-primary truncate">{sessionData.exam.title}</h2>
                            {currentSection && (
                                <div className="text-xs font-semibold px-2 py-0.5 rounded border border-border bg-muted/50 text-muted-foreground ml-2">
                                    Attempted: <span className={`${(currentSection.max_questions_to_attempt && getSectionAttemptCount(currentSection.id) >= currentSection.max_questions_to_attempt) ? "text-rose-500" : "text-foreground"}`}>{getSectionAttemptCount(currentSection.id)}</span>
                                    {currentSection.required_attempts ? ` / Min ${currentSection.required_attempts}` : ""}
                                    {currentSection.max_questions_to_attempt ? ` / Max ${currentSection.max_questions_to_attempt}` : ""}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                            {sessionData.sections.map((s, i) => {
                                const startIdx = sessionData.sections.slice(0, i).reduce((a, b) => a + b.questions.length, 0)
                                const isActive = activeQuestionIdx >= startIdx && activeQuestionIdx < startIdx + s.questions.length
                                return (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveQuestionIdx(startIdx)}
                                        className={`px-2 md:px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${isActive
                                            ? "bg-primary text-primary-foreground shadow-md"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            }`}
                                    >
                                        {s.title}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Saving Indicator */}
                        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-3 h-3" />
                                    Saved
                                </>
                            )}
                        </div>

                        <ExamTimer
                            key={initialTime}
                            initialSeconds={initialTime}
                            isActive={isTimerActive}
                            onTimeUp={handleAutoSubmit}
                            timeRef={timeRef}
                        />

                        <button
                            onClick={() => {
                                if (validateMinimumAttempts()) {
                                    setShowSubmitDialog(true)
                                } else {
                                    setShowSubmitDialog(true)
                                }
                            }}
                            className="hidden sm:block bg-rose-600 hover:bg-rose-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors shadow-sm"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setShowPauseDialog(true)}
                            className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-muted-foreground px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-colors shadow-sm"
                        >
                            <PauseCircle className="w-4 h-4" />
                            <span className="hidden lg:inline">Pause & Exit</span>
                        </button>
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setPaletteOpenMobile(true)}
                            className="block lg:hidden bg-primary text-primary-foreground px-2 md:px-3 py-1.5 md:py-2 rounded-md text-sm"
                        >
                            <Menu className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* QUESTION CARD */}
                <QuestionDisplay
                    question={currentQuestion}
                    activeQuestionIdx={activeQuestionIdx}
                    response={responses[currentQuestion?.id]}
                    isMarked={marked[currentQuestion?.id] || false}
                    onSave={handleSaveResponse}
                    onMark={handleMark}
                    onNext={() => {
                        if (activeQuestionIdx < allQuestions.length - 1) setActiveQuestionIdx(i => i + 1)
                    }}
                    onPrev={() => {
                        if (activeQuestionIdx > 0) setActiveQuestionIdx(i => i - 1)
                    }}
                    onClear={() => handleSaveResponse(currentQuestion.id, "")}
                    isFirst={activeQuestionIdx === 0}
                    isLast={activeQuestionIdx === allQuestions.length - 1}
                />
            </div>

            {/* RIGHT PALETTE (Desktop & Mobile handled by component) */}
            <QuestionPalette
                questions={allQuestions}
                activeQuestionIdx={activeQuestionIdx}
                responses={responses}
                marked={marked}
                visited={visited}
                onNavigate={(idx) => setActiveQuestionIdx(idx)}
                onSubmit={() => setShowSubmitDialog(true)}
                sectionTitle={currentSection?.title}
                isMobileOpen={paletteOpenMobile}
                onMobileClose={() => setPaletteOpenMobile(false)}
            />

            {/* SUBMIT CONFIRMATION DIALOG */}
            <AnimatePresence>
                {showSubmitDialog && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSubmitDialog(false)}
                            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden"
                            >
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="w-8 h-8 text-rose-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Submit Exam?</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Are you sure you want to submit? You won't be able to change your answers after this.
                                    </p>

                                    <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-muted-foreground">Answered</span>
                                            <span className="text-emerald-500 font-semibold">
                                                {Object.values(responses).filter(v => v !== null && (Array.isArray(v) ? v.length > 0 : true)).length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-muted-foreground">Marked for Review</span>
                                            <span className="text-amber-500 font-semibold">
                                                {Object.values(marked).filter(Boolean).length}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Unanswered</span>
                                            <span className="text-foreground font-semibold">
                                                {allQuestions.length - Object.values(responses).filter(v => v !== null && (Array.isArray(v) ? v.length > 0 : true)).length}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowSubmitDialog(false)}
                                            className="flex-1 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={performSubmit}
                                            disabled={isSubmitting}
                                            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-lg shadow-rose-900/20 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit Now"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* PAUSE CONFIRMATION DIALOG */}
            <AnimatePresence>
                {showPauseDialog && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPauseDialog(false)}
                            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl overflow-hidden"
                            >
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <PauseCircle className="w-8 h-8 text-amber-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-2">Pause & Exit?</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Your progress will be saved and you can resume this exam later.
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowPauseDialog(false)}
                                            className="flex-1 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmPauseAndExit}
                                            disabled={isPausing}
                                            className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium shadow-lg shadow-amber-900/20 transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isPausing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <PauseCircle className="w-4 h-4" />
                                                    Pause & Exit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
