const path = require("path");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 这里注意babel-loader大于10,node版本需要18以上
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          // cacheDirectory: path.join(__dirname, ".babel-cache")
        }
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  }
};