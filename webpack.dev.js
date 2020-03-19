const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

const baseConfig = require('./webpack.base')
const devServerConfig = require('./configs/devServer.config')

const gitRevisionPlugin = new GitRevisionPlugin()

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: devServerConfig,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
    new HtmlWebpackPlugin({
      title: 'dev',
      template: path.resolve(__dirname, 'static/index.html'),
      inject: true,
      origin: `http://localhost:8888/`,
    }),
    new DefinePlugin({
      DEV: true,
      'process.env.version': JSON.stringify(gitRevisionPlugin.commithash().slice(0, 7)), // TODO: delete when real
    }),
    new HotModuleReplacementPlugin(),
  ],
})
