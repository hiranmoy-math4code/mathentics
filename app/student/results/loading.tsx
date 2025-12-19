import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsLoading() {
    return (
        <div className="p-6 md:p-10 space-y-6 min-h-screen">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 rounded-lg border border-border bg-card shadow-sm animate-pulse">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                ))}
            </div>

            {/* Results Table Skeleton */}
            <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 animate-pulse">
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-9 w-24 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
