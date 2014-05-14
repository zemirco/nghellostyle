'use strict';

// require state modules
goog.require('my.first');
goog.require('my.second');
goog.require('my.third');

// require services
goog.require('my.service.version');

// require directives
goog.require('my.directive.version');

// require filters
goog.require('my.filter.check');

/**
 * Main app.
 */
my.app = angular.module('app', [
  'ui.router',
  my.first.name,
  my.second.name,
  // my.third includes child states `third.one` and `third.two`
  my.third.name
])
.config(config)
.service('version', my.service.version)
.directive('version', my.directive.version)
.filter('check', my.filter.check);

/**
 * Configuration function.
 *
 * @param {ui.router.$stateProvider} $stateProvider
 * @param {ui.router.$urlRouterProvider} $urlRouterProvider
 * @ngInject
 */
function config($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/first');

}
