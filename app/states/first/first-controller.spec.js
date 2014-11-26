'use strict';

/**
 * Karma unit tests.
 */
describe('FirstCtrl', function() {

  var ctrl;

  beforeEach(module('first'));

  beforeEach(inject(function($injector) {

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    ctrl = $controller('FirstCtrl', {
      $scope: $rootScope.$new()
    });
  }));

  it('should set the default value of "animals" model', function() {
    expect(ctrl.animals).toEqual(['dog', 'cat', 'mouse']);
  });

});
