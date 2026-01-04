"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import CoursesList from "./components/CoursesList";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/student/useCurrentUser";

const supabase = createClient();

async function fetchCourses(userId: string) {
    const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("creator_id", userId)
        .eq("course_type", "course")
        .order("created_at", { ascending: false });
    return data || [];
}

export default function CoursesPage() {
    const { data: userProfile } = useCurrentUser();
    const userId = userProfile?.id || null;

    /* REMOVED: Manual getUser effect
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
    }, []);
    */

    const { data: courses, isLoading } = useQuery({
        queryKey: ["admin-courses", userId],
        queryFn: () => fetchCourses(userId!),
        enabled: !!userId,
    });

    if (!userId && !isLoading) return null;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Courses</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Manage your curriculum, track learners, and publish content.
                </p>
            </div>

            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : (
                <CoursesList initialCourses={courses || []} />
            )}
        </div>
    );
}
