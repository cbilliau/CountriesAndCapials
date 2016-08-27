// Route tests
xdescribe('Home page route test', function() {
  // successful
  beforeEach(function() {
    module('cacApp');
  });

  beforeEach(inject(function(_$httpBackend_, _$route_, _$location_, $rootScope)  {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
    $location = _$location_;
    $scope = $rootScope.$new();
    string = '<p>Error - Page Not Found</p>';
  }));

  it('should load the home.html template', function(){
    $httpBackend.whenGET('./home/home.html').respond('...');
    $scope.$apply(function() {
      $location.path('/home');
    });
    expect($route.current.templateUrl).toBe('./home/home.html');
    expect($route.current.controller).toBe('HomeCtrl');
  });

  it('should load the error template when `/error` reached', function(){
    $httpBackend.whenGET(string).respond('...');
    $scope.$apply(function() {
      $location.path('/error');
    });
    expect($route.current.template).toBe(string);
  });

});

xdescribe('Countries page route test', function() {
  // see last it
  beforeEach(function() {
    module('cacApp');
  });

  beforeEach(inject(function(_$httpBackend_, _$route_, _$location_, $rootScope, _$timeout_)  {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
    $location = _$location_;
    $scope = $rootScope.$new();
    $root = $rootScope;
    $timeout = _$timeout_;
  }));

  it('should load countries.html template', function(){
    $httpBackend.whenGET('./countries/countries.html').respond('...');
    $scope.$apply(function() {
      $location.path('/countries');
    });
    expect($route.current.templateUrl).toBe('./countries/countries.html');
    expect($route.current.controller).toBe('CountriesCtrl');
  });

  it('should set `isLoading` to true based on $routeChangeStart', function() {
    $httpBackend.whenGET('./countries/countries.html').respond('...');
    $scope.$apply(function() {
      $location.path('/countries');
      $scope.$broadcast('$routeChangeStart');
    });
    expect($root.isLoading).toBe(true);
  });
// Needs work
  it('should set `isLoading` to false based on $routeChangeSuccess', function() {
    $httpBackend.whenGET('./countries/countries.html').respond('...');
    $scope.$apply(function() {
      $location.path('/countries');
      $scope.$broadcast('$routeChangeSuccess');
      $timeout.flush(1000);
    });
    // This should be false as per countries.js but returns `true`
    expect($root.isLoading).toBe(false);
  });

});

xdescribe('Countries-detail page route test', function() {
  // successful
  beforeEach(function() {
    module('cacApp');
  });

  beforeEach(inject(function(_$httpBackend_, _$route_, _$location_, $rootScope)  {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
    $location = _$location_;
    $scope = $rootScope.$new();
    $root = $rootScope;
  }));

  it('should load countries-detail.html template', function(){
    $httpBackend.whenGET('./countries/countries-detail.html').respond('...');
    $httpBackend.whenGET('http://api.geonames.org/countryInfoJSON?country=:countryCode&username=cbilliau').respond('...');
    $scope.$apply(function() {
      $location.path('/countries/:countryCode');
    });
    expect($route.current.templateUrl).toBe('./countries/countries-detail.html');
    expect($route.current.controller).toBe('CtryDetailCtrl');
  });
});

// Controllers
xdescribe('Countries controller', function () {
  // successful
  var controller = null;
  $scope = null;

  beforeEach(function () {
    module('cacApp');
  });

  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _$location_) {
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $root = $rootScope;
    controller = $controller('CountriesCtrl', {
      $scope: $scope
    });
  }));

  it('should return an object', function() {
    $httpBackend.whenGET('./countries').respond('...');
    $httpBackend.whenGET('http://api.geonames.org/countryInfoJSON?username=cbilliau').respond('...');
    $scope.$apply(function() {
      $location.path('/countries');
      console.log($scope.getCountryInfo.then());
    });
    expect(typeof controller).toBe('object');
    expect(typeof $scope.getCountryInfo.then()).toBe('object');
  });
});

// Does not work. Cannot figure this out!!!!!!!
// Keep getting "Error: [$injector:unpr] Unknown provider: countryDetailsProvider <- countryDetails <- CtryDetailCtrl"
// 
describe('Countries-detail controller', function () {

  var controller = null;
  $scope = null;

  beforeEach(function () {
    module('cacApp');
  });

  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, _$location_) {
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $root = $rootScope;
    countryDetails = $scope.countryDetails;
    controller = $controller('CtryDetailCtrl', {
      $scope: $scope
    });
  }));

  it('should return an object', function() {
    $httpBackend.whenGET('./countries/:countryCode').respond('...');
    $scope.$apply(function() {
      $location.path('/countries/:countryCode');
    });
    expect(typeof cacCountryPopulation()).toBe('function');
  });
});

// Screw trying to figure out .factories if I cant figure out controller.
