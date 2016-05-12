
angular.module('OTTApp')
.factory('serviceBase', function ($q, $http, SERVICE, SERVICE_URL) {
    'use strict';

    function serviceBase() {
    }

    serviceBase.prototype = {

	    searchContent: function (searchQuery){

			var deffered = $q.defer();

			var capsize = SERVICE.SEARCH_CAPSIZE;
			var savedConfig = SERVICE_URL.SEARCH_CONTENT_URL;

			savedConfig.data.capSize = capsize?capsize:50;
			savedConfig.data.searchKey = searchQuery;
				
			$http(savedConfig).success(function (data, status, headers, config) {
	                deffered.resolve(data);
	    
	        }).error(function (data, status, headers, config) {
	                deffered.reject();
	        });
			return deffered.promise;
	    },

	    getContent: function (inputdata){
	    	var deffered = $q.defer();

			var serviceURL = SERVICE_URL.GET_CONTENT_URL;
			var req = {
					method:'GET',
					url: serviceURL
			};
			console.log('getContent URL from Config: ' + serviceURL);	
			
			$http(req).success(function (data, status, headers, config) {
	                deffered.resolve(data);
    
	        }).error(function (data, status, headers, config) {
	                deffered.reject();
	        });
			return deffered.promise;
	    },

	    uploadContent: function(inputdata){
	    	var deffered = $q.defer();

	    	var serviceURL = SERVICE_URL.GET_UPLOAD_URL;
	    	var req = {
	    		method:'POST',
	    		url: serviceURL
	    	};
	    	console.log('uploadContent url from config: '+serviceURL);
	    	$http(req).success(function(data,status,headers,config){
	    		deffered.resolve(data);
	    	}).error(function(data,status,headers,config){
	    		deffered.reject();
	    	});
	    	return deffered.promise;
	    },
	    login:function(user){
	    	var deffered = $q.defer();
	    	var serviceURL = SERVICE_URL.GET_LOGIN_URL;
	    	var req = {
	    		method:'POST',
	    		url:serviceURL,
	    		data:user
	    	};
	    	console.log('login url from config: '+serviceURL);
	    	$http(req).success(function(data,status,headers,config){
	    		deffered.resolve(data);
	    	}).error(function(data,status,headers,config){
	    		deffered.reject();
	    	});
	    	return deffered.promise;
	    },

	    signup:function(user){
	    	var deffered = $q.defer();
	    	var serviceURL = SERVICE_URL.GET_SIGNUP_URL;
	    	var req = {
	    		method:'POST',
	    		url:serviceURL,
	    		data:user
	    	};
	    	console.log('login url from config: '+serviceURL);
	    	$http(req).success(function(data,status,headers,config){
	    		deffered.resolve(data);
	    	}).error(function(data,status,headers,config){
	    		deffered.reject();
	    	});
	    	return deffered.promise;
	    }
   }
    return (serviceBase);
 });