"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import {
  Plus,
  Trash2,
  GripVertical,
  FileQuestion,
  Award,
  Hash,
  ChevronDown,
  Pencil,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MathJax } from "better-react-mathjax";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQuestionMutations } from "@/hooks/admin/exams/useQuestionMutations";
import EditQuestionModal from "./EditQuestionModal";

interface Props {
  questions: any[];
  isLoading: boolean;
  sectionId: string;
  onAddFromBank: () => void;
}

interface SortableQuestionProps {
  question: any;
  index: number;
  onRemove: (id: string) => void;
  onEdit: (question: any) => void;
}

function SortableQuestion({ question, index, onRemove, onEdit }: SortableQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1, // Ensure dragged item is on top
  };

  const getQuestionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      mcq: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      numerical: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
      subjective: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      nat: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      msq: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border-pink-200 dark:border-pink-800",
    };
    return colors[type?.toLowerCase()] || "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4 relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="group relative">
          {/* Drag Handle - Only visible on desktop hover */}
          <div
            {...attributes}
            {...listeners}
            className="absolute left-0 top-6 -translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-20 hidden md:flex items-center justify-center w-8 h-8"
          >
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <GripVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </div>
          </div>

          {/* Question Card */}
          <div className={cn(
            "relative overflow-hidden rounded-xl border transition-all duration-300",
            isOpen
              ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/10 dark:bg-indigo-900/10 shadow-md"
              : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg"
          )}>
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Question Number */}
                <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm border border-indigo-100 dark:border-indigo-800">
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header Badge Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className={cn("border font-medium", getQuestionTypeColor(question.question_type))}>
                      {question.question_type?.toUpperCase() || "QUESTION"}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                      <Award className="w-3 h-3 text-slate-500" />
                      <span>{question.marks} marks</span>
                    </Badge>
                    {question.subject && (
                      <Badge variant="outline" className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50">
                        {question.subject}
                      </Badge>
                    )}
                  </div>

                  {/* Question Text Trigger */}
                  <CollapsibleTrigger asChild>
                    <div className="cursor-pointer group/trigger select-none">
                      <div className="text-slate-900 dark:text-white font-medium text-lg leading-relaxed pr-8 relative prose dark:prose-invert max-w-none">
                        <MathJax key={question.question_text}>{question.question_text || "No question text"}</MathJax>
                        <ChevronDown className={cn(
                          "absolute right-0 top-1 w-5 h-5 text-slate-400 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )} />
                      </div>
                      {!isOpen && (
                        <p className="text-xs text-slate-400 mt-2 font-medium opacity-0 group-hover/trigger:opacity-100 transition-opacity">
                          Click to view details
                        </p>
                      )}
                    </div>
                  </CollapsibleTrigger>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onEdit(question); }}
                    className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                    title="Edit Question"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onRemove(question.id); }}
                    className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Remove Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded Content */}
              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50 space-y-6"
                >
                  {/* Options Section */}
                  {(question.question_type?.toLowerCase() === 'mcq' || question.question_type?.toLowerCase() === 'msq') && (
                    <div className="grid grid-cols-1 gap-3">
                      {question.options?.map((opt: any, idx: number) => {
                        const isCorrect = opt.is_correct || false;
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "p-3 rounded-lg border text-sm flex items-start gap-3 transition-colors",
                              isCorrect
                                ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
                                : "bg-slate-50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800"
                            )}
                          >
                            <div className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border shadow-sm",
                              isCorrect
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                                : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                            )}>
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <div className={cn("flex-1 pt-0.5 prose dark:prose-invert max-w-none text-sm", isCorrect ? "text-emerald-900 dark:text-emerald-200" : "text-slate-600 dark:text-slate-400")}>
                              <MathJax key={opt.text}>{opt.text}</MathJax>
                            </div>
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Correct Answer (for NAT/Subjective) */}
                  {(!['mcq', 'msq'].includes(question.question_type?.toLowerCase())) && (
                    <div className="bg-emerald-50/50 dark:bg-emerald-900/10 px-4 py-3 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                        Correct Answer / Key
                      </span>
                      <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 font-mono">
                        <MathJax key={question.correct_answer}>{question.correct_answer || "Not specified"}</MathJax>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 px-4 py-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                        <HelpCircle className="w-3 h-3" />
                        Explanation
                      </span>
                      <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed prose dark:prose-invert max-w-none">
                        <MathJax key={question.explanation}>{question.explanation}</MathJax>
                      </div>
                    </div>
                  )}
                </motion.div>
              </CollapsibleContent>
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}

export default function SectionQuestionsCard({
  questions,
  isLoading,
  sectionId,
  onAddFromBank
}: Props) {
  const { reorderQuestions, deleteQuestion } = useQuestionMutations(sectionId);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);

    const newOrder = arrayMove(questions, oldIndex, newIndex).map((q, idx) => ({
      ...q,
      question_order: idx
    }));
    reorderQuestions.mutate(newOrder);
  };

  const handleRemoveQuestion = (id: string) => {
    if (confirm("Are you sure you want to remove this question?")) {
      deleteQuestion.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-none shadow-xl bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Loading Questions...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  return (
    <>
      <Card className="border-none shadow-xl bg-white dark:bg-slate-800">
        <CardHeader className="border-b border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileQuestion className="w-6 h-6 text-indigo-600" />
                Section Questions
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 mt-2">
                {questions.length > 0 ? (
                  <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      {questions.length} {questions.length === 1 ? "question" : "questions"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {totalMarks} total marks
                    </span>
                  </span>
                ) : (
                  "No questions added yet. Drag to reorder."
                )}
              </CardDescription>
            </div>
            <Button onClick={onAddFromBank} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4" />
              Add from Bank
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {questions.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <FileQuestion className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">No questions yet</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                Use the "Add from Bank" button above to populate this section.
              </p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={questions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4 md:pl-8">
                  <LayoutGroup>
                    {questions.map((question, index) => (
                      <SortableQuestion
                        key={question.id}
                        question={question}
                        index={index}
                        onRemove={handleRemoveQuestion}
                        onEdit={setEditingQuestion}
                      />
                    ))}
                  </LayoutGroup>
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      <EditQuestionModal
        open={!!editingQuestion}
        onOpenChange={(open) => !open && setEditingQuestion(null)}
        question={editingQuestion}
        sectionId={sectionId}
      />
    </>
  );
}
