'use strict';

/**
 * Create namespace.
 */
goog.provide('my.first.module');

/**
 * Require controller.
 */
goog.require('my.first.Ctrl');



/**
 * First module.
 *
 * @return {angular.Module}
 */
my.first.module = angular.module('first', [
  'ui.router'
]);



/**
 * Configuration function.
 *
 * `templateUrl` path must be relative to `index.html`.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
my.first.module.configuration = function($stateProvider) {

  $stateProvider.state('first', {
    url: '/first',
    templateUrl: 'states/first/first.html',
    controller: 'FirstCtrl as first'
  });

};



/**
 * Init first module.
 */
my.first.module
.config(my.first.module.configuration)
.controller('FirstCtrl', my.first.Ctrl);
