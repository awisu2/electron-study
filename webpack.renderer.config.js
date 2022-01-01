const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const path = require('path')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
})

module.exports = {
  module: {
    rules
  },
  plugins: plugins,
  resolve: {
    extensions: ['.mjs', '.js', '.svelte', '.ts', '.jsx', '.tsx', '.css', '.json'],
    // see below for an explanation
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
  }
}
