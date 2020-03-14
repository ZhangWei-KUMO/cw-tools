
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = function getWebpackConfig() {
  const plugins = [new ProgressBarPlugin()];
  return {
    plugins,
  }
}

