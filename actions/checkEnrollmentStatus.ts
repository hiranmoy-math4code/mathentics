// ============================================================================
// ENROLLMENT STATUS & EXPIRY CHECK
// Server actions to check enrollment status and expiry
// ============================================================================

'use server';



import { createTenantClient } from '@/lib/supabase/server';

export interface EnrollmentStatus {
    hasAccess: boolean;
    status: 'active' | 'expired' | 'none';
    expiresAt: string | null;
    daysRemaining: number | null;
    isExpiringSoon: boolean;
    isExpired: boolean;
}

/**
 * Check if student has active course access
 */
export async function checkCourseAccess(courseId: string): Promise<EnrollmentStatus> {
    let supabase;
    try {
        supabase = await createTenantClient(); // Multi-tenant aware
    } catch (e) {
        console.warn('⚠️ Could not create tenant client in checkCourseAccess', e);
        return {
            hasAccess: false,
            status: 'none',
            expiresAt: null,
            daysRemaining: null,
            isExpiringSoon: false,
            isExpired: false
        };
    }

    let user;
    try {
        const { data } = await supabase.auth.getUser();
        user = data.user;
    } catch (e) {
        console.error('Error getting user in checkCourseAccess:', e);
        return {
            hasAccess: false,
            status: 'none',
            expiresAt: null,
            daysRemaining: null,
            isExpiringSoon: false,
            isExpired: false
        };
    }

    if (!user) {
        return {
            hasAccess: false,
            status: 'none',
            expiresAt: null,
            daysRemaining: null,
            isExpiringSoon: false,
            isExpired: false
        };
    }

    try {
        // Get enrollment with expiry info
        const { data: enrollment } = await supabase
            .from('enrollments')
            .select('status, expires_at')
            .eq('user_id', user.id)
            .eq('course_id', courseId)
            .single();

        if (!enrollment) {
            return {
                hasAccess: false,
                status: 'none',
                expiresAt: null,
                daysRemaining: null,
                isExpiringSoon: false,
                isExpired: false
            };
        }

        const now = new Date();
        const expiryDate = enrollment.expires_at ? new Date(enrollment.expires_at) : null;

        let daysRemaining = null;
        let isExpired = false;
        let isExpiringSoon = false;
        let hasAccess = false;

        if (expiryDate) {
            const diffTime = expiryDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            daysRemaining = diffDays;
            isExpired = diffDays < 0;
            isExpiringSoon = diffDays > 0 && diffDays <= 7;
            hasAccess = enrollment.status === 'active' && !isExpired;
        } else {
            // Lifetime access
            hasAccess = enrollment.status === 'active';
        }

        return {
            hasAccess,
            status: isExpired ? 'expired' : enrollment.status as any,
            expiresAt: enrollment.expires_at,
            daysRemaining,
            isExpiringSoon,
            isExpired
        };
    } catch (error) {
        console.error('Error checking course access:', error);
        return {
            hasAccess: false,
            status: 'none',
            expiresAt: null,
            daysRemaining: null,
            isExpiringSoon: false,
            isExpired: false
        };
    }
}
