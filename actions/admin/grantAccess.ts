'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Grant course access to a student with optional expiry
 */
export async function grantCourseAccess(data: {
    userId: string;
    courseId: string;
    expiresAt?: Date | null;
    notes?: string;
}) {
    const supabase = await createClient();

    // Get admin user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'Admin access required' };
    }

    try {
        // Check if enrollment already exists
        const { data: existing } = await supabase
            .from('enrollments')
            .select('id, status, expires_at')
            .eq('user_id', data.userId)
            .eq('course_id', data.courseId)
            .single();

        let enrollment;

        if (existing) {
            // Update existing enrollment
            const { data: updated, error } = await supabase
                .from('enrollments')
                .update({
                    status: 'active',
                    expires_at: data.expiresAt || null,
                    granted_by: user.id,
                    granted_at: new Date().toISOString(),
                    grant_type: 'manual'
                })
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;
            enrollment = updated;

            // Log the modification
            await supabase.rpc('log_enrollment_action', {
                p_action: 'modified',
                p_performed_by: user.id,
                p_enrollment_id: existing.id,
                p_previous_expiry: existing.expires_at,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Access modified by admin'
            });
        } else {
            // Create new enrollment
            const { data: newEnrollment, error } = await supabase
                .from('enrollments')
                .insert({
                    user_id: data.userId,
                    course_id: data.courseId,
                    status: 'active',
                    expires_at: data.expiresAt || null,
                    granted_by: user.id,
                    granted_at: new Date().toISOString(),
                    grant_type: 'manual'
                })
                .select()
                .single();

            if (error) throw error;
            enrollment = newEnrollment;

            // Log the grant
            await supabase.rpc('log_enrollment_action', {
                p_action: 'granted',
                p_performed_by: user.id,
                p_enrollment_id: newEnrollment.id,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Access granted by admin'
            });
        }

        revalidatePath('/admin/students');
        return { success: true, data: enrollment };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Grant test series access to a student
 */
export async function grantTestSeriesAccess(data: {
    userId: string;
    testSeriesId: string;
    expiresAt?: Date | null;
    notes?: string;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return { error: 'Admin access required' };
    }

    try {
        // Check if enrollment already exists
        const { data: existing } = await supabase
            .from('test_series_enrollments')
            .select('id, expires_at')
            .eq('student_id', data.userId)
            .eq('test_series_id', data.testSeriesId)
            .single();

        let enrollment;

        if (existing) {
            // Update existing
            const { data: updated, error } = await supabase
                .from('test_series_enrollments')
                .update({
                    expires_at: data.expiresAt || null,
                    granted_by: user.id,
                    granted_at: new Date().toISOString(),
                    grant_type: 'manual'
                })
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw error;
            enrollment = updated;

            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'modified',
                p_performed_by: user.id,
                p_test_series_enrollment_id: existing.id,
                p_previous_expiry: existing.expires_at,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Test series access modified'
            });
        } else {
            // Create new
            const { data: newEnrollment, error } = await supabase
                .from('test_series_enrollments')
                .insert({
                    student_id: data.userId,
                    test_series_id: data.testSeriesId,
                    expires_at: data.expiresAt || null,
                    granted_by: user.id,
                    granted_at: new Date().toISOString(),
                    grant_type: 'manual'
                })
                .select()
                .single();

            if (error) throw error;
            enrollment = newEnrollment;

            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'granted',
                p_performed_by: user.id,
                p_test_series_enrollment_id: newEnrollment.id,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Test series access granted'
            });
        }

        revalidatePath('/admin/students');
        return { success: true, data: enrollment };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Revoke course or test series access
 */
export async function revokeAccess(data: {
    enrollmentId: string;
    type: 'course' | 'test_series';
    reason: string;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        if (data.type === 'course') {
            const { error } = await supabase
                .from('enrollments')
                .update({ status: 'refunded' }) // Using 'refunded' to indicate revoked
                .eq('id', data.enrollmentId);

            if (error) throw error;

            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'revoked',
                p_performed_by: user.id,
                p_enrollment_id: data.enrollmentId,
                p_notes: data.reason
            });
        } else {
            const { error } = await supabase
                .from('test_series_enrollments')
                .delete()
                .eq('id', data.enrollmentId);

            if (error) throw error;

            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'revoked',
                p_performed_by: user.id,
                p_test_series_enrollment_id: data.enrollmentId,
                p_notes: data.reason
            });
        }

        revalidatePath('/admin/students');
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Extend access expiry date
 */
export async function extendAccess(data: {
    enrollmentId: string;
    type: 'course' | 'test_series';
    newExpiryDate: Date;
    notes?: string;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    console.log('[extendAccess] Starting update:', {
        enrollmentId: data.enrollmentId,
        type: data.type,
        newExpiryDate: data.newExpiryDate,
        isoDate: data.newExpiryDate.toISOString()
    });

    try {
        let previousExpiry;
        let updateError;

        if (data.type === 'course') {
            // Get current enrollment
            const { data: existing, error: fetchError } = await supabase
                .from('enrollments')
                .select('expires_at, user_id')
                .eq('id', data.enrollmentId)
                .single();

            if (fetchError) {
                console.error('[extendAccess] Error fetching enrollment:', fetchError);
                throw new Error(`Failed to find enrollment: ${fetchError.message}`);
            }

            console.log('[extendAccess] Current enrollment:', existing);
            previousExpiry = existing?.expires_at;

            // Update the expiry date
            const { data: updated, error } = await supabase
                .from('enrollments')
                .update({
                    expires_at: data.newExpiryDate.toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', data.enrollmentId)
                .select();

            updateError = error;
            console.log('[extendAccess] Update result:', { updated, error });

            if (error) throw error;

            if (!updated || updated.length === 0) {
                throw new Error('No rows were updated. Enrollment may not exist.');
            }

            // Verify the update
            const { data: verified } = await supabase
                .from('enrollments')
                .select('expires_at')
                .eq('id', data.enrollmentId)
                .single();

            console.log('[extendAccess] Verified expiry after update:', verified);

            if (!verified?.expires_at) {
                throw new Error('Update succeeded but expires_at is still null');
            }

            // Log the action
            await supabase.rpc('log_enrollment_action', {
                p_action: 'extended',
                p_performed_by: user.id,
                p_enrollment_id: data.enrollmentId,
                p_previous_expiry: previousExpiry,
                p_new_expiry: data.newExpiryDate.toISOString(),
                p_notes: data.notes || 'Access period extended'
            });
        } else {
            // Test series enrollment
            const { data: existing, error: fetchError } = await supabase
                .from('test_series_enrollments')
                .select('expires_at, student_id')
                .eq('id', data.enrollmentId)
                .single();

            if (fetchError) {
                console.error('[extendAccess] Error fetching test series enrollment:', fetchError);
                throw new Error(`Failed to find test series enrollment: ${fetchError.message}`);
            }

            console.log('[extendAccess] Current test series enrollment:', existing);
            previousExpiry = existing?.expires_at;

            const { data: updated, error } = await supabase
                .from('test_series_enrollments')
                .update({
                    expires_at: data.newExpiryDate.toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('id', data.enrollmentId)
                .select();

            updateError = error;
            console.log('[extendAccess] Test series update result:', { updated, error });

            if (error) throw error;

            if (!updated || updated.length === 0) {
                throw new Error('No rows were updated. Test series enrollment may not exist.');
            }

            // Verify the update
            const { data: verified } = await supabase
                .from('test_series_enrollments')
                .select('expires_at')
                .eq('id', data.enrollmentId)
                .single();

            console.log('[extendAccess] Verified test series expiry after update:', verified);

            if (!verified?.expires_at) {
                throw new Error('Update succeeded but expires_at is still null');
            }

            // Log the action
            await supabase.rpc('log_enrollment_action', {
                p_action: 'extended',
                p_performed_by: user.id,
                p_test_series_enrollment_id: data.enrollmentId,
                p_previous_expiry: previousExpiry,
                p_new_expiry: data.newExpiryDate.toISOString(),
                p_notes: data.notes || 'Access period extended'
            });
        }

        console.log('[extendAccess] Update completed successfully');
        revalidatePath('/admin/students');
        return { success: true };
    } catch (error: any) {
        console.error('[extendAccess] Error:', error);
        return { error: error.message };
    }
}

/**
 * Get expiring subscriptions (within specified days)
 */
export async function getExpiringSubscriptions(daysAhead: number = 7) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        const { data, error } = await supabase
            .from('expiring_enrollments_view')
            .select('*')
            .lte('days_until_expiry', daysAhead)
            .order('days_until_expiry', { ascending: true });

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Get recent enrollment logs
 */
export async function getRecentAccessLogs(limit: number = 50) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        const { data, error } = await supabase
            .from('enrollment_logs')
            .select(`
        *,
        performed_by_profile:profiles!enrollment_logs_performed_by_fkey (
          id,
          full_name,
          email
        )
      `)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        return { error: error.message };
    }
}
