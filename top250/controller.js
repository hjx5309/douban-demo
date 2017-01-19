(function (angular){
	'use strict';
	//针对Top250开发单独的模块
	var module=angular.module('moviecat.top250', ['ngRoute'])
	//配置模块的路由器，需要传入$routeProvider
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/top250', {
			templateUrl: 'top250/view.html',
			controller: 'top250Ctrl'
		});
	}])

	module.controller('top250Ctrl', ["$scope",function($scope) {

	}]);
})(angular)
