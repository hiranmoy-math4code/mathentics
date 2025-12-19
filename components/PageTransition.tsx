'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

/**
 * PageTransition - Smooth fade transitions between pages
 * 
 * Provides a subtle 0.2s fade effect when navigating between routes.
 * Uses framer-motion for performant animations.
 * 
 * @example
 * // In layout.tsx
 * <PageTransition>
 *   {children}
 * </PageTransition>
 */
export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.2,
                    ease: 'easeInOut'
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
