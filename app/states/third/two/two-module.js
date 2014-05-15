'use strict';

/**
 * Create namespace.
 */
goog.provide('my.third.two.module');

/**
 * Require controller.
 */
goog.require('my.third.two.Ctrl');



/**
 * Module for third.two state.
 *
 * @return {angular.Module}
 */
my.third.two.module = angular.module('third.two', [
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
my.third.two.module.configuration = function($stateProvider) {

  $stateProvider.state('third.two', {
    url: '/two',
    templateUrl: 'states/third/two/two.html',
    controller: 'ThirdTwoCtrl as thirdTwo'
  });

};



/**
 * Init third.two module.
 */
my.third.two.module
.config(my.third.two.module.configuration)
.controller('ThirdTwoCtrl', my.third.two.Ctrl);
