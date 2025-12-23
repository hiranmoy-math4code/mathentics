"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import StudentManagementClient from "@/components/admin/StudentManagementClient";
import { useQuery } from "@tanstack/react-query";
import Loading from "../dashboard/components/Loading";

const supabase = createClient();

export default function StudentsPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
  }, []);

  const { data: initialData, isLoading } = useQuery({
    queryKey: ["admin-students-init", userId],
    queryFn: async () => {
      // Fetch courses and test series for the Grant Access dialog
      const { data: courses } = await supabase
        .from('courses')
        .select('id, title, thumbnail_url')
        .eq('is_published', true)
        .order('title', { ascending: true });

      const { data: testSeries } = await supabase
        .from('test_series')
        .select('id, title')
        .eq('status', 'published')
        .order('title', { ascending: true });

      return { courses, testSeries };
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60, // 1 hour (courses/test series titles don't change often)
  });

  if (isLoading) return <Loading />;

  return (
    <StudentManagementClient
      courses={initialData?.courses || []}
      testSeries={initialData?.testSeries || []}
    />
  );
}
