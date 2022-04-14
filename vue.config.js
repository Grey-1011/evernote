module.exports = {
  outputDir:'dist/evernote-website',
  publicPath: process.env.NODE_ENV === 'production'
      ? '/evernote-website/'
      : '/'
}