/**
 * Resilient Parallel Fetching Utilities
 * 
 * Provides utilities for parallel data fetching with graceful error handling.
 * Use fetchCritical() for data that MUST succeed, and fetchOptional() for
 * data that can fail without breaking the page.
 */

/**
 * Fetch critical data that must all succeed together.
 * If any promise fails, the entire operation fails.
 * 
 * @example
 * const [course, user] = await fetchCritical([
 *   supabase.from('courses').select('*').eq('id', id).single(),
 *   supabase.from('profiles').select('*').eq('id', userId).single()
 * ]);
 */
export async function fetchCritical<T>(promises: Promise<T>[]): Promise<T[]> {
    return Promise.all(promises);
}

/**
 * Fetch optional data that can fail gracefully.
 * Returns null for failed promises instead of throwing.
 * 
 * @example
 * const [reviews, analytics] = await fetchOptional([
 *   supabase.from('reviews').select('*'),
 *   supabase.from('analytics').select('*')
 * ]);
 * // reviews or analytics can be null if the query failed
 */
export async function fetchOptional<T>(promises: Promise<T>[]): Promise<(T | null)[]> {
    const results = await Promise.allSettled(promises);
    return results.map(r => r.status === 'fulfilled' ? r.value : null);
}

/**
 * Type-safe wrapper for Supabase query results with resilient fetching
 */
export type SupabaseResult<T> = { data: T | null; error: any };

/**
 * Extract data from Supabase results with fallback
 */
export function extractData<T>(result: SupabaseResult<T>, fallback: T): T {
    return result.data ?? fallback;
}

/**
 * Extract data from Supabase results or throw if error
 */
export function extractDataOrThrow<T>(result: SupabaseResult<T>, errorMessage?: string): T {
    if (result.error) {
        throw new Error(errorMessage || result.error.message);
    }
    if (!result.data) {
        throw new Error(errorMessage || 'No data returned');
    }
    return result.data;
}
