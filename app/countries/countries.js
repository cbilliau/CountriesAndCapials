viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl : './countries/countries.html',
		controller : 'CountriesCtrl'
	});
}]);

viewsModule.controller('CountriesCtrl', ['$scope', 'cacCountryInfo', function($scope, cacCountryInfo) {
 	cacCountryInfo()
		.then(function(countriesXhr)	{
			$scope.countries = countriesXhr.geonames;
		});
}]);
