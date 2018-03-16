var webpack = require("webpack");
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
	entry:{
		app:[   "./js/main.js",
        ]
},
	output:{
		path:path.resolve(__dirname+"/service"),
		filename:"main.js"
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
    }  
  ],
},
plugins: [
  // new ExtractTextPlugin('[name].css'),
  // new webpack.LoaderOptionsPlugin({
  //   minimize:true
  // }),
  new UnminifiedWebpackPlugin()
]
}