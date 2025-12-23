"use client";

import { createClient } from "@/lib/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import TestSeriesCard from "./TestSeriesCard"
import EmptyState from "./EmptyState"
import TestSeriesSkeleton from "./TestSeriesSkeleton"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const supabase = createClient();

export default function TestSeriesList() {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id || null));
  }, []);

  const { data: testSeries, isLoading } = useQuery({
    queryKey: ["admin-test-series-list", userId],
    queryFn: async () => {
      const { data } = await supabase
        .from("test_series")
        .select("*")
        .eq("admin_id", userId)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!userId,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("test_series").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-test-series-list"] });
      queryClient.invalidateQueries({ queryKey: ["admin-series-stats"] });
      toast.success("Test series deleted successfully");
    }
  });

  const handleDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    if (confirm("Are you sure you want to delete this test series?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <TestSeriesSkeleton count={3} />;
  if (!testSeries || testSeries.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testSeries.map((series) => (
        <TestSeriesCard key={series.id} series={series} handleDelete={handleDelete} />
      ))}
    </div>
  )
}
