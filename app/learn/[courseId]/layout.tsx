
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CoursePlayerClient } from "@/components/CoursePlayerClient";
import { CommunityModalProvider } from "@/context/CommunityModalContext";
import { CommunityModal } from "@/components/community/CommunityModal";

// export const runtime = 'edge';

export default async function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    const supabase = await createClient();

    // Fast Auth Check
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect(`/auth/login?next=/learn/${courseId}`);
    }

    // Fast Enrollment Check
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("status")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .eq("status", "active")
        .single();

    const isEnrolled = !!enrollment;

    // Get user profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
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
    );
}
