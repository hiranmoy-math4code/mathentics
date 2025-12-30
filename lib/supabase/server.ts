import { createServerClient } from "@supabase/ssr"
import { cookies, headers } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The "setAll" method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    },
  )
}

// ============================================================================
// MULTI-TENANT: Tenant-aware client that sets RLS context
// ============================================================================
export async function createTenantClient() {
  const headersList = await headers()
  const tenantId = headersList.get('x-tenant-id')

  if (!tenantId) {
    throw new Error('Tenant context missing - middleware may have failed')
  }

  const supabase = await createClient()

  // Set tenant context for RLS via PostgreSQL session variable
  // This makes auth.tenant_id() function work correctly
  try {
    await supabase.rpc('set_config', {
      setting: 'request.headers.x-tenant-id',
      value: tenantId
    })
  } catch (error) {
    // set_config may not exist yet, RLS will still work via header
    console.warn('Could not set tenant context via RPC:', error)
  }

  return supabase
}
