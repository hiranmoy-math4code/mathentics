/**
 * ============================================================================
 * ADMIN PAYMENT GATEWAY SETTINGS PAGE
 * ============================================================================
 * Admin এখানে PhonePe বা Cashfree configure করতে পারবে
 * ============================================================================
 */

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

type GatewayType = 'phonepe' | 'cashfree';

interface GatewaySettings {
    id?: string;
    gateway_type: GatewayType;
    is_active: boolean;
    phonepe_merchant_id?: string;
    phonepe_client_id?: string;
    phonepe_client_secret?: string;
    phonepe_client_version?: string;
    phonepe_environment?: 'preprod' | 'production';
    cashfree_app_id?: string;
    cashfree_secret_key?: string;
    cashfree_environment?: 'sandbox' | 'production';
}

export default function PaymentGatewaySettingsPage() {
    const [selectedGateway, setSelectedGateway] = useState<GatewayType>('phonepe');
    const [settings, setSettings] = useState<GatewaySettings>({
        gateway_type: 'phonepe',
        is_active: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [testing, setTesting] = useState(false);

    const supabase = createClient();

    // Load existing settings
    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        try {
            const { data, error } = await supabase
                .from('payment_gateway_settings')
                .select('*')
                .maybeSingle();

            if (data) {
                setSettings(data);
                setSelectedGateway(data.gateway_type);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        setSaving(true);
        try {
            // Get current user's tenant_id
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error('User not authenticated');
                return;
            }

            // Get user's tenant membership
            const { data: membership } = await supabase
                .from('user_tenant_memberships')
                .select('tenant_id')
                .eq('user_id', user.id)
                .eq('is_active', true)
                .single();

            if (!membership) {
                toast.error('No active tenant found');
                return;
            }

            const dataToSave = {
                gateway_type: selectedGateway,
                is_active: settings.is_active,
                tenant_id: membership.tenant_id, // Add tenant_id
                ...(selectedGateway === 'phonepe' && {
                    phonepe_merchant_id: settings.phonepe_merchant_id,
                    phonepe_client_id: settings.phonepe_client_id,
                    phonepe_client_secret: settings.phonepe_client_secret,
                    phonepe_client_version: settings.phonepe_client_version,
                    phonepe_environment: settings.phonepe_environment,
                }),
                ...(selectedGateway === 'cashfree' && {
                    cashfree_app_id: settings.cashfree_app_id,
                    cashfree_secret_key: settings.cashfree_secret_key,
                    cashfree_environment: settings.cashfree_environment,
                }),
            };

            // Use upsert to handle both insert and update, preventing duplicate tenant_id errors
            const { data, error } = await supabase
                .from('payment_gateway_settings')
                .upsert(dataToSave, { onConflict: 'tenant_id' })
                .select()
                .single();

            if (error) throw error;
            setSettings({ ...settings, id: data.id });

            toast.success('Payment gateway settings saved successfully!');
            loadSettings();
        } catch (error: any) {
            console.error('Error saving settings:', error);
            toast.error(error.message || 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    }

    async function handleTest() {
        setTesting(true);
        try {
            const response = await fetch('/api/admin/payment-gateway/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gateway_type: selectedGateway,
                    ...(selectedGateway === 'phonepe' && {
                        phonepe_merchant_id: settings.phonepe_merchant_id,
                        phonepe_client_id: settings.phonepe_client_id,
                        phonepe_client_secret: settings.phonepe_client_secret,
                        phonepe_client_version: settings.phonepe_client_version,
                        phonepe_environment: settings.phonepe_environment,
                    }),
                    ...(selectedGateway === 'cashfree' && {
                        cashfree_app_id: settings.cashfree_app_id,
                        cashfree_secret_key: settings.cashfree_secret_key,
                        cashfree_environment: settings.cashfree_environment,
                    }),
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Connection test successful!');
            } else {
                toast.error(result.error || 'Connection test failed');
            }
        } catch (error: any) {
            toast.error('Connection test failed');
        } finally {
            setTesting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Payment Gateway Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Configure PhonePe or Cashfree payment gateway for your platform
                </p>
            </div>

            {/* Gateway Selection */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Select Payment Gateway</CardTitle>
                    <CardDescription>Choose which payment gateway you want to use</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setSelectedGateway('phonepe')}
                            className={`p-6 border-2 rounded-lg transition-all ${selectedGateway === 'phonepe'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-2">PhonePe</div>
                                <div className="text-sm text-muted-foreground">
                                    Popular UPI payment gateway
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => setSelectedGateway('cashfree')}
                            className={`p-6 border-2 rounded-lg transition-all ${selectedGateway === 'cashfree'
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold mb-2">Cashfree</div>
                                <div className="text-sm text-muted-foreground">
                                    Complete payment solution
                                </div>
                            </div>
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* PhonePe Configuration */}
            {selectedGateway === 'phonepe' && (
                <Card>
                    <CardHeader>
                        <CardTitle>PhonePe Configuration</CardTitle>
                        <CardDescription>Enter your PhonePe API credentials</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="phonepe_merchant_id">Merchant ID</Label>
                            <Input
                                id="phonepe_merchant_id"
                                value={settings.phonepe_merchant_id || ''}
                                onChange={(e) =>
                                    setSettings({ ...settings, phonepe_merchant_id: e.target.value })
                                }
                                placeholder="M232JQ16HLYZR"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phonepe_client_id">Client ID</Label>
                            <Input
                                id="phonepe_client_id"
                                value={settings.phonepe_client_id || ''}
                                onChange={(e) =>
                                    setSettings({ ...settings, phonepe_client_id: e.target.value })
                                }
                                placeholder="M232JQ16HLYZR_2511190912"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phonepe_client_secret">Client Secret</Label>
                            <Input
                                id="phonepe_client_secret"
                                type="password"
                                value={settings.phonepe_client_secret || ''}
                                onChange={(e) =>
                                    setSettings({ ...settings, phonepe_client_secret: e.target.value })
                                }
                                placeholder="Enter client secret"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phonepe_client_version">Client Version</Label>
                            <Input
                                id="phonepe_client_version"
                                value={settings.phonepe_client_version || '1'}
                                onChange={(e) =>
                                    setSettings({ ...settings, phonepe_client_version: e.target.value })
                                }
                                placeholder="1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phonepe_environment">Environment</Label>
                            <select
                                id="phonepe_environment"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                value={settings.phonepe_environment || 'preprod'}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        phonepe_environment: e.target.value as 'preprod' | 'production',
                                    })
                                }
                            >
                                <option value="preprod">Preprod (Testing)</option>
                                <option value="production">Production (Live)</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Cashfree Configuration */}
            {selectedGateway === 'cashfree' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Cashfree Configuration</CardTitle>
                        <CardDescription>Enter your Cashfree API credentials</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="cashfree_app_id">App ID</Label>
                            <Input
                                id="cashfree_app_id"
                                value={settings.cashfree_app_id || ''}
                                onChange={(e) =>
                                    setSettings({ ...settings, cashfree_app_id: e.target.value })
                                }
                                placeholder="TEST109381884300eef511d1e9be3e4a88183901"
                            />
                        </div>

                        <div>
                            <Label htmlFor="cashfree_secret_key">Secret Key</Label>
                            <Input
                                id="cashfree_secret_key"
                                type="password"
                                value={settings.cashfree_secret_key || ''}
                                onChange={(e) =>
                                    setSettings({ ...settings, cashfree_secret_key: e.target.value })
                                }
                                placeholder="cfsk_ma_test_..."
                            />
                        </div>

                        <div>
                            <Label htmlFor="cashfree_environment">Environment</Label>
                            <select
                                id="cashfree_environment"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                value={settings.cashfree_environment || 'sandbox'}
                                onChange={(e) =>
                                    setSettings({
                                        ...settings,
                                        cashfree_environment: e.target.value as 'sandbox' | 'production',
                                    })
                                }
                            >
                                <option value="sandbox">Sandbox (Testing)</option>
                                <option value="production">Production (Live)</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Webhook Configuration Info */}
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Webhook Configuration
                    </CardTitle>
                    <CardDescription>
                        Configure this URL in your {selectedGateway === 'phonepe' ? 'PhonePe' : 'Cashfree'} dashboard to receive payment notifications
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
                        <Label className="text-sm font-medium mb-2 block">Callback URL</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                readOnly
                                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/api/payments/callback`}
                                className="font-mono text-sm bg-gray-50 dark:bg-gray-800"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/api/payments/callback`;
                                    navigator.clipboard.writeText(url);
                                    toast.success('Webhook URL copied to clipboard!');
                                }}
                            >
                                Copy
                            </Button>
                        </div>
                    </div>

                    {selectedGateway === 'cashfree' && (
                        <div className="text-sm space-y-2 text-muted-foreground">
                            <p className="font-medium text-foreground">📋 Cashfree Setup Instructions:</p>
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Login to <a href="https://merchant.cashfree.com/" target="_blank" className="text-blue-600 hover:underline">Cashfree Merchant Dashboard</a></li>
                                <li>Go to <strong>Developers → Webhooks</strong></li>
                                <li>Click "Add Webhook" and paste the URL above</li>
                                <li>Enable event: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">PAYMENT_SUCCESS_WEBHOOK</code></li>
                                <li>Save and copy the webhook secret (for signature verification)</li>
                            </ol>
                        </div>
                    )}

                    {selectedGateway === 'phonepe' && (
                        <div className="text-sm space-y-2 text-muted-foreground">
                            <p className="font-medium text-foreground">📋 PhonePe Setup Instructions:</p>
                            <ol className="list-decimal list-inside space-y-1 ml-2">
                                <li>Login to PhonePe Merchant Dashboard</li>
                                <li>Go to <strong>API Configuration → Webhooks</strong></li>
                                <li>Set Callback URL to the URL above</li>
                                <li>Enable notifications for: <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">Payment Success</code>, <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">Payment Failed</code></li>
                                <li>Save the configuration</li>
                            </ol>
                        </div>
                    )}

                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            ⚠️ <strong>Important:</strong> Webhooks ensure payments are processed even if users close their browser. Without webhooks, payments may succeed but enrollments won't be created.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={settings.is_active}
                        onChange={(e) => setSettings({ ...settings, is_active: e.target.checked })}
                        className="h-4 w-4"
                    />
                    <Label htmlFor="is_active" className="cursor-pointer">
                        Activate this gateway
                    </Label>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleTest} disabled={testing}>
                        {testing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Test Connection
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}
