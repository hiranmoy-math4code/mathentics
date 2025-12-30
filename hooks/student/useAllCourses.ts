
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { getTenantId } from "@/lib/tenant";

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
        queryKey: ["all-courses", userId, getTenantId()],
        queryFn: async () => {
            const supabase = createClient();
            const tenantId = getTenantId(); // ✅ Get from environment (no DB query!)

            console.log('✅ Using tenant ID for courses:', tenantId);

            // Fetch courses with tenant filtering
            const { data, error } = await supabase
                .from('courses')
                .select(`
id,
    title,
    description,
    thumbnail_url,
    price,
    course_type,
    is_published,
    created_at,
    creator_id,
    profiles: creator_id(full_name)
        `)
                .eq('tenant_id', tenantId)
                .eq('is_published', true)
                .eq('course_type', 'course')
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) {
                console.error('Error fetching courses:', error);
                throw error;
            }

            // Check enrollment status if user is logged in
            let enrolledCourseIds = new Set<string>();
            if (userId) {
                const { data: enrollments } = await supabase
                    .from('enrollments')
                    .select('course_id')
                    .eq('user_id', userId)
                    .eq('tenant_id', tenantId)
                    .eq('status', 'active');

                enrolledCourseIds = new Set(enrollments?.map(e => e.course_id) || []);
            }

            // Format response
            const courses = (data || []).map((course: any) => ({
                id: course.id,
                title: course.title,
                description: course.description,
                thumbnail_url: course.thumbnail_url,
                price: course.price,
                is_published: course.is_published,
                created_at: course.created_at,
                instructor_name: course.profiles?.full_name || 'Admin',
                is_enrolled: enrolledCourseIds.has(course.id),
                total_lessons: 0, // Will be calculated separately if needed
                course_type: course.course_type
            }));

            return courses as Course[];
        },
        // ✅ Always enabled - works for both authenticated and unauthenticated users
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
