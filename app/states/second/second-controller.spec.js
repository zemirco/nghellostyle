'use strict';

describe('SecondCtrl', function() {

  var window;
  var ctrl;

  beforeEach(module('second'));

  beforeEach(inject(function($injector) {

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    window = {alert: jasmine.createSpy()};

    ctrl = $controller('SecondCtrl', {
      $scope: $rootScope.$new(),
      $window: window
    });
  }));

  it('should set the default value of "text" model', function() {
    expect(ctrl.text).toEqual('Hello world!');
  });

  it('should set the default value of "info" model', function() {
    expect(ctrl.info).toEqual('"Info" can be used in the template');
  });

  it('should show an alert window when "say()" is called', function() {
    ctrl.say();
    expect(window.alert).toHaveBeenCalledWith('Hello world!');
  });

});
