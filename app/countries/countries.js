viewsModule.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/countries', {
                templateUrl: './countries/countries.html',
                controller: 'CountriesCtrl'
            })
            .when('/error', {
                template: '<p>Error - Page Not Found</p>'
            })
            .otherwise('/error');
    }])
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $timeout(function() {
                $rootScope.isLoading = false;
            }, 1000); //<-- Timeout set to .5 sec
        });
    });

viewsModule.controller('CountriesCtrl', ['$scope', 'cacCountryInfo', function($scope, cacCountryInfo) {
    cacCountryInfo()
        .then(function(countriesXhr) {
            $scope.countries = countriesXhr.geonames;
        });
}]);
