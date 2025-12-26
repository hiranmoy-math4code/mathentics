"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, Star, Play, Trophy, ArrowRight
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";

export const Hero: React.FC = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const mcqOptions = [
    { text: "sin(2x)", correct: false },
    { text: "cos(2x)", correct: true },
    { text: "sin²(x)", correct: false },
    { text: "-sin(2x)", correct: false }
  ];

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#FBFBFD]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-indigo-50 to-transparent opacity-50 -z-10" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-[#1F2A6B] px-3 py-1 rounded-full text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#1F2A6B] animate-pulse" />
            New: IIT-JAM, CSIR NET & GATE 2026 Modules
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1F2A6B] leading-[1.1] mb-6 tracking-tight">
            Mathematics, <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#14B8A6] to-blue-500">
              With Authentic Learning.
            </span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
            <span className="font-semibold text-[#1F2A6B]">mathentics</span> combines authentic mathematical practice with powerful analytics.
            Master IIT-JAM, CSIR NET & GATE Mathematics with intelligent mock tests and data-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/login">
              <button className="bg-[#1F2A6B] hover:bg-[#161e4d] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 transition-transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button
              onClick={() => setIsDemoOpen(true)}
              className="bg-white border border-gray-200 text-slate-600 hover:border-[#1F2A6B] hover:text-[#1F2A6B] px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </button>
          </div>

          {/* Video Modal */}
          <AnimatePresence>
            {isDemoOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={() => setIsDemoOpen(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsDemoOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <VideoPlayer url="https://www.youtube.com/watch?v=WfgaS4GynwE" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 13}`} alt="User" />
                </div>
              ))}
            </div>
            <p>Trusted by <span className="text-[#1F2A6B] font-bold">1000+</span> top students</p>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative block mt-12 lg:mt-0"
        >
          {/* Main Card */}
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-5 border border-gray-100 max-w-md mx-auto transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-xs font-mono text-gray-400">quiz.ts</div>
            </div>

            <div className="space-y-4">
              <p className="font-bold text-gray-800 text-lg">What is the derivative of f(x) = sin(x) · cos(x)?</p>

              <div className="space-y-3">
                {mcqOptions.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = option.correct;

                  let buttonClass = "w-full text-left p-3 rounded-lg border-2 font-bold transition-all duration-200 flex justify-between items-center text-sm ";

                  if (isSelected) {
                    if (isCorrect) {
                      buttonClass += "bg-green-50 border-green-500 text-green-700 shadow-sm";
                    } else {
                      buttonClass += "bg-red-50 border-red-500 text-red-700 shadow-sm";
                    }
                  } else {
                    buttonClass += "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      className={buttonClass}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isSelected ? (isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800') : 'bg-slate-100 text-slate-500'}`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option.text}
                      </span>

                      {isSelected && (
                        <span className="animate-in fade-in zoom-in">
                          {isCorrect ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <X className="w-5 h-5 text-red-600" />
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 bg-indigo-50 rounded-xl p-3 flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Trophy className="text-[#F6C85F] w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Leaderboard</div>
                <div className="font-bold text-[#1F2A6B] text-sm">You're in the top 5%</div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 -right-4 bg-white p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center"
          >
            <div className="text-[#F6C85F] font-bold text-2xl">4.9</div>
            <div className="flex text-[#F6C85F] gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">Avg Rating</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-4 bg-[#1F2A6B] text-white p-4 rounded-2xl shadow-xl z-20"
          >
            <Trophy size={24} className="mb-2 text-[#F6C85F]" />
            <div className="font-bold text-lg">Top 1%</div>
            <div className="text-[10px] opacity-80">Of performers</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
