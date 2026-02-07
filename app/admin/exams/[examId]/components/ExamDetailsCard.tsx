"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getTenantId } from "@/lib/tenant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Clock,
  Award,
  TrendingDown,
  Edit3,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  textarea?: boolean;
  rows?: number;
  step?: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function ExamDetailsCard() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const examId = params.examId as string;



  const [exam, setExam] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    duration_minutes: "",
    total_marks: "",
    negative_marking: "",
    start_time: "",
    end_time: "",
    result_visibility: "immediate",
    result_release_time: "",
    show_answers: false,
    max_attempts: "",
    is_practice: false,
    allow_pause: true,
  });

  const loadExamData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: examData, error } = await supabase
      .from("exams")
      .select("*")
      .eq("id", examId)
      .single();

    if (!error && examData) {
      setExam(examData);
      setEditData({
        title: examData.title,
        description: examData.description || "",
        duration_minutes: examData.duration_minutes?.toString() || "",
        total_marks: examData.total_marks?.toString() || "",
        negative_marking: examData.negative_marking?.toString() || "0",
        start_time: examData.start_time ? new Date(examData.start_time).toISOString().slice(0, 16) : "",
        end_time: examData.end_time ? new Date(examData.end_time).toISOString().slice(0, 16) : "",
        result_visibility: examData.result_visibility || "immediate",
        result_release_time: examData.result_release_time ? new Date(examData.result_release_time).toISOString().slice(0, 16) : "",
        show_answers: examData.show_answers || false,
        max_attempts: examData.max_attempts?.toString() || "",
        is_practice: examData.is_practice || false,
        allow_pause: examData.allow_pause ?? true,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadExamData();
  }, [examId]);


  const handleUpdateExam = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const supabase = createClient();

      const updatePayload: any = {
        title: editData.title,
        description: editData.description,
        duration_minutes: Number(editData.duration_minutes),
        total_marks: Number(editData.total_marks),
        negative_marking: Number(editData.negative_marking),
        start_time: editData.start_time ? new Date(editData.start_time).toISOString() : null,
        end_time: editData.end_time ? new Date(editData.end_time).toISOString() : null,
        result_visibility: editData.result_visibility,
        show_answers: editData.show_answers,
        max_attempts: editData.max_attempts ? Number(editData.max_attempts) : null,
        is_practice: editData.is_practice,
        allow_pause: editData.allow_pause,
      };

      if (editData.result_visibility === 'scheduled' && editData.result_release_time) {
        updatePayload.result_release_time = new Date(editData.result_release_time).toISOString();
      } else {
        updatePayload.result_release_time = null;
      }

      const { error: updateError } = await supabase
        .from("exams")
        .update(updatePayload)
        .eq("id", examId);

      if (updateError) throw updateError;

      setEditMode(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      await loadExamData();

      const tenantId = getTenantId();
      // Invalidate exams list cache explicitly
      await queryClient.invalidateQueries({
        queryKey: ["exams", tenantId],
        exact: true,
        refetchType: 'all'
      });
      // Also invalidate fuzzy match just in case
      await queryClient.invalidateQueries({ queryKey: ["exams"] });

      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update exam");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishExam = async () => {
    try {
      setIsPublishing(true);
      setError(null);
      setShowPublishConfirm(false);

      const supabase = createClient();

      // Update exam status to published
      const { error: updateError } = await supabase
        .from("exams")
        .update({ status: "published" })
        .eq("id", examId);

      if (updateError) throw updateError;

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      await loadExamData();
    } catch (err: any) {
      setError(err.message || "Failed to publish exam");
    } finally {
      setIsPublishing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string; color: string }> = {
      draft: { variant: "secondary", label: "Draft", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
      published: { variant: "default", label: "Published", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      archived: { variant: "outline", label: "Archived", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    };
    const config = variants[status] || variants.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  if (isLoading) return null;

  return (
    <>
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm font-medium text-green-700 dark:text-green-300">
              Exam updated successfully!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="border-none shadow-xl bg-white dark:bg-slate-800 overflow-hidden">
        {/* Header with gradient */}
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white cursor-pointer"
          onClick={() => !editMode && setIsCollapsed(!isCollapsed)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-6 h-6" />
                <CardTitle className="text-2xl font-bold text-white">
                  {exam?.title || "Exam Details"}
                </CardTitle>
                {exam?.status && getStatusBadge(exam.status)}
                {exam?.is_practice && <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Practice</Badge>}
              </div>
              <CardDescription className="text-indigo-100">
                {editMode ? "Edit exam information below" : "View and manage exam configuration"}
              </CardDescription>
            </div>
            <div className="flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
              {editMode ? (
                <>
                  <Button
                    onClick={handleUpdateExam}
                    disabled={isSaving}
                    className="bg-white text-indigo-600 hover:bg-indigo-50"
                  >
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      setError(null);
                    }}
                    disabled={isSaving}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setEditData({
                        title: exam.title,
                        description: exam.description || "",
                        duration_minutes: exam.duration_minutes?.toString() || "",
                        total_marks: exam.total_marks?.toString() || "",
                        negative_marking: exam.negative_marking?.toString() || "0",
                        start_time: exam.start_time ? new Date(exam.start_time).toISOString().slice(0, 16) : "",
                        end_time: exam.end_time ? new Date(exam.end_time).toISOString().slice(0, 16) : "",
                        result_visibility: exam.result_visibility || "immediate",
                        result_release_time: exam.result_release_time ? new Date(exam.result_release_time).toISOString().slice(0, 16) : "",
                        show_answers: exam.show_answers || false,
                        max_attempts: exam.max_attempts?.toString() || "",
                        is_practice: exam.is_practice || false,
                        allow_pause: exam.allow_pause ?? true,
                      });
                      setEditMode(true);
                      setIsCollapsed(false); // Ensure expanded when editing
                    }}
                    className="bg-white text-indigo-600 hover:bg-indigo-50"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {exam?.status === "draft" && (
                    <Button
                      onClick={handlePublishExam}
                      disabled={isPublishing}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isPublishing ? (
                        <>Publishing...</>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4 mr-2" />
                          Publish
                        </>
                      )}
                    </Button>
                  )}
                  {/* Chevron for explicit collapse/expand */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCollapsed(!isCollapsed);
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <motion.div
                      animate={{ rotate: isCollapsed ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="p-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {editMode ? (
                  <div className="space-y-6">
                    <FormField
                      label="Exam Title"
                      value={editData.title}
                      onChange={(v) => setEditData({ ...editData, title: v })}
                      icon={<FileText className="w-5 h-5 text-slate-400" />}
                      description="The main title of your exam"
                    />
                    <FormField
                      label="Description"
                      value={editData.description}
                      onChange={(v) => setEditData({ ...editData, description: v })}
                      textarea
                      rows={3}
                      description="Optional: Provide additional context about the exam"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Duration (minutes)"
                        value={editData.duration_minutes}
                        onChange={(v) => setEditData({ ...editData, duration_minutes: v })}
                        type="number"
                        icon={<Clock className="w-5 h-5 text-slate-400" />}
                      />
                      <FormField
                        label="Total Marks"
                        value={editData.total_marks}
                        onChange={(v) => setEditData({ ...editData, total_marks: v })}
                        type="number"
                        icon={<Award className="w-5 h-5 text-slate-400" />}
                      />
                      {/* Passing Marks removed */}

                      <FormField
                        label="Negative Marking"
                        value={editData.negative_marking}
                        onChange={(v) => setEditData({ ...editData, negative_marking: v })}
                        type="number"
                        step="0.25"
                        icon={<TrendingDown className="w-5 h-5 text-slate-400" />}
                        description="Marks deducted per incorrect answer"
                      />
                      <FormField
                        label="Start Time"
                        value={editData.start_time}
                        onChange={(v) => setEditData({ ...editData, start_time: v })}
                        type="datetime-local"
                        icon={<Calendar className="w-5 h-5 text-slate-400" />}
                      />
                      <FormField
                        label="End Time"
                        value={editData.end_time}
                        onChange={(v) => setEditData({ ...editData, end_time: v })}
                        type="datetime-local"
                        icon={<Calendar className="w-5 h-5 text-slate-400" />}
                      />

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Result Visibility</Label>
                        <select
                          value={editData.result_visibility}
                          onChange={(e) => setEditData({ ...editData, result_visibility: e.target.value })}
                          className="w-full flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-white"
                        >
                          <option value="immediate">Immediate</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="manual">Manual</option>
                        </select>
                      </div>
                      {editData.result_visibility === 'scheduled' && (
                        <FormField
                          label="Result Release Time"
                          value={editData.result_release_time}
                          onChange={(v) => setEditData({ ...editData, result_release_time: v })}
                          type="datetime-local"
                          icon={<Calendar className="w-5 h-5 text-slate-400" />}
                        />
                      )}
                      <FormField
                        label="Max Attempts"
                        value={editData.max_attempts}
                        onChange={(v) => setEditData({ ...editData, max_attempts: v })}
                        type="number"
                        icon={<Award className="w-5 h-5 text-slate-400" />}
                      />

                      <div className="flex flex-col space-y-3 pt-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="show_answers"
                            checked={editData.show_answers}
                            onChange={(e) => setEditData({ ...editData, show_answers: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <Label htmlFor="show_answers" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Show Answers after submission
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="is_practice"
                            checked={editData.is_practice}
                            onChange={(e) => setEditData({ ...editData, is_practice: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <Label htmlFor="is_practice" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Practice Exam
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="allow_pause"
                            checked={editData.allow_pause}
                            onChange={(e) => setEditData({ ...editData, allow_pause: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <Label htmlFor="allow_pause" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Allow Pause
                          </Label>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                      label="Title"
                      value={exam.title}
                    />
                    <InfoItem
                      icon={<Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                      label="Duration"
                      value={`${exam.duration_minutes} minutes`}
                    />
                    <InfoItem
                      icon={<Award className="w-5 h-5 text-green-600 dark:text-green-400" />}
                      label="Total Marks"
                      value={exam.total_marks}
                    />
                    <InfoItem
                      icon={<TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
                      label="Negative Marking"
                      value={exam.negative_marking}
                    />
                    <InfoItem
                      icon={<Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                      label="Max Attempts"
                      value={exam.max_attempts || "Unlimited"}
                    />
                    <InfoItem
                      icon={<Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                      label="Start Time"
                      value={exam.start_time ? new Date(exam.start_time).toLocaleString() : "Not scheduled"}
                    />
                    <InfoItem
                      icon={<Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                      label="End Time"
                      value={exam.end_time ? new Date(exam.end_time).toLocaleString() : "No end time"}
                    />
                    <InfoItem
                      icon={<AlertCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                      label="Result Visibility"
                      value={exam.result_visibility}
                    />
                    {exam.result_visibility === 'scheduled' && (
                      <InfoItem
                        icon={<Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                        label="Result Release Time"
                        value={exam.result_release_time ? new Date(exam.result_release_time).toLocaleString() : "Not set"}
                      />
                    )}
                    <InfoItem
                      icon={<CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                      label="Show Answers"
                      value={exam.show_answers ? "Yes" : "No"}
                    />
                    <InfoItem
                      icon={<CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                      label="Practice Exam"
                      value={exam.is_practice ? "Yes" : "No"}
                    />
                    <InfoItem
                      icon={<CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                      label="Allow Pause"
                      value={exam.allow_pause ? "Yes" : "No"}
                    />

                    {exam.description && (
                      <div className="md:col-span-2">
                        <InfoItem
                          icon={<FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />}
                          label="Description"
                          value={exam.description}
                        />
                      </div>
                    )}
                    {exam.created_at && (
                      <InfoItem
                        icon={<Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                        label="Created"
                        value={formatDistanceToNow(new Date(exam.created_at), { addSuffix: true })}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </>
  );
}


function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: any }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700">
      <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-base font-semibold text-slate-900 dark:text-white mt-1">{value}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  rows,
  step,
  icon,
  description,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</Label>
      <div className="relative">
        {icon && !textarea && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </div>
        )}
        {textarea ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="resize-none border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            step={step}
            className={`border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 ${icon ? "pl-10" : ""
              }`}
          />
        )}
      </div>
      {description && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
  );
}

