const path = require('path')
const webpack = require('webpack')
const {seller, goods, ratings} = require('./data.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before(app) {
      app.get('/api/seller', (req, res) => res.json({
        errno: 0,
        data: seller
      }))
      app.get('/api/goods', (req, res) => res.json({
        errno: 0,
        data: goods
      }))
      app.get('/api/ratings', (req, res) => res.json({
        errno: 0,
        data: ratings
      }))
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set('components', resolve('src/components'))
    config.resolve.alias.set('common', resolve('src/common'))
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
  }
}
