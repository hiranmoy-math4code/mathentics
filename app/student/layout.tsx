"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminClientLayout from "../admin/AdminClientLayout";
import { CommunityModalProvider } from "@/context/CommunityModalContext";
import { CommunityModal } from "@/components/community/CommunityModal";
import { useCurrentUser } from "@/hooks/student/useCurrentUser";
import { StudentAppContainer } from "@/components/StudentAppContainer";

export const runtime = 'edge';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: profile, isLoading } = useCurrentUser();

  useEffect(() => {
    // Only redirect if we have definitively finished loading and there is no user,
    // or if the user is not a student.
    if (!isLoading) {
      if (!profile) {
        router.replace("/auth/login");
      } else if (profile.role !== "student") {
        router.replace("/admin/dashboard");
      }
    }
  }, [profile, isLoading, router]);

  const links = [
    { icon: "home", label: "Dashboard", href: "/student/dashboard" },
    { icon: "bookopen", label: "My Courses", href: "/student/my-courses" },
    { icon: "layers", label: "All Courses", href: "/student/all-courses" },
    { icon: "trendingup", label: "My Series", href: "/student/my-series" },
    { icon: "layers", label: "All Series", href: "/student/all-test-series" },
    { icon: "messagesquare", label: "Community", href: "#", onClick: "openCommunity" },
    {
      icon: "award",
      label: "Result",
      href: "/student/results",
      prefetch: async () => {
        // Prefetch results data on hover
        const supabase = (await import('@/lib/supabase/client')).createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data } = await supabase
          .from("results")
          .select("*, exam_attempts(exam_id, exams(title))")
          .eq("exam_attempts.student_id", user.id)
          .order("created_at", { ascending: false });

        return data;
      }
    },
    { icon: "gift", label: "Rewards", href: "/student/rewards" },
    { icon: "settings", label: "Settings", href: "/student/settings" },
  ];

  // If loading and NO data (initial fetch), show loading.
  // If we have cached data, we skip this and render immediately.
  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        {/* Optional: Add a spinner here if desired, but text is fine */}
        Checking access...
      </div>
    );
  }

  // If not loading but no profile (will redirect in effect), allow render or return null to prevent flash
  if (!profile) return null;

  // Adapt the profile object for AdminClientLayout if necessary
  const layoutProfile = {
    id: profile.id,
    full_name: profile.fullName,
    email: profile.email,
    role: profile.role,
    avatar_url: null, // useCurrentUser might not fetch avatar_url, add if needed
  };

  // Check if we're on a payment route - if so, render children directly
  const isPaymentRoute = pathname?.startsWith('/student/payment');

  return (
    <CommunityModalProvider>
      {isPaymentRoute ? (
        // For payment routes, render children directly without the SPA container
        <>{children}</>
      ) : (
        // For other routes, use the SPA container
        <AdminClientLayout profile={layoutProfile} links={links}>
          <StudentAppContainer initialRoute={pathname} />
        </AdminClientLayout>
      )}
      <CommunityModal />
    </CommunityModalProvider>
  );
}
