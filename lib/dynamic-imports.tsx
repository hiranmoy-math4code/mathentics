/**
 * Dynamic Imports for Heavy Components
 * 
 * Centralizes all dynamic imports with proper loading states to reduce bundle size.
 * These components are loaded on-demand with SSR disabled for client-only features.
 */

import dynamic from 'next/dynamic';

/**
 * ReactPlayer - Video player component (~200KB)
 * Loaded dynamically with aspect-ratio skeleton
 */
export const DynamicReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
    loading: () => (
        <div className="aspect-video bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-muted-foreground/20 animate-pulse" />
        </div>
    )
});


/**
 * MathJax Context - Math rendering (~300KB)
 * Loaded dynamically for pages with mathematical content
 */
export const DynamicMathJax = dynamic(
    () => import('better-react-mathjax').then(mod => mod.MathJaxContext),
    {
        ssr: false,
        loading: () => (
            <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-3/4" />
            </div>
        )
    }
);

/**
 * Usage Example:
 * 
 * import { DynamicReactPlayer } from '@/lib/dynamic-imports';
 * 
 * function VideoLesson() {
 *   return <DynamicReactPlayer url={videoUrl} />;
 * }
 */
