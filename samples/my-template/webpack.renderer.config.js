const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const { resolve } = require('path')

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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.svelte'],
    alias: {
      svelte: resolve('node_modules', 'svelte'),
      ['@src']: resolve('src'),
      ['@libs']: resolve('src/libs'),
      ['@svelte']: resolve('src/svelte'),
      ['@components']: resolve('src/svelte/components'),
      ['@store']: resolve('src/svelte/store')
    }
  }
}
