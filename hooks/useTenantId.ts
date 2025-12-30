"use client";

/**
 * Tenant Context Hook for Client-Side Components
 * 
 * This hook provides the tenant ID to client components.
 * It uses NEXT_PUBLIC_TENANT_ID from environment variables.
 * 
 * Usage:
 * const tenantId = useTenantId();
 */
export function useTenantId(): string | null {
    // Get tenant ID from environment variable
    // This is set in .env.local as NEXT_PUBLIC_TENANT_ID
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

    if (!tenantId) {
        console.warn('⚠️ NEXT_PUBLIC_TENANT_ID not configured. Reward system may not work on Cloudflare.');
        return null;
    }

    return tenantId;
}
