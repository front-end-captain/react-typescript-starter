const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;

const { BUILD_PATH, ASSETS_PATH } = require("./constant.js");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./../src/index.tsx"),
  devtool: "cheap-module-source-map",
  output: {
    path: BUILD_PATH,
    filename: "[name].js",
    sourceMapFilename: "[name].map.js",
    publicPath: ASSETS_PATH,
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "antd",
                libraryDirectory: "es",
                style: (name) => `${name}/style/css.js`,
              }),
              createStyledComponentsTransformer({
                displayName: true,
                minify: false,
              }),
            ],
          }),
        },
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.ts[x]$/,
        loader: "source-map-loader",
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
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
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 20,
            },
          },
        ],
      },
    ],
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
      "@/containers": path.resolve(__dirname, "./../src/containers"),
      "@/components": path.resolve(__dirname, "./../src/components"),
      "@/hooks": path.resolve(__dirname, "./../src/hooks"),
      "@/router": path.resolve(__dirname, "./../src/router"),
      "@/style": path.resolve(__dirname, "./../src/style"),
      "@/utils": path.resolve(__dirname, "./../src/utils"),
      "@/modal": path.resolve(__dirname, "./../src/modal"),
      "@/types": path.resolve(__dirname, "./../src/types"),
      "@/lib": path.resolve(__dirname, "./../src/lib"),
      "@/api": path.resolve(__dirname, "./../src/service/api"),
    },
  },
  plugins: [
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
  ],
};
