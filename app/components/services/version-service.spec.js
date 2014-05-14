'use strict';

describe('version service', function() {

  beforeEach(module('app'));

  it('should return current version', inject(function(version) {
    expect(version.get()).toEqual('0.0.1');
  }));

});
