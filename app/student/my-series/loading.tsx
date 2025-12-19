import { Skeleton } from "@/components/ui/skeleton";

export default function MySeriesLoading() {
    return (
        <div className="p-6 md:p-10 space-y-6 min-h-screen">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-80" />
            </div>

            {/* Test Series Cards Skeleton */}
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 rounded-2xl border border-border bg-card shadow-md animate-pulse">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                <Skeleton className="w-12 h-12 rounded-xl" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-5 w-64" />
                                    <Skeleton className="h-4 w-48" />
                                </div>
                            </div>
                            <div className="w-full sm:w-64 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-12" />
                                </div>
                                <Skeleton className="h-2 w-full rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
