const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DIRS = {SRC: 'lib/', DIST: 'dist/'}

const baseConfig = {
  entry: resolve(DIRS.SRC),
  output: {
    publicPath: '/',
    path: resolve(DIRS.DIST),
    filename: '[name].js',
    chunkFilename: 'chunk-[name].js'
    // library: '',
    // libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js|jsx$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }]
  },
}

if (process.env.NODE === 'production') {
  module.exports = withProd(baseConfig)
} else {
  module.exports = withDev(baseConfig)
}

// Build environment modifiers

function withDev(config) {
  return Object.assign({}, config, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      port: 3000
    },
    plugins: [
      new webpack.DefinePlugin({
       'process.env': { 'NODE_ENV': JSON.stringify('development') }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'template.html'
      })
    ]
  })
}

function withProd(config) {
  return Object.assign({}, config, {
    output: Object.assign({}, config.output, {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js'
    }),
    plugins: [
      new webpack.DefinePlugin({
       'process.env': { 'NODE_ENV': JSON.stringify('production') }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'template.html',
        minify   : {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
      }),
    ]
  })
}

function resolve(p) { return path.resolve(__dirname, p) }
