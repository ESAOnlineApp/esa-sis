const nextTranslate = require('next-translate');
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  images: {
    deviceSizes: [320, 420, 768, 1024, 1200], // Specify the sizes of the images you want to optimize
    // domains: ['res.cloudinary.com'],
    domains: ['localhost','res.cloudinary.com', 'esasis.esa.edu.lb','80.77.180.245'],

     },

  swcMinify: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  ...nextTranslate(),
  publicRuntimeConfig: {
    ENCRYPT_SECRET_KEY:
      '3H}.+z]M+QLA:)*&)&6m6HnD>87/B%^ftd"!jMu4Pm]UUW0$nUaH.NZ.d1s6T9-',
  },
  rewrites: () => [
    {
      source: '/file/:path*', // Add a dynamic parameter in the source
      destination: 'http://localhost:3002/:path*', // Append the dynamic parameter to the destination
    },
  ],
};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// const withSourceMaps = require('@zeit/next-source-maps');
// module.exports = withSourceMaps({
//   devtool: 'source-map',
// });

module.exports = withBundleAnalyzer(nextConfig);
