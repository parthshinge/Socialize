import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['prisma', '@prisma/client'],
  outputFileTracingIncludes: {
    '/**/*': ['./prisma/**/*'],
  },
};

export default nextConfig;
