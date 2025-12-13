
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto bg-background animate-in fade-in duration-300">
            {/* Header Area Skeleton */}
            <div className="w-full max-w-4xl mx-auto p-6 md:p-10 space-y-8">
                <div className="space-y-4 text-center border-b border-border pb-8">
                    <div className="flex justify-center">
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-3/4 mx-auto" />
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>

                {/* Content Area Skeleton */}
                <div className="space-y-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <div className="pt-4">
                        <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                </div>
            </div>
        </div>
    );
}
