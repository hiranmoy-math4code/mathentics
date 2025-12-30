"use client";

import { useEffect } from "react";
import { checkStreak, awardCoins, updateMissionProgress } from "@/app/actions/rewardActions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useTenantId } from "@/hooks/useTenantId";

export function RewardInitializer({ userId }: { userId: string }) {
    const pathname = usePathname();
    const tenantId = useTenantId();

    useEffect(() => {
        if (!userId || !tenantId) {
            if (!tenantId) {
                console.warn('⚠️ Tenant ID not available. Reward system will not work.');
            }
            return;
        }

        const initRewards = async () => {
            // New Flow: Trigger 'login' action with tenant ID
            // The DB Trigger handles Streak Updates + Coin Awards automatically.
            const loginRes = await awardCoins(userId, 'login', undefined, undefined, tenantId);

            if (loginRes.success && loginRes.message) {
                toast.success(loginRes.message, {
                    icon: "🔥",
                    duration: 3000
                });
                // Dispatch event to refresh UI counters
                window.dispatchEvent(new Event("rewards-updated"));
            }

            // Update login mission progress
            await updateMissionProgress(userId, 'login', tenantId);
        };

        // Run once on mount (session start)
        initRewards();
    }, [userId, tenantId]); // Added tenantId to dependencies

    return null; // This component renders nothing
}
