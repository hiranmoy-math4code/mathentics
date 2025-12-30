'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { getTenantIdFromHeaders } from '@/lib/tenant';

/**
 * Grant course access to a student with optional expiry
 */
export async function grantCourseAccess(data: {
    userId: string;
    courseId: string;
    expiresAt?: Date | null;
    notes?: string;
}) {
    console.log(`🎁 [grantCourseAccess] Starting for user: ${data.userId}, course: ${data.courseId}`);
    try {
        // Use createClient for auth check (Cloudflare compatible)
        const { createClient } = await import('@/lib/supabase/server');
        const authClient = await createClient();
        const { data: { user } } = await authClient.auth.getUser();
        if (!user) return { error: 'Unauthorized' };

        const supabase = createAdminClient();
        const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

        if (!tenantId) {
            console.error('❌ [grantCourseAccess] Tenant ID not found');
            return { error: 'Tenant ID not configured' };
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
            console.warn(`⚠️ [grantCourseAccess] Unauthorized role: ${profile?.role}`);
            return { error: 'Admin access required' };
        }

        // Check if enrollment already exists
        const { data: existing } = await supabase
            .from('enrollments')
            .select('id, status, expires_at')
            .eq('user_id', data.userId)
            .eq('course_id', data.courseId)
            .eq('tenant_id', tenantId)
            .maybeSingle();

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
                    tenant_id: tenantId,
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
        console.error('❌ [grantCourseAccess] Error:', error);
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
    console.log(`🏆 [grantTestSeriesAccess] Starting for user: ${data.userId}, series: ${data.testSeriesId}`);
    try {
        const { createClient } = await import('@/lib/supabase/server');
        const authClient = await createClient();
        const { data: { user } } = await authClient.auth.getUser();
        if (!user) return { error: 'Unauthorized' };

        const supabase = createAdminClient();
        const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

        if (!tenantId) {
            console.error('❌ [grantTestSeriesAccess] Tenant ID not found');
            return { error: 'Tenant ID not configured' };
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
            return { error: 'Admin access required' };
        }

        // Check if enrollment already exists
        const { data: existing } = await supabase
            .from('enrollments')
            .select('id, expires_at')
            .eq('user_id', data.userId)
            .eq('course_id', data.testSeriesId)
            .eq('tenant_id', tenantId)
            .maybeSingle();

        let enrollment;

        if (existing) {
            // Update existing
            const { data: updated, error } = await supabase
                .from('enrollments')
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
                p_enrollment_id: existing.id,
                p_previous_expiry: existing.expires_at,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Test series access modified'
            });
        } else {
            // Create new
            const { data: newEnrollment, error } = await supabase
                .from('enrollments')
                .insert({
                    user_id: data.userId,
                    course_id: data.testSeriesId,
                    tenant_id: tenantId,
                    expires_at: data.expiresAt || null,
                    granted_by: user.id,
                    granted_at: new Date().toISOString(),
                    grant_type: 'manual',
                    status: 'active'
                })
                .select()
                .single();

            if (error) throw error;
            enrollment = newEnrollment;

            // Log
            await supabase.rpc('log_enrollment_action', {
                p_action: 'granted',
                p_performed_by: user.id,
                p_enrollment_id: newEnrollment.id,
                p_new_expiry: data.expiresAt || null,
                p_notes: data.notes || 'Test series access granted'
            });
        }

        revalidatePath('/admin/students');
        return { success: true, data: enrollment };
    } catch (error: any) {
        console.error('❌ [grantTestSeriesAccess] Error:', error);
        return { error: error.message };
    }
}

/**
 * Revoke course or test series access
 */
export async function revokeAccess(data: {
    enrollmentId: string;
    type: 'course';
    reason: string;
}) {
    console.log(`🚫 [revokeAccess] Starting for enrollment: ${data.enrollmentId}`);
    try {
        const { createClient } = await import('@/lib/supabase/server');
        const authClient = await createClient();
        const { data: { user } } = await authClient.auth.getUser();
        if (!user) return { error: 'Unauthorized' };

        const supabase = createAdminClient();
        const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

        if (!tenantId) {
            return { error: 'Tenant ID not configured' };
        }

        const { error } = await supabase
            .from('enrollments')
            .update({ status: 'refunded' }) // Using 'refunded' to indicate revoked
            .eq('id', data.enrollmentId)
            .eq('tenant_id', tenantId);

        if (error) throw error;

        // Log
        await supabase.rpc('log_enrollment_action', {
            p_action: 'revoked',
            p_performed_by: user.id,
            p_enrollment_id: data.enrollmentId,
            p_notes: data.reason
        });

        revalidatePath('/admin/students');
        return { success: true };
    } catch (error: any) {
        console.error('❌ [revokeAccess] Error:', error);
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
    console.log(`⏳ [extendAccess] Starting update:`, {
        enrollmentId: data.enrollmentId,
        type: data.type,
        newExpiryDate: data.newExpiryDate,
        isoDate: data.newExpiryDate instanceof Date ? data.newExpiryDate.toISOString() : 'Invalid Date'
    });

    try {
        const { createClient } = await import('@/lib/supabase/server');
        const authClient = await createClient();
        const { data: { user } } = await authClient.auth.getUser();
        if (!user) return { error: 'Unauthorized' };

        const supabase = createAdminClient();
        const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

        if (!tenantId) {
            return { error: 'Tenant ID not configured' };
        }

        // Get current enrollment
        const { data: existing, error: fetchError } = await supabase
            .from('enrollments')
            .select('expires_at, user_id')
            .eq('id', data.enrollmentId)
            .eq('tenant_id', tenantId)
            .single();

        if (fetchError) {
            console.error('[extendAccess] Error fetching enrollment:', fetchError);
            throw new Error(`Failed to find enrollment: ${fetchError.message}`);
        }

        console.log('[extendAccess] Current enrollment:', existing);
        const previousExpiry = existing?.expires_at;

        // Update the expiry date
        const { data: updated, error } = await supabase
            .from('enrollments')
            .update({
                expires_at: data.newExpiryDate.toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', data.enrollmentId)
            .eq('tenant_id', tenantId)
            .select();

        if (error) throw error;

        if (!updated || updated.length === 0) {
            throw new Error('No rows were updated. Enrollment may not exist.');
        }

        // Verify the update
        const { data: verified } = await supabase
            .from('enrollments')
            .select('expires_at')
            .eq('id', data.enrollmentId)
            .eq('tenant_id', tenantId)
            .single();

        console.log('[extendAccess] Verified expiry after update:', verified);

        // Log the action
        await supabase.rpc('log_enrollment_action', {
            p_action: 'extended',
            p_performed_by: user.id,
            p_enrollment_id: data.enrollmentId,
            p_previous_expiry: previousExpiry,
            p_new_expiry: data.newExpiryDate.toISOString(),
            p_notes: data.notes || 'Access period extended'
        });

        console.log('[extendAccess] Update completed successfully');
        revalidatePath('/admin/students');
        return { success: true };
    } catch (error: any) {
        console.error('❌ [extendAccess] Error:', error);
        return { error: error.message };
    }
}

/**
 * Get expiring subscriptions (within specified days)
 */
export async function getExpiringSubscriptions(daysAhead: number = 7) {
    try {
        const { createClient } = await import('@/lib/supabase/server');
        const authClient = await createClient();
        const { data: { user } } = await authClient.auth.getUser();
        if (!user) return { error: 'Unauthorized' };

        const supabase = createAdminClient();
        const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

        if (!tenantId) {
            return { error: 'Tenant ID not configured' };
        }

        const { data, error } = await supabase
            .from('expiring_enrollments_view')
            .select('*')
            .eq('tenant_id', tenantId)
            .lte('days_until_expiry', daysAhead)
            .order('days_until_expiry', { ascending: true });

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        console.error('❌ [getExpiringSubscriptions] Error:', error);
        return { error: error.message };
    }
}

/**
 * Get recent enrollment logs
 */
export async function getRecentAccessLogs(limit: number = 50) {
    try {
        const { createClient } = await import('@/lib/supabase/server');
        const authClient = await createClient();
        const { data: { user } } = await authClient.auth.getUser();
        if (!user) return { error: 'Unauthorized' };

        const supabase = createAdminClient();
        const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

        if (!tenantId) {
            return { error: 'Tenant ID not configured' };
        }

        const { data, error } = await supabase
            .from('enrollment_logs')
            .select(`
                *,
                performed_by_profile:profiles!enrollment_logs_performed_by_fkey (
                    id,
                    full_name,
                    email
                ),
                enrollments!inner (
                    id,
                    tenant_id
                )
            `)
            .eq('enrollments.tenant_id', tenantId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        console.error('❌ [getRecentAccessLogs] Error:', error);
        return { error: error.message };
    }
}
