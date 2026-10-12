import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      trailingSlash: true,
      ...(basePath ? { basePath } : {}),
      images: {
        unoptimized: true,
      },
    }
  : {};

export default nextConfig;
