"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    GraduationCap, Terminal, Trophy, Sparkles
} from "lucide-react";

export const FeaturesStrip: React.FC = () => {
    const features = [
        {
            icon: <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />,
            title: "Structured Learning",
            desc: "Comprehensive curriculum covering all topics for IIT-JAM, CSIR NET & GATE Mathematics."
        },
        {
            icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />,
            title: "Smart Analytics",
            desc: "Track your progress with detailed performance insights and topic-wise analysis."
        },
        {
            icon: <Trophy className="w-5 h-5 md:w-6 md:h-6" />,
            title: "Mock Tests",
            desc: "Practice with exam-style tests and compete on leaderboards."
        },
        {
            icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
            title: "AI Math Mentor",
            desc: "Get instant help with step-by-step solutions to complex mathematical problems."
        },
    ];

    return (
        <div className="bg-white py-16 border-y border-gray-100 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="flex items-start gap-5 p-2 rounded-2xl transition-all group"
                        >
                            <div className="shrink-0 p-3.5 bg-indigo-50 text-[#1F2A6B] rounded-xl group-hover:bg-[#1F2A6B] group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-100 transition-all duration-300">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-extrabold text-[#1F2A6B] text-base mb-1.5 group-hover:text-[#14B8A6] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
