'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
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
        // Check if student already exists in profiles
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

        // Send invitation email using Supabase Admin
        if (data.sendInvite) {
            const adminClient = createAdminClient();

            // Invite user via Supabase Auth
            const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(
                data.email,
                {
                    data: {
                        full_name: data.fullName,
                        role: 'student'
                    },
                    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
                }
            );

            if (inviteError) {
                console.error('Invitation error:', inviteError);
                throw new Error(`Failed to send invitation: ${inviteError.message}`);
            }

            console.log(`✅ Invitation sent to ${data.email}`, inviteData);

            // Create profile entry for the invited user
            if (inviteData.user) {
                const { error: profileError } = await adminClient
                    .from('profiles')
                    .insert({
                        id: inviteData.user.id,
                        email: data.email,
                        full_name: data.fullName,
                        role: 'student'
                    });

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    // Don't fail the whole operation if profile creation fails
                    // The profile will be created on first login via callback
                }
            }

            revalidatePath('/admin/students');
            return {
                success: true,
                data: { email: data.email, full_name: data.fullName },
                message: 'Invitation sent successfully! Student will receive an email to join.'
            };
        }

        // If not sending invite, just return success
        revalidatePath('/admin/students');
        return {
            success: true,
            data: { email: data.email, full_name: data.fullName },
            message: 'Student information saved. They can sign up normally.'
        };
    } catch (error: any) {
        console.error('Add student error:', error);
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



        // Combine data
        const studentsWithEnrollments = students?.map(student => {
            const courseEnrollments = enrollments?.filter(e => e.user_id === student.id) || [];

            // Check expiry status
            const now = new Date();
            const expiringSoon = courseEnrollments.filter(e => {
                if (!e.expires_at) return false;
                const expiryDate = new Date(e.expires_at);
                const daysUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
                return daysUntilExpiry > 0 && daysUntilExpiry <= (filters?.expiringWithinDays || 7);
            });

            return {
                ...student,
                enrollments: courseEnrollments,
                totalEnrollments: courseEnrollments.length,
                expiringSoonCount: expiringSoon.length
            };
        });

        // Apply filters
        let filtered = studentsWithEnrollments;
        if (filters?.status === 'active') {
            filtered = filtered?.filter(s => s.totalEnrollments > 0);
        } else if (filters?.status === 'expired') {
            filtered = filtered?.filter(s => {
                const hasExpired = (s.enrollments || []).some(e => {
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
 * Get exam attempts for a specific student
 */
export async function getStudentAttempts(userId: string) {
    const supabase = createAdminClient();

    try {
        const { data: rawData, error } = await supabase
            .from('exam_attempts')
            .select(`
                *,
                exams (
                    id,
                    title,
                    total_marks
                ),
                results (*)
            `)
            .eq('student_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Flatten results
        const data = rawData?.map(att => ({
            ...att,
            results: Array.isArray(att.results) ? att.results[0] : att.results
        })) || [];

        return { success: true, data };
    } catch (error: any) {
        return { error: error.message };
    }
}

/**
 * Get detailed info for a single student with stats
 */
export async function getStudentDetails(userId: string) {
    try {
        const supabase = createAdminClient();

        // Get student profile
        const { data: student, error: studentError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (studentError) {
            console.error('Student fetch error:', studentError);
            throw new Error(`Failed to fetch student profile: ${studentError.message}`);
        }

        if (!student) {
            return { error: 'Student not found' };
        }

        // Get active sessions count
        // Note: Accessing auth schema may require special permissions
        let activeSessions = 0;
        try {
            const { count, error: sessionsError } = await supabase
                .schema('auth')
                .from('sessions')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            if (sessionsError) {
                console.error('Session count error:', sessionsError);
            } else {
                activeSessions = count || 0;
            }
        } catch (err) {
            console.error('Failed to fetch session count:', err);
            // Fallback: activeSessions remains 0
        }

        // Get enrollments
        const { data: enrollments, error: enrollmentsError } = await supabase
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

        if (enrollmentsError) {
            console.error('Enrollments fetch error:', enrollmentsError);
            // Don't throw, just log and continue with empty array
        }



        const { data: rawAttempts, error: attemptsError } = await supabase
            .from('exam_attempts')
            .select(`
                *,
                exams (id, title, total_marks),
                results (percentage, obtained_marks)
            `)
            .eq('student_id', userId)
            .order('created_at', { ascending: false });

        if (attemptsError) {
            console.error('Exam attempts fetch error:', attemptsError);
            // Don't throw, just log and continue with empty array
        }

        // Transform attempts to handle singular results object
        const attempts = rawAttempts?.map(att => ({
            ...att,
            results: Array.isArray(att.results) ? att.results[0] : att.results
        })) || [];

        // Get enrollment logs
        const enrollmentIds = enrollments?.map(e => e.id) || [];

        let logs: any[] = [];
        if (enrollmentIds.length > 0) {
            const { data: logData, error: logsError } = await supabase
                .from('enrollment_logs')
                .select(`
                    *,
                    performed_by_profile:profiles!enrollment_logs_performed_by_fkey (
                        id,
                        full_name
                    )
                `)
                .in('enrollment_id', enrollmentIds)
                .order('created_at', { ascending: false })
                .limit(50);

            if (logsError) {
                console.error('Enrollment logs fetch error:', logsError);
                // Don't throw, just log and continue with empty array
            } else {
                logs = logData || [];
            }
        }

        // Calculate Stats
        const submittedAttempts = attempts.filter(a => a.status === 'submitted');
        const avgPercentage = submittedAttempts.length > 0
            ? submittedAttempts.reduce((acc, curr) => acc + (curr.results?.percentage || 0), 0) / submittedAttempts.length
            : 0;

        return {
            success: true,
            data: {
                student,
                enrollments: enrollments || [],
                attempts: attempts || [],
                logs,
                activeSessions,
                stats: {
                    totalEnrollments: enrollments?.length || 0,
                    totalAttempts: attempts?.length || 0,
                    avgPercentage: Math.round(avgPercentage * 10) / 10
                }
            }
        };
    } catch (error: any) {
        console.error('getStudentDetails error:', error);
        return { error: error?.message || 'An unexpected error occurred while fetching student details' };
    }
}

/**
 * Reset all active sessions for a student (admin only)
 */
export async function resetStudentSessions(userId: string) {
    const supabase = createAdminClient();

    try {
        // Delete all sessions for this user
        const { error: sessionError } = await supabase
            .schema('auth')
            .from('sessions')
            .delete()
            .eq('user_id', userId);

        if (sessionError) throw sessionError;

        // Also delete refresh tokens to ensure they can't get a new session
        const { error: tokenError } = await supabase
            .schema('auth')
            .from('refresh_tokens')
            .delete()
            .eq('user_id', userId);

        // Note: tokenError might happen if they have no tokens, we can be lenient or log it

        revalidatePath(`/admin/students/${userId}`);
        return { success: true, message: 'All active sessions have been reset' };
    } catch (error: any) {
        console.error('Reset sessions error:', error);
        return { error: error.message };
    }
}
