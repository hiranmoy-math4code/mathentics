import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = 'edge';

/**
 * OAuth Callback Handler
 * Handles Google OAuth redirects and ensures complete user setup
 * 
 * CRITICAL: This route must:
 * 1. Create user profile if missing
 * 2. Create tenant membership for new users
 * 3. Initialize user_rewards
 * 4. Handle all edge cases gracefully
 */
export async function GET(request: NextRequest) {
    const { searchParams, origin, hash } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/student/dashboard";
    const tenantSlug = searchParams.get("tenant_slug"); // Passed from login page

    // Supabase can send type in query params OR in hash fragment
    let type = searchParams.get("type");

    // If not in query params, check hash fragment
    if (!type && hash) {
        const hashParams = new URLSearchParams(hash.substring(1));
        type = hashParams.get("type");
    }

    if (code) {
        const supabase = await createClient();
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Handle password recovery flow
            if (type === 'recovery') {
                return NextResponse.redirect(`${origin}/auth/reset-password`);
            }

            // Handle invitation flow
            if (type === 'invite') {
                return NextResponse.redirect(`${origin}/auth/reset-password`);
            }

            // ================================================================
            // SUCCESSFUL LOGIN - Ensure complete user setup
            // ================================================================
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                console.log(`[AUTH] User logged in: ${user.email}`);

                // ============================================================
                // STEP 1: Ensure profile exists
                // ============================================================
                const { data: existingProfile } = await supabase
                    .from("profiles")
                    .select("id, role")
                    .eq("id", user.id)
                    .single();

                let userRole = existingProfile?.role || "student";
                let isNewUser = false;

                if (!existingProfile) {
                    isNewUser = true;
                    console.log(`[AUTH] Creating new profile for ${user.email}`);

                    userRole = (user.user_metadata?.role as string) || "student";
                    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "Student";

                    const { error: insertError } = await supabase.from("profiles").insert({
                        id: user.id,
                        email: user.email,
                        full_name: fullName,
                        avatar_url: user.user_metadata?.avatar_url,
                        role: userRole
                    });

                    if (insertError) {
                        console.error(`[AUTH] Profile creation failed:`, insertError);
                        // Continue anyway - user is authenticated
                    } else {
                        console.log(`[AUTH] Profile created successfully`);
                    }
                }

                // ============================================================
                // STEP 2: Get tenant config (prioritize searchParams over env)
                // ============================================================
                const finalTenantId = process.env.NEXT_PUBLIC_TENANT_ID;
                const envTenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;

                // Priority for RPC call: searchParams > environment variable
                // Tenant ID always comes from environment
                const finalTenantSlug = tenantSlug || envTenantSlug;

                if (!finalTenantId || !finalTenantSlug) {
                    console.error(`[AUTH] Tenant configuration missing!`);
                    return NextResponse.redirect(`${origin}/auth/login?error=Configuration error. Please contact support.`);
                }

                console.log(`[AUTH] Assigning user to tenant: ${finalTenantSlug} (slug from ${tenantSlug ? 'searchParams' : 'ENV'})`);

                // Use RPC to assign user to tenant (same as email signup)
                try {
                    await supabase.rpc('assign_user_to_tenant', {
                        p_user_id: user.id,
                        p_tenant_slug: finalTenantSlug,
                        p_role: userRole
                    });
                    console.log(`[AUTH] RPC assign_user_to_tenant completed successfully`);
                } catch (rpcError) {
                    console.error('[AUTH] RPC failed:', rpcError);
                }


                // ============================================================
                // STEP 3: Ensure tenant membership exists (verify RPC worked)
                // ============================================================
                if (finalTenantId) {
                    const { data: existingMembership } = await supabase
                        .from('user_tenant_memberships')
                        .select('id, role')
                        .eq('user_id', user.id)
                        .eq('tenant_id', finalTenantId)
                        .single();

                    if (!existingMembership) {
                        console.log(`[AUTH] RPC didn't create membership, creating manually for ${user.email} in tenant ${finalTenantId}`);

                        const { error: membershipError } = await supabase
                            .from('user_tenant_memberships')
                            .insert({
                                user_id: user.id,
                                tenant_id: finalTenantId,
                                role: userRole,
                                is_active: true
                            });

                        if (membershipError) {
                            console.error(`[AUTH] Tenant membership creation failed:`, membershipError);
                        } else {
                            console.log(`[AUTH] Tenant membership created successfully`);
                        }
                    } else {
                        console.log(`[AUTH] Tenant membership already exists (RPC succeeded)`);
                    }
                } else {
                    console.warn(`[AUTH] No tenant ID available - user may have access issues`);
                }

                // ============================================================
                // STEP 4: Initialize user_rewards if new user
                // ============================================================
                if (isNewUser) {
                    const { data: existingRewards } = await supabase
                        .from('user_rewards')
                        .select('id')
                        .eq('user_id', user.id)
                        .single();

                    if (!existingRewards) {
                        console.log(`[AUTH] Initializing user_rewards for ${user.email}`);

                        const { error: rewardsError } = await supabase
                            .from('user_rewards')
                            .insert({
                                user_id: user.id,
                                total_coins: 0,
                                xp: 0,
                                level: 1,
                                current_streak: 0,
                                longest_streak: 0
                            });

                        if (rewardsError) {
                            console.error(`[AUTH] User rewards initialization failed:`, rewardsError);
                        } else {
                            console.log(`[AUTH] User rewards initialized successfully`);
                        }
                    }
                }

                // ============================================================
                // STEP 5: Determine redirect based on role
                // ============================================================
                const { data: memberships } = await supabase
                    .from('user_tenant_memberships')
                    .select('role, tenant_id, tenants(slug)')
                    .eq('user_id', user.id)
                    .eq('is_active', true);

                const isAdmin = memberships?.some(m =>
                    m.role === 'admin' || m.role === 'creator'
                );

                console.log(`[AUTH] Login complete for ${user.email}, isAdmin: ${isAdmin}`);

                if (isAdmin) {
                    return NextResponse.redirect(`${origin}/admin/dashboard`);
                }

                // For new users, always go to dashboard first
                if (isNewUser) {
                    return NextResponse.redirect(`${origin}/student/dashboard`);
                }

                return NextResponse.redirect(`${origin}${next}`);
            }
        } else {
            console.error(`[AUTH] Session exchange failed:`, error);
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/login?error=Could not authenticate user`);
}
