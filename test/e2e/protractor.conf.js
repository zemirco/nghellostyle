'use strict';

exports.config = {

  specs: [
    'scenarios.js',
    '../../app/states/**/*.scenario.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:8001/',

  framework: 'jasmine',

  onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: true
      }));
   }

};
