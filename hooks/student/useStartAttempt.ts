// hooks/student/useStartAttempt.ts
"use client";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const useStartAttempt = () => {
  const supabase = createClient();
  return useMutation({
    mutationFn: async ({ examId, userId }: { examId: string; userId: string }) => {
      if (!userId) throw new Error("Not authenticated");

      // create attempt
      const { data, error } = await supabase
        .from("exam_attempts")
        .insert([{ exam_id: examId, student_id: userId }])
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });
};
