var config = require('../config')
var utils = require('./utils')

var env = process.env.NODE_ENV
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  options: {
    context: '/',
    eslint: {
      formatter: require('eslint-friendly-formatter')
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ],
    vue: {
      loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    }
  }
}
