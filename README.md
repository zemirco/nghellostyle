
# A radical new approach to developing AngularJS apps

[![Build Status](https://travis-ci.org/zemirco/nghellostyle.svg?branch=master)](https://travis-ci.org/zemirco/nghellostyle)

An AngularJS seed for Google Closure Compiler.

## Concept

This is not a 'one size fits all' solution.
There is no CoffeeScript/etc. compiler or CSS preprocessor involved.
That's up to you.
It's already complicated enough without them :)

What you get is a clean and scalable project structure for your AngularJS apps.

#### Google Closure Compiler

Most of you might use [uglifyjs](https://github.com/mishoo/UglifyJS2) for minification.
At least that's what I did for a long time and there is nothing wrong with it.
It is an awesome tool.

However Closure Compiler can do more than that.

1. Minify code knowing about AngularJS
2. Inject dependencies automatically
3. Create namespaces

##### --angular-pass

```
--angular_pass
```

> Generate $inject properties for AngularJS for functions annotated with @ngInject

Example controller.

```js
/**
 * Controller.
 *
 * @param {angular.$window} $window
 * @param {angular.$http} $http
 * @ngInject
 */
var Ctrl = function($window, $http) {
  // ...
};
```

The above example after minification.

```js
var a = function(b, c) {
  // that's beautiful
};
a.$inject = ["$window", "$http"];
```

No more

```js
angular.module('app').controller('Ctrl', ['one', 'two', 'three', 'four', 'five', 'six', function(one, two, three, four, five, six) {
  // ^ that's quite a long line
}])
```

##### --externs

```
--externs closure/externs/angular.js
```

> The file containing JavaScript externs. You may specify multiple

Example

```js
angular.module('app', []);
```

The above example after minification without `--externs`.

```js
angular.d('app', []);
```

That does not work as `angular` does not have a `d()` method.
`module()`, `directive()`, `service()` and so on have to stay as they are.
That's why we need an
[AngularJS externs file](https://code.google.com/p/closure-compiler/source/browse/#git%2Fcontrib%2Fexterns)
with the AngularJS global namespace.

##### --generate_exports

```
--generate_exports
```

> Generates export code for those marked with @export

Closure Compiler throws away all unnecessary code. So if you declare a function
but never call it the compiler doesn't include it in `app.min.js`. Problem here is
that we declare our controllers and controller properties in our `xyz-controller.js` files
and use them in your template files `xyz.html`. Closure Compiler doesn't look into
our HTML template and doesn't know which methods we'd like to
[keep](https://developers.google.com/closure/compiler/docs/api-tutorial3).

`@export` and `@expose` to the rescue. Simply use these annotations in your code
to prevent variable names from being mangled.

```js
/**
 * Controller.
 *
 * @export
 */
var Ctrl = function() {

  /**
   * `text` model cannot by used in template because it is not exposed.
   *
   * @type {String}
   */
  this.text = 'Hello world!';

  /**
   * `info` can be used in template because it is exposed.
   *
   * @type {String}
   * @expose
   */
  this.info = '"info" can be used in the template';
};
```

```html
<!-- empty span -->
<span>{{ ctrl.text }}</span>

<!-- span with '"info" can be used in the template' -->
<span>{{ ctrl.info }}</span>
```

So what's the difference between `@export` and `@expose`?

- use `@export` for constructor functions
- use `@expose` for properties inside constructor functions

***Important!***

The [style guide](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
from Google says that

> if you are using @export for properties, you will need to add the flags:

>  
```
--remove_unused_prototype_props_in_externs = false
--export_local_property_definitions
```

Both of them didn't work for me because the Closure Compiler threw Errors.

##### Namespaces

Closure Compiler modularization works very similar to Node.js modules.
You can create namespaces by using **goog.provide()** and **goog.require()**.
It is a bit like `module.exports` and `require()` from Node.js.

`xyz-controller.js`

```js
/**
 * Create namespace.
 */
goog.provide('my.Ctrl');

/**
 * Controller.
 *
 * Assign constructor function to namespace.
 */
my.Ctrl = function() {
  // ..
};
```

`xyz-module.js`

```js
/**
 * Require controller.
 */
goog.require('my.Ctrl');

/**
 * Module.
 */
angular.module('app', [])
  .config(function() { /*...*/ })
  .controller('Ctrl', my.Ctrl);
```

No more, what's the difference between
`angular.module('app', [])` and `angular.module('app')` ?!?

Be careful when providing and requiring submodules. Inside our main `app.js` we can
require submodules and inject them into our main module. However you must use the
`name` and not the whole module.

```js
/**
 * Require submodule
 */
goog.require('my.first.module');

/**
 * Main app.
 *
 * Inject submodule by using its `name`.
 */
my.app = angular.module('app', [
  'ui.router',
  my.first.module.name
])
```

#### 'controller as' syntax

Since Angular version
[1.1.5](https://github.com/angular/angular.js/blob/master/CHANGELOG.md#115-triangle-squarification-2013-05-22)
you can use an alternative syntax for your controllers.
The old way was simply using the controller name. Either in your HTML

```html
<div ng-controller="MyCtrl">
</div>
```

or inside the router.

```js
$routeProvider.when('/first', {
  templateUrl: 'first.html',
  controller: 'MyCtrl'
});
```

By using the alternate so called 'controller as' syntax you have fine grained control
over your app.

```js
$stateProvider
.state('third', {
  url: '/third',
  templateUrl: 'states/third/third.html',
  controller: 'ThirdCtrl as third'
})
.state('third.one', {
  url: '/one',
  templateUrl: 'states/third/one/one.html',
  controller: 'ThirdOneCtrl as thirdOne'
})
.state(...);
```

You can now reference the controllers in your templates.

```html
<p>{{ third.label }}</p>
<p>{{ thirdOne.label }}</p>
```

As opposed to the standard syntax.

```html
<!-- where might 'label' come from? Parent or child controller? -->
<p>{{ label }}</p>
```

The 'controller as' syntax provides a much better overview in templates.
It is easy to see where things come from.

#### Everything is a JavaScript class

Yes, with `prototype` and `new`.

- Controller

  ```js
  /**
   * First controller.
   */
  var FirstCtrl = function() {
    this.text = 'Hello world!';
  };

  /**
   * Write value of `text` model to stdout.
   */
  FirstCtrl.prototype.log = function() {
    console.log(this.text);
  };

  angular.module('app', [])
    .controller('FirstCtrl', FirstCtrl);
  ```

- Service

  Use `module.service` instead of `module.factory` or `module.provider`.

  ```js
  /**
   * Version service.
   */
  var Version = function() {
    this.version = '0.0.1';
  };

  /**
   * Return the current version.
   */
  Version.prototype.get = function() {
    return this.version;
  };

  angular.module('app', [])
    .service('version', Version);
  ```

- Directive

  ```js
  /**
   * @constructor
   */
  var Directive = function(version) {
    this.version = version;
    this.link = this.link.bind(this);

    this.scope;
    this.elem;
    this.attrs;
  };

  /**
   * Version directive factory. Entry point and used in `module.directive`.
   */
  Directive.factory = function(version) {
    var dir = new Directive(version);
    return {
      link: dir.link
    };
  };

  /**
   * Linking function.
   */
  Directive.prototype.link = function(scope, elem, attrs) {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;
    this.elem.text(this.version.get());
  };

  angular.module('app', [])
    .directive('version', Directive.factory);
  ```

- Filter

  ```js
  /**
   * @constructor
   */
  Filter = function() {
    this.checkmark = '\u2714';
    this.cross = '\u2718';
    this.convert = this.convert.bind(this);
  };

  /**
   * Check filter factory. Entry point and used in `module.filter`.
   *
   * @return {function}
   */
  Filter.factory = function() {
    var filter = new Filter();
    return filter.convert;
  };

  /**
   * Actual filter function.
   */
  Filter.prototype.convert = function(input) {
    return input ? this.checkmark : this.cross;
  };

  angular.module('app', [])
    .filter('check', Filter.factory);
  ```

#### Angular UI Router

> nuff said

#### Everything is grouped in 'states' and 'components'

Directives, Filters and Services belong into the `components/` folder.
Each file should have a `-directive`, `-filter` or `-service` suffix.
As you can see we have a `version` Directive and a `version` Service.
With the suffixes they are easy to differentiate.

All states belong into the `states/` folder. Give each folder the appropriate
state name, i.e. `home/` for `home` state. Put child states inside their parent
directories, i.e. `one/` inside `third` for `third.one` state.

As all components and states have their unit tests right next to them the `test/unit/`
folder only contains our `karma.conf.js` and the Istanbul code coverage reports.
The same goes for the `unit/e2e/` folder. It only contains the test scenarios for our
main `app.js` file.

```
Gruntfile.js
package.json
node_modules/
  ...
closure/
  library/
    base.js
    deps.js
  externs/
    angular.js
  compiler.jar
app/
  index.html
  img/
  css/
  js/
    app.js
    app.min.js
    lib/
      angular.js
      angular-ui-router.js
      ...
  components/
    directives/
      version-directive.js
      version-directive.spec.js
    filters/
      check-filter.js
      check-filter.spec.js
    services/
      version-service.js
      version-service.spec.js
  states/
    first/
      first-controller.js               // controller
      first-controller.spec.js          // controller unit tests (karma)
      first-module.js                   // module initialization with Router
      first.html                        // partial template
      first.pageobject.js               // Page Object for e2e tests (protractor)
      first.scenario.js                 // e2e tests (protractor)
    second/
      second-controller.js
      second-controller.spec.js
      second-module.js
      second.html
      second.pageobject.js
      second.scenario.js
    third/                              // parent state 'third'
      third-controller.js
      third-controller.spec.js
      third-module.js
      third.html
      third.pageobject.js
      third.scenario.js
      one/                              // child state 'third.one'
        one-controller.js
        one-controller.spec.js
        one-module.js
        one.html
        one.pageobject.js
        one.scenario.js
      two/                              // child state 'third.two'
        two-controller.js
        two-controller.spec.js
        two-module.js
        two.html
        two.pageobject.js
        two.scenario.js
test/
  e2e/
    protractor.conf.js
    scenarios.js
  unit/
    karma.conf.js
    coverage/
      ...
```

***Important!***

`compiler.jar` (6,8 MB)
is not in this repo. You have to download it manually and place it inside
the `closure/` directory.

- [Closure Compiler](https://github.com/google/closure-compiler#getting-started)

#### 'states' are independent modules

Yes, with square brackets `[]`. They live inside the `xyz-module.js` files.
They have their own `config()` function and they all define their own routes.

```js
/**
 * Create namespace.
 */
goog.provide('my.first.module');

/**
 * Require controller.
 */
goog.require('my.first.Ctrl');

/**
 * First module.
 */
my.first.module = angular.module('first', [
  'ui.router'
]);

/**
 * Configuration function.
 */
my.first.module.configuration = function($stateProvider) {

  $stateProvider.state('first', {
    url: '/first',
    templateUrl: 'states/first/first.html',
    controller: 'FirstCtrl as first'
  });

};

/**
 * Init first module.
 */
my.first.module
  .config(my.first.module.configuration)
  .controller('FirstCtrl', my.first.Ctrl);
```

Each state has its own controller. They live in the `xyz-controller.js` files.

```js
/**
 * Create namespace.
 */
goog.provide('my.first.Ctrl');

/**
 * First controller.
 */
my.first.Ctrl = function() {
  // ...
};

```

Each state creates an own namespace. Inside the main `app.js` we use `goog.require()`
to pull in all submodules and inject them into our main app.

Child states don't bubble up to our main `app.js`. Load
them in their parent state, i.e. `third.one` and `third.two` are required in
`third` state which is itself required by our main `app.js`.

This structure makes it much easier to understand data coming from `resolve`.

#### Karma unit tests with Istanbul code coverage

Using code coverage with AngularJS is really easy. Though only few projects actually
include Istanbul. This seed has it built-in.

```js
preprocessors: {
  'app/states/**/!(*.pageobject|*.scenario|*.spec).js': 'coverage'
}
```

[minimatch](https://github.com/isaacs/minimatch) is magic. The pattern
includes all `*.js` files in our `states/` directory. It ignores all
`*.pageobject.js`, `*.scenario.js` and `*.spec.js` files.
They would pass and show up green in the coverage report but they create noise.
So leave them out.

To increase readability inside your Karma tests use the `$injector` service
instead injecting services inline.

Good

```js
beforeEach(inject(function($rootScope, $controller) {
  // ...
}));
```

Better

```js
beforeEach(inject(function($injector) {
  var $rootScope = $injector.get('$rootScope');
  var $controller = $injector.get('$controller');
  // ...
}));
```

That one line `beforeEach(inject(function(...) {` can become pretty long
and hard to read.

#### Protractor tests using Page Objects

From [Organizing Real Tests: Page Objects](https://github.com/angular/protractor/blob/master/docs/getting-started.md#organizing-real-tests-page-objects)

> When writing real tests scripts for your page, it's best to use the Page Objects pattern to make your tests more readable

`xyz.pageobject.js`

```js
var XYZ = function() {

  this.navigate = function() {
    browser.get('index.html#/xyz');
  };

  // ng-repeat
  this.animals = element.all(by.repeater('animal in first.animals'));

};

module.exports = new XYZ();
```

`xyz.scenario.js`

```js
describe('first', function() {

  var xyz = require('./xyz.pageobject.js');

  beforeEach(function() {
    xyz.navigate();
  });

  it('should render all animals', function() {
    expect(xyz.animals.count()).toBe(3);
  });

});
```

#### Grunt shell instead multiple plugins

- Why do you use grunt (or gulp or any other build tool)? Why no plain `npm`?

  `npm run karma` would create annoying `npm-debug.log` files when tests fail.

- Why don't you use plugins for karma and protractor?

  The less plugins the better. Starting karma and protractor is a one liner.

## Test

### Karma

`grunt karma`

### Protractor

- start the local server

  ```bash
  grunt connect
  ```

- start protractor

  ```bash
  grunt protractor
  ```

## Build

The default task

`grunt`

creates `app.min.js` in `app/js/`.

## References

- [Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)
- [An AngularJS Style Guide for Closure Users at Google](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)
- [Using AngularJS at Google with Rhys Bret Bowen](http://www.funnyant.com/using-angularjs-at-google-with-rhys-bret-bowen/)
- [AngularJS 1.1.5 + Google Closure Library + Closure Compiler experiment](https://gist.github.com/crhym3/5822385)
- [AngularJS utils min](https://github.com/angular/angular.js/blob/master/lib/grunt/utils.js#L201)
- [ngbp - home module with separate config and controller](https://github.com/ngbp/ngbp/blob/v0.3.2-release/src/app/home/home.js)
- [A Radically Different Way of Building AJAX Apps](http://misko.hevery.com/2010/07/29/a-radically-different-way-of-building-ajax-apps/)

## License

MIT

## Plea

@google why you not making your `nghellostyle` public?
