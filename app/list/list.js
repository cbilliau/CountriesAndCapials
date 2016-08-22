viewsModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : './list/list.html',
		controller : 'ListCtrl'
	});
}]);

viewsModule.controller('ListCtrl', ['$scope', 'cacCountryInfo', function($scope, cacCountryInfo) {
 	cacCountryInfo()
		.then(function(countriesXhr)	{
			$scope.countries = countriesXhr;
			console.log($scope.countries);
		});
}]);
