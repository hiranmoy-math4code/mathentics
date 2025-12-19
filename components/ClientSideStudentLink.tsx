/**
 * ClientSideStudentLink - Instant navigation for student routes
 * 
 * Uses global navigation function for instant client-side transitions
 * without server round-trips.
 */

'use client';

import { useCallback, ReactNode } from 'react';

interface ClientSideStudentLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function ClientSideStudentLink({
    href,
    children,
    className,
    onClick
}: ClientSideStudentLinkProps) {
    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        // Call custom onClick if provided
        if (onClick) {
            onClick();
        }

        // Use global navigation function for instant transition
        const navigate = (window as any).__navigateToStudentRoute;
        if (navigate) {
            navigate(href);
        } else {
            // Fallback to regular navigation
            window.location.href = href;
        }
    }, [href, onClick]);

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
