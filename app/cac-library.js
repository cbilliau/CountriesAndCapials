angular.module('cacLibrary', [])

		.constant('CAC_API_PREFIX', 'http://api.geonames.org')
    .constant('CAC_API_USERNAME', 'cbilliau')
    .factory('cacRequest', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME) {
        /* call=api type params=params */
        return function(param) {
            var reqParams = angular.extend({}, {
                username: CAC_API_USERNAME
            });
            return $http.get(CAC_API_PREFIX + '/' + param, {
                    params: reqParams
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }])
    .factory('cacCountryInfo', ['cacRequest', function(cacRequest) {
            return function(countriesList) {
							var params = 'countryInfo';
            return cacRequest(params);
					};
        }
    ]);
