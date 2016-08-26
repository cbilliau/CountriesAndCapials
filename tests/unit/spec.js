// Route tests
xdescribe('Home page route test', function() {

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
  xit('should set `isLoading` to false based on $routeChangeSuccess', function() {
    $httpBackend.whenGET('./countries/countries.html').respond('...');
    $scope.$apply(function() {
      $location.path('/countries');
      $scope.$broadcast('$routeChangeSuccess');
    });
    expect($root.isLoading).toBe(false);
  });

});

describe('Countries-detail page route test', function() {

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
