"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Clock, Target, CheckCircle2, Zap, Sparkles } from "lucide-react";

export interface PublicTestSeries {
    id: string;
    title: string;
    description: string | null;
    price: number;
    thumbnail_url: string | null;
    created_at: string;
    creator_id: string;
}

export const ExamCard: React.FC<{ test: PublicTestSeries }> = ({ test }) => {
    return (
        <Link href={`/courses/${test.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-purple-500/30 border border-white/20 hover:border-purple-400/50 overflow-hidden h-full flex flex-col cursor-pointer"
            >
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                {/* Gradient Header with Animation */}
                <div className="relative h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                        style={{
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s infinite'
                        }}
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Icon & Badge */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                                <Zap className="w-3.5 h-3.5 text-white fill-white" />
                            </div>
                        </div>
                        <div className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full">
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-yellow-300" />
                                <span className="text-xs font-bold text-purple-200">Test Series</span>
                            </div>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                        {test.title}
                    </h3>
                    <p className="text-sm text-purple-200/80 mb-4 line-clamp-2 flex-1">
                        {test.description || "Comprehensive test series to evaluate your preparation and boost your confidence."}
                    </p>

                    {/* Features with Glow Effect */}
                    <div className="space-y-2.5 mb-5 pb-5 border-b border-white/10">
                        <div className="flex items-center gap-2.5 text-xs text-purple-100 group/item hover:text-white transition-colors">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="font-medium">Detailed performance analysis</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-purple-100 group/item hover:text-white transition-colors">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="font-medium">Instant results & solutions</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-purple-100 group/item hover:text-white transition-colors">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="font-medium">All India rank comparison</span>
                        </div>
                    </div>

                    {/* Stats Grid with Glow */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-3 hover:border-purple-400/60 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                    <Target className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-purple-200">Tests</span>
                            </div>
                            <div className="text-xl font-bold text-white">15+</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-3 hover:border-blue-400/60 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                    <Clock className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-blue-200">Duration</span>
                            </div>
                            <div className="text-xl font-bold text-white">3h each</div>
                        </div>
                    </div>

                    {/* Footer with Gradient */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div>
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                                ₹{test.price}
                            </div>
                            <div className="text-[10px] text-purple-300/70">Full access</div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-xl text-white font-bold text-sm group-hover:gap-3 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                            <span>Start Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect - Enhanced */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-yellow-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none rounded-3xl" />

                {/* Sparkle Effect on Hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </Link>
    );
};
