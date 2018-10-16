const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const paths = {
   path: path.resolve(__dirname, "build"),
   publicPath: "/"
};

module.exports = {
   entry: ['./src/index.js'],
   output: {
      // Next line is not used in dev but WebpackDevServer crashes without it:
      path: paths.path,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'bundle.[hash].js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: '[name].[hash].js',
      // This is the URL that app is served from. We use "/" in development.
      publicPath: paths.publicPath,
      // Point sourcemap entries to original disk location
      devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
   },
   devServer: {
      contentBase: paths.path,
      port: 3000,
      historyApiFallback: true
      // hot: true
   },
   plugins: [
      new HtmlWebPackPlugin({
         inject: true,
         template: "./public/index.html"
      }),
      new CopyWebpackPlugin([ { from: 'src/resources', to: 'resources' } ])
      // new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin()
   ],
   module: {
      // loaders: [ 'react-hot-loader/webpack', 'babel-loader' ],
      rules: [
         // {
         //    test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i,  // a regular expression that catches .js files
         //    exclude: /node_modules/,
         //    loader: 'url-loader',
         // },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            // loaders: ["react-hot-loader", "babel-loader"]
            use: {
               loader: "babel-loader"
            }
            // use: [
            //    "react-hot-loader", "babel-loader"
            // ]
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.scss$/,
            use: [
               "style-loader", // creates style nodes from JS strings
               "css-loader", // translates CSS into CommonJS
               "sass-loader" // compiles Sass to CSS
            ]
         }
      ]
   }
}
