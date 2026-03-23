import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/quicklist-ai",
  images: { unoptimized: true },
};

export default nextConfig;
