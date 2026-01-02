import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Medal, Trophy, Award, Loader2, Star, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useExamLeaderboard, ExamLeaderboardEntry } from '@/hooks/useExamLeaderboard';
import { Skeleton } from '@/components/ui/skeleton';

interface ExamLeaderboardProps {
    examId: string;
    examTitle?: string;
    currentUserId: string;
    limit?: number;
    className?: string;
}

/**
 * ExamLeaderboard Component
 * Displays exam-specific rankings with professional UI
 * Features: Top 3 highlighting, current user glow, performance badges, real-time updates
 */
export function ExamLeaderboard({
    examId,
    examTitle,
    currentUserId,
    limit = 50,
    className = '',
}: ExamLeaderboardProps) {
    const { data: leaderboard, isLoading, error } = useExamLeaderboard(examId, limit, true);

    // Get performance badge based on percentage
    const getPerformanceBadge = (percentage: number) => {
        if (percentage >= 90) {
            return {
                label: 'Excellent',
                icon: <Star className="w-3 h-3" />,
                className: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white',
            };
        } else if (percentage >= 75) {
            return {
                label: 'Great',
                icon: <Star className="w-3 h-3" />,
                className: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white',
            };
        } else if (percentage >= 60) {
            return {
                label: 'Good',
                icon: <Sparkles className="w-3 h-3" />,
                className: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
            };
        } else {
            return {
                label: 'Keep Going',
                icon: <Award className="w-3 h-3" />,
                className: 'bg-gradient-to-r from-slate-400 to-gray-500 text-white',
            };
        }
    };

    // Get rank badge/icon
    const getRankDisplay = (rank: number) => {
        if (rank === 1) {
            return <Crown className="w-7 h-7 text-yellow-600" />;
        } else if (rank === 2) {
            return <Medal className="w-6 h-6 text-slate-500" />;
        } else if (rank === 3) {
            return <Medal className="w-6 h-6 text-orange-600" />;
        } else if (rank <= 10) {
            return (
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">#{rank}</span>
                </div>
            );
        } else {
            return <span className="text-sm font-semibold text-slate-500">#{rank}</span>;
        }
    };

    // Get card styling based on rank
    const getCardClassName = (rank: number, isCurrentUser: boolean) => {
        let baseClass = 'rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]';

        if (isCurrentUser) {
            return `${baseClass} relative bg-indigo-100/50 dark:bg-indigo-900/30 border-2 border-indigo-500 shadow-lg shadow-indigo-500/50`;
        }

        if (rank === 1) {
            return `${baseClass} bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-amber-600/20 border-2 border-yellow-300 shadow-xl`;
        } else if (rank === 2) {
            return `${baseClass} bg-gradient-to-r from-slate-300/20 via-gray-400/20 to-slate-500/20 border-2 border-slate-300 shadow-lg`;
        } else if (rank === 3) {
            return `${baseClass} bg-gradient-to-r from-orange-400/20 via-amber-500/20 to-orange-600/20 border-2 border-orange-300 shadow-lg`;
        } else {
            return `${baseClass} bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md`;
        }
    };

    if (error) {
        return (
            <Card className={className}>
                <CardContent className="py-8 text-center">
                    <p className="text-sm text-red-500">Failed to load leaderboard</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={`${className} backdrop-blur-xl bg-white/70 dark:bg-slate-800/60 border-0 shadow-xl`}>
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-700">
                <CardTitle className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Exam Leaderboard</h3>
                        {examTitle && (
                            <p className="text-sm font-normal text-slate-600 dark:text-slate-400 mt-1">{examTitle}</p>
                        )}
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-4">
                {isLoading ? (
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        ))}
                    </div>
                ) : leaderboard && leaderboard.length > 0 ? (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {leaderboard.map((entry, index) => {
                                const isCurrentUser = entry.student_id === currentUserId;
                                const performanceBadge = getPerformanceBadge(entry.percentage);

                                return (
                                    <motion.div
                                        key={entry.student_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        className={getCardClassName(entry.rank, isCurrentUser)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Rank Badge */}
                                            <div className="flex-shrink-0">{getRankDisplay(entry.rank)}</div>

                                            {/* Avatar */}
                                            <Avatar className={`${entry.rank <= 3 ? 'w-12 h-12' : 'w-10 h-10'} border-2 border-white dark:border-slate-700`}>
                                                <AvatarImage src={entry.avatar_url || undefined} />
                                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                    {entry.full_name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>

                                            {/* Student Info */}
                                            <div className="flex-1 min-w-0">
                                                <p
                                                    className={`font-semibold truncate ${isCurrentUser
                                                            ? 'text-indigo-700 dark:text-indigo-300'
                                                            : 'text-slate-800 dark:text-slate-200'
                                                        }`}
                                                >
                                                    {entry.full_name}
                                                    {isCurrentUser && ' (You)'}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {entry.obtained_marks}/{entry.total_marks} ({entry.percentage.toFixed(1)}%)
                                                </p>
                                            </div>

                                            {/* Performance Badge */}
                                            <Badge className={`${performanceBadge.className} flex items-center gap-1 px-2 py-1 text-xs shadow-md`}>
                                                {performanceBadge.icon}
                                                {performanceBadge.label}
                                            </Badge>
                                        </div>

                                        {/* Progress Bar for Top 3 */}
                                        {entry.rank <= 3 && (
                                            <Progress value={entry.percentage} className="mt-2 h-2" />
                                        )}

                                        {/* Motivational Message for Current User */}
                                        {isCurrentUser && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-xs text-center text-indigo-600 dark:text-indigo-400 mt-2 font-medium"
                                            >
                                                ✨ {entry.rank === 1 ? 'Amazing! You\'re #1!' : entry.rank <= 3 ? 'Great job! Keep it up!' : 'Keep pushing forward!'}
                                            </motion.p>
                                        )}

                                        {/* Pulse Animation for Current User */}
                                        {isCurrentUser && (
                                            <motion.div
                                                className="absolute inset-0 rounded-xl border-2 border-indigo-500 pointer-events-none"
                                                animate={{
                                                    boxShadow: [
                                                        '0 0 20px rgba(99, 102, 241, 0.5)',
                                                        '0 0 40px rgba(99, 102, 241, 0.8)',
                                                        '0 0 20px rgba(99, 102, 241, 0.5)',
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Trophy className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-sm text-slate-500 dark:text-slate-400">No results yet</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Be the first to complete this exam!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
