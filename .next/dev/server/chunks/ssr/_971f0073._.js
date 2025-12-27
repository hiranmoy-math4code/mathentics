module.exports = [
"[project]/app/actions/rewardActions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401af75fb501836c067ff5309414f33ff8ec6d523c":"getUserBadges","406ef9d617799bcd1e0cc901a06585cccfd9ea3b5e":"checkStreak","409b6c9e7f7aeea92b23738c3b0bc90cec78ddfab0":"getDailyMissions","40b0b14b03ca8c026611963a00d913cf1f9512bae9":"getStreakHistory","40d59f95dc89fd4dc26cbfaa1a6ee2c66ddc89d104":"getRewardStatus","40eb846706f4430296b7c962019c2b1ef327ed506f":"checkFirstLessonReward","60394d8dbcdae126f79e7a31ddd270f02fdd73b586":"checkBadgeUnlock","605b2718d30b6957cb337670f642e33a6d21f15a27":"checkModuleCompletion","6062a646126ab86278ff8a9f9d5dd9c2cf55fa2b68":"updateMissionProgress","606f53d15fe31c1858c290384edc7b7c0fb1e457e8":"getLeaderboard","780d64f65fac54c55def49046d2a33becf7ac8e4bd":"awardCoins"},"",""] */ __turbopack_context__.s([
    "awardCoins",
    ()=>awardCoins,
    "checkBadgeUnlock",
    ()=>checkBadgeUnlock,
    "checkFirstLessonReward",
    ()=>checkFirstLessonReward,
    "checkModuleCompletion",
    ()=>checkModuleCompletion,
    "checkStreak",
    ()=>checkStreak,
    "getDailyMissions",
    ()=>getDailyMissions,
    "getLeaderboard",
    ()=>getLeaderboard,
    "getRewardStatus",
    ()=>getRewardStatus,
    "getStreakHistory",
    ()=>getStreakHistory,
    "getUserBadges",
    ()=>getUserBadges,
    "updateMissionProgress",
    ()=>updateMissionProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const REWARD_RULES = {
    login: {
        coins: 5,
        limit: 1
    },
    video_watch: {
        coins: 10,
        limit: 10
    },
    lesson_completion: {
        coins: 10,
        limit: 20
    },
    quiz_completion: {
        coins: 15,
        limit: 10
    },
    quiz_bonus: {
        coins: 10,
        limit: 10
    },
    module_completion: {
        coins: 50,
        limit: 5
    },
    referral: {
        coins: 100,
        limit: 10
    },
    streak_3: {
        coins: 10,
        limit: 1
    },
    streak_7: {
        coins: 30,
        limit: 1
    },
    streak_30: {
        coins: 100,
        limit: 1
    },
    mission_complete: {
        coins: 20,
        limit: 3
    }
};
const DAILY_COIN_CAP = 100;
async function getRewardStatus(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    let { data } = await supabase.from("user_rewards").select("*").eq("user_id", userId).single();
    if (!data) {
        // Initialize if not exists
        const { data: newData, error } = await supabase.from("user_rewards").insert({
            user_id: userId
        }).select().single();
        if (error) {
            if (error.code === '23505') {
                const { data: retryData } = await supabase.from("user_rewards").select("*").eq("user_id", userId).single();
                data = retryData;
            } else {
                console.error("Error creating user_rewards in getRewardStatus:", error);
                return null;
            }
        } else {
            data = newData;
        }
    }
    return data;
}
async function checkStreak(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Just fetch the current status to display to the user
    // The actual update happens when 'login' reward is awarded below
    const { data: rewardStatus } = await supabase.from("user_rewards").select("current_streak, longest_streak, last_activity_date").eq("user_id", userId).single();
    if (!rewardStatus) return {
        streak: 0,
        message: null
    };
    // We can infer if they are on a streak or if it's broken based on the date,
    // but primarily we just want to show the current value.
    // The DB trigger updates this immediately upon the 'login' transaction insertion.
    return {
        streak: rewardStatus.current_streak,
        message: null
    };
}
async function awardCoins(userId, action, entityId, description) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const today = new Date().toISOString().split('T')[0];
    // 1. Check strict duplicate rules (Client-Side Protection)
    // We don't want to spam the DB trigger with 'login' events every refresh
    if (action === 'login') {
        entityId = today; // Force entityId to be date for login
    }
    if (entityId) {
        const { data: existing } = await supabase.from("reward_transactions").select("id").eq("user_id", userId).eq("action_type", action).eq("entity_id", entityId).gte("created_at", `${today}T00:00:00`).single();
        if (existing) {
            return {
                success: false,
                message: "Already rewarded for this today!"
            };
        }
    }
    // 2. Define Amount (We still define it here to pass to DB, or DB could handle default)
    let coins = 0;
    switch(action){
        case 'login':
            coins = REWARD_RULES.login.coins;
            break;
        case 'video_watch':
            coins = REWARD_RULES.video_watch.coins;
            break;
        case 'lesson_completion':
            coins = REWARD_RULES.lesson_completion.coins;
            break;
        case 'quiz_completion':
            coins = REWARD_RULES.quiz_completion.coins;
            break;
        case 'module_completion':
            coins = REWARD_RULES.module_completion.coins;
            break;
        case 'referral':
            coins = REWARD_RULES.referral.coins;
            break;
        case 'mission_complete':
            coins = REWARD_RULES.mission_complete.coins;
            break;
        case 'bonus':
            coins = 10;
            break;
        default:
            coins = 0;
    }
    // 3. Insert Transaction (The DB Trigger takes it from here!)
    // It will: Update Coins, XP, Level, and Streak (if login)
    const { error } = await supabase.from("reward_transactions").insert({
        user_id: userId,
        amount: coins,
        action_type: action,
        entity_id: entityId,
        description: description || `Reward for ${action}`
    });
    if (error) {
        console.error("Reward Insert Error:", error);
        return {
            success: false,
            message: "Failed to process reward."
        };
    }
    // 4. Post-Process (Optional Notifications or Revalidation)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/student");
    if (action === 'login') {
        // Special message for login
        return {
            success: true,
            coins,
            message: "Daily Reward Claimed!"
        };
    }
    return {
        success: true,
        coins,
        message: `⭐ +${coins} coins!`
    };
}
async function getLeaderboard(type = 'all_time', limit = 10) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const sortColumn = type === 'weekly' ? 'weekly_xp' : 'total_coins'; // or xp
    const { data } = await supabase.from("user_rewards").select(`
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
        `).order(sortColumn, {
        ascending: false
    }).limit(limit);
    return data?.map((entry)=>({
            ...entry,
            profiles: Array.isArray(entry.profiles) ? entry.profiles[0] : entry.profiles
        })) || [];
}
async function checkModuleCompletion(userId, moduleId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: lessons } = await supabase.from("lessons").select("id").eq("module_id", moduleId);
    if (!lessons || lessons.length === 0) return;
    const { data: completed } = await supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId).eq("completed", true).in("lesson_id", lessons.map((l)=>l.id));
    const completedCount = completed?.length || 0;
    if (completedCount === lessons.length) {
        return await awardCoins(userId, 'module_completion', moduleId, 'Completed a module!');
    }
    return null;
}
async function checkFirstLessonReward(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { count } = await supabase.from("lesson_progress").select("*", {
        count: 'exact',
        head: true
    }).eq("user_id", userId).eq("completed", true);
    if (count !== 1) return;
    const { data: profile } = await supabase.from("profiles").select("referred_by").eq("id", userId).single();
    if (!profile?.referred_by) return;
    const referrerId = profile.referred_by;
    const { data: existing } = await supabase.from("reward_transactions").select("*").eq("user_id", referrerId).eq("action_type", 'referral').eq("entity_id", userId).single();
    if (existing) return;
    // Award referrer
    await awardCoins(referrerId, 'referral', userId, `Referral bonus for user ${userId}`);
    // Check Badge for Referrer
    await checkBadgeUnlock(referrerId, 'social_butterfly');
}
async function getDailyMissions(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
async function updateMissionProgress(userId, type) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const completedMission = missions.find((m)=>m.id === type && m.completed && m.progress === m.goal);
    if (completedMission) {
        // Award mission bonus
        const today = new Date().toISOString().split('T')[0];
        await awardCoins(userId, 'mission_complete', `${today}-${type}`, `Mission Complete: ${completedMission.title}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/student");
}
async function checkBadgeUnlock(userId, badgeId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Check if already has badge
    const { data: existing } = await supabase.from("user_badges").select("*").eq("user_id", userId).eq("badge_id", badgeId).single();
    if (existing) return;
    // Logic to verify if they actually earned it could go here, 
    // but usually we call this function when we KNOW they met the condition.
    await supabase.from("user_badges").insert({
        user_id: userId,
        badge_id: badgeId
    });
// Could return a notification object
}
async function getUserBadges(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from("user_badges").select("badge_id, earned_at").eq("user_id", userId);
    return data || [];
}
async function getStreakHistory(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Fetch dates from reward_transactions
    const { data } = await supabase.from("reward_transactions").select("created_at").eq("user_id", userId).order("created_at", {
        ascending: false
    });
    if (!data) return [];
    // Extract unique dates (YYYY-MM-DD)
    const uniqueDates = new Set(data.map((item)=>item.created_at.split('T')[0]));
    return Array.from(uniqueDates);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getRewardStatus,
    checkStreak,
    awardCoins,
    getLeaderboard,
    checkModuleCompletion,
    checkFirstLessonReward,
    getDailyMissions,
    updateMissionProgress,
    checkBadgeUnlock,
    getUserBadges,
    getStreakHistory
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRewardStatus, "40d59f95dc89fd4dc26cbfaa1a6ee2c66ddc89d104", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkStreak, "406ef9d617799bcd1e0cc901a06585cccfd9ea3b5e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(awardCoins, "780d64f65fac54c55def49046d2a33becf7ac8e4bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLeaderboard, "606f53d15fe31c1858c290384edc7b7c0fb1e457e8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkModuleCompletion, "605b2718d30b6957cb337670f642e33a6d21f15a27", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkFirstLessonReward, "40eb846706f4430296b7c962019c2b1ef327ed506f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDailyMissions, "409b6c9e7f7aeea92b23738c3b0bc90cec78ddfab0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateMissionProgress, "6062a646126ab86278ff8a9f9d5dd9c2cf55fa2b68", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkBadgeUnlock, "60394d8dbcdae126f79e7a31ddd270f02fdd73b586", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserBadges, "401af75fb501836c067ff5309414f33ff8ec6d523c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStreakHistory, "40b0b14b03ca8c026611963a00d913cf1f9512bae9", null);
}),
"[project]/.next-internal/server/app/_not-found/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/rewardActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/rewardActions.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/_not-found/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/rewardActions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "6062a646126ab86278ff8a9f9d5dd9c2cf55fa2b68",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateMissionProgress"],
    "780d64f65fac54c55def49046d2a33becf7ac8e4bd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["awardCoins"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$_not$2d$found$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/_not-found/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/rewardActions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/rewardActions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_971f0073._.js.map