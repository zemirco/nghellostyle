'use strict';

goog.provide('my.directive.version');

/**
 * Show the version from version service inside DOM element.
 *
 * @param {version} version service
 * @ngInject
 * @return {angular.Directive}
 */
my.directive.version = function(version) {
  return function(scope, elm, attrs) {
    elm.text(version.get());
  };
};
