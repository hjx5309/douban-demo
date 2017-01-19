(function (angular){
	'use strict';
	//针对in_theater开发单独的模块

	var module=angular.module('moviecat.in_theater', [
		'ngRoute',
		'moviecat.service.http'])
		//配置模块的路由器，需要传入$routeProvider
	module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/in_theater/:page', {
				templateUrl: 'in_theaters/view.html',
				controller: 'inTheaterCtrl'
			});
		}])

	module.controller('inTheaterCtrl', ["$scope","$route","$routeParams","httpjsonp",function($scope,$route,$routeParams,httpjsonp){
		$scope.loading=true;
		var count=10;
		var page=parseInt($routeParams.page);//接收的当前第几页
		var start=(page-1)*count;
			$scope.currentPage=1;
		$scope.data=[];
			$scope.title='';
		$scope.message='';
		$scope.subjects=[];
			$scope.total=0;
			$scope.pageCounts=0
		console.log(httpjsonp);
		var doubanUrl='api.douban.com/v2/movie/in_theaters?count=3&start=3';
		//本地请求Ajax
		/*$http.get('/app/data.json').then(
		function (response){
			if (response.status === 200)
			{
				$scope.subjects = response.data.subjects;
			}else{
				$scope.message="您的请求有误"
			}
		},
		function(error) {
			$scope.message="您的请求有误吗！"
		})}*/
		//跨域请求Ajax
		httpjsonp.jsonp('http://api.douban.com/v2/movie/in_theaters',
			{count:count,
			start:start,},function(data){
				$scope.title=data.title;
			$scope.subjects=data.subjects;
				$scope.currentPage=page;
				$scope.total=data.total;
				$scope.pageCounts=Math.ceil(data.total/count);
				$scope.loading=false;
				//涉及到了DOM操作，通知angularjs重新同步更新的数据
				$scope.$apply();
		})
		//暴露跳下一页的行为
		$scope.goPage=function(e)
		{
			//console.log(e)
			if(e<1){
				return;
			}if(e>$scope.pageCounts){
			return;
		}else{
			$route.updateParams({page:e});
		}


		}
	}
	]
	)

})(angular)

