const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name]' + '.css', // 出力するファイル名
    chunkFilename: 'css/[id]' + '.css'
  })
]
