import { Skeleton } from "@/components/ui/skeleton";

export default function ExamsLoading() {
    return (
        <div className="p-6 md:p-10 space-y-6 min-h-screen">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Exam Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-6 rounded-xl border border-border bg-card shadow-sm animate-pulse">
                        <div className="flex items-start justify-between mb-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-5/6 mb-4" />
                        <div className="flex items-center gap-4 mb-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-10 w-full rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
