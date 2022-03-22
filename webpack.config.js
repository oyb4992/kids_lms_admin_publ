// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// module.exports = {
//     entry: './React/js/index.js',
//     output: {
//         path: __dirname,
//         filename: './js/ReactBundle.js'
//     },
//     devServer: {
//         hot: true,
//         inline: true,
//         host: '0.0.0.0',
//         port: 4000,
//         contentBase: __dirname,
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 loaders: ['react-hot-loader',
//                     'babel-loader?' + JSON.stringify({
//                         cacheDirectory: true,
//                         presets: ['es2015','stage-0', 'react']
//                     })],
//                 exclude: /node_modules/
//           },
//           {
//                 test: /\.scss$/,
//                 loaders : ExtractTextPlugin.extract({
//                       fallback : 'style-loader',
//                       use : ['css-loader', 'sass-loader?outputStyle=expanded']
//                   }),
//                   // loaders: ["style-loader","css-loader?-minimize","sass-loader?outputStyle=compressed"],
//                   exclude: /node_modules/
//             }
//         ]
//     },
//     plugins: [
//           new ExtractTextPlugin('./css/main_fromwebpack.css'),
//         new webpack.HotModuleReplacementPlugin()
//     ]
// }