/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          bcrypt: false,
        };
      }
      return config;
    },
    experimental: {
      serverComponentsExternalPackages: ['bcrypt'],
    },
  };
  
  export default nextConfig;