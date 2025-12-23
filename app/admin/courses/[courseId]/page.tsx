"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    BarChart3,
    Users,
    Settings,
    ArrowLeft,
    ChevronRight,
    PlayCircle,
    FileText,
    TrendingUp,
    ShieldCheck
} from "lucide-react";
import { useCourseAnalytics } from "@/hooks/admin/useCourseAnalytics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDashboardPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const { data, isLoading } = useCourseAnalytics(courseId as string);

    if (isLoading) return <DashboardSkeleton />;

    const { course, stats } = data || {};

    const quickActions = [
        {
            title: "Course Builder",
            description: "Edit curriculum, add lessons, and organize modules.",
            icon: <BookOpen className="w-6 h-6 text-blue-500" />,
            href: `/admin/courses/${courseId}/builder`,
            color: "blue"
        },
        {
            title: "Performance Analytics",
            description: "View enrollment trends, revenue, and student progress.",
            icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
            href: `/admin/courses/${courseId}/analytics`,
            color: "indigo"
        },
        {
            title: "Learner Management",
            description: "Manage enrolled students and grant access manualy.",
            icon: <Users className="w-6 h-6 text-emerald-500" />,
            href: `/admin/students`, // Could be filtered in future
            color: "emerald"
        },
        {
            title: "Course Settings",
            description: "Update pricing, description, and visibility status.",
            icon: <Settings className="w-6 h-6 text-slate-500" />,
            href: `/admin/courses/${courseId}/settings`, // Future page
            color: "slate"
        }
    ];

    return (
        <div className="p-6 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950/50 min-h-screen">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push('/admin/courses')} className="rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white">{course?.title}</h1>
                    <p className="text-slate-500 dark:text-slate-400">Course Management Hub</p>
                </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-slate-900 border-none shadow-md overflow-hidden">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase">Total Students</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stats?.totalLearners}</h3>
                        </div>
                        <Users className="w-8 h-8 text-blue-500 opacity-20" />
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-900 border-none shadow-md overflow-hidden">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase">Revenue Generated</p>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white">₹{stats?.totalRevenue.toLocaleString()}</h3>
                        </div>
                        <TrendingUp className="w-8 h-8 text-emerald-500 opacity-20" />
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-slate-900 border-none shadow-md overflow-hidden">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-slate-400 uppercase">Status</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={course?.is_published ? "default" : "secondary"}>
                                    {course?.is_published ? "Published" : "Draft"}
                                </Badge>
                                <span className="text-xs text-slate-400">{course?.is_published ? "Visible to students" : "Hidden from search"}</span>
                            </div>
                        </div>
                        <ShieldCheck className="w-8 h-8 text-indigo-500 opacity-20" />
                    </CardContent>
                </Card>
            </div>

            {/* Tools Grid */}
            <div className="space-y-4">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Management Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quickActions.map((action, i) => (
                        <Link key={i} href={action.href}>
                            <Card className="group hover:scale-[1.02] transition-all cursor-pointer border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 dark:bg-slate-900">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm transition-colors`}>
                                        {action.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-black text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{action.title}</h3>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {action.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Content Snapshot Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <Card className="border-slate-200 dark:border-slate-800 bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <PlayCircle className="w-5 h-5 text-blue-500" />
                            Curriculum Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Total Lessons</span>
                            <span className="font-bold">{stats?.totalLessons} lessons published</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-full"></div>
                        </div>
                        <Button variant="outline" className="w-full mt-2" asChild>
                            <Link href={`/admin/courses/${courseId}/builder`}>Manage Curriculum</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800 bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5 text-emerald-500" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-2">
                            <Users className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-500">Join Student Management to see live activity logs</p>
                        <Button variant="link" size="sm" asChild>
                            <Link href="/admin/students">Go to Students</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function DashboardSkeleton() {
    return (
        <div className="p-8 space-y-8 animate-pulse">
            <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
            </div>
            <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
        </div>
    );
}
