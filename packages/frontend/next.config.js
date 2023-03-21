/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    appDir: true,
    esmExternals: false,
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
    outputStandalone: true,
    allowMiddlewareResponseBody: true
  },
  images: {
    remotePatterns: [{ hostname: 'loremflickr.com' }]
  }
}

module.exports = nextConfig
