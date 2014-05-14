'use strict';

/**
 * Create namespace.
 */
goog.provide('my.third_one');

/**
 * Require controller.
 */
goog.require('my.third_one_Ctrl');



/**
 * Module for third.one state.
 *
 * @return {angular.Module}
 */
my.third_one = angular.module('third.one', [
  'ui.router'
]);



/**
 * Configuration function.
 *
 * Important! Do not call this function `config()`. It would collide
 * with the AngularJS `config()` function. The init part at the end of this file
 * would look like `my.blabla.config(my.blabla.config())` which obviously would
 * not work.
 *
 * `templateUrl` path must be relative to `index.html`.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
my.third_one.configuration = function($stateProvider) {

  $stateProvider.state('third.one', {
    url: '/one',
    templateUrl: 'states/third/one/one.html',
    controller: 'ThirdOneCtrl as thirdOne'
  });

};



/**
 * Init third.one module.
 */
my.third_one
.config(my.third_one.configuration)
.controller('ThirdOneCtrl', my.third_one_Ctrl);
