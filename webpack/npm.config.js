/* global __dirname, require, module*/

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'swingbot-licensee-sdk';

let plugins = [], outputFile;

if (env === 'build') {
  plugins.push(new TerserPlugin());
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/../src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: 'axios'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
