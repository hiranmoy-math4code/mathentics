"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { RewardInitializer } from "@/components/RewardInitializer";

export function RewardInitializerWrapper() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();

        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        }

        checkUser();
    }, []);

    if (!userId) return null;

    return <RewardInitializer userId={userId} />;
}
