'use strict';

/**
 * Create namespace for `app.js`.
 */
goog.provide('my.third');

/**
 * Require child states.
 */
goog.require('my.third_one');
goog.require('my.third_two');

/**
 * Require controller.
 */
goog.require('my.third_Ctrl');



/**
 * Third module.
 *
 * Require child states `third.one` and `third.two` here
 * to reduce noise in `app.js`.
 *
 * @return {angular.Module}
 */
my.third = angular.module('third', [
  'ui.router',
  my.third_one.name,
  my.third_two.name
]);



/**
 * Configuration function.
 *
 * Important! Do not call this function `my.third.config`. It would collide
 * with the AngularJS `config()` function. The init part at the end of this file
 * would look like `my.blabla.config(my.blabla.config())` which obviously would
 * not work.
 *
 * `templateUrl` path must be relative to `index.html`.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
my.third.configuration = function($stateProvider) {

  $stateProvider.state('third', {
    url: '/third',
    templateUrl: 'states/third/third.html',
    controller: 'ThirdCtrl as third'
  });

};



/**
 * Init third module.
 */
my.third
.config(my.third.configuration)
.controller('ThirdCtrl', my.third_Ctrl);
