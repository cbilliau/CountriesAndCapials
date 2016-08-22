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
                }, {
                    cache: true
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }])
    .factory('cacCountryDetails', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME) {
        return function(countryCode) {
            var reqParams = angular.extend({}, {
                username: CAC_API_USERNAME
            });
            return $http.get(CAC_API_PREFIX + '/countryInfoJSON?country=' + countryCode, {
                    params: reqParams
                }, {
                    cache: true
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }])
    .factory('cacCapitalPopulation', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME) {
        return function(countryDetails) {
            var reqParams = angular.extend({}, {
                q: countryDetails.capital,
                country: countryDetails.countryCode,
                name_equals: countryDetails.capital,
                isNameRequired: true,
                username: CAC_API_USERNAME
            });
            return $http.get(CAC_API_PREFIX + '/searchJSON?', {
                    params: reqParams
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }])
    .factory('cacCountryNeighbors', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_USERNAME', function($http, $q, CAC_API_PREFIX, CAC_API_USERNAME) {
        return function(countryDetails) {
            var reqParams = angular.extend({}, {
                geonameId: countryDetails.geonameId,
                username: CAC_API_USERNAME
            });
            return $http.get(CAC_API_PREFIX + '/neighboursJSON', {
                    params: reqParams
                })
                .then(function(response) {
                    return $q.when(response.data);
                });
        };
    }]);
