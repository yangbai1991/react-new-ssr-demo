const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig,{
  target: "node",
  entry: "./entry/client-entry.js",
  output: {
    filename: '[id]-[chunkhash:8]-[name].js',
    path: path.resolve(__dirname, "dist/web"),
  },
  plugins: [new HtmlWebpackPlugin({
    title: "React SSR Demo",
    path: path.join(__dirname, 'public'),
    filename: 'index.html',
  })],
});