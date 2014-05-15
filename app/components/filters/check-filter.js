'use strict';

goog.provide('my.check.Filter.factory');

/**
 * Convert boolean values to unicode checkmark or cross.
 *
 * @constructor
 */
my.check.Filter = function() {
  this.checkmark = '\u2714';
  this.cross = '\u2718';
  this.convert = this.convert.bind(this);
};

/**
 * Version directive factory.
 *
 * @return {function}
 */
my.check.Filter.factory = function() {
  var filter = new my.check.Filter();
  return filter.convert;
};

/**
 * Convert truthy and falsy values to unicode symbols.
 *
 * @param {string} input
 */
my.check.Filter.prototype.convert = function(input) {
  return input ? this.checkmark : this.cross;
};
