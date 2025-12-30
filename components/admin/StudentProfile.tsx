'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Calendar, BookOpen, Trophy,
    FileText, History, ArrowLeft, RefreshCw,
    TrendingUp, Target, Award, Clock,
    ChevronRight, ExternalLink, MoreVertical,
    IdCard, ShieldCheck, Monitor, UserX, Edit, Trash2
} from 'lucide-react';
import { useStudentDetails, useResetSessions } from '@/hooks/admin/useAdminStudents';
import { useUserActions } from '@/hooks/admin/useUserActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge, ExpiryBadge, GrantTypeBadge } from './StatusBadges';
import { formatDistanceToNow, format } from 'date-fns';
import { EditExpiryDialog } from './EditExpiryDialog';
import { GrantAccessDialog } from './GrantAccessDialog';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { EditProfileDialog } from '@/components/admin/EditProfileDialog';

interface StudentProfileProps {
    studentId: string;
}

export function StudentProfile({ studentId }: StudentProfileProps) {
    const { data: details, isLoading, error, refetch } = useStudentDetails(studentId);
    const { mutate: resetSessions, isPending: isResetting } = useResetSessions();
    const [activeTab, setActiveTab] = useState('overview');

    // Management Dialog States
    const [editExpiryOpen, setEditExpiryOpen] = useState(false);
    const [grantAccessOpen, setGrantAccessOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);

    // User actions hook - MUST be before conditional returns
    const {
        handleToggleBlock,
        handleDeleteChat,
        handleEditProfile,
        confirmToggleBlock,
        confirmDeleteChat,
        isBlocking,
        isDeleting,
        isBanned,
        blockDialogOpen,
        setBlockDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        editProfileOpen,
        setEditProfileOpen,
        confirmAction,
        userName
    } = useUserActions({
        userId: studentId,
        userName: details?.student?.full_name || details?.student?.email || 'User'
    });

    // Fetch resources for GrantAccessDialog
    const supabase = createClient();
    const { data: resources } = useQuery({
        queryKey: ['admin-resources'],
        queryFn: async () => {
            const [coursesRes, seriesRes] = await Promise.all([
                supabase.from('courses').select('id, title').eq('course_type', 'course').eq('is_published', true),
                supabase.from('courses').select('id, title').eq('course_type', 'test_series').eq('is_published', true)
            ]);
            return {
                courses: coursesRes.data || [],
                testSeries: seriesRes.data || []
            };
        }
    });

    if (isLoading) return <StudentProfileSkeleton />;
    if (error) return <StudentProfileError message={error.message} />;
    if (!details) return null;

    const { student, enrollments, attempts, logs, stats } = details;

    // Separate enrollments by course_type
    const courseEnrollments = enrollments?.filter((e: any) => e.courses?.course_type === 'course') || [];
    const testSeriesEnrollments = enrollments?.filter((e: any) => e.courses?.course_type === 'test_series') || [];

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* 🔝 Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/students">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Student Profile</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">View and manage student activity</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setGrantAccessOpen(true)}
                    >
                        <Award className="w-4 h-4 text-emerald-500" />
                        Grant Access
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => refetch()}
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-rose-600 border-rose-200 hover:bg-rose-50 dark:border-rose-900/50"
                        onClick={() => {
                            if (window.confirm('Are you sure you want to reset all active sessions for this student? This will sign them out of all devices.')) {
                                resetSessions(studentId);
                            }
                        }}
                        disabled={isResetting}
                    >
                        <ShieldCheck className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
                        {isResetting ? 'Resetting...' : 'Reset Session'}
                    </Button>
                </div>
            </div>

            {/* 👤 Profile Overview Card */}
            <Card className="overflow-hidden border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl">
                <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 dark:opacity-40" />
                <CardContent className="relative pt-0 px-6 pb-6">
                    <div className="flex flex-col md:flex-row gap-6 -mt-12 md:items-end">
                        <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-800 shadow-xl">
                            <AvatarImage src={student.avatar_url} />
                            <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                                {student.full_name?.charAt(0) || student.email.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                    {student.full_name || 'No Name'}
                                </h2>
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border-none">
                                    Student ID: {student.id.slice(0, 8)}...
                                </Badge>
                                {isBanned && (
                                    <Badge variant="destructive" className="bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                                        <UserX className="w-3 h-3 mr-1" />
                                        Blocked
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" />
                                    {student.email}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    Joined {format(new Date(student.created_at), 'MMMM yyyy')}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                                Send Message
                            </Button>
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreVertical className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleEditProfile}
                                        className="cursor-pointer"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleToggleBlock}
                                        disabled={isBlocking}
                                        className="cursor-pointer text-orange-600 focus:text-orange-600"
                                    >
                                        <UserX className="w-4 h-4 mr-2" />
                                        {isBlocking ? 'Processing...' : isBanned ? 'Unblock User' : 'Block User'}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleDeleteChat}
                                        disabled={isDeleting}
                                        className="cursor-pointer text-rose-600 focus:text-rose-600"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        {isDeleting ? 'Deleting...' : 'Delete Chat History'}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Enrollments</div>
                            <div className="flex items-end gap-2">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalEnrollments}</div>
                                <BookOpen className="w-5 h-5 text-indigo-500 mb-1" />
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Exam Attempts</div>
                            <div className="flex items-end gap-2">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalAttempts}</div>
                                <FileText className="w-5 h-5 text-purple-500 mb-1" />
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Avg. Score</div>
                            <div className="flex items-end gap-2">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.avgPercentage}%</div>
                                <Target className="w-5 h-5 text-emerald-500 mb-1" />
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Active Devices</div>
                            <div className="flex items-end gap-2">
                                <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.activeSessions || 0}</div>
                                <Monitor className="w-5 h-5 text-blue-500 mb-1" />
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Status</div>
                            <div className="flex items-end gap-2">
                                <StatusBadge status={enrollments.length > 0 ? 'active' : 'pending'} size="sm" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 📊 Detailed Content Tabs */}
            <Tabs defaultValue="courses" onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-2 overflow-x-auto">
                    <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl h-11 inline-flex flex-nowrap min-w-max">
                        <TabsTrigger value="courses" className="rounded-lg px-4 font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm whitespace-nowrap">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Courses
                        </TabsTrigger>
                        <TabsTrigger value="test-series" className="rounded-lg px-4 font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm whitespace-nowrap">
                            <Trophy className="w-4 h-4 mr-2" />
                            Test Series
                        </TabsTrigger>
                        <TabsTrigger value="attempts" className="rounded-lg px-4 font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm whitespace-nowrap">
                            <FileText className="w-4 h-4 mr-2" />
                            Exam Attempts
                        </TabsTrigger>
                        <TabsTrigger value="logs" className="rounded-lg px-4 font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm whitespace-nowrap">
                            <History className="w-4 h-4 mr-2" />
                            Activity Logs
                        </TabsTrigger>
                    </TabsList>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TabsContent value="courses" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {courseEnrollments.length === 0 ? (
                                    <EmptyState label="No courses enrolled" icon={BookOpen} />
                                ) : (
                                    courseEnrollments.map((en: any) => (
                                        <Card key={en.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                                            <CardContent className="p-0">
                                                <div className="flex h-32">
                                                    <div className="w-32 h-full bg-slate-100 dark:bg-slate-800 relative shrink-0 overflow-hidden">
                                                        <img
                                                            src={en.courses.thumbnail_url || '/placeholder-course.png'}
                                                            alt={en.courses.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 dark:text-white truncate" title={en.courses.title}>
                                                                {en.courses.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <ExpiryBadge expiresAt={en.expires_at} />
                                                                <GrantTypeBadge grantType={en.grant_type} />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                                                    onClick={() => {
                                                                        setSelectedEnrollment({
                                                                            id: en.id,
                                                                            type: 'course',
                                                                            studentName: student.full_name || student.email,
                                                                            courseName: en.courses.title,
                                                                            currentExpiry: en.expires_at
                                                                        });
                                                                        setEditExpiryOpen(true);
                                                                    }}
                                                                >
                                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                                <span>Progress</span>
                                                                <span>{en.progress_percentage || 0}%</span>
                                                            </div>
                                                            <Progress value={en.progress_percentage || 0} className="h-1.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="test-series" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {testSeriesEnrollments.length === 0 ? (
                                    <EmptyState label="No test series enrolled" icon={Trophy} />
                                ) : (
                                    testSeriesEnrollments.map((en: any) => (
                                        <Card key={en.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
                                            <CardContent className="p-0">
                                                <div className="flex h-32">
                                                    <div className="w-32 h-full bg-slate-100 dark:bg-slate-800 relative shrink-0 overflow-hidden">
                                                        <img
                                                            src={en.courses.thumbnail_url || '/placeholder-course.png'}
                                                            alt={en.courses.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 dark:text-white truncate" title={en.courses.title}>
                                                                {en.courses.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <ExpiryBadge expiresAt={en.expires_at} />
                                                                <GrantTypeBadge grantType={en.grant_type} />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="w-6 h-6 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                                                    onClick={() => {
                                                                        setSelectedEnrollment({
                                                                            id: en.id,
                                                                            type: 'test_series',
                                                                            studentName: student.full_name || student.email,
                                                                            courseName: en.courses.title,
                                                                            currentExpiry: en.expires_at
                                                                        });
                                                                        setEditExpiryOpen(true);
                                                                    }}
                                                                >
                                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                                <span>Progress</span>
                                                                <span>{en.progress_percentage || 0}%</span>
                                                            </div>
                                                            <Progress value={en.progress_percentage || 0} className="h-1.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="attempts" className="mt-0">
                            <Card className="border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                            <tr>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">Exam</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">Date</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500">Score</th>
                                                <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                            {attempts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                                        No exam attempts found
                                                    </td>
                                                </tr>
                                            ) : (
                                                attempts.map((att: any) => (
                                                    <tr key={att.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{att.exams.title}</p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <StatusBadge status={att.status === 'submitted' ? 'completed' : 'pending'} size="sm" />
                                                                    <span className="text-[10px] text-slate-400 font-medium">#{att.id.slice(0, 8)}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                            {format(new Date(att.created_at), 'MMM d, p')}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {att.status === 'submitted' && att.results ? (
                                                                <div className="space-y-1">
                                                                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{att.percentage}%</div>
                                                                    <div className="text-[10px] text-slate-400">{att.obtained_marks} / {att.total_marks}</div>
                                                                </div>
                                                            ) : (
                                                                <span className="text-slate-400 text-sm italic">N/A</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <Link href={`/admin/students/review/${att.id}`}>
                                                                <Button variant="ghost" size="sm" className="h-8 px-2" disabled={att.status !== 'submitted'}>
                                                                    <ExternalLink className="w-4 h-4 mr-1.5" />
                                                                    Review
                                                                </Button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="logs" className="mt-0">
                            <div className="space-y-4">
                                {logs.length === 0 ? (
                                    <EmptyState label="No administrative logs" icon={History} />
                                ) : (
                                    logs.map((log: any) => (
                                        <div key={log.id} className="flex gap-4 group">
                                            <div className="flex flex-col items-center shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                                    <History className="w-5 h-5" />
                                                </div>
                                                <div className="w-px flex-1 bg-slate-100 dark:bg-slate-800 group-last:hidden" />
                                            </div>
                                            <div className="pb-8 flex-1">
                                                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <p className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider">
                                                            {log.action_type}
                                                        </p>
                                                        <span className="text-[10px] text-slate-400 font-medium">
                                                            {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                        {log.details || `Admin granted access to the content.`}
                                                    </p>
                                                    <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                                                                {log.performed_by_profile?.full_name?.charAt(0) || 'A'}
                                                            </div>
                                                            <span className="text-xs font-semibold text-slate-500">
                                                                {log.performed_by_profile?.full_name || 'System Admin'}
                                                            </span>
                                                        </div>
                                                        <Badge variant="outline" className="text-[9px] uppercase tracking-tighter">
                                                            IP: {log.ip_address || 'Internal'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </TabsContent>
                    </motion.div>
                </AnimatePresence>
            </Tabs>

            {/* Management Dialogs */}
            <EditExpiryDialog
                open={editExpiryOpen}
                onOpenChange={setEditExpiryOpen}
                onSuccess={() => refetch()}
                enrollment={selectedEnrollment}
            />
            <GrantAccessDialog
                open={grantAccessOpen}
                onOpenChange={setGrantAccessOpen}
                onSuccess={() => refetch()}
                courses={resources?.courses || []}
                testSeries={resources?.testSeries || []}
            />

            {/* User Action Confirmation Dialogs */}
            <ConfirmDialog
                open={blockDialogOpen}
                onOpenChange={setBlockDialogOpen}
                title={confirmAction === 'block' ? 'Block User' : 'Unblock User'}
                description={
                    confirmAction === 'block'
                        ? `Are you sure you want to block ${userName}? They will not be able to access the platform.`
                        : `Are you sure you want to unblock ${userName}? They will regain access to the platform.`
                }
                confirmText={confirmAction === 'block' ? 'Block User' : 'Unblock User'}
                variant={confirmAction === 'block' ? 'destructive' : 'default'}
                onConfirm={confirmToggleBlock}
            />
            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Chat History"
                description={`Are you sure you want to delete all chat history for ${userName}? This action cannot be undone.`}
                confirmText="Delete"
                variant="destructive"
                onConfirm={confirmDeleteChat}
            />
            <EditProfileDialog
                open={editProfileOpen}
                onOpenChange={setEditProfileOpen}
                userId={studentId}
                currentData={{
                    fullName: student.full_name || '',
                    email: student.email,
                    phone: student.phone || ''
                }}
                onSuccess={() => refetch()}
            />
        </div>
    );
}

function EmptyState({ label, icon: Icon }: { label: string; icon: any }) {
    return (
        <Card className="p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                <Icon className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-slate-500 font-semibold">{label}</p>
        </Card>
    );
}

function StudentProfileSkeleton() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="w-48 h-6" />
                    <Skeleton className="w-32 h-4" />
                </div>
            </div>
            <Skeleton className="w-full h-48 rounded-2xl" />
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
            </div>
            <Skeleton className="w-full h-96 rounded-2xl" />
        </div>
    );
}

function StudentProfileError({ message }: { message: string }) {
    return (
        <div className="p-8 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-rose-500 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to load student</h3>
            <p className="text-slate-500 mb-6">{message}</p>
            <Link href="/admin/students">
                <Button className="w-full">Back to Student List</Button>
            </Link>
        </div>
    );
}
