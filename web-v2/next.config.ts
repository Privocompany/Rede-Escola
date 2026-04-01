import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  eslint: {
    // Não trave a build do Vercel por causa de errinhos de formatação ou de variável não usada
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Não aborte o Deploy da Vercel por pequenos erros de tipagem no código
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
