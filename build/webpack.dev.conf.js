var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')

var commons = require('./commons')
var config = require('../config')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')


module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },

  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable
  },

  plugins: [
    new webpack.LoaderOptionsPlugin(merge({
      debug: true,
    }, commons)),

    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    new FriendlyErrors()
  ]
})
