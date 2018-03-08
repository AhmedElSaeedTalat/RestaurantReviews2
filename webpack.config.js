var webpack = require("webpack");
module.exports = {
	entry:{
		app:["./js/serviceWorker.js"]
},
	output:{
		path:__dirname+"/service",
		filename:"service.js"
},
 module: {
  rules: [
    {
      test: /\.js$/,
      exclude:/(node_modules)/,
      loader:"babel-loader",
      query:{
        presets:["env"]
      }
    }
  ]
}
}