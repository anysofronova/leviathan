/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  },
  i18n: {
    localeDetection: true,
    locales: ['en', 'ua', 'ru'],
    defaultLocale: 'en'
  },
  swcMinify: true,
  poweredByHeader: false,
  experimental: {
    appDir: false,
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
