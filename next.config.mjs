/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'larwwujxqqdbwulkghcc.supabase.co',
      },
    ],
  },
};

export default nextConfig;
