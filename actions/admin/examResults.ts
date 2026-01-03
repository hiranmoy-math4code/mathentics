'use server';

import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Get exam results for admin view
 * Uses admin client to bypass RLS
 */
export async function getExamResults(examId: string) {
    const supabase = createAdminClient();

    try {
        // 1. Fetch exam details
        const { data: examData } = await supabase
            .from("exams")
            .select("title, total_marks, tenant_id")
            .eq("id", examId)
            .single();

        if (!examData) {
            return { error: "Exam not found" };
        }

        // 2. Fetch exam attempts for this exam
        const { data: attempts } = await supabase
            .from("exam_attempts")
            .select("id, student_id, status, created_at")
            .eq("exam_id", examId)
            .eq("status", "submitted");

        if (!attempts || attempts.length === 0) {
            return {
                success: true,
                data: {
                    examTitle: examData.title,
                    results: []
                }
            };
        }

        // 3. Fetch results
        const attemptIds = attempts.map(a => a.id);
        const { data: resultsData } = await supabase
            .from("results")
            .select("attempt_id, obtained_marks, percentage")
            .in("attempt_id", attemptIds);

        // 4. Fetch profiles
        const studentIds = [...new Set(attempts.map(a => a.student_id))];
        const { data: profiles } = await supabase
            .from("profiles")
            .select("id, full_name, email, avatar_url")
            .in("id", studentIds);

        // 5. Merge data
        const resultsMap = new Map(resultsData?.map(r => [r.attempt_id, r]) || []);
        const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

        const merged = attempts.map(attempt => {
            const result = resultsMap.get(attempt.id);
            const profile = profilesMap.get(attempt.student_id);

            return {
                attempt_id: attempt.id,
                student_id: attempt.student_id,
                full_name: profile?.full_name || "Unknown",
                email: profile?.email || "",
                avatar_url: profile?.avatar_url || null,
                status: attempt.status,
                submitted_at: attempt.created_at,
                total_marks: examData.total_marks || 0,
                obtained_marks: result?.obtained_marks || 0,
                percentage: result?.percentage || 0,
                rank: null as number | null
            };
        });

        // 6. Sort and rank
        const sorted = merged.sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
        sorted.forEach((result, index) => {
            result.rank = index + 1;
        });

        return {
            success: true,
            data: {
                examTitle: examData.title,
                results: sorted
            }
        };

    } catch (error: any) {
        console.error("Error fetching exam results:", error);
        return { error: error.message };
    }
}
