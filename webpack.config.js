var path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './src/js/fcrousel.new.js',
  output: {
    filename: 'fcrousel.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ parallel: true, uglifyOptions: { ecma: 7 }, beautify: false, sourceMap: true, comments: false,
        minimize: true,
        compress: false
        })
  ],
  module: { rules: [{ test: /\.js$/, use: [{ loader: 'babel-loader', options: { presets: ['es2015'] } }] }] }
  
};
