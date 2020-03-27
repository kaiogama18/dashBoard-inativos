// next.config.js 
const withCSS = require('@zeit/next-css');
// const withSass = require("@zeit/next-sass");
// const withFonts = require("next-fonts");

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  }
});

// module.exports = withFonts(
//   withSass({
//     webpack(config, options) {
//       // custom webpack loaders if you need
//       return config;
//     }
//   })
// );