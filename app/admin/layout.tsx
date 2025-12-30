import type React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminClientLayout from "./AdminClientLayout";
import { AdminAppContainer } from "@/components/admin/AdminAppContainer";
import { headers } from "next/headers";
import { Home, Grid, BarChart2, User, Settings } from "lucide-react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export const runtime = 'edge';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const headersList = await headers();
  const pathname = headersList.get("x-url") || "/admin/dashboard";

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || (profile.role !== "admin" && profile.role !== "creator")) {
    redirect("/student/dashboard");
  }
  const links = [
    { icon: "home", label: "Dashboard", href: "/admin/dashboard" },
    { icon: "bookopen", label: "Courses", href: "/admin/courses" },
    { icon: "award", label: "Test Series", href: "/admin/test-series" },
    { icon: "question", label: "Question Bank", href: "/admin/question-bank" },
    { icon: "grid", label: "Exam", href: "/admin/exams" },
    { icon: "payment", label: "Payments", href: "/admin/payments" },
    { icon: "settings", label: "Payment Gateway", href: "/admin/settings/payment" },
    { icon: "user", label: "Students", href: "/admin/students" },
    { icon: "messagesquare", label: "Community", href: "#", onClick: "openCommunity" },
  ];

  return (
    <AdminClientLayout profile={profile} links={links}>
      <AdminAppContainer initialRoute={pathname}>
        {children}
      </AdminAppContainer>
    </AdminClientLayout>
  );
}
