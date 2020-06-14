const merge = require('webpack-merge');

const common = require('./config/webpack.config.common');
const partial =
  process.env.NODE_ENV === 'production'
    ? require('./config/webpack.config.prod')
    : require('./config/webpack.config.dev');

module.exports = merge.smart(common, partial);
