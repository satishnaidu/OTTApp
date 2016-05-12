'use strict';

/**
 * @ngdoc function
 * @name OTTApp.controller:menuController
 * @description
 * # menuController
 * Controller of the OTTApp
 */
angular.module('OTTApp')
  .controller('menuController', function ($scope, SERVICE, SERVICE_URL, serviceBase) {
   
  	var inputdata = '';
  	var service = new serviceBase();
  	service.getContent(inputdata).then(successCallBack, errorCallBack);

  	function successCallBack(response){
  		if (typeof response != 'undefined' && response != '') {
  			console.log("Success Flow-Data from Service : "+ response);
  			console.log("videoSource : " + response.videoSource);
  		}
  	}

  	function errorCallBack(error){
  		console.log("in error flow");

  	}

    console.log("In menu conttroller ");

  });
