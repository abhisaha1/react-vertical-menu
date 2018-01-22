var path = require("path");
var webpack = require("webpack");

module.exports = {
    devtool: "eval",
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/build/"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ["babel-loader"],
                include: path.join(__dirname, "src")
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
};
