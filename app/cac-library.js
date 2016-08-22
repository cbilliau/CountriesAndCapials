angular.module('cacLibrary', [])

		.constant('CAC_API_PREFIX', 'http://api.geonames.org')
    .constant('CAC_API_USERNAME', 'cbilliau')
    .factory('cacCountryInfo', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME) {
        return function() {
            var reqParams = angular.extend({}, {
                username: CAC_API_USERNAME
            });
            return $http.get(CAC_API_PREFIX + '/countryInfoJSON', {
                    params: reqParams
                }, {cache: true})
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }]);
