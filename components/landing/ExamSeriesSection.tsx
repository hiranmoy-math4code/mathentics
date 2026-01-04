"use client";

import React from "react";
import { usePublicTestSeries } from "@/hooks/usePublicTestSeries";
import { ExamCard } from "./ExamCard";

export const ExamSeriesSection: React.FC = () => {
    const { data: tests, isLoading } = usePublicTestSeries();

    return (
        <section id="exams" className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-[#1F2A6B]">Test Series</h2>
                    <p className="text-slate-500 mt-2">Specialized mock tests designed for IIT-JAM, CSIR NET & GATE Mathematics preparation.</p>
                </div>

                {isLoading ? (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />)}
                    </div>
                ) : tests && tests.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tests.map((test) => (
                            <ExamCard key={test.id} test={test} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                            <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Test Series Available Yet</h3>
                        <p className="text-gray-500 text-center max-w-md">
                            Exciting test series are coming soon. Stay tuned for comprehensive practice tests!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
