"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, Star, Play, Trophy, ArrowRight, Sparkles, Brain, TrendingUp
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { HeroIllustration } from "./Illustrations";

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
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden bg-white">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/40 -z-10" />

      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-200/20 to-blue-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2.5 rounded-full text-sm font-semibold shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>New: IIT-JAM, CSIR NET & GATE 2026 Modules</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
                <span className="block text-slate-900 mb-2">Master Mathematics</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500">
                  With Authentic Learning.
                </span>
              </h1>

              <p className="text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ace <span className="font-semibold text-blue-600">IIT-JAM</span>, <span className="font-semibold text-purple-600">CSIR NET</span> & <span className="font-semibold text-teal-600">GATE</span> with intelligent mock tests, step-by-step AI guidance, and data-driven insights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDemoOpen(true)}
                className="bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
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
                    <VideoPlayer url="https://youtu.be/fdPXD2yvT90?si=Kav31xbSJcKOn1m8" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4 pb-12"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-white shadow-md overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 13}`} alt="Student" className="w-full h-full" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">1000+ Students</div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-slate-600 ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">99% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Interactive Demo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative perspective-1000"
          >
            {/* Main Demo Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 lg:p-8 max-w-md mx-auto transform lg:rotate-2 hover:rotate-0 transition-all duration-500 ease-out">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">AI Practice Mode</div>
                    <div className="text-xs text-slate-500">Calculus • Derivatives</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Question */}
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="font-semibold text-slate-800 text-base lg:text-lg">
                    What is the derivative of f(x) = sin(x) · cos(x)?
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {mcqOptions.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = option.correct;

                    let buttonClass = "w-full text-left p-3.5 rounded-lg border-2 font-medium transition-all duration-200 flex justify-between items-center ";

                    if (isSelected) {
                      if (isCorrect) {
                        buttonClass += "bg-green-50 border-green-400 text-green-800";
                      } else {
                        buttonClass += "bg-red-50 border-red-400 text-red-800";
                      }
                    } else {
                      buttonClass += "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50";
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: isSelected ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(idx)}
                        className={buttonClass}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${isSelected ? (isCorrect ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900') : 'bg-slate-100 text-slate-600'}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-sm lg:text-base">{option.text}</span>
                        </span>

                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            {isCorrect ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <X className="w-5 h-5 text-red-600" />
                            )}
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* AI Hint */}
              {selectedOption !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 mb-6"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-purple-900 uppercase tracking-wide mb-1">AI Hint</div>
                      <p className="text-sm text-slate-700">Use the product rule: (uv)' = u'v + uv'</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>


            {/* Floating Badge - Top Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 p-3 z-20"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Top 5%</div>
                  <div className="text-[10px] text-slate-500">Rank</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge - Bottom Left */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-3 z-20"
            >
              <div className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <div>
                  <div className="text-xs font-bold">4.9 Rating</div>
                  <div className="text-[10px] opacity-90">1000+ Reviews</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
