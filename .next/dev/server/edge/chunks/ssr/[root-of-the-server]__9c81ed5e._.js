(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/ssr/[root-of-the-server]__9c81ed5e._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[project]/lib/supabase/server.ts [app-edge-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-edge-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/headers.js [app-edge-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/request/cookies.js [app-edge-rsc] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://wzlcuzygjdzolcycogow.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bGN1enlnamR6b2xjeWNvZ293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NDc4MzMsImV4cCI6MjA4MjMyMzgzM30.wnsco6-dlGl4c1qUClZRLTikScX29sC3F0iPLK99c38"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // The "setAll" method was called from a Server Component.
                // This can be ignored if you have middleware refreshing user sessions.
                }
            }
        }
    });
}
}),
"[project]/app/actions/rewardActions.ts [app-edge-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/webpack/loaders/next-flight-loader/server-reference.js [app-edge-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/webpack/loaders/next-flight-loader/action-validate.js [app-edge-rsc] (ecmascript)");
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/student");
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/student");
}
async function checkBadgeUnlock(userId, badgeId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data } = await supabase.from("user_badges").select("badge_id, earned_at").eq("user_id", userId);
    return data || [];
}
async function getStreakHistory(userId) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRewardStatus, "40d59f95dc89fd4dc26cbfaa1a6ee2c66ddc89d104", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkStreak, "406ef9d617799bcd1e0cc901a06585cccfd9ea3b5e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(awardCoins, "780d64f65fac54c55def49046d2a33becf7ac8e4bd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLeaderboard, "606f53d15fe31c1858c290384edc7b7c0fb1e457e8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkModuleCompletion, "605b2718d30b6957cb337670f642e33a6d21f15a27", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkFirstLessonReward, "40eb846706f4430296b7c962019c2b1ef327ed506f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDailyMissions, "409b6c9e7f7aeea92b23738c3b0bc90cec78ddfab0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateMissionProgress, "6062a646126ab86278ff8a9f9d5dd9c2cf55fa2b68", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkBadgeUnlock, "60394d8dbcdae126f79e7a31ddd270f02fdd73b586", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserBadges, "401af75fb501836c067ff5309414f33ff8ec6d523c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStreakHistory, "40b0b14b03ca8c026611963a00d913cf1f9512bae9", null);
}),
"[project]/lib/supabase/admin.ts [app-edge-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-edge-rsc] (ecmascript)");
;
const createAdminClient = ()=>{
    const supabaseUrl = ("TURBOPACK compile-time value", "https://wzlcuzygjdzolcycogow.supabase.co");
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is not defined. Please check your .env.local file.');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};
}),
"[project]/actions/admin/students.ts [app-edge-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"401e9ce0458d2afa0207c6302a62aaef1c7059712b":"getStudentsWithEnrollments","4051ae058cd89d78ab640e30cf4d04824ebc0945c1":"getStudentAttempts","406484b2444f52c52521e60e9acd3ed3a3a2775b75":"searchStudents","408f03e7e3f4c3de50e6913fb3e48cc02f9ed7f96d":"addStudent","4097ab6e569d8f3c5430e8f17aee35b3244ae881ef":"resetStudentSessions","40eeb906185703c1ee6594025206aae37fe15e0f14":"getStudentDetails"},"",""] */ __turbopack_context__.s([
    "addStudent",
    ()=>addStudent,
    "getStudentAttempts",
    ()=>getStudentAttempts,
    "getStudentDetails",
    ()=>getStudentDetails,
    "getStudentsWithEnrollments",
    ()=>getStudentsWithEnrollments,
    "resetStudentSessions",
    ()=>resetStudentSessions,
    "searchStudents",
    ()=>searchStudents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/webpack/loaders/next-flight-loader/server-reference.js [app-edge-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/admin.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/webpack/loaders/next-flight-loader/action-validate.js [app-edge-rsc] (ecmascript)");
;
;
;
;
async function addStudent(data) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Check admin permission
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
        return {
            error: 'Admin access required'
        };
    }
    try {
        // Check if student already exists in profiles
        const { data: existing } = await supabase.from('profiles').select('id, email, full_name').eq('email', data.email).single();
        if (existing) {
            return {
                success: true,
                data: existing,
                message: 'Student already exists in the system'
            };
        }
        // Send invitation email using Supabase Admin
        if (data.sendInvite) {
            const adminClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
            // Invite user via Supabase Auth
            const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(data.email, {
                data: {
                    full_name: data.fullName,
                    role: 'student'
                },
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
            });
            if (inviteError) {
                console.error('Invitation error:', inviteError);
                throw new Error(`Failed to send invitation: ${inviteError.message}`);
            }
            console.log(`✅ Invitation sent to ${data.email}`, inviteData);
            // Create profile entry for the invited user
            if (inviteData.user) {
                const { error: profileError } = await adminClient.from('profiles').insert({
                    id: inviteData.user.id,
                    email: data.email,
                    full_name: data.fullName,
                    role: 'student'
                });
                if (profileError) {
                    console.error('Profile creation error:', profileError);
                // Don't fail the whole operation if profile creation fails
                // The profile will be created on first login via callback
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/students');
            return {
                success: true,
                data: {
                    email: data.email,
                    full_name: data.fullName
                },
                message: 'Invitation sent successfully! Student will receive an email to join.'
            };
        }
        // If not sending invite, just return success
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/students');
        return {
            success: true,
            data: {
                email: data.email,
                full_name: data.fullName
            },
            message: 'Student information saved. They can sign up normally.'
        };
    } catch (error) {
        console.error('Add student error:', error);
        return {
            error: error.message
        };
    }
}
async function searchStudents(query) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    try {
        const { data, error } = await supabase.from('profiles').select('id, email, full_name, avatar_url, created_at').eq('role', 'student').or(`full_name.ilike.%${query}%,email.ilike.%${query}%`).order('full_name', {
            ascending: true
        }).limit(20);
        if (error) throw error;
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function getStudentsWithEnrollments(filters) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    try {
        // Get all students
        const { data: students, error: studentsError } = await supabase.from('profiles').select(`
        id,
        email,
        full_name,
        avatar_url,
        created_at
      `).eq('role', 'student').order('created_at', {
            ascending: false
        });
        if (studentsError) throw studentsError;
        // Get enrollments for each student
        const { data: enrollments, error: enrollmentsError } = await supabase.from('enrollments').select(`
        id,
        user_id,
        course_id,
        status,
        expires_at,
        granted_by,
        grant_type,
        courses (
          id,
          title,
          thumbnail_url
        )
      `);
        if (enrollmentsError) throw enrollmentsError;
        // Combine data
        const studentsWithEnrollments = students?.map((student)=>{
            const courseEnrollments = enrollments?.filter((e)=>e.user_id === student.id) || [];
            // Check expiry status
            const now = new Date();
            const expiringSoon = courseEnrollments.filter((e)=>{
                if (!e.expires_at) return false;
                const expiryDate = new Date(e.expires_at);
                const daysUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
                return daysUntilExpiry > 0 && daysUntilExpiry <= (filters?.expiringWithinDays || 7);
            });
            return {
                ...student,
                enrollments: courseEnrollments,
                totalEnrollments: courseEnrollments.length,
                expiringSoonCount: expiringSoon.length
            };
        });
        // Apply filters
        let filtered = studentsWithEnrollments;
        if (filters?.status === 'active') {
            filtered = filtered?.filter((s)=>s.totalEnrollments > 0);
        } else if (filters?.status === 'expired') {
            filtered = filtered?.filter((s)=>{
                const hasExpired = (s.enrollments || []).some((e)=>{
                    if (!e.expires_at) return false;
                    return new Date(e.expires_at) < new Date();
                });
                return hasExpired;
            });
        }
        return {
            success: true,
            data: filtered
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function getStudentAttempts(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    try {
        const { data: rawData, error } = await supabase.from('exam_attempts').select(`
                *,
                exams (
                    id,
                    title,
                    total_marks
                ),
                results (*)
            `).eq('student_id', userId).order('created_at', {
            ascending: false
        });
        if (error) throw error;
        // Flatten results
        const data = rawData?.map((att)=>({
                ...att,
                results: Array.isArray(att.results) ? att.results[0] : att.results
            })) || [];
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function getStudentDetails(userId) {
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
        // Get student profile
        const { data: student, error: studentError } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (studentError) {
            console.error('Student fetch error:', studentError);
            throw new Error(`Failed to fetch student profile: ${studentError.message}`);
        }
        if (!student) {
            return {
                error: 'Student not found'
            };
        }
        // Get active sessions count
        // Note: Accessing auth schema may require special permissions
        let activeSessions = 0;
        try {
            const { count, error: sessionsError } = await supabase.schema('auth').from('sessions').select('*', {
                count: 'exact',
                head: true
            }).eq('user_id', userId);
            if (sessionsError) {
                console.error('Session count error:', sessionsError);
            } else {
                activeSessions = count || 0;
            }
        } catch (err) {
            console.error('Failed to fetch session count:', err);
        // Fallback: activeSessions remains 0
        }
        // Get enrollments
        const { data: enrollments, error: enrollmentsError } = await supabase.from('enrollments').select(`
                *,
                courses (
                    id,
                    title,
                    thumbnail_url,
                    price,
                    course_type
                ),
                granted_by_profile:profiles!enrollments_granted_by_fkey (
                    id,
                    full_name
                )
            `).eq('user_id', userId);
        if (enrollmentsError) {
            console.error('Enrollments fetch error:', enrollmentsError);
        // Don't throw, just log and continue with empty array
        }
        const { data: rawAttempts, error: attemptsError } = await supabase.from('exam_attempts').select(`
                *,
                exams (id, title, total_marks),
                results (percentage, obtained_marks)
            `).eq('student_id', userId).order('created_at', {
            ascending: false
        });
        if (attemptsError) {
            console.error('Exam attempts fetch error:', attemptsError);
        // Don't throw, just log and continue with empty array
        }
        // Transform attempts to handle singular results object
        const attempts = rawAttempts?.map((att)=>({
                ...att,
                results: Array.isArray(att.results) ? att.results[0] : att.results
            })) || [];
        // Get enrollment logs
        const enrollmentIds = enrollments?.map((e)=>e.id) || [];
        let logs = [];
        if (enrollmentIds.length > 0) {
            const { data: logData, error: logsError } = await supabase.from('enrollment_logs').select(`
                    *,
                    performed_by_profile:profiles!enrollment_logs_performed_by_fkey (
                        id,
                        full_name
                    )
                `).in('enrollment_id', enrollmentIds).order('created_at', {
                ascending: false
            }).limit(50);
            if (logsError) {
                console.error('Enrollment logs fetch error:', logsError);
            // Don't throw, just log and continue with empty array
            } else {
                logs = logData || [];
            }
        }
        // Calculate Stats
        const submittedAttempts = attempts.filter((a)=>a.status === 'submitted');
        const avgPercentage = submittedAttempts.length > 0 ? submittedAttempts.reduce((acc, curr)=>acc + (curr.results?.percentage || 0), 0) / submittedAttempts.length : 0;
        return {
            success: true,
            data: {
                student,
                enrollments: enrollments || [],
                attempts: attempts || [],
                logs,
                activeSessions,
                stats: {
                    totalEnrollments: enrollments?.length || 0,
                    totalAttempts: attempts?.length || 0,
                    avgPercentage: Math.round(avgPercentage * 10) / 10
                }
            }
        };
    } catch (error) {
        console.error('getStudentDetails error:', error);
        return {
            error: error?.message || 'An unexpected error occurred while fetching student details'
        };
    }
}
async function resetStudentSessions(userId) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    try {
        // Delete all sessions for this user
        const { error: sessionError } = await supabase.schema('auth').from('sessions').delete().eq('user_id', userId);
        if (sessionError) throw sessionError;
        // Also delete refresh tokens to ensure they can't get a new session
        const { error: tokenError } = await supabase.schema('auth').from('refresh_tokens').delete().eq('user_id', userId);
        // Note: tokenError might happen if they have no tokens, we can be lenient or log it
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/admin/students/${userId}`);
        return {
            success: true,
            message: 'All active sessions have been reset'
        };
    } catch (error) {
        console.error('Reset sessions error:', error);
        return {
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    addStudent,
    searchStudents,
    getStudentsWithEnrollments,
    getStudentAttempts,
    getStudentDetails,
    resetStudentSessions
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStudent, "408f03e7e3f4c3de50e6913fb3e48cc02f9ed7f96d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchStudents, "406484b2444f52c52521e60e9acd3ed3a3a2775b75", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentsWithEnrollments, "401e9ce0458d2afa0207c6302a62aaef1c7059712b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentAttempts, "4051ae058cd89d78ab640e30cf4d04824ebc0945c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStudentDetails, "40eeb906185703c1ee6594025206aae37fe15e0f14", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetStudentSessions, "4097ab6e569d8f3c5430e8f17aee35b3244ae881ef", null);
}),
"[project]/actions/admin/grantAccess.ts [app-edge-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"400c8a091c4a2f19ca7a10c1269a2d5a7c5248207c":"extendAccess","400f601106965d1c944063410acad6fc1fa91314e4":"getExpiringSubscriptions","402e0a6f2a84a95092145bea834f800b62e13ad6ec":"getRecentAccessLogs","4073321ad04f6138768f9878af302244291ecf6985":"revokeAccess","40893765dd14aa6d3c814ee90aece2f3f3abd24aa8":"grantTestSeriesAccess","40da591ecf5ed2510043a6b8d18ac4a7b6b4d5c561":"grantCourseAccess"},"",""] */ __turbopack_context__.s([
    "extendAccess",
    ()=>extendAccess,
    "getExpiringSubscriptions",
    ()=>getExpiringSubscriptions,
    "getRecentAccessLogs",
    ()=>getRecentAccessLogs,
    "grantCourseAccess",
    ()=>grantCourseAccess,
    "grantTestSeriesAccess",
    ()=>grantTestSeriesAccess,
    "revokeAccess",
    ()=>revokeAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/webpack/loaders/next-flight-loader/server-reference.js [app-edge-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-server-dom-turbopack/server.edge.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/webpack/loaders/next-flight-loader/action-validate.js [app-edge-rsc] (ecmascript)");
;
;
;
async function grantCourseAccess(data) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    // Get admin user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
        return {
            error: 'Admin access required'
        };
    }
    try {
        // Check if enrollment already exists
        const { data: existing } = await supabase.from('enrollments').select('id, status, expires_at').eq('user_id', data.userId).eq('course_id', data.courseId).single();
        let enrollment;
        if (existing) {
            // Update existing enrollment
            const { data: updated, error } = await supabase.from('enrollments').update({
                status: 'active',
                expires_at: data.expiresAt || null,
                granted_by: user.id,
                granted_at: new Date().toISOString(),
                grant_type: 'manual'
            }).eq('id', existing.id).select().single();
            if (error) throw error;
            enrollment = updated;
            // Log the modification
            await supabase.rpc('log_enrollment_action', {
                p_action: 'modified',
                p_performed_by: user.id,
                p_enrollment_id: existing.id,
                p_previous_expiry: existing.expires_at,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Access modified by admin'
            });
        } else {
            // Create new enrollment
            const { data: newEnrollment, error } = await supabase.from('enrollments').insert({
                user_id: data.userId,
                course_id: data.courseId,
                status: 'active',
                expires_at: data.expiresAt || null,
                granted_by: user.id,
                granted_at: new Date().toISOString(),
                grant_type: 'manual'
            }).select().single();
            if (error) throw error;
            enrollment = newEnrollment;
            // Log the grant
            await supabase.rpc('log_enrollment_action', {
                p_action: 'granted',
                p_performed_by: user.id,
                p_enrollment_id: newEnrollment.id,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Access granted by admin'
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/students');
        return {
            success: true,
            data: enrollment
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function grantTestSeriesAccess(data) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
        return {
            error: 'Admin access required'
        };
    }
    try {
        // Check if enrollment already exists
        const { data: existing } = await supabase.from('enrollments').select('id, expires_at').eq('user_id', data.userId).eq('course_id', data.testSeriesId).single();
        let enrollment;
        if (existing) {
            // Update existing
            const { data: updated, error } = await supabase.from('enrollments').update({
                expires_at: data.expiresAt || null,
                granted_by: user.id,
                granted_at: new Date().toISOString(),
                grant_type: 'manual'
            }).eq('id', existing.id).select().single();
            if (error) throw error;
            enrollment = updated;
            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'modified',
                p_performed_by: user.id,
                p_enrollment_id: existing.id,
                p_previous_expiry: existing.expires_at,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Test series access modified'
            });
        } else {
            // Create new
            const { data: newEnrollment, error } = await supabase.from('enrollments').insert({
                user_id: data.userId,
                course_id: data.testSeriesId,
                expires_at: data.expiresAt || null,
                granted_by: user.id,
                granted_at: new Date().toISOString(),
                grant_type: 'manual',
                status: 'active'
            }).select().single();
            if (error) throw error;
            enrollment = newEnrollment;
            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'granted',
                p_performed_by: user.id,
                p_enrollment_id: newEnrollment.id,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Test series access granted'
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/students');
        return {
            success: true,
            data: enrollment
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function revokeAccess(data) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    try {
        if (data.type === 'course') {
            const { error } = await supabase.from('enrollments').update({
                status: 'refunded'
            }) // Using 'refunded' to indicate revoked
            .eq('id', data.enrollmentId);
            if (error) throw error;
            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'revoked',
                p_performed_by: user.id,
                p_enrollment_id: data.enrollmentId,
                p_notes: data.reason
            });
        } else {
            const { error } = await supabase.from('enrollments').update({
                status: 'refunded'
            }).eq('id', data.enrollmentId);
            if (error) throw error;
            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'revoked',
                p_performed_by: user.id,
                p_enrollment_id: data.enrollmentId,
                p_notes: data.reason
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/students');
        return {
            success: true
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function extendAccess(data) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    console.log('[extendAccess] Starting update:', {
        enrollmentId: data.enrollmentId,
        type: data.type,
        newExpiryDate: data.newExpiryDate,
        isoDate: data.newExpiryDate.toISOString()
    });
    try {
        let previousExpiry;
        let updateError;
        if (data.type === 'course') {
            // Get current enrollment
            const { data: existing, error: fetchError } = await supabase.from('enrollments').select('expires_at, user_id').eq('id', data.enrollmentId).single();
            if (fetchError) {
                console.error('[extendAccess] Error fetching enrollment:', fetchError);
                throw new Error(`Failed to find enrollment: ${fetchError.message}`);
            }
            console.log('[extendAccess] Current enrollment:', existing);
            previousExpiry = existing?.expires_at;
            // Update the expiry date
            const { data: updated, error } = await supabase.from('enrollments').update({
                expires_at: data.newExpiryDate.toISOString(),
                updated_at: new Date().toISOString()
            }).eq('id', data.enrollmentId).select();
            updateError = error;
            console.log('[extendAccess] Update result:', {
                updated,
                error
            });
            if (error) throw error;
            if (!updated || updated.length === 0) {
                throw new Error('No rows were updated. Enrollment may not exist.');
            }
            // Verify the update
            const { data: verified } = await supabase.from('enrollments').select('expires_at').eq('id', data.enrollmentId).single();
            console.log('[extendAccess] Verified expiry after update:', verified);
            if (!verified?.expires_at) {
                throw new Error('Update succeeded but expires_at is still null');
            }
            // Log the action
            await supabase.rpc('log_enrollment_action', {
                p_action: 'extended',
                p_performed_by: user.id,
                p_enrollment_id: data.enrollmentId,
                p_previous_expiry: previousExpiry,
                p_new_expiry: data.newExpiryDate.toISOString(),
                p_notes: data.notes || 'Access period extended'
            });
        } else {
            // Test series enrollment
            const { data: existing, error: fetchError } = await supabase.from('enrollments').select('expires_at, user_id').eq('id', data.enrollmentId).single();
            if (fetchError) {
                console.error('[extendAccess] Error fetching test series enrollment:', fetchError);
                throw new Error(`Failed to find test series enrollment: ${fetchError.message}`);
            }
            console.log('[extendAccess] Current test series enrollment:', existing);
            previousExpiry = existing?.expires_at;
            const { data: updated, error } = await supabase.from('enrollments').update({
                expires_at: data.newExpiryDate.toISOString(),
                updated_at: new Date().toISOString()
            }).eq('id', data.enrollmentId).select();
            updateError = error;
            console.log('[extendAccess] Test series update result:', {
                updated,
                error
            });
            if (error) throw error;
            if (!updated || updated.length === 0) {
                throw new Error('No rows were updated. Test series enrollment may not exist.');
            }
            // Verify the update
            const { data: verified } = await supabase.from('enrollments').select('expires_at').eq('id', data.enrollmentId).single();
            console.log('[extendAccess] Verified test series expiry after update:', verified);
            if (!verified?.expires_at) {
                throw new Error('Update succeeded but expires_at is still null');
            }
            // Log the action
            await supabase.rpc('log_enrollment_action', {
                p_action: 'extended',
                p_performed_by: user.id,
                p_enrollment_id: data.enrollmentId,
                p_previous_expiry: previousExpiry,
                p_new_expiry: data.newExpiryDate.toISOString(),
                p_notes: data.notes || 'Access period extended'
            });
        }
        console.log('[extendAccess] Update completed successfully');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/students');
        return {
            success: true
        };
    } catch (error) {
        console.error('[extendAccess] Error:', error);
        return {
            error: error.message
        };
    }
}
async function getExpiringSubscriptions(daysAhead = 7) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    try {
        const { data, error } = await supabase.from('expiring_enrollments_view').select('*').lte('days_until_expiry', daysAhead).order('days_until_expiry', {
            ascending: true
        });
        if (error) throw error;
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
async function getRecentAccessLogs(limit = 50) {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {
        error: 'Unauthorized'
    };
    try {
        const { data, error } = await supabase.from('enrollment_logs').select(`
        *,
        performed_by_profile:profiles!enrollment_logs_performed_by_fkey (
          id,
          full_name,
          email
        )
      `).order('created_at', {
            ascending: false
        }).limit(limit);
        if (error) throw error;
        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    grantCourseAccess,
    grantTestSeriesAccess,
    revokeAccess,
    extendAccess,
    getExpiringSubscriptions,
    getRecentAccessLogs
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(grantCourseAccess, "40da591ecf5ed2510043a6b8d18ac4a7b6b4d5c561", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(grantTestSeriesAccess, "40893765dd14aa6d3c814ee90aece2f3f3abd24aa8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(revokeAccess, "4073321ad04f6138768f9878af302244291ecf6985", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(extendAccess, "400c8a091c4a2f19ca7a10c1269a2d5a7c5248207c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getExpiringSubscriptions, "400f601106965d1c944063410acad6fc1fa91314e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$server$2d$dom$2d$turbopack$2f$server$2e$edge$2e$js__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getRecentAccessLogs, "402e0a6f2a84a95092145bea834f800b62e13ad6ec", null);
}),
"[project]/.next-internal/server/app/admin/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/rewardActions.ts [app-edge-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/admin/students.ts [app-edge-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/admin/grantAccess.ts [app-edge-rsc] (ecmascript)\" } [app-edge-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/rewardActions.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/admin/students.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$grantAccess$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/admin/grantAccess.ts [app-edge-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/profile/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/rewardActions.ts [app-edge-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/actions/admin/students.ts [app-edge-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/actions/admin/grantAccess.ts [app-edge-rsc] (ecmascript)\" } [app-edge-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "400c8a091c4a2f19ca7a10c1269a2d5a7c5248207c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$grantAccess$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["extendAccess"],
    "401af75fb501836c067ff5309414f33ff8ec6d523c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["getUserBadges"],
    "401e9ce0458d2afa0207c6302a62aaef1c7059712b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["getStudentsWithEnrollments"],
    "406484b2444f52c52521e60e9acd3ed3a3a2775b75",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["searchStudents"],
    "406ef9d617799bcd1e0cc901a06585cccfd9ea3b5e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["checkStreak"],
    "40893765dd14aa6d3c814ee90aece2f3f3abd24aa8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$grantAccess$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["grantTestSeriesAccess"],
    "408f03e7e3f4c3de50e6913fb3e48cc02f9ed7f96d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["addStudent"],
    "4097ab6e569d8f3c5430e8f17aee35b3244ae881ef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["resetStudentSessions"],
    "409b6c9e7f7aeea92b23738c3b0bc90cec78ddfab0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["getDailyMissions"],
    "40b0b14b03ca8c026611963a00d913cf1f9512bae9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["getStreakHistory"],
    "40d59f95dc89fd4dc26cbfaa1a6ee2c66ddc89d104",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["getRewardStatus"],
    "40da591ecf5ed2510043a6b8d18ac4a7b6b4d5c561",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$grantAccess$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["grantCourseAccess"],
    "6062a646126ab86278ff8a9f9d5dd9c2cf55fa2b68",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["updateMissionProgress"],
    "606f53d15fe31c1858c290384edc7b7c0fb1e457e8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["getLeaderboard"],
    "780d64f65fac54c55def49046d2a33becf7ac8e4bd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__["awardCoins"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$profile$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$actions$2f$admin$2f$grantAccess$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$edge$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/profile/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/rewardActions.ts [app-edge-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/actions/admin/students.ts [app-edge-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/actions/admin/grantAccess.ts [app-edge-rsc] (ecmascript)" } [app-edge-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$rewardActions$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/rewardActions.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$students$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/admin/students.ts [app-edge-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$admin$2f$grantAccess$2e$ts__$5b$app$2d$edge$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/actions/admin/grantAccess.ts [app-edge-rsc] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__9c81ed5e._.js.map