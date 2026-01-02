import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LessonAppContainer } from "@/components/LessonAppContainer";

/**
 * ⚡ CLIENT-SIDE PATTERN - Minimal Server Wrapper
 * 
 * Server responsibilities (fast):
 * 1. Auth check
 * 2. Enrollment check
 * 
 * Client responsibilities (React Query):
 * - All data fetching
 * - All lesson navigation
 * - Caching and optimization
 */
export const runtime = 'edge';

export default async function CourseLessonPage({
    params,
    searchParams,
}: {
    params: Promise<{ courseId: string }>;
    searchParams: Promise<{ lessonId?: string }>;
}) {
    const { courseId } = await params;
    const { lessonId } = await searchParams;
    const supabase = await createClient();

    // Fast Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        const nextPath = lessonId
            ? `/learn/${courseId}?lessonId=${lessonId}`
            : `/learn/${courseId}`;
        redirect(`/auth/login?next=${encodeURIComponent(nextPath)}`);
    }

    // Verify user has tenant membership (ensures complete setup)
    const { data: membership } = await supabase
        .from('user_tenant_memberships')
        .select('id, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

    if (!membership) {
        // User is authenticated but missing tenant membership
        // This shouldn't happen with the fixed OAuth flow, but handle it gracefully
        console.error(`[LEARN] User ${user.email} missing tenant membership`);
        redirect('/auth/login?error=Account setup incomplete. Please login again.');
    }

    // Fast Enrollment Check (indexed query)
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("status, expires_at")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();
    const isEnrolled = !!enrollment;

    // Check if enrollment has expired
    if (enrollment?.expires_at) {
        const expiryDate = new Date(enrollment.expires_at);
        const now = new Date();
        if (expiryDate < now) {
            // Course access has expired, redirect to course page
            redirect(`/courses/${courseId}?expired=true`);
        }
    }

    return (
        <LessonAppContainer
            courseId={courseId}
            user={user}
            isEnrolled={isEnrolled}
            initialLessonId={lessonId}
        />
    );
}

