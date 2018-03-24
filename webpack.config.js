var webpack = require("webpack");
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var Compression = require('compression-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg =require('imagemin-mozjpeg');

module.exports = {
	entry:{
		app:[   
            "./js/dbhelper.js",
            "./js/restaurant_info.js",
            "./css/styles.css",
            "./css/restaurant.css",
        ]
},
	output:{
		path:path.resolve(__dirname+"/service"),
		filename:"rest.js"
},
 module: {
  rules: [
    {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use : {
        loader :  'css-loader',
        options : {url : false }
      },
        
        fallback : "style-loader",
      })
    },
  ],
},
plugins: [
  new ExtractTextPlugin('restaurant.css'),
  new webpack.LoaderOptionsPlugin({
    minimize:true
  }),
   new Compression({
      test: /\.js/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      minRatio: 0.8
    }),
]
}
