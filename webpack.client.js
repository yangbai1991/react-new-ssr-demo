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
});