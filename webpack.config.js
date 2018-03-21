var webpack = require("webpack");
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
var Compression = require('compression-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg =require('imagemin-mozjpeg');
var CriticalWebpackPlugin = require('critical-webpack-plugin');

module.exports = {
	entry:{
		app:[   
            "./js/serviceWorker.js",
           
            "./css/important.css",
            // "./js/dbhelper.js",
            // "./js/main.js",

              // "./index.html"
            // "./js/dbhelper.js",
            // "./js/restaurant_info.js",

        ]
},
	output:{
		path:path.resolve(__dirname+"/service"),
		// filename:"main.js"
    // filename:"dbhelper.js"
    // filename:"restaurant_info.js",
    filename:"restasdas.js"
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
    // loader: ['css-loader','style-loader'],
    },
    // {
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   loaders : [
    //   {
    //       loader : "file-loader",
    //       options : {
    //       name : 'img/[name].[ext]'
    //     }
    //   },
    //    'img-loader'
    //   ] 
    // }
  ],
},
plugins: [
  new ExtractTextPlugin('important.css'),
  new webpack.LoaderOptionsPlugin({
    minimize:true
  }),
   new Compression({
      test: /\.js/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      minRatio: 0.8
    }),
    //  new CriticalWebpackPlugin({
    //   ase: path.join(path.resolve(__dirname), 'service/'),
    //   src: 'index.html',
    //   dest: 'index1.html',
    //   css: ['css/index.css'],
    // })

]
}