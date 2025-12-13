
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { CoursePlayerClient } from "@/components/CoursePlayerClient";
import { CommunityModalProvider } from "@/context/CommunityModalContext";
import { CommunityModal } from "@/components/community/CommunityModal";

export const runtime = 'edge';

export default async function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    const supabase = await createClient(); // Server Client

    // Auth Check
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect(`/auth/login?next=/learn/${courseId}`);
    }

    // Check enrollment (needed for CoursePlayerClient context/locking)
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("status")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();

    const isEnrolled = !!enrollment;

    // Fetch user profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // --- PREFETCHING START ---
    const queryClient = getQueryClient();

    // 1. Fetch Course Details
    const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId)
        .single();

    if (courseError || !course) redirect("/courses");

    // Seed Cache
    queryClient.setQueryData(['course', courseId], course);

    // 2. Fetch Modules & Lessons
    let { data: modulesData, error: modulesError } = await supabase
        .rpc('get_course_structure', { target_course_id: courseId });

    if (modulesError) {
        // Fallback Logic
        const { data: fallbackData } = await supabase
            .from("modules")
            .select(`
                *,
                lessons (*)
            `)
            .eq("course_id", courseId)
            .order("module_order", { ascending: true });

        modulesData = fallbackData?.map((m: any) => ({
            ...m,
            lessons: (m.lessons || []).sort((a: any, b: any) => a.lesson_order - b.lesson_order)
        }));
    }

    const modulesWithSortedLessons = (modulesData || []).map((module: any) => ({
        ...module,
        lessons: module.lessons || []
    }));

    queryClient.setQueryData(['course-structure', courseId], modulesWithSortedLessons);
    // --- PREFETCHING END ---

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CommunityModalProvider>
                <CoursePlayerClient
                    courseId={courseId}
                    user={user}
                    profile={profile}
                    isEnrolled={isEnrolled}
                >
                    {children}
                </CoursePlayerClient>
                <CommunityModal />
            </CommunityModalProvider>
        </HydrationBoundary>
    );
}
