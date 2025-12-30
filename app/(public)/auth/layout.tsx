import React from "react";

export const runtime = 'edge';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-blue-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {children}
            </div>
        </div>
    );
}
