import { useQuery } from "@tanstack/react-query";
import { checkExamAccess } from "@/lib/examAccess";
import { ExamAccessStatus } from "@/components/ExamAccessChecker";

/**
 * Hook to check exam access with caching for instant subsequent loads
 * 
 * First visit: Checks access and caches result (~50ms)
 * Return visits: Uses cached result (0ms instant)
 * 
 * This eliminates loading spinner delays on exam navigation
 */
export function useExamAccess(examId: string, userId: string) {
    return useQuery<ExamAccessStatus>({
        queryKey: ['exam-access', examId, userId],
        queryFn: () => checkExamAccess(examId, userId),
        staleTime: 1000 * 60 * 5, // 5 minutes - access rules don't change often
        gcTime: 1000 * 60 * 10,    // 10 minutes - keep in memory
        retry: 1, // Fail fast
        // Return cached data instantly while revalidating in background
        refetchOnMount: false, // Don't refetch on component mount if data exists
        refetchOnWindowFocus: false, // Don't refetch on window focus
    });
}
