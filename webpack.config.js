const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const resolve = p => path.resolve(__dirname, p)

const baseConfig = {
  mode: 'none',
  output: {
    publicPath: '/',
    path: resolve('lib'),
    filename: '[name].js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
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
        'process.env': {NODE_ENV: JSON.stringify('development')}
      })
    ]
  })
}

function withProd(config) {
  return Object.assign({}, config, {
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify('production')}
      })
    ]
  })
}
