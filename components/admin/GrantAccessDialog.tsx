'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { searchStudents } from '@/actions/admin/students';
import { grantCourseAccess, grantTestSeriesAccess } from '@/actions/admin/grantAccess';
import { toast } from 'sonner';
import { Loader2, Gift, Search, Calendar, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GrantAccessDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    courses?: Array<{ id: string; title: string; thumbnail_url?: string }>;
    testSeries?: Array<{ id: string; title: string }>;
}

export function GrantAccessDialog({ open, onOpenChange, onSuccess, courses = [], testSeries = [] }: GrantAccessDialogProps) {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);

    const [formData, setFormData] = useState({
        selectedStudent: null as any,
        accessType: 'course' as 'course' | 'test_series',
        selectedCourse: '',
        selectedTestSeries: '',
        expiryDate: '',
        notes: ''
    });

    // Search students as user types
    useEffect(() => {
        const searchDebounce = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setSearching(true);
                const result = await searchStudents(searchQuery);
                if (result.success) {
                    setSearchResults(result.data || []);
                }
                setSearching(false);
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(searchDebounce);
    }, [searchQuery]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.selectedStudent) {
            toast.error('Please select a student');
            return;
        }

        if (formData.accessType === 'course' && !formData.selectedCourse) {
            toast.error('Please select a course');
            return;
        }

        if (formData.accessType === 'test_series' && !formData.selectedTestSeries) {
            toast.error('Please select a test series');
            return;
        }

        setLoading(true);

        try {
            const expiryDate = formData.expiryDate ? new Date(formData.expiryDate) : null;

            let result;
            if (formData.accessType === 'course') {
                result = await grantCourseAccess({
                    userId: formData.selectedStudent.id,
                    courseId: formData.selectedCourse,
                    expiresAt: expiryDate,
                    notes: formData.notes
                });
            } else {
                result = await grantTestSeriesAccess({
                    userId: formData.selectedStudent.id,
                    testSeriesId: formData.selectedTestSeries,
                    expiresAt: expiryDate,
                    notes: formData.notes
                });
            }

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Access granted successfully! 🎉');
                onOpenChange(false);
                resetForm();
                onSuccess?.();
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to grant access');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            selectedStudent: null,
            accessType: 'course',
            selectedCourse: '',
            selectedTestSeries: '',
            expiryDate: '',
            notes: ''
        });
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => { onOpenChange(open); if (!open) resetForm(); }}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-0 gap-0">
                {/* Decorative gradient header */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-t-lg" />

                {/* Fixed Header */}
                <DialogHeader className="space-y-3 pt-6 px-6 pb-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200 dark:shadow-none">
                            <Gift className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Grant Access
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
                                Assign a course or test series to a student
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto px-6 min-h-0">
                    <form id="grantAccessForm" onSubmit={handleSubmit} className="space-y-4 pb-4">
                        {/* Student Search */}
                        <div className="space-y-2">
                            <Label htmlFor="studentSearch" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Search className="w-4 h-4 text-emerald-500" />
                                Search Student
                            </Label>
                            <div className="relative">
                                <Input
                                    id="studentSearch"
                                    type="text"
                                    placeholder="Type name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 pr-10"
                                />
                                {searching && (
                                    <Loader2 className="absolute right-3 top-3 w-5 h-5 animate-spin text-slate-400" />
                                )}
                            </div>

                            {/* Search Results */}
                            {searchResults.length > 0 && (
                                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-lg max-h-48 overflow-y-auto">
                                    {searchResults.map((student) => (
                                        <button
                                            key={student.id}
                                            type="button"
                                            onClick={() => {
                                                setFormData({ ...formData, selectedStudent: student });
                                                setSearchQuery(student.full_name || student.email);
                                                setSearchResults([]);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0",
                                                formData.selectedStudent?.id === student.id && "bg-emerald-50 dark:bg-emerald-500/10"
                                            )}
                                        >
                                            <div className="font-medium text-slate-900 dark:text-white">{student.full_name || 'No name'}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{student.email}</div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Selected Student Display */}
                            {formData.selectedStudent && searchResults.length === 0 && (
                                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                        <div className="flex-1">
                                            <div className="font-semibold text-emerald-900 dark:text-emerald-100">{formData.selectedStudent.full_name}</div>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400">{formData.selectedStudent.email}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Access Type */}
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Access Type</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, accessType: 'course', selectedTestSeries: '' })}
                                    className={cn(
                                        "p-4 rounded-xl border-2 transition-all text-left",
                                        formData.accessType === 'course'
                                            ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                                            : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                                    )}
                                >
                                    <BookOpen className={cn("w-5 h-5 mb-2", formData.accessType === 'course' ? "text-blue-500" : "text-slate-400")} />
                                    <div className="font-semibold text-sm text-slate-900 dark:text-white">Course</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Grant course enrollment</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, accessType: 'test_series', selectedCourse: '' })}
                                    className={cn(
                                        "p-4 rounded-xl border-2 transition-all text-left",
                                        formData.accessType === 'test_series'
                                            ? "border-purple-500 bg-purple-50 dark:bg-purple-500/10"
                                            : "border-slate-200 dark:border-slate-700 hover:border-purple-300"
                                    )}
                                >
                                    <Trophy className={cn("w-5 h-5 mb-2", formData.accessType === 'test_series' ? "text-purple-500" : "text-slate-400")} />
                                    <div className="font-semibold text-sm text-slate-900 dark:text-white">Test Series</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Grant test series access</div>
                                </button>
                            </div>
                        </div>

                        {/* Course/Test Series Selection */}
                        {formData.accessType === 'course' ? (
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Course</Label>
                                <Select value={formData.selectedCourse} onValueChange={(value) => setFormData({ ...formData, selectedCourse: value })}>
                                    <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-800/50">
                                        <SelectValue placeholder="Choose a course..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem key={course.id} value={course.id}>
                                                {course.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Test Series</Label>
                                <Select value={formData.selectedTestSeries} onValueChange={(value) => setFormData({ ...formData, selectedTestSeries: value })}>
                                    <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-800/50">
                                        <SelectValue placeholder="Choose a test series..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {testSeries.map((series) => (
                                            <SelectItem key={series.id} value={series.id}>
                                                {series.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Expiry Date */}
                        <div className="space-y-2">
                            <Label htmlFor="expiryDate" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-amber-500" />
                                Expiry Date (Optional)
                            </Label>
                            <Input
                                id="expiryDate"
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                min={new Date().toISOString().split('T')[0]}
                                className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400">Leave empty for lifetime access</p>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Reason for granting access..."
                                className="min-h-[80px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            />
                        </div>
                    </form>
                </div>

                {/* Sticky Footer with Buttons */}
                <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 shrink-0">
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 h-11 border-slate-200 dark:border-slate-700"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="grantAccessForm"
                            disabled={loading || !formData.selectedStudent}
                            className="flex-1 h-11 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200 dark:shadow-none transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Granting...
                                </>
                            ) : (
                                <>
                                    <Gift className="w-4 h-4 mr-2" />
                                    Grant Access
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
