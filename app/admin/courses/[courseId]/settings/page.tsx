"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Sparkles, DollarSign, Tag, BarChart, Eye, EyeOff, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CourseSettingsPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const supabase = createClient();

    // Fetch course data
    const { data: course, isLoading } = useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('id', courseId)
                .single();

            if (error) throw error;
            return data;
        }
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        level: 'beginner' as 'beginner' | 'intermediate' | 'advanced' | 'all',
        is_published: false,
        duration_months: null as number | null
    });

    const [isSaving, setIsSaving] = useState(false);

    // Update form data when course loads
    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                price: course.price || 0,
                category: course.category || '',
                level: course.level || 'beginner',
                is_published: course.is_published || false,
                duration_months: course.duration_months || null
            });
        }
    }, [course]);

    const handleSave = async () => {
        if (!formData.title.trim()) {
            toast.error('Course title is required');
            return;
        }

        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('courses')
                .update({
                    title: formData.title,
                    description: formData.description,
                    price: formData.price,
                    category: formData.category,
                    level: formData.level,
                    is_published: formData.is_published,
                    duration_months: formData.duration_months,
                    updated_at: new Date().toISOString()
                })
                .eq('id', courseId);

            if (error) throw error;

            toast.success('Course settings updated successfully');
            router.refresh();
        } catch (error: any) {
            console.error('Error updating course:', error);
            toast.error(error.message || 'Failed to update course settings');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <SettingsSkeleton />;
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
                        <Sparkles className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course not found</h2>
                    <p className="text-slate-500 dark:text-slate-400">The course you're looking for doesn't exist</p>
                    <Button onClick={() => router.push('/admin/courses')} className="mt-4">
                        Back to Courses
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 rounded-full blur-3xl" />
            </div>

            <div className="relative p-6 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/admin/courses/${courseId}`)}
                        className="rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all shadow-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                            Course Settings
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure your course details and preferences</p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Basic Information */}
                    <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl overflow-hidden group hover:shadow-blue-500/10 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20">
                                    <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold">Basic Information</CardTitle>
                                    <CardDescription>Update course title and description</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-6 p-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Course Title *
                                </Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter an engaging course title"
                                    className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all h-12 text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe what students will learn in this course..."
                                    rows={5}
                                    className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 transition-all resize-none"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing */}
                    <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl overflow-hidden group hover:shadow-emerald-500/10 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20">
                                    <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold">Pricing</CardTitle>
                                    <CardDescription>Set the course price or make it free</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-4 p-6">
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Price (₹)
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold">₹</span>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                        placeholder="0"
                                        className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all h-12 text-base pl-8"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Set to 0 to make this course free for everyone
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Duration */}
                    <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl overflow-hidden group hover:shadow-amber-500/10 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20">
                                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold">Course Duration</CardTitle>
                                    <CardDescription>Set validity period for course access</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-4 p-6">
                            <div className="space-y-2">
                                <Label htmlFor="duration_months" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Duration (Months)
                                </Label>
                                <Input
                                    id="duration_months"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={formData.duration_months ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, duration_months: value === '' ? null : parseInt(value) });
                                    }}
                                    placeholder="Leave empty for lifetime access"
                                    className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 focus:border-amber-500 dark:focus:border-amber-400 transition-all h-12 text-base"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Number of months students can access this course after enrollment. Leave empty for lifetime access.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Details */}
                    <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl overflow-hidden group hover:shadow-purple-500/10 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-purple-500/10 dark:bg-purple-500/20">
                                    <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold">Course Details</CardTitle>
                                    <CardDescription>Category and difficulty level</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-6 p-6">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Category
                                </Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g., Programming, Design, Business, Marketing"
                                    className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all h-12 text-base"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="level" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Difficulty Level
                                </Label>
                                <Select
                                    value={formData.level}
                                    onValueChange={(value) => setFormData({ ...formData, level: value as any })}
                                >
                                    <SelectTrigger id="level" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 focus:border-purple-500 dark:focus:border-purple-400 h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
                                        <SelectItem value="beginner">🌱 Beginner</SelectItem>
                                        <SelectItem value="intermediate">📈 Intermediate</SelectItem>
                                        <SelectItem value="advanced">🚀 Advanced</SelectItem>
                                        <SelectItem value="all">⭐ All Levels</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visibility */}
                    <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl overflow-hidden group hover:shadow-indigo-500/10 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 dark:from-indigo-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-950/30 dark:to-blue-950/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20">
                                    <BarChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-bold">Visibility</CardTitle>
                                    <CardDescription>Control who can see this course</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative p-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-700/50">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        formData.is_published
                                            ? "bg-green-500/10 dark:bg-green-500/20"
                                            : "bg-slate-500/10 dark:bg-slate-500/20"
                                    )}>
                                        {formData.is_published ? (
                                            <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="published" className="text-base font-semibold cursor-pointer">
                                            {formData.is_published ? 'Published' : 'Draft'}
                                        </Label>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {formData.is_published
                                                ? 'Course is visible to all students'
                                                : 'Course is hidden from students'}
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    id="published"
                                    checked={formData.is_published}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                                    className="data-[state=checked]:bg-green-500"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push(`/admin/courses/${courseId}`)}
                            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 h-12 px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all h-12 px-8"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-8 space-y-6">
            <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-64 rounded-3xl" />
                ))}
            </div>
        </div>
    );
}
