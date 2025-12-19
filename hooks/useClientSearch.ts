/**
 * Client-Side Search Hook with Zero-Jank Performance
 * 
 * Uses useDeferredValue to ensure UI remains responsive
 * even with large datasets (hundreds of items)
 */

'use client';

import { useMemo, useDeferredValue } from 'react';

interface UseClientSearchOptions<T> {
    data: T[] | undefined;
    searchTerm: string;
    searchFields: (keyof T)[];
}

export function useClientSearch<T>({
    data,
    searchTerm,
    searchFields,
}: UseClientSearchOptions<T>) {
    // ⚡ ZERO-JANK: Defer search term to prevent UI blocking
    const deferredSearchTerm = useDeferredValue(searchTerm);

    // Memoized filtering for performance
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!deferredSearchTerm.trim()) return data;

        const lowerSearch = deferredSearchTerm.toLowerCase();

        return data.filter((item) => {
            return searchFields.some((field) => {
                const value = item[field];
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(lowerSearch);
                }
                return false;
            });
        });
    }, [data, deferredSearchTerm, searchFields]);

    // Show loading indicator when deferred value lags behind
    const isSearching = searchTerm !== deferredSearchTerm;

    return {
        filteredData,
        isSearching, // Use this to show subtle loading indicator
    };
}
