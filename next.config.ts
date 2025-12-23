import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 🚀 Cloudflare Optimizations

    turbopack: {},
    reactStrictMode: true,
    // Skip not-found generation
    skipTrailingSlashRedirect: true,

    // ✅ Webpack Config for Cloudflare (সবচেয়ে গুরুত্বপূর্ণ অংশ)
    // এটি নিশ্চিত করে যে ভারী Node.js মডিউলগুলো ক্লায়েন্ট বা এজ বান্ডলে ঢুকবে না
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                child_process: false,
                dns: false,
            };
        }
        return config;
    },

    compress: true, // Enable gzip compression

    // Image optimization
    images: {
        // ⚠️ Cloudflare Warning:
        // Cloudflare ফ্রি টিয়ারে ডিফল্ট Next.js Image Optimization (sharp) কাজ করে না।
        // যদি ডিপ্লয় করার পর দেখেন ইমেজ লোড হচ্ছে না, তবে নিচের লাইনটি আনকমেন্ট করবেন:
        // unoptimized: true, 

        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
            {
                protocol: 'https',
                hostname: 'avgmafkynfbynzhlbbpk.supabase.co',
            },
        ],
    },

    // Experimental features for better performance
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts', '@tabler/icons-react'],
    },
    transpilePackages: ['lucide-react', 'framer-motion', '@tabler/icons-react'],

    // Headers for caching and security
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;