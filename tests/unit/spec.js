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

describe('Countries page route test', function() {

  beforeEach(function() {
    module('cacApp');
  });

  beforeEach(inject(function(_$httpBackend_, _$route_, _$location_, $rootScope)  {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
    $location = _$location_;
    $scope = $rootScope.$new();
  }));

  it('should load countries.html template', function(){
    $httpBackend.whenGET('./countries/countries.html').respon('...');
    $scope.$apply(function() {
      $location.path('/countries');
    });
    expect($route.current.templateUrl).toBe('./countries/countries.html');
    expect($route.current.controller).toBe('CountriesCtrl');
  });

});
