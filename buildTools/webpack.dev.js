process.env.NODE_ENV = 'development';

//the following are not working with webpack module federation, that's why I removed them
/*const { MFLiveReloadPlugin } = require('@module-federation/fmr'),
  //enables fast refresh (this is the new feature which overrides hot reloading)
  ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');*/

// the following 2 lines is to merge common webpack configurations with this file
const { merge } = require('webpack-merge'),
  common = require('./webpack.common.js'),
  //plugins
  Dotenv = require('dotenv-webpack'),
  //constants
  { protocol } = require('./constants'),
  PATHS = require('./paths');

module.exports = (env, options) => {
  return merge(common(env, options), {
    mode: 'development',
    devtool: 'eval',
    //required for hot reload
    target: 'web',
    devServer: {
      //enable HTTPS
      server: protocol,
      //enable hot reloading (important to be false to enable live reloading for webpack module federation)
      hot: false,
      // Enable gzip compression of generated files.
      compress: true,
      // open development server
      open: true,
      //coming from scripts/start.js file
      port: options.port,
      // important for navigating to the app using browser (if you use any route other than /)
      historyApiFallback: true,
      // CORS :: https://github.com/webpack/webpack-dev-server/issues/533
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      client: {
        overlay: false,
      },
    },
    plugins: [
      // enables fast refresh
      // new ReactRefreshWebpackPlugin(),
      //required for module federation hot reload
      /*new MFLiveReloadPlugin({
        port: options.port, // the port your app runs on
        container: 'app_container', // the name of your app, must be unique
        standalone: true, // false uses chrome extension
      }),*/
      new Dotenv({
        path: `${PATHS.environments}/.env.development`,
        systemvars: true, //Set to true if you would rather load all system variables as well (useful for CI purposes)
      }),
    ],
  });
};
