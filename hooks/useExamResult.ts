"use client"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

export async function fetchExamResult(attemptId: string) {
  const supabase = createClient()

  try {
    // 1. Fetch attempt info
    const { data: attempt, error: attemptError } = await supabase
      .from("exam_attempts")
      .select("*, exams(title, id, result_visibility, result_release_time, show_answers)")
      .eq("id", attemptId)
      .single()

    if (attemptError) throw attemptError
    if (!attempt) throw new Error("Attempt not found")

    const examId = attempt.exam_id

    // Background cleanup (non-blocking)
    const { cleanupAttemptResponses } = await import('@/lib/responseCleanup');
    cleanupAttemptResponses(attemptId).catch(err => console.warn('Background cleanup failed:', err));

    // ============================================================
    // STEP 2: PARALLEL FETCH (Responses, Sections+Questions, Results)
    // ============================================================
    const [responsesResult, sectionsData, resultData] = await Promise.all([
      // A. Fetch Responses
      supabase
        .from("responses")
        .select("*")
        .eq("attempt_id", attemptId),

      // B. Fetch Sections -> Then Questions
      (async () => {
        const { data: sections, error: secErr } = await supabase
          .from("sections")
          .select("*")
          .eq("exam_id", examId)
          .order("section_order")

        if (secErr) throw secErr
        if (!sections?.length) throw new Error("Sections not found")

        const sectionIds = sections.map((s) => s.id)
        const { data: questions, error: qErr } = await supabase
          .from("questions")
          .select("*, options(*)")
          .in("section_id", sectionIds)

        if (qErr) throw qErr
        if (!questions?.length) throw new Error("Questions not found")

        return { sections, questions }
      })(),

      // C. Fetch Result Summary -> Then Section Results
      (async () => {
        const { data: resultSummary, error: resErr } = await supabase
          .from("results")
          .select("*")
          .eq("attempt_id", attemptId)
          .single()

        if (resErr && resErr.code !== 'PGRST116') return { resultSummary: null, sectionResults: [] }

        let sectionResults: any[] = []
        if (resultSummary) {
          const { data: secResults } = await supabase
            .from("section_results")
            .select("*")
            .eq("result_id", resultSummary.id)
          if (secResults) sectionResults = secResults
        }
        return { resultSummary, sectionResults }
      })()
    ])

    const responses = responsesResult.data
    const { sections, questions } = sectionsData
    const { resultSummary, sectionResults } = resultData

    // Process Responses
    const responseMap: Record<string, any> = {}
    responses?.forEach((r: any) => {
      if (!r.student_answer) return;
      try {
        const parsed = JSON.parse(r.student_answer)
        responseMap[r.question_id] = parsed
      } catch {
        let value = r.student_answer
        if (typeof value === 'string') value = value.replace(/^["']|["']$/g, '')
        responseMap[r.question_id] = value
      }
    })

    // Structure the data
    const structured = sections.map((s) => ({
      ...s,
      questions: questions.filter((q) => q.section_id === s.id),
      result: sectionResults.find(sr => sr.section_id === s.id)
    }))

    return { attempt, responseMap, structured, result: resultSummary }
  } catch (error) {
    throw error
  }
}

export function useExamResult(attemptId: string) {
  return useQuery({
    queryKey: ["exam-result", attemptId],
    queryFn: () => fetchExamResult(attemptId),
    enabled: !!attemptId,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  })
}
