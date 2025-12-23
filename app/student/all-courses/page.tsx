"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2, GraduationCap, PlayCircle, ShoppingCart } from "lucide-react";
import { useCurrentUser } from "@/hooks/student/useCurrentUser";
import { useAllCourses } from "@/hooks/student/useAllCourses";
import { usePrefetchCourse } from "@/hooks/usePrefetchCourse";
import { Button } from "@/components/ui/button";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";
import { useEnrollCourse } from "@/hooks";

export default function AllCoursesPage() {
    const router = useRouter();
    const { data: user, isLoading: userLoading } = useCurrentUser();
    const { data: allCourses, isLoading: allCoursesLoading } = useAllCourses(user?.id);
    const { prefetchCourse } = usePrefetchCourse();
    const enrollMutation = useEnrollCourse();
    const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

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

    const handleEnrollCourse = (courseId: string, price: number) => {
        if (!user?.id) {
            router.push(`/auth/login?redirect=/courses/${courseId}`);
            return;
        }

        if (price === 0) {
            setEnrollingCourseId(courseId);
            enrollMutation.mutate(
                { courseId, userId: user.id },
                {
                    onSuccess: () => {
                        setEnrollingCourseId(null);
                    },
                    onError: () => {
                        setEnrollingCourseId(null);
                    },
                }
            );
        } else {
            router.push(`/courses/${courseId}`);
        }
    };

    if (allCoursesLoading) {
        return (
            <div className="p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen">
                <div className="rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700 animate-pulse">
                    <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                    <div className="h-4 w-96 bg-slate-100 dark:bg-slate-600 rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
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
        <div className="p-6 md:p-10 space-y-8 bg-linear-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-screen">
            {/* Header */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="rounded-3xl p-6 md:p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg shadow-xl border border-slate-100 dark:border-slate-700"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                    All Courses
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Explore and enroll in our comprehensive courses
                </p>
            </motion.div>

            {/* Courses Cards */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={1}
                className="rounded-3xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-lg p-6 shadow-xl border border-slate-100 dark:border-slate-700"
            >
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Available Courses</h3>

                {allCoursesLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    </div>
                ) : allCourses && allCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {allCourses.map((course: any) => (
                            <motion.div
                                key={course.id}
                                whileHover={{ scale: 1.02 }}
                                onMouseEnter={() => prefetchCourse(course.id)}
                                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md"
                            >
                                <div className="h-40 w-full mb-3 rounded-lg overflow-hidden">
                                    <CourseThumbnail
                                        src={course.thumbnail_url}
                                        title={course.title}
                                        category="Course"
                                        className="w-full h-full"
                                    />
                                </div>
                                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{course.title}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{course.description}</p>
                                <div className="flex justify-between text-xs mb-3 text-slate-500 dark:text-slate-400">
                                    <span>{course.total_lessons || 0} lessons</span>
                                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                        {course.price === 0 ? "Free" : `₹${course.price}`}
                                    </span>
                                </div>
                                {course.is_enrolled ? (
                                    <Button
                                        onClick={() => handleContinueCourse(course.id)}
                                        className="w-full bg-green-600 hover:bg-green-700"
                                    >
                                        <PlayCircle className="w-4 h-4 mr-2" />
                                        Continue Learning
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleEnrollCourse(course.id, course.price)}
                                        disabled={enrollingCourseId === course.id}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {enrollingCourseId === course.id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Enrolling...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                {course.price === 0 ? "Enroll Free" : "View Details"}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                        <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No courses available yet</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
