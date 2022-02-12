const isProduction = process.env.NODE_ENV === 'production'

function getPlugins() {
  let plugins = [
    require('postcss-import'), // @import
    require('tailwindcss/nesting'), // tailwindcss での nest記述
    require('tailwindcss'), // tailwind
    require('autoprefixer') // vender prefix(-moz-, -webkit- など)
  ]
  if (isProduction) {
    const prodPlugins = [require('cssnano')] // minify
    plugins = [].concat(plugins, prodPlugins)
  }

  return plugins
}

module.exports = {
  plugins: getPlugins()
}
