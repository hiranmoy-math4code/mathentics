import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check, X, Plus, Trash2 } from "lucide-react";

interface QuestionEditorProps {
    question: {
        title: string;
        question_text: string;
        question_type: "MCQ" | "MSQ" | "NAT";
        marks: number;
        negative_marks: number;
        topic?: string | null;
        difficulty?: "easy" | "medium" | "hard";
        options: { text: string; is_correct: boolean }[];
        correct_answer?: string | null;
        explanation?: string | null;
    };
    onSave: (updatedQuestion: any) => void;
    onCancel: () => void;
}

export function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
    const [editedQuestion, setEditedQuestion] = useState(question);

    const handleOptionChange = (index: number, text: string) => {
        const newOptions = [...editedQuestion.options];
        newOptions[index] = { ...newOptions[index], text };
        setEditedQuestion({ ...editedQuestion, options: newOptions });
    };

    const toggleCorrectAnswer = (index: number) => {
        const newOptions = editedQuestion.options.map((opt, i) => ({
            ...opt,
            is_correct: editedQuestion.question_type === "MCQ"
                ? i === index
                : i === index ? !opt.is_correct : opt.is_correct
        }));
        setEditedQuestion({ ...editedQuestion, options: newOptions });
    };

    const addOption = () => {
        setEditedQuestion({
            ...editedQuestion,
            options: [...editedQuestion.options, { text: "", is_correct: false }]
        });
    };

    const removeOption = (index: number) => {
        setEditedQuestion({
            ...editedQuestion,
            options: editedQuestion.options.filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300">Editing Question</h4>
                <div className="flex gap-2">
                    <Button size="sm" onClick={() => onSave(editedQuestion)} className="bg-green-600 hover:bg-green-700">
                        <Check className="w-4 h-4 mr-1" />
                        Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={onCancel}>
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                    </Button>
                </div>
            </div>

            {/* Title */}
            <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Question Title</label>
                <Input
                    value={editedQuestion.title}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
                    className="mt-1"
                    placeholder="Enter question title..."
                />
            </div>

            {/* Question Text */}
            <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Question Text</label>
                <Textarea
                    value={editedQuestion.question_text}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, question_text: e.target.value })}
                    className="mt-1 min-h-[100px]"
                    placeholder="Enter question text..."
                />
            </div>

            {/* Marks and Settings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Marks</label>
                    <Input
                        type="number"
                        value={editedQuestion.marks}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, marks: Number(e.target.value) })}
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Negative Marks</label>
                    <Input
                        type="number"
                        step="0.25"
                        value={editedQuestion.negative_marks}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, negative_marks: Number(e.target.value) })}
                        className="mt-1"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
                    <select
                        value={editedQuestion.difficulty || "easy"}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, difficulty: e.target.value as any })}
                        className="mt-1 w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-sm"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Topic</label>
                    <Input
                        value={editedQuestion.topic || ""}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, topic: e.target.value })}
                        className="mt-1"
                        placeholder="Topic..."
                    />
                </div>
            </div>

            {/* Options (for MCQ/MSQ) */}
            {editedQuestion.question_type !== "NAT" && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Options</label>
                        <Button size="sm" variant="outline" onClick={addOption}>
                            <Plus className="w-4 h-4 mr-1" />
                            Add Option
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {editedQuestion.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                                    {String.fromCharCode(65 + i)}
                                </Badge>
                                <Input
                                    value={opt.text}
                                    onChange={(e) => handleOptionChange(i, e.target.value)}
                                    className="flex-1"
                                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                />
                                <Button
                                    size="sm"
                                    variant={opt.is_correct ? "default" : "outline"}
                                    onClick={() => toggleCorrectAnswer(i)}
                                    className={opt.is_correct ? "bg-green-600 hover:bg-green-700" : ""}
                                >
                                    <Check className="w-4 h-4" />
                                </Button>
                                {editedQuestion.options.length > 2 && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeOption(i)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* NAT Answer */}
            {editedQuestion.question_type === "NAT" && (
                <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Correct Answer</label>
                    <Input
                        value={editedQuestion.correct_answer || ""}
                        onChange={(e) => setEditedQuestion({ ...editedQuestion, correct_answer: e.target.value })}
                        className="mt-1"
                        placeholder="Enter numerical answer..."
                    />
                </div>
            )}

            {/* Explanation */}
            <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Explanation</label>
                <Textarea
                    value={editedQuestion.explanation || ""}
                    onChange={(e) => setEditedQuestion({ ...editedQuestion, explanation: e.target.value })}
                    className="mt-1 min-h-[100px]"
                    placeholder="Enter explanation (supports LaTeX)..."
                />
                <p className="text-xs text-slate-500 mt-1">
                    You can use LaTeX math: $x^2$ for inline, $$x^2$$ for display
                </p>
            </div>
        </div>
    );
}
