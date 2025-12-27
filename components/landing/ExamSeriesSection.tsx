"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, FileText, Target, Award, TrendingUp, Zap, Trophy } from "lucide-react";
import { usePublicTestSeries } from "@/hooks/usePublicTestSeries";
import { ExamCard } from "./ExamCard";

export const ExamSeriesSection: React.FC = () => {
    const { data: tests, isLoading } = usePublicTestSeries();

    return (
        <section id="exams" className="py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/20 to-blue-100/20 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full mb-6">
                        <Trophy className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Practice Makes Perfect</span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500">
                            Test Series
                        </span>
                    </h2>

                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Challenge yourself with specialized mock tests designed for <span className="font-semibold text-blue-600">IIT-JAM</span>, <span className="font-semibold text-purple-600">CSIR NET</span> & <span className="font-semibold text-teal-600">GATE Mathematics</span>.
                        Track your progress and compete with thousands of aspirants.
                    </p>
                </div>

                {/* Test Series Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[380px] bg-white rounded-2xl border border-slate-200 animate-pulse shadow-sm">
                                <div className="p-6 space-y-4">
                                    <div className="h-12 w-12 bg-slate-100 rounded-xl" />
                                    <div className="h-6 bg-slate-100 rounded w-3/4" />
                                    <div className="h-4 bg-slate-100 rounded w-full" />
                                    <div className="h-4 bg-slate-100 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tests && tests.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {tests.slice(0, 6).map((test) => (
                                <ExamCard key={test.id} test={test} />
                            ))}
                        </div>

                        {/* View All Button */}
                        {tests.length > 6 && (
                            <div className="text-center mb-12">
                                <Link href="/test-series">
                                    <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-200 hover:scale-105 transition-all duration-300">
                                        <Trophy className="w-6 h-6" />
                                        <span>View All Test Series</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        )}

                        {/* Features Bar - Light Theme */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                        <FileText className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-3xl font-bold text-slate-900 mb-1">{tests.length}+</div>
                                        <div className="text-sm font-semibold text-slate-700 mb-1">Test Series</div>
                                        <div className="text-xs text-slate-500">Comprehensive practice tests</div>
                                    </div>
                                </div>
                            </div>
                            <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                        <Award className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-3xl font-bold text-slate-900 mb-1">Instant</div>
                                        <div className="text-sm font-semibold text-slate-700 mb-1">Results</div>
                                        <div className="text-xs text-slate-500">Detailed performance analysis</div>
                                    </div>
                                </div>
                            </div>
                            <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                        <TrendingUp className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-3xl font-bold text-slate-900 mb-1">Track</div>
                                        <div className="text-sm font-semibold text-slate-700 mb-1">Progress</div>
                                        <div className="text-xs text-slate-500">Monitor your improvement</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
                            <FileText className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">No Test Series Available Yet</h3>
                        <p className="text-slate-600 text-center max-w-md mb-6">
                            Exciting test series are coming soon. Stay tuned for comprehensive practice tests!
                        </p>
                        <div className="flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
