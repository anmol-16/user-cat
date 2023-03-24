const { merge } = require('webpack-merge');
const backendConfig = require('./webpack/webpack.backend');
const frontendConfig = require('./webpack/webpack.frontend');

module.exports = merge(backendConfig, frontendConfig);