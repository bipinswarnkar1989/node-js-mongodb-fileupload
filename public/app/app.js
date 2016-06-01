var app = angular.module('myApp',['ngResource']);

app.factory('User',function($resource){
	return $resource('/api/users/:id',{ id:'@_id' },{
		update:{ method:'PUT'}
	});
});

app.controller('userController',function($scope,User){
	
	$scope.user = new User();
	var refresh = function(){
		$scope.users = User.query();
		$scope.user = "";
	}
	refresh();
	
	$scope.remove = function(user){
		user.$delete(function(){
			refresh();
		});
	}
	
	$scope.add = function(user){
		User.save(user,function(user){
			refresh();
		});
	}
	
	$scope.edit = function(id){
		$scope.user = User.get({id:id});
	}
	
	$scope.update = function(user){
		user.$update(function(){
			refresh();
		});
	}
});