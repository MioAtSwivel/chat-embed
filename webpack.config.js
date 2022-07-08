const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin");
const { library } = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'create-chat-widget.js',
    library: 'ChatWidget'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}