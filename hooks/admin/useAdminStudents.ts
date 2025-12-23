import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudentsWithEnrollments, getStudentDetails, addStudent, resetStudentSessions } from '@/actions/admin/students';
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
            const res = await getStudentDetails(userId);
            if (res.error) throw new Error(res.error);
            return res.data;
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
