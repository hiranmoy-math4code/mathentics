"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, BookOpen, Clock, Star } from "lucide-react";
import { usePublicCourses } from "@/hooks/usePublicCourses";
import { CourseCard } from "./CourseCard";

export const CoursesSection: React.FC = () => {
    const { data: courses, isLoading } = usePublicCourses();

    return (
        <section id="courses" className="py-24 bg-gradient-to-br from-[#FBFBFD] via-white to-[#F8F9FF] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/30 to-blue-100/30 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full mb-4">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-slate-700">Premium Courses</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500">Mathematics</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Comprehensive courses designed by experts for <span className="font-semibold text-blue-600">IIT-JAM</span>, <span className="font-semibold text-purple-600">CSIR NET</span> & <span className="font-semibold text-teal-600">GATE</span> Mathematics aspirants.
                            Learn at your own pace with structured curriculum.
                        </p>
                    </div>
                    <Link href="/courses">
                        <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1F2A6B] to-[#14B8A6] text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                            View All Courses
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Courses Grid/Carousel */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[420px] bg-white rounded-3xl shadow-lg animate-pulse">
                                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl" />
                                <div className="p-6 space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : courses && courses.length > 0 ? (
                    <>
                        {/* Desktop Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.slice(0, 6).map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>


                        {/* Stats Bar */}
                        {courses.length > 0 && (
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-[#1F2A6B]">{courses.length}+</div>
                                            <div className="text-sm text-slate-600">Active Courses</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-[#1F2A6B]">Lifetime</div>
                                            <div className="text-sm text-slate-600">Access Duration</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                            <Star className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-[#1F2A6B]">Expert</div>
                                            <div className="text-sm text-slate-600">Instructors</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mb-6">
                            <BookOpen className="w-12 h-12 text-[#14B8A6]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Courses Available Yet</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                            We're working on bringing you amazing courses. Check back soon for updates!
                        </p>
                        <div className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
