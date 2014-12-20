"use strict";

angular.module("app", []);

angular.module("app").controller("ctrl", ['$scope', '$http', function($scope, $http) {

	angular.extend($scope, {
		data: []
	});

	$http.get('http://localhost:3000/site-produtos?qtd=2&pg=506').success(function(data){
		angular.extend($scope, {
			data: data
		});
	}).error(function(err){
		console.log(err);
	});

}]);

angular.module('app').directive("pagination", function(){
	return {
 		template:
 			'<nav>' +
  			'<ul class="pagination">' +
    			'<li ng-class="{ disabled: pageFirst() }">' +
    				'<a href="">' +
    					'<span aria-hidden="true">&laquo;</span>' +
    					'<span class="sr-only">Previous</span>' +
    				'</a>' +
    			'</li>' +
    			'<li ng-class="{ active: pageActive(pg) }" ng-repeat="pg in getPages()">' +
    				'<a href="javascript:void(0)" ng-click="goPage(pg)">{{pg}}</a>' +
    			'</li>' +
    			'<li ng-class="{ disabled: pageLast() }">' +
    				'<a href="#">{{data2}}' +
    					'<span aria-hidden="true">&raquo;</span>' +
    					'<span class="sr-only">Next</span>' +
    				'</a>' +
    			'</li>' +
  			'</ul>' +
			'</nav>',
    restrict: "E",
   	replace: true,
    scope: {
    	data: '='
   	},
   	link: function(scope, element, attrs){

   		scope.$watch(attrs.data, function(value) {
   			if(value.pagina){
          scope.pagination.all = value.paginacao || 0;
   				var pages = [];
   				pages.push(value.pagina);
          if(value.pagina == 1){
            pages.push(2);
            pages.push(3);
            pages.push(4);
            pages.push(5);
          }else if(value.pagina == 2){
            pages.push(1);
            pages.push(3);
            pages.push(4);
            pages.push(5);
          }else if(value.pagina == scope.pagination.all){
            pages.push(value.pagina - 1);
            pages.push(value.pagina - 2);
            pages.push(value.pagina - 3);
            pages.push(value.pagina - 4);
          }else if((value.pagina + 1) == scope.pagination.all){
            pages.push(value.pagina + 1);
            pages.push(value.pagina - 2);
            pages.push(value.pagina - 3);
            pages.push(value.pagina - 4);
          }else{
            pages.push(value.pagina - 1);
            pages.push(value.pagina - 2);
            pages.push(value.pagina + 1);
            pages.push(value.pagina + 2);
          }
      		scope.pagination.pages = pages.sort();
   			}
    	});

   		angular.extend(scope, {
   			pagination: {
   				page: 506,
   				limit: 5
   			}
   		});

   		scope.goPage = function(pg){
   			scope.pagination.page = pg;
   		};

   		scope.getPages = function(){
   			return scope.pagination.pages;
   		};

   		scope.pageActive = function(page){
   			return parseInt(page) == parseInt(scope.pagination.page);
   		};

   		scope.pageFirst = function(){
   			return parseInt(scope.pagination.page) == 1;
   		}

   		scope.pageLast = function(){
   			return parseInt(scope.pagination.page) == parseInt(scope.pagination.all);
   		}

   	}
 	};
});