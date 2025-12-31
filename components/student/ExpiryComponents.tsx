'use client';

import { AlertTriangle, Lock, RefreshCw, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ExpiryWarningBannerProps {
    daysRemaining: number;
    expiresAt: string;
    courseTitle: string;
    courseId: string;
    urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export function ExpiryWarningBanner({
    daysRemaining,
    expiresAt,
    courseTitle,
    courseId,
    urgencyLevel
}: ExpiryWarningBannerProps) {
    const expiryDate = new Date(expiresAt);

    const urgencyConfig = {
        CRITICAL: {
            bg: 'bg-gradient-to-r from-red-500 via-orange-500 to-red-600',
            text: 'text-white',
            icon: AlertTriangle,
            message: '⚡ URGENT: Your access expires TODAY!',
            animate: 'animate-pulse'
        },
        HIGH: {
            bg: 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600',
            text: 'text-white',
            icon: AlertTriangle,
            message: '⏰ Access expiring in ' + daysRemaining + ' days',
            animate: 'animate-bounce'
        },
        MEDIUM: {
            bg: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600',
            text: 'text-white',
            icon: Calendar,
            message: 'Renew soon! Access expires in ' + daysRemaining + ' days',
            animate: ''
        },
        LOW: {
            bg: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600',
            text: 'text-white',
            icon: Calendar,
            message: daysRemaining + ' days of access remaining',
            animate: ''
        }
    };

    const config = urgencyConfig[urgencyLevel];
    const Icon = config.icon;

    return (
        <div className={cn(
            'relative overflow-hidden rounded-xl p-6 shadow-xl mb-6',
            config.bg
        )}>
            {/* Animated background effect for critical */}
            {urgencyLevel === 'CRITICAL' && (
                <div className="absolute inset-0 bg-black/20 animate-pulse" />
            )}

            <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                    <div className={cn('p-3 rounded-full bg-white/20', config.animate)}>
                        <Icon className={cn('w-6 h-6', config.text)} />
                    </div>
                    <div>
                        <h3 className={cn('text-xl font-bold', config.text)}>
                            {config.message}
                        </h3>
                        <p className={cn('text-sm mt-1 opacity-90', config.text)}>
                            Expires on {expiryDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>

                <Link href={`/courses/${courseId}/renew`}>
                    <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Renew Now
                    </Button>
                </Link>
            </div>

            {/* Urgency indicator */}
            {urgencyLevel === 'CRITICAL' && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-red-700 text-white text-xs font-black uppercase tracking-wider">
                    Last Day!
                </div>
            )}
        </div>
    );
}

interface ExpiredAccessBlockerProps {
    courseTitle: string;
    courseId: string;
    expiredAt: string;
    courseThumbnail?: string;
    coursePrice?: number;
}

export function ExpiredAccessBlocker({
    courseTitle,
    courseId,
    expiredAt,
    courseThumbnail,
    coursePrice
}: ExpiredAccessBlockerProps) {
    const expiredDate = new Date(expiredAt);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="max-w-2xl w-full">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    {/* Header with course thumbnail */}
                    {courseThumbnail && (
                        <div className="relative h-48 bg-gradient-to-br from-red-500 to-orange-600">
                            <img
                                src={courseThumbnail}
                                alt={courseTitle}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-6 rounded-full bg-white/10 backdrop-blur-xl">
                                    <Lock className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-8 text-center">
                        {/* Expired badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-500/20 border-2 border-red-500 mb-6">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            <span className="font-black uppercase text-sm text-red-600 dark:text-red-400 tracking-wider">
                                Access Expired
                            </span>
                        </div>

                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                            Your Access Has Ended
                        </h1>
                        <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-6">
                            {courseTitle}
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                            Your enrollment expired on:
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white mb-8">
                            {expiredDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-500/20">
                            <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                                Want to continue learning?
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Re-enroll now to regain access to all course materials, lessons, and your progress!
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href={`/courses/${courseId}`}>
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-xl">
                                    <RefreshCw className="w-5 h-5 mr-2" />
                                    Re-Enroll Now
                                    {coursePrice && <span className="ml-2">• ₹{coursePrice}</span>}
                                </Button>
                            </Link>
                            <Link href="/student/dashboard">
                                <Button size="lg" variant="outline" className="font-semibold">
                                    Back to Dashboard
                                </Button>
                            </Link>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
                            💡 Your progress is saved! Re-enroll to pick up right where you left off.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface DashboardExpiryBadgeProps {
    daysRemaining: number | null;
    isExpired: boolean;
    urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | null;
}

export function DashboardExpiryBadge({ daysRemaining, isExpired, urgencyLevel }: DashboardExpiryBadgeProps) {
    if (isExpired) {
        return (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/30">
                <Lock className="w-3 h-3 text-red-600 dark:text-red-400" />
                <span className="text-xs font-bold text-red-600 dark:text-red-400">EXPIRED</span>
            </div>
        );
    }

    // ✅ Allow 0 days remaining to show badge
    if (daysRemaining === null || daysRemaining === undefined || !urgencyLevel) return null;

    const urgencyColors = {
        CRITICAL: 'bg-red-100 dark:bg-red-500/20 border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400',
        HIGH: 'bg-orange-100 dark:bg-orange-500/20 border-orange-300 dark:border-orange-500/30 text-orange-600 dark:text-orange-400',
        MEDIUM: 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400',
        LOW: 'bg-blue-100 dark:bg-blue-500/20 border-blue-300 dark:border-blue-500/30 text-blue-600 dark:text-blue-400'
    };

    return (
        <div className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-bold',
            urgencyColors[urgencyLevel],
            urgencyLevel === 'CRITICAL' && 'animate-pulse'
        )}>
            <Calendar className="w-3 h-3" />
            <span>{daysRemaining === 0 ? 'EXPIRES TODAY' : `${daysRemaining}d left`}</span>
        </div>
    );
}
