export default {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/hp' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hp' : '',
  images: {
    unoptimized: true
  }
};
