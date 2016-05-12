'use strict';

/**
 * @ngdoc function
 * @name OTTApp.controller:uploadController
 * @description
 * # uploadController
 * Controller of the OTTApp
 */
angular.module('OTTApp')
  .controller('loginController', function ($scope, SERVICE, SERVICE_URL, serviceBase) {
   
   console.log('in loginController controller');

    console.log($scope.email);

   
   $scope.loginSubmit = function(user){
     //var user = $scope.loginForm.user;
     console.log("in login submit");
     var user = $scope.user;
     console.log(user);
      var service = new serviceBase();
      service.login(user).then(successCallBack, errorCallBack);

   };


   $scope.signupSubmit = function(){
    console.log("in signup submit");
    var user = $scope.user;
    var service = new serviceBase();
    service.signup(user).then(successCallBack, errorCallBack);
   };

   function successCallBack(response){
      if (typeof response != 'undefined' && response != '') {
        console.log(response);
      }
    }

    
    function errorCallBack(error){
      console.log("in error flow");

    }
   
  /* var serivce = new serviceBase();
   var user = $scope.loginForm.user;
   service.loginContent(user).then(successCallBack, errorCallBack);
    
 
    function successCallBack(response){
      if (typeof response != 'undefined' && response != '') {
        console.log(response);
      }
    }

    
    function errorCallBack(error){
      console.log("in error flow");

    }*/


  });
