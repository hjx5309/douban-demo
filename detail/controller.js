/**
 * Created by yi on 2017/1/13.
 */
(function (angular){
	'use strict';
	//针对in_theater开发单独的模块

	var module=angular.module('moviecat.detail', [
		'ngRoute',
		'moviecat.service.http'])
	//配置模块的路由器，需要传入$routeProvider
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'detail/view.html',
			controller: 'movie_detail'
		});
	}])

	module.controller('movie_detail', ["$scope","$route","$routeParams","httpjsonp",'AppConfig',function($scope,$route,$routeParams,httpjsonp,AppConfig){
	     	$scope.movie={};
		    $scope.loading=true;
	     	var id=$routeParams.id;
			//跨域请求Ajax
			httpjsonp.jsonp(AppConfig.AppAddress+'/subject/'+id,
				{},function(data){
					$scope.movie=data;
					$scope.loading=false;
					$scope.$apply()
				})

		}
		]
	)

})(angular)

