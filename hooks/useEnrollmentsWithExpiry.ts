import { useQuery } from '@tanstack/react-query';
import { getUserEnrollmentsWithExpiry } from '@/actions/checkEnrollmentStatus';

export function useEnrollmentsWithExpiry() {
    return useQuery({
        queryKey: ['enrollments-with-expiry'],
        queryFn: async () => {
            const result = await getUserEnrollmentsWithExpiry();
            return result.enrollments;
        },
        staleTime: 30000, // 30 seconds
    });
}
