import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      trailingSlash: true,
      basePath: '/elite-performance-nutrition-hn',
      images: {
        unoptimized: true,
      },
    }
  : {};

export default nextConfig;

