"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { CourseThumbnail } from "@/components/ui/CourseThumbnail";

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

export const CourseCard: React.FC<{ course: PublicCourse }> = ({ course }) => {
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
