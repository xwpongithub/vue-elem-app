const {seller, goods, ratings} = require('./data.json')

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
        code: 0,
        data: seller
      }))
      app.get('/api/goods', (req, res) => res.json({
        code: 0,
        data: goods
      }))
      app.get('/api/ratings', (req, res) => res.json({
        code: 0,
        data: ratings
      }))
    }
  }
}
