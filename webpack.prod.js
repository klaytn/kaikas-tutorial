const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const baseConfig = require('./webpack.base')

const gitRevisionPlugin = new GitRevisionPlugin()

const ENV = process.env.NODE_ENV
const isProduction = ENV === 'production'
const isDev = ENV === 'dev'

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: isDev ? 'cheap-eval-source-map' : false,
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'src/styles')],
              data: '@import "./src/styles/_variables.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', { root: __dirname }),
    new OptimizeCssAssetsPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: path.resolve(__dirname, 'dist'),
      ignore: ['*.ejs'],
    }]),
    new DefinePlugin({
      DEV: false,
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.version': JSON.stringify(gitRevisionPlugin.commithash().slice(0, 7)), // TODO: delete when real
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'static/index.html'),
      inject: true,
      title: 'Klaytnscope',
      origin: process.env.SERVICE_URL,
      chunksSortMode: 'dependency',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[chunkHash].css',
      chunkFilename: 'bundle.[chunkHash].css',
    }),
    new CompressionPlugin({
      filename: '[file].gz',
      algorithm: 'gzip',
    }),
  ],
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '~',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
})
