'use strict';

exports.config = {

  specs: [
    'scenarios.js',
    '../../app/states/**/*.scenario.js'
  ],

  multiCapabilities: [{
    'browserName': 'chrome'
  }, {
    'browserName': 'firefox'
  }],

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: true
      }));
   }

};
