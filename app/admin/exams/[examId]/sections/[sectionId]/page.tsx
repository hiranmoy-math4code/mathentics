"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Home, FileQuestion, Settings, LayoutList } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import SectionQuestionsCard from "./components/SectionQuestionsCard";
import QuestionBankModal from "./components/QuestionBankModal";
import { useSectionInfo, useSectionQuestions } from "@/hooks/admin/useSectionManagement";
import { useSectionMutations } from "@/hooks/admin/exams/useSectionMutations";
import { toast } from "sonner";

export default function ManageSectionQuestionsPage() {
  const params = useParams();
  const examId = params.examId as string;
  const sectionId = params.sectionId as string;

  const [showBankModal, setShowBankModal] = useState(false);

  const { data: sectionInfo, isLoading: isInfoLoading } = useSectionInfo(sectionId);
  const { data: questions, isLoading: isQuestionsLoading, refetch: refetchQuestions } = useSectionQuestions(sectionId);
  const { updateSection } = useSectionMutations(examId);

  const isLoading = isInfoLoading || isQuestionsLoading;

  // Toggle Shuffle with Optimistic Update
  const handleShuffleToggle = (checked: boolean) => {
    updateSection.mutate({
      sectionId,
      updates: { shuffle_questions: checked }
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
      >
        <Link href="/admin/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/admin/exams" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Exams
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/admin/exams/${examId}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {sectionInfo?.exams?.title || "Exam"}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-white font-medium">
          {sectionInfo?.title || "Section"}
        </span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-8 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <FileQuestion className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold">
              {sectionInfo?.title || "Manage Questions"}
            </h1>
          </div>
          <p className="text-blue-100 text-lg">
            Add and organize questions for this section from your question bank
          </p>
          {sectionInfo && (
            <div className="flex gap-4 mt-4 text-sm">
              <span className="px-3 py-1 bg-white/20 rounded-lg">
                {sectionInfo.duration_minutes} minutes
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-lg">
                {sectionInfo.total_marks} marks
              </span>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Tabs Interface */}
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="questions" className="flex items-center gap-2">
            <LayoutList className="w-4 h-4" />
            Questions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <SectionQuestionsCard
              questions={questions || []}
              isLoading={isLoading}
              sectionId={sectionId}
              onAddFromBank={() => setShowBankModal(true)}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border-none shadow-xl bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
              <CardDescription>Configure behavior for this specific section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div className="space-y-0.5">
                  <Label className="text-base">Shuffle Questions</Label>
                  <p className="text-sm text-slate-500">
                    Randomize the order of questions for each student attempt.
                  </p>
                </div>
                <Switch
                  checked={sectionInfo?.shuffle_questions || false}
                  onCheckedChange={handleShuffleToggle}
                  disabled={updateSection.isPending}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Question Bank Modal */}
      <QuestionBankModal
        show={showBankModal}
        setShow={setShowBankModal}
        sectionId={sectionId}
        reloadQuestions={refetchQuestions}
      />
    </div>
  );
}

