const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'script.js'),
  output: {
    filename: "build[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'src/assets/images/[name].[ext]',
    clean: true,
  },
  module: {
    rules: [{
      test: /\.s?css$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader",
      ],
    },
    // {
    //   test: /\.(png|jpe?g|gif|woff)$/i,
    //   use: [
    //     {
    //       loader: "file-loader",
    //     },
    //   ],
    // },
    {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
      type: 'asset/resource'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')

    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};