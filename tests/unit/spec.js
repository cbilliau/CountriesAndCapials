describe('Home page test', function() {

  beforeEach(function() {
    module('cacApp');
  });

  beforeEach(inject(function(_$httpBackend_, _$route_, _$location_, $rootScope)  {
    $httpBackend = _$httpBackend_;
    $route = _$route_;
    $location = _$location_;
    $scope = $rootScope.$new();
  }));

  it('should load the home.html template', function(){
    $httpBackend.whenGET('./home/home.html').respond('...');
    $scope.$apply(function() {
      $location.path('/home');
    });
    expect($route.current.templateUrl).toBe('./home/home.html');
    expect($route.current.controller).toBe('HomeCtrl');
  });
});
