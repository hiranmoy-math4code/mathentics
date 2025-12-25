import { createClient } from '@/lib/supabase/client';

/**
 * Check if responses are expired (older than 30 days)
 */
export function isResponseExpired(submittedAt: string | Date): boolean {
    const submittedDate = new Date(submittedAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff >= 30;
}

/**
 * Get days remaining until responses expire
 */
export function getDaysUntilExpiry(submittedAt: string | Date): number {
    const submittedDate = new Date(submittedAt);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 30 - daysDiff);
}

/**
 * Cleanup expired responses for a specific attempt using database function
 * This is called when user views exam results
 */
export async function cleanupAttemptResponses(attemptId: string) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.rpc('cleanup_attempt_responses', {
            p_attempt_id: attemptId
        });

        if (error) {
            console.error('Error cleaning up responses:', error);
            return { success: false, error: error.message };
        }

        return {
            success: true,
            deleted: data?.[0]?.deleted || false,
            daysOld: data?.[0]?.days_old || 0
        };
    } catch (error: any) {
        console.error('Error cleaning up responses:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Cleanup all expired responses (admin function)
 * Can be called manually or periodically
 */
export async function cleanupAllExpiredResponses() {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.rpc('cleanup_expired_responses');

        if (error) {
            console.error('Error cleaning up all responses:', error);
            return { success: false, error: error.message };
        }

        return {
            success: true,
            deletedCount: data?.[0]?.deleted_count || 0
        };
    } catch (error: any) {
        console.error('Error cleaning up all responses:', error);
        return { success: false, error: error.message };
    }
}
