const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('../webpack.config')

module.exports = Object.assign({}, baseConfig, {
  entry: './example/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
    // publicPath: '/example' then access at http://localhost:3000/example.
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'example/template.html'
    })
  ]
})
