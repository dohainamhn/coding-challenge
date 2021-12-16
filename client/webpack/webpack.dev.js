const path = require('path');
const rootDir = path.resolve(process.cwd());
const buildPath = path.resolve(rootDir, 'build');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)|(css)$/,
        use: [
          'style-loader', //3. Inject styles into DOM
          'css-loader', //2. Turns css into commonjs
          'sass-loader', //1. Turns sass into css
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  devtool: 'inline-source-map',
  devServer:{
    static: path.resolve(rootDir,'./src/public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
  }
});
