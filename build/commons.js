module.exports = {
  options: {
    context: '/',
    minimize: true,
    eslint: {
      formatter: require('eslint-friendly-formatter')
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ],
  }
}
