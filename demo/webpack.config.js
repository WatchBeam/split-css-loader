const path = require('path');

module.exports = {
  resolve: {
    modules: [path.join(__dirname, '..', 'node_modules')],
  },
  entry: './demo/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.css$/, loader: 'split-css?target=platform&value=xbox' },
    ],
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
    ]
  }
};
