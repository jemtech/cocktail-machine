const path = require("path");    
module.exports = {
		devtool: "source-map",
		module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [['@babel/preset-env', { modules: false }]]
              }
            }
          },
          {
            test: /\.yaml$/,
            use: [
              { loader: 'json-loader' },
              { loader: 'yaml-loader', options:{ asJSON: true } }
            ]
          },
          {
            test: /\.css$/,
            use: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
            ]
          }
        ]
      },
      output: {
    	    path: path.resolve(__dirname, '../web/ui'),
    	    filename: 'main.js',
    	    libraryTarget: 'var',
    	    library: 'App'
    	  }
    };