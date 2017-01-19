/**
 * Created by yi on 2017/1/16.
 */
(function(){angular.module('moviecat.search',['ngRoute'])
	.directive('search',[function(){
	return{
		restrict:"EA",
		template:'<form class="navbar-form navbar-right" ng-submit="search()"><input type="text" class="form-control" placeholder="Search..." ng-model="input"></form>',
		replace:'true',
		controller:'searchController'
	}
}]).controller('searchController',['$scope','$route','$routeParams','$location',function($scope,$route,$routeParams,$location){
		$scope.input='';
		$scope.$location=$location;
		$scope.search=function(){
			if ($scope.input) {
				if ($location.url().startsWith('/detail')) {
					console.log($scope.input)
					$location.url('/search/1?q=' + $scope.input);
				}
				else {
					$route.updateParams({category: 'search', q: $scope.input})
				}
			}else{
				return;
			}
		}
	}])
})(angular)

