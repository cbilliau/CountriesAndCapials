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

viewsModule.controller('CtryDetailCtrl', ['$scope', 'countryDetails', 'cacCapitalPopulation', 'cacCountryNeighbors', function($scope, countryDetails, cacCapitalPopulation, cacCountryNeighbors) {
    $scope.countryDetails = countryDetails.geonames[0];
		console.log(countryDetails);

		cacCapitalPopulation($scope.countryDetails)
			.then(function(capitalPop)	{
				$scope.capitalPop = capitalPop.geonames[0];
				console.log($scope.capitalPop.population);
			});

		cacCountryNeighbors($scope.countryDetails)
			.then(function(neighbours)	{
				$scope.neighbours = neighbours;
				console.log($scope.neighbours);
			})
}]);
