'use strict';

/**
 * Protractor e2e tests.
 */
describe('first', function() {

  var first = require('./first.pageobject.js');

  beforeEach(function() {
    first.navigate();
  });

  it('should render first template when user navigates to /first', function() {
    expect(first.p).toEqual('Some text in first state');
  });

  it('should render all animals', function() {
    expect(first.animals.count()).toBe(3);
  });

  it('should show checkmark and cross', function() {
    expect(first.list.last().getText()).toEqual('\u2714\n\u2718');
  });

});
