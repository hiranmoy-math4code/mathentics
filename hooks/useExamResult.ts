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

    if (attemptError) {
      throw attemptError
    }
    if (!attempt) throw new Error("Attempt not found")

    const examId = attempt.exam_id

    // 2. Fetch all responses for this attempt
    const { data: responses, error: responsesError } = await supabase
      .from("responses")
      .select("*")
      .eq("attempt_id", attemptId)

    if (responsesError) {
      throw responsesError
    }

    const responseMap: Record<string, any> = {}
    responses?.forEach((r: any) => {
      try {
        responseMap[r.question_id] = JSON.parse(r.student_answer)
      } catch {
        responseMap[r.question_id] = r.student_answer
      }
    })

    // 3. Fetch ALL sections for this exam
    const { data: sections, error: sectionsError } = await supabase
      .from("sections")
      .select("*")
      .eq("exam_id", examId)
      .order("section_order")

    if (sectionsError) {
      throw sectionsError
    }
    if (!sections?.length) throw new Error("Sections not found")

    // 4. Fetch ALL questions for these sections
    const sectionIds = sections.map((s) => s.id)
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*, options(*)")
      .in("section_id", sectionIds)

    if (questionsError) {
      throw questionsError
    }
    if (!questions?.length) throw new Error("Questions not found")

    // 5. Fetch result summary
    const { data: resultSummary, error: resultError } = await supabase
      .from("results")
      .select("*")
      .eq("attempt_id", attemptId)
      .single()

    if (resultError && resultError.code !== 'PGRST116') {
      // Silently ignore - result may not exist yet
    }

    // 6. Fetch section results
    let sectionResults: any[] = []
    if (resultSummary) {
      const { data: secResults, error: secError } = await supabase
        .from("section_results")
        .select("*")
        .eq("result_id", resultSummary.id)

      if (secResults) sectionResults = secResults
    }

    // 7. Structure the data by sections
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
