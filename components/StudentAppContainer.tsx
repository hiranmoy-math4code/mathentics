/**
 * HYBRID SPA PATTERN - Student App Container
 * 
 * This component handles ALL student route navigation purely on the client.
 * - Uses React state for instant transitions (0ms)
 * - Updates URL with window.history.pushState (no server round-trip)
 * - Maintains browser history and shareable URLs
 * - Keeps layout mounted (no re-mounting)
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import page components
const DashboardPage = dynamic(() => import('@/app/student/dashboard/page'), {
    ssr: false,
});
const ResultsPage = dynamic(() => import('@/app/student/results/page'), {
    ssr: false,
});
const RewardsPage = dynamic(() => import('@/app/student/rewards/page'), {
    ssr: false,
});
const SettingsPage = dynamic(() => import('@/app/student/settings/page'), {
    ssr: false,
});
const MySeriesPage = dynamic(() => import('@/app/student/my-series/page'), {
    ssr: false,
});

interface StudentAppContainerProps {
    initialRoute?: string;
}

export function StudentAppContainer({ initialRoute }: StudentAppContainerProps) {
    const pathname = usePathname();

    // ⚡ CLIENT-SIDE STATE: The source of truth for current route
    const [currentRoute, setCurrentRoute] = useState<string>(
        initialRoute || pathname || '/student/dashboard'
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
        (window as any).__studentNavigate = navigateTo;
    }, [navigateTo]);

    // Render component based on current route
    const renderPage = () => {
        if (currentRoute.startsWith('/student/results')) {
            return <ResultsPage />;
        }
        if (currentRoute.startsWith('/student/rewards')) {
            return <RewardsPage />;
        }
        if (currentRoute.startsWith('/student/settings')) {
            return <SettingsPage />;
        }
        if (currentRoute.startsWith('/student/my-series')) {
            return <MySeriesPage />;
        }
        // Default to dashboard
        return <DashboardPage />;
    };

    return (
        <div className="student-app-container">
            {renderPage()}
        </div>
    );
}
