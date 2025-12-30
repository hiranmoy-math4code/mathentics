import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { getTenantId } from "@/lib/tenant"

interface MarkLessonCompleteParams {
    userId: string
    lessonId: string
    courseId: string
}


export function useMarkLessonComplete() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userId, lessonId, courseId }: MarkLessonCompleteParams) => {
            const supabase = createClient()
            const tenantId = getTenantId(); // ✅ Get from environment (no DB query!)

            // Upsert lesson progress
            // ✅ This will trigger automatic progress update via database trigger!
            const { data, error } = await supabase
                .from("lesson_progress")
                .upsert(
                    {
                        user_id: userId,
                        lesson_id: lessonId,
                        course_id: courseId,
                        tenant_id: tenantId,  // ✅ Domain-based tenant
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
                console.error("❌ Mark Complete Error:", error);
                throw error;
            }

            // ✅ NO NEED for manual enrollment update - trigger handles it!
            // ✅ NO NEED for manual reward - trigger handles it!
            // ✅ NO NEED for manual mission update - trigger handles it!

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
            const tenantId = getTenantId(); // ✅ Get from environment (no DB query!)

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
                .eq("tenant_id", tenantId)  // ✅ Domain-based tenant
                .select()
                .single()

            if (error) {
                console.error("❌ Mark Incomplete Error:", error);
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
