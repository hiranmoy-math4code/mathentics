"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePublicCourses } from "@/hooks/usePublicCourses";
import { CourseCard } from "./CourseCard";

export const CoursesSection: React.FC = () => {
    const { data: courses, isLoading } = usePublicCourses();

    return (
        <section id="courses" className="py-24 bg-[#FBFBFD]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1F2A6B] mb-4">Popular Curriculum</h2>
                        <p className="text-slate-500 max-w-md">Comprehensive courses designed for IIT-JAM, CSIR NET & GATE Mathematics aspirants.</p>
                    </div>
                    <Link href="/courses">
                        <button className="hidden md:flex text-[#14B8A6] font-bold items-center hover:gap-2 transition-all">
                            View All Courses <ChevronRight />
                        </button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex gap-6 overflow-hidden">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="min-w-[300px] h-[300px] bg-white rounded-2xl shadow-sm animate-pulse" />
                        ))}
                    </div>
                ) : courses && courses.length > 0 ? (
                    <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Available Yet</h3>
                        <p className="text-gray-500 text-center max-w-md">
                            We're working on bringing you amazing courses. Check back soon for updates!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
