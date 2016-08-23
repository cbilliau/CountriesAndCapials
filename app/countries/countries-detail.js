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

viewsModule.controller('CtryDetailCtrl', ['$scope', 'countryDetails', 'cacCapitalPopulation', 'cacCountryNeighbors', 'listOfNeighbours', function($scope, countryDetails, cacCapitalPopulation, cacCountryNeighbors, listOfNeighbours) {
    $scope.countryDetails = countryDetails.geonames[0];

		cacCapitalPopulation($scope.countryDetails)
			.then(function(capitalPop)	{
				$scope.capitalPop = capitalPop.geonames[0];
			});

		cacCountryNeighbors($scope.countryDetails)
			.then(function(neighbours)	{
				$scope.neighbours = neighbours.geonames;
        $scope.neighbours = listOfNeighbours.list($scope.neighbours);
        console.log($scope.neighbours);
			});


}]);
