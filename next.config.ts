import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingRoot: __dirname,
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable type checking for blockchain folder
  typescript: {
    tsconfigPath: './tsconfig.json',
    // Ignore blockchain folder which has its own tsconfig
  },
  
  // Fix for MetaMask SDK React Native dependency issue
  webpack: (config) => {
    // Mock the React Native async storage module for browser environments
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };

    // Exclude blockchain folder from webpack
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /blockchain/,
    });
    
    return config;
  },
};

export default nextConfig;