'use strict';

/**
 * Create namespace for `app.js`.
 */
goog.provide('my.third.module');

/**
 * Require child states.
 */
goog.require('my.third.one.module');
goog.require('my.third.two.module');

/**
 * Require controller.
 */
goog.require('my.third.Ctrl');



/**
 * Third module.
 *
 * Require child states `third.one` and `third.two` here
 * to reduce noise in `app.js`.
 *
 * @return {angular.Module}
 */
my.third.module = angular.module('third', [
  'ui.router',
  my.third.one.module.name,
  my.third.two.module.name
]);



/**
 * Configuration function.
 *
 * `templateUrl` path must be relative to `index.html`.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
my.third.module.configuration = function($stateProvider) {

  $stateProvider.state('third', {
    url: '/third',
    templateUrl: 'states/third/third.html',
    controller: 'ThirdCtrl as third'
  });

};



/**
 * Init third module.
 */
my.third.module
.config(my.third.module.configuration)
.controller('ThirdCtrl', my.third.Ctrl);
