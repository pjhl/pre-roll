const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'PreRoll.min.js',
    library: 'PreRoll',
    libraryTarget: 'umd'
  }
}
