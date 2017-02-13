var path = require('path')
var console = require('console')
var isArray = require('lodash/isArray')
var isString = require('lodash/isString')
var assign = require('lodash/assign')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      if (isString(loader)) {
        loader = [loader, {}]
      }
      loader = {
        loader: loader[0] + '-loader',
        options: assign({}, loader[1])
      }
      assign(loader.options, { sourceMap: options.sourceMap })
      return loader
    })

    if (options.extract) {
      return ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: sourceLoader
      })
    } else {
      sourceLoader.splice(0, 0, { loader: 'vue-style-loader' })
      return sourceLoader
    }
  }

  return {
    css: generateLoaders(['css', 'postcss']),
    postcss: generateLoaders(['css', 'postcss']),
    less: generateLoaders(['css', 'postcss', 'less']),
    sass: generateLoaders(['css', 'postcss', ['sass', {
      indentedSyntax: true,
      includePaths: [path.resolve(__dirname, '../')]
    }]]),
    scss: generateLoaders(['css', 'postcss', 'sass']),
    stylus: generateLoaders(['css', 'postcss', 'stylus']),
    styl: generateLoaders(['css', 'postcss', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
