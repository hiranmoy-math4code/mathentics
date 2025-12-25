'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

/**
 * Check if a user is currently banned
 */
export async function checkUserBanStatus(userId: string) {
    const supabase = createAdminClient();

    try {
        const { data: userData } = await supabase.auth.admin.getUserById(userId);
        const bannedUntil = (userData?.user as any)?.banned_until;
        return {
            success: true,
            isBanned: bannedUntil ? new Date(bannedUntil) > new Date() : false
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Block or unblock a user
 */
export async function toggleUserBlock(userId: string) {
    const supabase = createAdminClient();

    try {
        // Check current ban status
        const { data: userData } = await supabase.auth.admin.getUserById(userId);
        const bannedUntil = (userData?.user as any)?.banned_until;
        const isBanned = bannedUntil ? new Date(bannedUntil) > new Date() : false;

        if (isBanned) {
            // Unban user
            const { error } = await supabase.auth.admin.updateUserById(userId, {
                ban_duration: 'none'
            });

            if (error) throw error;

            revalidatePath('/admin/students');
            return { success: true, action: 'unblocked' };
        } else {
            // Ban user indefinitely (876000 hours = ~100 years)
            const { error } = await supabase.auth.admin.updateUserById(userId, {
                ban_duration: '876000h'
            });

            if (error) throw error;

            revalidatePath('/admin/students');
            return { success: true, action: 'blocked' };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

/**
 * Delete all chat history for a user
 */
export async function deleteUserChatHistory(userId: string) {
    const supabase = createAdminClient();

    try {
        const { error } = await supabase
            .from('chat_sessions')
            .delete()
            .eq('user_id', userId);

        if (error) throw error;

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
