const path = require("path");
const { NODE_ENV = "production" } = process.env;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

const serverConfig = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
  stats: "minimal",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.html$/i,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "public/main.css",
    }),
  ],
  externals: [nodeExternals()],
  watch: NODE_ENV === "development",
};

const clientConfig = {
  entry: "./src/client.ts",
  mode: NODE_ENV,
  stats: "minimal",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "public/client.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.html$/i,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "public/main.css",
    }),
  ],
  watch: NODE_ENV === "development",
};

module.exports = [serverConfig, clientConfig];
