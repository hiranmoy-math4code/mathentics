"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Calendar, Eye, EyeOff, Clock, Lock } from "lucide-react";
import { Exam } from "@/lib/types";

interface ExamSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    examId: string;
    onSettingsUpdated?: (exam: Exam) => void;
}

export function ExamSettingsDialog({
    open,
    onOpenChange,
    examId,
    onSettingsUpdated
}: ExamSettingsDialogProps) {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [exam, setExam] = useState<Exam | null>(null);

    // Form state - Result visibility
    const [resultVisibility, setResultVisibility] = useState<"immediate" | "scheduled" | "manual">("immediate");
    const [releaseDate, setReleaseDate] = useState("");
    const [releaseTime, setReleaseTime] = useState("");
    const [showAnswers, setShowAnswers] = useState(true);

    // Form state - Exam scheduling
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");

    // Form state - Sequential access
    const [sequentialUnlockEnabled, setSequentialUnlockEnabled] = useState(false);

    // Form state - Exam scheduling toggle
    const [isSchedulingEnabled, setIsSchedulingEnabled] = useState(false);

    // Form state - Max attempts
    const [maxAttempts, setMaxAttempts] = useState<number | null>(null);

    const supabase = createClient();

    useEffect(() => {
        if (open && examId) {
            fetchExamSettings();
        }
    }, [open, examId]);

    const fetchExamSettings = async () => {
        try {
            setLoading(true);

            // Fetch exam data
            const { data, error } = await supabase
                .from("exams")
                .select("*")
                .eq("id", examId)
                .single();

            if (error) throw error;

            // Set exam settings
            setExam(data);
            setResultVisibility((data as any).result_visibility || "immediate");
            setShowAnswers((data as any).show_answers ?? true);

            // Result release time
            if ((data as any).result_release_time) {
                const date = new Date((data as any).result_release_time);
                setReleaseDate(date.toISOString().split('T')[0]);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                setReleaseTime(`${hours}:${minutes}`);
            } else {
                setReleaseDate("");
                setReleaseTime("");
            }

            // Exam start time
            if (data.start_time) {
                const date = new Date(data.start_time);
                setStartDate(date.toISOString().split('T')[0]);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                setStartTime(`${hours}:${minutes}`);
            } else {
                setStartDate("");
                setStartTime("");
            }

            // Exam end time
            if (data.end_time) {
                const date = new Date(data.end_time);
                setEndDate(date.toISOString().split('T')[0]);
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                setEndTime(`${hours}:${minutes}`);
            } else {
                setEndDate("");
                setEndTime("");
            }

            // Load sequential unlock from LESSONS table (not exams!)
            const { data: lessonData } = await supabase
                .from("lessons")
                .select("sequential_unlock_enabled")
                .eq("exam_id", examId)
                .eq("content_type", "quiz")
                .single();

            setSequentialUnlockEnabled(lessonData?.sequential_unlock_enabled || false);

            // Load max_attempts
            setMaxAttempts(data.max_attempts ?? null);

            // Set scheduling enabled if start or end time exists
            setIsSchedulingEnabled(!!(data.start_time || data.end_time));

        } catch (error) {
            console.error("Error fetching exam settings:", error);
            toast.error("Failed to load exam settings");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            let releaseTimestamp = null;
            let startTimestamp = null;
            let endTimestamp = null;

            // Validate result release time
            if (resultVisibility === "scheduled") {
                if (!releaseDate || !releaseTime) {
                    toast.error("Please select both date and time for scheduled release");
                    setSaving(false);
                    return;
                }
                releaseTimestamp = new Date(`${releaseDate}T${releaseTime}`).toISOString();
            }

            // Validate exam start/end time only if scheduling is enabled
            if (isSchedulingEnabled) {
                if (startDate && startTime) {
                    startTimestamp = new Date(`${startDate}T${startTime}`).toISOString();
                } else if (startDate || startTime) {
                    toast.error("Please select both date and time for exam start");
                    setSaving(false);
                    return;
                }

                if (endDate && endTime) {
                    endTimestamp = new Date(`${endDate}T${endTime}`).toISOString();
                } else if (endDate || endTime) {
                    toast.error("Please select both date and time for exam end");
                    setSaving(false);
                    return;
                }

                // Validate start time is before end time
                if (startTimestamp && endTimestamp && new Date(startTimestamp) >= new Date(endTimestamp)) {
                    toast.error("Exam start time must be before end time");
                    setSaving(false);
                    return;
                }
            }

            // Handle sequential unlock for ALL lessons using this exam
            // Find all lessons that use this exam
            const { data: allLessonsWithExam, error: currentLessonError } = await supabase
                .from("lessons")
                .select("id, title, lesson_order, module_id, modules(course_id, module_order, title)")
                .eq("exam_id", examId)
                .eq("content_type", "quiz");

            if (currentLessonError) {
                console.error("Error fetching current lesson:", currentLessonError);
            }

            if (!allLessonsWithExam || allLessonsWithExam.length === 0) {
                toast.error("This exam is not linked to any lesson in a course");
                setSaving(false);
                return;
            }

            // Process each lesson separately
            for (const currentLesson of allLessonsWithExam) {
                if (!(currentLesson as any).modules?.course_id) {
                    console.warn("⚠️ Lesson has no course:", currentLesson);
                    continue;
                }

                const currentLessonId = currentLesson.id;
                const courseId = (currentLesson as any).modules.course_id;
                const courseName = (currentLesson as any).modules.title;
                let prerequisiteLessonId: string | null = null;

                if (sequentialUnlockEnabled) {
                    // TOGGLE ON: Find previous quiz lesson
                    const currentModuleOrder = (currentLesson as any).modules.module_order;
                    const currentLessonOrder = currentLesson.lesson_order;

                    // Get ALL quiz lessons in this course
                    const { data: allQuizLessons, error: lessonsError } = await supabase
                        .from("lessons")
                        .select(`
                            id,
                            exam_id,
                            lesson_order,
                            module_id,
                            title,
                            modules!inner(course_id, module_order)
                        `)
                        .eq("content_type", "quiz")
                        .not("exam_id", "is", null)
                        .eq("modules.course_id", courseId);

                    if (lessonsError) {
                        console.error("Error fetching quiz lessons:", lessonsError);
                    }

                    if (allQuizLessons && allQuizLessons.length > 1) {
                        // Sort quiz lessons by module order, then lesson order
                        const sortedLessons = allQuizLessons.sort((a: any, b: any) => {
                            if (a.modules.module_order !== b.modules.module_order) {
                                return a.modules.module_order - b.modules.module_order;
                            }
                            return a.lesson_order - b.lesson_order;
                        });

                        // Find current lesson index
                        const currentIndex = sortedLessons.findIndex((l: any) => l.id === currentLessonId);

                        // If there's a previous quiz lesson, use it as prerequisite
                        if (currentIndex > 0) {
                            prerequisiteLessonId = sortedLessons[currentIndex - 1].id;
                        }
                    }
                } else {
                    // TOGGLE OFF: Clear prerequisite
                    prerequisiteLessonId = null;
                }

                // Update this specific lesson
                const { error: lessonError } = await supabase
                    .from("lessons")
                    .update({
                        prerequisite_lesson_id: prerequisiteLessonId,
                        sequential_unlock_enabled: sequentialUnlockEnabled,
                    })
                    .eq("id", currentLessonId);

                if (lessonError) {
                    console.error(`Error updating lesson in ${courseName}:`, lessonError);
                }
            } // End of for loop


            // Update EXAM settings (start/end time, result visibility, etc.)
            const examUpdates: any = {
                result_visibility: resultVisibility,
                result_release_time: releaseTimestamp,
                show_answers: showAnswers,
                start_time: startTimestamp,
                end_time: endTimestamp,
                max_attempts: maxAttempts,
                updated_at: new Date().toISOString(),
            };

            const { error: examError } = await supabase
                .from("exams")
                .update(examUpdates)
                .eq("id", examId);

            if (examError) throw examError;

            toast.success("Exam settings updated");
            // Re-fetch the exam to get the updated lesson data for onSettingsUpdated
            const { data: updatedExamData, error: fetchError } = await supabase
                .from("exams")
                .select("*, lessons(prerequisite_lesson_id, sequential_unlock_enabled)")
                .eq("id", examId)
                .single();

            if (fetchError) {
                console.error("Error re-fetching exam after update:", fetchError);
                toast.error("Failed to re-fetch exam data after update.");
            } else if (onSettingsUpdated) {
                onSettingsUpdated(updatedExamData as Exam);
            }
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving exam settings:", JSON.stringify(error, null, 2));
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] max-h-[85vh] p-0 gap-0 dark:bg-slate-900 dark:border-slate-800">
                {/* Header - Fixed */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b dark:border-slate-800">
                    <DialogTitle className="text-xl font-semibold dark:text-white">Exam Settings</DialogTitle>
                    <DialogDescription className="text-sm dark:text-slate-400 mt-1">
                        Configure scheduling, prerequisites, and visibility
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                    </div>
                ) : (
                    <>
                        {/* Scrollable Content */}
                        <div className="overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar" style={{ maxHeight: 'calc(85vh - 180px)' }}>

                            {/* Exam Scheduling Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <h3 className="text-sm font-semibold dark:text-white">Exam Scheduling</h3>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Set when students can access this exam
                                </p>

                                {/* Scheduling Toggle */}
                                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                                    <div className="flex-1">
                                        <Label className="text-sm font-medium dark:text-blue-300">Enable Scheduling</Label>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                            Set specific start and end times for this exam
                                        </p>
                                    </div>
                                    <Switch
                                        checked={isSchedulingEnabled}
                                        onCheckedChange={(checked) => {
                                            setIsSchedulingEnabled(checked);
                                            if (!checked) {
                                                // Clear dates when disabled
                                                setStartDate("");
                                                setStartTime("");
                                                setEndDate("");
                                                setEndTime("");
                                            }
                                        }}
                                    />
                                </div>

                                {isSchedulingEnabled && (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-medium dark:text-slate-300">Start Date</Label>
                                                <Input
                                                    type="date"
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                    className="h-9 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-medium dark:text-slate-300">Start Time</Label>
                                                <Input
                                                    type="time"
                                                    value={startTime}
                                                    onChange={(e) => setStartTime(e.target.value)}
                                                    className="h-9 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-medium dark:text-slate-300">End Date</Label>
                                                <Input
                                                    type="date"
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                    className="h-9 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-medium dark:text-slate-300">End Time</Label>
                                                <Input
                                                    type="time"
                                                    value={endTime}
                                                    onChange={(e) => setEndTime(e.target.value)}
                                                    className="h-9 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                        {(startDate || endDate) && (
                                            <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-3 py-2 rounded-md">
                                                {startDate && !endDate && "Accessible from start date onwards"}
                                                {!startDate && endDate && "Accessible until end date"}
                                                {startDate && endDate && "Accessible between specified dates"}
                                            </p>
                                        )}
                                    </>
                                )}

                                {!isSchedulingEnabled && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-md">
                                        Exam is accessible anytime without time restrictions
                                    </p>
                                )}
                            </div>

                            {/* Prerequisites Section */}
                            <div className="space-y-3 pt-3 border-t dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Lock className="h-4 w-4 text-purple-500" />
                                    <h3 className="text-sm font-semibold dark:text-white">Sequential Access</h3>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Control exam access order for students
                                </p>

                                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900/50">
                                    <div className="flex-1">
                                        <Label className="text-sm font-medium dark:text-purple-300">Require Previous Exam Completion</Label>
                                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                                            Students must complete the previous exam in this course before accessing this one
                                        </p>
                                    </div>
                                    <Switch
                                        checked={sequentialUnlockEnabled}
                                        onCheckedChange={setSequentialUnlockEnabled}
                                    />
                                </div>

                                {sequentialUnlockEnabled && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                                        <p className="text-xs text-blue-700 dark:text-blue-300">
                                            ℹ️ <strong>How it works:</strong> Students can only start this exam after successfully submitting the previous exam in the course lesson order.
                                        </p>
                                    </div>
                                )}

                                {!sequentialUnlockEnabled && (
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <p className="text-xs text-slate-600 dark:text-slate-400">
                                            Students can access this exam anytime, regardless of other exam completion.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Result Visibility Section */}
                            <div className="space-y-3 pt-3 border-t dark:border-slate-800">
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-green-500" />
                                    <h3 className="text-sm font-semibold dark:text-white">Result Visibility</h3>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Control when students see their results
                                </p>

                                <Select
                                    value={resultVisibility}
                                    onValueChange={(value: any) => setResultVisibility(value)}
                                >
                                    <SelectTrigger className="h-9 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                        <SelectItem value="immediate" className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <Eye className="h-3.5 w-3.5 text-green-500" />
                                                <span>Immediate</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="scheduled" className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-blue-500" />
                                                <span>Scheduled</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="manual" className="text-sm">
                                            <div className="flex items-center gap-2">
                                                <EyeOff className="h-3.5 w-3.5 text-orange-500" />
                                                <span>Manual Release</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {resultVisibility === "scheduled" && (
                                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium dark:text-slate-300">Release Date</Label>
                                            <Input
                                                type="date"
                                                value={releaseDate}
                                                onChange={(e) => setReleaseDate(e.target.value)}
                                                className="h-9 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-medium dark:text-slate-300">Release Time</Label>
                                            <Input
                                                type="time"
                                                value={releaseTime}
                                                onChange={(e) => setReleaseTime(e.target.value)}
                                                className="h-9 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-2 rounded-md">
                                    {resultVisibility === "immediate" && "Results shown immediately after submission"}
                                    {resultVisibility === "scheduled" && "Results hidden until specified date and time"}
                                    {resultVisibility === "manual" && "Results hidden until manually released"}
                                </p>
                            </div>

                            {/* Show Answers Toggle */}
                            <div className="flex items-center justify-between pt-3 border-t dark:border-slate-800">
                                <div className="flex-1">
                                    <Label className="text-sm font-medium dark:text-white">Show Answers</Label>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        Display correct answers to students
                                    </p>
                                </div>
                                <Switch
                                    checked={showAnswers}
                                    onCheckedChange={setShowAnswers}
                                />
                            </div>

                            {/* Max Attempts */}
                            <div className="space-y-2 pt-3 border-t dark:border-slate-800">
                                <Label className="text-sm font-medium dark:text-white">Maximum Attempts</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={maxAttempts ?? ""}
                                    onChange={(e) => setMaxAttempts(e.target.value ? parseInt(e.target.value) : null)}
                                    placeholder="Unlimited"
                                    className="h-9 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Leave empty for unlimited attempts. Set a number to limit how many times students can take this exam.
                                </p>
                            </div>
                        </div>

                        {/* Footer - Fixed */}
                        <DialogFooter className="px-6 py-4 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="dark:bg-transparent dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={saving || loading}
                                className="bg-primary hover:bg-primary/90"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Settings"
                                )}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
