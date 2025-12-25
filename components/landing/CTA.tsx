"use client";

import React from "react";
import Link from "next/link";

export const CTA: React.FC = () => {
    return (
        <div className="py-20 px-6">
            <div className="max-w-5xl mx-auto bg-linear-to-r from-[#14B8A6] to-teal-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h2 className="relative z-10 text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Master Mathematics?</h2>
                <p className="relative z-10 text-teal-50 text-lg mb-8 max-w-2xl mx-auto">Join thousands of students using mathentics for authentic learning and data-driven progress. No credit card required for the trial.</p>
                <Link href="/auth/sign-up">
                    <button className="relative z-10 bg-white text-teal-700 px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105">
                        Start Learning Now
                    </button>
                </Link>
            </div>
        </div>
    );
};
