import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useTenantId } from './useTenantId';

export function useEnrollmentsWithExpiry() {
    const tenantId = useTenantId();

    return useQuery({
        queryKey: ['enrollments-with-expiry', tenantId],
        queryFn: async () => {
            const supabase = createClient();

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return [];

            // Fetch enrollments with course details
            const { data: enrollments, error } = await supabase
                .from('enrollments')
                .select(`
                    *,
                    courses (
                        id,
                        title,
                        thumbnail_url,
                        price
                    )
                `)
                .eq('user_id', user.id)
                .eq('tenant_id', tenantId);

            if (error) {
                console.error('Error fetching enrollments:', error);
                return [];
            }

            // Process each enrollment to check expiry status
            const now = new Date();
            const processedEnrollments = enrollments?.map(enrollment => {
                const expiryDate = enrollment.expires_at ? new Date(enrollment.expires_at) : null;

                let daysRemaining = null;
                let isExpired = false;
                let isExpiringSoon = false;
                let urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | null = null;

                if (expiryDate) {
                    const diffTime = expiryDate.getTime() - now.getTime();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    daysRemaining = diffDays;
                    isExpired = diffDays < 0;
                    isExpiringSoon = diffDays > 0 && diffDays <= 15;

                    if (diffDays <= 1 && diffDays >= 0) urgencyLevel = 'CRITICAL';
                    else if (diffDays <= 3 && diffDays > 0) urgencyLevel = 'HIGH';
                    else if (diffDays <= 7 && diffDays > 0) urgencyLevel = 'MEDIUM';
                    else if (diffDays > 7 && diffDays <= 15) urgencyLevel = 'LOW';
                }

                return {
                    ...enrollment,
                    daysRemaining,
                    isExpired,
                    isExpiringSoon,
                    urgencyLevel,
                    hasAccess: enrollment.status === 'active' && !isExpired
                };
            }) || [];

            return processedEnrollments;
        },
        staleTime: 30000, // 30 seconds
        enabled: !!tenantId,
    });
}
