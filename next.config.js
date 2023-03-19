/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  //Webpack workaround for konva library to work
  webpack: (config) => {
    config.externals = {
      canvas: "canvas",
    };
    return config;
  },
  experimental: {
    appDir: true,
  },
};
