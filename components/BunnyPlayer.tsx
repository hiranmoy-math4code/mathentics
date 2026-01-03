'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLessonContext } from '@/context/LessonContext';
import { awardCoins } from '@/app/actions/rewardActions';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useTenantId } from '@/hooks/useTenantId';

interface BunnyPlayerProps {
    videoId: string;
    libraryId: string;
    videoType: 'vod' | 'live';
    videoStatus?: 'processing' | 'ready' | 'live' | 'ended' | 'error';
    className?: string;
    onComplete?: () => void;
}

export function BunnyPlayer({
    videoId,
    libraryId,
    videoType,
    videoStatus = 'ready',
    className = '',
    onComplete
}: BunnyPlayerProps) {
    const [isLive, setIsLive] = useState(videoStatus === 'live');
    const [error, setError] = useState<string | null>(null);
    const [rewarded, setRewarded] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Get lesson context for auto-completion
    let markComplete: (() => void) | null = null;
    try {
        const context = useLessonContext();
        markComplete = context.markComplete;
    } catch (error) {
        // Context not available (e.g., in admin builder)
        markComplete = null;
    }

    const tenantId = useTenantId();

    // Get user ID
    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserId(user.id);
        };
        getUser();
    }, []);

    // Listen for Bunny.net iframe messages
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Verify origin is from Bunny.net
            if (!event.origin.includes('mediadelivery.net')) return;

            try {
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

                // Bunny.net sends progress updates
                if (data.event === 'timeupdate' && data.currentTime && data.duration) {
                    const progress = data.currentTime / data.duration;

                    // Auto-complete at 90% watch progress
                    if (!rewarded && userId && progress >= 0.9) {
                        setRewarded(true);

                        // Award coins for watching video
                        awardCoins(
                            userId,
                            'video_watch',
                            videoId,
                            `Watched Bunny video: ${videoId}`,
                            tenantId || undefined
                        ).then((res) => {
                            if (res.success && res.message) {
                                toast.success(res.message, { icon: "🎥" });
                                window.dispatchEvent(new Event("rewards-updated"));
                            }
                        });

                        // Mark lesson complete
                        if (markComplete) {
                            markComplete();
                        }

                        // Call onComplete callback if provided
                        if (onComplete) {
                            onComplete();
                        }
                    }
                }
            } catch (err) {
                // Ignore parsing errors
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [rewarded, userId, videoId, tenantId, markComplete, onComplete]);

    // Poll for live status if it's a live stream
    useEffect(() => {
        if (videoType === 'live' && videoStatus !== 'live') {
            const interval = setInterval(async () => {
                try {
                    // You can add an API call here to check live status
                    // For now, we'll rely on the videoStatus prop
                } catch (err) {
                    console.error('Failed to check live status:', err);
                }
            }, 10000); // Check every 10 seconds

            return () => clearInterval(interval);
        }
    }, [videoType, videoStatus]);

    // Generate embed URL with event tracking enabled
    const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&preload=true&responsive=true`;

    // Handle different states
    if (videoStatus === 'processing') {
        return (
            <div className={`flex items-center justify-center bg-gray-900 text-white ${className}`}>
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-lg font-semibold">Processing Video...</p>
                    <p className="text-sm text-gray-400 mt-2">This may take a few minutes</p>
                </div>
            </div>
        );
    }

    if (videoStatus === 'error') {
        return (
            <div className={`flex items-center justify-center bg-gray-900 text-white ${className}`}>
                <div className="text-center p-8">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-semibold">Video Error</p>
                    <p className="text-sm text-gray-400 mt-2">Failed to load video. Please try again later.</p>
                </div>
            </div>
        );
    }

    if (videoType === 'live' && videoStatus !== 'live') {
        return (
            <div className={`flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white ${className}`}>
                <div className="text-center p-8">
                    <div className="relative inline-block mb-4">
                        <svg className="w-20 h-20 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 flex h-6 w-6">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500 items-center justify-center text-xs font-bold">
                                LIVE
                            </span>
                        </span>
                    </div>
                    <p className="text-xl font-bold mb-2">Stream Scheduled</p>
                    <p className="text-gray-400">Waiting for instructor to start the live session...</p>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    // Render the video player
    return (
        <div className={`relative ${className}`}>
            {videoType === 'live' && videoStatus === 'live' && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    <span>LIVE</span>
                </div>
            )}
            <iframe
                ref={iframeRef}
                src={embedUrl}
                loading="lazy"
                style={{
                    border: 0,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                onError={() => setError('Failed to load video player')}
            />
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
