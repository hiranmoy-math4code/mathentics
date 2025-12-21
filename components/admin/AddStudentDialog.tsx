'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { addStudent } from '@/actions/admin/students';
import { toast } from 'sonner';
import { Loader2, UserPlus, Mail, User, Sparkles } from 'lucide-react';

interface AddStudentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function AddStudentDialog({ open, onOpenChange, onSuccess }: AddStudentDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        sendInvite: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await addStudent(formData);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.message || 'Student added successfully! 🎉');
                onOpenChange(false);
                setFormData({ email: '', fullName: '', sendInvite: true });
                onSuccess?.();
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to add student');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                {/* Decorative gradient header */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

                <DialogHeader className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-200 dark:shadow-none">
                            <UserPlus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Add New Student
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
                                Manually create a student account and grant access
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-violet-500" />
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="student@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    {/* Full Name Input */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-500" />
                            Full Name
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                            className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Send Invite Checkbox */}
                    <div className="flex items-center space-x-3 p-4 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20">
                        <Checkbox
                            id="sendInvite"
                            checked={formData.sendInvite}
                            onCheckedChange={(checked) => setFormData({ ...formData, sendInvite: checked as boolean })}
                            className="border-violet-300 dark:border-violet-600"
                        />
                        <div className="grid gap-0.5 leading-none">
                            <label
                                htmlFor="sendInvite"
                                className="text-sm font-medium text-violet-900 dark:text-violet-100 cursor-pointer flex items-center gap-1.5"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Send welcome email
                            </label>
                            <p className="text-xs text-violet-600 dark:text-violet-400">
                                Student will receive an invite to join the platform
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
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
                            disabled={loading}
                            className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-200 dark:shadow-none transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Add Student
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
