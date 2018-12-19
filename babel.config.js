module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'usage',
      // \@babel\preset-env\data\built-ins.json
      polyfills: [
        'es6.array.find-index',
        'es6.array.map',
        'es6.object.assign',
        'es6.promise',
        'es7.promise.finally',
        'es6.map',
        'es6.set'
      ]
    }]
  ]
}
