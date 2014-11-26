'use strict';

module.exports = function(config) {
  config.set({

    basePath: '../../',

    frameworks: ['jasmine'],

    files: [
      'app/js/lib/angular.js',
      'app/js/lib/angular-ui-router.js',
      'app/js/lib/angular-mocks.js',
      'app/js/lib/es5-shim.js',

      'closure/library/base.js',
      'closure/library/deps.js',

      'app/components/**/*.js',

      // child states have to be loaded BEFORE parent state or goog.require doesn't work
      'app/states/*/*-controller.js',
      'app/states/*/*/*.js',
      'app/states/**/*.js',

      // app.js has to be loaded at the end to make goog.require work
      'app/js/app.js'
    ],

    exclude: [
      'app/states/**/*.pageobject.js',
      'app/states/**/*.scenario.js',
    ],

    autoWatch: false,

    browsers: ['Firefox', 'PhantomJS'],

    singleRun: true,

    preprocessors: {
      'app/js/app.js': 'coverage',
      'app/states/**/!(*.pageobject|*.scenario|*.spec).js': 'coverage',
      'app/components/**/!(*.spec).js': 'coverage'
    },

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'test/unit/coverage/'
    }

  });
};
