
const path = require("path")
const chalk = require("chalk");

const webpack = require("webpack");
const merge = require("webpack-merge")
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = merge({
    entry: path.resolve(process.cwd(), "src/index.js"), //添加entry配置
    output: { //添加output配置
        path: path.resolve(process.cwd(), "build"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: "/"
    },
    devtool: "inline-source-map", //添加devtool配置
    mode: process.env.NODE_ENV, //添加mode
    module: { //添加loader
        rules: [{
            //配置babel
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
          }
        }),
        new ProgressBarPlugin({
          format:
            "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
        })
    ]

})