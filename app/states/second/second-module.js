'use strict';

/**
 * Create namespace.
 */
goog.provide('my.second');

/**
 * Require controller.
 */
goog.require('my.second_Ctrl');



/**
 * Second module.
 *
 * @return {angular.Module}
 */
my.second = angular.module('second', [
  'ui.router'
]);



/**
 * Configuration function.
 *
 * Important! Do not call this function `my.second.config`. It would collide
 * with the AngularJS `config()` function. The init part at the end of this file
 * would look like `my.blabla.config(my.blabla.config())` which obviously would
 * not work.
 *
 * `templateUrl` path must be relative to `index.html`.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
my.second.configuration = function($stateProvider) {

  $stateProvider.state('second', {
    url: '/second',
    templateUrl: 'states/second/second.html',
    controller: 'SecondCtrl as second'
  });

};



/**
 * Init second module.
 */
my.second
.config(my.second.configuration)
.controller('SecondCtrl', my.second_Ctrl);
