"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Sparkles, Bot, X } from "lucide-react";
import { callGemini } from "@/components/landing/AIMentor";

// --- KaTeX Components (same as AIMentor) ---
const useKaTeX = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if ((window as any).katex) { setIsLoaded(true); return; }
        const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'; document.head.appendChild(link);
        const script = document.createElement('script'); script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js'; script.onload = () => setIsLoaded(true); document.head.appendChild(script);
    }, []);
    return isLoaded;
};

const LatexSpan = ({ content }: { content: string }) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const katexLoaded = useKaTeX();
    useEffect(() => {
        if (katexLoaded && spanRef.current && (window as any).katex) {
            try { (window as any).katex.render(content, spanRef.current, { throwOnError: false, output: 'mathml' }); } catch (e) { spanRef.current.innerText = content; }
        }
    }, [content, katexLoaded]);
    if (!katexLoaded) return <span className="font-mono text-pink-600">{content}</span>;
    return <span ref={spanRef} className="mx-1" />;
};

// Helper to parse and render LaTeX in text
const renderMathText = (text: string) => {
    if (!text) return null;

    // First, split by explicit $ delimiters
    const parts = text.split(/(\$[^\$]+\$)/g);

    return parts.map((part, i) => {
        // Handle explicit $...$ notation
        if (part.startsWith('$') && part.endsWith('$')) {
            return <LatexSpan key={`math-${i}`} content={part.slice(1, -1)} />;
        }

        // For non-$ parts, check if they contain LaTeX commands
        // Split by common LaTeX patterns while preserving them
        const latexPattern = /(\\frac\{[^}]+\}\{[^}]+\}|\\sqrt\{[^}]+\}|\\[a-zA-Z]+\{[^}]*\}|[a-zA-Z]\^[\{0-9]+\}?|[a-zA-Z]_[\{0-9]+\}?)/g;
        const subParts = part.split(latexPattern);

        return subParts.map((subPart, j) => {
            // If it contains LaTeX commands, render as LaTeX
            if (subPart && (subPart.includes('\\') || /[a-zA-Z][\^_]/.test(subPart))) {
                return <LatexSpan key={`math-${i}-${j}`} content={subPart} />;
            }
            // Otherwise, render as plain text
            return <span key={`text-${i}-${j}`}>{subPart}</span>;
        });
    });
};

export const DemoSection: React.FC = () => {
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mathProblem = `Find the derivative of f(x) = x³ + 2x² - 5x + 3`;
    const cacheKey = `ai-explanation-${mathProblem}`;

    const handleExplainMath = async () => {
        setIsModalOpen(true);

        // Check if we already have the explanation in localStorage
        const cachedExplanation = localStorage.getItem(cacheKey);
        if (cachedExplanation) {
            setExplanation(cachedExplanation);
            return;
        }

        // If not cached, fetch from AI
        setLoading(true);
        try {
            const response = await callGemini(
                `Explain how to solve this calculus problem step by step for a IIT-JAM, CSIR NET & GATE Mathematics student: ${mathProblem}. Use LaTeX notation for mathematical expressions (use $ for inline math and $$ for display math).`,
                "You are a mathematics tutor specializing in IIT-JAM, CSIR NET & GATE Mathematics preparation. Explain clearly and concisely using proper LaTeX notation for all mathematical expressions."
            );
            setExplanation(response);
            // Save to localStorage for future use
            localStorage.setItem(cacheKey, response);
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
                    <h2 className="text-3xl lg:text-4xl font-extrabold mb-6">AI-Powered Math Learning</h2>
                    <p className="text-indigo-200 text-lg mb-8">
                        Get instant, step-by-step solutions to complex mathematical problems. Mathentics' AI mentor helps you understand concepts deeply, not just memorize formulas.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {['Instant step-by-step solutions', 'Concept explanations tailored to your level', 'Practice problems with detailed feedback'].map((item, i) => (
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
                            Try Practice Problems
                        </button>
                    </Link>
                </div>

                {/* Math Problem Card */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200">
                    <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <span className="text-2xl">∫</span>
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">Calculus Problem</div>
                                <div className="text-indigo-100 text-xs">Differentiation</div>
                            </div>
                        </div>
                        <div className="text-xs text-indigo-100 bg-white/10 px-3 py-1 rounded-full">Advanced Level</div>
                    </div>

                    <div className="p-6 text-gray-900 relative">
                        {/* Problem Statement */}
                        <div className="mb-6">
                            <div className="text-sm text-gray-500 font-semibold mb-2">PROBLEM</div>
                            <div className="text-lg font-bold text-gray-800 bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600">
                                Find the derivative of<br />
                                <div className="text-xl mt-2">
                                    <LatexSpan content="f(x) = x^3 + 2x^2 - 5x + 3" />
                                </div>
                            </div>
                        </div>

                        {/* AI Explain Button */}
                        <div className="mb-4">
                            <button
                                onClick={handleExplainMath}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} className="text-[#F6C85F]" />}
                                {loading ? "Analyzing..." : "Get Step-by-Step Solution with AI"}
                            </button>
                        </div>

                        {/* Solution Preview */}
                        <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                            <div className="text-sm font-bold text-green-800 mb-2">SOLUTION</div>
                            <div className="text-gray-700 space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">1.</span>
                                    <span>Apply power rule: <LatexSpan content="\frac{d}{dx}(x^n) = nx^{n-1}" /></span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-600 font-bold">2.</span>
                                    <span><LatexSpan content="f'(x) = 3x^2 + 4x - 5" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Solution Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-3xl max-h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-4 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-3">
                                    <Bot size={24} className="text-white" />
                                    <div>
                                        <div className="text-white font-bold text-lg">AI Step-by-Step Solution</div>
                                        <div className="text-indigo-100 text-sm">Detailed Explanation</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X size={24} className="text-white" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto flex-1">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
                                        <p className="text-gray-600">Generating detailed explanation...</p>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm max-w-none text-gray-700">
                                        {renderMathText(explanation)}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
