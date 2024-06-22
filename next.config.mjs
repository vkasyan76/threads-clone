/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

const nextConfig = {
  // experimental: {
  //   serverActions: true,
  //   serverComponentsExternalPackages: ["mongoose"],
  // },

  // Warning: This allows production builds to successfully complete even if
  // your project has typescript errors.
  // typescript: {
  //   ignoreDuringBuilds: true,
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

// module.exports = nextConfig;

export default nextConfig;
