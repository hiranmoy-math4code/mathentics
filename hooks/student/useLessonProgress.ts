import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

interface MarkLessonCompleteParams {
    userId: string
    lessonId: string
    courseId: string
}

import { awardCoins } from "@/app/actions/rewardActions";

export function useMarkLessonComplete() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userId, lessonId, courseId }: MarkLessonCompleteParams) => {
            const supabase = createClient()

            // Upsert lesson progress
            const { data, error } = await supabase
                .from("lesson_progress")
                .upsert(
                    {
                        user_id: userId,
                        lesson_id: lessonId,
                        course_id: courseId,
                        completed: true,
                        completed_at: new Date().toISOString(),
                    },
                    {
                        onConflict: "user_id,lesson_id",
                    }
                )
                .select()
                .single()

            if (error) {
                throw error;
            }

            // Update last accessed lesson in enrollment
            await supabase
                .from("enrollments")
                .update({
                    last_accessed_lesson_id: lessonId,
                    last_accessed_at: new Date().toISOString(),
                })
                .eq("user_id", userId)
                .eq("course_id", courseId)

            // --- REWARD TRIGGER ---
            // Award generic lesson completion coins
            // The Server Action handles duplicates/limits
            try {
                await awardCoins(userId, 'lesson_completion', lessonId, 'Completed a lesson');
            } catch (err) {
                // Silently fail - rewards are not critical
            }
            // ----------------------

            return data
        },
        onMutate: async (variables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["student-courses", variables.userId] })
            await queryClient.cancelQueries({ queryKey: ["lesson-progress", variables.userId, variables.courseId] })

            // Snapshot previous values
            const previousCourses = queryClient.getQueryData(["student-courses", variables.userId])
            const previousProgress = queryClient.getQueryData(["lesson-progress", variables.userId, variables.courseId])

            // Optimistically update lesson progress
            queryClient.setQueryData(["lesson-progress", variables.userId, variables.courseId], (old: any) => {
                if (!old) return old
                const existing = old.find((p: any) => p.lesson_id === variables.lessonId)
                if (existing) {
                    return old.map((p: any) =>
                        p.lesson_id === variables.lessonId
                            ? { ...p, completed: true, completed_at: new Date().toISOString() }
                            : p
                    )
                } else {
                    return [...old, {
                        user_id: variables.userId,
                        lesson_id: variables.lessonId,
                        course_id: variables.courseId,
                        completed: true,
                        completed_at: new Date().toISOString()
                    }]
                }
            })

            // Optimistically update course progress
            queryClient.setQueryData(["student-courses", variables.userId], (old: any) => {
                if (!old) return old
                return old.map((course: any) => {
                    if (course.id === variables.courseId) {
                        const newCompletedLessons = course.completed_lessons + 1
                        const newProgress = course.total_lessons > 0
                            ? Math.round((newCompletedLessons / course.total_lessons) * 100)
                            : 0
                        return {
                            ...course,
                            completed_lessons: newCompletedLessons,
                            progress_percentage: newProgress
                        }
                    }
                    return course
                })
            })

            return { previousCourses, previousProgress }
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousCourses) {
                queryClient.setQueryData(["student-courses", variables.userId], context.previousCourses)
            }
            if (context?.previousProgress) {
                queryClient.setQueryData(["lesson-progress", variables.userId, variables.courseId], context.previousProgress)
            }
        },
        onSuccess: (_, variables) => {
            // Invalidate relevant queries to get accurate server data
            queryClient.invalidateQueries({ queryKey: ["student-courses", variables.userId] })
            queryClient.invalidateQueries({ queryKey: ["lesson-progress", variables.userId, variables.courseId] })
            // Refresh rewards UI
            queryClient.invalidateQueries({ queryKey: ["user-rewards", variables.userId] })
        },
    })
}

export function useMarkLessonIncomplete() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userId, lessonId, courseId }: MarkLessonCompleteParams) => {
            const supabase = createClient()

            // Update lesson progress to incomplete
            const { data, error } = await supabase
                .from("lesson_progress")
                .update({
                    completed: false,
                    completed_at: null,
                })
                .eq("user_id", userId)
                .eq("lesson_id", lessonId)
                .eq("course_id", courseId)
                .select()
                .single()

            if (error) {
                throw error;
            }

            return data
        },
        onMutate: async (variables) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["student-courses", variables.userId] })
            await queryClient.cancelQueries({ queryKey: ["lesson-progress", variables.userId, variables.courseId] })

            // Snapshot previous values
            const previousCourses = queryClient.getQueryData(["student-courses", variables.userId])
            const previousProgress = queryClient.getQueryData(["lesson-progress", variables.userId, variables.courseId])

            // Optimistically update lesson progress
            queryClient.setQueryData(["lesson-progress", variables.userId, variables.courseId], (old: any) => {
                if (!old) return old
                return old.map((p: any) =>
                    p.lesson_id === variables.lessonId
                        ? { ...p, completed: false, completed_at: null }
                        : p
                )
            })

            // Optimistically update course progress
            queryClient.setQueryData(["student-courses", variables.userId], (old: any) => {
                if (!old) return old
                return old.map((course: any) => {
                    if (course.id === variables.courseId) {
                        const newCompletedLessons = Math.max(0, course.completed_lessons - 1)
                        const newProgress = course.total_lessons > 0
                            ? Math.round((newCompletedLessons / course.total_lessons) * 100)
                            : 0
                        return {
                            ...course,
                            completed_lessons: newCompletedLessons,
                            progress_percentage: newProgress
                        }
                    }
                    return course
                })
            })

            return { previousCourses, previousProgress }
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousCourses) {
                queryClient.setQueryData(["student-courses", variables.userId], context.previousCourses)
            }
            if (context?.previousProgress) {
                queryClient.setQueryData(["lesson-progress", variables.userId, variables.courseId], context.previousProgress)
            }
        },
        onSuccess: (_, variables) => {
            // Invalidate relevant queries to get accurate server data
            queryClient.invalidateQueries({ queryKey: ["student-courses", variables.userId] })
            queryClient.invalidateQueries({ queryKey: ["lesson-progress", variables.userId, variables.courseId] })
        },
    })
}

export function useLessonProgress(userId: string | undefined, courseId: string | undefined) {
    return useQuery({
        queryKey: ["lesson-progress", userId, courseId],
        queryFn: async () => {
            if (!userId || !courseId) return []

            const supabase = createClient()

            const { data, error } = await supabase
                .from("lesson_progress")
                .select("*")
                .eq("user_id", userId)
                .eq("course_id", courseId)

            if (error) throw error

            return data || []
        },
        enabled: !!userId && !!courseId,
    })
}
