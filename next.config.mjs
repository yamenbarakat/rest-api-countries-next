/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // List the external domains you want to allow
    remotePatterns: [
      {
        protocol: "https", // Ensure the protocol matches (https or http)
        hostname: "flagcdn.com", // The domain name where your images are hosted
        // port: '', // Optional: Use if the images are served on a non-standard port
        // pathname: '/**', // Optional: Use if you need to restrict paths
      },
      // 2. NEW entry for Wikimedia images
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        // Wikimedia often uses complex path structures,
        // using 'pathname' ensures it covers the full URL structure
        pathname: "/wikipedia/commons/thumb/**",
      },
    ],
  },
};

export default nextConfig;
