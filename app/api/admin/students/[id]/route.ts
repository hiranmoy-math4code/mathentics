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

        // 2. Fetch student details using Admin Client (bypassing RLS)
        const supabase = createAdminClient();

        // 1. Basic Profile
        const { data: student, error: studentError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (studentError || !student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // 2. Enrollments (with Course/Test details)
        const { data: enrollments, error: enrollError } = await supabase
            .from('enrollments')
            .select(`
                *,
                courses (
                    id,
                    title,
                    course_type,
                    thumbnail_url
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        // 3. Last Attempt (Demo - you might have real logic here)
        const { data: lastAttempt } = await supabase
            .from('exam_attempts')
            .select('completed_at, score, total_questions')
            .eq('user_id', userId)
            .order('completed_at', { ascending: false })
            .limit(1)
            .single();

        // 4. Activity Logs (Demo - you might have real logic here)
        const { data: logs } = await supabase
            .from('activity_logs')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(5);

        return NextResponse.json({
            success: true,
            data: {
                student,
                enrollments: enrollments || [],
                attempts: [], // Initialize correctly
                logs: logs || [],
                activeSessions: 0,
                stats: {
                    totalEnrollments: enrollments?.length || 0,
                    totalAttempts: 0,
                    avgPercentage: 0
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
