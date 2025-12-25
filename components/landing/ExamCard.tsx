"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

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
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1F2A6B] hover:shadow-lg transition-all group relative h-full cursor-pointer">
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
                    <div className="text-[#14B8A6] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
};
