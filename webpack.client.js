const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig,{
  target: "web",
  entry: { client: "./entry/client-entry.js" },
  output: {
    filename: '[id]-[chunkhash:8]-[name].js',
    path: path.resolve(__dirname, "dist/web"),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "React SSR Demo",
      // path: path.join(__dirname, 'public'),
      // filename: 'index.html',
      template: path.join(__dirname, 'public/index.html'),
      path: path.join(__dirname, 'dist'),
    }),
    new ProgressBarPlugin(),
  ],
  // devServer: {
  //   port: 3001,
  //   hot: true,
  //   hotOnly: true,
  //   disableHostCheck: true,
  //   // quiet: true,
  //   publicPath: '/dev-static/',
  //   historyApiFallback: { disableDotRule: true },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  //     'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  //   },
  //   // 配置 sockHost 使 whistle 支持热更新
  //   // 需要在 whistle 添加一条规则 local.panshi.woa.com:7002 http://127.0.0.1:7002
  //   sockHost: 'local.panshi.woa.com',
  // },
});