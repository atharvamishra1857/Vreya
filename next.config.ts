// temporarily commented
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'cdn.shopify.com',
//         pathname: '**',
//       },
//     ],
//   },
// };

// export default nextConfig;

// temporary test
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // This wildcards allows ALL domains
//       },
//     ],
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Tells Next.js to build a static HTML version of your site
  output: 'export',
  
  // 2. Disables server-side image optimization (required for static export)
  images: {
    unoptimized: true,
  },

  // 3. IMPORTANT: If your GitHub repo is named "vreya", you MUST uncomment the line below 
  // and replace 'your-repo-name' with your actual repository name!
  basePath: '/Vreya', 
};

export default nextConfig;