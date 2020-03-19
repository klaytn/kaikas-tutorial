const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { envPath, defaultEnvPath } = require('./configs')

module.exports = {
  entry: [
    '@babel/polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist'),
        ignore: ['*.ejs'],
      },
    ]),
    new Dotenv({
      path: envPath,
      defaults: defaultEnvPath,
      systemvars: true,
    }),
  ],
}
