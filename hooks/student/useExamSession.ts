import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useTenantId } from "@/hooks/useTenantId"

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
export type Exam = { id: string; title: string; duration_minutes: number; total_marks?: number; allow_pause?: boolean }
export type Attempt = {
    id: string;
    status: string;
    exam_id: string;
    student_id: string;
    total_time_spent?: number;
    exam_deadline?: string;
    elapsed_time_seconds?: number;
    last_activity_at?: string;
    is_paused?: boolean;
}

export function useExamSession(examId: string, userId: string | null, retakeAttempt: number = 0, enabled: boolean = true) {
    const supabase = createClient()
    const tenantId = useTenantId()

    return useQuery({
        queryKey: ["exam-session", examId, userId, retakeAttempt],
        queryFn: async () => {
            if (!userId) throw new Error("User not logged in")
            if (!tenantId) throw new Error("Tenant context not found")

            // ============================================================
            // STEP 1: PARALLEL FETCH (Exam, Prereqs, Sections, Existing Attempts)
            // ============================================================
            const [examResult, prereqCheckResult, sectionsResult, attemptsResult] = await Promise.all([
                // 1. Exam Details
                supabase
                    .from("exams")
                    .select("*")
                    .eq("id", examId)
                    .eq("tenant_id", tenantId)
                    .single(),

                // 2. Prerequisite Check (Lesson-based)
                (async () => {
                    const { data: currentLesson } = await supabase
                        .from("lessons")
                        .select("id, title, prerequisite_lesson_id, sequential_unlock_enabled")
                        .eq("exam_id", examId)
                        .eq("content_type", "quiz")
                        .single()

                    if (currentLesson?.sequential_unlock_enabled && currentLesson.prerequisite_lesson_id) {
                        const { data: prereqLesson } = await supabase
                            .from("lessons")
                            .select("id, title, exam_id")
                            .eq("id", currentLesson.prerequisite_lesson_id)
                            .single()

                        if (prereqLesson?.exam_id) {
                            const { data: validAttempt } = await supabase
                                .from("exam_attempts")
                                .select("id")
                                .eq("exam_id", prereqLesson.exam_id)
                                .eq("student_id", userId)
                                .eq("status", "submitted")
                                .limit(1)
                                .single()

                            if (!validAttempt) {
                                return { blocked: true, prereqTitle: prereqLesson.title || "the previous quiz" }
                            }
                        }
                    }
                    return { blocked: false }
                })(),

                // 3. Sections & Questions
                supabase
                    .from("sections")
                    .select("*, questions(*, options(*))")
                    .eq("exam_id", examId)
                    .order("section_order")
                    .order("question_order", { referencedTable: "questions" }),

                // 4. Existing Attempts
                supabase
                    .from("exam_attempts")
                    .select("*")
                    .eq("exam_id", examId)
                    .eq("student_id", userId)
                    .eq("tenant_id", tenantId)
                    .order("created_at", { ascending: false })
            ])

            // Handle Fetch Errors
            if (examResult.error) throw examResult.error
            if (!examResult.data) throw new Error("Exam not found")
            if (sectionsResult.error) throw sectionsResult.error
            if (attemptsResult.error) throw attemptsResult.error

            // Check Prerequisite Blocking
            if (prereqCheckResult.blocked) {
                throw new Error(`You must complete ${prereqCheckResult.prereqTitle} before accessing this exam.`)
            }

            const exam = examResult.data
            const sections = sectionsResult.data || []
            const existingAttempts = attemptsResult.data || []

            // ============================================================
            // STEP 2: VALIDATE EXAM AVAILABILITY
            // ============================================================
            const now = new Date()
            if (exam.start_time && now < new Date(exam.start_time)) {
                throw new Error(`This exam is not yet available. It will start on ${new Date(exam.start_time).toLocaleString()}.`)
            }
            if (exam.end_time && now > new Date(exam.end_time)) {
                throw new Error(`This exam has ended. It was available until ${new Date(exam.end_time).toLocaleString()}.`)
            }

            // ============================================================
            // STEP 3: ATTEMPT HANDLING (Find or Create)
            // ============================================================
            let attempt: Attempt | null = null
            const inProgressAttempt = existingAttempts.find(a => a.status === "in_progress")
            const submittedAttempts = existingAttempts.filter(a => a.status === "submitted")

            if (inProgressAttempt) {
                attempt = inProgressAttempt
            } else {
                // Validate Max Attempts
                if (submittedAttempts.length > 0 && retakeAttempt === 0) {
                    throw new Error("This exam has already been submitted. Please return to the test series page to retake the exam.")
                }

                const maxAttempts = (exam as any).max_attempts
                if (maxAttempts && submittedAttempts.length >= maxAttempts) {
                    throw new Error(`You have reached the maximum number of attempts (${maxAttempts}) for this exam.`)
                }

                // Create New Attempt
                const { data: newAttempt, error: createError } = await supabase
                    .from("exam_attempts")
                    .insert({
                        tenant_id: tenantId,
                        exam_id: examId,
                        student_id: userId,
                        status: "in_progress",
                        total_time_spent: 0
                    })
                    .select()
                    .single()

                if (createError) throw createError
                attempt = newAttempt
            }

            // ============================================================
            // STEP 4: FETCH RESPONSES (Only if attempt exists)
            // ============================================================
            let previousResponses: Record<string, any> = {}
            if (attempt) {
                const { data: responses, error: respError } = await supabase
                    .from("responses")
                    .select("question_id, student_answer")
                    .eq("attempt_id", attempt.id)
                    .eq("tenant_id", tenantId)

                if (respError) throw respError

                responses?.forEach((r) => {
                    try {
                        previousResponses[r.question_id] = JSON.parse(r.student_answer)
                    } catch {
                        previousResponses[r.question_id] = r.student_answer
                    }
                })
            }

            // ============================================================
            // STEP 5: SHUFFLE LOGIC
            // ============================================================
            const shuffledSections = (sections as Section[]).map(section => {
                const sectionData = section as any;
                if (sectionData.shuffle_questions === true && section.questions?.length > 0) {
                    const shuffledQuestions = [...section.questions];
                    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
                    }
                    return { ...section, questions: shuffledQuestions };
                }
                return section;
            });

            return {
                exam: exam as Exam,
                sections: shuffledSections as Section[],
                attempt: attempt as Attempt,
                previousResponses
            }
        },
        enabled: !!examId && !!userId && enabled,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })
}

export function useUpdateTimer() {
    const supabase = createClient()
    return useMutation({
        mutationFn: async ({ attemptId, timeSpent, isPaused, elapsedSeconds, lastActivityAt }: { attemptId: string, timeSpent: number, isPaused?: boolean, elapsedSeconds?: number, lastActivityAt?: string }) => {
            const updates: any = { total_time_spent: timeSpent }
            if (isPaused !== undefined) updates.is_paused = isPaused
            if (elapsedSeconds !== undefined) updates.elapsed_time_seconds = elapsedSeconds
            if (lastActivityAt !== undefined) updates.last_activity_at = lastActivityAt

            const { error } = await supabase
                .from("exam_attempts")
                .update(updates)
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
