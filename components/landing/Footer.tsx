"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
                    <span className="text-[#14B8A6]">math4code</span>
                </div>
                <p className="max-w-xs text-sm text-slate-400">
                    Master IIT-JAM, CSIR NET & GATE Mathematics with expert-led courses, intelligent mock tests, and AI-powered learning.
                </p>
            </div>

            <div>
                <h4 className="font-bold text-white mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/courses" className="hover:text-[#14B8A6]">Courses</Link></li>
                    <li><Link href="/contact" className="hover:text-[#14B8A6]">Contact Us</Link></li>
                    <li><Link href="/about" className="hover:text-[#14B8A6]">About Us</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/privacy-policy" className="hover:text-[#14B8A6]">Privacy Policy</Link></li>
                    <li><Link href="/terms-of-use" className="hover:text-[#14B8A6]">Terms of Use</Link></li>
                    <li><Link href="/refund-policy" className="hover:text-[#14B8A6]">Refund Policy</Link></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2025 math4code Academy. All rights reserved.
        </div>
    </footer>
);
