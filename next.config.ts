const isProd = process.env.NODE_ENV === 'production';

export default {
  reactStrictMode: true,
  // 開発中は export を無効化し、本番のみ有効化
  ...(isProd ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/images/logo/logo.png',
      },
    ];
  }
};
