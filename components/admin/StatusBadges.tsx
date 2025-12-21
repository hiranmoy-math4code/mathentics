'use client';

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: 'active' | 'expired' | 'draft' | 'published' | 'archived' | 'pending' | 'completed' | 'refunded';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
    active: {
        label: 'Active',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-200 dark:border-emerald-500/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        dot: 'bg-emerald-500'
    },
    expired: {
        label: 'Expired',
        bg: 'bg-red-50 dark:bg-red-500/10',
        border: 'border-red-200 dark:border-red-500/20',
        text: 'text-red-700 dark:text-red-400',
        dot: 'bg-red-500'
    },
    draft: {
        label: 'Draft',
        bg: 'bg-slate-50 dark:bg-slate-500/10',
        border: 'border-slate-200 dark:border-slate-500/20',
        text: 'text-slate-700 dark:text-slate-400',
        dot: 'bg-slate-500'
    },
    published: {
        label: 'Published',
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        border: 'border-blue-200 dark:border-blue-500/20',
        text: 'text-blue-700 dark:text-blue-400',
        dot: 'bg-blue-500'
    },
    archived: {
        label: 'Archived',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        border: 'border-amber-200 dark:border-amber-500/20',
        text: 'text-amber-700 dark:text-amber-400',
        dot: 'bg-amber-500'
    },
    pending: {
        label: 'Pending',
        bg: 'bg-yellow-50 dark:bg-yellow-500/10',
        border: 'border-yellow-200 dark:border-yellow-500/20',
        text: 'text-yellow-700 dark:text-yellow-400',
        dot: 'bg-yellow-500'
    },
    completed: {
        label: 'Completed',
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        border: 'border-purple-200 dark:border-purple-500/20',
        text: 'text-purple-700 dark:text-purple-400',
        dot: 'bg-purple-500'
    },
    refunded: {
        label: 'Revoked',
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        border: 'border-orange-200 dark:border-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
        dot: 'bg-orange-500'
    }
};

const sizeConfig = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
    lg: 'text-sm px-4 py-1.5 gap-2'
};

export function StatusBadge({ status, className, size = 'md' }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <div className={cn(
            "inline-flex items-center font-bold uppercase tracking-wider rounded-full border transition-colors",
            config.bg,
            config.border,
            config.text,
            sizeConfig[size],
            className
        )}>
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", config.dot)} />
            {config.label}
        </div>
    );
}

interface ExpiryBadgeProps {
    expiresAt: string | Date | null;
    className?: string;
}

export function ExpiryBadge({ expiresAt, className }: ExpiryBadgeProps) {
    if (!expiresAt) {
        return (
            <div className={cn(
                "inline-flex items-center text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full",
                "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20",
                "text-indigo-700 dark:text-indigo-400",
                className
            )}>
                ∞ Lifetime
            </div>
        );
    }

    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
        return <StatusBadge status="expired" size="sm" className={className} />;
    }

    if (daysUntilExpiry <= 3) {
        return (
            <div className={cn(
                "inline-flex items-center text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full gap-1",
                "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20",
                "text-red-700 dark:text-red-400 animate-pulse",
                className
            )}>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                {daysUntilExpiry}d left
            </div>
        );
    }

    if (daysUntilExpiry <= 7) {
        return (
            <div className={cn(
                "inline-flex items-center text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full gap-1",
                "bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20",
                "text-amber-700 dark:text-amber-400",
                className
            )}>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {daysUntilExpiry}d left
            </div>
        );
    }

    if (daysUntilExpiry <= 30) {
        return (
            <div className={cn(
                "inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                "bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20",
                "text-green-700 dark:text-green-400",
                className
            )}>
                {daysUntilExpiry}d
            </div>
        );
    }

    return (
        <div className={cn(
            "inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
            "bg-slate-50 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20",
            "text-slate-600 dark:text-slate-400",
            className
        )}>
            {expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
    );
}

interface GrantTypeBadgeProps {
    grantType: 'manual' | 'payment' | 'free';
    className?: string;
}

export function GrantTypeBadge({ grantType, className }: GrantTypeBadgeProps) {
    const config = {
        manual: {
            label: '👤 Admin',
            bg: 'bg-violet-50 dark:bg-violet-500/10',
            border: 'border-violet-200 dark:border-violet-500/20',
            text: 'text-violet-700 dark:text-violet-400'
        },
        payment: {
            label: '💳 Paid',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            border: 'border-emerald-200 dark:border-emerald-500/20',
            text: 'text-emerald-700 dark:text-emerald-400'
        },
        free: {
            label: '🎁 Free',
            bg: 'bg-sky-50 dark:bg-sky-500/10',
            border: 'border-sky-200 dark:border-sky-500/20',
            text: 'text-sky-700 dark:text-sky-400'
        }
    };

    const c = config[grantType];

    return (
        <div className={cn(
            "inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border",
            c.bg,
            c.border,
            c.text,
            className
        )}>
            {c.label}
        </div>
    );
}
