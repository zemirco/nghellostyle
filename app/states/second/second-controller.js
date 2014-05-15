'use strict';

/**
 * Create namespace.
 */
goog.provide('my.second.Ctrl');



/**
 * Second controller.
 *
 * By using `@ngInject` with `@param` the Google Closure Compiler
 * automatically creates some additional code that injects all necessary
 * services in a minification safe way.
 *
 * @example

   Ctrl.$inject = ['$window'];

 *
 *
 * @param {angular.$window} $window
 * @constructor
 * @export
 * @ngInject
 */
my.second.Ctrl = function($window) {

  /**
   * `text` cannot by used in template because it is not exposed.
   * But it is referenced in `say()` method so compiler keeps it.
   *
   * @type {String}
   */
  this.text = 'Hello world!';

  /**
   * `info` can be used in template because it is exposed.
   *
   * @type {String}
   * @expose
   */
  this.info = '"Info" can be used in the template';

  /**
   * `$window` is used in `say()` method so compiler keeps it.
   *
   * @type {Object}
   */
  this.$window = $window;
};



/**
 * Show an alert window with text from `text` model.
 * Method has to be exported to be used inside a template.
 *
 * @example

   <button ng-click="second.say()">say something</button>

 *
 *
 * @export
 */
my.second.Ctrl.prototype.say = function() {
  var $window = this.$window;
  $window.alert(this.text);
};
