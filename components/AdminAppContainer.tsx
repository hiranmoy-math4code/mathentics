/**
 * HYBRID SPA PATTERN - Admin App Container
 * 
 * This component handles ALL admin route navigation purely on the client.
 * - Uses React state for instant transitions (0ms)
 * - Updates URL with window.history.pushState (no server round-trip)
 * - Maintains browser history and shareable URLs
 * - Keeps layout mounted (no re-mounting)
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import admin page components
const AdminDashboardPage = dynamic(() => import('@/app/admin/dashboard/page'), {
    ssr: false,
});
const CoursesPage = dynamic(() => import('@/app/admin/courses/page'), {
    ssr: false,
});
const StudentsPage = dynamic(() => import('@/app/admin/students/page'), {
    ssr: false,
});
const ExamsPage = dynamic(() => import('@/app/admin/exams/page'), {
    ssr: false,
});
const SettingsPage = dynamic(() => import('@/app/admin/settings/page'), {
    ssr: false,
});

interface AdminAppContainerProps {
    initialRoute?: string;
}

export function AdminAppContainer({ initialRoute }: AdminAppContainerProps) {
    const pathname = usePathname();

    // ⚡ CLIENT-SIDE STATE: The source of truth for current route
    const [currentRoute, setCurrentRoute] = useState<string>(
        initialRoute || pathname || '/admin/dashboard'
    );

    // ⚡ INSTANT NAVIGATION: Update route without server round-trip
    const navigateTo = useCallback((route: string) => {
        // Update state (instant - 0ms)
        setCurrentRoute(route);

        // Update URL (no server request)
        window.history.pushState({}, '', route);
    }, []);

    // Listen to browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
            setCurrentRoute(path);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Expose navigation function globally for SmartLink
    useEffect(() => {
        (window as any).__adminNavigate = navigateTo;
    }, [navigateTo]);

    // Render component based on current route
    const renderPage = () => {
        if (currentRoute.startsWith('/admin/courses')) {
            return <CoursesPage />;
        }
        if (currentRoute.startsWith('/admin/students')) {
            return <StudentsPage />;
        }
        if (currentRoute.startsWith('/admin/exams')) {
            return <ExamsPage />;
        }
        if (currentRoute.startsWith('/admin/settings')) {
            return <SettingsPage />;
        }
        // Default to dashboard
        return <AdminDashboardPage />;
    };

    return (
        <div className="admin-app-container">
            {renderPage()}
        </div>
    );
}
