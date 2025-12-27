"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Star, ArrowRight, Award } from "lucide-react";
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
    const categoryConfig = {
        'University': {
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            borderColor: 'border-blue-200',
            icon: '🎓'
        },
        'Beginner': {
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-50',
            textColor: 'text-teal-700',
            borderColor: 'border-teal-200',
            icon: '🌱'
        },
        'High School': {
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
            borderColor: 'border-orange-200',
            icon: '📚'
        },
        'Advanced': {
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            borderColor: 'border-purple-200',
            icon: '🚀'
        }
    };

    const config = categoryConfig[course.category as keyof typeof categoryConfig] || {
        color: 'from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        borderColor: 'border-gray-200',
        icon: '📖'
    };

    return (
        <Link href={`/courses/${course.id}`} className="block h-full max-w-sm mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl border border-slate-200 hover:border-blue-300 overflow-hidden h-full flex flex-col cursor-pointer transition-all"
            >
                {/* Thumbnail Section */}
                <div className="relative h-40 overflow-hidden">
                    <CourseThumbnail
                        src={course.thumbnail_url}
                        title={course.title}
                        category={course.category || "Course"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 ${config.bgColor} backdrop-blur-md rounded-full border ${config.borderColor} shadow-md`}>
                            <span className="text-sm">{config.icon}</span>
                            <span className={`text-xs font-bold ${config.textColor}`}>
                                {course.category || 'Course'}
                            </span>
                        </div>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-md">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-slate-900">4.8</span>
                        </div>
                    </div>

                    {/* Popular Badge */}
                    <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-md">
                            <Award className="w-3 h-3 text-white" />
                            <span className="text-xs font-bold text-white">Popular</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 flex flex-col">
                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed flex-1">
                        {course.description || "Comprehensive course designed to help you master the concepts and excel in your exams."}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

                    {/* Footer */}
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                                <Users className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900">
                                    {course.profiles?.full_name || 'Expert'}
                                </div>
                                <div className="text-[10px] text-slate-500">Instructor</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                ₹{course.price}
                            </div>
                        </div>
                    </div>

                    {/* Enroll Button - Always visible at bottom */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg transition-all text-sm">
                        <span>Enroll Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
        </Link>
    );
};
