const path = require("path");
const src = "src/";

// you can just require .json, saves the 'fs'-hassle
let package = require("./package.json");
const CopyWebpackPlugin = require("copy-webpack-plugin");

function modify(buffer) {
  // copy-webpack-plugin passes a buffer
  var manifest = JSON.parse(buffer.toString());

  // make any modifications you like, such as
  manifest.version = package.version;

  // pretty print to JSON with two spaces
  const manifest_JSON = JSON.stringify(manifest, null, 2);
  return manifest_JSON;
}

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: [path.join(__dirname, src + "index.ts")],
  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "Nuke-Reddit-History.js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: "./src/manifest.json",
        to: "./manifest.json",
        transform(content, path) {
          return modify(content);
        }
      },
      {
        from: "./src/static_resources/",
        to: "./static_resources/"
      }]
    })
  ]
};
