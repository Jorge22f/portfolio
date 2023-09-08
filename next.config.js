/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    images: {
        domains: [
          'lh3.googleusercontent.com',
          'portfolio-jorge22f.vercel.app',
          'jorge-eslava-portfolio-files.s3.us-west-2.amazonaws.com',
          'd307jebhoooaa5.cloudfront.net'
        ],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig
