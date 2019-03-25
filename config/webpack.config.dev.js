const path = require('path');
const {
  CheckerPlugin
} = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname);
const BUILD_PATH = path.resolve(__dirname, "/build");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./../src/index.tsx"),
  devtool: 'source-map',
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    sourceMapFilename: '[name].map.js'
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: "awesome-typescript-loader"
      },
      {
        enforce: "pre",
        test: /\.ts[x]$/,
        loader: "source-map-loader"
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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".png"],
    alias: {
      '@': ROOT + '/src'
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
  ]
}
