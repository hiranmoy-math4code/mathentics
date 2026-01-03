'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, ReactNode, useTransition } from 'react';
import Link from 'next/link';

interface SmartLinkProps {
    href: string;
    prefetchQuery?: () => Promise<any>;
    queryKey?: any[];
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

/**
 * SmartLink - Intelligent prefetching link component
 * 
 * Features:
 * - Desktop: Prefetches on hover (onMouseEnter)
 * - Mobile: Prefetches on touch start (onPointerDown) - saves milliseconds before click
 * - Prevents duplicate prefetches with useRef
 * - Integrates with React Query cache for data prefetching
 * - Uses router.push for instant client-side navigation
 * 
 * @example
 * // With data prefetching
 * <SmartLink
 *   href="/learn/course-123"
 *   queryKey={['course', 'course-123']}
 *   prefetchQuery={() => fetchCourseData('course-123')}
 * >
 *   View Course
 * </SmartLink>
 * 
 * @example
 * // Route-only prefetching (no data)
 * <SmartLink href="/dashboard">
 *   Dashboard
 * </SmartLink>
 */
export function SmartLink({
    href,
    prefetchQuery,
    queryKey,
    children,
    className,
    onClick
}: SmartLinkProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const prefetchedRef = useRef(false);
    const [isPending, startTransition] = useTransition();

    const handlePrefetch = () => {
        // Prevent duplicate prefetches
        if (prefetchedRef.current) return;

        prefetchedRef.current = true;

        // If we have a query function, prefetch the data
        if (prefetchQuery && queryKey) {
            queryClient.prefetchQuery({
                queryKey,
                queryFn: prefetchQuery,
                staleTime: 1000 * 60 * 5, // 5 minutes
            });
        }

        // Always prefetch the route for instant navigation
        try {
            router.prefetch(href);
        } catch (err) {
            // Ignore prefetch errors (often 404s on fresh deployments/Cloudflare)
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        // Call custom onClick if provided (for things like closing mobile menu)
        if (onClick) {
            onClick();
        }

        // List of routes that are handled by the SPA containers
        const spaRoutes = [
            '/admin/dashboard', '/admin/courses', '/admin/test-series', '/admin/question-bank',
            '/admin/exams', '/admin/payments',
            '/admin/students', '/admin/settings',
            '/student/dashboard', '/student/results', '/student/rewards',
            '/student/settings', '/student/my-series', '/student/my-courses',
            '/student/all-courses', '/student/all-test-series'
        ];

        const isExactSpaRoute = spaRoutes.includes(href);

        // ⚡ INSTANT STUDENT NAVIGATION: Use StudentAppContainer for exact SPA routes
        if (href.startsWith('/student/') && (window as any).__studentNavigate && isExactSpaRoute) {
            (window as any).__studentNavigate(href);
            return;
        }

        // ⚡ INSTANT ADMIN NAVIGATION: Use AdminAppContainer for exact SPA routes
        if (href.startsWith('/admin/') && (window as any).__adminNavigate && isExactSpaRoute) {
            (window as any).__adminNavigate(href);
            return;
        }

        // For all other routes (including dynamic routes), use router.push
        // Prefetching makes this fast
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            onMouseEnter={handlePrefetch} // Desktop: Hover prefetch
            onPointerDown={handlePrefetch} // Mobile: Touch prefetch (before click)
            className={className}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </a>
    );
}