"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type ActionType = 'login' | 'video_watch' | 'lesson_completion' | 'quiz_completion' | 'module_completion' | 'referral' | 'bonus' | 'mission_complete';

const REWARD_RULES = {
    login: { coins: 5, limit: 1 },
    video_watch: { coins: 10, limit: 10 },
    lesson_completion: { coins: 10, limit: 20 }, // Generic lesson completion
    quiz_completion: { coins: 15, limit: 10 },
    quiz_bonus: { coins: 10, limit: 10 },
    module_completion: { coins: 50, limit: 5 },
    referral: { coins: 100, limit: 10 },
    streak_3: { coins: 10, limit: 1 },
    streak_7: { coins: 30, limit: 1 },
    streak_30: { coins: 100, limit: 1 },
    mission_complete: { coins: 20, limit: 3 }
};

const DAILY_COIN_CAP = 100;

// ============================================================================
// HELPER: Get Tenant ID from Headers (Fallback for server-side calls)
// ============================================================================
async function getTenantIdFromHeaders(): Promise<string | null> {
    try {
        const { headers } = await import('next/headers');
        const headersList = await headers();
        return headersList.get('x-tenant-id');
    } catch (error) {
        // Headers not available (e.g., called from client-side)
        console.warn('⚠️ Headers not available in getTenantIdFromHeaders');
        return null;
    }
}

// ============================================================================
// Get User Reward Status (Using Database Function)
// ============================================================================
export async function getRewardStatus(userId: string, tenantId?: string) {
    const supabase = await createClient();
    const finalTenantId = tenantId || await getTenantIdFromHeaders();

    if (!finalTenantId) {
        console.warn('⚠️ No tenant ID in getRewardStatus');
        return null;
    }

    // Use database function - handles get/create automatically!
    const { data, error } = await supabase.rpc('get_user_rewards', {
        p_user_id: userId,
        p_tenant_id: finalTenantId
    });

    if (error) {
        console.error('Error getting user rewards:', error);
        return null;
    }

    // RPC returns array, get first element
    return data?.[0] || null;
}

// ============================================================================
// Check User Streak (Using Database Function)
// ============================================================================
export async function checkStreak(userId: string, tenantId?: string) {
    const supabase = await createClient();
    const finalTenantId = tenantId || await getTenantIdFromHeaders();

    if (!finalTenantId) {
        console.warn('⚠️ No tenant ID in checkStreak');
        return { streak: 0, message: null };
    }

    // Use database function
    const { data, error } = await supabase.rpc('get_user_streak', {
        p_user_id: userId,
        p_tenant_id: finalTenantId
    });

    if (error) {
        console.error('Error getting streak:', error);
        return { streak: 0, message: null };
    }

    return data || { streak: 0, message: null };
}

// ============================================================================
// Award Coins (Using Database Function)
// ============================================================================
export async function awardCoins(
    userId: string,
    action: ActionType,
    entityId?: string,
    description?: string,
    tenantId?: string
) {
    const supabase = await createClient();
    const finalTenantId = tenantId || await getTenantIdFromHeaders();

    if (!finalTenantId) {
        console.warn('⚠️ No tenant ID in awardCoins');
        return { success: false, message: "No tenant context" };
    }

    // Use database function - handles everything!
    const { data, error } = await supabase.rpc('award_coins', {
        p_user_id: userId,
        p_tenant_id: finalTenantId,
        p_action_type: action,
        p_entity_id: entityId || null,
        p_description: description || null
    });

    if (error) {
        console.error('Error awarding coins:', error);
        return { success: false, message: "Failed to process reward" };
    }

    // Revalidate student pages
    revalidatePath("/student");

    return data || { success: false, message: "Unknown error" };
}

export async function getLeaderboard(type: 'weekly' | 'all_time' = 'all_time', limit: number = 10) {
    const supabase = await createClient();

    // ============================================================================
    // TENANT ISOLATION: Get current tenant from request headers
    // ============================================================================
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const tenantId = headersList.get('x-tenant-id');

    if (!tenantId) {
        console.warn('⚠️ No tenant ID in leaderboard request');
        return [];
    }

    // ============================================================================
    // OPTIMIZED QUERY: Use RPC for database-level JOIN (10M+ students ready)
    // ============================================================================
    const sortColumn = type === 'weekly' ? 'weekly_xp' : 'total_coins';

    try {
        // Use RPC function for optimized query with JOIN
        const { data, error } = await supabase.rpc('get_tenant_leaderboard', {
            p_tenant_id: tenantId,
            p_sort_column: sortColumn,
            p_limit: limit
        });

        if (error) {
            console.error('Leaderboard RPC error:', error);
            // Fallback to simple query if RPC doesn't exist
            return await getLeaderboardFallback(supabase, tenantId, type, limit);
        }

        return data || [];
    } catch (err) {
        console.error('Leaderboard error:', err);
        // Final fallback to ensure leaderboard always works
        return await getLeaderboardFallback(supabase, tenantId, type, limit);
    }
}

// Fallback function (will be used until RPC is created)
async function getLeaderboardFallback(
    supabase: any,
    tenantId: string,
    type: 'weekly' | 'all_time',
    limit: number
) {
    // Direct query with tenant_id (simpler now that we have the column!)
    const sortColumn = type === 'weekly' ? 'weekly_xp' : 'total_coins';

    const { data } = await supabase
        .from("user_rewards")
        .select(`
            total_coins,
            xp,
            weekly_xp,
            level,
            current_streak,
            user_id,
            profiles:user_id (
                full_name,
                avatar_url
            )
        `)
        .eq('tenant_id', tenantId)  // ✅ Direct tenant filter
        .order(sortColumn, { ascending: false })
        .limit(limit);

    return data?.map((entry: any) => ({
        ...entry,
        profiles: Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles
    })) || [];
}

export async function checkModuleCompletion(userId: string, moduleId: string) {
    const supabase = await createClient();

    // Get tenant from headers
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const tenantId = headersList.get('x-tenant-id');

    if (!tenantId) {
        console.warn('⚠️ No tenant ID in checkModuleCompletion');
        return null;
    }

    const { data: lessons } = await supabase.from("lessons").select("id").eq("module_id", moduleId);
    if (!lessons || lessons.length === 0) return;

    const { data: completed } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", userId)
        .eq("completed", true)
        .in("lesson_id", lessons.map(l => l.id));

    const completedCount = completed?.length || 0;
    if (completedCount === lessons.length) {
        return await awardCoins(userId, 'module_completion', moduleId, 'Completed a module!');
    }
    return null;
}

export async function checkFirstLessonReward(userId: string) {
    const supabase = await createClient();

    // Get tenant from headers
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const tenantId = headersList.get('x-tenant-id');

    if (!tenantId) {
        console.warn('⚠️ No tenant ID in checkFirstLessonReward');
        return;
    }

    const { count } = await supabase
        .from("lesson_progress")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", userId)
        .eq("completed", true);

    if (count !== 1) return;

    const { data: profile } = await supabase
        .from("profiles")
        .select("referred_by")
        .eq("id", userId)
        .single();

    if (!profile?.referred_by) return;

    const referrerId = profile.referred_by;
    const { data: existing } = await supabase
        .from("reward_transactions")
        .select("*")
        .eq("user_id", referrerId)
        .eq("action_type", 'referral')
        .eq("entity_id", userId)
        .single();

    if (existing) return;

    // Award referrer
    await awardCoins(referrerId, 'referral', userId, `Referral bonus for user ${userId}`);

    // Check Badge for Referrer
    await checkBadgeUnlock(referrerId, 'social_butterfly');
}

// --- NEW GAMIFICATION FUNCTIONS ---

export async function getDailyMissions(userId: string) {
    const supabase = await createClient();

    // Use RPC function to get or create missions
    const { data, error } = await supabase.rpc('get_or_create_daily_missions', {
        p_user_id: userId
    });

    if (error) {
        console.error("Error fetching daily missions:", error);
        return [];
    }

    return data || [];
}


export async function updateMissionProgress(userId: string, type: 'login' | 'quiz' | 'video') {
    const supabase = await createClient();

    // Get tenant from headers
    const { headers } = await import('next/headers');
    const headersList = await headers();
    const tenantId = headersList.get('x-tenant-id');

    if (!tenantId) {
        console.warn('⚠️ No tenant ID in updateMissionProgress');
        return;
    }

    // Use RPC function to update mission progress
    const { data, error } = await supabase.rpc('update_mission_progress', {
        p_user_id: userId,
        p_mission_type: type
    });

    if (error) {
        console.error("Error updating mission progress:", error);
        return;
    }

    // Check if any mission was completed
    const missions = data || [];
    const completedMission = missions.find((m: any) =>
        m.id === type && m.completed && m.progress === m.goal
    );

    if (completedMission) {
        // Award mission bonus
        const today = new Date().toISOString().split('T')[0];
        await awardCoins(userId, 'mission_complete', `${today}-${type}`, `Mission Complete: ${completedMission.title}`);
    }

    revalidatePath("/student");
}


export async function checkBadgeUnlock(userId: string, badgeId: string) {
    const supabase = await createClient();

    // Check if already has badge
    const { data: existing } = await supabase
        .from("user_badges")
        .select("*")
        .eq("user_id", userId)
        .eq("badge_id", badgeId)
        .single();

    if (existing) return;

    // Logic to verify if they actually earned it could go here, 
    // but usually we call this function when we KNOW they met the condition.

    await supabase.from("user_badges").insert({
        user_id: userId,
        badge_id: badgeId
    });

    // Could return a notification object
}

export async function getUserBadges(userId: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("user_badges")
        .select("badge_id, earned_at")
        .eq("user_id", userId);
    return data || [];
}

export async function getStreakHistory(userId: string) {
    const supabase = await createClient();

    // Fetch dates from reward_transactions
    const { data } = await supabase
        .from("reward_transactions")
        .select("created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (!data) return [];

    // Extract unique dates (YYYY-MM-DD)
    const uniqueDates = new Set(
        data.map(item => item.created_at.split('T')[0])
    );

    return Array.from(uniqueDates);
}
