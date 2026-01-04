"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    role: string;
    avatarUrl?: string | null;
}

export function useCurrentUser(options?: { enabled?: boolean }) {
    const supabase = createClient();
    const queryClient = useQueryClient();

    // Listen for auth state changes (login/logout in other tabs)
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            // When auth state changes, invalidate the current-user query
            // This ensures fresh data is fetched and prevents stale cache issues
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
                queryClient.invalidateQueries({ queryKey: ["current-user"] });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, queryClient]);

    return useQuery({
        queryKey: ["current-user"],
        queryFn: async (): Promise<UserProfile | null> => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return null;

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("id, email, full_name, role, avatar_url")
                .eq("id", user.id)
                .single();

            if (error || !profile) {
                // FIX: Return null instead of throwing error to prevent infinite loading
                // This handles cases where:
                // 1. Profile doesn't exist yet (DB trigger delay)
                // 2. Session conflict (multiple users in different tabs)
                // 3. Profile was deleted
                console.warn("Profile not found:", error?.message || "No profile data");
                return null;
            }

            return {
                id: profile.id,
                email: profile.email,
                fullName: profile.full_name || "Student",
                role: profile.role,
                avatarUrl: profile.avatar_url,
            };
        },
        // Reduced retry attempts to prevent infinite loading on mobile
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(300 * 2 ** attemptIndex, 1500), // 300ms, 600ms
        // Only retry on network errors, not on missing profile
        retryOnMount: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes - clear cache after this time
        enabled: options?.enabled !== false, // Default to true, can be disabled
    });
}
