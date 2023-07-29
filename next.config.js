/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    env: {
        PUBLIC_GOOGLE_ANALYTICS_V4: process.env.PUBLIC_GOOGLE_ANALYTICS_V4
    }
}

module.exports = nextConfig