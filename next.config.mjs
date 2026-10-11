/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 2678400, remotePatterns: [
    { protocol: "https", hostname: "image.tmdb.org" },
    { protocol: "https", hostname: "i.discogs.com" },
  ] },
};
export default nextConfig;
