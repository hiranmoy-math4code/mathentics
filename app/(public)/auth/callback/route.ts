import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = 'edge';



export async function GET(request: NextRequest) {
    const { searchParams, origin, hash } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/student/dashboard";

    // Supabase can send type in query params OR in hash fragment
    let type = searchParams.get("type");

    // If not in query params, check hash fragment
    if (!type && hash) {
        const hashParams = new URLSearchParams(hash.substring(1)); // Remove the # and parse
        type = hashParams.get("type");
    }

    if (code) {
        const supabase = await createClient();
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Check if this is a password recovery flow
            // Supabase adds type=recovery in the URL for password reset
            if (type === 'recovery') {

                return NextResponse.redirect(`${origin}/auth/reset-password`);
            }

            // Check if this is an invitation flow
            if (type === 'invite') {

                return NextResponse.redirect(`${origin}/auth/reset-password`);
            }

            // Successful login
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Production Safeguard: Ensure profile exists before redirecting
                // This replaces the need for unreliable SQL triggers or client-side syncs
                const { data: existingProfile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single();

                if (!existingProfile) {
                    // Profile missing? Create it immediately on the server.
                    // This is synchronous and ensures the user lands on the dashboard with data.
                    const role = (user.user_metadata?.role as string) || "student";
                    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "Student";

                    const { error: insertError } = await supabase.from("profiles").insert({
                        id: user.id,
                        email: user.email,
                        full_name: fullName,
                        avatar_url: user.user_metadata?.avatar_url,
                        role: role
                    });

                    if (insertError) {

                        // We continue anyway, as the user is authenticated. 
                        // The dashboard might handle the error or retry.
                    } else {
                        // Force a redirect to dashboard for new users
                        // This is safer than relying on 'next' which might be stale
                        return NextResponse.redirect(`${origin}/student/dashboard`);
                    }
                }

                // MULTI-TENANT: Check if user is admin in ANY tenant
                const { data: memberships, error: membershipError } = await supabase
                    .from('user_tenant_memberships')
                    .select('role, tenant_id, tenants(slug)')
                    .eq('user_id', user.id)
                    .eq('is_active', true);

                // If user is admin/creator in any tenant, redirect to admin dashboard
                const isAdmin = memberships?.some(m =>
                    m.role === 'admin' || m.role === 'creator'
                );

                if (isAdmin) {
                    return NextResponse.redirect(`${origin}/admin/dashboard`);
                }
            }

            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/login?error=Could not authenticate user`);
}
