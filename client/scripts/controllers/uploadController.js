'use strict';

/**
 * @ngdoc function
 * @name OTTApp.controller:uploadController
 * @description
 * # uploadController
 * Controller of the OTTApp
 */
angular.module('OTTApp')
  .controller('uploadController', function ($scope, Upload,SERVICE, SERVICE_URL, serviceBase) {
   
   console.log('in upload controller');
  	 // upload later on form submit or something similar
    $scope.submit = function() {
    
    /*  if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }*/
      $scope.uploadFiles($scope.files);
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: SERVICE_URL.GET_UPLOAD_URL,
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
       // for multiple files:
    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
         // Upload.upload({..., data: {file: files[i]}, ...})...;
        }
        // or send them all together for HTML5 browsers:
        Upload.upload({
          url: SERVICE_URL.GET_UPLOAD_URL,
          arrayKey: '',
          data: {files: files}
        });
      }
    }

  });
