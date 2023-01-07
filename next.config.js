module.exports = (phase, { defaultConfig }) => {
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
    staticPageGenerationTimeout: 1000,
  };
  return nextConfig;
};
