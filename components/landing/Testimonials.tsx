"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
    { id: 1, name: 'Aarav P.', role: 'IIT-JAM Aspirant', text: "The adaptive practice problems changed the game for me. I finally understood where my logic was breaking down.", score: 'AIR 89' },
    { id: 2, name: 'Sarah L.', role: 'IIT-JAM Student', text: "mathentics bridges the gap between theory and practice. The analytics-driven insights helped me identify my weak areas instantly.", score: 'AIR 127' },
    { id: 3, name: 'Rahul K.', role: 'GATE Mathematics Aspirant', text: "The mock exams are actually harder than the real thing, which made the actual exam feel like a breeze. Best investment I made!", score: '99.8 Percentile' },
];

export const Testimonials: React.FC = () => {
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
