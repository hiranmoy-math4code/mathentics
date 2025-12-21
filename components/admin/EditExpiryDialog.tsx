'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { extendAccess } from '@/actions/admin/grantAccess';
import { toast } from 'sonner';
import { Loader2, Calendar, AlertCircle } from 'lucide-react';

interface EditExpiryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
    enrollment: {
        id: string;
        type: 'course' | 'test_series';
        studentName: string;
        courseName: string;
        currentExpiry: string | null;
    } | null;
}

export function EditExpiryDialog({ open, onOpenChange, onSuccess, enrollment }: EditExpiryDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        newExpiryDate: '',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!enrollment || !formData.newExpiryDate) {
            toast.error('Please select an expiry date');
            return;
        }

        setLoading(true);

        try {
            const result = await extendAccess({
                enrollmentId: enrollment.id,
                type: enrollment.type,
                newExpiryDate: new Date(formData.newExpiryDate),
                notes: formData.notes || 'Expiry date updated by admin'
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Expiry date updated successfully! 🎉');
                onOpenChange(false);
                setFormData({ newExpiryDate: '', notes: '' });

                // Reload student data for instant UI update
                onSuccess?.();
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to update expiry date');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                {/* Decorative gradient header */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-orange-500 to-red-500" />

                <DialogHeader className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200 dark:shadow-none">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Edit Expiry Date
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
                                Update subscription expiry for enrolled student
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {enrollment && (
                    <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                        {/* Student Info */}
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {enrollment.studentName}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {enrollment.courseName}
                                </p>
                            </div>
                        </div>

                        {/* Current Expiry */}
                        {enrollment.currentExpiry && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">Current Expiry</p>
                                    <p className="text-xs text-amber-600 dark:text-amber-400">
                                        {new Date(enrollment.currentExpiry).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* New Expiry Date */}
                        <div className="space-y-2">
                            <Label htmlFor="newExpiryDate" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-amber-500" />
                                New Expiry Date
                            </Label>
                            <Input
                                id="newExpiryDate"
                                type="date"
                                value={formData.newExpiryDate}
                                onChange={(e) => setFormData({ ...formData, newExpiryDate: e.target.value })}
                                min={new Date().toISOString().split('T')[0]}
                                required
                                className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Select a future date or clear for lifetime access
                            </p>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Notes (Optional)
                            </Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Reason for updating expiry date..."
                                className="min-h-[80px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            />
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
                                className="flex-1 h-11 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg shadow-amber-200 dark:shadow-none transition-all"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Update Expiry
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
