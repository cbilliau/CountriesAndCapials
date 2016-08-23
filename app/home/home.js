viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
            templateUrl: './home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/home', {
            templateUrl: './home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/error', {
            template: '<p>Error - Page Not Found</p>'
        })
        .otherwise('/error');
}]);

viewsModule.controller('HomeCtrl', ['$scope', function($scope) {}]);
