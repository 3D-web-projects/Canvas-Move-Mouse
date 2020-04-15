const path = require("path");

module.exports = {
  // entry: {
  //   main: "./src/assets/scripts/index.js"
  //   // vendor: "./src/assets/scripts/vendor.js"
  // },
  entry: "./src/assets/scripts/index.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
          },
        },
      },
    ],
  },
};
