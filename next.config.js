module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: ['images.ctfassets.net'],
    },
  };
  return nextConfig;
};
