const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    devtool: 'inline-source-map',
    entry: [
      'react-hot-loader/patch',
      // activate HMR for React

      // 'webpack-dev-server/client?http://localhost:8000',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      // 'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      'whatwg-fetch',
      './src/index.js',
    ],
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
    ],
    devServer: {
      port: 8001,
      historyApiFallback: true,
      proxy: {
        '/api/v1': {
          target: 'http://localhost:8000',
          secure: false,
          changeOrigin: true,
        },
      },
    },
  });
};
