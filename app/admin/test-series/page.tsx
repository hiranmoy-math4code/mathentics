"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import CoursesList from "../courses/components/CoursesList";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

async function fetchTestSeries(userId: string) {
    const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("creator_id", userId)
        .eq("course_type", "test_series")
        .order("created_at", { ascending: false });
    return data || [];
}

export default function TestSeriesPage() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
    }, []);

    const { data: testSeries, isLoading } = useQuery({
        queryKey: ["admin-test-series", userId],
        queryFn: () => fetchTestSeries(userId!),
        enabled: !!userId,
    });

    if (!userId && !isLoading) return null;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Test Series</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Manage your test series, track student performance, and publish exams.
                </p>
            </div>

            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : (
                <CoursesList initialCourses={testSeries || []} />
            )}
        </div>
    );
}
