(function (angular){
	'use strict';
	//针对in_theater开发单独的模块
	var module=angular.module('moviecat.coming_soon', ['ngRoute'])
	//配置模块的路由器，需要传入$routeProvider
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/coming_soon', {
			templateUrl: 'coming_soon/view.html',
			controller: 'inTheaterCtrl'
		});
	}])

	module.controller('comingSoonCtrl', ["$scope",function($scope){

	}]);
})(angular)
