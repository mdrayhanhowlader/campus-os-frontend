/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
    // Serve optimized WebP/AVIF automatically → smaller payloads
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    // Tree-shake large icon/chart libs — only bundle what's imported
    optimizePackageImports: ['lucide-react', 'recharts', '@radix-ui/react-icons'],
    // Keep server components lightweight by inlining small CSS modules
    serverMinification: true,
  },

  // Compress all responses with gzip/brotli at the Next.js layer
  compress: true,

  // Strict mode catches re-render bugs early → fewer runtime surprises
  reactStrictMode: true,

  // Strong caching for static assets (fonts, images, JS chunks)
  // _next/static is fingerprinted → safe to cache forever
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
