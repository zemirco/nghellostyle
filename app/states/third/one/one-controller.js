'use strict';

goog.require('my.third.Ctrl');

/**
 * Create namespace.
 */
goog.provide('my.third.one.Ctrl');



/**
 * third.one controller.
 *
 * @param {angular.$controller} $controller
 * @constructor
 * @export
 * @ngInject
 */
my.third.one.Ctrl = function($controller) {

  /**
   * @type {String}
   * @expose
   */
  this.label = 'some other label from third.one controller';

  /**
   * Inherit from parent controller. We'd like to call the `log`
   * function here.
   *
   * @type {Object}
   * @expose
   */
  this.parent = $controller(my.third.Ctrl);

  /**
   * Call parent `log` function.
   */
  this.parent.log('`log` function called from child controller');

};
