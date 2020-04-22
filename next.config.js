const tailwindcss = require('tailwindcss');
// const withStyles = require('@webdeb/next-styles')

module.exports = {
  webpack(config, { dev }) {
    // modify it!
    return config
  },
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
  ],
}



