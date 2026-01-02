import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenantId } from './useTenantId';
import { useEffect } from 'react';

export interface ExamLeaderboardEntry {
    rank: number;
    student_id: string;
    full_name: string;
    avatar_url: string | null;
    obtained_marks: number;
    total_marks: number;
    percentage: number;
    attempt_id: string;
    created_at: string;
}

/**
 * Hook to fetch exam-specific leaderboard with real-time updates
 * @param examId - The exam ID to fetch leaderboard for
 * @param limit - Maximum number of entries to fetch (default: 50)
 * @param enableRealtime - Enable real-time updates when new results are submitted
 */
export function useExamLeaderboard(
    examId: string | null,
    limit: number = 50,
    enableRealtime: boolean = true
) {
    const tenantId = useTenantId();
    const supabase = createClient();

    const query = useQuery({
        queryKey: ['exam-leaderboard', examId, tenantId, limit],
        queryFn: async () => {
            if (!examId || !tenantId) return [];

            const { data, error } = await supabase.rpc('get_exam_leaderboard', {
                p_exam_id: examId,
                p_tenant_id: tenantId,
                p_limit: limit,
            });

            if (error) {
                console.error('[useExamLeaderboard] Error fetching leaderboard:', error);
                throw error;
            }

            return (data || []) as ExamLeaderboardEntry[];
        },
        enabled: !!examId && !!tenantId,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });

    // Real-time subscription for rank updates
    useEffect(() => {
        if (!enableRealtime || !examId || !tenantId) return;

        console.log('[useExamLeaderboard] Setting up realtime subscription for exam:', examId);

        // Listen to exam_attempts table (since results table doesn't have exam_id)
        const channel = supabase
            .channel(`exam-leaderboard:${examId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'exam_attempts',
                    filter: `exam_id=eq.${examId}`,
                },
                (payload) => {
                    console.log('[useExamLeaderboard] Exam attempt updated:', payload);
                    // Only refetch if status changed to submitted
                    if (payload.new && (payload.new as any).status === 'submitted') {
                        console.log('[useExamLeaderboard] New submission detected, refetching leaderboard...');
                        query.refetch();
                    }
                }
            )
            .subscribe((status) => {
                console.log('[useExamLeaderboard] Subscription status:', status);
            });

        return () => {
            console.log('[useExamLeaderboard] Cleaning up subscription');
            supabase.removeChannel(channel);
        };
    }, [examId, tenantId, enableRealtime, supabase, query]);

    return query;
}
