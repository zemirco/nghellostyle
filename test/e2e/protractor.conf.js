'use strict';

exports.config = {

  specs: [
    'scenarios.js',
    '../../app/states/**/*.scenario.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  onPrepare: function() {
      require('jasmine-spec-reporter');
      jasmine.getEnv().addReporter(new jasmine.SpecReporter());
   }

};
