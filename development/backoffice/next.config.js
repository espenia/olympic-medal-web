/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
      },
      experimental: {
        serverActions: true,
        externalDir: true
      },
}

module.exports = nextConfig
