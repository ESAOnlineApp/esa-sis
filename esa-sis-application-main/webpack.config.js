const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  // optimization: {
  //   usedExports: true,
  // },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,
            // drop_console: true, // Commented out for debugging purposes
          },
          // mangle: {
          //   reserved: ['foo', 'bar'],
          // },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};
