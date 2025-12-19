/**
 * ClientSideLink - Hybrid SPA Navigation Link
 * 
 * Uses the global __navigateToLesson function for instant client-side navigation
 * Falls back to regular Link if function not available
 */

'use client';

import { useCallback, MouseEvent } from 'react';

interface ClientSideLinkProps {
    href: string;
    lessonId: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export function ClientSideLink({
    href,
    lessonId,
    onClick,
    className,
    children
}: ClientSideLinkProps) {
    const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // Call custom onClick if provided
        if (onClick) onClick();

        // Use global navigation function for instant transition
        if (typeof window !== 'undefined' && (window as any).__navigateToLesson) {
            (window as any).__navigateToLesson(lessonId);
        } else {
            // Fallback to regular navigation
            window.location.href = href;
        }
    }, [lessonId, href, onClick]);

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
        >
            {children}
        </a>
    );
}
