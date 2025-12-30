"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
    CheckCircle2,
    XCircle,
    Download,
    ArrowLeft,
    Clock,
    Target,
    TrendingUp,
    AlertCircle,
    ChevronRight,
    User,
    Calendar,
    FileText,
    ExternalLink
} from "lucide-react";
import { useExamResult } from "@/hooks/useExamResult";
import ExamResultSkeleton from "@/components/skeletons/ExamResultSkeleton";
import Link from "next/link";
import { renderWithLatex } from "@/lib/renderWithLatex";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function AdminExamReviewPage() {
    const { attemptId } = useParams();
    const router = useRouter();
    const { data, isLoading, error } = useExamResult(attemptId as string);

    const stats = useMemo(() => {
        if (!data) return null;

        const { structured, responseMap } = data;
        let totalMarks = 0;
        let obtainedMarks = 0;
        let correct = 0;
        let wrong = 0;
        let unattempted = 0;
        let totalQuestions = 0;

        structured.forEach((section) =>
            section.questions.forEach((q: any) => {
                totalQuestions++;
                totalMarks += q.marks;
                const ans = responseMap[q.id];
                const neg = q.negative_marks ?? 0;
                let got = 0;

                // Check if question is unattempted
                const isUnattempted = !ans ||
                    (Array.isArray(ans) && ans.length === 0) ||
                    (typeof ans === 'string' && ans.trim() === '');

                if (isUnattempted) {
                    unattempted++;
                } else {
                    let isCorrect = false;
                    if (q.question_type === "MCQ") {
                        const c = q.options.find((o: any) => o.is_correct)?.id;
                        isCorrect = ans === c;
                    } else if (q.question_type === "MSQ") {
                        const c = q.options.filter((o: any) => o.is_correct).map((o: any) => o.id).sort();
                        const a = (ans as string[]).sort();
                        isCorrect = c.length === a.length && c.every((x: any, i: any) => x === a[i]);
                    } else if (q.question_type === "NAT") {
                        isCorrect = String(ans).trim() === String(q.correct_answer).trim();
                    }
                    if (isCorrect) {
                        got = q.marks;
                        correct++;
                    } else {
                        got = -Math.abs(neg);
                        wrong++;
                    }
                }
                q.obtained = got;
                obtainedMarks += got;
            })
        );

        const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100) : 0;
        const attemptedQuestions = correct + wrong;
        const accuracy = attemptedQuestions > 0 ? ((correct / attemptedQuestions) * 100) : 0;

        return {
            totalMarks,
            obtainedMarks,
            correct,
            wrong,
            unattempted,
            totalQuestions,
            percentage,
            accuracy
        };
    }, [data]);

    if (isLoading) return <ExamResultSkeleton />;

    if (error || !data || !stats) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <AlertCircle className="w-16 h-16 text-rose-500" />
                <h2 className="text-2xl font-bold text-rose-500">Failed to Load Review</h2>
                <p className="text-slate-600">This attempt might not exist or data is corrupted.</p>
                <Button onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
                </Button>
            </div>
        );
    }

    const { attempt, structured, responseMap } = data;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950/50 pb-20">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300">ADMIN AUDIT</Badge>
                                    <span className="text-xs text-slate-400">ID: {attemptId}</span>
                                </div>
                                <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white truncate max-w-md">
                                    Review: {attempt.exams.title}
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" onClick={() => window.print()} className="gap-2">
                                <Download className="w-4 h-4" /> Export Report
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Info & Stats Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Student Info Card */}
                    <Card className="lg:col-span-1 shadow-md border-slate-200 dark:border-slate-800 h-full">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" />
                                Student Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm">
                                    <Target className="w-4 h-4 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400">Score</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{stats.obtainedMarks.toFixed(2)} / {stats.totalMarks}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm">
                                    <Calendar className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400">Date</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{format(new Date(attempt.created_at), 'MMMM d, yyyy')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm">
                                    <Clock className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-black text-slate-400">Time Taken</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{attempt.time_spent ? `${Math.floor(attempt.time_spent / 60)}m ${attempt.time_spent % 60}s` : 'N/A'}</p>
                                </div>
                            </div>
                            <Link href={`/admin/students/${attempt.student_id}`} className="block">
                                <Button variant="secondary" className="w-full gap-2 mt-2">
                                    View Student Profile <ExternalLink className="w-3 h-3" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Stats Summary */}
                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Card className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-none shadow-lg">
                            <p className="text-white/80 text-xs font-black uppercase mb-1">Percentage</p>
                            <h3 className="text-4xl font-black">{stats.percentage.toFixed(1)}%</h3>
                        </Card>
                        <Card className="flex flex-col items-center justify-center p-6 border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm">
                            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase mb-1">Correct</p>
                            <h3 className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{stats.correct}</h3>
                            <p className="text-[10px] text-emerald-500">of {stats.totalQuestions} Questions</p>
                        </Card>
                        <Card className="flex flex-col items-center justify-center p-6 border-rose-100 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-900/10 shadow-sm">
                            <p className="text-rose-600 dark:text-rose-400 text-xs font-black uppercase mb-1">Wrong</p>
                            <h3 className="text-3xl font-black text-rose-700 dark:text-rose-300">{stats.wrong}</h3>
                            <p className="text-[10px] text-rose-500">Questions</p>
                        </Card>
                        <Card className="flex flex-col items-center justify-center p-6 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase mb-1">Accuracy</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats.accuracy.toFixed(1)}%</h3>
                            <p className="text-[10px] text-slate-400">Performance</p>
                        </Card>
                    </div>
                </div>

                {/* Audit Feed / Question Breakdown */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Question Breakdown
                        </h2>
                        <div className="h-0.5 flex-1 bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    {structured.map((section, sectionIdx) => (
                        <div key={section.id} className="space-y-6">
                            <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-black">
                                    {sectionIdx + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{section.title}</h3>
                                    <p className="text-xs text-slate-500">{section.questions.length} Questions in this section</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {section.questions.map((q: any, idx: number) => {
                                    const ans = responseMap[q.id];
                                    const isUnattempted = !ans || (Array.isArray(ans) && ans.length === 0) || String(ans).trim() === "";
                                    const obtained = q.obtained ?? 0;
                                    const isCorrect = obtained > 0;
                                    const status = isUnattempted ? "unattempted" : isCorrect ? "correct" : "incorrect";

                                    return (
                                        <div key={q.id} className="group relative">
                                            {/* Status Indicator Bar */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-all ${status === "correct" ? "bg-emerald-500" : status === "incorrect" ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-700"
                                                }`}></div>

                                            <Card className={`rounded-2xl border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all ${status === "correct" ? "bg-emerald-50/20 dark:bg-emerald-950/5" : status === "incorrect" ? "bg-rose-50/20 dark:bg-rose-950/5" : ""
                                                }`}>
                                                <div className="p-6">
                                                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                                                        <div className="flex-1">
                                                            <div className="flex items-start gap-3 mb-2">
                                                                <span className="shrink-0 w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-[10px] flex items-center justify-center mt-1 border border-slate-200 dark:border-slate-700">
                                                                    Q{idx + 1}
                                                                </span>
                                                                <div className="text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
                                                                    {renderWithLatex(q.question_text)}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mt-3 ml-9">
                                                                <Badge variant="outline" className="text-[10px] font-black">{q.question_type}</Badge>
                                                                <Badge variant="outline" className="text-[10px] font-black">+{q.marks} MARKS</Badge>
                                                                {q.negative_marks > 0 && <Badge variant="outline" className="text-[10px] font-black text-rose-500">-{q.negative_marks} NEGATIVE</Badge>}
                                                            </div>
                                                        </div>

                                                        <div className="text-right flex flex-col items-end gap-2">
                                                            <div className={`text-2xl font-black px-4 py-2 rounded-xl border shadow-sm ${obtained > 0 ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800" :
                                                                obtained < 0 ? "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800" :
                                                                    "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                                                                }`}>
                                                                {obtained > 0 ? `+${obtained}` : obtained}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 uppercase font-black tracking-tighter text-[10px]">
                                                                {status === "correct" && <><CheckCircle2 className="w-3 h-3 text-emerald-500" /> <span className="text-emerald-600">Verified Correct</span></>}
                                                                {status === "incorrect" && <><XCircle className="w-3 h-3 text-rose-500" /> <span className="text-rose-600">Incorrect Entry</span></>}
                                                                {status === "unattempted" && <><Clock className="w-3 h-3 text-slate-400" /> <span className="text-slate-500">Not Attempted</span></>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Options Audit */}
                                                    {q.question_type !== "NAT" && q.options && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                                            {q.options.map((opt: any, optIdx: number) => {
                                                                const chosen = Array.isArray(ans) ? ans.includes(opt.id) : ans === opt.id;
                                                                const correct = opt.is_correct;

                                                                return (
                                                                    <div key={opt.id} className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${correct && chosen ? "bg-emerald-50 border-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-700" :
                                                                        correct ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-800/50" :
                                                                            chosen ? "bg-rose-50 border-rose-400 dark:bg-rose-950/20 dark:border-rose-700" :
                                                                                "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
                                                                        }`}>
                                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                                            <span className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-sm transition-colors ${correct ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 dark:border-slate-700"
                                                                                }`}>
                                                                                {String.fromCharCode(65 + optIdx)}
                                                                            </span>
                                                                            <span className={`font-bold truncate ${correct ? "text-emerald-700 dark:text-emerald-300" : "text-slate-700 dark:text-slate-300"}`}>
                                                                                {renderWithLatex(opt.option_text)}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex shrink-0 ml-2">
                                                                            {chosen && (
                                                                                <Badge className={correct ? "bg-emerald-600" : "bg-rose-600"}>
                                                                                    {correct ? "Right Choice" : "Wrong Choice"}
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {/* NAT Audit */}
                                                    {q.question_type === "NAT" && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Student Answer</p>
                                                                <p className={`text-xl font-black ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>{ans || "—"}</p>
                                                            </div>
                                                            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
                                                                <p className="text-[10px] font-black text-emerald-500 uppercase mb-1">Correct Answer</p>
                                                                <p className="text-xl font-black text-emerald-700 dark:text-emerald-300">{q.correct_answer}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Explanation Audit */}
                                                    {q.explanation && (
                                                        <div className="mt-6 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/5 border border-indigo-100 dark:border-indigo-900/20">
                                                            <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-bold">
                                                                <AlertCircle className="w-4 h-4" />
                                                                Explanation Reference
                                                            </div>
                                                            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                                                {renderWithLatex(q.explanation)}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
