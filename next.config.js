/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    experimental: {
      webpackBuildWorker: true,
      parallelServerBuildTraces: true,
      parallelServerCompiles: true,
    }
}

module.exports = nextConfig 