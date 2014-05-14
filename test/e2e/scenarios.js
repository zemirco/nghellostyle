'use strict';

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /first', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/first');
  });

});
