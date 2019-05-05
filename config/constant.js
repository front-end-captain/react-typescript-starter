const path = require("path");

const SRC_PATH = path.resolve(__dirname, "./../src");
const BUILD_PATH = path.resolve(__dirname, "./../build");
const ASSETS_PATH = "/assets/";
const ROOT_PATH = process.cwd();

module.exports = {
  SRC_PATH,
  BUILD_PATH,
  ASSETS_PATH,
  ROOT_PATH,
};
