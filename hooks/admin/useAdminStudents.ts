import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentsWithEnrollments, addStudent, resetStudentSessions } from '@/actions/admin/students';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export function useAdminStudents(filters?: { status?: 'all' | 'active' | 'expired'; expiringWithinDays?: number }) {
    return useQuery({
        queryKey: ['admin-students', filters],
        queryFn: async () => {
            const res = await getStudentsWithEnrollments(filters);
            if (res.error) throw new Error(res.error);
            return res.data || [];
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        gcTime: 1000 * 60 * 30,    // 30 minutes
    });
}

export function useStudentDetails(userId: string) {
    return useQuery({
        queryKey: ['admin-student-details', userId],
        queryFn: async () => {
            if (!userId) return null;

            const supabase = createClient();

            // Get student profile
            const { data: student, error: studentError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (studentError) throw new Error(`Failed to fetch student: ${studentError.message}`);
            if (!student) throw new Error('Student not found');

            // Get enrollments
            const { data: enrollments } = await supabase
                .from('enrollments')
                .select(`
                    *,
                    courses (
                        id,
                        title,
                        thumbnail_url,
                        price,
                        course_type
                    ),
                    granted_by_profile:profiles!enrollments_granted_by_fkey (
                        id,
                        full_name
                    )
                `)
                .eq('user_id', userId);

            // Get exam attempts
            const { data: rawAttempts } = await supabase
                .from('exam_attempts')
                .select(`
                    *,
                    exams (id, title, total_marks),
                    results (percentage, obtained_marks)
                `)
                .eq('student_id', userId)
                .order('created_at', { ascending: false });

            const attempts = rawAttempts?.map((attempt: any) => ({
                ...attempt,
                exam_title: attempt.exams?.title,
                total_marks: attempt.exams?.total_marks,
                percentage: attempt.results?.percentage,
                obtained_marks: attempt.results?.obtained_marks
            })) || [];

            // Get activity logs
            const { data: logs } = await supabase
                .from('enrollment_logs')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(50);

            // Calculate stats
            const stats = {
                totalEnrollments: enrollments?.length || 0,
                activeEnrollments: enrollments?.filter((e: any) => e.status === 'active').length || 0,
                totalAttempts: attempts.length,
                averageScore: attempts.length > 0
                    ? Math.round(attempts.reduce((sum: number, a: any) => sum + (a.percentage || 0), 0) / attempts.length)
                    : 0,
                avgPercentage: attempts.length > 0
                    ? Math.round(attempts.reduce((sum: number, a: any) => sum + (a.percentage || 0), 0) / attempts.length)
                    : 0,
                activeSessions: 0 // Will be populated from device_sessions if needed
            };

            return {
                student,
                enrollments: enrollments || [],
                attempts,
                logs: logs || [],
                stats
            };
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function useAddStudent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addStudent,
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message || 'Student added successfully');
                queryClient.invalidateQueries({ queryKey: ['admin-students'] });
            } else if (res.error) {
                toast.error(res.error);
            }
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to add student');
        }
    });
}

export function useResetSessions() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: resetStudentSessions,
        onSuccess: (res, userId) => {
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ['admin-student-details', userId] });
            } else if (res.error) {
                toast.error(res.error);
            }
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to reset sessions');
        }
    });
}
