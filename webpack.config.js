var path = require("path");
var webpack = require("webpack");

module.exports = {
//  mode: "development",  /* pakcage.json で --mode パラメータで指定 */
  
  entry:{
    index:    "./src/index.ts",
    client:   "./src/client.ts",
    server:   "./src/server.ts",
    api:      "./src/api.ts"
  },
  
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "ts-loader"
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=../font/[name].[ext]'
      },      
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js", ".json", ".jsx"]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./html/js/dist")
  }
};
  