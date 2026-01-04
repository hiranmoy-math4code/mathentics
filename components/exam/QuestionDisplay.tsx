"use client"

import React, { memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Flag } from "lucide-react"
import { renderWithLatex } from "@/lib/renderWithLatex"

interface QuestionDisplayProps {
    question: any
    activeQuestionIdx: number
    response: any
    isMarked: boolean
    onSave: (qid: string, ans: any) => void
    onMark: (qid: string) => void
    onNext: () => void
    onPrev: () => void
    onClear: () => void
    onSubmit?: () => void  // NEW: Optional submit handler
    isFirst: boolean
    isLast: boolean
}

function QuestionDisplayComponent({
    question,
    activeQuestionIdx,
    response,
    isMarked,
    onSave,
    onMark,
    onNext,
    onPrev,
    onClear,
    onSubmit,  // NEW
    isFirst,
    isLast
}: QuestionDisplayProps) {

    if (!question) return null

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col min-h-0 bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
            >
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                        <div className="text-xs md:text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            Question {activeQuestionIdx + 1}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                            Marks: <span className="font-semibold text-emerald-500">+{question.marks}</span> |
                            Negative: <span className="font-semibold text-rose-500">-{question.negative_marks}</span>
                        </div>
                    </div>

                    <div className="text-base md:text-lg font-medium mb-6 leading-relaxed text-foreground select-none">
                        {renderWithLatex(question.question_text)}
                    </div>

                    {/* OPTIONS */}
                    <div className="space-y-3 pb-4">
                        {question.question_type === "MCQ" &&
                            question.options?.map((opt: any, idx: number) => {
                                const chosen = response === opt.id
                                const optionLabel = String.fromCharCode(65 + idx)
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => onSave(question.id, opt.id)}
                                        className={`w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 md:gap-4 group ${chosen
                                            ? "bg-primary/10 border-primary shadow-sm ring-1 ring-primary"
                                            : "bg-muted/30 border-border hover:border-primary hover:bg-muted/50"
                                            }`}
                                    >
                                        <div
                                            className={`w-7 h-7 md:w-8 md:h-8 rounded-full shrink-0 flex items-center justify-center text-xs md:text-sm font-bold transition-colors ${chosen
                                                ? "bg-primary text-primary-foreground"
                                                : "border border-muted-foreground/30 text-muted-foreground group-hover:border-primary group-hover:text-primary"
                                                }`}
                                        >
                                            {optionLabel}
                                        </div>
                                        <span className="text-sm md:text-base text-foreground group-hover:text-foreground">{renderWithLatex(opt.option_text)}</span>
                                    </button>
                                )
                            })}

                        {question.question_type === "MSQ" &&
                            question.options?.map((opt: any, idx: number) => {
                                const current = (Array.isArray(response) ? response : []) as string[]
                                const checked = current.includes(opt.id)
                                const optionLabel = String.fromCharCode(65 + idx)
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            const next = checked
                                                ? current.filter((x) => x !== opt.id)
                                                : [...current, opt.id]
                                            onSave(question.id, next)
                                        }}
                                        className={`w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-200 flex items-center gap-3 md:gap-4 group ${checked
                                            ? "bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-500"
                                            : "bg-muted/30 border-border hover:border-amber-500 hover:bg-muted/50"
                                            }`}
                                    >
                                        <div
                                            className={`w-6 h-6 rounded shrink-0 flex items-center justify-center text-xs md:text-sm font-bold transition-colors ${checked ? "bg-amber-500 text-white" : "border border-muted-foreground/30 text-muted-foreground group-hover:border-amber-500"
                                                }`}
                                        >
                                            {optionLabel}
                                        </div>
                                        <span className="text-sm md:text-base text-foreground group-hover:text-foreground">{renderWithLatex(opt.option_text)}</span>
                                    </button>
                                )
                            })}

                        {question.question_type === "NAT" && (
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-foreground mb-2">Your Answer:</label>
                                <input
                                    type="number"
                                    className="w-full max-w-md p-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm md:text-base"
                                    placeholder="Enter numeric value..."
                                    value={response || ""}
                                    onChange={(e) => onSave(question.id, e.target.value)}
                                    // Mobile Keyboard Fix: Scroll input into clear view
                                    onFocus={(e) => {
                                        setTimeout(() => {
                                            e.target.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                        }, 300); // Small delay to wait for keyboard animation
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Fixed ACTION BUTTONS Footer */}
                <div className="shrink-0 p-4 md:p-6 pt-4 border-t border-border bg-card/95 backdrop-blur-sm">
                    <div className="flex flex-wrap justify-between items-center gap-2 md:gap-3">
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={onPrev}
                                disabled={isFirst}
                                className="px-3 md:px-4 py-1.5 md:py-2 border border-border text-foreground rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors text-xs md:text-sm"
                            >
                                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Previous
                            </button>
                            <button
                                onClick={onClear}
                                disabled={!response || (Array.isArray(response) && response.length === 0)}
                                className="px-3 md:px-4 py-1.5 md:py-2 border border-border text-foreground rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs md:text-sm"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => onMark(question.id)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg flex items-center gap-2 transition-colors text-xs md:text-sm ${isMarked
                                    ? "bg-amber-500 text-white hover:bg-amber-600"
                                    : "border border-amber-500 text-amber-500 hover:bg-amber-500/10"
                                    }`}
                            >
                                <Flag className="w-3 h-3 md:w-4 md:h-4" /> {isMarked ? "Marked" : "Mark"}
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {isLast && onSubmit && (
                                <button
                                    onClick={onSubmit}
                                    className="px-4 md:px-6 py-1.5 md:py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-sm transition-colors text-xs md:text-sm flex items-center gap-2"
                                >
                                    <Flag className="w-3 h-3 md:w-4 md:h-4" />
                                    Submit Exam
                                </button>
                            )}
                            <button
                                onClick={onNext}
                                className="px-4 md:px-6 py-1.5 md:py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-colors text-xs md:text-sm"
                            >
                                {isLast ? "Review" : "Save & Next"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export const QuestionDisplay = memo(QuestionDisplayComponent)
