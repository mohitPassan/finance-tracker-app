/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*", // Matches `/api/auth` requests
                destination: "/api/auth/:path*", // Keeps these requests within Next.js
            },
            {
                source: "/api/:path*", // Matches other `/api/*` requests
                destination: `${process.env.SERVER_URL}/api/:path*`, // Redirects non-auth API requests to your server
            },
        ];
    },
};

export default nextConfig;
