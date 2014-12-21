"use strict";

angular.module("app", []);

angular.module("app").controller("ctrl", ['$scope', '$http', function($scope, $http) {

	angular.extend($scope, {
		config: {
      qtd: 20,
      data: [],
      exp: '',
      http: $http
    }
	});

}]);

angular.module('app').directive("pagination", function(){
	return {
 		template:
 			'<nav>' +
  			'<ul class="pagination">' +
    			'<li ng-class="{ disabled: pageFirst() }">' +
    				'<a href="javascript:void(0)" ng-click="goPageFirst()">' +
    					'<span aria-hidden="true">&laquo;</span>' +
    					'<span class="sr-only">Previous</span>' +
    				'</a>' +
    			'</li>' +
    			'<li ng-class="{ active: pageActive(pg) }" ng-repeat="pg in getPages()">' +
    				'<a href="javascript:void(0)" ng-click="goPage(pg)">{{pg}}</a>' +
    			'</li>' +
    			'<li ng-class="{ disabled: pageLast() }">' +
    				'<a href="javascript:void(0)" ng-click="goPageLast()">{{data2}}' +
    					'<span aria-hidden="true">&raquo;</span>' +
    					'<span class="sr-only">Next</span>' +
    				'</a>' +
    			'</li>' +
  			'</ul>' +
			'</nav>',
    restrict: "E",
   	replace: true,
    scope: {
    	config: '='
   	},
   	link: function(scope, element, attrs){

      scope.consultar = function(){
        var url = 'http://104.236.94.137/site-produtos';
        url = url + '?qtd=' + scope.config.qtd || 20;
        url = url + '&pg=' + scope.config.pg || 1;
        url = url + '&exp=' + scope.config.exp || '';
        scope.config.http.get(url).success(function(data){
          var pages = [];
          if(data.pagina == 1){
            for(var i = 1; i <= 5; i++){
              if(i <= data.paginacao){
                pages.push(i);
              }
            }
            pages = pages.sort();
          }else if(data.pagina == 2){
            for(var i = 1; i <= 5; i++){
              if(i <= data.paginacao){
                pages.push(i);
              }
            }
            pages = pages.sort();
          }else if(data.pagina == data.paginacao){
            pages.push(data.pagina);
            if((data.pagina - 1) > 0){
              pages.push(data.pagina - 1);
            }
            if((data.pagina - 2) > 0){
              pages.push(data.pagina - 2);
            }
            if((data.pagina - 3) > 0){
              pages.push(data.pagina - 3);
            }
            if((data.pagina - 4) > 0){
              pages.push(data.pagina - 4);
            }
            pages = pages.sort();
          }else if((data.pagina + 1) == data.paginacao){
            pages.push(data.pagina);
            pages.push(data.pagina + 1);
            if((data.pagina - 1) > 0){
              pages.push(data.pagina - 1);
            }
            if((data.pagina - 2) > 0){
              pages.push(data.pagina - 2);
            }
            if((data.pagina - 3) > 0){
              pages.push(data.pagina - 3);
            }
            pages = pages.sort();
          }else{
            if((data.pagina - 2) > 0){
              pages.push(data.pagina - 2);
            }
            if((data.pagina - 1) > 0){
              pages.push(data.pagina - 1);
            }
            pages.push(data.pagina);
            pages.push(data.pagina + 1);
            pages.push(data.pagina + 2);
          }
          scope.config.pages = pages;
          scope.config.all = data.paginacao;
          scope.config.pg = data.pagina;
          scope.config.data = data.produtos;
        }).error(function(err){
          console.log(err);
        });
      }

      scope.$watch('config.exp', function(value) {
        scope.config.pg = 1;
        scope.consultar();
      });

      scope.getPages = function(){
        return scope.config.pages;
      };

      scope.pageActive = function(page){
        return parseInt(page) == parseInt(scope.config.pg);
      };

      scope.goPage = function(pg){
        if(scope.config.pg != pg){
          scope.config.pg = pg;
          scope.consultar();
        }
      };

      scope.goPageFirst = function(){
        scope.config.pg = 1;
        scope.consultar();
      }

      scope.goPageLast = function(){
        scope.config.pg = scope.config.all;
        scope.consultar();
      }

      scope.pageFirst = function(){
        return parseInt(scope.config.pg) == 1;
      }

      scope.pageLast = function(){
        return parseInt(scope.config.pg) == parseInt(scope.config.all);
      }

      scope.consultar();

   	}
 	};
});