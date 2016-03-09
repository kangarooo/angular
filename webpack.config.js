module.exports = {
    entry: {
        app: ['./app/app.js']
    },
    output: {
        path: './app',
        filename: 'bundle.js'
    },
    resolve: {
       extensions: ['', '.js', '.css']
    },
    module: {
      loaders: [
          {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
          }
      ]
    },
    devServer: {
        contentBase: 'app',
        port: 8090
    }
};
