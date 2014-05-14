'use strict';

goog.provide('my.filter.check');

/**
 * Convert boolean values to unicode checkmark or cross.
 *
 * @return {angular.Filter}
 */
my.filter.check = function() {
  return function(input) {
    return input ? '\u2714' : '\u2718';
  };
};
