"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MathJax } from "better-react-mathjax";
import { Plus, Trash2, Save, Loader2, X, Pencil, FileQuestion, Award, LayoutList, CheckCircle2, HelpCircle } from "lucide-react";
import { useQuestionMutations } from "@/hooks/admin/exams/useQuestionMutations";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    question: any;
    sectionId: string;
}

export default function EditQuestionModal({ open, onOpenChange, question, sectionId }: Props) {
    const { updateQuestion } = useQuestionMutations(sectionId);
    const [formData, setFormData] = useState<any>(null);
    const [debouncedQuestionText, setDebouncedQuestionText] = useState("");
    const [debouncedExplanation, setDebouncedExplanation] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuestionText(formData?.question_text || "");
            setDebouncedExplanation(formData?.explanation || "");
        }, 500);
        return () => clearTimeout(timer);
    }, [formData?.question_text, formData?.explanation]);

    useEffect(() => {
        if (question) {
            // Robust deep copy and ensuring data structure
            const deepCopy = JSON.parse(JSON.stringify(question));
            setFormData({
                ...deepCopy,
                question_text: deepCopy.question_text || "",
                marks: deepCopy.marks || 0,
                negative_marks: deepCopy.negative_marks || 0,
                options: Array.isArray(deepCopy.options)
                    ? deepCopy.options.map((opt: any) => ({
                        ...opt,
                        text: opt.option_text || opt.text || "" // Map option_text to text for UI
                    }))
                    : [],
                explanation: deepCopy.explanation || "",
                correct_answer: deepCopy.correct_answer || ""
            });
        }
    }, [question]);

    if (!question || !formData) return null;

    const handleSave = () => {
        updateQuestion.mutate({
            questionId: question.id,
            updates: {
                question_text: formData.question_text,
                marks: Number(formData.marks) || 0,
                negative_marks: Number(formData.negative_marks) || 0,
                explanation: formData.explanation,
                options: formData.options,
                correct_answer: formData.correct_answer,
            }
        });
        onOpenChange(false);
    };

    const updateOption = (index: number, field: string, value: any) => {
        const newOptions = [...(formData.options || [])];
        newOptions[index] = { ...newOptions[index], [field]: value };
        setFormData({ ...formData, options: newOptions });
    };

    const addOption = () => {
        const newOptions = [...(formData.options || []), { text: "", is_correct: false }];
        setFormData({ ...formData, options: newOptions });
    };

    const removeOption = (index: number) => {
        const newOptions = (formData.options || []).filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, options: newOptions });
    };

    const qType = formData.question_type?.toLowerCase() || '';
    const isMcq = qType === 'mcq';
    const isMsq = qType === 'msq';
    const hasOptions = isMcq || isMsq;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-col h-[100dvh] p-0 gap-0 border-l shadow-2xl overflow-hidden">
                <SheetHeader className="px-6 py-6 border-b bg-white dark:bg-slate-950 z-10 shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <SheetTitle className="text-2xl font-bold flex items-center gap-3">
                                <Pencil className="w-6 h-6 text-indigo-500" />
                                Edit Question
                                <Badge variant="outline" className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 border-indigo-200">
                                    {(formData.question_type || 'QUESTION').toUpperCase()}
                                </Badge>
                            </SheetTitle>
                            <SheetDescription className="text-slate-500">
                                Modify question content, marks, and solution details.
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-1">
                    <div className="px-6 py-8 space-y-10 pb-24">
                        {/* Question Text Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <FileQuestion className="w-4 h-4 text-slate-400" />
                                    Question Text
                                </Label>
                                <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">LaTeX Supported</span>
                            </div>
                            <div className="space-y-3">
                                <Textarea
                                    value={formData.question_text || ""}
                                    onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                                    placeholder="Enter question text here..."
                                    className="min-h-[140px] font-mono text-sm resize-y focus:ring-2 focus:ring-indigo-500/20 transition-all border-slate-200"
                                />
                                {formData.question_text && (
                                    <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-widest font-bold">Live Preview</p>
                                        <div className="prose dark:prose-invert max-w-none text-base leading-relaxed overflow-hidden">
                                            <MathJax key={debouncedQuestionText}>{debouncedQuestionText}</MathJax>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Marks & Scoring */}
                        <div className="grid grid-cols-2 gap-8 p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800">
                            <div className="space-y-3">
                                <Label className="text-sm font-bold flex items-center gap-2">
                                    <Award className="w-4 h-4 text-emerald-500" />
                                    Correct Marks
                                </Label>
                                <Input
                                    type="number"
                                    value={formData.marks}
                                    onChange={(e) => setFormData({ ...formData, marks: parseFloat(e.target.value) })}
                                    className="h-11 text-lg font-semibold bg-white dark:bg-slate-950 focus:ring-emerald-500/20 border-slate-200"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-sm font-bold flex items-center gap-2">
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                    Negative Marks
                                </Label>
                                <Input
                                    type="number"
                                    value={formData.negative_marks}
                                    onChange={(e) => setFormData({ ...formData, negative_marks: parseFloat(e.target.value) })}
                                    className="h-11 text-lg font-semibold bg-white dark:bg-slate-950 focus:ring-red-500/20 border-slate-200"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

                        {/* Options Section */}
                        {hasOptions && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                        <LayoutList className="w-5 h-5 text-indigo-500" />
                                        Answer Options
                                    </Label>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addOption}
                                        className="h-9 gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-900 dark:hover:bg-indigo-950/30"
                                    >
                                        <Plus className="w-4 h-4" /> Add Option
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {formData.options?.map((option: any, index: number) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                key={index}
                                                className={cn(
                                                    "group relative flex gap-4 items-start p-5 border rounded-2xl transition-all duration-300",
                                                    option.is_correct
                                                        ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-800 shadow-sm"
                                                        : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800"
                                                )}
                                            >
                                                <div className="pt-2">
                                                    {isMcq ? (
                                                        <div
                                                            className={cn(
                                                                "w-6 h-6 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center shadow-sm",
                                                                option.is_correct
                                                                    ? "border-emerald-500 bg-emerald-500 scale-110"
                                                                    : "border-slate-300 dark:border-slate-600 hover:border-indigo-400 bg-white dark:bg-slate-950"
                                                            )}
                                                            onClick={() => {
                                                                const newOptions = formData.options.map((opt: any, i: number) => ({
                                                                    ...opt,
                                                                    is_correct: i === index
                                                                }));
                                                                setFormData({ ...formData, options: newOptions });
                                                            }}
                                                        >
                                                            {option.is_correct && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-inner" />}
                                                        </div>
                                                    ) : (
                                                        <Checkbox
                                                            checked={option.is_correct}
                                                            onCheckedChange={(checked) => updateOption(index, 'is_correct', checked)}
                                                            className="w-6 h-6 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <Input
                                                        value={option.text || ""}
                                                        onChange={(e) => updateOption(index, 'text', e.target.value)}
                                                        placeholder={"Option " + (index + 1)}
                                                        className="h-10 bg-transparent border-none text-base placeholder:text-slate-400 focus-visible:ring-0 p-0 shadow-none font-medium"
                                                    />
                                                    {option.text && (
                                                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 leading-relaxed text-sm italic">
                                                            <MathJax key={option.text}>{option.text}</MathJax>
                                                        </div>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                                                    onClick={() => removeOption(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}

                        {/* Correct Answer (Text) - for NAT/Subjective */}
                        {!hasOptions && (
                            <div className="space-y-4">
                                <Label className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    Correct Answer / Answer Key
                                </Label>
                                <Textarea
                                    value={formData.correct_answer || ""}
                                    onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                                    placeholder="Enter the correct value or key..."
                                    className="min-h-[100px] font-mono text-lg font-semibold bg-emerald-50/10 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900 focus:ring-emerald-500/20"
                                />
                            </div>
                        )}

                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

                        {/* Explanation Section */}
                        <div className="space-y-5">
                            <Label className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-indigo-500" />
                                Detailed Explanation
                            </Label>
                            <div className="space-y-4">
                                <Textarea
                                    value={formData.explanation || ""}
                                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                    placeholder="Provide a step-by-step solution..."
                                    className="min-h-[140px] focus:ring-indigo-500/20 border-slate-200"
                                />
                                {formData.explanation && (
                                    <div className="p-6 rounded-2xl bg-blue-50/30 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/50 shadow-inner">
                                        <p className="text-[10px] text-blue-500 mb-3 uppercase tracking-widest font-bold flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            Solution Preview
                                        </p>
                                        <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-700 dark:text-slate-300 overflow-hidden">
                                            <MathJax key={debouncedExplanation}>{debouncedExplanation}</MathJax>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="px-6 py-4 border-t bg-slate-50 dark:bg-slate-900/80 backdrop-blur-md z-10 flex flex-row sm:justify-between items-center gap-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} className="px-6 hover:bg-white dark:hover:bg-slate-800">
                        Discard Changes
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={updateQuestion.isPending}
                        className="min-w-[160px] h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all font-bold tracking-wide"
                    >
                        {updateQuestion.isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Question
                            </>
                        )}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
