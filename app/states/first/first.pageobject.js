'use strict';

/**
 * Create Page Object for protractor e2e tests.
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

module.exports = new First();
