'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { getTenantIdFromHeaders } from '@/lib/tenant';

/**
 * Add a new student manually (admin only)
 * Returns student info if already exists, or creates an invitation
 */
export async function addStudent(data: {
    email: string;
    fullName: string;
    sendInvite?: boolean;
}) {
    // Use createClient instead of createTenantClient for Cloudflare compatibility
    const { createClient } = await import('@/lib/supabase/server');
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
                    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.math4code.com'}/auth/callback`
                }
            );

            if (inviteError) {
                console.error('Invitation error:', inviteError);
                throw new Error(`Failed to send invitation: ${inviteError.message}`);
            }


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
    // Use createClient instead of createTenantClient for Cloudflare compatibility
    const { createClient } = await import('@/lib/supabase/server');
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
    // Use createClient for auth check (Cloudflare compatible)
    const { createClient: createServerClient } = await import('@/lib/supabase/server');
    const authClient = await createServerClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    // Use admin client for queries (bypasses RLS)
    const supabase = createAdminClient();

    try {
        // Get tenant ID from environment or headers
        const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || await getTenantIdFromHeaders();

        if (!tenantId) {
            console.error('❌ Tenant ID not found in environment or headers');
            throw new Error('Tenant ID not configured. Please set NEXT_PUBLIC_TENANT_ID in .env.local or ensure headers are present.');
        }

        // Get all student memberships for this tenant
        const { data: memberships, error: membershipsError } = await supabase
            .from('user_tenant_memberships')
            .select('user_id, role')
            .eq('tenant_id', tenantId)
            .eq('role', 'student')
            .eq('is_active', true);

        if (membershipsError) {
            console.error('❌ Memberships query error:', membershipsError);
            throw membershipsError;
        }

        if (!memberships || memberships.length === 0) {
            return { success: true, data: [] };
        }

        // Get user IDs from memberships
        const userIds = memberships.map(m => m.user_id);

        // Fetch profiles for these users
        const { data: students, error: studentsError } = await supabase
            .from('profiles')
            .select('id, email, full_name, avatar_url, created_at')
            .in('id', userIds);

        if (studentsError) {
            console.error('❌ Students query error:', studentsError);
            throw studentsError;
        }

        const studentProfiles = students || [];

        // Get enrollments for each student (tenant-filtered)
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
      `)
            .eq('tenant_id', tenantId); // ✅ SECURITY FIX

        if (enrollmentsError) throw enrollmentsError;



        // Combine data
        const studentsWithEnrollments = studentProfiles?.map(student => {
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
                const hasExpired = (s.enrollments || []).some((e: any) => {
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
    const tenantId = await getTenantIdFromHeaders() || process.env.NEXT_PUBLIC_TENANT_ID;

    try {
        let query = supabase
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
            .eq('student_id', userId);

        if (tenantId) {
            query = query.eq('tenant_id', tenantId);
        }

        const { data: rawData, error } = await query.order('created_at', { ascending: false });

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
 * Get detailed info for a single student with stats (NEW - uses admin client)
 */
export async function getStudentDetailsAction(userId: string) {
    const trace: string[] = [];
    const log = (msg: string) => {
        const timestamp = new Date().toISOString();
        const entry = `[${timestamp}] ${msg}`;
        trace.push(entry);
    };

    log(`🚀 Starting student details fetch for: ${userId}`);

    try {
        // 1. Auth check
        log("Step 1: Auth checking...");
        const { createClient: createServerClient } = await import('@/lib/supabase/server');
        const authClient = await createServerClient();
        const { data: { user: currentUser }, error: authError } = await authClient.auth.getUser();

        if (authError || !currentUser) {
            log(`❌ Auth failure: ${authError?.message || 'No user session'}`);
            return { error: 'Unauthorized: Please log in again.', trace };
        }
        log(`✅ Auth successful as: ${currentUser.email}`);

        // 2. Tenant resolution
        log("Step 2: Resolving tenant...");
        const envTenantId = process.env.NEXT_PUBLIC_TENANT_ID;
        const headerTenantId = await getTenantIdFromHeaders();
        const tenantId = envTenantId || headerTenantId;

        log(`📍 resolved tenantId: ${tenantId} (Source: ${envTenantId ? 'Env' : 'Header Fallback'})`);

        if (!tenantId) {
            log("❌ Tenant ID resolution failed (missing both header and env)");
            return { error: 'Tenant context is missing. Please refresh or contact support.', trace };
        }

        const supabase = createAdminClient();

        // 3. Membership verification
        log("Step 3: Checking tenant membership...");
        const { data: membership, error: membershipError } = await supabase
            .from('user_tenant_memberships')
            .select('user_id, role, tenant_id')
            .eq('user_id', userId)
            .eq('tenant_id', tenantId)
            .maybeSingle();

        if (membershipError) {
            log(`❌ Membership query error: ${membershipError.message}`);
            return { error: `Database error checking membership: ${membershipError.message}`, trace };
        }

        if (!membership) {
            log(`⚠️ Membership not found for ${userId} in ${tenantId}`);
            return { error: 'Student not found in your current tenant scope.', trace };
        }
        log(`✅ Membership verified (Role: ${membership.role})`);

        // 4. Fetch Core Profile
        log("Step 4: Fetching student profile...");
        const { data: student, error: studentError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        if (studentError) {
            log(`❌ Profile fetch error: ${studentError.message}`);
            return { error: `Failed to load student profile: ${studentError.message}`, trace };
        }
        if (!student) {
            log(`❌ Profile record missing for ID: ${userId}`);
            return { error: 'Student profile record not found.', trace };
        }
        log(`👤 Profile found: ${student.email}`);

        // 5. Fetch Enrollments with safer join syntax
        log("Step 5: Fetching enrollments...");
        let { data: enrollments, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select(`
                *,
                courses!enrollments_course_id_fkey (
                    id, title, thumbnail_url, price, course_type
                ),
                profiles!enrollments_granted_by_fkey (
                    id, full_name
                )
            `)
            .eq('user_id', userId)
            .eq('tenant_id', tenantId);

        if (enrollmentsError) {
            log(`⚠️ Enrollments query failed: ${enrollmentsError.message}. Retrying without aliases...`);
            // Fallback to simpler query if specific aliases fail
            const { data: simpleEnrollments, error: simpleError } = await supabase
                .from('enrollments')
                .select('*, courses(id, title, thumbnail_url, price, course_type)')
                .eq('user_id', userId)
                .eq('tenant_id', tenantId);

            if (simpleError) {
                log(`❌ Critical: Simple enrollments fetch also failed: ${simpleError.message}`);
            } else {
                log(`✅ Successfully fetched ${simpleEnrollments?.length || 0} enrollments via fallback query`);
                // Adapt fallback data structure to match expected (granted_by_profile might be missing but page won't crash)
                (enrollments as any) = simpleEnrollments;
            }
        } else {
            log(`✅ Successfully fetched ${enrollments?.length || 0} enrollments`);
        }

        // 6. Fetch Exam Attempts
        log("Step 6: Fetching exam attempts...");
        const { data: rawAttempts, error: attemptsError } = await supabase
            .from('exam_attempts')
            .select(`
                *,
                exams (id, title, total_marks),
                results (percentage, obtained_marks)
            `)
            .eq('student_id', userId)
            .eq('tenant_id', tenantId)
            .order('created_at', { ascending: false });

        if (attemptsError) {
            log(`⚠️ Attempts query failed: ${attemptsError.message}`);
        } else {
            log(`✅ Fetched ${rawAttempts?.length || 0} exam attempts`);
        }

        const attempts = rawAttempts?.map(att => ({
            ...att,
            results: Array.isArray(att.results) ? att.results[0] : att.results
        })) || [];

        // 7. Fetch Activity Logs
        log("Step 7: Fetching activity logs...");
        const enrollmentIds = (enrollments as any)?.map((e: any) => e.id) || [];
        let logs: any[] = [];

        if (enrollmentIds.length > 0) {
            const { data: logData, error: logsError } = await supabase
                .from('enrollment_logs')
                .select(`
                    *,
                    profiles!enrollment_logs_performed_by_fkey (
                        id, full_name
                    )
                `)
                .in('enrollment_id', enrollmentIds)
                .order('created_at', { ascending: false })
                .limit(50);

            if (logsError) {
                log(`⚠️ Log query failed: ${logsError.message}. Retrying simple logs...`);
                const { data: simpleLogs } = await supabase
                    .from('enrollment_logs')
                    .select('*')
                    .in('enrollment_id', enrollmentIds)
                    .order('created_at', { ascending: false })
                    .limit(50);
                logs = simpleLogs || [];
            } else {
                logs = logData || [];
                log(`✅ Fetched ${logs.length} activity logs`);
            }
        }

        // 8. Final Assembly
        log("Step 8: Calculating final stats...");
        const submittedAttempts = attempts.filter(a => a.status === 'submitted');
        const avgPercentage = submittedAttempts.length > 0
            ? submittedAttempts.reduce((acc, curr) => acc + (curr.results?.percentage || 0), 0) / submittedAttempts.length
            : 0;

        log("🏁 All steps completed successfully!");

        return {
            success: true,
            data: {
                student,
                enrollments: enrollments || [],
                attempts: attempts || [],
                logs,
                activeSessions: 0,
                stats: {
                    totalEnrollments: (enrollments as any)?.length || 0,
                    totalAttempts: attempts?.length || 0,
                    avgPercentage: Math.round(avgPercentage * 10) / 10,
                    activeSessions: 0
                }
            },
            trace
        };

    } catch (error: any) {
        log(`💥 FATAL CRASH: ${error.message}`);
        console.error('getStudentDetailsAction UNEXPECTED error:', error);
        return {
            error: `Unexpected System Error: ${error.message}. Contact admin with trace ID: ${Date.now()}`,
            trace
        };
    }
}

/**
 * Get detailed info for a single student with stats (OLD - kept for compatibility)
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
