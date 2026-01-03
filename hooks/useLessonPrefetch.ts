import { useQueryClient } from "@tanstack/react-query";
import { fetchLessonData } from "./useLessonData";

export function useLessonPrefetch() {
    const queryClient = useQueryClient();

    const prefetchLesson = async (lessonId: string, courseId: string) => {
        if (!lessonId || !courseId) return;

        await queryClient.prefetchQuery({
            queryKey: ['lesson', lessonId, courseId],
            queryFn: () => fetchLessonData(lessonId, courseId),
            staleTime: 1000 * 60 * 10, // Match the staletime of main hook
        });
    };

    return { prefetchLesson };
}
