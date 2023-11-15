/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = (phase, { defaultConfig, webpack }) => {
  return {
    ...defaultConfig,
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
      });

      return config;
    },
  };
};