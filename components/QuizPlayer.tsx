"use client"

import { useState, useEffect } from "react"
import { EmbeddedExam, PreviousResultView } from "@/components/EmbeddedExam"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileQuestion, ListChecks, Trophy, Play, RotateCcw, ChevronRight, History } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

interface QuizPlayerProps {
    exam: {
        id: string
        title: string
        duration_minutes: number
        total_marks: number
        description?: string
        max_attempts?: number
    }
    attempts: any[]
    userId: string
    questionsCount: number
    maxAttempts?: number
}

export function QuizPlayer({ exam, attempts, userId, questionsCount, maxAttempts = 1 }: QuizPlayerProps) {
    const [view, setView] = useState<"landing" | "exam" | "result">("landing")
    const [selectedAttempt, setSelectedAttempt] = useState<any>(null)

    // Fetch attempts with React Query
    const { data: attemptsData, refetch } = useQuery({
        queryKey: ["exam-attempts", exam.id, userId],
        queryFn: async () => {
            const supabase = createClient()
            const { data } = await supabase
                .from("exam_attempts")
                .select("*, result:results(*)")
                .eq("exam_id", exam.id)
                .eq("student_id", userId)
                .order("created_at", { ascending: false })
            return data || []
        },
        initialData: attempts,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })

    const completedAttempts = (attemptsData || []).filter((a: any) => a.status === 'submitted')
    const limit = exam.max_attempts !== undefined ? exam.max_attempts : maxAttempts
    const attemptsLeft = limit !== null && limit !== undefined ? Math.max(0, limit - completedAttempts.length) : Infinity
    const activeAttempt = (attemptsData || []).find((a: any) => a.status !== 'submitted')
    const hasAttempted = completedAttempts.length > 0 || !!activeAttempt

    const handleStart = () => {
        setView("exam")
    }

    const handleViewResult = (attempt: any) => {
        setSelectedAttempt(attempt)
        setView("result")
    }

    useEffect(() => {
        if (view === "landing") {
            refetch()
        }
    }, [view, refetch])

    if (view === "exam") {
        return <EmbeddedExam examId={exam.id} onExit={() => setView("landing")} isRetake={hasAttempted && !activeAttempt} />
    }

    if (view === "result") {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Button
                    variant="ghost"
                    onClick={() => setView("landing")}
                    className="pl-0 hover:pl-2 transition-all gap-2"
                >
                    <ChevronRight className="h-4 w-4 rotate-180" /> Back to Quiz Overview
                </Button>
                <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                    <PreviousResultView
                        examId={exam.id}
                        userId={userId}
                        onRetake={() => setView("exam")}
                        attemptId={selectedAttempt?.id}
                        initialResult={selectedAttempt?.result}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Main Info Card */}
            <Card className="md:col-span-2 border-border shadow-md overflow-hidden flex flex-col">
                <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <CardTitle className="text-3xl font-bold mb-2">{exam.title}</CardTitle>
                            <CardDescription className="text-base leading-relaxed">
                                {exam.description || "Challenge yourself and test your knowledge with this comprehensive quiz."}
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-muted/30 p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mb-2 text-blue-600 dark:text-blue-400">
                                <FileQuestion className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold">{questionsCount}</span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Questions</span>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                            <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full mb-2 text-amber-600 dark:text-amber-400">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold">{exam.duration_minutes}m</span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Duration</span>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                            <div className="bg-emerald-100 dark:bg-emerald-900/20 p-2 rounded-full mb-2 text-emerald-600 dark:text-emerald-400">
                                <ListChecks className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold">
                                {limit === null || limit === undefined ? "∞" : attemptsLeft}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide"> attempts left</span>
                        </div>
                    </div>


                </CardContent>
                <CardFooter className="pt-2 pb-6 flex flex-col sm:flex-row gap-4">
                    {(limit === null || limit === undefined || attemptsLeft > 0 || activeAttempt) ? (
                        <Button
                            onClick={handleStart}
                            size="lg"
                            className="w-full sm:w-auto text-lg gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                            {activeAttempt ? (
                                <>
                                    <Play className="w-5 h-5 fill-current" /> Resume Quiz
                                </>
                            ) : hasAttempted ? (
                                <>
                                    <RotateCcw className="w-5 h-5" /> Retake Quiz
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5 fill-current" /> Start Quiz
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button disabled size="lg" className="w-full sm:w-auto">
                            No Attempts Remaining
                        </Button>
                    )}
                </CardFooter>
            </Card>

            {/* Sidebar / History */}
            <div className="space-y-6">
                {/* Best Score Card (Placeholder or Real if calculated) */}
                {completedAttempts.length > 0 && (
                    <Card className="border-border shadow-sm overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-amber-500" /> Best Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-amber-600 dark:text-amber-500">
                                {Math.max(...completedAttempts.map((a: any) => {
                                    const res = Array.isArray(a.result) ? a.result[0] : a.result;
                                    return res?.score || 0;
                                }), 0)}
                                <span className="text-sm text-muted-foreground ml-1 font-normal">/ {exam.total_marks}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Card className="border-border shadow-sm h-full max-h-[500px] flex flex-col">
                    <CardHeader className="pb-3 border-b">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <History className="w-5 h-5 text-muted-foreground" />
                            History
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-0">
                        {(completedAttempts.length > 0 || activeAttempt) ? (
                            <div className="divide-y divide-border">
                                {activeAttempt && (
                                    <div className="p-4 bg-primary/5 hover:bg-primary/10 transition-colors">
                                        <div className="flex justify-between items-center mb-2">
                                            <Badge variant="default" className="bg-primary/80 hover:bg-primary/80">In Progress</Badge>
                                            <span className="text-xs text-muted-foreground">Just now</span>
                                        </div>
                                        <p className="text-sm font-medium">Attempt #{completedAttempts.length + 1}</p>
                                        <Button size="sm" variant="link" onClick={handleStart} className="p-0 h-auto mt-1 text-primary">Resume</Button>
                                    </div>
                                )}
                                {completedAttempts.map((attempt: any, idx: number) => {
                                    const result = Array.isArray(attempt.result) ? attempt.result[0] : attempt.result
                                    return (
                                        <div key={attempt.id} className="p-4 hover:bg-muted/50 transition-colors group">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-sm font-medium">Attempt #{completedAttempts.length - idx}</span>
                                                <span className="text-sm font-bold">
                                                    {result?.score ?? 0}
                                                    <span className="text-xs text-muted-foreground font-normal">/{exam.total_marks}</span>
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-xs text-muted-foreground">{new Date(attempt.submitted_at).toLocaleDateString()}</span>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleViewResult(attempt)}
                                                >
                                                    View Details <ChevronRight className="h-3 w-3 ml-1" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                                No attempts yet. Good luck!
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
