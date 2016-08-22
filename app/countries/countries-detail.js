viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/countries/:countryCode', {
        templateUrl: './countries/countries-detail.html',
        controller: 'CtryDetailCtrl',
        resolve: {
            countryDetails: ['cacCountryDetails', '$route', function(cacCountryDetails, $route) {
                return cacCountryDetails($route.current.params.countryCode);
            }]
        }
    });
}]);

viewsModule.controller('CtryDetailCtrl', ['$scope', 'countryDetails', function($scope, countryDetails) {
    $scope.countryDetails = countryDetails;
}]);
