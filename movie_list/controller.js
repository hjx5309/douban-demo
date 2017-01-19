(function (angular){
	'use strict';
	//针对in_theater开发单独的模块

	var module=angular.module('moviecat.movie_list', [
		'ngRoute',
		'moviecat.service.http'])
		//配置模块的路由器，需要传入$routeProvider
	module.config(['$routeProvider',function($routeProvider) {
			$routeProvider.when('/:category/:page', {
				templateUrl: 'movie_list/view.html',
				controller: 'movie_listCtrl'
			});
		}])

	module.controller('movie_listCtrl', ["$scope","$route","$routeParams","httpjsonp",'AppConfig',function($scope,$route,$routeParams,httpjsonp,AppConfig){
		$scope.loading=true;
		var count=AppConfig.pageSize;
		var page=parseInt($routeParams.page);//接收的当前第几页
		var start=(page-1)*count;
		$scope.currentPage=1;
		$scope.data=[];
		$scope.title='Loading....';
		$scope.message='';
		$scope.subjects=[];
			$scope.total=0;
			$scope.pageCounts=0;
			$scope.pagefengye=[];
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
		httpjsonp.jsonp(AppConfig.AppAddress+$routeParams.category,
			{count:count,
			start:start,
			q:$routeParams.q},function(data){
				$scope.title=data.title;
			    $scope.subjects=data.subjects;
				$scope.currentPage=$routeParams.page;
				$scope.total=data.total;
				$scope.region=Math.floor(AppConfig.show/2);
				$scope.pageCounts=Math.ceil(data.total/count);
				$scope.begin=$scope.currentPage-$scope.region;
				if($scope.begin<1){
					$scope.begin=1;
				}
				$scope.end=$scope.begin+AppConfig.show-1;
				if($scope.end>=(parseInt($scope.pageCounts)+1)) {
					$scope.end = $scope.pageCounts;
					$scope.begin = $scope.end -AppConfig.show+1;
					if($scope.begin<1){
						$scope.begin=1;
					}
				}

                for(var i=$scope.begin;i<=$scope.end;i++){
					$scope.pagefengye.push(i);
				}
				for(var i=0;i<$scope.pagefengye.length;i++){
				console.log($scope.pagefengye[i])
				}

				$scope.loading=false;
				//涉及到了DOM操作，通知angularjs重新同步更新的数据
				$scope.$apply();
		})
		//暴露跳下一页的行为
		$scope.goPage=function(e)
		{
			console.log(e);
			if (e < 1) {
				return;
			}
			if (e > $scope.pageCounts) {
				return;
			} else {
				$route.updateParams({page: e});
			}
			if(e==$scope.currentPage){return;}



		}
	}
	]
	)

})(angular)

