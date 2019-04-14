const path = require('path');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname);
const BUILD_PATH = path.resolve(__dirname, "/build");
const ASSETS_PATH = "/assets/";

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./../src/index.tsx"),
  devtool: "cheap-module-source-map",
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    sourceMapFilename: '[name].map.js',
    publicPath: ASSETS_PATH,
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: "awesome-typescript-loader",
        options: {
          errorsAsWarnings: false,
        },
      },
      {
        enforce: "pre",
        test: /\.ts[x]$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css.ts$/,
        loader: require.resolve("stylelint-custom-processor-loader"),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-hot-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              sourceMap: true,
              localIdentName: "[local]",
            },
          },
        ],
      },

      {
        test: /\.png/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 20
          }
        }]
      }
    ]
  },
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: "8080",
    contentBase: BUILD_PATH,
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: ASSETS_PATH,
    historyApiFallback: {
      index: ASSETS_PATH + "index.html",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".png"],
    alias: {
      '@': path.resolve(__dirname, "./../src"),
    }
  },
  plugins: [
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      title: "react-typescript-starter",
      template: path.resolve(__dirname, "./../src/template.html"),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
