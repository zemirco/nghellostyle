'use strict';

/**
 * Create namespace.
 */
goog.provide('my.first');

/**
 * Require controller.
 */
goog.require('my.first_Ctrl');



/**
 * First module.
 *
 * @return {angular.Module}
 */
my.first = angular.module('first', [
  'ui.router'
]);



/**
 * Configuration function.
 *
 * Important! Do not call this function `my.first.config`. It would collide
 * with the AngularJS `config()` function. The init part at the end of this file
 * would look like `my.blabla.config(my.blabla.config())` which obviously would
 * not work.
 *
 * `templateUrl` path must be relative to `index.html`.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
my.first.configuration = function($stateProvider) {

  $stateProvider.state('first', {
    url: '/first',
    templateUrl: 'states/first/first.html',
    controller: 'FirstCtrl as first'
  });

};



/**
 * Init first module.
 */
my.first
.config(my.first.configuration)
.controller('FirstCtrl', my.first_Ctrl);
