'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
	'moviecat.service.http',
	'moviecat.search',
	'moviecat.detail',
   'moviecat.movie_list',
	'moviecat.change',

]).constant('AppConfig',{
	pageSize:10,
	AppAddress:'http://api.douban.com/v2/movie/',
	show:7
}).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo:'/in_theaters/1'});
}]);
/*.controller('searchController',['$scope','$route',function($scope,$route){
	$scope.input='';
	$scope.search=function(){
		//console.log($scope.input);
		$route.updateParams({category:'search',q:$scope.input})
	}
}])*/
/*
.controller('nav',['$scope','$location',function($scope,$location){
	$scope.type='in_theater';
	$scope.qq=$location;
	//$watch监视定义在$scope上的属性
	$scope.$watch('qq.path()',function(now){
		if(now.startsWith('/in_theaters')){
			$scope.type='in_theater';
		}else if(now.startsWith('/coming_soon')){
			$scope.type='coming_soon'
		}else if(now.startsWith('/top250')){
			$scope.type='top250'
		}
	})
}])
*/
