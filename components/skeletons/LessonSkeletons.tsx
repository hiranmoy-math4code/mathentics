
import { Skeleton } from "@/components/ui/skeleton";

export function VideoSkeleton() {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-background animate-in fade-in duration-300">
            {/* Video Placeholder */}
            <div className="w-full bg-black/5 relative shadow-sm z-20 shrink-0">
                <div className="w-full h-auto aspect-video max-h-[70vh] mx-auto bg-muted/50 flex items-center justify-center">
                    <Skeleton className="w-16 h-16 rounded-full opacity-20" />
                </div>
            </div>
            {/* Tabs & Content */}
            <div className="flex-1 bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
                    <div className="flex gap-2 mb-6">
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                        <Skeleton className="h-9 w-24 rounded-md" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <Skeleton className="h-6 w-48 mb-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                            <Skeleton className="h-4 w-[95%]" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-32 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function QuizSkeleton() {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-background animate-in fade-in duration-300">
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
                <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-border overflow-hidden h-[600px] flex flex-col">
                    <div className="h-2 bg-muted w-full" />
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <Skeleton className="h-8 w-64 rounded-lg" />
                            <Skeleton className="h-10 w-32 rounded-lg" />
                        </div>
                        <div className="flex gap-6 h-full">
                            {/* Question Area */}
                            <div className="flex-1 space-y-6">
                                <Skeleton className="h-24 w-full rounded-xl" />
                                <div className="space-y-3">
                                    <Skeleton className="h-14 w-full rounded-lg" />
                                    <Skeleton className="h-14 w-full rounded-lg" />
                                    <Skeleton className="h-14 w-full rounded-lg" />
                                    <Skeleton className="h-14 w-full rounded-lg" />
                                </div>
                            </div>
                            {/* Sidebar Area */}
                            <div className="w-72 hidden lg:block space-y-4">
                                <Skeleton className="h-full w-full rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TextSkeleton() {
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-background animate-in fade-in duration-300">
            <div className="w-full max-w-4xl mx-auto p-6 md:p-10 space-y-12">
                <div className="space-y-4 text-center border-b border-border pb-8">
                    <Skeleton className="h-6 w-24 rounded-full mx-auto" />
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <div className="flex justify-center gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[98%]" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[92%]" />
                    <div className="py-4">
                        <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[96%]" />
                </div>
            </div>
        </div>
    );
}
