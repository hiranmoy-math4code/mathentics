"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2, GraduationCap, PlayCircle } from "lucide-react";
import { useCurrentUser } from "@/hooks/student/useCurrentUser";
import { useStudentTestSeries } from "@/hooks/student/useStudentTestSeries";
import { usePrefetchCourse } from "@/hooks/usePrefetchCourse";
import { Button } from "@/components/ui/button";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";
import { DashboardExpiryBadge } from "@/components/student/ExpiryComponents";
import { useEnrollmentsWithExpiry } from "@/hooks/useEnrollmentsWithExpiry";

export default function MyTestSeries() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: testSeries, isLoading: seriesLoading } = useStudentTestSeries(user?.id);
  const { data: enrollmentsWithExpiry } = useEnrollmentsWithExpiry();
  const { prefetchCourse } = usePrefetchCourse();

  // Create expiry map
  const expiryMap = new Map();
  enrollmentsWithExpiry?.forEach((enrollment: any) => {
    expiryMap.set(enrollment.course_id, {
      daysRemaining: enrollment.daysRemaining,
      isExpired: enrollment.isExpired,
      urgencyLevel: enrollment.urgencyLevel
    });
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const handleContinueCourse = (courseId: string) => {
    router.push(`/learn/${courseId}`);
  };

  if (userLoading || seriesLoading) {
    return (
      <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen">
        <div className="rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700 animate-pulse">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
          <div className="h-4 w-96 bg-slate-100 dark:bg-slate-600 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 shadow-lg border border-slate-100 dark:border-slate-700 animate-pulse">
              <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4 bg-slate-100 dark:bg-slate-600 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen">
      {/* Header */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
          My Test Series
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your enrolled test series and progress
        </p>
      </motion.div>

      {/* Test Series Cards */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1}
        className="rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700"
      >
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Your Test Series</h3>

        {seriesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          </div>
        ) : testSeries && testSeries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testSeries.map((test) => (
              <motion.div
                key={test.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleContinueCourse(test.id)}
                onMouseEnter={() => prefetchCourse(test.id, true)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md cursor-pointer"
              >
                <div className="h-40 w-full mb-3 rounded-lg overflow-hidden">
                  <CourseThumbnail
                    src={test.thumbnail_url}
                    title={test.title}
                    category="Test Series"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-800 dark:text-white flex-1">{test.title}</h4>
                  {expiryMap.has(test.id) && (
                    <DashboardExpiryBadge
                      daysRemaining={expiryMap.get(test.id).daysRemaining}
                      isExpired={expiryMap.get(test.id).isExpired}
                      urgencyLevel={expiryMap.get(test.id).urgencyLevel}
                    />
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{test.description}</p>
                <div className="flex justify-between text-xs mb-2 text-slate-500 dark:text-slate-400">
                  <span>{test.completedExams}/{test.totalExams} exams</span>
                  <span>{test.progress ? test.progress.toFixed(0) : (test.completedExams / test.totalExams * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 mb-3">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${test.progress ? test.progress : test.completedExams / test.totalExams * 100}%` }}
                  />
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContinueCourse(test.id);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No test series enrolled yet</p>
            <p className="text-sm mt-1">Browse available test series to get started</p>
            <Button
              onClick={() => router.push("/student/dashboard?tab=all-test-series")}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700"
            >
              Browse Test Series
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
