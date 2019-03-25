const path = require('path');
const {
  CheckerPlugin
} = require('awesome-typescript-loader');

const ROOT = path.resolve(__dirname);
const BUILD_PATH = path.resolve(__dirname, "/build");

module.exports = {
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
        test: /\.less$/,
        include: ROOT + '/src',
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.png/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 20
            }
          }
        ]
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
  ]
}
