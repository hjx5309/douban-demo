/**
 * Created by yi on 2017/1/12.
 */
(function (angular){
	'use strict';
	//针对in_theater开发单独的模块
	var http=angular.module('moviecat.service.http', [])
	//配置模块的路由器，需要传入$routeProvider
	http.service('httpjsonp',['$window','$document',function($window,$document){
		 this.jsonp=function(url,data,callback){
			//0.准备回调函数
			var qianzuiFunc='my_jsonp_cb';
			var cbFunc=qianzuiFunc+Math.random().toString().replace('.','');//为了避免重复回调函数,而加的后缀函数
			//通过对象数组里面增加字符串，相当于在给这个对象增加属性
			// window[cbFunc]=>window.cbFunc
			//这个函数的里面传回的形参是json对象

			//1.将data对象转化成字符串
			//例如data=｛id:1,name:"张三"｝-->'id=1&name=张三'
			//为了避免传过来的参数里面，自带?,因此，需要做个判断
			var queryString=url.indexOf('?')==-1?'?':'&';
			for(var k in data){
				queryString+=k+'='+data[k]+'&';
				//           id =  1   &
			}
			//2.处理回调函数
			//url+=callback=sdsdsa(随机名)
			queryString+="callback="+cbFunc;
			//3.创建一个script的标签
			var scriptElement=$document[0].createElement('script');
			scriptElement.src=url+queryString;
			//注意由于此时，还没有准备好回调函数，因此，还不能，将他放到页面中去
			//4.将script标签放到页面中,挂载过后，直接就可以去发送请求了
			//发送请求过后，返回的就是已经传入的json对象的前面传入的随机函数名的回调函数
			 $window[cbFunc]=function(data){callback(data)
				 $document[0].body.removeChild(scriptElement);};
			$document[0].body.appendChild(scriptElement);
		}
		//为了是外界能拿到这个存在于自执行函数里面的函数
		//$window.$jsonp=jsonp;
	}])

})(angular)
