import { createClient } from "@/lib/supabase/server";
import StudentManagementClient from "@/components/admin/StudentManagementClient";
import { redirect } from "next/navigation";

export default async function StudentsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  // Check admin permission
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/student/dashboard');
  }

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

  return (
    <StudentManagementClient
      courses={courses || []}
      testSeries={testSeries || []}
    />
  );
}
