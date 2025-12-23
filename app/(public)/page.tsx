"use client"
export const runtime = 'edge';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Menu, X, ChevronRight, Check, Star, Play,
  BookOpen, Code, Shield, Trophy, ArrowRight,
  Calculator, Terminal, GraduationCap, Users,
  Sparkles, MessageSquare, Send, Loader2, Bot,
  ShoppingCart, CreditCard, FileText
} from 'lucide-react';
import { usePublicCourses } from '@/hooks/usePublicCourses';
import { usePublicTestSeries } from '@/hooks/usePublicTestSeries';
import { useRouter } from "next/navigation";
import { Header } from '@/components/landing/Header';
import { callGemini } from '@/components/landing/AIMentor';
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";
import VideoPlayer from '@/components/VideoPlayer';

// --- 1. Supabase Interfaces (As provided) ---

export interface PublicCourse {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
  creator_id: string;
  profiles?: {
    full_name: string;
  };
}

export interface PublicTestSeries {
  id: string;
  title: string;
  description: string | null;
  price: number;
  thumbnail_url: string | null;
  created_at: string;
  creator_id: string;
}

// --- 2. Mock Data (Matching Supabase Schema) ---
// In production, this data comes from your DB. We use this to simulate the fetch here.



// --- 4. API Helper & Theme ---
const COLORS = {
  primary: '#1F2A6B', // Deep Indigo
  accent1: '#14B8A6', // Vibrant Teal
  accent2: '#F6C85F', // Warm Gold
  bg: '#FBFBFD',      // Off-white
  text: '#374151',    // Slate Grey
};

const TESTIMONIALS = [
  { id: 1, name: 'Aarav P.', role: 'JEE Aspirant', text: "The adaptive practice problems changed the game for me. I finally understood where my logic was breaking down.", score: 'JEE Rank 452' },
  { id: 2, name: 'Sarah L.', role: 'CS Undergrad', text: "Math4Code bridges the gap between abstract math and actual coding. The Python visualization tool is genius.", score: 'A+ in Algorithms' },
  { id: 3, name: 'Rahul K.', role: 'High School Student', text: "The mock exams are actually harder than the real thing, which made the actual exam feel like a breeze.", score: '99.8 Percentile' },
];




// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-[#1F2A6B]">
    <div className="relative flex items-center justify-center w-auto px-2 h-10 rounded-lg bg-[#1F2A6B] text-white">
      <span className="text-lg">Σ✨{'}'}</span>
    </div>
    <span>Math4Code</span>
  </div>
);


const Hero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const mcqOptions = [
    { text: "O(n)", correct: false },
    { text: "O(log n)", correct: true },
    { text: "O(n²)", correct: false },
    { text: "O(1)", correct: false }
  ];

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <section className="relative pt-6 pb-20 lg:pt-8 lg:pb-32 overflow-hidden bg-[#FBFBFD]">
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
            New: JEE Advanced 2025 Module
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-[#1F2A6B] leading-[1.1] mb-6 tracking-tight">
            Master Math. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#14B8A6] to-blue-500">
              Code Confidently.
            </span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
            Structured courses, exam-style tests, and live mentoring.
            The only LMS built specifically for the intersection of logic and code.
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
            <p>Trusted by <span className="text-[#1F2A6B] font-bold">10,000+</span> top students</p>
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
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-5 border border-gray-100 max-w-md mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="text-xs font-mono text-gray-400">quiz.ts</div>
            </div>

            <div className="space-y-4">
              <p className="font-bold text-gray-800 text-lg">What is the Time Complexity of Binary Search?</p>

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

const FeaturesStrip = () => {
  const features = [
    {
      icon: <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Guided Learning",
      desc: "Structured paths from 11th-12th Math to Advanced Algorithms."
    },
    {
      icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Interactive Code",
      desc: "Execute Python & Math scripts directly within our logic-first IDE."
    },
    {
      icon: <Trophy className="w-5 h-5 md:w-6 md:h-6" />,
      title: "Gamified Progress",
      desc: "Earn logic coins, track streaks, and climb global leaderboards."
    },
    {
      icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
      title: "AI Math Mentor",
      desc: "Instant 24/7 help with complex derivations and coding bugs."
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

const CourseCard = ({ course }: { course: PublicCourse }) => {
  // Helpers for visual variation since we might have null thumbnails
  const colors = {
    'University': 'bg-blue-100 text-blue-800',
    'Beginner': 'bg-teal-100 text-teal-800',
    'High School': 'bg-orange-100 text-orange-800',
    'Advanced': 'bg-purple-100 text-purple-800'
  };
  const badgeColor = colors[course.category as keyof typeof colors] || 'bg-gray-100 text-gray-800';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="min-w-[300px] md:min-w-[340px] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 snap-center cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
          {course.category || 'Course'}
        </div>
        <div className="w-10 h-10 rounded-lg overflow-hidden">
          <CourseThumbnail
            src={course.thumbnail_url}
            title={course.title}
            category={course.category || "Course"}
            className="w-full h-full"
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1F2A6B] transition-colors">{course.title}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{course.description}</p>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
        <div className="bg-[#14B8A6] h-full rounded-full" style={{ width: '0%' }}></div>
      </div>

      <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-slate-600">
          <Users size={16} />
          <span>{course.profiles?.full_name || 'Instructor'}</span>
        </div>
        <div className="font-bold text-[#1F2A6B] text-lg">
          ₹ {course.price}
        </div>
      </div>
    </motion.div>
  );
};

const ExamCard = ({ test }: { test: PublicTestSeries }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1F2A6B] transition-all group relative">
      <div className="absolute top-4 right-4 bg-indigo-50 p-2 rounded-lg text-[#1F2A6B]">
        <FileText size={20} />
      </div>
      <h3 className="font-bold text-lg text-gray-900 pr-10">{test.title}</h3>
      <p className="text-sm text-slate-500 mt-2 mb-4 line-clamp-2">{test.description}</p>

      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
        <span>Created: {new Date(test.created_at).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <div className="text-xl font-bold text-[#1F2A6B]">₹ {test.price}</div>
        <button className="text-[#14B8A6] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const CoursesSection = () => {
  const { data: courses, isLoading } = usePublicCourses();

  return (
    <section id="courses" className="py-24 bg-[#FBFBFD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1F2A6B] mb-4">Popular Curriculum</h2>
            <p className="text-slate-500 max-w-md">Comprehensive courses fetched directly from our catalog.</p>
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
        ) : (
          <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ExamSeriesSection = () => {
  const { data: tests, isLoading } = usePublicTestSeries();

  return (
    <section id="exams" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#1F2A6B]">Exam Series</h2>
          <p className="text-slate-500 mt-2">Specialized mock tests for competitive programming and math.</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests?.map((test) => (
              <ExamCard key={test.id} test={test} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const DemoSection = () => {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const codeSnippet = `
import numpy as np

# Visualizing Sine Wave
x = np.linspace(0, 10, 100)
y = np.sin(x)
  `;

  const handleExplainCode = async () => {
    if (explanation) return; // Don't fetch again if already showing
    setLoading(true);
    try {
      const response = await callGemini(
        `Explain the mathematical concept behind this Python code briefly for a student: ${codeSnippet}`,
        "You are a math and code tutor. Explain simply."
      );
      setExplanation(response);
    } catch (e) {
      setExplanation("Could not load explanation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-[#1F2A6B] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">Interactive Learning Environment</h2>
          <p className="text-indigo-200 text-lg mb-8">
            Don't just read about math. Visualize it. Our integrated coding environment allows you to script mathematical proofs and see the results instantly.
          </p>
          <ul className="space-y-4 mb-8">
            {['Real-time plotting libraries included', 'Step-by-step logic debugger', 'Instant feedback on solutions'].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="bg-[#14B8A6] rounded-full p-1">
                  <Check size={12} strokeWidth={4} className="text-white" />
                </div>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/courses">
            <button className="bg-white text-[#1F2A6B] px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
              Try the Demo Lesson
            </button>
          </Link>
        </div>

        {/* Browser Mockup */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex gap-1.5 items-center">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="bg-gray-900 px-3 py-1 rounded text-xs text-gray-400 font-mono">math4code-lab.js</div>
            <div className="w-10"></div> {/* Spacer */}
          </div>
          <div className="p-6 font-mono text-sm relative">
            <div className="flex">
              <div className="text-gray-500 select-none pr-4 text-right">1<br />2<br />3<br />4<br />5</div>
              <div className="w-full">
                <p className="text-pink-400">import <span className="text-white">numpy</span> as <span className="text-white">np</span></p>
                <p className="text-white"><br /></p>
                <p className="text-blue-400"># Visualizing Sine Wave</p>
                <p className="text-white">x = np.linspace(<span className="text-orange-400">0</span>, <span className="text-orange-400">10</span>, <span className="text-orange-400">100</span>)</p>
                <p className="text-white">y = np.sin(x)</p>
              </div>
            </div>

            {/* Gemini Feature: Explain Code Button */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={handleExplainCode}
                disabled={loading}
                className="flex items-center gap-2 bg-indigo-600/90 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg transition-all border border-indigo-400/50 backdrop-blur-sm"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-[#F6C85F]" />}
                {loading ? "Analyzing..." : "Explain with AI"}
              </button>
            </div>

            {/* Animated Graph Placeholder */}
            <div className="mt-6 bg-gray-800 h-40 rounded-lg relative overflow-hidden flex items-end px-4 pb-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <motion.path
                  d="M0,70 C50,20 100,120 150,70 C200,20 250,120 300,70"
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute top-2 right-2 text-xs text-green-400 font-bold bg-green-900/30 px-2 py-1 rounded">Build Success</div>
            </div>

            {/* AI Explanation Result */}
            <AnimatePresence>
              {explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-indigo-900/50 border border-indigo-500/30 rounded-lg text-xs text-indigo-100 leading-relaxed backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2 text-[#F6C85F] font-bold">
                    <Bot size={14} /> AI Analysis
                  </div>
                  {explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#1F2A6B] mb-12">Success Stories</h2>

        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <div className="text-[#F6C85F] flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={24} />)}
              </div>
              <h3 className="text-2xl md:text-3xl font-medium text-slate-800 italic mb-6 leading-relaxed">
                "{TESTIMONIALS[index].text}"
              </h3>
              <div>
                <div className="font-bold text-[#1F2A6B] text-lg">{TESTIMONIALS[index].name}</div>
                <div className="text-slate-500 text-sm">{TESTIMONIALS[index].role}</div>
                <div className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {TESTIMONIALS[index].score}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#1F2A6B]' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const CTA = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto bg-linear-to-r from-[#14B8A6] to-teal-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to top the leaderboard?</h2>
        <p className="relative z-10 text-teal-50 text-lg mb-8 max-w-2xl mx-auto">Join the community of problem solvers. No credit card required for the trial.</p>
        <Link href="/auth/sign-up">
          <button className="relative z-10 bg-white text-teal-700 px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105">
            Start Learning Now
          </button>
        </Link>
      </div>
    </div>
  );
};







export default function App() {
  return (
    <div className="font-sans antialiased text-slate-900 bg-[#FBFBFD]">
      <Hero />
      <FeaturesStrip />
      <CoursesSection />
      <ExamSeriesSection />
      <DemoSection /><Testimonials />
      <CTA />


    </div>
  );
}
