'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Add a new student manually (admin only)
 * Returns student info if already exists, or creates an invitation
 */
export async function addStudent(data: {
    email: string;
    fullName: string;
    sendInvite?: boolean;
}) {
    const supabase = await createClient();

    // Check admin permission
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
        // Check if student already exists
        const { data: existing } = await supabase
            .from('profiles')
            .select('id, email, full_name')
            .eq('email', data.email)
            .single();

        if (existing) {
            return {
                success: true,
                data: existing,
                message: 'Student already exists in the system'
            };
        }

        // For new students, we can't create profiles directly due to RLS
        // Instead, return success and let them sign up normally
        // You can implement email invitation here if needed

        // TODO: Send invite email via your email service
        if (data.sendInvite) {
            // Send email invitation here
            console.log(`Sending invite to ${data.email}`);
        }

        revalidatePath('/admin/students');
        return {
            success: true,
            data: { email: data.email, full_name: data.fullName },
            message: 'Invitation ready. Student will be added when they sign up.'
        };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Search students by name or email
 */
export async function searchStudents(query: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, email, full_name, avatar_url, created_at')
            .eq('role', 'student')
            .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
            .order('full_name', { ascending: true })
            .limit(20);

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Get all students with their enrollments and expiry info
 */
export async function getStudentsWithEnrollments(filters?: {
    status?: 'all' | 'active' | 'expired';
    expiringWithinDays?: number;
}) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        // Get all students
        const { data: students, error: studentsError } = await supabase
            .from('profiles')
            .select(`
        id,
        email,
        full_name,
        avatar_url,
        created_at
      `)
            .eq('role', 'student')
            .order('created_at', { ascending: false });

        if (studentsError) throw studentsError;

        // Get enrollments for each student
        const { data: enrollments, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select(`
        id,
        user_id,
        course_id,
        status,
        expires_at,
        granted_by,
        grant_type,
        courses (
          id,
          title,
          thumbnail_url
        )
      `);

        if (enrollmentsError) throw enrollmentsError;

        // Get test series enrollments
        const { data: testSeriesEnrollments } = await supabase
            .from('test_series_enrollments')
            .select(`
        id,
        student_id,
        test_series_id,
        expires_at,
        granted_by,
        grant_type,
        test_series (
          id,
          title
        )
      `);

        // Combine data
        const studentsWithEnrollments = students?.map(student => {
            const courseEnrollments = enrollments?.filter(e => e.user_id === student.id) || [];
            const seriesEnrollments = testSeriesEnrollments?.filter(e => e.student_id === student.id) || [];

            // Check expiry status
            const now = new Date();
            const expiringSoon = [...courseEnrollments, ...seriesEnrollments].filter(e => {
                if (!e.expires_at) return false;
                const expiryDate = new Date(e.expires_at);
                const daysUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
                return daysUntilExpiry > 0 && daysUntilExpiry <= (filters?.expiringWithinDays || 7);
            });

            return {
                ...student,
                enrollments: courseEnrollments,
                testSeriesEnrollments: seriesEnrollments,
                totalEnrollments: courseEnrollments.length + seriesEnrollments.length,
                expiringSoonCount: expiringSoon.length
            };
        });

        // Apply filters
        let filtered = studentsWithEnrollments;
        if (filters?.status === 'active') {
            filtered = filtered?.filter(s => s.totalEnrollments > 0);
        } else if (filters?.status === 'expired') {
            filtered = filtered?.filter(s => {
                const hasExpired = [...(s.enrollments || []), ...(s.testSeriesEnrollments || [])].some(e => {
                    if (!e.expires_at) return false;
                    return new Date(e.expires_at) < new Date();
                });
                return hasExpired;
            });
        }

        return { success: true, data: filtered };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Get detailed info for a single student
 */
export async function getStudentDetails(userId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    try {
        // Get student profile
        const { data: student, error: studentError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (studentError) throw studentError;

        // Get enrollments
        const { data: enrollments } = await supabase
            .from('enrollments')
            .select(`
        *,
        courses (
          id,
          title,
          thumbnail_url,
          price
        ),
        granted_by_profile:profiles!enrollments_granted_by_fkey (
          id,
          full_name
        )
      `)
            .eq('user_id', userId);

        // Get test series enrollments
        const { data: testSeriesEnrollments } = await supabase
            .from('test_series_enrollments')
            .select(`
        *,
        test_series (
          id,
          title,
          price
        ),
        granted_by_profile:profiles!test_series_enrollments_granted_by_fkey (
          id,
          full_name
        )
      `)
            .eq('student_id', userId);

        // Get enrollment logs
        const { data: logs } = await supabase
            .from('enrollment_logs')
            .select(`
        *,
        performed_by_profile:profiles!enrollment_logs_performed_by_fkey (
          id,
          full_name
        )
      `)
            .or(`enrollment_id.in.(${enrollments?.map(e => e.id).join(',')}),test_series_enrollment_id.in.(${testSeriesEnrollments?.map(e => e.id).join(',')})`)
            .order('created_at', { ascending: false })
            .limit(50);

        return {
            success: true,
            data: {
                student,
                enrollments,
                testSeriesEnrollments,
                logs
            }
        };
    } catch (error: any) {
        return { error: error.message };
    }
}
