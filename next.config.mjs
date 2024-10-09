/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: [
            "localhost:3000", "expert-barnacle-wr7jgjx9g7vxhx6j-3000.app.github.dev"
          ],
        },
      },
};

export default nextConfig;
