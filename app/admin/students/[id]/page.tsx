"use client";

import { Suspense } from "react";
import { StudentProfile } from "@/components/admin/StudentProfile";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

function StudentProfileSkeleton() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 animate-pulse">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-96 w-full rounded-xl" />
        </div>
    );
}

function StudentProfileContent() {
    const params = useParams();
    const userId = params.id as string;

    if (!userId) {
        return <div className="p-8 text-center">Invalid student ID</div>;
    }

    return <StudentProfile studentId={userId} />;
}

export default function StudentProfilePageWrapper() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <Suspense fallback={<StudentProfileSkeleton />}>
                <StudentProfileContent />
            </Suspense>
        </div>
    );
}
