const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common.config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: common.d('./dist'),
    },
    port: 9527,
  },
});
