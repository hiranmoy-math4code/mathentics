"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import TestSeriesHeader from "./components/TestSeriesHeader";
import TestSeriesList from "./components/TestSeriesList";
import TestSeriesSkeleton from "./components/TestSeriesSkeleton";
import SeriesListWrapper from "./components/SeriesListWrapper";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

async function fetchSeriesStats(userId: string) {
    const { data } = await supabase
        .from("test_series")
        .select("status")
        .eq("admin_id", userId);

    const total = data?.length ?? 0;
    const published = data?.filter((s: any) => s.status === "published").length ?? 0;
    const draft = data?.filter((s: any) => s.status === "draft").length ?? 0;

    return { total, published, draft };
}

export default function TestSeriesPage() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
    }, []);

    const { data: stats, isLoading, error } = useQuery({
        queryKey: ["admin-series-stats", userId],
        queryFn: () => fetchSeriesStats(userId!),
        enabled: !!userId,
    });

    return (
        <div className="space-y-8 p-2 md:p-1">
            <TestSeriesHeader
                stats={stats || { total: 0, published: 0, draft: 0 }}
                loading={isLoading}
                error={error ? (error as any).message : null}
            />

            <SeriesListWrapper>
                <TestSeriesList />
            </SeriesListWrapper>
        </div>
    );
}
