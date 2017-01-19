/**
 * Created by yi on 2017/1/13.
 */
(function (angular){
		var module=angular.module('moviecat.change',[])
	module.directive('auto',['$location',function($location){

		//var path=$location.path();

return{
	restrict:'A',
	link:function($scope,iEml,iArr,d){
		//iEml表示auto指令所在的Dom元素，我们给他添加事件
		$scope.$location=$location;
		$scope.$watch('$location.path()',function(now){
			var aLink=iEml.children().attr('href');
			var type=aLink.replace(/#(\/.+?)\/\d+/,'$1');
			if(now.startsWith(type)){
				iEml.parent().children().removeClass('active');
				iEml.addClass('active');

			}

		})

		/*iEml.on('click',function(){
			iEml.parent().children().removeClass('active');
			iEml.addClass('active');
			//开发小技巧，将不清楚的元素定义到全局，然后在浏览器中查看

		})*/
		//iArr表示该Dom元素上的属性

	}
}
	}])
})(angular)
