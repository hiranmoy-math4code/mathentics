import type React from "react";
import AdminClientLayout from "./AdminClientLayout";
import { AdminAppContainer } from "@/components/admin/AdminAppContainer";

export const runtime = 'edge';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <AdminClientLayout links={links}>
      <AdminAppContainer initialRoute="/admin/dashboard">
        {children}
      </AdminAppContainer>
    </AdminClientLayout>
  );
}
