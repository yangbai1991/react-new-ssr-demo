const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig,{
  target: "node",
  entry: { server: "./entry/server-entry.js" },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "dist/server"),
    libraryTarget: 'commonjs2',
  },
  externals: [webpackNodeExternals()],
});