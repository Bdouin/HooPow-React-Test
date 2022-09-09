/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true
}

//module.exports = nextConfig
module.exports = {
  images: {
    domains: ['d2hkgoif6etp77.cloudfront.net']
  }
}
