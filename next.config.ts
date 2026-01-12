// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactCompiler: true,
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.imgur.com",
//       },
//     ],
//   },
// };
// export default nextConfig;





// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,

//   experimental: {
//     serverActions: {
//       bodySizeLimit: "2mb",
//       allowedOrigins: []
//     },
//     cacheComponents: true
//   },

//   images: {
//     domains: ["i.imgur.com"]
//   },

//   transpilePackages: ["@supabase/supabase-js"]
// };

// export default nextConfig; 

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb"
    }
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com"
      }
    ]
  },

  transpilePackages: ["@supabase/supabase-js"]
};

export default nextConfig;