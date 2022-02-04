const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sveltePreprocess = require('svelte-preprocess')

module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules\/.+\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
  },
  {
    test: /\.(svelte)$/,
    use: {
      loader: 'svelte-loader',
      options: {
        preprocess: sveltePreprocess({})
      }
    }
  }
]
