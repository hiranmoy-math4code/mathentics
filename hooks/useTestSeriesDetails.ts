"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

async function fetchTestSeriesDetails(seriesId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { seriesInfo: null, tests: [], isEnrolled: false }

  const { data: series } = await supabase
    .from("test_series")
    .select("*")
    .eq("id", seriesId)
    .single()

  if (!series) return { seriesInfo: null, tests: [], isEnrolled: false }

  const { data: enrollment } = await supabase
    .from("test_series_enrollments")
    .select("*")
    .eq("test_series_id", seriesId)
    .eq("student_id", user.id)
    .single()

  const isEnrolled = !!enrollment

  const { data: testSeriesExams } = await supabase
    .from("test_series_exams")
    .select("exam_id, exam_order, max_attempts")
    .eq("test_series_id", seriesId)
    .order("exam_order", { ascending: true })

  if (!testSeriesExams || testSeriesExams.length === 0) {
    return { seriesInfo: series, tests: [], isEnrolled: !!enrollment }
  }

  const examIds = testSeriesExams.map((t) => t.exam_id)

  const { data: examsData } = await supabase
    .from("exams")
    .select(`
      id,
      title,
      duration_minutes,
      total_marks,
      exam_attempts (
        id,
        student_id,
        status,
        submitted_at,
        results (id, obtained_marks)
      )
    `)
    .in("id", examIds)

  // Create a map for quick lookup
  const examsMap = new Map(examsData?.map((e) => [e.id, e]))

  let previousCompleted = true // First exam is always unlocked

  const tests = testSeriesExams.map((item: any) => {
    const exam = examsMap.get(item.exam_id)

    // strict check: if exam not found (deleted/unpublished?), skip or mark invalid.
    // determining to return a placeholder or null to filter later
    if (!exam) return null

    const studentAttempts =
      exam.exam_attempts?.filter((a: any) => a.student_id === user.id) || []

    let highestScore = null
    if (studentAttempts.length > 0) {
      const scores = studentAttempts
        .map((a: any) => a.results?.[0]?.obtained_marks)
        .filter((s: any) => s !== undefined && s !== null)
      if (scores.length > 0) highestScore = Math.max(...scores)
    }

    const latestAttempt = studentAttempts[studentAttempts.length - 1]

    let status = "Locked"

    if (studentAttempts.length === 0) {
      if (previousCompleted) {
        status = "Not Started"
      } else {
        status = "Locked"
      }
    } else if (latestAttempt?.status === "in_progress") {
      status = "Ongoing"
    } else if (
      latestAttempt?.status === "submitted" ||
      latestAttempt?.status === "graded"
    ) {
      status = "Completed"
    }

    if (status !== "Completed") {
      previousCompleted = false
    }

    return {
      id: exam.id,
      name: exam.title,
      duration: `${exam.duration_minutes} mins`,
      marks: exam.total_marks,
      status,
      score: highestScore,
      attemptsCount: studentAttempts.length,
      canReattempt: studentAttempts.length < (item.max_attempts || 2), // Use max_attempts from junction or default
      lastAttemptId: latestAttempt?.id,
    }
  }).filter(Boolean) // Remove nulls if any exams were missing

  return { seriesInfo: series, tests: tests as any[], isEnrolled: !!enrollment }
}

export function useTestSeriesDetails(seriesId: string) {
  return useQuery({
    queryKey: ["test-series-details", seriesId],
    queryFn: () => fetchTestSeriesDetails(seriesId),
    staleTime: 0, // Always fetch fresh to ensure status (Start -> Resume) is up to date
    refetchOnWindowFocus: true,
    enabled: !!seriesId,
  })
}
