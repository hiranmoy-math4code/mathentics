import { createClient } from "@/lib/supabase/client"
import { ExamAccessStatus } from "@/components/ExamAccessChecker"

/**
 * Check if a student can access an exam based on scheduling and prerequisites
 * @param examId - The ID of the exam to check
 * @param userId - The ID of the student
 * @returns ExamAccessStatus object with accessibility information
 */
export async function checkExamAccess(
    examId: string,
    userId: string
): Promise<ExamAccessStatus> {
    const supabase = createClient()

    try {
        // Fetch exam details
        const { data: exam, error: examError } = await supabase
            .from("exams")
            .select("*")
            .eq("id", examId)
            .single()

        if (examError || !exam) {
            return {
                accessible: false,
                reason: undefined,
                message: "Exam not found"
            }
        }

        const examData = exam as any
        const now = new Date()

        // Check start time
        if (examData.start_time) {
            const startTime = new Date(examData.start_time)
            if (now < startTime) {
                return {
                    accessible: false,
                    reason: "upcoming",
                    message: `This exam will be available starting ${startTime.toLocaleString()}`,
                    startTime
                }
            }
        }

        // Check end time
        if (examData.end_time) {
            const endTime = new Date(examData.end_time)
            if (now > endTime) {
                return {
                    accessible: false,
                    reason: "expired",
                    message: `This exam ended on ${endTime.toLocaleString()}`,
                    endTime
                }
            }
        }

        // Check LESSON-based prerequisite (quiz lessons only)
        // 1. Find the lesson containing this exam
        const { data: currentLesson } = await supabase
            .from("lessons")
            .select("id, title, prerequisite_lesson_id, sequential_unlock_enabled, content_type, exam_id")
            .eq("exam_id", examId)
            .eq("content_type", "quiz")
            .limit(1)
            .maybeSingle()

        // If exam is not in a quiz lesson, or lesson doesn't exist, allow access
        if (!currentLesson) {
            return {
                accessible: true,
                reason: "accessible"
            }
        }

        // 2. Check if this lesson has sequential unlock enabled and a prerequisite
        // SAFEGUARD: Ignore if prerequisite is the lesson itself (prevent infinite lock)
        if (currentLesson.sequential_unlock_enabled &&
            currentLesson.prerequisite_lesson_id &&
            currentLesson.prerequisite_lesson_id !== currentLesson.id) {

            // 3. Get the prerequisite lesson and its exam
            const { data: prereqLesson } = await supabase
                .from("lessons")
                .select("id, title, exam_id")
                .eq("id", currentLesson.prerequisite_lesson_id)
                .single()

            if (prereqLesson && prereqLesson.exam_id) {
                // Safeguard: If the prerequisite points to the SAME exam, ignore it (deadlock prevention)
                if (prereqLesson.exam_id === examId) {
                    return {
                        accessible: true,
                        reason: "accessible"
                    }
                }

                // 4. Check if student has completed the prerequisite lesson's exam
                const { data: prerequisiteAttempts } = await supabase
                    .from("exam_attempts")
                    .select("id, status")
                    .eq("exam_id", prereqLesson.exam_id)
                    .eq("student_id", userId)
                    .eq("status", "submitted")

                if (!prerequisiteAttempts || prerequisiteAttempts.length === 0) {
                    return {
                        accessible: false,
                        reason: "prerequisite",
                        message: "You must complete the previous quiz first",
                        prerequisiteTitle: prereqLesson.title || "Previous Quiz"
                    }
                }
            }
        }

        // Exam is accessible
        return {
            accessible: true,
            reason: "accessible"
        }
    } catch (error) {
        console.error("❌ Error checking exam access:", error)
        // Return accessible on error to avoid blocking students
        return {
            accessible: true,
            reason: "accessible"
        }
    }
}
