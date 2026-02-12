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

    // ⚡ OPTIMIZATION: Run independent checks in parallel
    // 1. Course Price
    // 2. Enrollment Status
    const [courseResult, enrollmentResult] = await Promise.all([
        supabase
            .from('courses')
            .select('price')
            .eq('id', courseId)
            .single(),
        supabase
            .from("enrollments")
            .select("status, expires_at")
            .eq("user_id", user.id)
            .eq("course_id", courseId)
            .in("status", ["active", "expired"])
            .maybeSingle()
    ]);

    const { data: course } = courseResult;
    const { data: enrollment } = enrollmentResult;

    const isEnrolled = !!enrollment;

    console.log("enrollment", enrollment);

    // Check if enrollment has expired
    let isExpired = false;
    if (enrollment?.expires_at) {
        const expiryDate = new Date(enrollment.expires_at);
        const now = new Date();
        if (expiryDate < now) {
            isExpired = true;
        }
    }
    // TEMP: Force expiration for testing
    // isExpired = true;

    return (
        <LessonAppContainer
            courseId={courseId}
            user={user}
            isEnrolled={isEnrolled}
            initialLessonId={lessonId}
            isExpired={isExpired}
            coursePrice={course?.price || 0}
        />
    );
}

