import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUserProfile } from '@/actions/admin/updateProfile';
import { Loader2 } from 'lucide-react';

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
    currentData: {
        fullName: string;
        email: string;
        phone?: string;
    };
    onSuccess: () => void;
}

interface FormData {
    fullName: string;
    email: string;
    phone: string;
}

export function EditProfileDialog({
    open,
    onOpenChange,
    userId,
    currentData,
    onSuccess
}: EditProfileDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            fullName: currentData.fullName,
            email: currentData.email,
            phone: currentData.phone || ''
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const result = await updateUserProfile({
                userId,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone
            });

            if (!result.success) {
                throw new Error(result.error);
            }

            toast.success('Profile updated successfully');
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error('Failed to update profile: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update student profile information
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            {...register('fullName', { required: 'Name is required' })}
                            placeholder="Enter full name"
                        />
                        {errors.fullName && (
                            <p className="text-sm text-rose-600">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <p className="text-sm text-rose-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
