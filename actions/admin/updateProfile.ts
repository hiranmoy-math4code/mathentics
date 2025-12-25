'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

interface UpdateProfileData {
    userId: string;
    fullName?: string;
    email?: string;
    phone?: string;
}

/**
 * Update user profile information
 */
export async function updateUserProfile(data: UpdateProfileData) {
    const supabase = createAdminClient();

    try {
        // Update profile in profiles table
        const profileUpdate: any = {};
        if (data.fullName !== undefined) profileUpdate.full_name = data.fullName;
        if (data.phone !== undefined) profileUpdate.phone = data.phone;

        if (Object.keys(profileUpdate).length > 0) {
            profileUpdate.updated_at = new Date().toISOString();

            const { error: profileError } = await supabase
                .from('profiles')
                .update(profileUpdate)
                .eq('id', data.userId);

            if (profileError) throw profileError;
        }

        // Update email in auth.users if provided
        if (data.email) {
            const { error: emailError } = await supabase.auth.admin.updateUserById(
                data.userId,
                { email: data.email }
            );

            if (emailError) throw emailError;
        }

        revalidatePath('/admin/students');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
