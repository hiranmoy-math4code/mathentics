"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTenantId } from "@/hooks/useTenantId";
import {
    getRewardStatus,
    getDailyMissions,
    getUserBadges,
    getLeaderboard,
    awardCoins,
    checkStreak,
    getStreakHistory
} from "@/app/actions/rewardActions";
import { createClient } from "@/lib/supabase/client";

// Keys for React Query
export const REWARD_KEYS = {
    all: ["rewards"] as const,
    status: (userId: string) => [...REWARD_KEYS.all, "status", userId] as const,
    missions: (userId: string) => [...REWARD_KEYS.all, "missions", userId] as const,
    badges: (userId: string) => [...REWARD_KEYS.all, "badges", userId] as const,
    leaderboard: (type: string) => [...REWARD_KEYS.all, "leaderboard", type] as const,
    transactions: (userId: string) => [...REWARD_KEYS.all, "transactions", userId] as const,
    streakHistory: (userId: string) => [...REWARD_KEYS.all, "streakHistory", userId] as const,
};

export function useRewards(userId?: string, tenantId?: string) {
    const queryClient = useQueryClient();
    // Use passed tenantId or fall back to hook
    const hookTenantId = useTenantId();
    const finalTenantId = tenantId || hookTenantId;

    // 1. Reward Status (Coins, Streak, XP)
    const { data: rewardStatus, isLoading: statusLoading } = useQuery({
        queryKey: REWARD_KEYS.status(userId || ""),
        queryFn: () => userId ? getRewardStatus(userId, finalTenantId || undefined) : null,
        enabled: !!userId && !!finalTenantId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // 2. Daily Missions
    const { data: missions, isLoading: missionsLoading } = useQuery({
        queryKey: REWARD_KEYS.missions(userId || ""),
        queryFn: () => userId ? getDailyMissions(userId) : [],
        enabled: !!userId,
        staleTime: 1000 * 60 * 60, // 1 hour (missions don't change often in a day)
    });

    // 3. User Badges
    const { data: badges, isLoading: badgesLoading } = useQuery({
        queryKey: REWARD_KEYS.badges(userId || ""),
        queryFn: () => userId ? getUserBadges(userId) : [],
        enabled: !!userId,
        staleTime: 1000 * 60 * 30, // 30 minutes
    });

    // 4. Transactions History
    const { data: transactions, isLoading: transactionsLoading } = useQuery({
        queryKey: REWARD_KEYS.transactions(userId || ""),
        queryFn: async () => {
            if (!userId) return [];
            const supabase = createClient();
            let query = supabase
                .from("reward_transactions")
                .select("*")
                .eq("user_id", userId);

            if (finalTenantId) {
                query = query.eq("tenant_id", finalTenantId);
            }

            const { data } = await query
                .order("created_at", { ascending: false })
                .limit(10);
            return data || [];
        },
        enabled: !!userId,
    });

    // Mutations

    // Award Coins
    const awardCoinsMutation = useMutation({
        mutationFn: async ({ action, entityId, description }: { action: any, entityId?: string, description?: string }) => {
            if (!userId) throw new Error("User ID required");
            return await awardCoins(userId, action, entityId, description, finalTenantId || undefined);
        },
        onSuccess: () => {
            // Invalidate relevant queries to refresh data
            if (userId) {
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.status(userId) });
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.transactions(userId) });
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.leaderboard('weekly') });
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.leaderboard('all_time') });
            }
        },
    });

    // Check Streak
    const checkStreakMutation = useMutation({
        mutationFn: async () => {
            if (!userId) throw new Error("User ID required");
            return await checkStreak(userId, finalTenantId || undefined);
        },
        onSuccess: () => {
            if (userId) {
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.status(userId) });
            }
        },
    });

    // Listen for global reward updates (e.g. from RewardInitializer)


    useEffect(() => {
        const handleUpdate = () => {
            if (userId) {
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.status(userId) });
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.transactions(userId) });
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.missions(userId) });
                queryClient.invalidateQueries({ queryKey: REWARD_KEYS.badges(userId) });
            }
        };

        window.addEventListener("rewards-updated", handleUpdate);
        return () => window.removeEventListener("rewards-updated", handleUpdate);
    }, [userId, queryClient]);

    return {
        rewardStatus,
        statusLoading,
        missions,
        missionsLoading,
        badges,
        badgesLoading,
        transactions,
        transactionsLoading,
        awardCoins: awardCoinsMutation.mutateAsync,
        checkStreak: checkStreakMutation.mutateAsync,
    };
}

export function useLeaderboard(type: 'weekly' | 'all_time' = 'weekly', limit: number = 10) {
    const tenantId = useTenantId();
    return useQuery({
        queryKey: [...REWARD_KEYS.leaderboard(type), limit, tenantId],
        queryFn: () => getLeaderboard(type, limit, tenantId || undefined),
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!tenantId,
    });
}

export function useStreakHistory(userId: string) {
    const tenantId = useTenantId();
    return useQuery({
        queryKey: [...REWARD_KEYS.streakHistory(userId), tenantId],
        queryFn: () => getStreakHistory(userId, tenantId || undefined),
        enabled: !!userId && !!tenantId,
    });
}
