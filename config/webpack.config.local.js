const merge = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prod = require('./webpack.config.prod');

const local = {
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = merge.smart(prod, local);
