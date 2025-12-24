"use client";

import { useParams } from "next/navigation";
import { StudentProfile } from "@/components/admin/StudentProfile";

export const dynamic = 'force-dynamic';

export default function StudentProfilePage() {
    const params = useParams();
    const userId = params.id as string;

    if (!userId) {
        return <div className="p-8 text-center">Invalid student ID</div>;
    }

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <StudentProfile studentId={userId} />
        </div>
    );
}
