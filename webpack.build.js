const merge = require('webpack-merge');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const argv = require('yargs').argv;
const prod = require('./webpack.prod.js');

const isCompress = argv.compress;

const additionalPlugins = isCompress ? [
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    cache: true,
    deleteOriginalAssets: false
  }),
  new HtmlWebpackChangeAssetsExtensionPlugin()
] : [];

module.exports = merge(prod, {
  plugins: [
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, './build'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      penthouse: {
        blockJSRequests: false,
      }
    }),
    ...additionalPlugins
  ]
});
