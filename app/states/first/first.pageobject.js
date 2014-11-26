'use strict';

/**
 * Create Page Object for protractor e2e tests.
 *
 * @constructor
 */

var First = function() {

  this.navigate = function() {
    browser.get('index.html#/first');
  };

  // single dom element selector
  this.p = $('p').getText();

  // select multiple elements
  this.list = $$('ul');

  // ng-repeat
  this.animals = element.all(by.repeater('animal in first.animals'));

};

/**
 * Exports an instange of the first page object
 */
module.exports = new First();
