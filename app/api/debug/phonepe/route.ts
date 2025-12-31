import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = 'edge';

export async function GET(req: Request) {
    try {
        const supabase = await createClient();

        // 1. Get the default 'math4code' tenant
        // (Adjust this if you need to debug a specific tenant)
        const { data: defaultTenant } = await supabase
            .from('tenants')
            .select('id')
            .eq('slug', 'math4code')
            .single();

        if (!defaultTenant) {
            return NextResponse.json({ error: "Default tenant 'math4code' not found" }, { status: 404 });
        }

        // 2. Get Payment Settings
        const { data: gateway, error } = await supabase
            .from('payment_gateway_settings')
            .select('*')
            .eq('tenant_id', defaultTenant.id)
            .eq('is_active', true)
            .single();

        if (error || !gateway) {
            return NextResponse.json({ error: "Gateway settings not found", details: error }, { status: 404 });
        }

        // 3. Construct Config from DB
        const config = {
            merchantId: gateway.phonepe_merchant_id,
            clientId: gateway.phonepe_client_id,
            clientSecret: gateway.phonepe_client_secret ? "***SECRET***" : "MISSING", // Mask for security in initial log
            clientVersion: gateway.phonepe_client_version || 1,
            environment: gateway.phonepe_environment
        };

        const isProd = config.environment === 'production' || config.environment === 'prod';
        const OAUTH_BASE = isProd
            ? 'https://api.phonepe.com/apis/identity-manager'
            : 'https://api-preprod.phonepe.com/apis/pg-sandbox';

        const url = `${OAUTH_BASE}/v1/oauth/token`;

        // 4. Prepare Actual Request
        const params = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: gateway.phonepe_client_id || gateway.phonepe_merchant_id, // Fallback logic same as phonepe.ts
            client_secret: gateway.phonepe_client_secret,
            client_version: (gateway.phonepe_client_version || 1).toString()
        });

        console.log("🔍 Debugging PhonePe Token Generation...");
        console.log("   URL:", url);
        console.log("   ClientID:", params.get('client_id'));
        console.log("   ClientVersion:", params.get('client_version'));
        console.log("   Environment:", config.environment);

        // 5. Execute Fetch
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params,
            cache: "no-store"
        });

        const status = response.status;
        const responseText = await response.text();

        let responseJson;
        try {
            responseJson = JSON.parse(responseText);
        } catch (e) {
            responseJson = { raw: responseText };
        }

        return NextResponse.json({
            status: "Debug Run Complete",
            requestConfig: config,
            endpoint: url,
            responseStatus: status,
            responseBody: responseJson
        });

    } catch (error: any) {
        return NextResponse.json({
            error: "Internal Debug Error",
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
