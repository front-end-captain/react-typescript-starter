const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;

const { VENDORS, ASSETS_PATH, TEMPLATE_PATH, ROOT_PATH, SRC_PATH, BUILD_PATH } = require("./constant");

const productionConfig = {
  mode: "production",
  entry: {
    app: `${SRC_PATH}/index.tsx`,
  },

  output: {
    path: BUILD_PATH,
    filename: "[name]-[hash:8].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        enforce: "pre",
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
      // {
      //   test: /\.ts[x]?$/,
      //   loader: "babel-loader",
      //   options: {
      //     cacheDirectory: true,
      //   },
      //   exclude: /node_modules/,
      // },
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
              hmr: false,
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
    ],
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

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendors",
          priority: 10,
          enforce: true,
        },
        style: {
          test: /\.css$/,
          name: "style",
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
    nodeEnv: "production",
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      title: "React typescript starter",
      template: path.join(SRC_PATH, "/template.html"),
      inject: true,
      minify: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:5].css",
      chunkFilename: "[id]-[hash:5].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new BundleAnalyzerPlugin(),
  ],
};

module.exports = productionConfig;
