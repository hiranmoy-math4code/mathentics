import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'edge';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: userId } = await params;

        // 1. Authenticate (using standard client to check session)
        const supabaseClient = await createClient();
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Resolve Tenant
        const tenantId = request.headers.get('x-tenant-id') || process.env.NEXT_PUBLIC_TENANT_ID;

        // 3. Fetch student details using Admin Client (bypassing RLS)
        const supabase = createAdminClient();

        // Basic Profile
        const { data: student, error: studentError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (studentError || !student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // Enrollments (with Course/Test details)
        let enrollmentsQuery = supabase
            .from('enrollments')
            .select(`
                *,
                courses (
                    id,
                    title,
                    course_type,
                    thumbnail_url,
                    price
                ),
                profiles!enrollments_granted_by_fkey (
                    id,
                    full_name
                )
            `)
            .eq('user_id', userId)
            .order('enrolled_at', { ascending: false });

        if (tenantId) {
            enrollmentsQuery = enrollmentsQuery.eq('tenant_id', tenantId);
        }

        const { data: enrollments, error: enrollError } = await enrollmentsQuery;

        if (enrollError) {
            console.error('Enrollments fetch error:', enrollError);
        }

        // Exam Attempts
        let attemptsQuery = supabase
            .from('exam_attempts')
            .select(`
                *,
                exams (
                    id,
                    title,
                    total_marks
                ),
                results (
                    percentage,
                    obtained_marks
                )
            `)
            .eq('student_id', userId)
            .order('created_at', { ascending: false });

        if (tenantId) {
            attemptsQuery = attemptsQuery.eq('tenant_id', tenantId);
        }

        const { data: rawAttempts, error: attemptsError } = await attemptsQuery;


        if (attemptsError) {
            console.error('Attempts fetch error:', attemptsError);
        }

        // Flatten results array if needed
        const attempts = rawAttempts?.map(att => ({
            ...att,
            results: Array.isArray(att.results) ? att.results[0] : att.results
        })) || [];

        // Activity Logs
        const enrollmentIds = enrollments?.map((e: any) => e.id) || [];
        let logs: any[] = [];

        if (enrollmentIds.length > 0) {
            const { data: logData } = await supabase
                .from('enrollment_logs')
                .select(`
                    *,
                    profiles!enrollment_logs_performed_by_fkey (
                        id,
                        full_name
                    )
                `)
                .in('enrollment_id', enrollmentIds)
                .order('created_at', { ascending: false })
                .limit(50);
            logs = logData || [];
        }

        // Calculate Stats
        const submittedAttempts = attempts.filter((a: any) => a.status === 'submitted');
        const avgPercentage = submittedAttempts.length > 0
            ? submittedAttempts.reduce((acc: number, curr: any) => acc + (curr.results?.percentage || 0), 0) / submittedAttempts.length
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                student,
                enrollments: enrollments || [],
                attempts: attempts || [],
                logs: logs || [],
                activeSessions: 0,
                stats: {
                    totalEnrollments: enrollments?.length || 0,
                    totalAttempts: attempts?.length || 0,
                    avgPercentage: Math.round(avgPercentage * 10) / 10
                }
            }
        });

    } catch (error: any) {
        console.error('API Error (Student Details):', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}
