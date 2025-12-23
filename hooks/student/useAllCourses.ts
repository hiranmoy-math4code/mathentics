import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

interface Course {
    id: string
    title: string
    description: string
    thumbnail_url: string | null
    price: number
    is_published: boolean
    created_at: string
    instructor_name: string
    is_enrolled: boolean
    total_lessons: number
}

export function useAllCourses(userId: string | undefined) {
    return useQuery({
        queryKey: ["all-courses", userId],
        queryFn: async () => {
            const supabase = createClient()

            // Call Optimized RPC
            const { data, error } = await supabase
                .rpc('get_published_courses_with_meta', {
                    target_user_id: userId || null,
                    p_limit: 50,
                    p_offset: 0
                });

            if (error) {
                throw error;
            }

            // Filter to show only courses (not test series)
            const courses = (data || []).filter((course: any) => course.course_type === 'course');

            return courses as Course[];
        },
        enabled: userId !== undefined,
    })
}
