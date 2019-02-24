var path = require('path');

module.exports = {
    entry: ["./src/index.js"],
    mode : "development",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    }, 
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }, 
    
    module: {
    rules : [
      {
        test: /\.es6|\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
        
      }
    ]
   },
  resolve : { extensions: ['.js', '.es6']  }
}