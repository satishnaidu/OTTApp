
'use strict';
angular.module('OTTApp')
  .controller('rootController', function ($rootScope) {
  	$rootScope.handleKey = function(event) {
  		$rootScope.$broadcast('keypressevent', event.keyCode);
    	console.log('event broadcasted');
    	//console.log(event.keyCode);
	}
  });