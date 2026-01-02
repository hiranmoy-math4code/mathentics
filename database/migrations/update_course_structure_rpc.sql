-- ============================================================
-- UPDATE get_course_structure RPC
-- ============================================================
-- Purpose: Include exam metadata (allow_pause, start_time, end_time) 
-- in the course structure response for frontend badges.
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_course_structure(target_course_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_result jsonb;
BEGIN
    SELECT json_agg(
        json_build_object(
            'id', m.id,
            'title', m.title,
            'module_order', m.module_order,
            'lessons', (
                SELECT COALESCE(json_agg(
                    json_build_object(
                        'id', l.id,
                        'title', l.title,
                        'content_type', l.content_type,
                        'content_url', l.content_url,
                        'content_text', l.content_text,
                        'is_free_preview', COALESCE(l.is_free_preview, false),
                        'lesson_order', l.lesson_order,
                        'duration', l.video_duration,
                        'video_provider', l.video_provider,
                        'bunny_video_id', l.bunny_video_id,
                        'bunny_library_id', l.bunny_library_id,
                        'is_live', l.is_live,
                        'meeting_date', l.meeting_date,
                        'meeting_url', l.meeting_url,
                        'meeting_platform', l.meeting_platform,
                        'exam_id', l.exam_id,
                        'is_downloadable', l.is_downloadable,
                        'created_at', l.created_at,
                        'updated_at', l.updated_at,
                        -- NEW: Exam Details for Badges
                        'exam_details', (
                            CASE WHEN l.exam_id IS NOT NULL THEN
                                (
                                    SELECT json_build_object(
                                        'id', e.id,
                                        'allow_pause', e.allow_pause,
                                        'start_time', e.start_time,
                                        'end_time', e.end_time
                                    )
                                    FROM public.exams e
                                    WHERE e.id = l.exam_id
                                )
                            ELSE NULL END
                        )
                    ) ORDER BY l.lesson_order ASC
                ), '[]'::json)
                FROM public.lessons l
                WHERE l.module_id = m.id
            )
        ) ORDER BY m.module_order ASC
    ) INTO v_result
    FROM public.modules m
    WHERE m.course_id = target_course_id;

    RETURN COALESCE(v_result, '[]'::jsonb);
END;
$function$;
