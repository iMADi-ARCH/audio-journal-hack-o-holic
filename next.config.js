/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "azppojdvcikumhfzoblk.supabase.co",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
