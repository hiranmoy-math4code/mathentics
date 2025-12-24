"use client";

import { use } from "react";
import { StudentProfile } from "@/components/admin/StudentProfile";

export const dynamic = 'force-dynamic';

export default function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const userId = resolvedParams.id;

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <StudentProfile studentId={userId} />
        </div>
    );
}
