var express = require('express');
var kaltura = require('kaltura');
var logger = require('winston');
var client = require('./client');


module.exports.client = client();

function callbackResult(res,data){

	logger.info("Final wrapping of response is going on...");
	//Preparing error if any error case
	//var error = prepareError();
	//var result = responseWrapper(data,error);

	var result = responseWrapper(data);
	return res.json(result);
	
}
// common call back result method
module.exports.callbackResult = callbackResult;

// Wrapper class around original data, to include error messages also
function responseWrapper(data,error){

	var result ={};
	if(error){
		result['error'] = error;
	}
	if(data){
		result['result'] = data;
	}

	return result;
}

function validateRes(results){

	if(results.objects.length ==0){
		return callbackResult('No data present for the requested service');
	}else if (results && results.code && results.message) {
   	 logger.error('Kaltura Error', results);
    	return callbackResult(results.message);
  } 
}


// Preparing error object
function prepareError(){

	var error ={};
	error['error_code'] = 500;
	error['error_message'] = 'Internal server error in application';
	error['error_type'] = 'Service Error';

	return error;
}


module.exports.validateRes = validateRes;