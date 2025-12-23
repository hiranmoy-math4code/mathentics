"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseAnalytics } from "@/actions/admin/analytics";

export function useCourseAnalytics(courseId: string) {
    return useQuery({
        queryKey: ["course-analytics", courseId],
        queryFn: () => getCourseAnalytics(courseId),
        enabled: !!courseId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
