/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.SERVER_URL}/api/:path*`,
                // Exclude paths that start with /api/auth
                has: [
                    {
                        type: "host",
                        key: "pathname",
                        value: "/api/(?!auth)",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
