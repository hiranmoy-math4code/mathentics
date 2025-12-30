/**
 * Tenant Utility
 * 
 * This file provides utilities to get the current tenant ID from environment variables.
 * Since each tenant has a separate deployment, the tenant ID is set at build time.
 * 
 * Benefits:
 * - Zero database queries for tenant lookup
 * - Instant tenant ID access
 * - Better security (no runtime tenant switching)
 * - Simpler architecture (no context, no caching)
 */

/**
 * Get the current tenant ID from environment variable
 * This is set at build time for single-tenant deployments
 * 
 * @returns {string} The tenant ID
 * @throws {Error} If NEXT_PUBLIC_TENANT_ID is not set
 */
export function getTenantId(): string {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

    if (!tenantId) {
        throw new Error(
            'NEXT_PUBLIC_TENANT_ID is not set in environment variables. ' +
            'Please add it to your .env.local file.\n' +
            'Example: NEXT_PUBLIC_TENANT_ID=f9c03969-da89-4d2e-92eb-029490268453'
        );
    }

    return tenantId;
}

/**
 * Client-side hook to get tenant ID
 * Can be used in React components
 * 
 * @returns {string} The tenant ID
 */
export function useTenantId(): string {
    return getTenantId();
}

/**
 * Check if tenant ID is configured
 * Useful for conditional rendering or error handling
 * 
 * @returns {boolean} True if tenant ID is set
 */
export function hasTenantId(): boolean {
    return !!process.env.NEXT_PUBLIC_TENANT_ID;
}
