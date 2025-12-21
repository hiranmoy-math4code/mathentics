'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadges';
import {
    Users,
    DollarSign,
    AlertCircle,
    Eye,
    Edit,
    MoreVertical,
    TrendingUp,
    BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface BentoCourseCardProps {
    course: {
        id: string;
        title: string;
        description?: string;
        thumbnail_url?: string;
        is_published: boolean;
        price?: number;
        category?: string;
    };
    stats?: {
        students: number;
        revenue: number;
        expiringCount: number;
    };
    className?: string;
}

export function BentoCourseCard({ course, stats, className }: BentoCourseCardProps) {
    return (
        <Card className={cn(
            "group relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
            className
        )}>
            {/* Thumbnail Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                {course.thumbnail_url ? (
                    <Image
                        src={course.thumbnail_url}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Floating Status Badge */}
                <div className="absolute top-3 right-3">
                    <StatusBadge status={course.is_published ? 'published' : 'draft'} />
                </div>

                {/* Category Badge */}
                {course.category && (
                    <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white border-0 shadow-lg backdrop-blur-sm">
                            {course.category}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.title}
                    </h3>
                    {course.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                            {course.description}
                        </p>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 mb-1" />
                        <span className="text-lg font-black text-blue-900 dark:text-blue-100">{stats?.students || 0}</span>
                        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Students</span>
                    </div>

                    <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                        <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                        <span className="text-lg font-black text-emerald-900 dark:text-emerald-100">
                            {stats?.revenue ? `$${stats.revenue}` : '$0'}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Revenue</span>
                    </div>

                    <div className="flex flex-col items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                        <span className="text-lg font-black text-amber-900 dark:text-amber-100">{stats?.expiringCount || 0}</span>
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Expiring</span>
                    </div>
                </div>

                {/* Price */}
                {course.price !== undefined && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Price</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">
                            {course.price === 0 ? 'Free' : `$${course.price}`}
                        </span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    <Link href={`/admin/courses/${course.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2 border-slate-200 dark:border-slate-700">
                            <Eye className="w-4 h-4" />
                            View
                        </Button>
                    </Link>
                    <Link href={`/admin/courses/${course.id}/edit`} className="flex-1">
                        <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 dark:shadow-none">
                            <Edit className="w-4 h-4" />
                            Edit
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Expiring Alert Banner */}
            {stats && stats.expiringCount > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 flex items-center gap-2 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 animate-pulse" />
                    {stats.expiringCount} {stats.expiringCount === 1 ? 'subscription' : 'subscriptions'} expiring soon!
                </div>
            )}
        </Card>
    );
}
