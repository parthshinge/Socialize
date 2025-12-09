import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['prisma', '@prisma/client'],
  outputFileTracingIncludes: {
    '/api/**/*': ['./prisma/**/*'],
  },
};

export default nextConfig;
