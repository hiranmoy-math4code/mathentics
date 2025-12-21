'use client';

import { useEffect, useState } from 'react';
import { getStudentsWithEnrollments } from '@/actions/admin/students';
import { AddStudentDialog } from '@/components/admin/AddStudentDialog';
import { GrantAccessDialog } from '@/components/admin/GrantAccessDialog';
import { EditExpiryDialog } from '@/components/admin/EditExpiryDialog';
import { StatusBadge, ExpiryBadge, GrantTypeBadge } from '@/components/admin/StatusBadges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    UserPlus,
    Gift,
    Search,
    Users,
    TrendingUp,
    AlertCircle,
    BookOpen,
    Trophy,
    Loader2,
    MoreVertical,
    Edit,
    Eye,
    Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Student {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string;
    created_at: string;
    enrollments: any[];
    testSeriesEnrollments: any[];
    totalEnrollments: number;
    expiringSoonCount: number;
}

export default function StudentManagementClient({ courses, testSeries }: any) {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all');

    const [addStudentOpen, setAddStudentOpen] = useState(false);
    const [grantAccessOpen, setGrantAccessOpen] = useState(false);
    const [editExpiryOpen, setEditExpiryOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);

    const loadStudents = async () => {
        setLoading(true);
        const result = await getStudentsWithEnrollments({ status: statusFilter });
        if (result.success) {
            setStudents(result.data || []);
            setFilteredStudents(result.data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadStudents();
    }, [statusFilter]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = students.filter(s =>
                s.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.email?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStudents(filtered);
        } else {
            setFilteredStudents(students);
        }
    }, [searchQuery, students]);

    // Stats
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.totalEnrollments > 0).length;
    const expiringSoon = students.reduce((acc, s) => acc + s.expiringSoonCount, 0);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 dark:shadow-none">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            Student Management
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage enrollments and grant access</p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={() => setAddStudentOpen(true)}
                            className="bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-200 dark:shadow-none"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Student
                        </Button>
                        <Button
                            onClick={() => setGrantAccessOpen(true)}
                            className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 dark:shadow-none"
                        >
                            <Gift className="w-4 h-4 mr-2" />
                            Grant Access
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Students</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{totalStudents}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active Enrollments</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{activeStudents}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Expiring Soon</p>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{expiringSoon}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-800/50"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                            <SelectTrigger className="w-full sm:w-48 h-11">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Students</SelectItem>
                                <SelectItem value="active">Active Only</SelectItem>
                                <SelectItem value="expired">Expired Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </Card>

                {/* Students Table */}
                <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 px-4">
                            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                                <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">No students found</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Try adjusting your filters or add a new student</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Student
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Enrollments
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-10 h-10 border-2 border-slate-200 dark:border-slate-700">
                                                        <AvatarImage src={student.avatar_url} />
                                                        <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white font-bold">
                                                            {student.full_name?.charAt(0) || student.email.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold text-slate-900 dark:text-white">
                                                            {student.full_name || 'No Name'}
                                                        </p>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {student.enrollments.slice(0, 2).map((enrollment: any) => (
                                                        <div key={enrollment.id} className="flex items-center gap-2">
                                                            <Badge variant="outline" className="text-xs">
                                                                <BookOpen className="w-3 h-3 mr-1" />
                                                                {enrollment.courses?.title}
                                                            </Badge>
                                                            <ExpiryBadge expiresAt={enrollment.expires_at} />
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-6 w-6 p-0"
                                                                onClick={() => {
                                                                    console.log('Edit button clicked!', {
                                                                        enrollmentId: enrollment.id,
                                                                        studentName: student.full_name || student.email,
                                                                        courseName: enrollment.courses?.title,
                                                                        currentExpiry: enrollment.expires_at
                                                                    });
                                                                    setSelectedEnrollment({
                                                                        id: enrollment.id,
                                                                        type: 'course',
                                                                        studentName: student.full_name || student.email,
                                                                        courseName: enrollment.courses?.title,
                                                                        currentExpiry: enrollment.expires_at
                                                                    });
                                                                    setEditExpiryOpen(true);
                                                                    console.log('Dialog should open now');
                                                                }}
                                                            >
                                                                <Edit className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    {student.testSeriesEnrollments.slice(0, 1).map((enrollment: any) => (
                                                        <div key={enrollment.id} className="flex items-center gap-2">
                                                            <Badge variant="outline" className="text-xs">
                                                                <Trophy className="w-3 h-3 mr-1" />
                                                                {enrollment.test_series?.title}
                                                            </Badge>
                                                            <ExpiryBadge expiresAt={enrollment.expires_at} />
                                                        </div>
                                                    ))}
                                                    {student.totalEnrollments > 3 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            +{student.totalEnrollments - 3} more
                                                        </Badge>
                                                    )}
                                                    {student.totalEnrollments === 0 && (
                                                        <span className="text-sm text-slate-400">No enrollments</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.expiringSoonCount > 0 && (
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-amber-500" />
                                                        <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                                            {student.expiringSoonCount} expiring soon
                                                        </span>
                                                    </div>
                                                )}
                                                {student.totalEnrollments > 0 && student.expiringSoonCount === 0 && (
                                                    <StatusBadge status="active" size="sm" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/admin/students/${student.id}`}>
                                                    <Button variant="ghost" size="sm" className="gap-2">
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>

            {/* Modals */}
            <AddStudentDialog
                open={addStudentOpen}
                onOpenChange={setAddStudentOpen}
                onSuccess={loadStudents}
            />
            <GrantAccessDialog
                open={grantAccessOpen}
                onOpenChange={setGrantAccessOpen}
                onSuccess={loadStudents}
                courses={courses}
                testSeries={testSeries}
            />
            <EditExpiryDialog
                open={editExpiryOpen}
                onOpenChange={setEditExpiryOpen}
                onSuccess={loadStudents}
                enrollment={selectedEnrollment}
            />
        </div>
    );
}
