// Karma configuration
// Generated on Wed Apr 19 2017 16:06:54 GMT+0300 (FLE Daylight Time)
// var webpackConfig = require('./webpack.config.js');
// webpackConfig.entry = {};
// var path = require('path');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'requirejs'],


        // list of files / patterns to load in the browser
        files: [
            'test-main.js',
            {pattern: 'src/**/*.js', included: false, watched: true},
            // {pattern: 'src/*.js.map', included: false, served: true, watched: false, nocache: true},
            {pattern: 'test/**/*spec.js', included: false},
            {pattern: 'test/template/**/*.html', included: false},
            {pattern: 'test/styles/**/*.css', included: false},
            {pattern: 'test/images/*.jpg', watched: false, included: false, served: true, nocache: false}

        ],

        proxies: {
            '/template/': '/base/test/template/',
            '/images/': '/base/test/images/',
            '/styles/': '/base/test/styles/'
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        include: [
                            /src/,
                            /test/
                        ],
                        exclude: /(node_modules|bower_components)/
                    }
                ]
            }
        },

        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.js': ['webpack', 'sourcemap'],
            // '**/*.html': ['html2js']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


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
        browsers: ['Chrome','Firefox', 'IE_no_addons'],

        customLaunchers: {
            IE_no_addons: {
                base:  'IE',
                flags: ['-extoff']
            },
            IE10: {
                base: 'IE',
                'x-ua-compatible': 'IE=EmulateIE10'
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
