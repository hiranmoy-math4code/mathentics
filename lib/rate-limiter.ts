/**
 * ============================================================================
 * SIMPLE RATE LIMITER (No External Dependencies)
 * ============================================================================
 * Purpose: Prevent payment API abuse and DDoS attacks
 * Strategy: In-memory sliding window (suitable for single-instance deployments)
 * 
 * For production with multiple instances, consider:
 * - Upstash Redis (@upstash/ratelimit)
 * - Vercel Edge Config
 * - Cloudflare Workers KV
 * ============================================================================
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

class SimpleRateLimiter {
    private cache: Map<string, RateLimitEntry> = new Map();
    private readonly maxRequests: number;
    private readonly windowMs: number;
    private readonly cleanupInterval: NodeJS.Timeout;

    constructor(maxRequests: number = 5, windowMinutes: number = 1) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMinutes * 60 * 1000;

        // Cleanup old entries every 5 minutes
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 5 * 60 * 1000);
    }

    /**
     * Check if request is allowed
     * @param identifier - User ID or IP address
     * @returns { allowed: boolean, remaining: number, resetTime: number }
     */
    check(identifier: string): {
        allowed: boolean;
        remaining: number;
        resetTime: number;
    } {
        const now = Date.now();
        const entry = this.cache.get(identifier);

        // No entry or window expired - allow request
        if (!entry || now > entry.resetTime) {
            const resetTime = now + this.windowMs;
            this.cache.set(identifier, {
                count: 1,
                resetTime,
            });

            return {
                allowed: true,
                remaining: this.maxRequests - 1,
                resetTime,
            };
        }

        // Within window - check count
        if (entry.count < this.maxRequests) {
            entry.count++;
            this.cache.set(identifier, entry);

            return {
                allowed: true,
                remaining: this.maxRequests - entry.count,
                resetTime: entry.resetTime,
            };
        }

        // Rate limit exceeded
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    /**
     * Cleanup expired entries
     */
    private cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.resetTime) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Get current cache size (for monitoring)
     */
    getSize(): number {
        return this.cache.size;
    }

    /**
     * Clear all entries (for testing)
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Cleanup on shutdown
     */
    destroy() {
        clearInterval(this.cleanupInterval);
        this.cache.clear();
    }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

// Payment initiation: 5 requests per minute per user
export const paymentRateLimiter = new SimpleRateLimiter(5, 1);

// Payment verification: 10 requests per minute per user (more lenient)
export const verificationRateLimiter = new SimpleRateLimiter(10, 1);

// ============================================================================
// HELPER FUNCTION
// ============================================================================

/**
 * Get identifier for rate limiting
 * Priority: User ID > IP Address
 */
export function getRateLimitIdentifier(
    userId: string | null,
    request: Request
): string {
    if (userId) {
        return `user:${userId}`;
    }

    // Fallback to IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    return `ip:${ip}`;
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
import { paymentRateLimiter, getRateLimitIdentifier } from "@/lib/rate-limiter";

export async function POST(request: NextRequest) {
    const { data: { user } } = await supabase.auth.getUser();
    const identifier = getRateLimitIdentifier(user?.id || null, request);
    
    const { allowed, remaining, resetTime } = paymentRateLimiter.check(identifier);
    
    if (!allowed) {
        const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
        return NextResponse.json(
            { 
                error: "Too many payment attempts. Please try again later.",
                retryAfter 
            },
            { 
                status: 429,
                headers: {
                    'Retry-After': retryAfter.toString(),
                    'X-RateLimit-Limit': '5',
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': new Date(resetTime).toISOString(),
                }
            }
        );
    }
    
    // Add rate limit headers to successful responses
    const response = NextResponse.json({ success: true });
    response.headers.set('X-RateLimit-Limit', '5');
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(resetTime).toISOString());
    
    return response;
}
*/
