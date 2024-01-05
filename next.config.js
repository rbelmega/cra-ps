/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.cdninstagram.com',
            },
        ],
    },
}

module.exports = nextConfig
