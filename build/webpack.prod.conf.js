var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var commons = require('./commons')
var config = require('../config')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },

  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),

    new webpack.LoaderOptionsPlugin(merge({
      options: {
        vue: {
          loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
          }),
          minimize: config.build.minimize
        }
      }
    }, commons)),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: config.build.productionSourceMap,
      compress: {
        warnings: false
      }
    }),

    new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css'),
        allChunks: true
    }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

module.exports = webpackConfig
