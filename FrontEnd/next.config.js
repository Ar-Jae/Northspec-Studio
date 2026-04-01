/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Prevent @daily-co/daily-js from being bundled server-side — it uses
  // browser-only APIs (WASM, Web Workers) and must stay client-only.
  serverExternalPackages: ['@vapi-ai/web', '@daily-co/daily-js'],
  // Empty turbopack config satisfies Vercel's check when a webpack config is present
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Silence the Krisp WASM unload warning that fires when a Vapi call ends
      // before the noise-cancellation worker has finished initialising.
      config.ignoreWarnings = [
        ...(config.ignoreWarnings ?? []),
        { message: /WASM_OR_WORKER_NOT_READY/ },
      ];
    }
    return config;
  },
};

module.exports = nextConfig;
