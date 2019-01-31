const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'client-auth': ['./src/index.js', 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080/']
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['./node_modules']
  },
  resolveLoader: {
    modules: ['./node_modules']
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  browsers: ['last 2 Chrome versions', 'Safari 10']
                },
                debug: true
              }
            ]
          ],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                decoratorsBeforeExport: false
              }
            ],
            ['@babel/plugin-proposal-class-properties'],
            ['@babel/plugin-syntax-dynamic-import'],
            [
              '@babel/plugin-proposal-object-rest-spread',
              {
                useBuiltIns: true
              }
            ]
          ]
        }
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader?limit=25000',
        query: {
          limit: 10000,
          name: '[path][name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(obj|mtl|tga|3ds|max|dae)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: 'www/template.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      module: 'client-auth'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist')
  }
}
