'use strict';

/**
 * Create namespace.
 */
goog.provide('my.third.Ctrl');


/**
 * Third controller.
 *
 * @constructor
 * @export
 */
my.third.Ctrl = function() {

  /**
   * @type {String}
   * @nocollapse
   */
  this.label = 'some label from third controller';

};


/**
 * Write `text` to stdout.
 *
 * Example function that we'd like to access in our `third.one`
 * child controller.
 *
 * @param {String} text
 */
my.third.Ctrl.prototype.log = function(text) {
  console.log(text);
};
