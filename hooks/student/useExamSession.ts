import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export type Option = { id: string; option_text: string; is_correct?: boolean }
export type Question = {
    id: string
    question_text: string
    question_type: "MCQ" | "MSQ" | "NAT"
    marks: number
    negative_marks: number
    correct_answer?: string
    options?: Option[]
    section_id: string
}
export type Section = {
    id: string;
    title: string;
    questions: Question[];
    required_attempts?: number;
    max_questions_to_attempt?: number;
}
export type Exam = { id: string; title: string; duration_minutes: number; total_marks?: number }
export type Attempt = { id: string; status: string; exam_id: string; student_id: string; total_time_spent?: number }

export function useExamSession(examId: string, userId: string | null, retakeAttempt: number = 0, enabled: boolean = true) {
    const supabase = createClient()

    return useQuery({
        queryKey: ["exam-session", examId, userId, retakeAttempt],
        queryFn: async () => {
            if (!userId) throw new Error("User not logged in")

            // 1. Fetch Exam Details
            const { data: exam, error: examError } = await supabase
                .from("exams")
                .select("*")
                .eq("id", examId)
                .single()

            if (examError) throw examError
            if (!exam) throw new Error("Exam not found")

            // 2. Check exam scheduling (start_time and end_time)
            const now = new Date()
            const examData = exam as any

            if (examData.start_time) {
                const startTime = new Date(examData.start_time)
                if (now < startTime) {
                    throw new Error(`This exam is not yet available. It will start on ${startTime.toLocaleString()}.`)
                }
            }

            if (examData.end_time) {
                const endTime = new Date(examData.end_time)
                if (now > endTime) {
                    throw new Error(`This exam has ended. It was available until ${endTime.toLocaleString()}.`)
                }
            }

            // 3. Check LESSON-based prerequisite (quiz lessons only)
            const { data: currentLesson } = await supabase
                .from("lessons")
                .select("id, title, prerequisite_lesson_id, sequential_unlock_enabled")
                .eq("exam_id", examId)
                .eq("content_type", "quiz")
                .single()

            if (currentLesson?.sequential_unlock_enabled && currentLesson.prerequisite_lesson_id) {
                // Get the prerequisite lesson and its exam
                const { data: prereqLesson } = await supabase
                    .from("lessons")
                    .select("id, title, exam_id")
                    .eq("id", currentLesson.prerequisite_lesson_id)
                    .single()

                if (prereqLesson?.exam_id) {
                    // Check if student has completed the prerequisite lesson's exam
                    const { data: prerequisiteAttempts, error: prereqError } = await supabase
                        .from("exam_attempts")
                        .select("id, status")
                        .eq("exam_id", prereqLesson.exam_id)
                        .eq("student_id", userId)
                        .eq("status", "submitted")

                    if (prereqError) throw prereqError

                    if (!prerequisiteAttempts || prerequisiteAttempts.length === 0) {
                        const prereqTitle = prereqLesson.title || "the previous quiz"
                        throw new Error(`You must complete ${prereqTitle} before accessing this exam.`)
                    }
                }
            }

            // 4. Fetch Sections with Questions and Options
            const { data: sections, error: sectionsError } = await supabase
                .from("sections")
                .select("*, questions(*, options(*))")
                .eq("exam_id", examId)
                .order("section_order")

            if (sectionsError) throw sectionsError

            // 5. Find or Create Attempt
            let attempt: Attempt | null = null

            const { data: existingAttempts, error: attemptsError } = await supabase
                .from("exam_attempts")
                .select("*")
                .eq("exam_id", examId)
                .eq("student_id", userId)
                .order("created_at", { ascending: false })

            if (attemptsError) throw attemptsError

            // Check if there's an in-progress attempt
            const inProgressAttempt = existingAttempts?.find(a => a.status === "in_progress")
            const submittedAttempts = existingAttempts?.filter(a => a.status === "submitted") || []



            if (inProgressAttempt) {
                attempt = inProgressAttempt
            } else {


                // Check if there are submitted attempts and NOT retaking
                if (submittedAttempts.length > 0 && retakeAttempt === 0) {
                    throw new Error("This exam has already been submitted. Please return to the test series page to retake the exam.")
                }

                const maxAttempts = (exam as any).max_attempts
                const hasAttemptsRemaining = !maxAttempts || submittedAttempts.length < maxAttempts

                if (hasAttemptsRemaining) {
                    // Get tenant_id from exam
                    const tenantId = (exam as any).tenant_id;

                    const { data: newAttempt, error: createError } = await supabase
                        .from("exam_attempts")
                        .insert({
                            tenant_id: tenantId,  // ✅ Added tenant_id
                            exam_id: examId,
                            student_id: userId,
                            status: "in_progress",
                            total_time_spent: 0
                        })
                        .select()
                        .single()

                    if (createError) throw createError
                    attempt = newAttempt
                } else {
                    throw new Error(`You have reached the maximum number of attempts (${maxAttempts}) for this exam.`)
                }
            }

            // 4. Fetch Existing Responses
            let previousResponses: Record<string, any> = {}
            if (attempt) {
                const { data: responses, error: respError } = await supabase
                    .from("responses")
                    .select("question_id, student_answer")
                    .eq("attempt_id", attempt.id)

                if (respError) throw respError

                if (responses) {
                    responses.forEach((r) => {
                        try {
                            // Try to parse if it's JSON (for arrays/MSQ), otherwise keep as is
                            const parsed = JSON.parse(r.student_answer)
                            previousResponses[r.question_id] = parsed
                        } catch {
                            previousResponses[r.question_id] = r.student_answer
                        }
                    })
                }
            }

            return {
                exam: exam as Exam,
                sections: sections as Section[],
                attempt: attempt as Attempt,
                previousResponses
            }
        },
        enabled: !!examId && !!userId && enabled,
        staleTime: 0, // Always refetch to ensure fresh data, especially for retakes
        refetchOnWindowFocus: false,
    })
}

export function useUpdateTimer() {
    const supabase = createClient()
    return useMutation({
        mutationFn: async ({ attemptId, timeSpent }: { attemptId: string, timeSpent: number }) => {
            const { error } = await supabase
                .from("exam_attempts")
                .update({ total_time_spent: timeSpent })
                .eq("id", attemptId)
            if (error) throw error
        }
    })
}

export function useSubmitExam() {
    const supabase = createClient()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            attemptId,
            examId,
            responses,
            sections, // Unused in RPC but kept for signature compatibility if needed
            totalMarks, // Unused in RPC
            tenantId, // ✅ OPTIMIZATION: Configurable tenantId
        }: {
            attemptId: string
            examId: string
            responses: Record<string, any>
            sections: Section[]
            totalMarks: number
            tenantId?: string | null
        }) => {

            // 1. Ensure all local responses are synced one last time (Optimization)
            const entries = Object.entries(responses).map(([qid, ans]) => ({
                tenant_id: tenantId,  // ✅ Used passed tenant_id
                attempt_id: attemptId,
                question_id: qid,
                student_answer: Array.isArray(ans) ? JSON.stringify(ans) : String(ans),
                updated_at: new Date().toISOString(),
            }))

            if (entries.length > 0) {
                const { error: respError } = await supabase.from("responses").upsert(entries, {
                    onConflict: "attempt_id,question_id",
                })
                if (respError) {
                    throw new Error(`Failed to sync responses: ${respError.message}`)
                }
            }

            // 2. Call the Secure RPC
            const { data: resultData, error: rpcError } = await supabase
                .rpc('submit_exam_attempt', { p_attempt_id: attemptId, p_exam_id: examId })

            if (rpcError) {
                // Handle duplicate submission gracefully
                if (rpcError.message.includes("already submitted")) {
                    toast.info("Exam was already submitted.")
                    // Fetch existing result
                    const { data: existing } = await supabase
                        .from("results")
                        .select("*")
                        .eq("attempt_id", attemptId)
                        .single()
                    return existing
                }
                throw rpcError
            }

            // If RPC returned an error object inside JSON
            if (resultData && (resultData as any).error) {
                throw new Error((resultData as any).error)
            }

            return resultData
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["test-series-details"] })
            queryClient.invalidateQueries({ queryKey: ["exam-attempts"] })
            toast.success("Exam submitted successfully!")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to submit exam.")
        }
    })
}

export function useSaveAnswer() {
    const supabase = createClient()
    return useMutation({
        mutationFn: async ({ attemptId, questionId, answer, tenantId }: { attemptId: string, questionId: string, answer: any, tenantId?: string | null }) => {
            // ✅ OPTIMIZATION: Use passed tenantId instead of fetching it
            let finalTenantId = tenantId;

            if (!finalTenantId) {
                // Fallback only if not provided (should not happen in optimized flow)
                const { data: attemptData } = await supabase
                    .from('exam_attempts')
                    .select('tenant_id')
                    .eq('id', attemptId)
                    .single();
                finalTenantId = attemptData?.tenant_id;
            }

            const { error } = await supabase.from("responses").upsert({
                tenant_id: finalTenantId,  // ✅ Added tenant_id
                attempt_id: attemptId,
                question_id: questionId,
                student_answer: Array.isArray(answer) ? JSON.stringify(answer) : String(answer),
                updated_at: new Date().toISOString(),
            }, { onConflict: "attempt_id,question_id" })
            if (error) throw error
        }
    })
}
