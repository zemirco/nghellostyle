'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    // get packge info
    pkg: grunt.file.readJSON('package.json'),

    // app
    app: 'app/js/app.js',

    // get all states / modules
    states: grunt.file.expand(
      'app/states/**/*.js',
      '!app/states/**/*.pageobject.js',
      '!app/states/**/*.scenario.js',
      '!app/states/**/*.spec.js'
    ).join(' '),

    // get all components
    components: grunt.file.expand(
      'app/components/**/*.js',
      '!app/components/**/*.spec.js'
    ).join(' '),

    // start local server
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'app',
          keepalive: true
        }
      }
    },

    // run shell scripts
    shell: {

      // create app.min.js
      min: {
        command: 'java -jar closure/compiler.jar ' +
          '--compilation_level ADVANCED_OPTIMIZATIONS ' +
          // '--formatting PRETTY_PRINT ' +
          '--language_in ECMASCRIPT5_STRICT ' +
          '--angular_pass ' +                                // inject dependencies automatically
          '--externs closure/externs/angular.js ' +          // angular.d -> angular.module
          '--generate_exports ' +                            // keep @export notated code
          '--manage_closure_dependencies ' +
          '--js closure/library/base.js ' +                  // don't add 'goog.' stuff to script
          '--js <%= app %> ' +
          '--js <%= states %> ' +
          '--js <%= components %> ' +
          '--js_output_file app/js/app.min.js'
      },

      // karma
      karma: {
        command: './node_modules/karma/bin/karma start test/unit/karma.conf.js'
      },

      // protractor
      protractor: {
        command: './node_modules/protractor/bin/protractor test/e2e/protractor.conf.js'
      }
    },

  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['shell:min']);
  grunt.registerTask('protractor', ['shell:protractor']);
  grunt.registerTask('karma', ['shell:karma']);

};
