/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const repo = 'WikiGolf'

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
}

module.exports = nextConfig
