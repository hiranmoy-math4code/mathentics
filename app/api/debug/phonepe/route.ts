import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = 'edge';

export async function GET(req: Request) {
    const checks: any = {
        env: {},
        supabase: {},
        gateway: {},
        phonepe: {}
    };

    try {
        // 1. Check Env Vars
        checks.env.SUPABASE_URL = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
        checks.env.SUPABASE_ANON_KEY = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        checks.env.POOLER_URL = !!process.env.SUPABASE_POOLER_URL;

        // 2. Check Supabase
        let supabase;
        try {
            supabase = await createClient();
            const { data, error } = await supabase.from('tenants').select('count', { count: 'exact', head: true });
            checks.supabase.connected = !error;
            checks.supabase.error = error;
        } catch (e: any) {
            checks.supabase.crashed = true;
            checks.supabase.message = e.message;
            throw new Error("Supabase Client Init Failed: " + e.message);
        }

        // 3. Get Gateway Settings
        const { data: defaultTenant } = await supabase
            .from('tenants')
            .select('id')
            .eq('slug', 'math4code')
            .single();

        if (!defaultTenant) throw new Error("Default tenant 'math4code' not found");

        const { data: gateway, error } = await supabase
            .from('payment_gateway_settings')
            .select('*')
            .eq('tenant_id', defaultTenant.id)
            .eq('is_active', true)
            .single();

        checks.gateway.found = !!gateway;
        if (error || !gateway) {
            checks.gateway.error = error;
            throw new Error("Gateway settings not found");
        }

        // 4. Test PhonePe
        const config = {
            merchantId: gateway.phonepe_merchant_id,
            clientId: gateway.phonepe_client_id,
            clientVersion: gateway.phonepe_client_version || 1,
            environment: gateway.phonepe_environment
        };
        checks.phonepe.config = config;

        const isProd = config.environment === 'production' || config.environment === 'prod';
        const OAUTH_BASE = isProd
            ? 'https://api.phonepe.com/apis/identity-manager'
            : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

        const url = `${OAUTH_BASE}/v1/oauth/token`;
        const params = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: gateway.phonepe_client_id || gateway.phonepe_merchant_id,
            client_secret: gateway.phonepe_client_secret, // Using real secret
            client_version: (gateway.phonepe_client_version || 1).toString()
        });

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(), // Explicit toString
            cache: "no-store"
        });

        checks.phonepe.status = response.status;
        checks.phonepe.body = await response.text();

        try {
            checks.phonepe.json = JSON.parse(checks.phonepe.body);
        } catch (e) { }

        return NextResponse.json({
            success: true,
            checks
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Debug Script Crashed / Failed",
            error: error.message,
            stack: error.stack,
            checks
        }, { status: 200 });
    }
}
