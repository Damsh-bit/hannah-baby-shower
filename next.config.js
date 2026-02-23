/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'i.imgur.com' },
            { protocol: 'https', hostname: 'imgur.com' },
            { protocol: 'https', hostname: 'http2.mlstatic.com' },
            { protocol: 'https', hostname: 'mlstatic.com' },
            { protocol: 'https', hostname: '**.supabase.co' },
            { protocol: 'https', hostname: '**.supabase.in' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'http', hostname: '**' },
            { protocol: 'https', hostname: '**' },
        ],
    },
}

module.exports = nextConfig
