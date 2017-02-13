module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },

  extends: ['vue', 'airbnb-base'],
  plugins: ['vue'],

  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },

  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-param-reassign': 0
  }
};
