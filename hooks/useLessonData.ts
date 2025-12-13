
import { useQuery } from "@tanstack/react-query";
import { getLessonData } from "@/actions/getLessonData";

export function useLessonData(lessonId: string, courseId: string) {
    return useQuery({
        queryKey: ['lesson', lessonId, courseId],
        queryFn: () => getLessonData(lessonId, courseId),
        staleTime: 1000 * 60 * 10, // 10 minutes - Data remains "fresh" and won't re-fetch on revisit
        gcTime: 1000 * 60 * 30,    // 30 minutes - Keep data in memory for 30 mins even if unused
        refetchOnWindowFocus: false, // Don't re-fetch when switching tabs
        enabled: !!lessonId,
    });
}
