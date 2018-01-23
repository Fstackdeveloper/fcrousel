var path = require('path');
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/fcrousel.css",
    disable: process.env.NODE_ENV === "development"
});




module.exports = {
  entry: ['./src/js/fcrousel.js','./src/scss/fcrousel.scss'],
  output: {
    filename: './js/fcrousel.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath:path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ parallel: true, uglifyOptions: { ecma: 7 }, beautify: false, sourceMap: true, comments: false,
        minimize: true,
        compress: true
        }),
    extractSass
  ],
  module: { rules: [{ test: /\.js$/, use: [{ loader: 'babel-loader', options: { presets: ["es2015", "es2017", "stage-2", 'react'] } }] },
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
         { 
            test:  /\.(png|jpg|svg|eot|ttf|woff)$/, 
            loader: 'file-loader', 
            options: {
                    name (file) {
                      if (process.env.NODE_ENV === 'development') {
                        return '/media/[name].[ext]';
                      }

                      return '/media/[hash].[ext]';
                    }
                  }  

        }
      
    ] }
  
};
