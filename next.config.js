module.exports = () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
    images: {
      domains: ['images.ctfassets.net'],
    },
  };
  return nextConfig;
};
