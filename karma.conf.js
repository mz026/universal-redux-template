var RewirePlugin = require("rewire-webpack");
var webpackConfig = require('./webpack.config.js');

// tweak webpackConfig
webpackConfig.devtool = '#inline-source-map';
webpackConfig.plugins.push(new RewirePlugin());
delete webpackConfig.module.loaders[0].loader;
delete webpackConfig.module.loaders[0].query;
webpackConfig.module.loaders[0].loaders = ['babel?plugins=babel-plugin-rewire'];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon', 'source-map-support'],


    // list of files / patterns to load in the browser
    files: [
      'spec/support/setup.js',
      'spec/**/*.test.js'
    ],


    // list of files to exclude
    exclude: [
      '**/*.swp',
      '**/*/flycheck*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/support/**/*.js': [ 'webpack' ],
      'spec/**/*.test.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      quiet: false,
      // It suppress everything except error, so it has to be set to false as well
      // to see success build.
      noInfo: false,
      stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    },
    plugins: [
      require('karma-mocha'),
      require('karma-sinon'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-source-map-support'),
      require('karma-spec-reporter')
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: process.env.KARMA_SPEC_REPORTER ? ['spec'] : [ 'progress' ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
