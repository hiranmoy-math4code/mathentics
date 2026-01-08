"use client"

import React, { memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle2, Bookmark, Eye } from "lucide-react"

interface QuestionPaletteProps {
    questions: any[]
    activeQuestionIdx: number
    responses: Record<string, any>
    marked: Record<string, boolean>
    visited: Record<string, boolean>
    onNavigate: (index: number) => void
    onSubmit: () => void
    sectionTitle?: string
    isMobileOpen: boolean
    onMobileClose: () => void
}

function QuestionPaletteComponent({
    questions,
    activeQuestionIdx,
    responses,
    marked,
    visited,
    onNavigate,
    onSubmit,
    sectionTitle,
    isMobileOpen,
    onMobileClose
}: QuestionPaletteProps) {

    const isAnswered = (qid: string) => {
        const val = responses[qid]
        return val !== undefined && val !== null && val !== "" && !(Array.isArray(val) && val.length === 0)
    }

    const getStatusClass = (qid: string, isActive: boolean) => {
        let cls = "bg-muted text-muted-foreground hover:bg-muted/80"

        if (isAnswered(qid)) {
            cls = "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600"
        } else if (marked[qid]) {
            cls = "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
        } else if (visited[qid]) {
            cls = "bg-primary/20 text-primary border border-primary hover:bg-primary/30"
        }

        if (isActive) {
            cls += " ring-2 ring-offset-1 ring-offset-card ring-primary scale-105"
        }

        return cls
    }

    const PaletteGrid = () => (
        <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
                const isMarkedQuestion = marked[q.id]
                const isAnsweredQuestion = isAnswered(q.id)

                return (
                    <button
                        key={q.id}
                        onClick={() => {
                            onNavigate(idx)
                            if (isMobileOpen) onMobileClose()
                        }}
                        className={`relative h-10 w-full rounded-lg text-sm font-semibold transition-all duration-200 ${getStatusClass(q.id, idx === activeQuestionIdx)}`}
                        aria-label={`Question ${idx + 1}${isMarkedQuestion ? ' (Marked for Review)' : ''}`}
                    >
                        {idx + 1}
                        {/* ✅ Flag icon for marked questions (shows even when answered) */}
                        {isMarkedQuestion && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center shadow-sm">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 6l3-3v12l-3 3V6zm4-3l10 4-10 4V3z" />
                                </svg>
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )

    // Desktop View
    const DesktopView = (
        <div className="hidden lg:flex flex-col bg-card border-l border-border overflow-hidden h-full">
            <div className="p-5 border-b border-border">
                <h4 className="font-bold text-foreground">Question Palette</h4>
                {sectionTitle && (
                    <p className="text-sm text-muted-foreground mt-1 font-medium">{sectionTitle}</p>
                )}
                <div className="flex gap-y-2 gap-x-4 mt-4 text-xs text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500"></div> Answered</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500"></div> Marked</div>
                    <div className="flex items-center gap-1">
                        <div className="relative w-3 h-3 rounded bg-emerald-500">
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-500 rounded-full"></span>
                        </div>
                        Ans+Mark
                    </div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary/20 border border-primary"></div> Visited</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-muted"></div> Unvisited</div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <PaletteGrid />
            </div>

            <div className="p-5 border-t border-border bg-background">
                <button
                    onClick={onSubmit}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold shadow-sm transition-colors active:scale-[0.98]"
                >
                    Submit Exam
                </button>
            </div>
        </div>
    )

    // Mobile Drawer
    const MobileView = (
        <AnimatePresence>
            {isMobileOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onMobileClose}
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-80 bg-card shadow-2xl border-l border-border lg:hidden flex flex-col"
                    >
                        <div className="p-4 flex items-center justify-between border-b border-border">
                            <div>
                                <h4 className="font-bold text-foreground">Question Palette</h4>
                                {sectionTitle && (
                                    <p className="text-sm text-muted-foreground mt-0.5 font-medium">{sectionTitle}</p>
                                )}
                            </div>
                            <button onClick={onMobileClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <PaletteGrid />
                        </div>
                        <div className="p-4 border-t border-border bg-background">
                            <button
                                onClick={onSubmit}
                                className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold active:scale-[0.98] transition-transform"
                            >
                                Submit Exam
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    return (
        <>
            {DesktopView}
            {MobileView}
        </>
    )
}

export const QuestionPalette = memo(QuestionPaletteComponent)
