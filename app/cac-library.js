angular.module('cacLibrary', [])

	.constant('CAC_API_PREFIX', '')
	.constant('CAC_API_USERNAME', '')
	.factory('cacRequest', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME){
		/* call=api type params=params */
		return function(call, params){
			var reqParams = angular.extend({}, call, params, {username: CAC_API_USERNAME});
			return $http.get(CAC_API_PREFIX, {params: reqParams})
				.then(function(response){
					return $q.when(response.data);
				});
		};
	}])
