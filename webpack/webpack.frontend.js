const path = require('path');
// const config = require('../user-cat-back/config');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
  plugins: [
    new EnvironmentPlugin([S3_BUCKET,S3_KEYS]),
  ],
};