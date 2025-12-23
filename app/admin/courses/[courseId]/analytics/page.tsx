"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Users,
    DollarSign,
    BookOpen,
    TrendingUp,
    ArrowLeft,
    Calendar,
    Download,
    BarChart3,
    Clock,
    Award
} from "lucide-react";
import { useCourseAnalytics } from "@/hooks/admin/useCourseAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from "recharts";
import { format, subDays, isSameDay, startOfDay } from "date-fns";

export default function CourseAnalyticsPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const { data, isLoading, error } = useCourseAnalytics(courseId as string);

    const enrollmentData = useMemo(() => {
        if (!data) return [];

        // Last 14 days
        const last14Days = Array.from({ length: 14 }, (_, i) => {
            const date = subDays(new Date(), i);
            return {
                date: format(date, 'MMM dd'),
                fullDate: date,
                count: 0
            };
        }).reverse();

        data.recentEnrollments.forEach((e: any) => {
            const eDate = new Date(e.created_at);
            const dataPoint = last14Days.find(d => isSameDay(d.fullDate, eDate));
            if (dataPoint) dataPoint.count++;
        });

        return last14Days;
    }, [data]);

    const revenueData = useMemo(() => {
        if (!data) return [];

        // Group revenue by month if available, or just recent days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), i);
            return {
                name: format(date, 'EEE'),
                revenue: 0,
                fullDate: date
            };
        }).reverse();

        data.payments.forEach((p: any) => {
            const pDate = new Date(p.created_at);
            const dataPoint = last7Days.find(d => isSameDay(d.fullDate, pDate));
            if (dataPoint) dataPoint.revenue += p.amount;
        });

        return last7Days;
    }, [data]);

    if (isLoading) return <AnalyticsSkeleton />;

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <BarChart3 className="w-16 h-16 text-slate-300" />
                <h2 className="text-xl font-bold">Failed to load analytics</h2>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    const { course, stats } = data;

    return (
        <div className="p-6 md:p-8 space-y-8 bg-slate-50 dark:bg-slate-950/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-wider">Course Analytics</Badge>
                            <span className="text-xs text-slate-400">Live Insights</span>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">{course.title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Learners"
                    value={stats.totalLearners}
                    icon={<Users className="w-5 h-5" />}
                    trend="+12% from last month"
                    color="indigo"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue.toLocaleString()}`}
                    icon={<DollarSign className="w-5 h-5" />}
                    trend="+5% from last month"
                    color="emerald"
                />
                <StatCard
                    title="Avg. Completion"
                    value={`${stats.avgProgress}%`}
                    icon={<TrendingUp className="w-5 h-5" />}
                    trend="Steady growth"
                    color="blue"
                />
                <StatCard
                    title="Course Content"
                    value={`${stats.totalLessons} Lessons`}
                    icon={<BookOpen className="w-5 h-5" />}
                    trend="2 New modules added"
                    color="amber"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Enrollment Chart */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900 overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-500" />
                            Enrollment Trend
                        </CardTitle>
                        <CardDescription>Daily student registrations over the last 14 days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={enrollmentData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCount)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenue Breakdown */}
                <Card className="lg:col-span-1 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-emerald-500" />
                            Weekly Revenue
                        </CardTitle>
                        <CardDescription>Sales performance this week</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={2000}>
                                    {revenueData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 6 ? '#10b981' : '#10b98144'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Popular Contents (Placeholder logic for now) */}
                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent Enrollments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recentEnrollments.slice(0, 5).map((e: any, i: number) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">New Learner</p>
                                            <p className="text-xs text-slate-400">{format(new Date(e.created_at), 'MMM d, h:mm a')}</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="text-[10px]">SUCCESS</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Logs / Activity */}
                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex gap-4">
                            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Peak Performance</h4>
                                <p className="text-sm text-slate-500">Most students enroll on Sundays between 6 PM - 9 PM.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Completion Warning</h4>
                                <p className="text-sm text-slate-500">Module 3 has the highest drop-off rate. Consider reviewing the difficulty.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, trend, color }: { title: string, value: string | number, icon: React.ReactNode, trend: string, color: 'indigo' | 'emerald' | 'blue' | 'amber' }) {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
        emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
    };

    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden relative">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-xl ${colors[color]}`}>
                        {icon}
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h3>
                    <p className="text-xs text-slate-500 font-medium pt-1">{trend}</p>
                </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${color === 'indigo' ? 'bg-indigo-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
        </Card>
    );
}

function AnalyticsSkeleton() {
    return (
        <div className="p-8 space-y-8 animate-pulse">
            <div className="flex justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
            </div>
            <div className="grid grid-cols-3 gap-8">
                <Skeleton className="col-span-2 h-[450px] rounded-2xl" />
                <Skeleton className="col-span-1 h-[450px] rounded-2xl" />
            </div>
        </div>
    );
}
