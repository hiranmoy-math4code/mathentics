import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
    return (
        <div className="p-6 md:p-10 space-y-6 min-h-screen">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-64" />
            </div>

            {/* Settings Form Skeleton */}
            <div className="max-w-2xl space-y-6">
                <div className="p-6 rounded-lg border border-border bg-card shadow-sm">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-4">
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-lg border border-border bg-card shadow-sm">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <div className="space-y-4">
                        <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>

                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    );
}
