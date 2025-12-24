/**
 * HYBRID SPA PATTERN - Admin App Container
 * 
 * This component handles admin route navigation purely on the client for instant transitions.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

// Dynamically import page components
const DashboardPage = dynamic(() => import('@/app/admin/dashboard/page'), { ssr: false });
const CoursesPage = dynamic(() => import('@/app/admin/courses/page'), { ssr: false });
const TestSeriesPage = dynamic(() => import('@/app/admin/test-series/page'), { ssr: false });
const QuestionBankPage = dynamic(() => import('@/app/admin/question-bank/page'), { ssr: false });
const ExamsPage = dynamic(() => import('@/app/admin/exams/page'), { ssr: false });
const PaymentsPage = dynamic(() => import('@/app/admin/payments/page'), { ssr: false });
const StudentsPage = dynamic(() => import('@/app/admin/students/page'), { ssr: false });
const SettingsPage = dynamic(() => import('@/app/admin/settings/page'), { ssr: false });

interface AdminAppContainerProps {
    initialRoute?: string;
    children: React.ReactNode;
}

export function AdminAppContainer({ initialRoute, children }: AdminAppContainerProps) {
    const pathname = usePathname();
    const [currentRoute, setCurrentRoute] = useState<string>(
        initialRoute || pathname || '/admin/dashboard'
    );

    // Sync state with URL (handles browser back/forward and initial hit)
    useEffect(() => {
        if (pathname && pathname !== currentRoute) {
            setCurrentRoute(pathname);
        }
    }, [pathname, currentRoute]);

    const navigateTo = useCallback((route: string) => {
        if (route === currentRoute) return;

        // Update URL and state
        window.history.pushState({}, '', route);
        setCurrentRoute(route);

        // Scroll to top on navigation for better UX
        window.scrollTo(0, 0);
    }, [currentRoute]);

    // Expose navigation function globally for SmartLink
    useEffect(() => {
        (window as any).__adminNavigate = navigateTo;
        return () => {
            delete (window as any).__adminNavigate;
        };
    }, [navigateTo]);

    const renderPage = () => {
        // SPA Routing for exact matches only
        if (currentRoute === '/admin/dashboard') return <DashboardPage />;
        if (currentRoute === '/admin/courses') return <CoursesPage />;
        if (currentRoute === '/admin/test-series') return <TestSeriesPage />;
        if (currentRoute === '/admin/question-bank') return <QuestionBankPage />;
        if (currentRoute === '/admin/exams') return <ExamsPage />;
        if (currentRoute === '/admin/payments') return <PaymentsPage />;
        if (currentRoute === '/admin/students') return <StudentsPage />;
        if (currentRoute === '/admin/settings') return <SettingsPage />;

        // For dynamic routes (like course pages), use standard Next.js routing
        // This allows server components to work properly
        return children;
    };

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={currentRoute}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="admin-app-container w-full h-full"
            >
                {renderPage()}
            </motion.div>
        </AnimatePresence>
    );
}
