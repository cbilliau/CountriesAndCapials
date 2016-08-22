angular.module('cacApp', ['cacAppViews', 'ngRoute', 'ngAnimate'])
	.config(function($locationProvider, $routeProvider)	{
		$locationProvider.hashPrefix('!');
		$routeProvider.otherwise({
			redirectTo : '/'
		});
	});
