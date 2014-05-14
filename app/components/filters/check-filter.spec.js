'use strict';

describe('check filter', function() {

  beforeEach(module('app'));

  it('should convert boolean values', inject(function(checkFilter) {
    expect(checkFilter(true)).toBe('\u2714');
    expect(checkFilter(false)).toBe('\u2718');
  }));

});
